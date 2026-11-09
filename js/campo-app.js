// ============================================
// MINHA FAZENDA — início, abas, login e modo offline
// ============================================

(function () {
  const { $, esc, toast } = CampoUI;
  const ABAS = ['lotes', 'agenda', 'calculadoras'];

  function abrirAba(nome, focar) {
    if (ABAS.indexOf(nome) === -1) nome = 'lotes';
    ABAS.forEach(a => {
      $('aba-' + a).hidden = a !== nome;
      $('tab-' + a).setAttribute('aria-selected', a === nome);
    });
    if (focar) { try { history.replaceState(null, '', '#' + nome); } catch (e) {} }
  }
  document.querySelector('.cp-tabs').addEventListener('click', e => {
    const b = e.target.closest('[data-aba]'); if (b) abrirAba(b.dataset.aba, true);
  });
  window.addEventListener('hashchange', () => abrirAba(location.hash.slice(1)));

  let logado = false;
  function pintarStatus() {
    const el = $('cpStatus'); const s = CampoDados.status();
    el.className = 'cp-status' + (s === 'ok' ? ' ok' : s === 'erro' ? ' erro' : '');
    if (!navigator.onLine) el.textContent = 'Sem internet: salvando no aparelho';
    else if (s === 'sincronizando') el.textContent = 'Sincronizando…';
    else if (s === 'ok') el.textContent = 'Sincronizado com a conta';
    else if (s === 'erro') el.textContent = 'Salvo no aparelho; sincroniza depois';
    else if (logado) el.textContent = 'Salvo neste aparelho';
    else el.innerHTML = 'Só neste aparelho · <a href="./">entrar</a>';
  }
  function pintarResumo() {
    const ativos = CampoDados.lotes().filter(l => l.status !== 'encerrado');
    const ref = CampoCalc.hoje();
    const hoje = CampoDados.agenda().filter(i => !i.feito && i.data <= ref).length;
    if (!ativos.length && !hoje) return;
    const cab = ativos.reduce((s, l) => s + CampoCalc.resumirLote(l).cabecas, 0);
    const p = [];
    if (ativos.length) p.push(ativos.length + (ativos.length === 1 ? ' lote' : ' lotes') + ' no cocho, ' + cab.toLocaleString('pt-BR') + ' cabeças');
    if (hoje) p.push(hoje + (hoje === 1 ? ' compromisso para resolver' : ' compromissos para resolver'));
    $('cpResumo').textContent = p.join(' · ') + '.';
  }
  function renderTudo() { CampoLotes.render(); CampoAgenda.render(); pintarResumo(); pintarStatus(); }

  CampoDados.onMudar(m => {
    if (m === 'erro-espaco') return toast('O armazenamento do aparelho está cheio.', 'err');
    if (m === 'status') return pintarStatus();
    // Não redesenha com o formulário aberto para não perder o que está sendo digitado
    if (!$('cpDialog').open) renderTudo();
  });
  $('cpDialog').addEventListener('close', renderTudo);
  window.addEventListener('online', pintarStatus);
  window.addEventListener('offline', pintarStatus);

  /* ---------- login opcional ---------- */
  function iniciarConta() {
    if (typeof firebase === 'undefined') return;
    try {
      if (!firebase.apps.length) firebase.initializeApp({
        apiKey: 'AIzaSyBg0DmU04eMjqssFFX6_xNOFTb7viCsWw4', authDomain: 'boitel-analytics.firebaseapp.com',
        projectId: 'boitel-analytics', storageBucket: 'boitel-analytics.firebasestorage.app',
        messagingSenderId: '644965055666', appId: '1:644965055666:web:4a4712f99a178d7eda5dab'
      });
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(u => {
        logado = !!u;
        CampoDados.conectar(u ? db : null, u ? u.uid : null);
        pintarStatus();
      });
    } catch (e) { console.warn('Firebase indisponível; dados ficam no aparelho.', e); }
  }

  /* ---------- modo campo (offline + instalar) ---------- */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: 'campo' }).catch(e => console.warn('Modo offline indisponível', e));
  }
  let pedido = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedido = e; $('cpInstalar').hidden = false; });
  $('cpInstalar').addEventListener('click', async () => {
    if (!pedido) return;
    pedido.prompt(); await pedido.userChoice; pedido = null; $('cpInstalar').hidden = true;
  });

  /* ---------- início ---------- */
  $('ano').textContent = new Date().getFullYear();
  CampoUI.iniciar(); CampoLotes.iniciar(); CampoAgenda.iniciar(); CampoCalculadoras.iniciar();
  abrirAba(location.hash.slice(1) || 'lotes');
  renderTudo();
  iniciarConta();
})();
