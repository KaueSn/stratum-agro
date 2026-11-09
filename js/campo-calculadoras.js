// ============================================
// MINHA FAZENDA — Calculadoras de bolso
// ============================================
// Só fazem conta na tela: nada é salvo nem enviado.
// ============================================

const CampoCalculadoras = (() => {
  const { $, esc, moeda, num, lerNumero } = CampoUI;
  const c = CampoCalc.calc;
  const LISTA = [
    { titulo: 'Peso vivo para arroba', ajuda: 'Quantas arrobas de carcaça o animal rende.', campos: [['Peso vivo (kg)', '540'], ['Rendimento (%)', '54']], f: ([a, b]) => { const r = c.pesoParaArroba(a, b); return r == null ? null : num(r, 2) + ' @'; } },
    { titulo: 'Arroba para peso vivo', ajuda: 'Que peso o animal precisa ter para dar essas arrobas.', campos: [['Arrobas (@)', '20'], ['Rendimento (%)', '54']], f: ([a, b]) => { const r = c.arrobaParaPeso(a, b); return r == null ? null : num(r, 0) + ' kg vivos'; } },
    { titulo: 'Rendimento de carcaça', ajuda: 'Compare o romaneio com o peso de saída.', campos: [['Peso da carcaça (kg)', '297'], ['Peso vivo (kg)', '540']], f: ([a, b]) => { const r = c.rendimento(a, b); return r == null ? null : num(r, 1) + '%'; } },
    { titulo: 'Ganho médio diário (GMD)', ajuda: 'Quanto o animal ganhou por dia.', campos: [['Peso inicial (kg)', '390'], ['Peso final (kg)', '570'], ['Dias', '105']], f: ([a, b, d]) => { const r = c.gmd(a, b, d); return r == null ? null : num(r, 2) + ' kg/dia'; } },
    { titulo: 'Relação de troca', ajuda: 'Quantos animais de reposição um boi gordo compra.', campos: [['Arrobas do boi gordo (@)', '20'], ['Preço da arroba (R$)', ''], ['Preço da reposição (R$/cab.)', '']], f: ([a, b, d]) => { const r = c.relacaoTroca(a, b, d); return r == null ? null : num(r, 2) + ' animais por boi'; } },
    { titulo: 'Conversão alimentar', ajuda: 'Quantos kg de alimento para ganhar 1 kg.', campos: [['Alimento consumido (kg)', ''], ['Peso ganho (kg)', '']], f: ([a, b]) => { const r = c.conversaoAlimentar(a, b); return r == null ? null : num(r, 2) + ' kg por kg ganho'; } },
    { titulo: 'Custo da diária', ajuda: 'Dieta mais custo operacional, por cabeça.', campos: [['Consumo (kg/dia)', ''], ['Preço da dieta (R$/kg)', ''], ['Operacional (R$/dia)', '']], f: ([a, b, d]) => { const r = c.custoDiaria(a, b, d); return r == null ? null : moeda(r, 2) + '/dia'; } },
    { titulo: 'Arroba de equilíbrio', ajuda: 'Preço mínimo para não ter prejuízo.', campos: [['Custo total por cabeça (R$)', ''], ['Arrobas na saída (@)', ''], ['Mortalidade (%)', '0']], f: ([a, b, d]) => { const r = c.arrobaEquilibrio(a, b, d); return r == null ? null : moeda(r, 2) + '/@'; } }
  ];

  function render() {
    $('aba-calculadoras').innerHTML = '<div class="cp-calcs">' + LISTA.map((x, i) =>
      '<form class="cp-calc" data-calc="' + i + '" novalidate autocomplete="off"><h3>' + esc(x.titulo) + '</h3><p>' + esc(x.ajuda) + '</p>' +
      x.campos.map(k => '<label>' + esc(k[0]) + '<input type="text" inputmode="decimal" placeholder="' + esc(k[1]) + '"></label>').join('') +
      '<div class="cp-res v" aria-live="polite">Preencha os campos</div></form>').join('') + '</div>';
  }

  function iniciar() {
    render();
    $('aba-calculadoras').addEventListener('input', e => {
      const f = e.target.closest('[data-calc]'); if (!f) return;
      const vals = [...f.querySelectorAll('input')].map(i => lerNumero(i.value));
      const res = f.querySelector('.cp-res');
      const vazio = vals.some(v => v === null);
      const txt = vazio ? null : LISTA[Number(f.dataset.calc)].f(vals);
      res.classList.toggle('v', !txt);
      res.textContent = txt || (vazio ? 'Preencha os campos' : 'Confira os valores');
    });
    $('aba-calculadoras').addEventListener('submit', e => e.preventDefault());
  }
  return { iniciar };
})();
