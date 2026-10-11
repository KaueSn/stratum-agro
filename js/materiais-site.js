// ============================================================
// MATERIAIS DE APOIO — versão do site institucional
// Catálogo público de cursos (aulas escritas + documentário narrado).
// O mesmo catálogo aparece na seção da landing e dentro do overlay
// (usado na área logada). O leitor é sempre um overlay em tela cheia.
// ============================================================

const MAT_KEY = 'stratum_materiais_progresso_v1';
let matTema = 'Todos';
let matQ = '';
let matCurso = null;
let matAba = 'aulas';
let matModo = 'catalogo'; // 'catalogo' | 'curso'

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function mIcon(nome) {
  return '<svg class="ic" aria-hidden="true"><use href="#i-' + nome + '"></use></svg>';
}

// ---------- PROGRESSO ----------
function matProg() {
  try { return JSON.parse(localStorage.getItem(MAT_KEY) || '{}') || {}; } catch (e) { return {}; }
}
function matProgSalvar(o) {
  try { localStorage.setItem(MAT_KEY, JSON.stringify(o)); } catch (e) {}
}
function matFeitas(id) { return matProg()[id] || []; }
function matTotalAulas() { return MATERIAIS.reduce((s, c) => s + c.aulas.length, 0); }
function matTotalFeitas() {
  const p = matProg();
  return MATERIAIS.reduce((s, c) => s + (p[c.id] ? p[c.id].length : 0), 0);
}

// ---------- CATÁLOGO (renderizado em qualquer elemento [data-mat-root]) ----------
function matRenderTudo() {
  document.querySelectorAll('[data-mat-root]').forEach(matRenderRoot);
}

function matRenderRoot(root) {
  if (!root) return;
  const filtros = root.querySelector('[data-mat-filtros]');
  const barra = root.querySelector('[data-mat-progresso]');
  const grid = root.querySelector('[data-mat-grid]');
  if (!grid) return;

  if (filtros) {
    const temas = ['Todos'].concat(MATERIAIS.map(c => c.tema).filter((t, i, a) => a.indexOf(t) === i));
    filtros.innerHTML = temas.map(t =>
      '<button class="mat-chip' + (t === matTema ? ' active' : '') + '" onclick="matSetTema(\'' + t + '\')">' + t + '</button>'
    ).join('');
  }

  if (barra) {
    const f = matTotalFeitas(), t = matTotalAulas();
    const pct = t ? Math.round((f / t) * 100) : 0;
    barra.innerHTML =
      '<span>' + mIcon('cert') + ' Seu progresso: <b>' + f + ' de ' + t + '</b> aulas (' + pct + '%)</span>' +
      '<span class="mat-track"><span class="mat-fill" style="width:' + pct + '%"></span></span>';
  }

  const q = matQ.trim().toLowerCase();
  const lista = MATERIAIS.filter(c => {
    if (matTema !== 'Todos' && c.tema !== matTema) return false;
    if (!q) return true;
    return [c.titulo, c.tema, c.nivel, c.resumo, c.documentario.titulo, c.documentario.sinopse]
      .concat(c.aulas.map(a => a.titulo + ' ' + a.objetivo)).join(' ').toLowerCase().indexOf(q) !== -1;
  });

  if (!lista.length) {
    grid.innerHTML = '<div class="mat-empty">Nenhum material encontrado. Tente outro termo ou tema.</div>';
    return;
  }

  grid.innerHTML = lista.map(c => {
    const feitas = matFeitas(c.id).length;
    const done = feitas >= c.aulas.length;
    return (
      '<article class="mat-card" onclick="matAbrir(\'' + c.id + '\')">' +
        '<div class="mat-cover">' +
          '<span class="mat-tag">' + esc(c.tema) + '</span>' +
          '<span class="mat-lvl">' + esc(c.nivel) + '</span>' +
          '<img src="' + c.capa + '" alt="Capa do curso ' + esc(c.titulo) + '" loading="lazy">' +
          (done ? '<span class="mat-done">' + mIcon('check') + ' Concluído</span>' : '') +
        '</div>' +
        '<div class="mat-body-card">' +
          '<h3>' + esc(c.titulo) + '</h3>' +
          '<p>' + esc(c.resumo) + '</p>' +
          '<div class="mat-meta">' +
            '<span>' + mIcon('level') + c.aulas.length + ' aulas</span>' +
            '<span>' + mIcon('video') + 'Documentário</span>' +
          '</div>' +
          '<span class="mat-cta">' + mIcon('play') + (feitas ? 'Continuar estudando' : 'Abrir curso') + '</span>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}

function matSetTema(t) { matTema = t; matRenderTudo(); }
function matBuscar(v) { matQ = v; matRenderTudo(); }

// ---------- OVERLAY ----------
function matOverlayEl() { return document.getElementById('matOverlay'); }
function matShellEl() { return document.getElementById('matShell'); }

function matAbrirOverlay() {
  const ov = matOverlayEl();
  ov.classList.add('active');
  document.body.style.overflow = 'hidden';
  ov.scrollTop = 0;
}

function matFechar() {
  const ov = matOverlayEl();
  if (ov) ov.classList.remove('active');
  document.body.style.overflow = '';
  matCurso = null;
  matModo = 'catalogo';
  // Se foi aberto pelo menu da área logada, devolve o destaque ao "Início"
  const btn = document.getElementById('navMateriais');
  if (btn && btn.classList.contains('active')) {
    document.querySelectorAll('.app-nav button').forEach(b => b.classList.remove('active'));
    const ini = document.querySelector('.app-nav button[data-panel="inicio"]');
    if (ini) ini.classList.add('active');
  }
  matRenderTudo();
}

function matAbrirCatalogo() {
  matCurso = null;
  matModo = 'catalogo';
  const shell = matShellEl();
  shell.innerHTML = matCatalogoHTML();
  matAbrirOverlay();
  matRenderRoot(shell.querySelector('[data-mat-root]'));
}

// Chamado pelo menu da área logada
function matAbrirCatalogoFromApp() {
  const btn = document.getElementById('navMateriais');
  if (btn) {
    document.querySelectorAll('.app-nav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  matAbrirCatalogo();
}

function matCatalogoHTML() {
  return (
    '<button class="mat-back" onclick="matFechar()">' + mIcon('back') + ' Voltar ao site</button>' +
    '<h2 class="mat-ov-h2">Materiais de apoio</h2>' +
    '<p class="mat-ov-p">Cursos completos sobre o agro, gratuitos e feitos para você aplicar no seu negócio: aulas escritas em formato de ensino e um documentário narrado em capítulos.</p>' +
    '<div data-mat-root>' +
      '<div class="mat-toolbar">' +
        '<label class="mat-search">' + mIcon('search') +
          '<input type="text" placeholder="Buscar curso, tema ou palavra-chave..." oninput="matBuscar(this.value)">' +
        '</label>' +
        '<div class="mat-filters" data-mat-filtros></div>' +
      '</div>' +
      '<div class="mat-progresso" data-mat-progresso></div>' +
      '<div class="mat-grid" data-mat-grid></div>' +
    '</div>'
  );
}

// Abre um curso no leitor (overlay)
function matAbrir(id, aba) {
  const c = MATERIAIS.filter(x => x.id === id)[0];
  if (!c) return;
  matCurso = c;
  matModo = 'curso';
  matAba = aba || 'aulas';
  matShellEl().innerHTML = matShellHTML(c);
  matAbrirOverlay();
}

function matVoltarCatalogo() {
  matCurso = null;
  matModo = 'catalogo';
  const shell = matShellEl();
  shell.innerHTML = matCatalogoHTML();
  matRenderRoot(shell.querySelector('[data-mat-root]'));
  const ov = matOverlayEl();
  if (ov) ov.scrollTop = 0;
}

function matShellHTML(c) {
  const feitas = matFeitas(c.id).length;
  return (
    '<button class="mat-back" onclick="matVoltarCatalogo()">' + mIcon('back') + ' Voltar ao catálogo</button>' +
    '<div class="mat-reader-head">' +
      '<div class="mat-reader-cover"><img src="' + c.capa + '" alt="Capa do curso ' + esc(c.titulo) + '"></div>' +
      '<div class="mat-reader-info">' +
        '<h2>' + esc(c.titulo) + '</h2>' +
        '<p>' + esc(c.resumo) + '</p>' +
        '<div class="mat-pills">' +
          '<span class="mat-pill">' + mIcon('book') + esc(c.tema) + '</span>' +
          '<span class="mat-pill">' + mIcon('level') + esc(c.nivel) + '</span>' +
          '<span class="mat-pill">' + mIcon('cap') + c.aulas.length + ' aulas</span>' +
          '<span class="mat-pill">' + mIcon('video') + 'Documentário · ' + esc(c.documentario.duracao) + '</span>' +
          '<span class="mat-pill">' + mIcon('check') + feitas + ' concluída(s)</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="mat-tabs">' +
      '<button class="mat-tab' + (matAba === 'aulas' ? ' active' : '') + '" onclick="matAbrir(\'' + c.id + '\',\'aulas\')">' + mIcon('book') + ' Aulas escritas</button>' +
      '<button class="mat-tab' + (matAba === 'documentario' ? ' active' : '') + '" onclick="matAbrir(\'' + c.id + '\',\'documentario\')">' + mIcon('video') + ' Documentário</button>' +
    '</div>' +
    (matAba === 'documentario' ? matDocHTML(c) : matAulasHTML(c))
  );
}

function matAulasHTML(c) {
  const feitas = matFeitas(c.id);
  return c.aulas.map((a, i) => {
    const done = feitas.indexOf(i) !== -1;
    return (
      '<div class="mat-lesson' + (i === 0 ? ' open' : '') + '" id="sl' + i + '">' +
        '<div class="mat-lhead" onclick="matToggle(' + i + ')">' +
          '<div class="mat-lnum">' + (i + 1) + '</div>' +
          '<div class="mat-ltitles"><h3>' + esc(a.titulo) + '</h3><span>' + esc(a.objetivo) + '</span></div>' +
          '<div class="mat-lright">' +
            '<span class="mat-len">' + mIcon('time') + esc(a.duracao) + '</span>' +
            '<button class="mat-check' + (done ? ' on' : '') + '" title="Marcar como concluída" ' +
              'onclick="event.stopPropagation();matDone(' + i + ')">' + mIcon('check') + '</button>' +
            '<span class="mat-chev">' + mIcon('arrow') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="mat-lbody">' +
          '<div class="mat-obj"><b>Objetivo da aula:</b> ' + esc(a.objetivo) + '</div>' +
          a.conteudo.map(p => '<p>' + esc(p) + '</p>').join('') +
          '<div class="mat-sub">' + mIcon('check') + ' Pontos-chave</div>' +
          '<ul class="mat-points">' + a.pontos.map(p => '<li>' + mIcon('check') + '<span>' + esc(p) + '</span></li>').join('') + '</ul>' +
          '<div class="mat-pratica"><div class="mat-pratica-t">' + mIcon('spark') + ' Aplicação prática</div>' + esc(a.pratica) + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function matDocHTML(c) {
  const d = c.documentario;
  return (
    '<div class="mat-doc-hero">' +
      '<img src="' + c.capa + '" alt="Cena do documentário ' + esc(d.titulo) + '">' +
      '<div class="mat-doc-info">' +
        '<span class="mat-doc-tag">' + mIcon('video') + ' Documentário narrado</span>' +
        '<h3>' + esc(d.titulo) + '</h3>' +
        '<p>' + esc(d.sinopse) + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="mat-note">' + mIcon('bulb') + '<span>Os capítulos abaixo são a <b>narração completa em texto</b>, no formato de roteiro de documentário. Toque em cada capítulo para ler.</span></div>' +
    d.capitulos.map((cap, i) =>
      '<div class="mat-chapter' + (i === 0 ? ' open' : '') + '" id="sc' + i + '">' +
        '<div class="mat-ctime">' + cap.t + '</div>' +
        '<div class="mat-cbody">' +
          '<div class="mat-chead" onclick="matToggleCap(' + i + ')"><h4>' + esc(cap.titulo) + '</h4><span class="mat-chev">' + mIcon('arrow') + '</span></div>' +
          '<div class="mat-ctext">' + cap.texto.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>' +
        '</div>' +
      '</div>'
    ).join('')
  );
}

function matToggle(i) {
  const el = document.getElementById('sl' + i);
  if (el) el.classList.toggle('open');
}
function matToggleCap(i) {
  const el = document.getElementById('sc' + i);
  if (el) el.classList.toggle('open');
}
function matDone(i) {
  if (!matCurso) return;
  const p = matProg();
  const id = matCurso.id;
  const l = p[id] || [];
  const pos = l.indexOf(i);
  if (pos === -1) { l.push(i); if (typeof toast === 'function') toast('Aula marcada como concluída.', 'ok'); }
  else { l.splice(pos, 1); }
  p[id] = l;
  matProgSalvar(p);
  const el = document.getElementById('sl' + i);
  const btn = el && el.querySelector('.mat-check');
  if (btn) btn.classList.toggle('on', l.indexOf(i) !== -1);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const ov = matOverlayEl();
    if (ov && ov.classList.contains('active')) {
      if (matModo === 'curso') matVoltarCatalogo(); else matFechar();
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (typeof MATERIAIS !== 'undefined') matRenderTudo();
});
