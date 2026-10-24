// Inicialização compartilhada do Stripe + utilitários das rotas /api
import Stripe from 'stripe';

const SECRET =
  process.env.STRIPE_SECRET_KEY ||
  process.env.STRIPE_SECRET ||
  process.env.STRIPE_API_KEY ||
  '';

export const stripe = SECRET ? new Stripe(SECRET) : null;

export const SITE_URL = process.env.SITE_URL || 'https://kauesn.github.io/stratum-agro/';

// IDs dos preços (podem ser sobrescritos por variável de ambiente)
export const PRICE_MENSAL = process.env.PRICE_MENSAL || 'price_1UP9JlBXIDFZ1oATUELWM842'; // R$ 9,99/mês
export const PRICE_ANUAL  = process.env.PRICE_ANUAL  || 'price_1UP9XLBXIDFZ1oATQvNOlLD0';  // R$ 99,90/ano

// Chave web do Firebase: pública por design (é a mesma do index.html). Serve só
// para o Google validar o ID token do usuário.
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyBg0DmU04eMjqssFFX6_xNOFTb7viCsWw4';

// Origens que podem chamar a API pelo navegador (separadas por vírgula em ALLOWED_ORIGINS)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  'https://stratum-agro.vercel.app,https://kauesn.github.io')
  .split(',').map(s => s.trim()).filter(Boolean);

export function cors(req, res) {
  const origin = req.headers && req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');
}

export function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return {};
}

// Erro para o cliente sem detalhes internos; o detalhe fica só no log do servidor
export function fail(res, status, msg, err) {
  if (err) console.error('[api]', msg, err && err.message);
  return res.status(status).json({ error: msg });
}

// Limite de requisições em memória (janela fixa). ATENÇÃO: vale por instância
// serverless; outra instância, ou uma nova após cold start, começa do zero.
// É só uma barreira contra abuso simples: a proteção forte é o Firewall da Vercel ou Upstash.
export const RATE_LIMIT = 10;
export const RATE_WINDOW_MS = 60_000;
const hits = new Map();

// Registra uma requisição para a chave. Retorna 0 se liberada ou os segundos até liberar.
export function rateLimit(key, now = Date.now()) {
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start >= RATE_WINDOW_MS) hits.delete(k);
  let h = hits.get(key);
  if (!h || now - h.start >= RATE_WINDOW_MS) { h = { start: now, count: 0 }; hits.set(key, h); }
  h.count++;
  return h.count > RATE_LIMIT ? Math.ceil((h.start + RATE_WINDOW_MS - now) / 1000) : 0;
}

export function _resetRateLimit() { hits.clear(); }

function clientIp(req) {
  const h = req.headers || {};
  const fwd = typeof h['x-forwarded-for'] === 'string' ? h['x-forwarded-for'].split(',')[0].trim() : '';
  return h['x-real-ip'] || fwd || (req.socket && req.socket.remoteAddress) || 'desconhecido';
}

function tooMany(res, retry) {
  res.setHeader('Retry-After', String(retry));
  return fail(res, 429, 'Muitas requisições. Tente de novo em instantes.');
}

// Preâmbulo comum: CORS, método, limite por IP e Stripe configurado. Retorna true se já respondeu.
export function preflight(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  if (req.method !== 'POST') { fail(res, 405, 'Método não permitido.'); return true; }
  const retry = rateLimit('ip:' + clientIp(req));
  if (retry) { tooMany(res, retry); return true; }
  if (!stripe) { fail(res, 503, 'Pagamentos indisponíveis no momento.'); return true; }
  return false;
}

// Valida o ID token do Firebase no Google. Retorna { uid, email, emailVerified } ou null.
export async function verifyIdToken(idToken) {
  if (typeof idToken !== 'string' || idToken.length < 20 || idToken.length > 4096) return null;
  try {
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    if (!r.ok) return null;
    const data = await r.json();
    const u = data && data.users && data.users[0];
    if (!u || !u.localId) return null;
    return { uid: u.localId, email: (u.email || '').toLowerCase(), emailVerified: u.emailVerified === true };
  } catch (e) {
    console.error('[api] falha ao validar token', e && e.message);
    return null;
  }
}

// Exige usuário logado (token no corpo ou em Authorization: Bearer) e aplica o limite por uid.
// Retorna o usuário ou null (já respondeu 401 ou 429).
export async function requireUser(req, res) {
  const h = (req.headers && req.headers.authorization) || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : readBody(req).idToken;
  const user = await verifyIdToken(token);
  if (!user) { fail(res, 401, 'Faça login novamente.'); return null; }
  const retry = rateLimit('uid:' + user.uid);
  if (retry) { tooMany(res, retry); return null; }
  return user;
}

const UID_RE = /^[A-Za-z0-9_-]{1,128}$/;
const ATIVOS = ['active', 'trialing', 'past_due'];

// Encontra a assinatura do usuário: primeiro pelo uid gravado no checkout
// (subscription_data.metadata.uid); depois, só se o e-mail for verificado, pelo e-mail.
async function findSubscription(user) {
  if (UID_RE.test(user.uid)) {
    try {
      const found = await stripe.subscriptions.search({ query: `metadata['uid']:'${user.uid}'`, limit: 10 });
      const sub = found.data.find(s => ATIVOS.includes(s.status));
      if (sub) return sub;
    } catch (e) { console.error('[api] busca por uid falhou', e && e.message); }
  }
  if (user.emailVerified && user.email) {
    const customers = await stripe.customers.list({ email: user.email, limit: 5 });
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 5 });
      const sub = subs.data.find(s => ATIVOS.includes(s.status));
      if (sub) return sub;
    }
  }
  return null;
}

// Assinatura ativa do usuário, apenas com o que a interface precisa
export async function getActiveSubscription(user) {
  const sub = await findSubscription(user);
  if (!sub) return { active: false };
  const item = sub.items && sub.items.data[0];
  const price = item && item.price;
  const end = sub.current_period_end || (item && item.current_period_end);
  return {
    active: sub.status === 'active' || sub.status === 'trialing',
    status: sub.status,
    plan: price && price.id === PRICE_ANUAL ? 'anual' : 'mensal',
    currentPeriodEnd: end ? new Date(end * 1000).toISOString() : null
  };
}

// Cliente Stripe do usuário (para o portal). Não cria cliente novo.
export async function findCustomerId(user) {
  const sub = await findSubscription(user);
  if (sub) return typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  if (user.emailVerified && user.email) {
    const found = await stripe.customers.list({ email: user.email, limit: 1 });
    if (found.data.length) return found.data[0].id;
  }
  return null;
}
