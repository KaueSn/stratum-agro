// ============================================
// ESTUDOS — CENÁRIO BRASIL + AGRONEGÓCIO
// ============================================
// Três tipos de conteúdo:
//   • INDICADORES: buscados ao vivo nas APIs abertas do Banco Central (SGS e
//     Focus) e do IBGE (SIDRA). Nada é digitado à mão: se a API falhar, o card
//     mostra "indisponível" em vez de um número velho.
//   • PANORAMA: fatos recentes com data e link para a fonte oficial.
//   • CORRELAÇÕES: explicações de como uma variável afeta outra e a operação.
//     São relações econômicas gerais, sem números inventados.
// O CEPEA licencia seus indicadores como CC BY-NC (uso não comercial), por isso
// a arroba e o bezerro aparecem só como link para a fonte.
// ============================================

const ESTUDOS_ATUALIZADO = '2026-10-28';

const ESTUDOS_TEMAS = [
  { id: 'macro',    nome: 'Economia' },
  { id: 'mercado',  nome: 'Mercado e exportação' },
  { id: 'producao', nome: 'Produção' },
  { id: 'sanidade', nome: 'Sanidade' },
  { id: 'clima',    nome: 'Clima' },
  { id: 'gestao',   nome: 'Gestão e risco' }
];

// fonte: 'sgs' (série do BCB), 'focus' (expectativa de mercado), 'sidra' (IBGE)
const ESTUDOS_INDICADORES = [
  { id: 'selic', nome: 'Selic (meta)', tema: 'macro', fonte: 'sgs', serie: 432, unidade: '% a.a.',
    link: 'https://www.bcb.gov.br/controleinflacao/taxaselic', origem: 'Banco Central — SGS 432' },
  { id: 'cdi', nome: 'CDI anualizado', tema: 'macro', fonte: 'sgs', serie: 4389, unidade: '% a.a.',
    link: 'https://www.bcb.gov.br/estabilidadefinanceira/historicotaxasjuros', origem: 'Banco Central — SGS 4389' },
  { id: 'ipca', nome: 'IPCA em 12 meses', tema: 'macro', fonte: 'sgs', serie: 13522, unidade: '%',
    link: 'https://www.ibge.gov.br/explica/inflacao.php', origem: 'Banco Central — SGS 13522 (IBGE)' },
  { id: 'dolar', nome: 'Dólar PTAX (venda)', tema: 'mercado', fonte: 'sgs', serie: 1, unidade: 'R$', casas: 4,
    link: 'https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes', origem: 'Banco Central — SGS 1' },
  { id: 'desemprego', nome: 'Desemprego (PNAD)', tema: 'macro', fonte: 'sgs', serie: 24369, unidade: '%',
    link: 'https://www.ibge.gov.br/estatisticas/sociais/trabalho/9171-pesquisa-nacional-por-amostra-de-domicilios-continua-mensal.html', origem: 'Banco Central — SGS 24369 (IBGE)' },
  { id: 'focusPib', nome: 'PIB esperado no ano', tema: 'macro', fonte: 'focus', indicador: 'PIB Total', unidade: '%',
    link: 'https://www.bcb.gov.br/publicacoes/focus', origem: 'Boletim Focus (mediana)' },
  { id: 'focusIpca', nome: 'IPCA esperado no ano', tema: 'macro', fonte: 'focus', indicador: 'IPCA', unidade: '%',
    link: 'https://www.bcb.gov.br/publicacoes/focus', origem: 'Boletim Focus (mediana)' },
  { id: 'soja', nome: 'Safra de soja (estimativa)', tema: 'producao', fonte: 'sidra', unidade: 'mi t',
    url: 'https://apisidra.ibge.gov.br/values/t/6588/n1/all/v/35/p/last%201/c48/39443', divisor: 1e6,
    link: 'https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9201-levantamento-sistematico-da-producao-agricola.html', origem: 'IBGE — LSPA (tabela 6588)' },
  { id: 'milho', nome: 'Safra de milho, 1ª + 2ª (estimativa)', tema: 'producao', fonte: 'sidra', unidade: 'mi t',
    url: 'https://apisidra.ibge.gov.br/values/t/6588/n1/all/v/35/p/last%201/c48/39441,39442', divisor: 1e6, soma: true,
    link: 'https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9201-levantamento-sistematico-da-producao-agricola.html', origem: 'IBGE — LSPA (tabela 6588)' },
  { id: 'abate', nome: 'Bovinos abatidos no trimestre', tema: 'producao', fonte: 'sidra', unidade: 'mi cabeças',
    url: 'https://apisidra.ibge.gov.br/values/t/1092/n1/all/v/284/p/last%201/c12716/115236/c18/992/c12529/118225', divisor: 1e6,
    link: 'https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9203-pesquisas-trimestrais-do-abate-de-animais.html', origem: 'IBGE — Abate de animais (tabela 1092)' },
  { id: 'femeas', nome: 'Fêmeas no abate (vacas + novilhas)', tema: 'producao', fonte: 'sidra', unidade: '% do total', femeas: true,
    url: 'https://apisidra.ibge.gov.br/values/t/1092/n1/all/v/284/p/last%201/c12716/115236/c18/992,56,111735/c12529/118225',
    link: 'https://www.ibge.gov.br/estatisticas/economicas/agricultura-e-pecuaria/9203-pesquisas-trimestrais-do-abate-de-animais.html', origem: 'IBGE — Abate de animais (tabela 1092)' }
];

const ESTUDOS_PANORAMA = [
  { id: 'p-vbp', tema: 'producao', data: '2026-10-23',
    titulo: 'Agropecuária deve faturar R$ 1,44 trilhão em 2026',
    texto: 'O Valor Bruto da Produção estimado em setembro soma R$ 921,7 bilhões nas lavouras (64%) e R$ 517,9 bilhões na pecuária (36%). A carne bovina é o maior item da pecuária, com R$ 253,4 bilhões (17,6% do total), atrás apenas da soja (R$ 352,7 bilhões). O Centro-Oeste lidera, com R$ 431,2 bilhões, puxado por Mato Grosso (R$ 225,2 bilhões).',
    importa: 'Mostra o peso da bovinocultura na renda do campo e onde a produção está concentrada: é no Centro-Oeste que a disputa por boi magro, milho e frete é mais intensa.',
    fonte: { nome: 'MAPA — Valor Bruto da Produção', url: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2026/valor-bruto-da-producao-agropecuaria-e-estimado-em-r-1-44-trilhao-em-setembro' } },
  { id: 'p-china-ne', tema: 'mercado', data: '2026-10-23',
    titulo: 'Primeiro embarque de carne bovina do Nordeste para a China',
    texto: 'Uma carga de 27 toneladas saiu de um frigorífico em Canhotinho (PE), a primeira unidade da região habilitada a exportar carne bovina para o mercado chinês.',
    importa: 'Cada nova planta habilitada amplia a concorrência pela compra de boi gordo na região e pode encurtar o caminho entre o confinamento e a exportação.',
    fonte: { nome: 'MAPA', url: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2026/ministro-andre-de-paula-acompanha-primeiro-embarque-de-carne-bovina-do-nordeste-para-a-china-1' } },
  { id: 'p-mercados', tema: 'mercado', data: '2026-10-23',
    titulo: 'Novas aberturas de mercado: Argentina, Egito, Marrocos, Peru, Quênia e Singapura',
    texto: 'Nota conjunta do MAPA e do Itamaraty anunciou a abertura desses mercados para produtos brasileiros.',
    importa: 'Mais destinos reduzem a dependência de um único comprador. Para a pecuária, a diversificação diminui o impacto de uma suspensão pontual sobre o preço da arroba.',
    fonte: { nome: 'MAPA / MRE', url: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2026/aberturas-de-mercado-para-produtos-brasileiros-na-argentina-egito-marrocos-peru-quenia-e-singapura' } },
  { id: 'p-newcastle', tema: 'sanidade', data: '2026-10-28',
    titulo: 'Doença de Newcastle em Santa Catarina e o valor da regionalização',
    texto: 'Desde 19/10 foram confirmados focos da doença em aves em Santa Catarina. Segundo o MAPA, a negociação de regionalização com os parceiros limitou as restrições às áreas afetadas e evitou perdas estimadas em US$ 954 milhões por ano.',
    importa: 'Embora atinja aves, o caso mostra como a sanidade define o acesso a mercados. Na carne bovina vale o mesmo: um foco pode fechar destinos, e acordos de regionalização limitam o dano.',
    fonte: { nome: 'MAPA', url: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2026/trabalho-do-mapa-pela-regionalizacao-sanitaria-reduz-impacto-comercial-da-doenca-de-newcastle' } },
  { id: 'p-aftosa', tema: 'sanidade', data: '2025-05-29',
    titulo: 'Brasil é reconhecido livre de febre aftosa sem vacinação',
    texto: 'Na 92ª Assembleia Geral da Organização Mundial de Saúde Animal (OMSA), em Paris, o país obteve o reconhecimento internacional como livre de febre aftosa sem vacinação.',
    importa: 'O status abre portas para mercados que pagam mais e exigem esse reconhecimento. Em contrapartida, aumenta a importância da vigilância: o produtor passa a ser parte do sistema de alerta.',
    fonte: { nome: 'Defesa Agropecuária SP', url: 'https://www.defesa.agricultura.sp.gov.br/informativo/defesa-agrosp-no-039-abrilmaio2025/omsa-reconhece-o-brasil-como-zona-livre-de-febre-aftosa-sem-vacinacao/' } },
  { id: 'p-censo', tema: 'gestao', data: '2026-10-27',
    titulo: 'Censo Agropecuário 2027 começa com cadastro prévio',
    texto: 'O IBGE lançou uma ferramenta digital de atualização cadastral dos estabelecimentos rurais e vai testar os procedimentos antes do levantamento nacional.',
    importa: 'O Censo é a base de muitas políticas e linhas de crédito. Manter o cadastro do estabelecimento atualizado evita ficar fora das estatísticas que orientam o setor.',
    fonte: { nome: 'MAPA / IBGE', url: 'https://www.gov.br/agricultura/pt-br/assuntos/noticias/2026/censo-agropecuario-2027-avanca-com-cadastro-previo-e-testes-experimentais' } }
];

// Correlações: "indicadores" liga o card aos valores ao vivo acima.
const ESTUDOS_CORRELACOES = [
  { id: 'c-juros', tema: 'macro', titulo: 'Juros (Selic/CDI) x custo de oportunidade do confinamento',
    indicadores: ['selic', 'cdi'], calculo: 'oportunidade',
    texto: 'Todo real investido no lote poderia estar rendendo o CDI. Quanto maior a Selic, maior a margem que o confinamento precisa entregar para valer a pena, e mais caro fica o crédito para comprar boi magro e insumos.',
    acompanhe: ['Decisões do Copom (a cada 45 dias)', 'Expectativa de Selic no Boletim Focus', 'Spread do seu ROIC sobre o CDI no mesmo prazo'] },
  { id: 'c-dolar', tema: 'mercado', titulo: 'Dólar x exportação de carne x preço da arroba',
    indicadores: ['dolar'],
    texto: 'Com o real mais fraco, a carne brasileira fica mais competitiva lá fora e os frigoríficos exportadores tendem a disputar mais o boi, o que sustenta a arroba. O mesmo câmbio encarece insumos cotados em dólar, como fertilizantes e parte dos aditivos e medicamentos.',
    acompanhe: ['PTAX diária', 'Embarques de carne bovina (Secex/Comex Stat)', 'Indicador do boi gordo CEPEA (link na fonte)'] },
  { id: 'c-milho', tema: 'producao', titulo: 'Safra de grãos x custo da diária',
    indicadores: ['milho', 'soja'],
    texto: 'O milho é o principal ingrediente energético da dieta de confinamento, e o farelo de soja a principal fonte de proteína. Uma safra grande tende a baratear a diária; uma quebra por clima faz o contrário. A segunda safra de milho pesa mais que a primeira.',
    acompanhe: ['Estimativas mensais do LSPA/IBGE e da Conab', 'Preço do milho na sua região', 'Custo da diária x preço da arroba (margem do cocho)'] },
  { id: 'c-ciclo', tema: 'producao', titulo: 'Ciclo pecuário: abate de fêmeas x preço da reposição',
    indicadores: ['femeas', 'abate'],
    texto: 'Quando a participação de vacas e novilhas no abate é alta, o rebanho de matrizes encolhe e, um a dois anos depois, faltam bezerros: a reposição encarece. Quando as fêmeas são retidas, o abate cai no curto prazo e a oferta de animais cresce mais à frente.',
    acompanhe: ['Participação de fêmeas no abate (IBGE, trimestral)', 'Relação de troca boi gordo x bezerro', 'Indicador do bezerro CEPEA (link na fonte)'] },
  { id: 'c-consumo', tema: 'macro', titulo: 'Inflação e renda x consumo de carne bovina',
    indicadores: ['ipca', 'desemprego'],
    texto: 'Com inflação alta e renda apertada, parte do consumidor troca carne bovina por frango, suínos ou ovos. Emprego em alta e inflação controlada favorecem o consumo interno, que absorve a maior parte da carne produzida no país.',
    acompanhe: ['IPCA de alimentação no domicílio', 'Taxa de desemprego', 'Preço relativo boi x frango'] },
  { id: 'c-sanidade', tema: 'sanidade', titulo: 'Sanidade x acesso a mercados',
    texto: 'Mercados exigentes compram de países com bom status sanitário. Um foco de doença pode suspender exportações por dias ou meses. Por isso valem tanto a regionalização (restringir só a área afetada) e a rastreabilidade do rebanho.',
    acompanhe: ['Notas oficiais do MAPA', 'Habilitações de frigoríficos por país', 'Calendário sanitário e GTA do seu rebanho'] },
  { id: 'c-clima', tema: 'clima', titulo: 'Clima x pasto, grãos e oferta de boi',
    texto: 'Seca prolongada reduz o pasto, antecipa a venda de animais e pressiona a arroba para baixo no curto prazo. Depois, falta boi e o preço reage. Os fenômenos El Niño e La Niña mudam o regime de chuvas e afetam a safra de milho e o custo da dieta.',
    acompanhe: ['Previsões climáticas do INMET e do CPTEC/INPE', 'Zoneamento Agrícola de Risco Climático (ZARC)', 'Planejamento de entressafra e silagem'] },
  { id: 'c-hedge', tema: 'gestao', titulo: 'Volatilidade da arroba x proteção de preço',
    texto: 'Entre a compra do boi magro e a venda do gordo passam meses. Contratos a termo com o frigorífico e o mercado futuro de boi gordo na B3 permitem travar parte do preço de venda e transformar uma aposta em uma margem conhecida.',
    acompanhe: ['Curva do boi gordo na B3', 'Base regional (preço local x B3)', 'Percentual do lote protegido'] }
];
