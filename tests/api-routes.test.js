// Testes das rotas /api com Google e Stripe simulados (sem rede).
// Rodar: node --test tests/api-routes.test.js
import { test } from 'node:test';
import assert from 'node:assert';

process.env.STRIPE_SECRET_KEY = 'sk_test_ficticia_sem_rede';
const lib = await import('../lib/stripe.js');
const tokenCache = await import('../lib/token-cache.js');
const rotas = {
  subscription: (await import('../api/subscription.js')).default,
  portal: (await import('../api/portal.js')).default,
  'create-checkout': (await import('../api/create-checkout.js')).default
};

// Google simulado: o token "tok-<uid>-..." vale para aquele uid; o resto é recusado
globalThis.fetch = async (url, init) => {
  const m = /^tok-([a-z0-9]+)-/.exec(JSON.parse(init.body).idToken);
  if (!m) return { ok: false, status: 400, json: async () => ({}) };
  return { ok: true, status: 200, json: async () => ({ users: [{ localId: m[1], email: `${m[1]}@x.com`, emailVerified: true }] }) };
};

// Stripe simulado: recusa parâmetro desconhecido, como o real responde com HTTP 400
const PARAMS = new Set(['mode', 'line_items', 'customer_email', 'client_reference_id', 'allow_promotion_codes', 'metadata', 'subscription_data', 'success_url', 'cancel_url']);
let ultimaSessao = null;
lib.stripe.checkout.sessions.create = async params => {
  for (const k of Object.keys(params)) if (!PARAMS.has(k)) throw new Error(`Received unknown parameter: ${k}`);
  ultimaSessao = params;
  return { url: 'https://checkout.example/s' };
};
lib.stripe.subscriptions.search = async () => ({ data: [{ status: 'active', customer: 'cus_1', items: { data: [{ price: { id: lib.PRICE_ANUAL }, current_period_end: 2000000000 }] } }] });
lib.stripe.billingPortal.sessions.create = async () => ({ url: 'https://portal.example/s' });

let ipSeq = 0, uidSeq = 0;
const tok = () => `tok-u${++uidSeq}-${'x'.repeat(30)}`;

function req(body, { ip = `10.0.0.${++ipSeq}`, method = 'POST', origin } = {}) {
  return { method, body, socket: {}, headers: { 'x-real-ip': ip, ...(origin ? { origin } : {}) } };
}

function resposta() {
  const res = { headers: {}, statusCode: null, body: undefined };
  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  res.status = c => { res.statusCode = c; return res; };
  res.json = b => { res.body = b; return res; };
  res.end = () => res;
  return res;
}

// statusCode null no retorno = a rota terminou sem responder ao cliente
async function chamar(rota, r) {
  const res = resposta();
  await rotas[rota](r, res);
  return res;
}

for (const [rota, body, esperado] of [
  ['subscription', {}, /"active":true/],
  ['portal', {}, /"url":"https/],
  ['create-checkout', { plan: 'anual' }, /"url":"https/]
]) {
  test(`${rota}: chamada igual à do index.html (só o corpo com idToken) responde 200`, async () => {
    const res = await chamar(rota, req({ ...body, idToken: tok() }));
    assert.strictEqual(res.statusCode, 200, JSON.stringify(res.body));
    assert.match(JSON.stringify(res.body), esperado);
  });
}

test('create-checkout: usa o preço do plano e os códigos promocionais', async () => {
  for (const [plan, price] of [['anual', lib.PRICE_ANUAL], ['mensal', lib.PRICE_MENSAL]]) {
    const res = await chamar('create-checkout', req({ plan, idToken: tok() }));
    assert.strictEqual(res.statusCode, 200, JSON.stringify(res.body));
    assert.strictEqual(ultimaSessao.line_items[0].price, price);
    assert.strictEqual(ultimaSessao.allow_promotion_codes, true);
  }
});

test('create-checkout: plano inválido leva 400', async () => {
  const res = await chamar('create-checkout', req({ plan: 'gratis', idToken: tok() }));
  assert.strictEqual(res.statusCode, 400);
});

test('requireUser: primeira requisição do uid não leva 429; a 11ª leva', async () => {
  const idToken = tok();
  for (let i = 1; i <= 10; i++) {
    const res = resposta();
    assert.ok(await lib.requireUser(req({ idToken }), res), `requisição ${i}: ${res.statusCode}`);
  }
  const res = resposta();
  assert.strictEqual(await lib.requireUser(req({ idToken }), res), null);
  assert.strictEqual(res.statusCode, 429);
});

test('limite por IP: a 10ª passa e a 11ª leva 429', async () => {
  const ip = '10.9.9.9';
  for (let i = 1; i <= 10; i++) {
    const res = await chamar('subscription', req({ idToken: tok() }, { ip }));
    assert.strictEqual(res.statusCode, 200, `requisição ${i}`);
  }
  const res = await chamar('subscription', req({ idToken: tok() }, { ip }));
  assert.strictEqual(res.statusCode, 429);
  assert.ok(Number(res.headers['retry-after']) > 0);
});

test('método errado leva 405 e OPTIONS leva 204 com CORS', async () => {
  assert.strictEqual((await chamar('subscription', req({}, { method: 'GET' }))).statusCode, 405);
  const res = await chamar('subscription', req({}, { method: 'OPTIONS', origin: 'https://kauesn.github.io' }));
  assert.strictEqual(res.statusCode, 204);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://kauesn.github.io');
});

test('chamada vinda de kauesn.github.io, sem cookie, responde 200 com CORS', async () => {
  const res = await chamar('subscription', req({ idToken: tok() }, { origin: 'https://kauesn.github.io' }));
  assert.strictEqual(res.statusCode, 200, JSON.stringify(res.body));
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://kauesn.github.io');
});

test('origem fora da lista não recebe liberação de CORS', async () => {
  const res = await chamar('subscription', req({ idToken: tok() }, { origin: 'https://site-malicioso.example' }));
  assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
});

test('token recusado pelo Google leva 401', async () => {
  const res = await chamar('subscription', req({ idToken: 'invalido'.repeat(5) }));
  assert.strictEqual(res.statusCode, 401);
});

// Par de tokens que colide em FNV-1a de 32 bits, o hash usado antes no cache
function fnv(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
function parQueColide() {
  const vistos = new Map();
  for (let i = 0; ; i++) {
    const t = `eyJhbGciOiJSUzI1NiJ9.payload${i}.assinatura${i * 7919}`;
    const h = fnv(t);
    if (vistos.has(h)) return [vistos.get(h), t];
    vistos.set(h, t);
  }
}

test('token-cache: token que colide em FNV não herda a identidade de outro', async () => {
  tokenCache.clearCache();
  const [a, b] = parQueColide();
  assert.notStrictEqual(a, b);
  tokenCache.setCached(a, { uid: 'vitima', email: 'vitima@x.com', emailVerified: true });
  assert.strictEqual(tokenCache.getCached(b), null);
  assert.strictEqual(await lib.verifyIdToken(b), null); // o Google simulado recusa esse token
  assert.strictEqual(tokenCache.getCached(a).uid, 'vitima');
  tokenCache.clearCache();
});
