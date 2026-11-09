// ============================================
// ÁREA LOGADA — início personalizado
// ============================================
// Saudação pelo nome, resumo real da conta, ferramentas, mercado ao vivo e
// primeiros passos calculados pelo que a pessoa já fez. Usa os globais do
// index.html (currentUserData, isActiveSubscriber, effectiveRole, goPanel) e
// de materiais-site.js, indicadores.js e pastas.js. Nada aqui libera acesso:
// a autorização real continua nas regras do Firestore e na API.
// ============================================

window.Painel = (() => {
  const $ = id => document.getElementById(id);
  const KEY_SIM = 'stratum-painel-simulador';
  const NO_MERCADO = ['selic', 'cdi', 'dolar', 'ipca', 'soja', 'femeas'];
  let mercadoPedido = false;
  let pastasLigadas = false;
  let campoUid = null;

  function saudacao() {
    const h = new Date().getHours();
    return h < 5 ? 'Boa noite' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  }
  function primeiroNome(d) {
    const n = (d.name || (d.email || '').split('@')[0] || '').trim();
    return n ? n.split(/\s+/)[0] : 'produtor';
  }
  function fmt(iso) {
    const t = iso ? new Date(iso) : null;
    return t && !isNaN(t) ? t.toLocaleDateString('pt-BR') : '';
  }
  function diasAte(iso) {
    const t = iso ? new Date(iso).getTime() : NaN;
    return isNaN(t) ? null : Math.ceil((t - Date.now()) / 86400000);
  }
  function simuladorVisto() { try { return !!localStorage.getItem(KEY_SIM); } catch (e) { return false; } }
  function marcarSimulador() { try { localStorage.setItem(KEY_SIM, '1'); } catch (e) {} }

  function nomePlano(d, ativo) {
    if (effectiveRole(d) === 'admin') return 'Acesso total';
    if (!ativo) return 'Conta grátis';
    return d.plan === 'pro' ? 'Stratum Pro' : 'Stratum Access';
  }

  function renderConta(d, ativo) {
    $('statPlano').textContent = nomePlano(d, ativo);
    $('statPlanoSub').textContent = ativo ? 'Simulador liberado' : 'Cursos e estudos liberados';
    const dias = diasAte(d.subscriptionEnd);
    if (ativo && dias !== null && dias >= 0) {
      $('statValidade').textContent = fmt(d.subscriptionEnd);
      $('statValidadeSub').textContent = dias === 0 ? 'vence hoje' : 'faltam ' + dias + ' dia' + (dias === 1 ? '' : 's');
    } else {
      $('statValidade').textContent = ativo ? 'Sem vencimento' : 'Sem prazo';
      $('statValidadeSub').textContent = ativo ? '' : 'A conta grátis não vence';
    }
    // Cargo só interessa à equipe; para o cliente seria ruído
    $('contaCargo').style.display = effectiveRole(d) === 'user' ? 'none' : '';
    const feitas = matTotalFeitas(), total = matTotalAulas();
    $('statAulas').textContent = feitas + ' de ' + total;
    $('statAulasSub').textContent = feitas ? 'aulas concluídas' : 'nenhuma aula ainda';
  }

  function proximoCurso() {
    const prog = matProg();
    return MATERIAIS.find(c => (prog[c.id] || []).length > 0 && (prog[c.id] || []).length < c.aulas.length)
      || MATERIAIS.find(c => !(prog[c.id] || []).length) || MATERIAIS[0];
  }

  function renderFerramentas() {
    const feitas = matTotalFeitas(), total = matTotalAulas();
    const c = proximoCurso();
    $('ferCursosTxt').textContent = feitas ? 'Continue em: ' + c.titulo : 'Comece por: ' + c.titulo;
    $('ferCursosBarra').style.width = (total ? feitas / total * 100 : 0).toFixed(0) + '%';
    const salvos = typeof Pastas !== 'undefined' ? Pastas.lista().reduce((s, p) => s + p.itens.length, 0) : 0;
    $('ferEstudosTxt').textContent = salvos
      ? salvos + (salvos === 1 ? ' item salvo' : ' itens salvos') + ' nas suas pastas'
      : 'Juros, dólar, safra e ciclo pecuário: como chegam à sua margem';
  }

  function renderPassos(d, ativo) {
    const salvos = typeof Pastas !== 'undefined' ? Pastas.lista().reduce((s, p) => s + p.itens.length, 0) : 0;
    const passos = [
      { t: 'Criar sua conta', ok: true },
      { t: 'Concluir sua primeira aula', ok: matTotalFeitas() > 0, acao: 'Ir aos cursos', fn: () => matAbrirCatalogoFromApp() },
      { t: 'Salvar um estudo em uma pasta', ok: salvos > 0, acao: 'Abrir estudos', href: 'estudos.html' },
      { t: 'Cadastrar um lote em Minha fazenda', ok: typeof CampoDados !== 'undefined' && CampoDados.lotes().length > 0, acao: 'Abrir', href: 'campo.html' },
      { t: 'Simular o seu primeiro lote', ok: simuladorVisto(), acao: ativo ? 'Abrir simulador' : 'Ver planos', fn: () => abrirSimulador(ativo) }
    ];
    const feitos = passos.filter(p => p.ok).length;
    const ul = $('passosLista');
    ul.textContent = '';
    passos.forEach(p => {
      const li = document.createElement('li');
      if (p.ok) li.className = 'ok';
      const tick = document.createElement('span'); tick.className = 'tick'; tick.textContent = '✓'; tick.setAttribute('aria-hidden', 'true');
      const t = document.createElement('span'); t.className = 't'; t.textContent = p.t;
      li.append(tick, t);
      if (!p.ok) {
        if (p.href) { const a = document.createElement('a'); a.className = 'ir'; a.href = p.href; a.textContent = p.acao + ' →'; li.append(a); }
        else { const b = document.createElement('button'); b.type = 'button'; b.textContent = p.acao + ' →'; b.addEventListener('click', p.fn); li.append(b); }
      }
      ul.append(li);
    });
    $('passosTitulo').textContent = feitos === passos.length ? 'Tudo em dia' : 'Primeiros passos (' + feitos + ' de ' + passos.length + ')';
    renderSalvos();
  }

  function renderSalvos() {
    const box = $('salvosLista');
    box.textContent = '';
    if (typeof Pastas === 'undefined') return;
    const itens = [];
    Pastas.lista().forEach(p => p.itens.forEach(i => itens.push(i)));
    itens.sort((a, b) => String(b.salvoEm).localeCompare(String(a.salvoEm)));
    itens.slice(0, 3).forEach(i => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = /^estudos\.html#/.test(i.url) ? i.url : 'estudos.html';
      a.textContent = i.titulo;
      li.append(a); box.append(li);
    });
    $('salvosBloco').style.display = itens.length ? '' : 'none';
  }

  // Compromissos vencidos ou da semana e lotes no cocho, vindos de Minha fazenda
  function renderNaLida() {
    if (typeof CampoDados === 'undefined') return;
    const C = CampoCalc, ref = C.hoje();
    const ativos = CampoDados.lotes().filter(l => l.status !== 'encerrado');
    const itens = CampoDados.agenda().filter(i => !i.feito && C.diasEntre(ref, i.data) <= 7).slice(0, 4);
    const ul = $('naLidaLista');
    ul.textContent = '';
    itens.forEach(i => {
      const li = document.createElement('li');
      const d = C.diasEntre(ref, i.data);
      const a = document.createElement('a');
      a.href = 'campo.html#agenda';
      a.textContent = i.titulo + ' · ' + (d < 0 ? 'atrasado' : d === 0 ? 'hoje' : 'em ' + d + (d === 1 ? ' dia' : ' dias'));
      li.append(a); ul.append(li);
    });
    $('naLidaBloco').style.display = itens.length ? '' : 'none';
    $('ferCampoTxt').textContent = ativos.length
      ? ativos.length + (ativos.length === 1 ? ' lote' : ' lotes') + ' no cocho. Registre pesagens e custos.'
      : 'Caderno do lote, agenda e calculadoras. Funciona sem internet.';
  }

  async function renderMercado() {
    if (mercadoPedido) return;
    mercadoPedido = true;
    const box = $('mercadoGrid');
    const mapa = {}; ESTUDOS_INDICADORES.forEach(i => { mapa[i.id] = i; });
    let v = {};
    try { v = await indBuscar(NO_MERCADO); } catch (e) {}
    box.textContent = '';
    NO_MERCADO.forEach(id => {
      const i = mapa[id]; if (!i) return;
      const el = document.createElement('div');
      const l = document.createElement('div'); l.className = 'l'; l.textContent = i.nome.replace(/ \(.*\)$/, '');
      const val = document.createElement('div'); val.className = 'v'; val.textContent = v[id] ? indFormatar(i, v[id]) : 'indisponível';
      const r = document.createElement('div'); r.className = 'r'; r.textContent = v[id] ? v[id].ref : '';
      el.append(l, val, r); box.append(el);
    });
  }

  function abrirSimulador(ativo) {
    if (!ativo) return goPanel('assinatura');
    marcarSimulador();
    window.open(SIM_URL, '_blank', 'noopener');
    render();
  }

  function render() {
    const d = currentUserData;
    if (!d || !$('lidaSaudacao')) return;
    const ativo = isActiveSubscriber();
    $('lidaSaudacao').textContent = saudacao() + ', ' + primeiroNome(d) + '.';
    $('lidaData').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    $('lidaFrase').textContent = ativo
      ? 'Qual lote vamos colocar no papel hoje? Compare os estados e veja se a conta fecha acima do CDI.'
      : 'Sua conta já dá acesso aos cursos e aos estudos. Quando quiser colocar um lote no papel, o simulador abre com um plano.';
    $('btnSim').style.display = ativo ? '' : 'none';
    $('btnLiberar').style.display = ativo ? 'none' : '';
    $('pfAvatar').textContent = $('appAvatar').textContent;
    $('assPlanoAtual').textContent = nomePlano(d, ativo);
    renderConta(d, ativo);
    renderFerramentas();
    renderPassos(d, ativo);
    renderNaLida();
    renderMercado();
    const uid = typeof auth !== 'undefined' && auth && auth.currentUser ? auth.currentUser.uid : null;
    if (uid && uid !== campoUid && typeof CampoDados !== 'undefined') { campoUid = uid; CampoDados.conectar(db, uid); }
    if (!pastasLigadas && typeof Pastas !== 'undefined') {
      pastasLigadas = true;
      Pastas.onMudar(() => { renderFerramentas(); renderPassos(currentUserData || {}, isActiveSubscriber()); });
      if (typeof db !== 'undefined' && db && typeof auth !== 'undefined' && auth && auth.currentUser) Pastas.conectar(db, auth.currentUser.uid);
    }
  }

  // Ao fechar os cursos, devolve o destaque do menu ao painel aberto e atualiza o progresso
  const fecharOriginal = window.matFechar;
  window.matFechar = function () {
    const r = fecharOriginal.apply(this, arguments);
    const btn = $('navMateriais'); if (btn) btn.classList.remove('active');
    render();
    return r;
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-simulador]');
    if (!el) return;
    e.preventDefault();
    abrirSimulador(isActiveSubscriber());
  });

  if (typeof CampoDados !== 'undefined') CampoDados.onMudar(m => { if (m === 'dados') render(); });
  render();
  return { render };
})();
