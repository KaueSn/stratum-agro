// ============================================
// INDICADORES AO VIVO (Banco Central e IBGE)
// ============================================
// Lê as APIs públicas do BCB (SGS e Focus) e do IBGE (SIDRA) direto do
// navegador. Guarda o resultado por 30 minutos no sessionStorage para não
// repetir chamadas a cada página. Se uma API falhar, devolve null e a tela
// mostra "indisponível" (nunca um número inventado ou desatualizado).
// Depende de ESTUDOS_INDICADORES (js/estudos-data.js).
// ============================================

const IND_CACHE_KEY = 'stratum-ind-v1';
const IND_CACHE_MS = 30 * 60 * 1000;

function indLerCache() {
  try {
    const c = JSON.parse(sessionStorage.getItem(IND_CACHE_KEY) || 'null');
    if (c && Date.now() - c.t < IND_CACHE_MS) return c.v;
  } catch (e) {}
  return null;
}
function indGravarCache(v) {
  try { sessionStorage.setItem(IND_CACHE_KEY, JSON.stringify({ t: Date.now(), v })); } catch (e) {}
}

async function indJson(url, ms = 9000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, credentials: 'omit' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(timer); }
}

// "01/09/2026" -> "set/2026"; "28/10/2026" -> "28/10/2026"
function indDataBR(s, mensal) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || '');
  if (!m) return s || '';
  if (!mensal) return s;
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return meses[Number(m[2]) - 1] + '/' + m[3];
}

async function indBuscarUm(ind) {
  if (ind.fonte === 'sgs') {
    const d = await indJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.' + ind.serie + '/dados/ultimos/1?formato=json');
    const ult = d && d[d.length - 1];
    const v = ult ? Number(String(ult.valor).replace(',', '.')) : NaN;
    if (!isFinite(v)) return null;
    // A série da meta Selic vem preenchida até a próxima reunião do Copom: mostra "vigente"
    if (ind.id === 'selic') return { valor: v, ref: 'meta vigente' };
    const mensal = /^01\//.test(ult.data) && ind.id !== 'dolar' && ind.id !== 'cdi';
    return { valor: v, ref: indDataBR(ult.data, mensal) };
  }
  if (ind.fonte === 'focus') {
    const ano = new Date().getFullYear();
    const filtro = encodeURIComponent("Indicador eq '" + ind.indicador + "' and DataReferencia eq '" + ano + "' and baseCalculo eq 0");
    const d = await indJson('https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais?$top=1&$orderby=Data%20desc&$format=json&$filter=' + filtro);
    const ult = d && d.value && d.value[0];
    if (!ult || !isFinite(ult.Mediana)) return null;
    const [a, m, dia] = String(ult.Data).split('-');
    return { valor: Number(ult.Mediana), ref: 'para ' + ano + ' · ' + dia + '/' + m + '/' + a };
  }
  if (ind.fonte === 'sidra') {
    const d = await indJson(ind.url);
    const linhas = Array.isArray(d) ? d.slice(1).filter(r => isFinite(Number(r.V))) : [];
    if (!linhas.length) return null;
    const ref = linhas[0].D3N || '';
    let v;
    if (ind.femeas) {
      const por = {}; linhas.forEach(r => { por[r.D5C] = Number(r.V); });
      if (!por['992']) return null;
      v = ((por['56'] || 0) + (por['111735'] || 0)) / por['992'] * 100;
    } else {
      v = (ind.soma ? linhas.reduce((s, r) => s + Number(r.V), 0) : Number(linhas[0].V)) / (ind.divisor || 1);
    }
    return { valor: v, ref };
  }
  return null;
}

// Busca todos (ou só os ids pedidos). Retorna { id: {valor, ref} | null }
async function indBuscar(ids) {
  const lista = (typeof ESTUDOS_INDICADORES !== 'undefined' ? ESTUDOS_INDICADORES : [])
    .filter(i => !ids || ids.indexOf(i.id) !== -1);
  const cache = indLerCache() || {};
  const faltam = lista.filter(i => !(i.id in cache) || cache[i.id] === null);
  const res = await Promise.all(faltam.map(i => indBuscarUm(i).catch(() => null)));
  faltam.forEach((i, k) => { cache[i.id] = res[k]; });
  indGravarCache(cache);
  const out = {};
  lista.forEach(i => { out[i.id] = cache[i.id] || null; });
  return out;
}

function indFormatar(ind, r) {
  if (!r) return 'indisponível';
  const casas = ind.casas != null ? ind.casas : (r.valor >= 100 ? 0 : (ind.unidade === 'mi t' || ind.unidade === 'mi cabeças' ? 1 : 2));
  const n = r.valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  if (ind.unidade === 'R$') return 'R$ ' + n;
  if (ind.unidade === '% a.a.') return n + '% a.a.';
  if (ind.unidade === '%' || ind.unidade === '% do total') return n + '%';
  return n + ' ' + ind.unidade;
}

// Rendimento aproximado de um valor no CDI por N dias corridos (≈ dias úteis * 252/365)
function indRendimentoCDI(valor, cdiAA, diasCorridos) {
  const du = Math.round(diasCorridos * 252 / 365);
  return valor * (Math.pow(1 + cdiAA / 100, du / 252) - 1);
}
