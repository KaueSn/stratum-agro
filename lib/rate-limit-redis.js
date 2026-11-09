// Rate-limit persistente via Upstash Redis REST (HTTP).
// Configuração por variáveis de ambiente:
//   UPSTASH_REDIS_URL  → https://xxx.upstash.io
//   UPSTASH_REDIS_TOKEN → token de acesso
// Sem configuração, cai de volta para rate-limit em memória (lib/rate-limit.js).
//
// Usa EVAL para executar um script atômico de janela deslizante (sliding window).

const UPSTASH_URL = process.env.UPSTASH_REDIS_URL || '';
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_TOKEN || '';
const FALLBACK = !UPSTASH_URL || !UPSTASH_TOKEN;

const SCRIPT = `
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window_ms = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local window_start = now - window_ms
redis.call('ZREMRANGEBYSCORE', key, 0, window_start)
local count = redis.call('ZCARD', key)
if count < limit then
  redis.call('ZADD', key, now, now .. ':' .. ARGV[4])
  redis.call('EXPIRE', key, math.ceil(window_ms / 1000) + 1)
  return 0
else
  local earliest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local retry = earliest[2] and (earliest[2] + window_ms - now) / 1000 or 0
  return math.ceil(retry)
end
`;

let redisOk = !FALLBACK;

async function naMemoria(key, limit, windowMs, now) {
  const { consumeRateLimit } = await import('./rate-limit.js');
  return consumeRateLimit(key, limit, windowMs, now);
}

export async function consume(key, limit, windowMs, now = Date.now()) {
  if (FALLBACK) return naMemoria(key, limit, windowMs, now);
  try {
    const r = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        ['eval', SCRIPT, 1, key, String(limit), String(windowMs), String(now), String(Math.random().toString(36).slice(2))]
      ])
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const data = await r.json();
    const res = Array.isArray(data) ? data[0] : data;
    // O Upstash devolve erro de comando com HTTP 200: sem número, não dá para liberar
    const retry = Number(res && res.result);
    if (!res || res.error || !Number.isFinite(retry)) throw new Error('resposta inválida do Redis');
    return retry;
  } catch (e) {
    console.error('[api] redis rate-limit falhou, usando fallback em memória', e && e.message);
    redisOk = false;
    return naMemoria(key, limit, windowMs, now);
  }
}

export function healthy() {
  return FALLBACK ? false : redisOk;
}