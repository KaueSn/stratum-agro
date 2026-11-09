// ============================================
// PÁGINA INICIAL — indicadores ao vivo, calculadora e efeitos
// ============================================
// Depende de: estudos-data.js e indicadores.js.
// ============================================

(function () {
  const $ = id => document.getElementById(id);
  const IND = {}; ESTUDOS_INDICADORES.forEach(i => { IND[i.id] = i; });
  const brl = (v, casas = 0) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: casas, maximumFractionDigits: casas });
  const pct = v => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let valores = {};

  /* ---------- faixa ao vivo + mini painel ---------- */
  const NO_TICKER = ['selic', 'cdi', 'ipca', 'dolar', 'focusPib', 'focusIpca', 'soja', 'milho', 'abate', 'femeas', 'desemprego'];
  function renderTicker() {
    const itens = NO_TICKER.filter(id => valores[id]).map(id =>
      '<span class="tk">' + esc(IND[id].nome) + '<b>' + esc(indFormatar(IND[id], valores[id])) + '</b><small>' + esc(valores[id].ref) + '</small></span>');
    if (!itens.length) { $('tkMove').innerHTML = '<span class="tk">Fontes oficiais indisponíveis no momento.</span>'; return; }
    $('tkDot').classList.add('on');
    // duplica para o loop contínuo
    $('tkMove').innerHTML = itens.join('') + itens.join('');
  }
  function renderMini() {
    document.querySelectorAll('#estudosMini [data-ind]').forEach(el => {
      const id = el.dataset.ind; el.textContent = indFormatar(IND[id], valores[id]);
    });
  }

  /* ---------- calculadora ---------- */
  const campos = ['cCab', 'cDias', 'cCompra', 'cDiaria', 'cArr', 'cPreco', 'cOutros', 'cMort'];
  function num(id) { const v = parseFloat(String($(id).value).replace(',', '.')); return isFinite(v) && v >= 0 ? v : NaN; }
  function calcular() {
    const [cab, dias, compra, diaria, arr, preco, outros, mort] = campos.map(num);
    if ([cab, dias, compra, diaria, arr, preco, outros, mort].some(v => !isFinite(v)) || cab < 1 || dias < 1 || mort > 100) {
      $('cVeredito').className = 'calc-verdict warn'; $('cVeredito').textContent = 'Confira os campos: use apenas números positivos.'; return;
    }
    const inv = cab * (compra + diaria * dias + outros);
    const receita = cab * (1 - mort / 100) * arr * preco;
    const lucro = receita - inv;
    const roi = inv > 0 ? lucro / inv * 100 : 0;
    $('cLucro').textContent = brl(lucro);
    $('cLucro').classList.toggle('neg', lucro < 0);
    $('cInv').textContent = brl(inv);
    $('cRoi').textContent = pct(roi) + ' em ' + dias + ' dias';
    $('cMarg').textContent = brl(lucro / cab);
    const cdi = valores.cdi;
    const v = $('cVeredito');
    if (cdi) {
      const cdiPer = indRendimentoCDI(100, cdi.valor, dias);
      $('cCdi').textContent = pct(cdiPer);
      $('cCdiRef').textContent = '(' + pct(cdi.valor).replace('%', '% a.a.') + ')';
      const spread = roi - cdiPer;
      if (lucro < 0) { v.className = 'calc-verdict bad'; v.innerHTML = '<b>Prejuízo estimado.</b> Revise o preço de compra, a diária ou o preço de venda antes de fechar o lote.'; }
      else if (spread > 0) { v.className = 'calc-verdict'; v.innerHTML = '<b>Supera o CDI em ' + spread.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + ' p.p.</b> no período. Falta ver o risco: frete, mortalidade e oscilação da arroba mudam esse número.'; }
      else { v.className = 'calc-verdict warn'; v.innerHTML = '<b>Rende menos que o CDI</b> no mesmo prazo. Com o risco do campo, a renda fixa ganharia. Veja onde ajustar.'; }
    } else {
      $('cCdi').textContent = 'indisponível';
      v.className = 'calc-verdict warn'; v.textContent = lucro >= 0 ? 'Lucro estimado positivo. Não foi possível buscar o CDI agora para comparar.' : 'Prejuízo estimado. Revise os números antes de fechar o lote.';
    }
  }
  campos.forEach(id => $(id) && $(id).addEventListener('input', calcular));
  if ($('calcForm')) $('calcForm').addEventListener('submit', e => e.preventDefault());

  /* ---------- rolagem: barra de progresso, parallax e CTA fixo no celular ---------- */
  const reduzir = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pendente = false;
  function aoRolar() {
    pendente = false;
    const h = document.documentElement;
    const y = h.scrollTop || document.body.scrollTop;
    const bar = $('scrollBar'); if (bar) bar.style.width = (y / Math.max(1, h.scrollHeight - h.clientHeight) * 100).toFixed(1) + '%';
    const bg = $('heroBg'); if (bg && !reduzir && y < 900) bg.style.transform = 'scale(1.04) translateY(' + (y * 0.18).toFixed(1) + 'px)';
    const cta = $('stickyCta');
    if (cta) {
      const app = $('app'); const logado = app && getComputedStyle(app).display !== 'none';
      const planos = $('planos'); const rodape = $('rodape');
      const perto = [planos, rodape].some(el => { if (!el) return false; const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
      cta.classList.toggle('show', !logado && y > 600 && !perto);
    }
  }
  window.addEventListener('scroll', () => { if (!pendente) { pendente = true; requestAnimationFrame(aoRolar); } }, { passive: true });

  /* ---------- início ---------- */
  calcular();
  aoRolar();
  indBuscar().then(v => { valores = v; renderTicker(); renderMini(); calcular(); });
})();
