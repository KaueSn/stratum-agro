// ============================================
// MINHA FAZENDA — utilitários de tela
// ============================================

const CampoUI = (() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const moeda = (v, casas = 0) => v == null || !isFinite(v) ? '—' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: casas, maximumFractionDigits: casas });
  const num = (v, casas = 0) => v == null || !isFinite(v) ? '—' : v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  const dataBR = s => s ? s.split('-').reverse().join('/') : '—';
  const dataCurta = s => s ? s.slice(8, 10) + '/' + s.slice(5, 7) : '';
  // Aceita "19,5" e "1.234,5" (o teclado do celular costuma usar vírgula)
  function lerNumero(txt) {
    let s = String(txt == null ? '' : txt).trim().replace(/\s/g, '');
    if (!s) return null;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    const v = Number(s);
    return isFinite(v) ? v : NaN;
  }

  function toast(msg, tipo) {
    const t = document.createElement('div');
    t.className = 'toast' + (tipo === 'err' ? ' err' : ''); t.textContent = msg;
    $('toasts').appendChild(t); setTimeout(() => t.remove(), 3200);
  }

  /* Formulário único para todos os lançamentos.
     campos: [{ id, rotulo, tipo: 'numero'|'data'|'texto'|'area'|'lista', valor, obrig, min, max, ajuda, todo, opcoes }]
     ou { secao: 'título' }. aoSalvar(valores) pode lançar Error para mostrar a mensagem. */
  let atual = null;
  function formulario(cfg) {
    atual = cfg;
    $('cpDlgTitulo').textContent = cfg.titulo;
    $('cpEnviar').textContent = cfg.enviar || 'Salvar';
    $('cpErro').textContent = '';
    $('cpCampos').innerHTML = cfg.campos.map(c => {
      if (c.secao) return '<div class="cp-secao">' + esc(c.secao) + '</div>';
      const id = 'f_' + c.id, v = c.valor == null ? '' : c.valor;
      const req = c.obrig ? ' required' : '';
      let ctl;
      if (c.tipo === 'data') ctl = '<input type="date" id="' + id + '" value="' + esc(v) + '"' + req + '>';
      else if (c.tipo === 'lista') ctl = '<select id="' + id + '">' + c.opcoes.map(o => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(v) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
      else if (c.tipo === 'area') ctl = '<textarea id="' + id + '" rows="3" maxlength="' + (c.max || 500) + '"' + req + '>' + esc(v) + '</textarea>';
      else if (c.tipo === 'numero') ctl = '<input type="text" inputmode="decimal" autocomplete="off" id="' + id + '" value="' + esc(String(v).replace('.', ',')) + '"' + req + '>';
      else ctl = '<input type="text" id="' + id + '" maxlength="' + (c.max || 80) + '" value="' + esc(v) + '"' + req + '>';
      return '<div class="cp-campo' + (c.todo ? ' todo' : '') + '"><label for="' + id + '">' + esc(c.rotulo) + (c.obrig ? '' : ' (opcional)') + ctl + (c.ajuda ? '<span class="cp-ajuda">' + esc(c.ajuda) + '</span>' : '') + '</label></div>';
    }).join('');
    $('cpDialog').showModal();
    const prim = $('cpCampos').querySelector('input,select,textarea');
    if (prim) prim.focus();
  }
  function fechar() { $('cpDialog').close(); atual = null; }

  function coletar() {
    const out = {};
    for (const c of atual.campos) {
      if (c.secao) continue;
      const bruto = $('f_' + c.id).value;
      if (c.tipo === 'numero') {
        const v = lerNumero(bruto);
        if (v === null) { if (c.obrig) throw new Error('Preencha: ' + c.rotulo); out[c.id] = null; continue; }
        if (isNaN(v)) throw new Error('Número inválido em: ' + c.rotulo);
        if (c.min != null && v < c.min) throw new Error(c.rotulo + ': o mínimo é ' + num(c.min, c.min % 1 ? 1 : 0));
        if (c.max != null && v > c.max) throw new Error(c.rotulo + ': o máximo é ' + num(c.max, c.max % 1 ? 1 : 0));
        out[c.id] = v;
      } else if (c.tipo === 'data') {
        if (!bruto) { if (c.obrig) throw new Error('Preencha: ' + c.rotulo); out[c.id] = null; continue; }
        if (!CampoCalc.dataValida(bruto)) throw new Error('Data inválida em: ' + c.rotulo);
        if (c.minData && bruto < c.minData) throw new Error(c.rotulo + ': não pode ser antes de ' + dataBR(c.minData));
        if (c.maxData && bruto > c.maxData) throw new Error(c.rotulo + ': não pode ser depois de ' + dataBR(c.maxData));
        out[c.id] = bruto;
      } else {
        const t = bruto.trim();
        if (!t && c.obrig) throw new Error('Preencha: ' + c.rotulo);
        out[c.id] = t;
      }
    }
    return out;
  }

  function iniciar() {
    $('cpForm').addEventListener('submit', e => {
      e.preventDefault();
      // Só fecha depois de salvar: se der erro, o que foi digitado continua na tela
      try { atual.aoSalvar(coletar()); fechar(); }
      catch (err) { $('cpErro').textContent = err.message; }
    });
    $('cpFechar').addEventListener('click', fechar);
    $('cpCancelar').addEventListener('click', fechar);
  }

  return { $, esc, moeda, num, dataBR, dataCurta, lerNumero, toast, formulario, iniciar };
})();
