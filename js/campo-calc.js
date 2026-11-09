// ============================================
// CÁLCULOS DO CAMPO (sem tela e sem rede)
// ============================================
// Usado pelo Caderno do lote, pela Agenda e pelas Calculadoras de bolso.
// 1 arroba (@) = 15 kg de carcaça. Datas sempre em texto 'AAAA-MM-DD'.
// Testes: tests/campo.test.js
// ============================================

const CampoCalc = (() => {
  const KG_ARROBA = 15;
  const ok = (...v) => v.every(x => typeof x === 'number' && isFinite(x));

  /* ---------- datas ---------- */
  function hoje(d = new Date()) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function paraUTC(s) { const [a, m, d] = String(s).split('-').map(Number); return Date.UTC(a, m - 1, d); }
  function dataValida(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return false;
    const t = new Date(paraUTC(s));
    return t.toISOString().slice(0, 10) === s;
  }
  function diasEntre(a, b) { return Math.round((paraUTC(b) - paraUTC(a)) / 86400000); }
  function somarDias(s, n) { return new Date(paraUTC(s) + n * 86400000).toISOString().slice(0, 10); }
  function somarMeses(s, n) {
    const [a, m, d] = s.split('-').map(Number);
    const ultimo = new Date(Date.UTC(a, m - 1 + n + 1, 0)).getUTCDate();
    return new Date(Date.UTC(a, m - 1 + n, Math.min(d, ultimo))).toISOString().slice(0, 10);
  }

  /* ---------- calculadoras de bolso (retornam null se a entrada não servir) ---------- */
  const calc = {
    pesoParaArroba(pesoVivo, rendimento) {
      if (!ok(pesoVivo, rendimento) || pesoVivo <= 0 || rendimento <= 0 || rendimento > 100) return null;
      return pesoVivo * rendimento / 100 / KG_ARROBA;
    },
    arrobaParaPeso(arrobas, rendimento) {
      if (!ok(arrobas, rendimento) || arrobas <= 0 || rendimento <= 0 || rendimento > 100) return null;
      return arrobas * KG_ARROBA / (rendimento / 100);
    },
    rendimento(carcaca, pesoVivo) {
      if (!ok(carcaca, pesoVivo) || carcaca <= 0 || pesoVivo <= 0 || carcaca > pesoVivo) return null;
      return carcaca / pesoVivo * 100;
    },
    gmd(pesoInicial, pesoFinal, dias) {
      if (!ok(pesoInicial, pesoFinal, dias) || dias <= 0 || pesoInicial <= 0 || pesoFinal <= 0) return null;
      return (pesoFinal - pesoInicial) / dias;
    },
    // Quantos animais de reposição compra a venda de um boi gordo
    relacaoTroca(arrobasGordo, precoArroba, precoReposicao) {
      if (!ok(arrobasGordo, precoArroba, precoReposicao) || arrobasGordo <= 0 || precoArroba <= 0 || precoReposicao <= 0) return null;
      return arrobasGordo * precoArroba / precoReposicao;
    },
    conversaoAlimentar(kgConsumido, kgGanho) {
      if (!ok(kgConsumido, kgGanho) || kgConsumido <= 0 || kgGanho <= 0) return null;
      return kgConsumido / kgGanho;
    },
    // Custo da diária por cabeça: dieta + operacional
    custoDiaria(kgDia, precoKg, operacional) {
      if (!ok(kgDia, precoKg, operacional) || kgDia < 0 || precoKg < 0 || operacional < 0) return null;
      return kgDia * precoKg + operacional;
    },
    // Preço mínimo da arroba para não ter prejuízo
    arrobaEquilibrio(custoCabeca, arrobasSaida, mortalidade) {
      if (!ok(custoCabeca, arrobasSaida, mortalidade) || custoCabeca <= 0 || arrobasSaida <= 0 || mortalidade < 0 || mortalidade >= 100) return null;
      return custoCabeca / (arrobasSaida * (1 - mortalidade / 100));
    }
  };

  /* ---------- caderno do lote ---------- */
  function eventosValidos(lote, tipo) {
    return (lote.eventos || []).filter(e => !e.excluido && (!tipo || e.tipo === tipo))
      .sort((a, b) => a.data < b.data ? -1 : a.data > b.data ? 1 : (a.criadoEm || 0) - (b.criadoEm || 0));
  }

  // Soma de cabeças x dias presentes, descontando as mortes na data em que ocorreram
  function cabecaDias(lote, ate) {
    const total = Math.max(0, diasEntre(lote.dataEntrada, ate));
    let soma = lote.cabecas * total;
    eventosValidos(lote, 'morte').forEach(m => {
      if (m.data <= ate) soma -= Number(m.quantidade || 0) * Math.max(0, diasEntre(m.data, ate));
    });
    return Math.max(0, soma);
  }

  function resumirLote(lote, referencia = hoje()) {
    const venda = eventosValidos(lote, 'venda').slice(-1)[0] || null;
    const ate = venda ? venda.data : (referencia < lote.dataEntrada ? lote.dataEntrada : referencia);
    const mortes = eventosValidos(lote, 'morte').reduce((s, e) => s + Number(e.quantidade || 0), 0);
    const cabecas = Math.max(0, lote.cabecas - mortes);
    const dias = Math.max(0, diasEntre(lote.dataEntrada, ate));

    // Pesagens, partindo do peso de entrada
    const pesagens = [{ data: lote.dataEntrada, peso: lote.pesoEntrada }]
      .concat(eventosValidos(lote, 'pesagem').map(e => ({ data: e.data, peso: Number(e.peso) })));
    const ultima = pesagens[pesagens.length - 1];
    const temPesagem = pesagens.length > 1;
    const diasPesados = diasEntre(lote.dataEntrada, ultima.data);
    const gmdReal = temPesagem && diasPesados > 0 ? (ultima.peso - lote.pesoEntrada) / diasPesados : null;
    let gmdRecente = gmdReal;
    if (pesagens.length > 2) {
      const ant = pesagens[pesagens.length - 2];
      const d = diasEntre(ant.data, ultima.data);
      if (d > 0) gmdRecente = (ultima.peso - ant.peso) / d;
    }

    const gmdPlan = ok(lote.pesoAlvo, lote.diasPlan) && lote.diasPlan > 0 ? (lote.pesoAlvo - lote.pesoEntrada) / lote.diasPlan : null;
    const gmdUsado = gmdRecente != null ? gmdRecente : gmdPlan;
    const pesoHoje = gmdUsado != null ? ultima.peso + gmdUsado * Math.max(0, diasEntre(ultima.data, ate)) : ultima.peso;

    // Custos: compra do lote inteiro (animais mortos continuam custando) + lançamentos
    const custoCompra = lote.cabecas * lote.custoCabeca;
    const gastoRacao = eventosValidos(lote, 'racao').reduce((s, e) => s + Number(e.valor || 0), 0);
    const gastoOutros = eventosValidos(lote, 'custo').reduce((s, e) => s + Number(e.valor || 0), 0);
    const gastoCocho = gastoRacao + gastoOutros;
    const custoTotal = custoCompra + gastoCocho;
    const cd = cabecaDias(lote, ate);
    const diariaReal = cd > 0 && gastoCocho > 0 ? gastoCocho / cd : null;
    const diariaUsada = diariaReal != null ? diariaReal : (ok(lote.diariaPlan) ? lote.diariaPlan : null);

    const mortalidade = lote.cabecas > 0 ? mortes / lote.cabecas * 100 : 0;
    const arrobasHoje = pesoHoje * lote.rendimento / 100 / KG_ARROBA;
    const receitaHoje = ok(lote.precoVenda) ? cabecas * arrobasHoje * lote.precoVenda : null;
    const lucroHoje = receitaHoje != null ? receitaHoje - custoTotal : null;

    // Vale manter mais um dia? Compara a arroba produzida por dia com a diária.
    let margemDia = null;
    if (gmdUsado != null && diariaUsada != null && ok(lote.precoVenda)) {
      margemDia = gmdUsado * lote.rendimento / 100 / KG_ARROBA * lote.precoVenda - diariaUsada;
    }
    let diasParaAlvo = null, dataAlvo = null;
    if (ok(lote.pesoAlvo) && !venda) {
      if (pesoHoje >= lote.pesoAlvo) { diasParaAlvo = 0; dataAlvo = ate; }
      else if (gmdUsado > 0) { diasParaAlvo = Math.ceil((lote.pesoAlvo - pesoHoje) / gmdUsado); dataAlvo = somarDias(ate, diasParaAlvo); }
    }

    let resultado = null;
    if (venda) {
      const receita = Number(venda.cabecas) * Number(venda.arrobas) * Number(venda.preco);
      resultado = { receita, lucro: receita - custoTotal, retorno: custoTotal > 0 ? (receita - custoTotal) / custoTotal * 100 : null };
    }

    return { encerrado: !!venda, dias, cabecas, mortes, mortalidade, pesagens, pesoAtual: ultima.peso, dataPeso: ultima.data, pesoHoje,
      gmdReal, gmdRecente, gmdPlan, gmdUsado, custoCompra, gastoRacao, gastoOutros, custoTotal,
      custoPorCabeca: cabecas > 0 ? custoTotal / cabecas : null, diariaReal, diariaUsada, arrobasHoje, receitaHoje, lucroHoje, margemDia, diasParaAlvo, dataAlvo, resultado };
  }

  /* ---------- agenda ---------- */
  function proximaData(item) {
    if (item.repetir === 'mensal') return somarMeses(item.data, 1);
    if (item.repetir === 'semestral') return somarMeses(item.data, 6);
    if (item.repetir === 'anual') return somarMeses(item.data, 12);
    return null;
  }
  function grupoAgenda(item, ref = hoje()) {
    const d = diasEntre(ref, item.data);
    return d < 0 ? 'atrasado' : d === 0 ? 'hoje' : d <= 7 ? 'semana' : 'depois';
  }
  function escapaIcs(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  // Linhas de .ics têm no máximo 75 octetos (RFC 5545); dobra por bytes sem partir caracteres
  function dobra(linha) {
    const enc = new TextEncoder(); const out = []; let atual = '', bytes = 0;
    for (const ch of linha) {
      const n = enc.encode(ch).length;
      if (bytes + n > (out.length ? 74 : 75)) { out.push(atual); atual = ''; bytes = 0; }
      atual += ch; bytes += n;
    }
    out.push(atual);
    return out.join('\r\n ');
  }
  function gerarIcs(itens, agora = new Date()) {
    const carimbo = agora.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const linhas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Stratum Agro//Agenda da fazenda//PT-BR', 'CALSCALE:GREGORIAN'];
    itens.forEach(i => {
      const ini = i.data.replace(/-/g, '');
      const fim = somarDias(i.data, 1).replace(/-/g, '');
      linhas.push('BEGIN:VEVENT', 'UID:' + escapaIcs(i.id) + '@stratum-agro', 'DTSTAMP:' + carimbo, 'DTSTART;VALUE=DATE:' + ini, 'DTEND;VALUE=DATE:' + fim, 'SUMMARY:' + escapaIcs(i.titulo));
      if (i.nota) linhas.push('DESCRIPTION:' + escapaIcs(i.nota));
      if (i.repetir === 'mensal') linhas.push('RRULE:FREQ=MONTHLY');
      if (i.repetir === 'semestral') linhas.push('RRULE:FREQ=MONTHLY;INTERVAL=6');
      if (i.repetir === 'anual') linhas.push('RRULE:FREQ=YEARLY');
      linhas.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + escapaIcs(i.titulo), 'TRIGGER:-P1D', 'END:VALARM', 'END:VEVENT');
    });
    linhas.push('END:VCALENDAR');
    return linhas.map(dobra).join('\r\n') + '\r\n';
  }

  return { KG_ARROBA, hoje, dataValida, diasEntre, somarDias, somarMeses, calc, eventosValidos, resumirLote, proximaData, grupoAgenda, gerarIcs };
})();
