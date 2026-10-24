// POST /api/subscription  → informa se o usuário logado tem assinatura ativa no Stripe
// Exige login: só consulta a assinatura do próprio usuário (nunca um e-mail enviado pelo navegador).
import { preflight, requireUser, fail, getActiveSubscription } from '../lib/stripe.js';

export default async function handler(req, res) {
  if (preflight(req, res)) return;
  const user = await requireUser(req, res);
  if (!user) return;

  try {
    return res.status(200).json(await getActiveSubscription(user));
  } catch (e) {
    return fail(res, 502, 'Não foi possível verificar a assinatura.', e);
  }
}
