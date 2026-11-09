// GET /api/health → health check público (sem autenticação)
// Responde só se a função está de pé: não revela versão nem o que está configurado.
import { cors } from '../lib/stripe.js';

export default function handler(req, res) {
  cors(req, res);
  if (req.method !== 'GET') { res.status(405).json({ error: 'Método não permitido' }); return; }
  res.status(200).json({ ok: true });
}
