// ============================================
// MINHA FAZENDA — Agenda
// ============================================
// Os modelos só preenchem o título: prazos legais mudam e cada pessoa escolhe
// a data. Nada aqui substitui o calendário oficial ou o médico-veterinário.
// ============================================

const CampoAgenda = (() => {
  const { $, esc, dataBR, toast, formulario } = CampoUI;
  const C = CampoCalc;
  const MODELOS = [
    ['Vermifugação', 'semestral'], ['Vacina contra clostridioses', 'anual'], ['Pesagem do lote', 'mensal'],
    ['Validade da GTA', 'nenhuma'], ['Vencimento de contrato', 'nenhuma'], ['Declaração do ITR', 'anual'], ['Atualização do CAR', 'anual']
  ];
  const REPETIR = [['nenhuma', 'Não repete'], ['mensal', 'Todo mês'], ['semestral', 'A cada 6 meses'], ['anual', 'Todo ano']];
  const GRUPOS = [['atrasado', 'Atrasados'], ['hoje', 'Hoje'], ['semana', 'Próximos 7 dias'], ['depois', 'Mais adiante']];
  const ROT_REP = { mensal: 'todo mês', semestral: 'a cada 6 meses', anual: 'todo ano' };

  function opcoesLote() {
    return [['', 'Nenhum']].concat(CampoDados.lotes().filter(l => l.status !== 'encerrado').map(l => [l.id, l.nome]));
  }
  function formItem(it, modelo) {
    formulario({
      titulo: it ? 'Editar compromisso' : 'Novo compromisso',
      campos: [
        { id: 'titulo', rotulo: 'O que fazer', tipo: 'texto', valor: it ? it.titulo : (modelo && modelo[0]), obrig: true, todo: true, max: 120 },
        { id: 'data', rotulo: 'Data', tipo: 'data', valor: it ? it.data : C.hoje(), obrig: true },
        { id: 'repetir', rotulo: 'Repetir', tipo: 'lista', valor: it ? it.repetir : (modelo ? modelo[1] : 'nenhuma'), obrig: true, opcoes: REPETIR },
        { id: 'loteId', rotulo: 'Lote', tipo: 'lista', valor: it ? it.loteId : '', todo: true, opcoes: opcoesLote() },
        { id: 'nota', rotulo: 'Observação', tipo: 'area', valor: it && it.nota, todo: true, max: 300 }
      ],
      aoSalvar(v) {
        CampoDados.salvarItem(v, it && it.id);
        toast('Compromisso salvo.'); render();
      }
    });
  }
  function formCarencia() {
    formulario({
      titulo: 'Calcular fim da carência', enviar: 'Agendar',
      campos: [
        { id: 'produto', rotulo: 'Medicamento', tipo: 'texto', obrig: true, todo: true, max: 80 },
        { id: 'aplicacao', rotulo: 'Data da aplicação', tipo: 'data', valor: C.hoje(), obrig: true },
        { id: 'dias', rotulo: 'Carência (dias)', tipo: 'numero', obrig: true, min: 0, max: 365, ajuda: 'Veja na bula ou com o veterinário' },
        { id: 'loteId', rotulo: 'Lote', tipo: 'lista', valor: '', todo: true, opcoes: opcoesLote() }
      ],
      aoSalvar(v) {
        const data = C.somarDias(v.aplicacao, Math.ceil(v.dias));
        CampoDados.salvarItem({ titulo: 'Fim da carência: ' + v.produto, data, repetir: 'nenhuma', loteId: v.loteId, nota: 'Aplicado em ' + dataBR(v.aplicacao) + ', carência de ' + v.dias + ' dias. Não abater antes desta data.' });
        toast('Fim da carência: ' + dataBR(data)); render();
      }
    });
  }

  function linhaItem(it) {
    const l = it.loteId && CampoDados.lote(it.loteId);
    const det = [dataBR(it.data), l && l.nome, ROT_REP[it.repetir], it.nota].filter(Boolean).join(' · ');
    return '<div class="cp-item"><input type="checkbox" data-feito="' + esc(it.id) + '"' + (it.feito ? ' checked' : '') + ' aria-label="Concluir: ' + esc(it.titulo) + '">' +
      '<button class="t" type="button" data-editar="' + esc(it.id) + '">' + esc(it.titulo) + '<small>' + esc(det) + '</small></button>' +
      '<button class="cp-apagar" type="button" data-apagar="' + esc(it.id) + '" aria-label="Apagar ' + esc(it.titulo) + '">apagar</button></div>';
  }

  function atrasados() {
    const ref = C.hoje();
    return CampoDados.agenda().filter(i => !i.feito && i.data <= ref).length;
  }

  function render() {
    const todos = CampoDados.agenda();
    const pend = todos.filter(i => !i.feito), feitos = todos.filter(i => i.feito).reverse().slice(0, 30);
    let h = '<div class="cp-linha"><h2>Agenda da fazenda</h2><div class="cp-rodape-l" style="margin:0">' +
      (pend.length ? '<button class="btn btn-outline" type="button" data-ics>Levar para o calendário</button>' : '') +
      '<button class="btn btn-outline" type="button" data-carencia>Carência</button><button class="btn btn-primary" type="button" data-novo>+ Novo</button></div></div>' +
      '<div class="cp-modelos" role="group" aria-label="Modelos prontos">' + MODELOS.map((m, i) => '<button type="button" data-modelo="' + i + '">+ ' + esc(m[0]) + '</button>').join('') + '</div>';
    if (!pend.length) h += '<div class="cp-vazio"><b>Nenhum compromisso pela frente</b>Escolha um modelo acima ou crie o seu: vacinas, GTA, contratos e impostos em um só lugar.</div>';
    GRUPOS.forEach(g => {
      const itens = pend.filter(i => C.grupoAgenda(i) === g[0]);
      if (itens.length) h += '<div class="cp-grupo ' + g[0] + '"><h3>' + g[1] + ' (' + itens.length + ')</h3>' + itens.map(linhaItem).join('') + '</div>';
    });
    if (feitos.length) h += '<details class="cp-feitos"><summary>Concluídos (' + feitos.length + ')</summary>' + feitos.map(linhaItem).join('') + '</details>';
    $('aba-agenda').innerHTML = h;
    const n = atrasados();
    $('cpBolha').hidden = !n; $('cpBolha').textContent = n;
  }

  function exportar() {
    const itens = CampoDados.agenda().filter(i => !i.feito);
    const blob = new Blob([C.gerarIcs(itens)], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'agenda-stratum-agro.ics';
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast('Abra o arquivo baixado para adicionar ao calendário.');
  }

  function iniciar() {
    $('aba-agenda').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.novo !== undefined) formItem(null);
      else if (b.dataset.carencia !== undefined) formCarencia();
      else if (b.dataset.ics !== undefined) exportar();
      else if (b.dataset.modelo) formItem(null, MODELOS[Number(b.dataset.modelo)]);
      else if (b.dataset.editar) { const it = CampoDados.agenda().find(x => x.id === b.dataset.editar); if (it) formItem(it); }
      else if (b.dataset.apagar) { if (confirm('Apagar este compromisso?')) { CampoDados.excluirItem(b.dataset.apagar); render(); } }
    });
    $('aba-agenda').addEventListener('change', e => {
      const c = e.target.closest('[data-feito]'); if (!c) return;
      const it = CampoDados.agenda().find(x => x.id === c.dataset.feito); if (!it) return;
      const prox = c.checked ? C.proximaData(it) : null;
      if (prox) { CampoDados.salvarItem({ data: prox, feito: false }, it.id); toast('Feito. Próxima: ' + dataBR(prox)); }
      else CampoDados.salvarItem({ feito: c.checked }, it.id);
      render();
    });
  }

  return { iniciar, render };
})();
