// Cálculos do Caderno do lote, da Agenda e das Calculadoras (js/campo-calc.js).
// Rodar: node --test tests/campo.test.js
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

// O arquivo é um script de navegador (sem export), então é carregado como texto
const src = fs.readFileSync(new URL('../js/campo-calc.js', import.meta.url), 'utf8');
const C = new Function(src + '; return CampoCalc;')();

const perto = (a, b, d = 0.01) => assert.ok(Math.abs(a - b) <= d, `${a} ≠ ${b}`);

test('datas: diferença, soma e fim de mês', () => {
  assert.equal(C.diasEntre('2026-01-01', '2026-03-01'), 59);
  assert.equal(C.somarDias('2026-12-31', 1), '2027-01-01');
  assert.equal(C.somarMeses('2026-01-31', 1), '2026-02-28');
  assert.equal(C.somarMeses('2026-08-31', 6), '2027-02-28');
  assert.ok(C.dataValida('2028-02-29'));
  assert.ok(!C.dataValida('2026-02-30'));
  assert.ok(!C.dataValida('ontem'));
});

test('calculadoras: valores conhecidos', () => {
  perto(C.calc.pesoParaArroba(540, 55), 19.8);
  perto(C.calc.arrobaParaPeso(19.8, 55), 540);
  perto(C.calc.rendimento(297, 540), 55);
  perto(C.calc.gmd(390, 570, 105), 1.714);
  perto(C.calc.relacaoTroca(20, 320, 3200), 2);
  perto(C.calc.conversaoAlimentar(1200, 180), 6.667);
  perto(C.calc.custoDiaria(10, 1.5, 3), 18);
  perto(C.calc.arrobaEquilibrio(6000, 20, 0), 300);
  perto(C.calc.arrobaEquilibrio(6000, 20, 50), 600);
});

test('calculadoras: entrada inválida devolve null', () => {
  assert.equal(C.calc.pesoParaArroba(0, 55), null);
  assert.equal(C.calc.pesoParaArroba(500, 120), null);
  assert.equal(C.calc.rendimento(600, 500), null);
  assert.equal(C.calc.gmd(390, 570, 0), null);
  assert.equal(C.calc.relacaoTroca(NaN, 320, 3200), null);
  assert.equal(C.calc.arrobaEquilibrio(6000, 20, 100), null);
});

const base = () => ({ dataEntrada: '2026-01-01', cabecas: 100, pesoEntrada: 400, custoCabeca: 4000, rendimento: 55, diasPlan: 100, pesoAlvo: 570, diariaPlan: 18, precoVenda: 320, eventos: [] });
let n = 0;
const ev = (tipo, data, c) => Object.assign({ id: 'e' + (++n), tipo, data, criadoEm: n }, c);

test('lote sem lançamentos usa o plano', () => {
  const r = C.resumirLote(base(), '2026-01-11');
  assert.equal(r.dias, 10);
  assert.equal(r.cabecas, 100);
  perto(r.gmdPlan, 1.7);
  assert.equal(r.gmdReal, null);
  perto(r.pesoHoje, 417);
  assert.equal(r.custoTotal, 400000);
  assert.equal(r.diariaReal, null);
  assert.equal(r.diariaUsada, 18);
});

test('GMD real, recente e projeção a partir da última pesagem', () => {
  const l = base();
  l.eventos = [ev('pesagem', '2026-01-31', { peso: 460 }), ev('pesagem', '2026-02-20', { peso: 480 })];
  const r = C.resumirLote(l, '2026-03-02');
  perto(r.gmdReal, 80 / 50);
  perto(r.gmdRecente, 1);
  perto(r.pesoHoje, 490);
  assert.equal(r.pesoAtual, 480);
  assert.equal(r.dataPeso, '2026-02-20');
});

test('mortes reduzem cabeças e cabeça-dia; custo da compra permanece', () => {
  const l = base();
  l.eventos = [ev('morte', '2026-01-06', { quantidade: 10 }), ev('racao', '2026-01-11', { kg: 5000, valor: 9500 })];
  const r = C.resumirLote(l, '2026-01-11');
  assert.equal(r.cabecas, 90);
  perto(r.mortalidade, 10);
  assert.equal(r.custoTotal, 409500);
  perto(r.diariaReal, 9500 / (100 * 10 - 10 * 5));
});

test('lançamento excluído não conta', () => {
  const l = base();
  l.eventos = [ev('morte', '2026-01-06', { quantidade: 10, excluido: true }), ev('custo', '2026-01-06', { valor: 1000, excluido: true })];
  const r = C.resumirLote(l, '2026-01-11');
  assert.equal(r.cabecas, 100);
  assert.equal(r.custoTotal, 400000);
});

test('margem do dia a mais e data prevista do peso-alvo', () => {
  const l = base();
  l.eventos = [ev('pesagem', '2026-01-21', { peso: 440 })];
  const r = C.resumirLote(l, '2026-01-21');
  perto(r.margemDia, 2 * 0.55 / 15 * 320 - 18);
  assert.equal(r.diasParaAlvo, 65);
  assert.equal(r.dataAlvo, '2026-03-27');
});

test('lote sem ganho de peso não prevê data', () => {
  const l = base();
  l.eventos = [ev('pesagem', '2026-01-21', { peso: 395 })];
  const r = C.resumirLote(l, '2026-01-21');
  assert.equal(r.diasParaAlvo, null);
});

test('venda encerra e congela os dias', () => {
  const l = base();
  l.eventos = [ev('venda', '2026-04-11', { cabecas: 100, arrobas: 21, preco: 320 })];
  const r = C.resumirLote(l, '2026-12-31');
  assert.ok(r.encerrado);
  assert.equal(r.dias, 100);
  assert.equal(r.resultado.receita, 672000);
  assert.equal(r.resultado.lucro, 272000);
});

test('agenda: grupos e recorrência', () => {
  assert.equal(C.grupoAgenda({ data: '2026-01-09' }, '2026-01-10'), 'atrasado');
  assert.equal(C.grupoAgenda({ data: '2026-01-10' }, '2026-01-10'), 'hoje');
  assert.equal(C.grupoAgenda({ data: '2026-01-17' }, '2026-01-10'), 'semana');
  assert.equal(C.grupoAgenda({ data: '2026-01-18' }, '2026-01-10'), 'depois');
  assert.equal(C.proximaData({ data: '2026-01-31', repetir: 'mensal' }), '2026-02-28');
  assert.equal(C.proximaData({ data: '2026-01-10', repetir: 'anual' }), '2027-01-10');
  assert.equal(C.proximaData({ data: '2026-01-10', repetir: 'nenhuma' }), null);
});

test('ics: formato, escape e linhas de até 75 octetos', () => {
  const longo = 'Vacinação; reforço, lote ÁÉÍ '.repeat(10);
  const t = C.gerarIcs([{ id: 'a1', titulo: longo, data: '2026-12-31', nota: 'linha1\nlinha2', repetir: 'anual' }], new Date('2026-01-01T00:00:00Z'));
  assert.ok(t.startsWith('BEGIN:VCALENDAR\r\n'));
  assert.ok(t.includes('DTSTART;VALUE=DATE:20261231'));
  assert.ok(t.includes('DTEND;VALUE=DATE:20270101'));
  assert.ok(t.includes('RRULE:FREQ=YEARLY'));
  assert.ok(t.includes('linha1\\nlinha2'));
  t.split('\r\n').forEach(l => assert.ok(Buffer.byteLength(l) <= 75, l));
  const desdobrado = t.replace(/\r\n /g, '');
  assert.ok(desdobrado.includes('Vacinação\\; reforço\\, lote'));
});
