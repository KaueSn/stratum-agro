// ============================================
// MINHA FAZENDA — Caderno do lote
// ============================================

const CampoLotes = (() => {
  const { $, esc, moeda, num, dataBR, dataCurta, toast, formulario } = CampoUI;
  const C = CampoCalc;
  let aberto = null;

  /* ---------- formulários ---------- */
  function formLote(l) {
    formulario({
      titulo: l ? 'Editar lote' : 'Novo lote', enviar: l ? 'Salvar' : 'Criar lote',
      campos: [
        { id: 'nome', rotulo: 'Nome do lote', tipo: 'texto', valor: l && l.nome, obrig: true, todo: true, ajuda: 'Ex.: Curral 3, garrotes de novembro' },
        { id: 'dataEntrada', rotulo: 'Data de entrada', tipo: 'data', valor: l ? l.dataEntrada : C.hoje(), obrig: true, maxData: C.hoje() },
        { id: 'cabecas', rotulo: 'Cabeças', tipo: 'numero', valor: l && l.cabecas, obrig: true, min: 1, max: 100000 },
        { id: 'pesoEntrada', rotulo: 'Peso médio de entrada (kg)', tipo: 'numero', valor: l && l.pesoEntrada, obrig: true, min: 1, max: 1500 },
        { id: 'custoCabeca', rotulo: 'Custo de compra por cabeça (R$)', tipo: 'numero', valor: l && l.custoCabeca, obrig: true, min: 0 },
        { secao: 'Seu plano (para comparar com o realizado)' },
        { id: 'diasPlan', rotulo: 'Dias de cocho', tipo: 'numero', valor: l && l.diasPlan, min: 1, max: 1000 },
        { id: 'pesoAlvo', rotulo: 'Peso-alvo de saída (kg)', tipo: 'numero', valor: l && l.pesoAlvo, min: 1, max: 1500 },
        { id: 'diariaPlan', rotulo: 'Diária por cabeça (R$/dia)', tipo: 'numero', valor: l && l.diariaPlan, min: 0 },
        { id: 'rendimento', rotulo: 'Rendimento de carcaça (%)', tipo: 'numero', valor: l ? l.rendimento : '', obrig: true, min: 30, max: 75, ajuda: 'Use o histórico do seu gado' },
        { id: 'precoVenda', rotulo: 'Preço de venda esperado (R$/@)', tipo: 'numero', valor: l && l.precoVenda, min: 0, todo: true }
      ],
      aoSalvar(v) {
        if (v.pesoAlvo != null && v.pesoAlvo <= v.pesoEntrada) throw new Error('O peso-alvo precisa ser maior que o de entrada.');
        const salvo = CampoDados.salvarLote(v, l && l.id);
        aberto = salvo.id;
        toast(l ? 'Lote atualizado.' : 'Lote criado.');
        render();
      }
    });
  }

  function formEvento(tipo, l, r) {
    const data = { id: 'data', rotulo: 'Data', tipo: 'data', valor: C.hoje(), obrig: true, minData: l.dataEntrada, maxData: C.hoje() };
    const defs = {
      pesagem: { titulo: 'Registrar pesagem', campos: [data, { id: 'peso', rotulo: 'Peso médio (kg)', tipo: 'numero', obrig: true, min: 1, max: 1500 }, { id: 'obs', rotulo: 'Observação', tipo: 'texto', todo: true, max: 200 }] },
      morte: { titulo: 'Registrar morte', campos: [data, { id: 'quantidade', rotulo: 'Quantidade', tipo: 'numero', valor: 1, obrig: true, min: 1, max: r.cabecas }, { id: 'obs', rotulo: 'Causa', tipo: 'texto', todo: true, max: 200 }] },
      racao: { titulo: 'Registrar ração', campos: [data, { id: 'valor', rotulo: 'Valor (R$)', tipo: 'numero', obrig: true, min: 0 }, { id: 'kg', rotulo: 'Quantidade (kg)', tipo: 'numero', min: 0 }, { id: 'obs', rotulo: 'Observação', tipo: 'texto', todo: true, max: 200 }] },
      custo: { titulo: 'Registrar custo', campos: [data, { id: 'valor', rotulo: 'Valor (R$)', tipo: 'numero', obrig: true, min: 0 }, { id: 'categoria', rotulo: 'Tipo', tipo: 'lista', todo: true, valor: 'Sanidade', obrig: true, opcoes: ['Sanidade', 'Frete', 'Mão de obra', 'Energia e água', 'Impostos e taxas', 'Outro'].map(x => [x, x]) }, { id: 'obs', rotulo: 'Descrição', tipo: 'texto', todo: true, max: 200 }] },
      nota: { titulo: 'Anotar', campos: [data, { id: 'obs', rotulo: 'Anotação', tipo: 'area', obrig: true, todo: true, max: 500 }] },
      venda: { titulo: 'Encerrar lote (venda)', enviar: 'Encerrar lote', campos: [data, { id: 'cabecas', rotulo: 'Cabeças vendidas', tipo: 'numero', valor: r.cabecas, obrig: true, min: 1, max: r.cabecas }, { id: 'arrobas', rotulo: 'Arrobas por cabeça (@)', tipo: 'numero', valor: Number(r.arrobasHoje.toFixed(1)), obrig: true, min: 1, max: 60, ajuda: 'Use o romaneio do frigorífico' }, { id: 'preco', rotulo: 'Preço recebido (R$/@)', tipo: 'numero', valor: l.precoVenda, obrig: true, min: 1 }] }
    };
    const d = defs[tipo];
    formulario({ titulo: d.titulo, enviar: d.enviar, campos: d.campos, aoSalvar(v) {
      CampoDados.adicionarEvento(l.id, Object.assign({ tipo }, v));
      toast(tipo === 'venda' ? 'Lote encerrado.' : 'Registrado.'); render();
    } });
  }

  /* ---------- lista ---------- */
  function cartao(l) {
    const r = C.resumirLote(l);
    const pct = l.pesoAlvo && l.pesoAlvo > l.pesoEntrada ? Math.max(0, Math.min(100, (r.pesoHoje - l.pesoEntrada) / (l.pesoAlvo - l.pesoEntrada) * 100)) : null;
    return '<button class="cp-lote" type="button" data-abrir="' + esc(l.id) + '"><h3>' + esc(l.nome) + (r.encerrado ? '<span class="cp-tag fim">ENCERRADO</span>' : '<span class="cp-tag">NO COCHO</span>') + '</h3>' +
      '<div class="m"><span><b>' + num(r.cabecas) + '</b> cabeças</span><span><b>' + r.dias + '</b> dias</span><span><b>' + num(r.pesoHoje) + ' kg</b>' + (r.encerrado ? '' : ' estimados') + '</span>' +
      (r.gmdUsado != null ? '<span>GMD <b>' + num(r.gmdUsado, 2) + '</b></span>' : '') + '</div>' +
      (pct != null ? '<div class="cp-barra" aria-hidden="true"><i style="width:' + pct.toFixed(0) + '%"></i></div>' : '') + '</button>';
  }
  function renderLista() {
    const ls = CampoDados.lotes();
    const ativos = ls.filter(l => l.status !== 'encerrado'), fim = ls.filter(l => l.status === 'encerrado');
    let h = '<div class="cp-linha"><h2>Seus lotes</h2><button class="btn btn-primary" type="button" data-novo>+ Novo lote</button></div>';
    if (!ls.length) h += '<div class="cp-vazio"><b>Comece pelo lote que está no cocho</b>Registre pesagens, mortes e custos e veja, a cada lançamento, se a realidade está seguindo o plano.<br><button class="btn btn-primary" type="button" data-novo>Criar meu primeiro lote</button></div>';
    if (ativos.length) h += '<div class="cp-lotes">' + ativos.map(cartao).join('') + '</div>';
    if (fim.length) h += '<div class="cp-linha"><h2>Encerrados</h2></div><div class="cp-lotes">' + fim.map(cartao).join('') + '</div>';
    $('aba-lotes').innerHTML = h;
  }

  /* ---------- detalhe ---------- */
  function sinal(l, r) {
    if (r.encerrado) {
      const res = r.resultado;
      return '<div class="cp-sinal' + (res.lucro < 0 ? ' ruim' : '') + '"><b>Resultado do lote: ' + moeda(res.lucro) + '</b> (' + num(res.retorno, 1) + '% sobre o custo de ' + moeda(r.custoTotal) + ').</div>';
    }
    if (r.margemDia == null) return '<div class="cp-sinal alerta">Preencha o preço de venda e a diária do plano, ou lance a ração, para ver quanto cada dia a mais está rendendo.</div>';
    const base = r.gmdRecente != null ? 'última pesagem' : 'seu plano';
    if (r.margemDia >= 0) return '<div class="cp-sinal">Cada dia a mais rende <b>' + moeda(r.margemDia, 2) + ' por cabeça</b> acima da diária (base: ' + base + ').' + (r.dataAlvo && r.diasParaAlvo > 0 ? ' Peso-alvo previsto para <b>' + dataBR(r.dataAlvo) + '</b>.' : r.diasParaAlvo === 0 ? ' <b>O lote já chegou ao peso-alvo.</b>' : '') + '</div>';
    return '<div class="cp-sinal ruim">O ganho de peso já não paga a diária: cada dia a mais custa <b>' + moeda(-r.margemDia, 2) + ' por cabeça</b> (base: ' + base + '). Vale avaliar a saída.</div>';
  }
  function linha(rot, plano, real, f) {
    return '<tr><td>' + rot + '</td><td>' + (plano == null ? '—' : f(plano)) + '</td><td>' + (real == null ? '—' : f(real)) + '</td></tr>';
  }
  function grafico(l, r) {
    if (r.pesagens.length < 2 && !l.pesoAlvo) return '<p class="cp-ajuda">Registre uma pesagem para ver a curva do lote.</p>';
    const W = 420, H = 170, E = 38, B = 22, T = 10, D = 10;
    const fimPlano = l.diasPlan || 0;
    const maxDia = Math.max(1, fimPlano, ...r.pesagens.map(p => C.diasEntre(l.dataEntrada, p.data)));
    const pesos = r.pesagens.map(p => p.peso).concat(l.pesoAlvo && l.diasPlan ? [l.pesoAlvo] : []);
    const min = Math.min(...pesos) - 10, max = Math.max(...pesos) + 10;
    const x = d => E + d / maxDia * (W - E - D), y = p => T + (max - p) / (max - min) * (H - T - B);
    const pts = r.pesagens.map(p => [x(C.diasEntre(l.dataEntrada, p.data)), y(p.peso)]);
    const plano = l.pesoAlvo && l.diasPlan ? '<line x1="' + x(0) + '" y1="' + y(l.pesoEntrada) + '" x2="' + x(l.diasPlan) + '" y2="' + y(l.pesoAlvo) + '" stroke="#e8c35a" stroke-width="2" stroke-dasharray="6 5"/>' : '';
    return '<svg class="cp-graf" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Peso médio do lote ao longo dos dias">' +
      '<text x="2" y="' + (T + 8) + '">' + num(max) + '</text><text x="2" y="' + (H - B) + '">' + num(min) + '</text><text x="' + E + '" y="' + (H - 5) + '">dia 0</text><text x="' + (W - D) + '" y="' + (H - 5) + '" text-anchor="end">dia ' + maxDia + '</text>' +
      '<line x1="' + E + '" y1="' + (H - B) + '" x2="' + (W - D) + '" y2="' + (H - B) + '" stroke="#2b4c3c"/>' + plano +
      '<polyline fill="none" stroke="#4ade80" stroke-width="3" stroke-linejoin="round" points="' + pts.map(p => p.join(',')).join(' ') + '"/>' +
      pts.map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#4ade80"/>').join('') + '</svg>' +
      '<div class="cp-leg"><span><i></i>Pesagens</span>' + (plano ? '<span><i class="p"></i>Plano</span>' : '') + '</div>';
  }
  function descrever(e) {
    const o = e.obs ? '<small>' + esc(e.obs) + '</small>' : '';
    if (e.tipo === 'pesagem') return 'Pesagem: <b>' + num(e.peso, 1) + ' kg</b>' + o;
    if (e.tipo === 'morte') return 'Morte: <b>' + num(e.quantidade) + '</b>' + o;
    if (e.tipo === 'racao') return 'Ração: <b>' + moeda(e.valor, 2) + '</b>' + (e.kg ? ' · ' + num(e.kg) + ' kg' : '') + o;
    if (e.tipo === 'custo') return esc(e.categoria) + ': <b>' + moeda(e.valor, 2) + '</b>' + o;
    if (e.tipo === 'venda') return 'Venda: <b>' + num(e.cabecas) + ' cab. × ' + num(e.arrobas, 1) + ' @ × ' + moeda(e.preco, 2) + '</b>';
    return 'Anotação' + o;
  }
  function renderDetalhe(l) {
    const r = C.resumirLote(l);
    const acoes = [['pesagem', '⚖️', 'Pesagem'], ['racao', '🌽', 'Ração'], ['custo', '💲', 'Custo'], ['morte', '✝️', 'Morte'], ['nota', '📝', 'Anotar']];
    const hist = C.eventosValidos(l).reverse();
    const gRealFmt = v => num(v, 2) + ' kg/dia', dia = v => moeda(v, 2) + '/dia', pct = v => num(v, 1) + '%', kg = v => num(v) + ' kg', d = v => num(v) + ' dias';
    $('aba-lotes').innerHTML =
      '<div class="cp-linha"><button class="cp-voltar" type="button" data-voltar>← Todos os lotes</button><h2>' + esc(l.nome) + '</h2></div>' +
      '<div class="cp-kpis">' +
        '<div class="cp-kpi"><div class="l">Cabeças</div><div class="v">' + num(r.cabecas) + '</div><div class="s">' + (r.mortes ? r.mortes + ' morte(s) · ' + num(r.mortalidade, 1) + '%' : 'sem mortes') + '</div></div>' +
        '<div class="cp-kpi"><div class="l">Dias de cocho</div><div class="v">' + r.dias + '</div><div class="s">entrada ' + dataBR(l.dataEntrada) + '</div></div>' +
        '<div class="cp-kpi"><div class="l">Peso estimado</div><div class="v">' + num(r.pesoHoje) + ' kg</div><div class="s">' + (r.pesagens.length > 1 ? 'pesado em ' + dataCurta(r.dataPeso) : 'sem pesagem ainda') + '</div></div>' +
        '<div class="cp-kpi"><div class="l">' + (r.encerrado ? 'Custo total' : 'Se vendesse hoje') + '</div><div class="v">' + moeda(r.encerrado ? r.custoTotal : r.lucroHoje) + '</div><div class="s">' + (r.encerrado ? '' : 'custo até aqui ' + moeda(r.custoTotal)) + '</div></div>' +
      '</div>' +
      (r.encerrado ? '<div style="height:12px"></div>' : '<div class="cp-acoes">' + acoes.map(a => '<button type="button" data-ev="' + a[0] + '"><span class="e" aria-hidden="true">' + a[1] + '</span>' + a[2] + '</button>').join('') + '</div>') +
      sinal(l, r) +
      '<div class="cp-duas"><div class="cp-card"><h3>Planejado x realizado</h3><table class="cp-tab"><thead><tr><th>Indicador</th><th>Plano</th><th>Real</th></tr></thead><tbody>' +
        linha('Ganho de peso', r.gmdPlan, r.gmdReal, gRealFmt) + linha('Diária', l.diariaPlan, r.diariaReal, dia) + linha('Dias de cocho', l.diasPlan, r.dias, d) + linha('Peso (alvo x última pesagem)', l.pesoAlvo, r.encerrado || r.pesagens.length > 1 ? r.pesoAtual : null, kg) +
        '<tr><td>Mortalidade</td><td>—</td><td>' + pct(r.mortalidade) + '</td></tr></tbody></table></div>' +
      '<div class="cp-card"><h3>Curva de peso</h3>' + grafico(l, r) + '</div></div>' +
      '<div class="cp-linha"><h2>Histórico</h2></div>' +
      (hist.length ? '<ul class="cp-hist">' + hist.map(e => '<li><span class="d">' + dataBR(e.data) + '</span><span class="t">' + descrever(e) + '</span><button class="cp-apagar" type="button" data-apagar="' + esc(e.id) + '" aria-label="Apagar lançamento">apagar</button></li>').join('') + '</ul>' : '<p class="cp-ajuda">Nenhum lançamento ainda. Use os botões acima.</p>') +
      '<div class="cp-rodape-l"><button class="btn btn-outline" type="button" data-editar>Editar lote</button>' + (r.encerrado ? '' : '<button class="btn btn-outline" type="button" data-ev="venda">Encerrar (venda)</button>') + '<button class="btn btn-perigo" type="button" data-excluir>Excluir lote</button></div>';
  }

  function render() {
    const l = aberto && CampoDados.lote(aberto);
    if (l) renderDetalhe(l); else { aberto = null; renderLista(); }
  }

  function iniciar() {
    $('aba-lotes').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const l = aberto && CampoDados.lote(aberto);
      if (b.dataset.novo !== undefined) formLote(null);
      else if (b.dataset.abrir) { aberto = b.dataset.abrir; render(); window.scrollTo(0, 0); }
      else if (b.dataset.voltar !== undefined) { aberto = null; render(); }
      else if (b.dataset.ev && l) formEvento(b.dataset.ev, l, C.resumirLote(l));
      else if (b.dataset.editar !== undefined && l) formLote(l);
      else if (b.dataset.apagar && l) { if (confirm('Apagar este lançamento?')) { CampoDados.excluirEvento(l.id, b.dataset.apagar); render(); } }
      else if (b.dataset.excluir !== undefined && l) { if (confirm('Excluir o lote "' + l.nome + '" e todo o histórico? Não dá para desfazer.')) { CampoDados.excluirLote(l.id); aberto = null; render(); } }
    });
  }

  return { iniciar, render };
})();
