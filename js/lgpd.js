// ============================================
// LGPD — aviso de armazenamento e direitos do titular
// ============================================
// O site não usa cookies de publicidade nem de análise. O navegador guarda
// apenas o necessário (sessão de login, progresso dos cursos, pastas e esta
// escolha). O aviso informa isso uma vez e leva à Política de Privacidade.
// LGPD.exportar(db, uid) baixa os dados do usuário em JSON (art. 18, V).
// LGPD.excluirConta(db, auth) apaga o perfil e a conta (art. 18, VI).
// ============================================

const LGPD = (() => {
  const KEY = 'stratum-lgpd-v1';
  const VERSAO_TERMOS = '2026-11-08';
  const SUBCOLECOES = ['projetos', 'campo_lotes', 'campo_agenda'];

  function jaViu() { try { return localStorage.getItem(KEY) === VERSAO_TERMOS; } catch (e) { return false; } }
  function marcar() { try { localStorage.setItem(KEY, VERSAO_TERMOS); } catch (e) {} }

  function mostrarAviso() {
    if (jaViu() || document.getElementById('lgpdBanner')) return;
    const box = document.createElement('div');
    box.className = 'lgpd-banner'; box.id = 'lgpdBanner';
    box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Aviso de privacidade');
    box.innerHTML = '<p>Usamos apenas o armazenamento <b>essencial</b> do navegador (login, progresso dos cursos e suas pastas). ' +
      'Não usamos cookies de publicidade nem de rastreamento. Saiba mais na <a href="privacidade.html">Política de Privacidade</a>.</p>' +
      '<button class="btn btn-primary" type="button" id="lgpdOk">Entendi</button>';
    document.body.appendChild(box);
    document.getElementById('lgpdOk').addEventListener('click', () => { marcar(); box.remove(); });
  }

  function baixar(nome, obj) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = nome;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  async function exportar(db, auth) {
    const u = auth && auth.currentUser;
    if (!u) throw new Error('Faça login para exportar seus dados.');
    const perfil = db ? await db.collection('users').doc(u.uid).get() : null;
    const subcolecoes = {};
    if (db) for (const nome of SUBCOLECOES) {
      try { subcolecoes[nome] = (await db.collection('users').doc(u.uid).collection(nome).get()).docs.map(d => d.data()); }
      catch (e) { subcolecoes[nome] = 'não foi possível ler'; }
    }
    const local = {};
    try {
      Object.keys(localStorage).filter(k => /^stratum|^mat/i.test(k)).forEach(k => { local[k] = localStorage.getItem(k); });
    } catch (e) {}
    baixar('meus-dados-stratum-agro.json', {
      geradoEm: new Date().toISOString(),
      conta: { uid: u.uid, email: u.email, emailVerificado: u.emailVerified, provedores: (u.providerData || []).map(p => p.providerId), criadaEm: u.metadata && u.metadata.creationTime, ultimoLogin: u.metadata && u.metadata.lastSignInTime },
      perfil: perfil && perfil.exists ? perfil.data() : null,
      dadosDaConta: subcolecoes,
      armazenadoNesteAparelho: local,
      observacao: 'Pagamentos são processados pela Stripe; os dados do cartão nunca passam pelo Stratum Agro.'
    });
  }

  async function excluirConta(db, auth) {
    const u = auth && auth.currentUser;
    if (!u) throw new Error('Faça login para excluir sua conta.');
    // O Firebase só exclui a conta com login recente: confere antes de apagar qualquer dado
    const ultimoLogin = Date.parse(u.metadata && u.metadata.lastSignInTime);
    if (ultimoLogin && Date.now() - ultimoLogin > 4 * 60 * 1000) throw new Error('Por segurança, saia, entre de novo e repita a exclusão logo em seguida. Nada foi apagado.');
    if (db) {
      for (const nome of SUBCOLECOES) {
        const c = db.collection('users').doc(u.uid).collection(nome);
        const s = await c.get();
        await Promise.all(s.docs.map(d => c.doc(d.id).delete()));
      }
      await db.collection('users').doc(u.uid).delete();
    }
    try { Object.keys(localStorage).filter(k => /^stratum|^mat/i.test(k)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    try { await u.delete(); }
    catch (e) {
      if (e && e.code === 'auth/requires-recent-login') {
        const err = new Error('Por segurança, saia, entre de novo e repita a exclusão. Seu perfil já foi apagado.');
        err.code = e.code; throw err;
      }
      throw e;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mostrarAviso);
  else mostrarAviso();

  return { VERSAO_TERMOS, exportar, excluirConta, mostrarAviso };
})();
