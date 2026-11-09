// Testes unitários do token-cache e rate-limit.
// Rodar: node --test tests/security.test.js
import { test } from 'node:test';
import assert from 'node:assert';
import * as tokenCache from '../lib/token-cache.js';
import * as rateLimit from '../lib/rate-limit.js';

test('token-cache: null para token inválido', () => {
  assert.strictEqual(tokenCache.getCached(null), null);
  assert.strictEqual(tokenCache.getCached('short'), null);
  assert.strictEqual(tokenCache.getCached('x'.repeat(19)), null);
});

test('token-cache: salva e recupera', () => {
  tokenCache.clearCache();
  const token = 'a'.repeat(40);
  tokenCache.setCached(token, { uid: 'u1', email: 'a@x.com', emailVerified: true });
  const cached = tokenCache.getCached(token);
  assert.ok(cached);
  assert.strictEqual(cached.uid, 'u1');
  assert.strictEqual(cached.email, 'a@x.com');
  assert.strictEqual(cached.emailVerified, true);
  tokenCache.clearCache();
});

test('rate-limit: permite até o limite', () => {
  rateLimit._resetRateLimit();
  const key = 'test:limit';
  for (let i = 0; i < 9; i++) {
    assert.strictEqual(rateLimit.consumeRateLimit(key), 0);
  }
  assert.strictEqual(rateLimit.consumeRateLimit(key), 0); // 10ª, última
  assert.ok(rateLimit.consumeRateLimit(key) > 0); // 11ª, bloqueada
  rateLimit._resetRateLimit();
});

test('rate-limit: chaves independentes', () => {
  rateLimit._resetRateLimit();
  for (let i = 0; i < 10; i++) rateLimit.consumeRateLimit('a');
  assert.ok(rateLimit.consumeRateLimit('a') > 0); // 'a' já atingiu limite
  assert.strictEqual(rateLimit.consumeRateLimit('b'), 0); // outra chave
  rateLimit._resetRateLimit();
});

console.log('✅ Security tests OK');