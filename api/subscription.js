// POST /api/subscription  → verifica no Stripe se o e-mail tem assinatura ativa
import { stripe, cors, readBody, emailFromToken, getActiveSubscription } from '../lib/stripe.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!stripe) return res.status(500).json({ error: 'Stripe não configurado no servidor.' });

  const body = readBody(req);
  const email = (await emailFromToken(body.idToken)) || body.email || '';
  if (!email) return res.status(400).json({ error: 'Informe o e-mail.' });

  try {
    const info = await getActiveSubscription(email);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
