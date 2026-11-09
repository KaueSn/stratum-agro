// Rate-limit em memória (janela fixa). Usado como fallback quando o Redis
// (lib/rate-limit-redis.js) não está configurado.
//
// ATENÇÃO: vale por instância serverless; outra instância, ou uma nova após
// cold start, começa do zero. É só uma barreira contra abuso simples: a
// proteção forte é o Firewall da Vercel ou o Redis (Upstash).

export const RATE_LIMIT = 10;
export const RATE_WINDOW_MS = 60_000;
const hits = new Map();

// Registra uma requisição para a chave. Retorna 0 se liberada ou os segundos até liberar.
export function consumeRateLimit(key, limit = RATE_LIMIT, windowMs = RATE_WINDOW_MS, now = Date.now()) {
  if (hits.size > 5000) for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
  const rec = hits.get(key);
  if (!rec || now > rec.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return 0;
  }
  if (rec.count < limit) {
    rec.count++;
    return 0;
  }
  return Math.ceil((rec.reset - now) / 1000);
}

export function _resetRateLimit() { hits.clear(); }