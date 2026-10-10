// POST /api/create-checkout  → cria uma sessão de pagamento segura (Stripe Checkout)
import { stripe, cors, readBody, PRICE_MENSAL, PRICE_ANUAL, SITE_URL } from '../lib/stripe.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });
  if (!stripe) return res.status(500).json({ error: 'Stripe não configurado no servidor.' });

  const { plan, email, uid } = readBody(req);
  const price = plan === 'anual' ? PRICE_ANUAL : PRICE_MENSAL;
  if (!price) return res.status(400).json({ error: 'Plano inválido.' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: email || undefined,
      client_reference_id: uid || undefined,
      allow_promotion_codes: true,
      metadata: { uid: uid || '', plan: plan || 'mensal' },
      success_url: `${SITE_URL}?assinatura=sucesso&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}?assinatura=cancelada`
    });
    return res.status(200).json({ url: session.url, id: session.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
