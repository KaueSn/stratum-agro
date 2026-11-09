// Cache em memória de tokens Firebase já validados.
// Evita chamar a API do Google (identitytoolkit) a cada request.
// TTL: 5 minutos. Chave = SHA-256 do token → { uid, email, emailVerified, exp }.
import { createHash } from 'node:crypto';

const TTL_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 5000;
const cache = new Map();

// A chave decide a identidade devolvida: precisa resistir a colisões.
function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function getCached(token) {
  if (typeof token !== 'string' || token.length < 20) return null;
  const h = hashToken(token);
  const entry = cache.get(h);
  if (!entry) return null;
  if (Date.now() > entry.exp) {
    cache.delete(h);
    return null;
  }
  return { uid: entry.uid, email: entry.email, emailVerified: entry.emailVerified };
}

// Lê o vencimento do próprio JWT (já validado pelo Google antes de chegar aqui).
function vencimentoJwt(token) {
  try {
    const exp = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString()).exp;
    return Number.isFinite(exp) ? exp * 1000 : null;
  } catch { return null; }
}

export function setCached(token, user) {
  if (typeof token !== 'string' || token.length < 20) return;
  const h = hashToken(token);
  const fim = Date.now() + TTL_MS;
  cache.set(h, { ...user, exp: Math.min(fim, vencimentoJwt(token) ?? fim) });
  // Evita crescimento indefinido
  if (cache.size > MAX_ENTRIES) {
    const first = cache.keys().next().value;
    cache.delete(first);
  }
}

export function clearCache() {
  cache.clear();
}