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

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Vary', 'Origin');
}

export function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return {};
}

// Verifica o token do Firebase (opcional). Retorna o e-mail confiável ou null.
export async function emailFromToken(idToken) {
  if (!idToken) return null;
  try {
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY || ''}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    const data = await r.json();
    if (data && data.users && data.users[0] && data.users[0].email) return data.users[0].email;
  } catch (e) { /* verificação opcional */ }
  return null;
}

// Busca (ou cria) o cliente Stripe a partir do e-mail
export async function findOrCreateCustomer(email) {
  if (!email) return null;
  const found = await stripe.customers.list({ email, limit: 1 });
  if (found.data.length) return found.data[0];
  return stripe.customers.create({ email });
}

// Retorna a assinatura ativa do e-mail (se existir), com plano e validade
export async function getActiveSubscription(email) {
  if (!email) return { active: false };
  const customers = await stripe.customers.list({ email, limit: 5 });
  for (const c of customers.data) {
    const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 5 });
    const ativa = subs.data.find(s => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due');
    if (ativa) {
      const item = ativa.items.data[0];
      const price = item && item.price;
      const plano = price && price.id === PRICE_ANUAL ? 'anual' : 'mensal';
      return {
        active: ativa.status === 'active' || ativa.status === 'trialing',
        status: ativa.status,
        plan: plano,
        priceId: price ? price.id : null,
        customerId: c.id,
        subscriptionId: ativa.id,
        currentPeriodEnd: ativa.current_period_end ? new Date(ativa.current_period_end * 1000).toISOString() : null
      };
    }
  }
  return { active: false };
}
