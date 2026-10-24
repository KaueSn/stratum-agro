// POST /api/create-checkout  → cria uma sessão de pagamento segura (Stripe Checkout)
// Exige login: o uid e o e-mail vêm do token do Firebase, nunca do corpo da requisição.
import { stripe, preflight, readBody, requireUser, fail, PRICE_MENSAL, PRICE_ANUAL, SITE_URL } from '../lib/stripe.js';

export default async function handler(req, res) {
  if (preflight(req, res)) return;
  const user = await requireUser(req, res);
  if (!user) return;

  const { plan } = readBody(req);
  if (plan !== 'mensal' && plan !== 'anual') return fail(res, 400, 'Plano inválido.');
  const price = plan === 'anual' ? PRICE_ANUAL : PRICE_MENSAL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: user.email || undefined,
      client_reference_id: user.uid,
      allow_promotion_codes: true,
      metadata: { uid: user.uid, plan },
      // O uid fica gravado na assinatura: é por ele que /api/subscription e /api/portal a encontram
      subscription_data: { metadata: { uid: user.uid, plan } },
      success_url: `${SITE_URL}?assinatura=sucesso`,
      cancel_url: `${SITE_URL}?assinatura=cancelada`
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    return fail(res, 502, 'Não foi possível iniciar o pagamento.', e);
  }
}
