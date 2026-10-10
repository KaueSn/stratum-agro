// POST /api/portal  → abre o Portal de Cobrança do Stripe (gerenciar/cancelar assinatura)
import { stripe, cors, readBody, findOrCreateCustomer, SITE_URL } from '../lib/stripe.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!stripe) return res.status(500).json({ error: 'Stripe não configurado no servidor.' });

  const { email } = readBody(req);
  if (!email) return res.status(400).json({ error: 'Informe o e-mail.' });

  try {
    const customer = await findOrCreateCustomer(email);
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: SITE_URL
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      hint: 'Ative o Portal de Cobrança em Stripe → Configurações → Portal de cobrança do cliente.'
    });
  }
}
