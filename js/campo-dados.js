// ============================================
// DADOS DO CAMPO — salva no aparelho e sincroniza
// ============================================
// Primeiro grava no aparelho (funciona sem internet); com login e conexão,
// sincroniza em users/{uid}/campo_lotes e users/{uid}/campo_agenda.
// Conflito entre aparelhos: vence a alteração mais recente de cada lote,
// lançamento ou compromisso. Excluir marca `excluido`, para a exclusão
// chegar aos outros aparelhos em vez de o item "ressuscitar".
// ============================================

const CampoDados = (() => {
  const PREFIXO = 'stratum-campo-v1-';
  const MAX_EVENTOS = 1500, MAX_LOTES = 200, MAX_AGENDA = 500;
  let dono = 'anon';
  let dados = ler(dono);
  let ouvintes = [];
  let remoto = null;       // { db, uid }
  let status = 'local';    // local | sincronizando | ok | erro
  let tempo = null;

  function vazio() { return { lotes: {}, agenda: {} }; }
  function ler(id) {
    try {
      const v = JSON.parse(localStorage.getItem(PREFIXO + id) || 'null');
      if (v && typeof v === 'object') return { lotes: v.lotes || {}, agenda: v.agenda || {} };
    } catch (e) {}
    return vazio();
  }
  function gravar() {
    try { localStorage.setItem(PREFIXO + dono, JSON.stringify(dados)); }
    catch (e) { avisar('erro-espaco'); }
  }
  function avisar(motivo) { ouvintes.forEach(fn => { try { fn(motivo || status); } catch (e) {} }); }
  function novoId(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function agora() { return Date.now(); }
  function marcar() {
    gravar(); avisar('dados');
    agendarEnvio();
  }

  /* ---------- lotes ---------- */
  function lotes() { return Object.values(dados.lotes).filter(l => !l.excluido).sort((a, b) => a.dataEntrada < b.dataEntrada ? 1 : -1); }
  function lote(id) { const l = dados.lotes[id]; return l && !l.excluido ? l : null; }
  function salvarLote(campos, id) {
    if (!id && Object.keys(dados.lotes).length >= MAX_LOTES) throw new Error('Limite de ' + MAX_LOTES + ' lotes atingido.');
    const base = id && dados.lotes[id] ? dados.lotes[id] : { id: novoId('l'), criadoEm: agora(), status: 'ativo', eventos: [] };
    const l = Object.assign({}, base, campos, { atualizadoEm: agora() });
    dados.lotes[l.id] = l;
    marcar();
    return l;
  }
  function excluirLote(id) {
    const l = dados.lotes[id]; if (!l) return;
    l.excluido = true; l.eventos = []; l.atualizadoEm = agora();
    marcar();
  }
  function adicionarEvento(loteId, campos) {
    const l = dados.lotes[loteId]; if (!l) throw new Error('Lote não encontrado.');
    if ((l.eventos || []).length >= MAX_EVENTOS) throw new Error('Este lote atingiu o limite de ' + MAX_EVENTOS + ' lançamentos.');
    const t = agora();
    const ev = Object.assign({ id: novoId('e'), criadoEm: t, atualizadoEm: t }, campos);
    l.eventos = (l.eventos || []).concat([ev]);
    if (ev.tipo === 'venda') l.status = 'encerrado';
    l.atualizadoEm = t;
    marcar();
    return ev;
  }
  function excluirEvento(loteId, eventoId) {
    const l = dados.lotes[loteId]; if (!l) return;
    const t = agora();
    let eraVenda = false;
    l.eventos = l.eventos.map(e => { if (e.id !== eventoId) return e; eraVenda = e.tipo === 'venda'; return { id: e.id, tipo: e.tipo, data: e.data, excluido: true, atualizadoEm: t }; });
    if (eraVenda) l.status = 'ativo';
    l.atualizadoEm = t;
    marcar();
  }

  /* ---------- agenda ---------- */
  function agenda() { return Object.values(dados.agenda).filter(a => !a.excluido).sort((a, b) => a.data < b.data ? -1 : a.data > b.data ? 1 : 0); }
  function salvarItem(campos, id) {
    if (!id && Object.keys(dados.agenda).length >= MAX_AGENDA) throw new Error('Limite de ' + MAX_AGENDA + ' compromissos atingido.');
    const base = id && dados.agenda[id] ? dados.agenda[id] : { id: novoId('a'), criadoEm: agora(), feito: false };
    const it = Object.assign({}, base, campos, { atualizadoEm: agora() });
    dados.agenda[it.id] = it;
    marcar();
    return it;
  }
  function excluirItem(id) {
    const it = dados.agenda[id]; if (!it) return;
    dados.agenda[id] = { id, data: it.data, titulo: '', excluido: true, atualizadoEm: agora(), criadoEm: it.criadoEm || 0 };
    marcar();
  }

  /* ---------- sincronização ---------- */
  function unirEventos(a, b) {
    const m = {};
    (a || []).concat(b || []).forEach(e => { if (e && e.id && (!m[e.id] || (e.atualizadoEm || 0) > (m[e.id].atualizadoEm || 0))) m[e.id] = e; });
    return Object.values(m).slice(-MAX_EVENTOS);
  }
  function unirLote(local, nuvem) {
    if (!local) return nuvem;
    if (!nuvem) return local;
    const maisNovo = (nuvem.atualizadoEm || 0) > (local.atualizadoEm || 0) ? nuvem : local;
    const r = Object.assign({}, maisNovo, { eventos: maisNovo.excluido ? [] : unirEventos(local.eventos, nuvem.eventos) });
    return r;
  }
  function col(nome) { return remoto.db.collection('users').doc(remoto.uid).collection(nome); }
  function mudar(s) { if (s !== status) { status = s; avisar('status'); } }

  function agendarEnvio() {
    clearTimeout(tempo);
    if (remoto) tempo = setTimeout(sincronizar, 1500);
  }

  let rodando = false, deNovo = false;
  async function sincronizar() {
    if (!remoto) return;
    if (rodando) { deNovo = true; return; }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) { mudar('local'); return; }
    rodando = true; mudar('sincronizando');
    const uidAtual = remoto.uid;
    try {
      const [snapL, snapA] = await Promise.all([col('campo_lotes').get(), col('campo_agenda').get()]);
      if (!remoto || remoto.uid !== uidAtual) return;
      const nuvemL = {}, nuvemA = {};
      snapL.forEach(d => { nuvemL[d.id] = d.data(); });
      snapA.forEach(d => { nuvemA[d.id] = d.data(); });

      const envios = [];
      new Set(Object.keys(dados.lotes).concat(Object.keys(nuvemL))).forEach(id => {
        const un = unirLote(dados.lotes[id], nuvemL[id]);
        dados.lotes[id] = un;
        if (JSON.stringify(un) !== JSON.stringify(nuvemL[id])) envios.push(['campo_lotes', id, un]);
      });
      new Set(Object.keys(dados.agenda).concat(Object.keys(nuvemA))).forEach(id => {
        const l = dados.agenda[id], n = nuvemA[id];
        const un = !l ? n : !n ? l : ((n.atualizadoEm || 0) > (l.atualizadoEm || 0) ? n : l);
        dados.agenda[id] = un;
        if (JSON.stringify(un) !== JSON.stringify(n)) envios.push(['campo_agenda', id, un]);
      });
      await Promise.all(envios.map(([c, id, v]) => col(c).doc(id).set(v)));
      gravar(); mudar('ok'); avisar('dados');
    } catch (e) {
      console.warn('Campo: sincronização não concluída', e && e.code);
      mudar('erro');
    } finally {
      rodando = false;
      if (deNovo) { deNovo = false; agendarEnvio(); }
    }
  }

  // Troca o dono dos dados. O que foi feito sem login vai para a conta que entrou.
  function conectar(db, uid) {
    clearTimeout(tempo);
    if (!db || !uid) {
      remoto = null; dono = 'anon'; dados = ler('anon'); mudar('local'); avisar('dados');
      return Promise.resolve();
    }
    remoto = { db, uid }; dono = uid;
    const anon = ler('anon');
    dados = ler(uid);
    if (Object.keys(anon.lotes).length || Object.keys(anon.agenda).length) {
      Object.assign(dados.lotes, Object.fromEntries(Object.entries(anon.lotes).map(([k, v]) => [k, unirLote(dados.lotes[k], v)])));
      Object.assign(dados.agenda, anon.agenda);
      gravar();
      try { localStorage.removeItem(PREFIXO + 'anon'); } catch (e) {}
    }
    avisar('dados');
    return sincronizar();
  }

  // Direitos do titular (LGPD): lê e apaga o que está na nuvem
  async function lerNuvem(db, uid) {
    const out = {};
    for (const nome of ['campo_lotes', 'campo_agenda']) {
      try {
        const s = await db.collection('users').doc(uid).collection(nome).get();
        out[nome] = s.docs.map(d => d.data());
      } catch (e) { out[nome] = 'indisponível'; }
    }
    return out;
  }
  async function apagarNuvem(db, uid) {
    for (const nome of ['campo_lotes', 'campo_agenda']) {
      const c = db.collection('users').doc(uid).collection(nome);
      const s = await c.get();
      await Promise.all(s.docs.map(d => c.doc(d.id).delete()));
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => sincronizar());
    window.addEventListener('offline', () => mudar('local'));
    window.addEventListener('storage', e => { if (e.key === PREFIXO + dono) { dados = ler(dono); avisar('dados'); } });
  }

  return { lotes, lote, salvarLote, excluirLote, adicionarEvento, excluirEvento, agenda, salvarItem, excluirItem, conectar, sincronizar, lerNuvem, apagarNuvem,
    onMudar(fn) { ouvintes.push(fn); }, status: () => status, logado: () => !!remoto };
})();
