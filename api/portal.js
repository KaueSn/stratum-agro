// POST /api/portal  → abre o Portal de Cobrança do Stripe (gerenciar/cancelar assinatura)
// Exige login: abre apenas o portal do cliente ligado ao usuário logado.
import { stripe, preflight, requireUser, fail, findCustomerId, SITE_URL } from '../lib/stripe.js';

export default async function handler(req, res) {
  if (preflight(req, res)) return;
  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const customer = await findCustomerId(user);
    if (!customer) return fail(res, 404, 'Nenhuma assinatura encontrada para esta conta.');
    const session = await stripe.billingPortal.sessions.create({ customer, return_url: SITE_URL });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    return fail(res, 502, 'Não foi possível abrir o portal de cobrança.', e);
  }
}
