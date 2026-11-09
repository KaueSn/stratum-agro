// ============================================
// PÁGINA DE ESTUDOS — renderização, filtros, mapa e pastas
// ============================================
// Depende de: estudos-data.js, indicadores.js, pastas.js, lgpd.js.
// Firebase é opcional: só serve para sincronizar as pastas com a conta.
// ============================================

(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IND = {}; ESTUDOS_INDICADORES.forEach(i => { IND[i.id] = i; });
  const TEMA = {}; ESTUDOS_TEMAS.forEach(t => { TEMA[t.id] = t.nome; });
  let valores = {};
  let filtro = 'todos', busca = '';

  const ICON_SAVE = '<svg viewBox="0 0 24 24"><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.5L5 21V4.5a1 1 0 0 1 1-1z"/></svg>';

  function toast(msg, tipo) {
    const t = document.createElement('div');
    t.className = 'toast' + (tipo === 'err' ? ' err' : ''); t.textContent = msg;
    $('toasts').appendChild(t); setTimeout(() => t.remove(), 3200);
  }
  function dataBR(iso) { const [a, m, d] = iso.split('-'); return d + '/' + m + '/' + a; }
  function botaoSalvar(item) {
    const on = Pastas.contem(item.id);
    return '<button class="es-save' + (on ? ' on' : '') + '" data-salvar="' + esc(item.id) + '" data-titulo="' + esc(item.titulo) + '" aria-label="' + (on ? 'Salvo. Salvar em outra pasta' : 'Salvar em uma pasta') + ': ' + esc(item.titulo) + '" title="Salvar em uma pasta">' + ICON_SAVE + '</button>';
  }
  function passa(tema, texto) {
    if (filtro !== 'todos' && tema !== filtro) return false;
    return !busca || texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').indexOf(busca) !== -1;
  }

  /* ---------- filtros ---------- */
  function renderFiltros() {
    const ops = [{ id: 'todos', nome: 'Todos' }].concat(ESTUDOS_TEMAS);
    $('esFiltros').innerHTML = ops.map(o => '<button type="button" data-tema="' + o.id + '" aria-pressed="' + (o.id === filtro) + '">' + esc(o.nome) + '</button>').join('');
  }
  $('esFiltros').addEventListener('click', e => {
    const b = e.target.closest('[data-tema]'); if (!b) return;
    filtro = b.dataset.tema; renderTudo();
  });
  let tBusca;
  $('esBusca').addEventListener('input', e => {
    clearTimeout(tBusca);
    tBusca = setTimeout(() => { busca = e.target.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); renderTudo(); }, 180);
  });

  /* ---------- indicadores ---------- */
  function renderIndicadores() {
    const html = ESTUDOS_INDICADORES.filter(i => passa(i.tema, i.nome + ' ' + i.origem)).map(i => {
      const r = valores[i.id];
      const carregando = !(i.id in valores);
      const v = carregando ? '<div class="v sk">000</div>' : (r ? '<div class="v">' + esc(indFormatar(i, r)) + '</div>' : '<div class="v na">indisponível agora</div>');
      const item = { id: 'ind-' + i.id, titulo: i.nome };
      return '<article class="es-ind" id="ind-' + i.id + '">' + botaoSalvar(item) +
        '<div class="t">' + esc(i.nome) + '</div>' + v +
        '<div class="r">' + (r ? 'Referência: ' + esc(r.ref) : '&nbsp;') + '</div>' +
        '<a class="f" href="' + esc(i.link) + '" target="_blank" rel="noopener">' + esc(i.origem) + ' ↗</a></article>';
    }).join('');
    $('esIndicadores').innerHTML = html || '<p class="es-nota">Nenhum indicador para este filtro.</p>';
  }

  /* ---------- correlações ---------- */
  function calculoOportunidade() {
    const cdi = valores.cdi;
    if (!cdi) return '';
    const ganho = indRendimentoCDI(100000, cdi.valor, 100);
    return '<div class="calc"><b>Conta rápida com o CDI de hoje:</b> R$ 100 mil aplicados por 100 dias renderiam cerca de <b>' +
      ganho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) +
      '</b> brutos. É o mínimo que o lote precisa superar para compensar o risco.</div>';
  }
  function renderCorrelacoes() {
    const html = ESTUDOS_CORRELACOES.filter(c => passa(c.tema, c.titulo + ' ' + c.texto + ' ' + c.acompanhe.join(' '))).map(c => {
      const vivos = (c.indicadores || []).map(id => {
        const i = IND[id]; if (!i) return '';
        return '<span>' + esc(i.nome) + ': <b>' + esc(indFormatar(i, valores[id])) + '</b></span>';
      }).join('');
      return '<article class="es-cor" id="' + c.id + '">' + botaoSalvar({ id: c.id, titulo: c.titulo }) +
        '<div class="tag">' + esc(TEMA[c.tema] || '') + '</div><h3>' + esc(c.titulo) + '</h3>' +
        (vivos ? '<div class="vivo">' + vivos + '</div>' : '') +
        '<p>' + esc(c.texto) + '</p>' + (c.calculo === 'oportunidade' ? calculoOportunidade() : '') +
        '<div class="lbl">O que acompanhar</div><ul>' + c.acompanhe.map(a => '<li>' + esc(a) + '</li>').join('') + '</ul></article>';
    }).join('');
    $('esCorrelacoes').innerHTML = html || '<p class="es-nota">Nenhuma correlação para este filtro.</p>';
  }

  /* ---------- mapa ---------- */
  const NOS = [
    { c: 'c-juros',    nome: 'Juros (Selic/CDI)', ind: 'selic', x: 40,  y: 30 },
    { c: 'c-dolar',    nome: 'Dólar e exportação', ind: 'dolar', x: 365, y: 10 },
    { c: 'c-milho',    nome: 'Safra de grãos',     ind: 'milho', x: 690, y: 30 },
    { c: 'c-ciclo',    nome: 'Ciclo pecuário',     ind: 'femeas', x: 715, y: 183 },
    { c: 'c-consumo',  nome: 'Inflação e renda',   ind: 'ipca', x: 690, y: 336 },
    { c: 'c-sanidade', nome: 'Sanidade',           ind: null, x: 365, y: 356 },
    { c: 'c-clima',    nome: 'Clima',              ind: null, x: 40,  y: 336 },
    { c: 'c-hedge',    nome: 'Proteção de preço',  ind: null, x: 15,  y: 183 }
  ];
  function renderMapa() {
    const W = 170, H = 54, cx = 450, cy = 210;
    const linhas = NOS.map(n => '<line class="lig" x1="' + (n.x + W / 2) + '" y1="' + (n.y + H / 2) + '" x2="' + cx + '" y2="' + cy + '"/>').join('');
    const nos = NOS.map(n => {
      const i = n.ind && IND[n.ind];
      const val = i ? indFormatar(i, valores[n.ind]) : 'ver efeitos';
      return '<g class="no" tabindex="0" role="button" data-ir="' + n.c + '" aria-label="' + esc(n.nome) + '">' +
        '<rect x="' + n.x + '" y="' + n.y + '" width="' + W + '" height="' + H + '" rx="12"/>' +
        '<text x="' + (n.x + 14) + '" y="' + (n.y + 23) + '">' + esc(n.nome) + '</text>' +
        '<text class="val" x="' + (n.x + 14) + '" y="' + (n.y + 41) + '">' + esc(val) + '</text></g>';
    }).join('');
    $('esMapa').innerHTML = '<svg viewBox="0 0 900 420" role="img" aria-label="Mapa de fatores que afetam a margem do confinamento">' +
      '<defs><linearGradient id="esGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22c55e"/><stop offset="1" stop-color="#e8c35a"/></linearGradient></defs>' +
      linhas + '<g class="centro"><circle cx="' + cx + '" cy="' + cy + '" r="72"/><text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle">Margem do</text><text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle">confinamento</text></g>' +
      nos + '</svg>';
  }
  function irPara(id) {
    if (filtro !== 'todos' || busca) { filtro = 'todos'; busca = ''; $('esBusca').value = ''; renderTudo(); }
    const el = $(id); if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('destaque'); setTimeout(() => el.classList.remove('destaque'), 2200);
  }
  $('esMapa').addEventListener('click', e => { const g = e.target.closest('[data-ir]'); if (g) irPara(g.dataset.ir); });
  $('esMapa').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const g = e.target.closest('[data-ir]'); if (g) { e.preventDefault(); irPara(g.dataset.ir); }
  });

  /* ---------- panorama ---------- */
  function renderPanorama() {
    const html = ESTUDOS_PANORAMA.slice().sort((a, b) => b.data.localeCompare(a.data))
      .filter(p => passa(p.tema, p.titulo + ' ' + p.texto + ' ' + p.importa)).map(p =>
        '<li class="es-fato" id="' + p.id + '">' + botaoSalvar({ id: p.id, titulo: p.titulo }) +
        '<div class="d">' + dataBR(p.data) + ' · ' + esc(TEMA[p.tema] || '') + '</div><h3>' + esc(p.titulo) + '</h3>' +
        '<p>' + esc(p.texto) + '</p><p class="imp"><b>Por que importa:</b> ' + esc(p.importa) + '</p>' +
        '<a class="src" href="' + esc(p.fonte.url) + '" target="_blank" rel="noopener">Fonte: ' + esc(p.fonte.nome) + ' ↗</a></li>').join('');
    $('esPanorama').innerHTML = html || '<li class="es-nota">Nenhum fato para este filtro.</li>';
  }

  function renderTudo() { renderFiltros(); renderIndicadores(); renderCorrelacoes(); renderPanorama(); }

  /* ---------- pastas ---------- */
  function abrir(id) {
    const d = $(id); d.hidden = false; d._volta = document.activeElement;
    const foco = d.querySelector('input, button'); if (foco) setTimeout(() => foco.focus(), 30);
  }
  function fechar(d) { d.hidden = true; if (d._volta && d._volta.focus) d._volta.focus(); }
  document.querySelectorAll('.es-drawer').forEach(d => {
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-fechar]')) fechar(d); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.es-drawer:not([hidden])').forEach(fechar);
  });

  function tituloDe(id) {
    const c = ESTUDOS_CORRELACOES.find(x => x.id === id) || ESTUDOS_PANORAMA.find(x => x.id === id);
    if (c) return c.titulo;
    if (id.indexOf('ind-') === 0 && IND[id.slice(4)]) return IND[id.slice(4)].nome;
    return id;
  }
  function renderPastas() {
    const lista = Pastas.lista();
    $('pastasCount').textContent = lista.reduce((s, p) => s + p.itens.length, 0);
    $('pastasLista').innerHTML = lista.map(p =>
      '<div class="es-pasta"><div class="es-pasta-h"><b>' + esc(p.nome) + ' <small style="color:var(--muted-2)">(' + p.itens.length + ')</small></b>' +
      '<span class="acoes"><button data-renomear="' + esc(p.id) + '">Renomear</button><button data-excluir="' + esc(p.id) + '">Excluir</button></span></div>' +
      (p.itens.length ? '<ul>' + p.itens.map(i => '<li><a href="' + esc(i.url || ('#' + i.id)) + '" data-abrir="' + esc(i.id) + '">' + esc(i.titulo) + '</a>' +
        '<button data-remover="' + esc(p.id) + '|' + esc(i.id) + '" aria-label="Remover ' + esc(i.titulo) + '">remover</button></li>').join('') + '</ul>'
        : '<div class="vazio">Vazia. Use o marcador nos cards para salvar aqui.</div>') + '</div>').join('');
  }
  $('btnPastas').addEventListener('click', () => { renderPastas(); abrir('pastasDrawer'); });
  $('formNovaPasta').addEventListener('submit', e => {
    e.preventDefault();
    try { if (Pastas.criar($('novaPastaNome').value)) { $('novaPastaNome').value = ''; toast('Pasta criada.'); } }
    catch (err) { toast(err.message, 'err'); }
  });
  $('pastasLista').addEventListener('click', e => {
    const b = e.target.closest('button, a'); if (!b) return;
    if (b.dataset.renomear) { const n = prompt('Novo nome da pasta:'); if (n) Pastas.renomear(b.dataset.renomear, n); }
    else if (b.dataset.excluir) { if (confirm('Excluir esta pasta e os itens salvos nela?')) Pastas.excluir(b.dataset.excluir); }
    else if (b.dataset.remover) { const [p, i] = b.dataset.remover.split('|'); Pastas.remover(p, i); }
    else if (b.dataset.abrir && (b.getAttribute('href') || '').charAt(0) === '#') { e.preventDefault(); fechar($('pastasDrawer')); irPara(b.dataset.abrir); }
  });

  let salvando = null;
  function opcoesSalvar() {
    $('salvarOpcoes').innerHTML = Pastas.lista().map(p => {
      const ja = p.itens.some(i => i.id === salvando.id);
      return '<button type="button" data-pasta="' + esc(p.id) + '"' + (ja ? ' disabled' : '') + '>' + esc(p.nome) + ' <small>' + (ja ? '· já salvo' : p.itens.length + ' itens') + '</small></button>';
    }).join('');
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-salvar]'); if (!b) return;
    salvando = { tipo: 'estudo', id: b.dataset.salvar, titulo: b.dataset.titulo || tituloDe(b.dataset.salvar), url: 'estudos.html#' + b.dataset.salvar };
    $('salvarItem').textContent = '“' + salvando.titulo + '”';
    opcoesSalvar(); abrir('salvarDialog');
  });
  $('salvarOpcoes').addEventListener('click', e => {
    const b = e.target.closest('[data-pasta]'); if (!b || !salvando) return;
    try { const p = Pastas.salvar(salvando, b.dataset.pasta); toast('Salvo em “' + p.nome + '”.'); fechar($('salvarDialog')); }
    catch (err) { toast(err.message, 'err'); }
  });
  $('formSalvarNova').addEventListener('submit', e => {
    e.preventDefault(); if (!salvando) return;
    try {
      const p = Pastas.criar($('salvarNovaNome').value); if (!p) return;
      Pastas.salvar(salvando, p.id); $('salvarNovaNome').value = '';
      toast('Salvo em “' + p.nome + '”.'); fechar($('salvarDialog'));
    } catch (err) { toast(err.message, 'err'); }
  });
  Pastas.onMudar(() => { renderPastas(); renderTudo(); });

  /* ---------- login opcional (sincronizar pastas) ---------- */
  function iniciarFirebase() {
    if (typeof firebase === 'undefined') return;
    try {
      if (!firebase.apps.length) firebase.initializeApp({
        apiKey: 'AIzaSyBg0DmU04eMjqssFFX6_xNOFTb7viCsWw4', authDomain: 'boitel-analytics.firebaseapp.com',
        projectId: 'boitel-analytics', storageBucket: 'boitel-analytics.firebasestorage.app',
        messagingSenderId: '644965055666', appId: '1:644965055666:web:4a4712f99a178d7eda5dab'
      });
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(async u => {
        if (u) {
          await Pastas.conectar(db, u.uid);
          $('pastasSync').textContent = 'Sincronizado com a sua conta (' + (u.email || '') + ').';
        } else {
          Pastas.desconectar();
          $('pastasSync').innerHTML = 'Salvo neste aparelho. <a href="./" style="color:var(--primary-2);text-decoration:underline">Entre na sua conta</a> para levar suas pastas para qualquer lugar.';
        }
      });
    } catch (e) { console.warn('Firebase indisponível; pastas ficam no aparelho.', e); }
  }

  /* ---------- progresso de leitura ---------- */
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    $('esProgress').style.width = (p * 100).toFixed(1) + '%';
  }, { passive: true });

  /* ---------- início ---------- */
  $('ano').textContent = new Date().getFullYear();
  $('esAtualizado').textContent = dataBR(ESTUDOS_ATUALIZADO);
  renderTudo(); renderMapa(); renderPastas();
  indBuscar().then(v => {
    valores = v;
    const ok = Object.values(v).filter(Boolean).length;
    $('esLiveDot').classList.toggle('on', ok > 0);
    $('esLiveTxt').textContent = ok ? ok + ' de ' + ESTUDOS_INDICADORES.length + ' indicadores ao vivo · Banco Central e IBGE' : 'Fontes oficiais indisponíveis agora; tente mais tarde';
    renderTudo(); renderMapa();
    if (location.hash.length > 1) setTimeout(() => irPara(location.hash.slice(1)), 200);
  });
  iniciarFirebase();
})();
