// ============================================
// MATERIAIS DE APOIO — BASE DE CONTEÚDO
// ============================================
// Cursos completos sobre o agro, produzidos para pessoas que querem
// entender o negócio e tomar decisões melhores. Cada curso tem:
//   • aulas escritas (formato de ensino): objetivo, conteúdo, pontos-chave e prática
//   • um documentário em texto (narração em capítulos com timecodes)
// Uso livre por qualquer pessoa: estude no seu ritmo.
//
// Observação de honestidade: os "documentários" são narrações escritas em
// formato de roteiro/transcrição — não são arquivos de vídeo.
// ============================================

const MATERIAIS = [
  // ---------------------------------------------------------------
  // 1. FUNDAMENTOS DO CONFINAMENTO
  // ---------------------------------------------------------------
  {
    id: 'fundamentos',
    titulo: 'Fundamentos do Confinamento Bovino',
    tema: 'Produção',
    nivel: 'Iniciante',
    icone: 'cow',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=wide%20aerial%20photo%20of%20a%20modern%20Brazilian%20cattle%20feedlot%20at%20golden%20hour%2C%20rows%20of%20cattle%20at%20concrete%20troughs%2C%20green%20hills%2C%20professional%20agriculture%20photography&image_size=landscape_16_9',
    resumo: 'Entenda o que é confinamento, como funciona o ciclo de 106 dias, o modelo de boitel e os indicadores que realmente decidem o lucro: ganho médio diário, conversão alimentar e rendimento de carcaça.',
    documentario: {
      titulo: 'Do pasto ao cocho: 106 dias que mudam a margem',
      duracao: '34 min',
      sinopse: 'Uma narração em seis capítulos que acompanha o caminho do boi magro até o abate: o que acontece dentro do curral, quanto custa cada fase e onde o dinheiro entra e sai.',
      capitulos: [
        { t: '00:00', titulo: 'O ponto de partida: o boi magro', texto: [
          'Todo confinamento começa muito antes de o caminhão descarregar. Começa no momento em que alguém decide comprar um animal magro para engordar e vender gordo. Esse boi é o "estoque" do negócio, e o preço pago por ele é o maior desembolso de toda a operação.',
          'O boi magro típico do confinamento brasileiro entra no curral com algo entre 330 e 380 quilos e cerca de 24 a 30 meses — embora o padrão exportação, alinhado ao mercado chinês, prefira animais abaixo de 30 meses e acima de 350 quilos. Peso muito baixo significa mais dias de cocho e mais diária paga; peso muito alto reduz o ganho por dia e encarece a compra.',
          'Aqui já aparece a primeira lição econômica: o confinamento é, essencialmente, um negócio de transformação. Compra-se quilo barato na forma de boi magro e vende-se quilo caro na forma de boi gordo. A diferença precisa cobrir alimentação, hospedagem, frete, sanidade, impostos e ainda remunerar o capital.'
        ] },
        { t: '05:40', titulo: 'A chegada e a adaptação', texto: [
          'O animal desce do caminhão estressado, desidratado e com o rúmen adaptado a pasto. Os primeiros dias não são para engordar: são para recuperar. É o chamado período de adaptação, normalmente de 10 a 20 dias, em que o volumoso domina a dieta e o concentrado entra em degraus.',
          'Errar essa etapa é uma das causas mais comuns de prejuízo. Adaptar rápido demais provoca acidose, queda de consumo e até morte. Adaptar devagar demais joga fora dias de confinamento e encarece a diária sem ganho de peso correspondente.',
          'É também nessa fase que se faz a triagem sanitária de entrada: vacinação, vermifugação, identificação individual e pesagem inicial. A pesagem de entrada é a linha de base de todo o indicador de ganho de peso que virá depois.'
        ] },
        { t: '12:10', titulo: 'Crescimento: o rúmen em reconstrução', texto: [
          'Passada a adaptação, começa a fase de crescimento. O rúmen já tolera níveis maiores de concentrado e o animal passa a responder com ganhos de peso consistentes. É o momento em que a conversão alimentar se define: quantos quilos de comida viram um quilo de carne.',
          'Nesta etapa, o que manda no resultado é a qualidade da dieta e a leitura do cocho. Um cocho mal manejado — que sobra ou falta comida — destrói margem silenciosamente. O boi que passa fome não ganha peso; o boi que sobra desperdiça ração, que é o item mais caro da conta.',
          'Em números redondos, o rebanho deve ganhar entre 1,2 e 1,6 quilo por dia nessa fase, dependendo do potencial genético, do peso de entrada e da dieta adotada.'
        ] },
        { t: '19:30', titulo: 'Terminação: a reta final da arroba', texto: [
          'A terminação é a fase em que o animal deposita a gordura de cobertura e a marmoreio que o frigorífico remunera. Dietas com mais energia, mais milho e mais gordura entram em cena. Aqui o objetivo muda de "ganhar peso" para "ganhar peso com acabamento".',
          'É a fase mais cara por dia, mas também a que mais agrega valor, porque o quilo final é o que recebe a bonificação por qualidade. O produtor profissional mede o ponto de abate: o animal precisa sair no momento em que a carcaça atinge o acabamento ideal, e não quando o curral fica cheio.',
          'Sair tarde demais significa pagar diária por um ganho cada vez mais ineficiente. Sair cedo demais significa perder arroba e, eventualmente, penalização por carcaça desclassificada.'
        ] },
        { t: '27:00', titulo: 'O abate e o rendimento de carcaça', texto: [
          'O boi gordo sai do curral com, tipicamente, entre 540 e 580 quilos de peso vivo. O frigorífico paga por arroba de carcaça — ou seja, pelo peso depois de retirados couro, cabeça, patas e vísceras. O rendimento de carcaça, essa razão entre carcaça e peso vivo, costuma ficar entre 50% e 54%.',
          'Um rendimento de 53% em um animal de 560 quilos resulta em cerca de 296 quilos de carcaça, o equivalente a quase 20 arrobas. É esse número — e não o peso na balança da fazenda — que multiplica a cotação do dia e define a receita.',
          'Por isso, qualquer ganho de rendimento vale muito dinheiro. Melhorar um ponto percentual de rendimento em um lote grande pode valer mais do que semanas de negociação pelo preço da arroba.'
        ] },
        { t: '31:20', titulo: 'O que ficou: a leitura da margem', texto: [
          'Fechado o abate, o confinamento revela sua verdade num único número: o lucro por cabeça. Ele é a diferença entre a receita da venda e tudo o que foi gasto para chegar ali — boi magro, ração, diária, frete, sanidade, tributos e perdas.',
          'O produtor amador olha apenas o preço da arroba. O produtor profissional olha a margem, o retorno sobre o capital investido e o tempo que esse capital ficou parado. Uma arroba alta com custo descontrolado pode dar menos lucro do que uma arroba média com operação eficiente.',
          'E é exatamente esse raciocínio que o simulador da Stratum Agro coloca na sua mão: em vez de achismo, números comparáveis lado a lado, praça por praça, cenário por cenário.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Por que confinar e o que é boitel',
        duracao: '16 min',
        objetivo: 'Entender a lógica econômica do confinamento e o papel do boitel na cadeia.',
        conteudo: [
          'Confinar é tirar o boi do pasto e alimentá-lo em curral, com dieta controlada, para acelerar o ganho de peso e vender o animal antes — normalmente em torno de 90 a 120 dias. A grande vantagem não é apenas engordar mais rápido: é ter previsibilidade. Em vez de depender da chuva e do capim, o produtor controla o que o animal come e quando ele sai.',
          'Existe ainda uma vantagem de mercado: o confinamento permite programar a venda para períodos de preço melhor e atender contratos com frigoríficos que exigem volume constante. Quem entrega lote homogêneo e no prazo negocia melhor.',
          'O boitel é o modelo em que o dono do gado terceiriza a estrutura. O boitel fornece curral, dieta, mão de obra e manejo, e cobra por isso — normalmente uma diária por cabeça, ou um acerto no momento do abate (o "gancho"). O investidor entra com o capital para comprar o boi magro e assume o risco de mercado.',
          'Essa separação de papéis é o coração do modelo. Quem não tem terra, curral ou tempo encontra no boitel uma forma de alocar capital no agro; quem tem estrutura rentabiliza curral vazio. O que une os dois é um contrato bem escrito — assunto do curso específico de boitel e contratos.'
        ],
        pontos: [
          'Confinamento é transformação de quilo barato (boi magro) em quilo caro (boi gordo), com ganho de previsibilidade.',
          'Boitel: o dono do gado paga pela estrutura e pelo manejo; o investidor assume o risco de mercado.',
          'As duas modalidades de cobrança mais comuns são diária por cabeça e acerto no gancho (no abate).',
          'Lote homogêneo e entrega no prazo melhoram o poder de negociação com o frigorífico.'
        ],
        pratica: 'Liste os três maiores custos do seu cenário e escreva ao lado quais deles o boitel assume no contrato que você analisa. Se a resposta não estiver clara no papel, é sinal de cláusula mal definida.'
      },
      {
        titulo: 'O ciclo de 106 dias em três fases',
        duracao: '18 min',
        objetivo: 'Conhecer as fases do ciclo e o que se espera de cada uma.',
        conteudo: [
          'O ciclo clássico de referência tem cerca de 106 dias e se divide em adaptação, crescimento e terminação. Os 106 dias não são uma regra da natureza: são um padrão de mercado que combina o tempo necessário para ganhar peso, o custo da diária e a janela de preço esperada.',
          'A adaptação ocupa algo entre 10 e 20 dias e serve para reconstruir a população de microrganismos do rúmen para uma dieta rica em energia. Nessa fase o ganho de peso é modesto e o foco é não errar. Muitos confinamentos dividem a adaptação em três ou quatro "dietas" ou "passos", aumentando o concentrado aos poucos.',
          'O crescimento vai até por volta do 70º dia. É a fase de melhor eficiência: o animal come bem, ganha peso de forma econômica e a conversão alimentar é favorável. A dieta já tem bastante concentrado, mas o volumoso ainda tem papel importante na saúde do rúmen.',
          'A terminação ocupa a reta final. A energia da dieta aumenta para garantir acabamento de carcaça. O ganho por dia pode até cair um pouco, porque a deposição de gordura exige mais energia por quilo do que a deposição de músculo — mas o valor do animal vendido sobe.'
        ],
        pontos: [
          'Ciclo de referência: ~106 dias divididos em adaptação (~10 a 20 dias), crescimento (até ~70 dias) e terminação.',
          'Adaptação não engorda: prepara o rúmen. Errar aqui gera acidose e perda.',
          'Crescimento é a fase de melhor conversão alimentar e mais eficiência econômica.',
          'Terminação é a fase mais cara por dia, mas agrega acabamento e valor de carcaça.'
        ],
        pratica: 'Monte uma linha do tempo do seu lote com os dias que você pretende dedicar a cada fase e o peso esperado ao fim de cada uma. Se o peso ao fim do crescimento já for suficiente para o abate, talvez você esteja pagando terminação desnecessária.'
      },
      {
        titulo: 'Ganho de peso e conversão alimentar',
        duracao: '17 min',
        objetivo: 'Calcular e interpretar GMD e conversão alimentar, os dois indicadores técnicos centrais.',
        conteudo: [
          'O ganho médio diário, ou GMD, é a quantidade de quilos que o animal ganha por dia. Calcula-se dividindo a diferença entre o peso final e o peso inicial pelo número de dias. Um GMD de 1,4 quilo significa que, em 106 dias, o animal ganhou cerca de 148 quilos. O GMD é o motor do peso final.',
          'A conversão alimentar mede a eficiência: quantos quilos de ração (matéria seca) são necessários para produzir um quilo de peso vivo. Quanto menor, melhor. Na prática, o confinamento trabalha com valores na faixa de 5,5 a 7,5 quilos de alimento por quilo de ganho, variando com a dieta, o peso do animal e a genética.',
          'A conta fica intuitiva quando se transforma conversão em dinheiro: se a dieta custa 1,60 real por quilo de matéria seca e a conversão é de 6, produzir um quilo de peso vivo custa perto de 9,60 reais de alimentação. Multiplique pelo total de quilos ganhos no lote e você tem o custo alimentar — o maior item do orçamento.',
          'Melhorar a conversão não é só trocar a dieta. Tem a ver com a qualidade do volumoso, o processamento do grão, o manejo de cocho, a frequência de trato e o conforto do animal. Animal estressado, com lama ou calor, converte pior.'
        ],
        pontos: [
          'GMD = (peso final − peso inicial) ÷ dias. É o motor do peso final e da receita.',
          'Conversão alimentar = quilos de alimento por quilo de ganho. Menor é melhor (faixa usual 5,5 a 7,5).',
          'Custo alimentar = conversão × preço do quilo de matéria seca. É o maior custo da operação.',
          'Conforto animal, manejo de cocho e processamento do grão afetam diretamente a conversão.'
        ],
        pratica: 'Use suas próprias estimativas: GMD de 1,4 kg, 106 dias e conversão de 6. Calcule o ganho total do lote e, com o preço da dieta, o custo de alimentação por cabeça. Depois compare com o valor esperado da arroba adicional.'
      },
      {
        titulo: 'Instalações, cocho e água',
        duracao: '15 min',
        objetivo: 'Reconhecer os pontos da estrutura que mais impactam desempenho e risco.',
        conteudo: [
          'O curral não precisa ser caro, mas precisa funcionar. Os elementos que realmente pesam no desempenho são espaço de cocho por animal, disponibilidade de água limpa, sombra ou ventilação, e piso que não vire lamaçal.',
          'Espaço de cocho insuficiente provoca competição: os animais mais fortes comem mais e os mais fracos menos. O lote perde homogeneidade e o resultado médio piora. A recomendação prática é deixar entre 0,4 e 0,6 metro linear de cocho por cabeça, dependendo do porte do animal.',
          'Água é o nutriente mais barato e o mais negligenciado. Um bovino em terminação pode beber mais de 50 litros por dia. Bebedouros sujos, quentes ou distantes reduzem a ingestão, e menos ingestão significa menos ganho de peso. Bebedouro mal posicionado é dinheiro jogado fora em silêncio.',
          'Sombra e ventilação são especialmente críticas em regiões de clima quente. Estresse térmico reduz consumo, piora a conversão e aumenta a mortalidade. Em lotes de alto valor, investir em sombra artificial costuma se pagar na primeira safra.'
        ],
        pontos: [
          'Espaço de cocho: cerca de 0,4 a 0,6 m por cabeça evita competição e melhora a homogeneidade.',
          'Água limpa e abundante: mais de 50 litros/dia por animal em terminação.',
          'Sombra e ventilação reduzem estresse térmico e protegem a conversão alimentar.',
          'Piso mal drenado gera lama, que aumenta o gasto energético do animal e o risco sanitário.'
        ],
        pratica: 'Faça um diagnóstico rápido do curral que você usa ou pretende usar: metros lineares de cocho divididos pelo número de cabeças, litros de água disponíveis por dia e existência de sombra. Anote os três pontos mais frágeis.'
      },
      {
        titulo: 'Escolhendo o boi magro certo',
        duracao: '18 min',
        objetivo: 'Aprender os critérios de compra que mais impactam o resultado do confinamento.',
        conteudo: [
          'A compra do boi magro define o resultado. É o maior desembolso e o que menos se pode corrigir depois. Os quatro critérios que pesam são peso de entrada, idade (e dentição), sanidade aparente e homogeneidade do lote.',
          'Peso e idade caminham juntos. Animais muito leves ficam tempo demais no cocho, acumulando diárias e risco. Animais acima de 30 meses perdem elegibilidade para o mercado chinês e, com isso, a bonificação que muitas vezes faz o lucro aparecer. A dentição é usada como proxy de idade: dentes de leite indicam animal jovem.',
          'Homogeneidade vale mais do que parece. Um lote muito desigual faz com que parte dos animais termine antes dos outros: ou você vende cedo e perde arroba nos atrasados, ou espera e paga diária pelos adiantados. Os dois caminhos custam dinheiro.',
          'Sanidade de entrada é decisão de risco. Um animal com problema respiratório crônico ou claudicação pode consumir o lucro de vários animais sadios. Sempre que possível, compre de origem conhecida, com calendário vacinal documentado e com pesagem confiável.'
        ],
        pontos: [
          'Peso de entrada típico: 330 a 380 kg. Muito leve = mais diárias; muito pesado = menos eficiência.',
          'Idade abaixo de 30 meses preserva o acesso ao prêmio Boi China.',
          'Homogeneidade do lote evita vender cedo ou pagar diária por atrasados.',
          'Origem conhecida e calendário sanitário reduzem o risco de perdas silenciosas.'
        ],
        pratica: 'Antes de fechar a próxima compra, escreva o peso médio, a idade estimada (dentição) e o desvio de peso do lote. Se o desvio for grande, exija desconto ou divida o lote para tratamento por fases.'
      },
      {
        titulo: 'Os cinco indicadores que decidem o lucro',
        duracao: '20 min',
        objetivo: 'Consolidar os números que devem ser acompanhados em todo confinamento.',
        conteudo: [
          'Cinco indicadores bastam para saber se a operação está saudável: lucro por cabeça, lucro do lote, custo da arroba produzida, ROIC do período e caixa livre em D0. Eles se conectam: os três primeiros medem rentabilidade, o quarto mede eficiência do capital e o quinto mede liquidez.',
          'O lucro por cabeça é o resultado bruto da operação dividido pelo número de animais. O lucro do lote é ele multiplicado pelo tamanho do rebanho. Juntos, evitam a armadilha de olhar só o percentual e esquecer o volume.',
          'O custo da arroba produzida é o indicador técnico mais poderoso, porque permite comparar operações de tamanhos diferentes e responder à pergunta essencial: abaixo de que preço de arroba essa operação dá prejuízo? Esse é o ponto de equilíbrio.',
          'O ROIC mede o retorno sobre o capital efetivamente investido, e não apenas o patrimônio total. Ele responde a uma pergunta que todo investidor deveria fazer sempre: este capital renderia mais na renda fixa? E o caixa livre em D0 mostra quanto sobra de capital após as saídas do dia zero, ou seja, se a operação é financeiramente executável sem estourar o orçamento.'
        ],
        pontos: [
          'Rentabilidade: lucro por cabeça e lucro do lote.',
          'Eficiência técnica: custo da arroba produzida e ponto de equilíbrio.',
          'Eficiência de capital: ROIC do período, comparado ao CDI.',
          'Liquidez: caixa livre em D0, que confirma se a operação cabe no bolso.'
        ],
        pratica: 'Abra o simulador, preencha seus números reais e anote os cinco indicadores. Depois compare o ROIC com o CDI e escreva em uma frase se a operação compensa o risco. Essa frase é a sua tese de investimento.'
      }
    ],
    quiz: [
      { p: 'Qual é a principal vantagem de gerir o confinamento com previsibilidade?', opcoes: ['Elimina totalmente o risco de mercado', 'Permite controlar a alimentação e programar a venda do lote', 'Dispensa a mão de obra do curral', 'Reduz o preço pago pelo boi magro'], correta: 1, explicacao: 'Confinar dá controle sobre o que o animal come e quando ele sai, o que permite programar a venda e atender contratos. O risco de mercado continua existindo.' },
      { p: 'No modelo de boitel, quem assume o risco de mercado (preço de compra e de venda)?', opcoes: ['O boitel', 'O frigorífico', 'O investidor, dono do gado', 'É dividido igualmente entre as partes'], correta: 2, explicacao: 'O investidor assume o risco de mercado; o boitel assume o risco operacional: estrutura, dieta, manejo e sanidade.' },
      { p: 'Uma conversão alimentar de 6 significa que:', opcoes: ['O animal ganha 6 kg por dia', 'São necessários 6 kg de alimento (matéria seca) para cada 1 kg de ganho', 'A dieta tem 6% de proteína', 'O lote pesa 6 arrobas a mais por cabeça'], correta: 1, explicacao: 'Conversão alimentar é a razão entre alimento consumido e ganho de peso. Quanto menor, mais eficiente é a dieta.' },
      { p: 'Em qual fase do ciclo de 106 dias a eficiência (conversão alimentar) costuma ser melhor?', opcoes: ['Adaptação', 'Crescimento', 'Terminação', 'As três fases são equivalentes'], correta: 1, explicacao: 'No crescimento o animal come bem e ganha peso de forma econômica. A terminação é a fase mais cara por dia.' },
      { p: 'Por que o animal com menos de 30 meses costuma valer mais na venda?', opcoes: ['Porque ganha mais peso por dia', 'Porque sempre tem rendimento de carcaça maior', 'Porque é elegível a protocolos de exportação, como o Boi China', 'Porque consome menos ração'], correta: 2, explicacao: 'A idade abaixo de 30 meses é um dos requisitos do protocolo chinês, que paga bonificação adicional por arroba.' }
    ]
  },

  // ---------------------------------------------------------------
  // 2. CUSTOS, ARROBA E FORMAÇÃO DE PREÇO
  // ---------------------------------------------------------------
  {
    id: 'custos',
    titulo: 'Custos, Arroba e Formação de Preço',
    tema: 'Gestão',
    nivel: 'Intermediário',
    icone: 'money',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=hands%20counting%20Brazilian%20real%20banknotes%20beside%20a%20tablet%20showing%20cattle%20price%20charts%20on%20a%20farm%20office%20desk%2C%20warm%20light%2C%20professional%20finance%20photography&image_size=landscape_16_9',
    resumo: 'Aprenda a montar o custo real do confinamento, calcular a arroba produzida, entender como o preço da arroba é formado e descobrir o ponto em que a operação começa a dar prejuízo.',
    documentario: {
      titulo: 'A arroba que sobra',
      duracao: '31 min',
      sinopse: 'Cinco capítulos sobre a conta que ninguém gosta de fazer: quanto custa, de verdade, produzir uma arroba — e a partir de que preço o negócio deixa de valer a pena.',
      capitulos: [
        { t: '00:00', titulo: 'A conta que o produtor evita', texto: [
          'Existe uma conversa difícil em toda fazenda: quanto custou, exatamente, o quilo que foi vendido? A maioria dos produtores sabe o preço de venda e desconfia do custo. Essa assimetria é o berço do prejuízo silencioso.',
          'Custo não é apenas o dinheiro que saiu. É também o dinheiro que deixou de render — o custo de oportunidade do capital parado. Um projeto que "empata" na conta de caixa pode estar destruindo valor quando comparado à renda fixa.',
          'Neste documentário, percorremos os componentes do custo, a aritmética da arroba produzida e a formação do preço no mercado brasileiro.'
        ] },
        { t: '06:10', titulo: 'Os componentes do custo', texto: [
          'O confinamento tem cinco grandes componentes de custo. O primeiro e maior é o boi magro: dependendo do cenário, responde por mais da metade do desembolso total. É o insumo que define o tamanho do cheque inicial.',
          'O segundo é a alimentação, que se divide em volumoso, concentrado, minerais e aditivos. É o custo que mais varia com o preço do milho e do farelo de soja, e o mais sensível às decisões de formulação e ao manejo de cocho.',
          'O terceiro é a hospedagem — a diária do boitel ou o custo de manutenção do próprio curral, com mão de obra, energia, sanidade e estrutura. O quarto é a logística: frete de compra e de venda, GTA, seguro, sanidade de transporte. O quinto é o bloco de tributos e perdas: Funrural, impostos sobre o lucro e a mortalidade ou refugo estimado.',
          'Somados, esses cinco blocos formam o custo total. Somar é fácil; o difícil é não esquecer nenhum — e é por isso que projetos fatiados em planilha única erram tanto.'
        ] },
        { t: '13:40', titulo: 'A arroba produzida', texto: [
          'Custo da arroba produzida é o custo total dividido pelo número de arrobas produzidas no lote. É o número que permite comparar operações de tamanhos e raças diferentes em pé de igualdade.',
          'Sua utilidade prática é direta: se o custo da arroba produzida é menor do que o preço de venda, o negócio tem margem. Se for maior, cada arroba vendida aumenta o prejuízo. O ponto em que os dois se encontram é o ponto de equilíbrio.',
          'Compare esse indicador com o preço histórico da arroba na sua praça. Quando o custo produzido está muito próximo do preço de mercado, a operação é frágil: qualquer alta no milho ou queda na cotação a empurra para o vermelho. Operações robustas mantêm folga.'
        ] },
        { t: '20:00', titulo: 'Como o preço da arroba se forma', texto: [
          'O preço do boi gordo no Brasil não é fixado por um único ator. Ele é formado pela interação entre a oferta de animais prontos, a demanda interna de carne, a exportação e as expectativas futuras capturadas pelo mercado de derivativos.',
          'Indicadores como o do Centro de Estudos Avançados em Economia Aplicada (CEPEA/Esalq), referência do mercado, e o índice do Instituto de Economia Agrícola medem o preço à vista em praças específicas. Os contratos futuros de boi gordo negociados na B3 antecipam expectativas e funcionam como referência para negociações a termo.',
          'Há ainda o peso da exportação. Quando a China, maior comprador da carne bovina brasileira, aumenta o ritmo de compras, o preço interno sente. Quando a demanda cai, o movimento se inverte. O produtor não controla nada disso — mas pode se proteger, e é aí que entram hedge, contratos a termo e trava de preço.'
        ] },
        { t: '26:30', titulo: 'Margem, equilíbrio e decisão', texto: [
          'Com custo, preço e produto definidos, o produtor consegue responder às perguntas que realmente importam. Qual é a minha margem? Qual é o meu ponto de equilíbrio? A partir de que preço de arroba essa operação deixa de valer a pena?',
          'Ponto de equilíbrio é o preço (ou a quantidade) em que receita e custo se igualam. Abaixo dele, opera-se no prejuízo. Conhecê-lo muda a postura na negociação: em vez de reagir ao preço do dia, o produtor sabe exatamente até onde pode apertar e quando deve recusar um negócio.',
          'Margem, por sua vez, só faz sentido quando comparada a algo. A pergunta correta não é "rendeu quanto?", mas "rendeu mais do que o mesmo capital renderia na renda fixa, ajustado ao risco?". A resposta a essa pergunta é o que separa investimento de aposta.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Anatomia do custo de produção',
        duracao: '18 min',
        objetivo: 'Mapear todos os componentes do custo do confinamento sem deixar buracos.',
        conteudo: [
          'Todo confinamento tem cinco blocos de custo. Listar todos, sem exceção, é o primeiro passo para não vender no prejuízo. O bloco do animal, o bloco da nutrição, o bloco da hospedagem, o bloco da logística e o bloco de tributos e perdas.',
          'O bloco do animal é o mais simples e o mais pesado: quanto se pagou pelo boi magro, multiplicado pelo número de cabeças, mais o custo da mortalidade no transporte e do jejum de chegada. O peso falso de rúmen — quando o animal bebe muita água antes da pesagem — é um clássico: você compra água ao preço de carne.',
          'O bloco da nutrição reúne volumoso, concentrado, núcleo mineral e aditivos. É o bloco mais volátil, porque depende de preço de milho, de soja e de disponibilidade de silagem ou bagaço. Ração volatiliza a margem de um dia para o outro.',
          'Os blocos de hospedagem, logística e tributos parecem menores, mas juntos são responsáveis por uma fatia relevante. Frete calculado pela distância real e pela tarifa por cabeça, diária de boitel ou custo próprio de manutenção, Funrural, imposto sobre o lucro. Cada item esquecido infla artificialmente o lucro projetado.'
        ],
        pontos: [
          'Cinco blocos: animal, nutrição, hospedagem, logística e tributos/perdas.',
          'Peso falso de rúmen infla o preço pago pelo boi magro — cuidado com jejum e horário de pesagem.',
          'A nutrição é o bloco mais volátil e o mais afetado por milho e soja.',
          'Frete real deve considerar distância, tarifa por cabeça e GTA, não uma estimativa genérica.'
        ],
        pratica: 'Monte uma planilha de custo com os cinco blocos. Para cada linha, escreva o valor por cabeça e o valor total do lote. Onde você não tiver certeza do número, escreva "a confirmar" — essa lista é o seu roteiro de negociação.'
      },
      {
        titulo: 'Calculando a arroba produzida',
        duracao: '17 min',
        objetivo: 'Dominar o cálculo do custo da arroba e usá-lo como régua de decisão.',
        conteudo: [
          'Custo da arroba produzida é o custo total do lote dividido pelo total de arrobas geradas na venda. As arrobas geradas consideram o peso de carcaça e o rendimento, e não o peso vivo. Isso significa que melhorar rendimento reduz o custo da arroba sem que um quilo a mais de ração tenha sido consumido.',
          'Para calcular as arrobas do lote, multiplique o peso vivo final pelo rendimento de carcaça e divida por 15 — já que a arroba é uma unidade de 15 quilos. Um lote de cem animais saindo com 560 quilos e 53% de rendimento gera, em média, quase 20 arrobas por cabeça.',
          'Com o custo total em mãos, o indicador ganha vida. Se o custo da arroba é 295 reais e o preço de venda é 330, a margem bruta por arroba é de 35 reais. Multiplicada pelas arrobas do lote, define-se o resultado antes de qualquer imposto.',
          'A leitura mais importante é a distância entre o seu custo e o preço de mercado. Operações com folga grande suportam oscilações; operações com folga apertada dependem de sorte. Quem conhece a própria folga negocia sem medo.'
        ],
        pontos: [
          'Arrobas do lote = (peso vivo final × rendimento de carcaça) ÷ 15.',
          'Custo da arroba = custo total do lote ÷ total de arrobas produzidas.',
          'Melhorar o rendimento de carcaça reduz o custo da arroba sem aumentar a ração consumida.',
          'A folga entre custo e preço de mercado indica a resistência da operação a oscilações.'
        ],
        pratica: 'Com o custo total que você levantou, calcule o custo da arroba do seu cenário e compare com o preço da arroba na sua região. Anote a folga em reais e em percentual.'
      },
      {
        titulo: 'Como o preço da arroba se forma',
        duracao: '19 min',
        objetivo: 'Entender os fatores que definem o preço do boi gordo e onde buscar referência de mercado.',
        conteudo: [
          'O preço do boi gordo resulta do encontro entre oferta de animais prontos e demanda por carne, tanto interna quanto externa. Como a carne bovina é um produto negociado internacionalmente, o mercado brasileiro acompanha de perto o apetite de importadores e o câmbio.',
          'Os indicadores de referência funcionam como bússola. O indicador do CEPEA/Esalq, o mais citado no setor, apura o preço à vista do boi gordo em praças representativas, além das cotações de bezerro e de boi magro. Esses números orientam negociações em todo o país.',
          'O mercado futuro da B3 completa o quadro: contratos de boi gordo com vencimento em meses futuros revelam a expectativa coletiva de preço. Quando o futuro negocia acima do à vista, o mercado sinaliza expectativa de alta; quando negocia abaixo, sinaliza cautela.',
          'Além do preço bruto, entram na conta o prêmio por qualidade e as bonificações — como o Boi China — e os descontos por carcaça fora de padrão. Dois produtores podem vender no mesmo dia pelo mesmo preço base e receber valores finais bem diferentes.'
        ],
        pontos: [
          'Preço do boi gordo = oferta de animais prontos × demanda interna e de exportação.',
          'CEPEA/Esalq é a principal referência de preço à vista no Brasil.',
          'Contratos futuros da B3 antecipam expectativas de preço e servem de base para negociação a termo.',
          'Bonificações e descontos por qualidade alteram o preço final mesmo com preço base igual.'
        ],
        pratica: 'Anote a cotação da arroba na sua praça na última semana e compare com o vencimento mais próximo na B3. Se houver diferença relevante, pergunte-se o que o mercado está antecipando.'
      },
      {
        titulo: 'Margem, ponto de equilíbrio e break-even',
        duracao: '18 min',
        objetivo: 'Calcular o ponto a partir do qual a operação passa a dar prejuízo.',
        conteudo: [
          'Margem é a diferença entre receita e custo. Existem várias formas de olhar para ela: margem bruta, margem líquida, margem por cabeça e margem por arroba. Cada uma responde a uma pergunta diferente, e usar a errada leva a decisões erradas.',
          'Margem por arroba favorece a comparação técnica entre operações. Margem por cabeça ajuda a dimensionar lotes. Margem do lote responde à pergunta que o investidor realmente faz: quanto sobrou no final. O importante é escolher uma e ser consistente.',
          'Ponto de equilíbrio é o valor de receita necessário para cobrir todos os custos. Em confinamento, costuma-se expressá-lo como o preço mínimo da arroba que torna o resultado igual a zero. Abaixo desse preço, cada arroba adicional vendida aumenta o prejuízo.',
          'O break-even ganha ainda mais poder quando combinado com a probabilidade. Se o ponto de equilíbrio é 318 reais por arroba e o mercado está em 335, a margem de segurança é de 17 reais. Quanto menor essa folga, mais a operação se parece com especulação financeira.'
        ],
        pontos: [
          'Margem por arroba compara operações; margem por cabeça dimensiona lotes; margem do lote mede o resultado.',
          'Ponto de equilíbrio em confinamento costuma ser expresso como preço mínimo da arroba.',
          'Abaixo do ponto de equilíbrio, vender mais arrobas amplia o prejuízo.',
          'Margem de segurança = distância entre preço de mercado e ponto de equilíbrio.'
        ],
        pratica: 'Calcule o preço mínimo de arroba que zera o seu resultado e subtraia do preço de mercado atual. Se a folga for menor que o custo de um erro (queda de 5% no preço, alta no milho), reavalie o projeto.'
      },
      {
        titulo: 'Indicadores de retorno: ROIC, VPL, TIR e payback',
        duracao: '20 min',
        objetivo: 'Avaliar o projeto com os mesmos critérios usados em qualquer investimento.',
        conteudo: [
          'O retorno sobre o capital investido, ou ROIC, mede quanto o projeto devolve para cada real de capital empregado. É o indicador mais direto para comparar o confinamento com qualquer outra aplicação: renda fixa, ações, outro ativo do agronegócio.',
          'O valor presente líquido, ou VPL, traz todos os fluxos de caixa do projeto para o dia de hoje, descontados a uma taxa que representa o custo de oportunidade. VPL positivo significa que o projeto cria valor acima da alternativa; VPL negativo, que destrói.',
          'A taxa interna de retorno, ou TIR, é a taxa que faz o VPL ser zero. É a rentabilidade implícita do projeto. Comparada ao CDI, a TIR mostra o prêmio de risco do confinamento: se a TIR é 14% e o CDI é 10,75%, o prêmio pelo risco é de pouco mais de 3 pontos percentuais.',
          'Por último, o payback descontado mostra em quanto tempo o capital retorna, considerando o valor do dinheiro no tempo. Operações de ciclo curto, como o confinamento, tendem a ter payback favorável — mas apenas se a margem existir. Payback curto com margem apertada continua sendo risco.'
        ],
        pontos: [
          'ROIC: retorno sobre o capital investido, comparável a outras aplicações.',
          'VPL positivo indica criação de valor acima do custo de oportunidade.',
          'TIR é a rentabilidade implícita; TIR menos CDI é o prêmio de risco.',
          'Payback descontado mede o tempo de retorno do capital com valor do dinheiro no tempo.'
        ],
        pratica: 'Rode o simulador com três cenários de arroba (pessimista, base e otimista) e anote ROIC, VPL e TIR de cada um. Decida em qual cenário você dormiria tranquilo e que preço mínimo aceitaria firmar a operação.'
      }
    ],
    quiz: [
      { p: 'Qual bloco de custo costuma ser o maior desembolso do confinamento?', opcoes: ['A alimentação', 'A compra do boi magro', 'O frete', 'A hospedagem'], correta: 1, explicacao: 'O boi magro é o maior desembolso e o que menos se pode corrigir depois. A alimentação é o bloco mais volátil, não necessariamente o maior.' },
      { p: 'Como se calcula o custo da arroba produzida?', opcoes: ['Preço de venda dividido pelo número de cabeças', 'Custo total do lote dividido pelo total de arrobas geradas', 'Custo da ração dividido pelo ganho de peso', 'Diária multiplicada pelos dias de cocho'], correta: 1, explicacao: 'Custo da arroba produzida é o custo total dividido pelas arrobas geradas (peso vivo final × rendimento de carcaça ÷ 15).' },
      { p: 'Melhorar o rendimento de carcaça tem qual efeito sobre o custo da arroba produzida?', opcoes: ['Nenhum, é só um detalhe do frigorífico', 'Aumenta o custo, porque o animal fica mais tempo no cocho', 'Reduz o custo da arroba produzida sem exigir mais ração', 'Só importa para quem exporta'], correta: 2, explicacao: 'Com o mesmo consumo de ração é possível gerar mais arrobas — e mais arrobas sobre o mesmo custo reduzem o custo por arroba.' },
      { p: 'O que é o ponto de equilíbrio num projeto de confinamento?', opcoes: ['O lucro por cabeça igual à média do setor', 'O preço mínimo da arroba que zera o resultado', 'O lote mínimo para o boitel aceitar o contrato', 'O dia em que o animal atinge o peso ideal'], correta: 1, explicacao: 'É o preço (ou a quantidade) em que receita e custo se igualam. Abaixo dele, cada arroba vendida amplia o prejuízo.' },
      { p: 'Se a TIR do projeto é 14% ao ano e o CDI é 10,75%, a leitura correta é:', opcoes: ['O projeto não compensa, pois não supera 20%', 'O prêmio pelo risco é de cerca de 3,25 pontos percentuais', 'A TIR não deve ser comparada ao CDI', 'O projeto é livre de risco'], correta: 1, explicacao: 'A TIR menos o CDI é o prêmio de risco. Comparar o retorno com a alternativa livre de risco é obrigatório para saber se o risco vale a pena.' }
    ]
  },

  // ---------------------------------------------------------------
  // 3. NUTRIÇÃO E FORMULAÇÃO DE DIETA
  // ---------------------------------------------------------------
  {
    id: 'nutricao',
    titulo: 'Nutrição e Formulação de Dieta',
    tema: 'Técnico',
    nivel: 'Avançado',
    icone: 'leaf',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close%20up%20of%20cattle%20nutritionist%20hands%20mixing%20corn%20grain%20and%20silage%20feed%20ration%20inside%20a%20feedlot%20barn%2C%20warm%20light%2C%20professional%20agriculture%20photography&image_size=landscape_16_9',
    resumo: 'Entenda o rúmen como fábrica, a diferença entre volumoso e concentrado, como se adapta uma dieta e como formular ração que entrega ganho de peso com o menor custo por quilo.',
    documentario: {
      titulo: 'O rúmen como fábrica',
      duracao: '33 min',
      sinopse: 'Seis capítulos sobre o motor biológico do confinamento: como o boi transforma milho e capim em carne e por que a dieta é, ao mesmo tempo, a maior alavanca de lucro e a maior fonte de risco.',
      capitulos: [
        { t: '00:00', titulo: 'Um barril de fermentação', texto: [
          'O rúmen é um dos órgãos mais fascinantes da pecuária. São cerca de cem litros de conteúdo fermentando continuamente, habitados por trilhões de microrganismos que quebram a fibra que o bovino não digere sozinho.',
          'O que se coloca no cocho não alimenta diretamente o boi: alimenta essas bactérias, protozoários e fungos. São eles que transformam celulose, amido e proteína em ácidos graxos voláteis e proteína microbiana, que o animal aproveita.',
          'Entender isso muda a forma de olhar a dieta. Não se trata de dar o melhor ingrediente, mas de manter a comunidade microbiana saudável e produtiva. Acidose é, literalmente, a falência dessa fábrica.'
        ] },
        { t: '06:00', titulo: 'Volumoso e concentrado', texto: [
          'As dietas se dividem em dois grandes grupos de ingredientes. O volumoso — silagem de milho, silagem de sorgo, cana, bagaço, capim — mantém o rúmen funcionando e estimula a ruminação, que produz saliva e tampona a acidez. O concentrado — milho, sorgo, farelo de soja, caroço de algodão — entrega energia e proteína em alta densidade.',
          'A prática de confinamento trabalha com relações de volumoso e concentrado que variam com a fase. Na adaptação, o volumoso domina. Na terminação, o concentrado pode passar de 70% da matéria seca.',
          'Há um trade-off permanente. Mais concentrado significa ganho de peso maior e mais rápido, mas maior risco de acidose. Mais volumoso significa rúmen mais seguro e conversão alimentar pior. O ajuste fino entre esses dois extremos é o que separa o confinamento eficiente do desperdício.'
        ] },
        { t: '12:30', titulo: 'Adaptação: subindo a escada', texto: [
          'A adaptação é conduzida por degraus. Cada degrau é uma dieta com mais concentrado que o anterior, tipicamente mantida por três a cinco dias. Ao fim de três ou quatro degraus, o animal está pronto para a dieta de crescimento.',
          'O que determina a velocidade da escada é a leitura do animal e do cocho. Consumo estável, fezes consistentes e boa ruminação indicam que se pode subir. Consumo caindo, fezes líquidas ou animais se deitando com frequência indicam recuo.',
          'Existe um erro clássico: a pressa. Como a terminação é mais caras, há uma tentação permanente de acelerar a adaptação para chegar logo à fase de ganho. O resultado costuma ser uma onda de acidose, consumo despencando e dias perdidos — exatamente o contrário do pretendido.'
        ] },
        { t: '19:00', titulo: 'Formulação: energia, proteína e fibra', texto: [
          'Formular é equilibrar três grandes dimensões: energia, proteína e fibra. A energia, expressa em nutrientes digestíveis totais, determina o ganho de peso. A proteína, expressa em proteína bruta, atende as necessidades de crescimento microbiano e muscular. A fibra, expressa em fibra em detergente neutro, garante que o rúmen funcione.',
          'Dietas de terminação tipicamente trabalham com energia alta, proteína moderada e fibra fisicamente efetiva suficiente para manter a ruminação. Excesso de proteína é dinheiro jogado fora — o excesso é excretado — e excesso de fibra é peso de pouca energia no cocho.',
          'A formulação profissional é feita por nutricionista, com análise bromatológica dos ingredientes disponíveis. Copiar dieta de vizinho, sem considerar a qualidade dos ingredientes da sua região, é uma das formas mais rápidas de perder dinheiro.'
        ] },
        { t: '25:10', titulo: 'Os erros que custam mais caro', texto: [
          'Os erros mais caros de nutrição em confinamento têm nome: falta de fibra fisicamente efetiva, excesso de amido de rápida fermentação, granulometria inadequada do milho e leitura errada do cocho.',
          'Quando o animal consome amido demais, a produção de ácido lático cresce, o pH do rúmen cai e a população microbiana entra em colapso. O resultado vai de queda de consumo a laminite, abscessos de fígado e morte.',
          'A leitura de cocho é o instrumento mais simples e mais ignorado. Uma escala de zero a cinco, em que três significa cocho limpo na hora do trato seguinte, permite ajustar a quantidade sem heroísmo. Deixar sobra diária é desperdício; deixar secar é perda de ganho.'
        ] },
        { t: '29:40', titulo: 'Dieta de terminação e custo do ganho', texto: [
          'A dieta de terminação busca o máximo de energia sem comprometer a saúde do rúmen. Nela, o milho processado e a gordura entram com peso, enquanto o volumoso é reduzido ao mínimo necessário para manter a ruminação.',
          'O indicador final é o custo do quilo de ganho. Ele combina o custo da dieta por quilo de matéria seca e a conversão alimentar. Duas dietas com o mesmo custo podem gerar custos de ganho muito diferentes, dependendo de quanto o animal converte.',
          'Por isso, otimizar apenas o preço da ração é miopia. Uma ração um pouco mais cara que melhora a conversão pode entregar o quilo de ganho mais barato — que é o que interessa no fim do ciclo.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Fisiologia do rúmen na prática',
        duracao: '18 min',
        objetivo: 'Entender como o rúmen funciona e por que isso condiciona toda a dieta.',
        conteudo: [
          'O rúmen é um ambiente anaeróbio, mantido entre 38 e 39 graus, com pH que deve ficar entre 6,0 e 7,0 para ser saudável. Nesse ambiente, bactérias fermentam carboidratos e proteínas e geram ácidos graxos voláteis, que são a principal fonte de energia do bovino.',
          'A saliva tem papel central: além de lubrificar, é rica em bicarbonato e funciona como tampão natural da acidez. A ruminação — os cerca de 60 mil movimentos mastigatórios por dia — estimula a produção de saliva. Dietas com pouca fibra reduzem a ruminação e, com ela, a defesa natural contra a acidose.',
          'O pH é o termômetro. Acima de 6,0, tudo funciona. Entre 5,5 e 6,0, entra-se em acidose subclínica: o animal come menos, converte pior e adoece mais, mas ninguém percebe olhando o lote. Abaixo de 5,5, a acidose é aguda e pode matar.',
          'A consequência prática é simples: qualquer decisão de dieta deve levar em conta o efeito sobre a comunidade microbiana, não apenas a composição nutricional no papel.'
        ],
        pontos: [
          'pH ideal do rúmen: 6,0 a 7,0. Abaixo de 6,0 já há perda de desempenho.',
          'Fibra estimula ruminação; ruminação estimula saliva; saliva tampona a acidez.',
          'Acidose subclínica é silenciosa: reduz consumo e conversão sem sinais visíveis óbvios.',
          'Nutrir o boi é, na prática, nutrir os microrganismos do rúmen.'
        ],
        pratica: 'Combine com o manejo do boitel uma rotina de observação de ruminação e de fezes. Anote duas vezes por semana o percentual de animais ruminando depois do trato. Queda acentuada é sinal precoce de problema.'
      },
      {
        titulo: 'Volumoso versus concentrado: o equilíbrio',
        duracao: '17 min',
        objetivo: 'Ajustar a relação volumoso/concentrado por fase e por objetivo.',
        conteudo: [
          'Volumoso é o ingrediente com muita fibra e energia relativamente baixa. Concentrado é o inverso: pouca fibra e muita energia. A relação entre eles define o desempenho e o risco sanitário da dieta.',
          'Na adaptação, a proporção favorece o volumoso, chegando a 50% ou mais da matéria seca. Ao longo do ciclo, o concentrado avança e pode ocupar de 65% a 75% da dieta na terminação. Essa progressão não é opcional: é o que permite ao rúmen se reorganizar sem colapsar.',
          'Além da quantidade, importa a forma física. Fibra "fisicamente efetiva" é aquela longa o suficiente para estimular a ruminação. Silagem muito picada ou moída fina perde essa função, mesmo com valores de fibra aparentemente adequados na análise.',
          'O ajuste é sempre guiado por resposta. Se o consumo cai e o ganho desacelera, é sinal de que o concentrado avançou demais ou rápido demais. Se o ganho é fraco com cocho limpo, pode ser falta de energia. Ajustar é um processo de leitura, não de fórmula fixa.'
        ],
        pontos: [
          'Relação volumoso/concentrado muda ao longo do ciclo: mais volumoso no início, mais concentrado no fim.',
          'Fibra fisicamente efetiva depende da granulometria, não só do teor analisado.',
          'Avance o concentrado com base na resposta do animal, não só no calendário.',
          'Queda de consumo com boa oferta costuma indicar excesso de concentrado.'
        ],
        pratica: 'Peça ao boitel a composição das dietas por fase e verifique como o concentrado avança. Desenhe a "escada" de adaptação e confirme se há pelo menos três degraus antes da dieta de crescimento.'
      },
      {
        titulo: 'Construindo a adaptação em degraus',
        duracao: '16 min',
        objetivo: 'Planejar a adaptação de dieta passo a passo, com critérios de avanço e recuo.',
        conteudo: [
          'A adaptação em degraus funciona assim: define-se entre três e quatro dietas, cada uma com mais concentrado. Cada degrau é mantido de três a cinco dias, respeitando a resposta do lote. O total da adaptação fica entre 12 e 20 dias.',
          'Existem três critérios clássicos de avanço. Primeiro, consumo: se o lote está comendo a quantidade prevista, sobe-se. Segundo, fezes: consistentes indicam rúmen estável; muito líquidas indicam problema. Terceiro, comportamento: boa ruminação e boa proporção de animais no cocho.',
          'O recuo é tão importante quanto o avanço. Se o consumo cai mais de 10% de um dia para o outro, se aparecem animais com desconforto abdominal ou fezes muito líquidas, volta-se um degrau e mantém-se mais alguns dias. Recuar custa menos que tratar um surto.',
          'Registrar é indispensável. Sem anotar dieta, consumo e ocorrências por dia, a adaptação se torna um exercício de memória — e a memória é má conselheira quando o prejuízo aparece semanas depois.'
        ],
        pontos: [
          'Três a quatro degraus, de 3 a 5 dias cada, totalizando 12 a 20 dias de adaptação.',
          'Critérios de avanço: consumo esperado, fezes consistentes e boa ruminação.',
          'Recuar um degrau é a resposta correta à queda brusca de consumo.',
          'Sem registro diário, não há como corrigir a rota durante a adaptação.'
        ],
        pratica: 'Monte uma ficha de adaptação com colunas de data, dieta, oferta, sobra, fezes e observações. Preencha por cinco dias, mesmo que com estimativas, e veja se o padrão é estável.'
      },
      {
        titulo: 'Formulação: energia, proteína e fibra',
        duracao: '19 min',
        objetivo: 'Compreender os parâmetros que o nutricionista equilibra e como auditar uma dieta.',
        conteudo: [
          'Energia é o principal limitante do ganho de peso em confinamento. É expressa em nutrientes digestíveis totais e vem, sobretudo, do amido do milho e do sorgo e da gordura. Aumentar energia aumenta ganho — até o limite em que o rúmen tolera.',
          'Proteína atende o crescimento microbiano e a deposição de músculo. Animal em crescimento precisa de mais proteína que animal em terminação. Excesso de proteína é desperdício econômico e aumenta a excreção de nitrogênio, com impacto ambiental.',
          'Fibra em detergente neutro é o parâmetro de segurança. Ela garante a ruminação. Dietas de terminação trabalham com o mínimo de fibra que ainda garanta saúde do rúmen — e o que define esse mínimo é a efetividade física, não apenas o percentual.',
          'Minerais, vitaminas e aditivos completam a formulação. Aditivos como ionóforos melhoram a eficiência energética e reduzem o risco de acidose; leveduras ajudam a estabilizar o ambiente ruminal. São investimentos pequenos com retorno alto quando bem usados.',
          'Auditar uma dieta não exige ser nutricionista. Basta pedir a composição por fase, os teores de proteína e energia e o custo por quilo de matéria seca — e comparar com a resposta observada no cocho.'
        ],
        pontos: [
          'Energia determina ganho; proteína atende crescimento; fibra protege o rúmen.',
          'Excesso de proteína é desperdício econômico e ambiental.',
          'Ionóforos e leveduras são aditivos de custo baixo e efeito relevante.',
          'Auditar a dieta exige composição por fase e custo por quilo de matéria seca.'
        ],
        pratica: 'Solicite ao boitel a composição e o custo da dieta por fase. Calcule o custo da matéria seca por quilo e multiplique pela conversão esperada para obter o custo do quilo de ganho.'
      },
      {
        titulo: 'Erros comuns: acidose, laminite e desperdício',
        duracao: '17 min',
        objetivo: 'Prevenir os problemas mais frequentes e caros das dietas de confinamento.',
        conteudo: [
          'Acidose é o problema número um. Acontece quando a produção de ácido supera a capacidade de tamponamento do rúmen. Pode ser aguda — com queda abrupta de consumo e mortes — ou subclínica, mais frequente e mais difícil de perceber.',
          'Laminite, inflamação das lâminas do casco, costuma ser consequência de episódios de acidose. O animal sente dor, anda menos, come menos e perde peso. Em casos graves, é preciso descartar o animal — perda direta de capital.',
          'Abscessos de fígado, timpanismo e morte súbita completam a lista de consequências. Todos têm raiz comum: manejo de dieta agressivo demais ou desbalanceado.',
          'Do lado do desperdício, os erros se repetem: granulometria de milho mal ajustada, mistura irregular no vagão, sobra diária de ração e falta de leitura de cocho. São falhas silenciosas, que não aparecem em nenhum relatório mas corroem a margem todos os dias.'
        ],
        pontos: [
          'Acidose aguda e subclínica têm a mesma origem: desequilíbrio entre ácido produzido e tamponamento.',
          'Laminite é consequência frequente e pode levar ao descarte do animal.',
          'Granulometria do milho e uniformidade da mistura afetam a digestão e o custo.',
          'Leitura de cocho é o instrumento mais barato e mais eficaz contra desperdício.'
        ],
        pratica: 'Implemente uma escala de cocho de 0 a 5 e treine o tratador para anotar diariamente o escore. Depois de duas semanas, compare a média de escore com o consumo e o ganho observados.'
      },
      {
        titulo: 'Dieta de terminação e custo do quilo de ganho',
        duracao: '18 min',
        objetivo: 'Otimizar a terminação pelo custo do ganho, não pelo preço da ração.',
        conteudo: [
          'A terminação é a fase em que a dieta mais se aproxima do limite do rúmen. Energia alta, fibra no mínimo seguro, aditivos ajustados. O objetivo é depositar acabamento sem disparar problemas sanitários.',
          'O indicador que orienta decisões é o custo do quilo de ganho: o custo da dieta por quilo de matéria seca multiplicado pela conversão alimentar. É esse número — não o preço da ração isolado — que diz se a dieta é economicamente boa.',
          'Duas dietas podem ter o mesmo custo por quilo e resultados muito diferentes. Se a dieta A converte 7,0 e a dieta B converte 6,2, o custo do ganho da dieta B é cerca de 11% menor. Em um lote grande, essa diferença decide o lucro.',
          'Por isso a decisão de formulação deve ser sempre econômica e técnica ao mesmo tempo: buscar a dieta que entregue o menor custo por quilo de ganho, respeitando a saúde do rúmen. A dieta mais barata raramente é a mais lucrativa.'
        ],
        pontos: [
          'Custo do quilo de ganho = custo da matéria seca × conversão alimentar.',
          'Conversão melhor compensa dieta de preço mais alto.',
          'Terminação exige equilíbrio entre máxima energia e segurança do rúmen.',
          'Decisão de dieta é econômica e técnica: busca o menor custo por quilo de ganho.'
        ],
        pratica: 'Compare duas dietas no papel: custo por quilo de matéria seca e conversão esperada. Calcule o custo do quilo de ganho de cada uma e escolha a menor. Repita o exercício a cada mudança de preço do milho.'
      }
    ],
    quiz: [
      { p: 'Qual faixa de pH indica um rúmen saudável?', opcoes: ['Entre 4,5 e 5,5', 'Entre 6,0 e 7,0', 'Entre 7,5 e 8,5', 'O pH do rúmen não importa'], correta: 1, explicacao: 'Abaixo de 6,0 já existe perda de desempenho por acidose subclínica, que é silenciosa e reduz consumo e conversão.' },
      { p: 'Para que serve a fibra "fisicamente efetiva" na dieta?', opcoes: ['Aumentar a energia da ração', 'Estimular a ruminação e, com ela, a produção de saliva que tampona a acidez', 'Substituir a proteína', 'Reduzir o custo da dieta'], correta: 1, explicacao: 'A fibra longa estimula a ruminação; a saliva é rica em bicarbonato e funciona como tampão natural contra a acidose.' },
      { p: 'Por que a adaptação da dieta é feita em degraus?', opcoes: ['Para economizar ração na primeira semana', 'Para permitir que a população microbiana do rúmen se ajuste sem colapsar', 'Por exigência do frigorífico', 'Para o animal ganhar mais peso já no início'], correta: 1, explicacao: 'Cada degrau aumenta o concentrado aos poucos. Subir rápido demais provoca acidose, queda de consumo e dias perdidos.' },
      { p: 'Como se calcula o custo do quilo de ganho?', opcoes: ['Preço da ração dividido pelo número de animais', 'Custo da matéria seca multiplicado pela conversão alimentar', 'Diária dividida pelo ganho médio diário', 'Custo total dividido pelos dias de confinamento'], correta: 1, explicacao: 'É o indicador que orienta a formulação: combina o custo da dieta e a eficiência com que o animal a converte em peso.' },
      { p: 'A dieta mais barata por quilo de matéria seca é sempre a mais lucrativa?', opcoes: ['Sim, porque reduz o custo total', 'Não, o que importa é o menor custo por quilo de ganho', 'Sim, desde que tenha bastante volumoso', 'Depende apenas do preço do milho'], correta: 1, explicacao: 'Uma dieta um pouco mais cara que melhora a conversão pode entregar o quilo de ganho mais barato, que é o que interessa.' }
    ]
  },

  // ---------------------------------------------------------------
  // 4. SANIDADE, BEM-ESTAR E MANEJO
  // ---------------------------------------------------------------
  {
    id: 'sanidade',
    titulo: 'Sanidade, Bem-estar e Manejo',
    tema: 'Técnico',
    nivel: 'Intermediário',
    icone: 'shield',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=veterinarian%20in%20blue%20overalls%20examining%20a%20healthy%20Nelore%20cow%20with%20stethoscope%20inside%20a%20clean%20cattle%20handling%20chute%2C%20bright%20daylight%2C%20professional%20agriculture%20photography&image_size=landscape_16_9',
    resumo: 'Aprenda o protocolo sanitário de entrada, as doenças que mais dão prejuízo no confinamento, noções de bem-estar animal e como a sanidade se converte diretamente em margem.',
    documentario: {
      titulo: 'Saúde é margem',
      duracao: '32 min',
      sinopse: 'Cinco capítulos sobre o cuidado que não aparece na conta mas decide o resultado: protocolo de entrada, doenças respiratórias, casco, estresse térmico e rastreabilidade.',
      capitulos: [
        { t: '00:00', titulo: 'Sanidade não é custo, é proteção do capital', texto: [
          'Todo animal que morre no confinamento é capital perdido, não apenas uma perda contábil. Morreu o boi, morreu o custo de compra, a ração já consumida, a diária já paga e a arroba que ele deixaria de produzir.',
          'Por isso, sanidade é o seguro mais barato que existe. Um protocolo de entrada custa alguns reais por cabeça; um surto respiratório pode custar centenas. A matemática é implacável e não depende de opinião.',
          'Neste documentário, percorremos o que acontece desde o desembarque até o embarque final, e onde a saúde vira dinheiro.'
        ] },
        { t: '05:30', titulo: 'O protocolo de entrada', texto: [
          'As primeiras 72 horas definem a sorte de boa parte dos animais. O protocolo de entrada começa ainda no embarque, com transporte sem superlotação, jejum adequado e desembarque cuidadoso em curral de espera com água disponível.',
          'No dia seguinte, faz-se a triagem: pesagem individual, identificação, escore de condição corporal, avaliação de cascos e exame de mucosas. Animais com sinais de doença entram em curral de enfermaria e não vão para o lote principal.',
          'Na sequência, aplicam-se as vacinas previstas — tipicamente contra clostridioses e doenças respiratórias — junto da vermifugação e, quando indicado, da suplementação de minerais. O calendário deve respeitar o que o animal já recebeu na origem para não repetir nem omitir doses.',
          'Uma boa triagem é também uma decisão econômica: detectar um animal doente em 24 horas custa muito menos do que tratar um surto dez dias depois.'
        ] },
        { t: '12:40', titulo: 'Doenças respiratórias: o fantasma do confinamento', texto: [
          'A doença respiratória dos bovinos é a principal causa de perda sanitária em confinamento no mundo. Ela nasce da combinação de estresse — transporte, mistura de lotes, poeira, variação de temperatura — com vírus e bactérias que se aproveitam da queda de imunidade.',
          'O sinal clássico é o animal cabisbaixo, com orelhas caídas, corrimento nasal, respiração acelerada e tosse. Muitos param de comer antes de qualquer outro sinal, o que faz do monitoramento de consumo uma ferramenta de detecção precoce.',
          'A mortalidade é apenas a ponta do iceberg. Muito mais frequente é o animal que se recupera, mas nunca mais engorda como antes. O chamado "animal crônico" carrega um prejuízo que se acumula silenciosamente até o abate.',
          'Prevenção passa por vacinação bem conduzida, boas condições de instalação, densidade adequada e diagnóstico rápido. Tratar cedo é mais barato do que tratar tarde, e muito mais barato que perder o animal.'
        ] },
        { t: '20:00', titulo: 'Casco, dor e desempenho', texto: [
          'Laminite e lesões de casco são subestimadas porque não matam, mas roubam. Animal com dor no casco come menos, fica mais tempo deitado, perde ganho de peso e conversão. O custo é invisível no relatório diário e enorme no resultado final.',
          'Fatores que agravam são acidose, piso ruim, excesso de tempo em pé em superfícies duras e manejo agressivo. Corrigir começa por manter o rúmen saudável e o piso bem drenado, com sombra e espaço de descanso.',
          'A inspeção de cascos na entrada e a observação de locomoção no dia a dia permitem identificar cedo. Animal que anda com dificuldade, que reluta em se levantar ou que se isola merece avaliação imediata.'
        ] },
        { t: '26:20', titulo: 'Bem-estar, calor e rastreabilidade', texto: [
          'Bem-estar animal no confinamento não é questão apenas ética: é desempenho. Animais menos estressados comem mais, convertem melhor e adoecem menos. Sombra, água fresca, manejo calmo e densidade adequada são medidas de produtividade.',
          'O estresse térmico é um dos maiores ladrões de desempenho no Brasil tropical. Acima de cerca de 26 graus de índice de temperatura e umidade, o bovino reduz consumo e ganho. Sombra, aspersão e ventilação podem reduzir esse impacto de forma significativa.',
          'Por fim, a rastreabilidade deixou de ser diferencial e passou a ser requisito. Origem documentada, Guia de Trânsito Animal emitida corretamente, calendário sanitário registrado — tudo isso é exigência de mercado, especialmente para exportação, e abre portas de premiação.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Protocolo sanitário de entrada',
        duracao: '18 min',
        objetivo: 'Estruturar a recepção dos animais para reduzir perdas nas primeiras semanas.',
        conteudo: [
          'O protocolo de entrada começa no embarque. Animais transportados com densidade excessiva, por longas distâncias, chegam desidratados e com maior chance de adoecer. A logística de compra é parte da sanidade, e não um assunto separado dela.',
          'Ao desembarcar, o lote deve ir para um curral de espera com água limpa e sombra, e receber apenas volumoso por algumas horas. A tentação de oferecer concentrado imediatamente é um erro clássico: o rúmen do animal ainda está adaptado a pasto.',
          'A triagem acontece nas primeiras 24 a 48 horas. Além da pesagem individual, avalia-se escore corporal e de fezes, presença de corrimento, estado de cascos e comportamento. Animais que não se adaptam ao cocho ou que apresentam sinais de doença vão para enfermaria.',
          'O bloco de medicamentos e vacinas é definido pelo médico veterinário, mas o produtor deve entender o que está sendo aplicado e cobrar o registro. Sem registro de lote, produto, data e animal, não há como avaliar resultados nem atender exigências de rastreabilidade.'
        ],
        pontos: [
          'Transporte e desembarque são parte da sanidade: densidade e distância afetam imunidade.',
          'Nas primeiras horas, oferecer volumoso e água; concentrado apenas depois.',
          'Triagem em 24 a 48 h: pesagem, escore, cascos, mucosas e comportamento.',
          'Registro de medicamentos e vacinas é exigência de rastreabilidade, não burocracia.'
        ],
        pratica: 'Escreva o protocolo de entrada em uma única página, com o que acontece em cada uma das primeiras 72 horas e quem é o responsável por cada etapa. Cole no escritório do boitel.'
      },
      {
        titulo: 'Doenças respiratórias (DRB)',
        duracao: '18 min',
        objetivo: 'Reconhecer precocemente a DRB e entender o impacto econômico dela.',
        conteudo: [
          'A doença respiratória bovina é a maior causa de morbidade e mortalidade em confinamentos. É uma síndrome, não uma doença única: resulta da interação entre agentes virais e bacterianos com fatores de estresse que derrubam a imunidade.',
          'Os fatores desencadeantes mais comuns são transporte, mistura de animais de origens diferentes, poeira, ventilação ruim e variações bruscas de temperatura. Todos esses fatores podem ser manejados — e é aí que está o ganho.',
          'A detecção precoce salva animais. Orelhas caídas, cabeça baixa, olhar apático, corrimento nasal, tosse e respiração com esforço são sinais de alerta. Mais precoce ainda é a queda de consumo, que frequentemente antecede os sinais visíveis.',
          'O impacto econômico vai muito além das mortes. Animais que sobrevivem mas ficam crônicos apresentam ganho de peso reduzido e custo de tratamento adicional, patinando o resultado do lote inteiro.'
        ],
        pontos: [
          'DRB é síndrome multifatorial: agentes infecciosos × estresse e ambiente.',
          'Transporte, lotes misturados, poeira e ventilação ruim são fatores de risco controláveis.',
          'Queda de consumo precede sinais clínicos e é a melhor ferramenta de detecção precoce.',
          'Animais crônicos geram prejuízo acumulado mesmo sem morrer.'
        ],
        pratica: 'Combine com o boitel uma rotina de ronda sanitária diária, com registro de animais em tratamento e critério claro de retorno ao lote. Peça o número de casos por lote ao final do ciclo.'
      },
      {
        titulo: 'Acidose, timpanismo e emergências metabólicas',
        duracao: '17 min',
        objetivo: 'Prevenir e identificar as emergências ligadas à dieta.',
        conteudo: [
          'Acidose é o desequilíbrio entre a produção de ácido no rúmen e a capacidade de neutralizá-lo. Na forma aguda, o animal apresenta desconforto, salivação, redução abrupta de consumo e pode evoluir para morte. Na forma subclínica, o prejuízo aparece como desempenho abaixo do esperado.',
          'Timpanismo, ou empachamento, é o acúmulo de gás no rúmen sem eliminação. Ocorre em dietas com muita leguminosa ou grãos finamente moídos. O animal apresenta aumento de volume abdominal, desconforto e dificuldade respiratória. É emergência: exige intervenção rápida.',
          'Morte súbita em confinamento costuma estar associada a acidose aguda, timpanismo ou clostridioses, especialmente em animais não vacinados adequadamente. Vacinar bem é uma das medidas de custo mais baixo e efeito mais alto.',
          'A prevenção é de manejo: adaptação em degraus, fibra fisicamente efetiva suficiente, granulometria adequada, mistura homogênea e leitura diária do cocho. Não existe dieta agressiva que seja segura sem manejo disciplinado.'
        ],
        pontos: [
          'Acidose aguda e subclínica: a subclínica é mais frequente e mais difícil de ver.',
          'Timpanismo é emergência e exige ação imediata.',
          'Morte súbita costuma ter relação com acidose, timpanismo ou clostridioses.',
          'Prevenção é manejo: escada de adaptação, fibra efetiva e mistura homogênea.'
        ],
        pratica: 'Verifique com o boitel quais aditivos e tamponantes são usados e em que dose. Pergunte também quantos casos de morte súbita ocorreram no último ciclo e a causa apurada.'
      },
      {
        titulo: 'Cascos, locomoção e conforto',
        duracao: '15 min',
        objetivo: 'Relacionar saúde de casco e conforto ao desempenho do lote.',
        conteudo: [
          'Problemas de casco são uma causa importante de perda de desempenho, ainda que raramente apareçam nas estatísticas de mortalidade. Animal com dor anda menos, come menos, fica mais tempo deitado e ganha menos peso.',
          'Laminite tem origem na acidose. Portanto, cuidar do casco começa no rúmen. A outra metade vem do ambiente: piso muito úmido, lama ou superfície dura demais aumentam a incidência de lesões.',
          'A avaliação de locomoção é uma rotina simples: observar o lote em movimento por alguns minutos por semana e classificar animais com dificuldade visível. Intervenção precoce evita agravamento e reduz descarte.',
          'O conforto geral do animal — sombra, espaço, água fresca, manejo calmo — reduz estresse, melhora consumo e protege cascos. Conforto é produtividade disfarçada de cuidado.'
        ],
        pontos: [
          'Laminite começa no rúmen: acidose é fator causal.',
          'Piso úmido, lama e superfícies duras agravam lesões de casco.',
          'Observação semanal de locomoção permite detecção precoce.',
          'Conforto animal reduz estresse e melhora consumo, ganho e saúde de casco.'
        ],
        pratica: 'Inclua na ronda semanal uma avaliação de locomoção do lote. Registre o número de animais com dificuldade e acompanhe a evolução ao longo do ciclo.'
      },
      {
        titulo: 'Bem-estar, estresse térmico e densidade',
        duracao: '16 min',
        objetivo: 'Reduzir perdas por calor e estresse, melhorando consumo e conversão.',
        conteudo: [
          'O bovino é animal de clima temperado adaptado ao Brasil, mas ainda sofre com calor. Acima de determinado índice de temperatura e umidade, ele reduz consumo, aumenta frequência respiratória e perde desempenho. O calor custa quilos de carne todos os dias de verão.',
          'As medidas de mitigação são conhecidas: sombra natural ou artificial, aspersão de água, ventilação e acesso facilitado a bebedouros. Em confinamentos abertos, um sombreamento bem posicionado pode reduzir significativamente a carga de calor.',
          'Densidade também é bem-estar. Animais apinhados competem por cocho e água, brigam mais e adoecem mais. Respeitar o espaço por animal é medida de produtividade, não de generosidade.',
          'Por fim, manejo calmo importa. Gritos, choques e movimentação abrupta elevam o cortisol, reduzem o consumo e aumentam a incidência de lesões. Treinar a equipe para conduzir o gado com calma é investimento de retorno imediato.'
        ],
        pontos: [
          'Estresse térmico reduz consumo e ganho; sombra e aspersão mitigam.',
          'Densidade adequada reduz competição por cocho e água.',
          'Manejo calmo reduz cortisol, lesões e mortalidade.',
          'Bem-estar animal é produtividade, não apenas questão ética.'
        ],
        pratica: 'Meça a temperatura e a umidade do curral nos horários mais quentes por três dias e observe a proporção de animais respirando com esforço. Se houver sinais, proponha sombra ou aspersão ao boitel.'
      },
      {
        titulo: 'Rastreabilidade e GTA',
        duracao: '15 min',
        objetivo: 'Cumprir as exigências de documentação e abrir portas de premiação.',
        conteudo: [
          'A rastreabilidade é o conjunto de registros que comprova a origem do animal, o histórico sanitário e o cumprimento das normas. Começa na propriedade de nascimento e acompanha o animal até o abate.',
          'A Guia de Trânsito Animal é o documento que autoriza o deslocamento do gado. Em São Paulo, a emissão é feita digitalmente pelo sistema da defesa agropecuária, o que dispensou a ida presencial ao órgão. Emitir corretamente evita multas, retenções e atrasos.',
          'Além da GTA, o produtor deve manter o registro de vacinas, tratamentos e movimentação. Esse conjunto é o que permite ao frigorífico comprovar a origem da carne para o mercado externo — especialmente para países com exigências sanitárias rigorosas.',
          'Rastrear bem não é apenas cumprir regra. É abrir acesso a programas de bonificação, como o Boi China, e a linhas de crédito com juros menores. Documentação organizada vira dinheiro na hora da venda.'
        ],
        pontos: [
          'Rastreabilidade cobre origem, sanidade e movimentação do animal.',
          'GTA digital agiliza o trânsito e evita multas e retenções.',
          'Registro sanitário completo é o que sustenta a comprovação de origem.',
          'Rastrear bem dá acesso a bonificações e a crédito mais barato.'
        ],
        pratica: 'Confirme quem emite a GTA no seu fluxo e se todos os registros sanitários ficam arquivados por, no mínimo, o prazo legal. Pergunte ao frigorífico quais documentos ele exige para pagar bonificação.'
      }
    ],
    quiz: [
      { p: 'Nas primeiras horas após o desembarque, o correto é oferecer:', opcoes: ['Concentrado à vontade para recuperar peso rápido', 'Água limpa e volumoso, deixando o concentrado para depois', 'Apenas sal mineral', 'Nada, para o animal descansar'], correta: 1, explicacao: 'O rúmen ainda está adaptado a pasto. Concentrado na chegada é uma das causas clássicas de acidose e queda de consumo.' },
      { p: 'Qual é a ferramenta mais precoce para detectar um animal doente?', opcoes: ['Medir a temperatura de todo o lote', 'Observar a queda de consumo', 'Esperar aparecer tosse', 'Pesar o lote uma vez por semana'], correta: 1, explicacao: 'A queda de consumo antecede os sinais clínicos — muitas vezes em cerca de 24 horas. Tratar cedo é muito mais barato.' },
      { p: 'Laminite (inflamação das lâminas do casco) tem origem principalmente ligada a:', opcoes: ['Excesso de fibra na dieta', 'Acidose ruminal', 'Falta de sombra', 'Baixa densidade de animais'], correta: 1, explicacao: 'Acidose é fator causal. A outra metade vem do ambiente: piso úmido, lama ou superfícies muito duras.' },
      { p: 'Por que a mortalidade deve ser tratada como perda de capital e não apenas contábil?', opcoes: ['Porque o frigorífico devolve o valor do animal', 'Porque se perde a compra, a ração já consumida, a diária paga e a receita futura', 'Porque o seguro cobre integralmente', 'Porque o imposto compensa a perda'], correta: 1, explicacao: 'Morreu o boi, morreu todo o investimento feito nele e a arroba que ele produziria. É a razão de a sanidade ser o seguro mais barato.' },
      { p: 'Sobre a Guia de Trânsito Animal (GTA):', opcoes: ['Em São Paulo exige comparecer presencialmente ao órgão', 'A emissão digital agiliza o trânsito e evita multas e retenções', 'Só é necessária para exportação', 'Pode ser preenchida com dados aproximados'], correta: 1, explicacao: 'A GTA digital dispensa a ida ao órgão, mas os dados devem ser precisos: erro de documento gera retenção e prejuízo no trajeto.' }
    ]
  },

  // ---------------------------------------------------------------
  // 5. GESTÃO DE RISCOS E HEDGE
  // ---------------------------------------------------------------
  {
    id: 'riscos',
    titulo: 'Gestão de Riscos e Hedge',
    tema: 'Gestão',
    nivel: 'Intermediário',
    icone: 'shield',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dramatic%20dark%20storm%20clouds%20over%20a%20Brazilian%20cattle%20pasture%20with%20cattle%20grazing%2C%20moody%20light%2C%20professional%20agriculture%20photography&image_size=landscape_16_9',
    resumo: 'Identifique os riscos que podem destruir sua margem e aprenda os instrumentos para se proteger: hedge na B3, contratos a termo, trava de preço e análise de cenários.',
    documentario: {
      titulo: 'Nada de surpresa',
      duracao: '30 min',
      sinopse: 'Cinco capítulos sobre os riscos do confinamento e sobre como o produtor profissional troca incerteza por previsibilidade — pagando um preço conhecido para não apostar o negócio.',
      capitulos: [
        { t: '00:00', titulo: 'Os riscos que ninguém vê até acontecerem', texto: [
          'Todo negócio tem riscos, mas no confinamento eles são especialmente concentrados no tempo. Em pouco mais de cem dias, o produtor fica exposto a variações de preço de compra, de ração e de venda, além de riscos sanitários e climáticos.',
          'A peculiaridade do confinamento é que ele compra e vende no mesmo mercado, mas com uma defasagem temporal. Isso cria o chamado risco de margem: não basta que o preço da arroba suba, é preciso que ele suba mais do que o custo do boi magro e da ração.',
          'Neste documentário, percorremos os riscos do negócio e os instrumentos disponíveis para conviver com eles de forma consciente.'
        ] },
        { t: '05:50', titulo: 'Risco de preço e risco de base', texto: [
          'Risco de preço é a variação do valor de mercado do boi gordo entre a decisão de compra e a venda. É o risco mais visível e o mais discutido. Risco de base é mais sutil: é a diferença entre o preço na sua praça e o preço de referência usado nos contratos futuros.',
          'A base importa porque a proteção via mercado futuro atua sobre a referência, e não sobre o preço da sua região. Se a sua praça se afastar da referência, o hedge protege o preço futuro mas não elimina a diferença local.',
          'Entender isso evita uma ilusão comum: a de que fazer hedge no mercado futuro é garantia absoluta. É redução de risco — relevante, mas não milagrosa.',
          'Uma alternativa que elimina o risco de base é o contrato a termo direto com o frigorífico, no qual o preço é fixado na nota fiscal. Cada instrumento tem seu lugar.'
        ] },
        { t: '12:30', titulo: 'Hedge na B3: como funciona', texto: [
          'O hedge funciona invertendo a exposição. Quem vai vender boi no futuro teme a queda do preço; portanto, assume uma posição de venda no mercado futuro. Se o preço cair no mercado físico, a posição futura compensa parte da perda. Se subir, a posição futura gera prejuízo, mas o animal vale mais.',
          'Na prática, o produtor trava um preço esperado e abre mão da alta em troca de proteção contra a queda. É uma escolha de gestão, não uma aposta: o objetivo é garantir a margem planejada.',
          'Há custos e exigências. As operações envolvem corretagem, emolumentos e, sobretudo, ajustes diários de margem. Isso significa que pode ser necessário aportar recursos ao longo da operação se o mercado se mover contra a posição. Sem caixa para isso, a estratégia vira um problema novo.',
          'Outro ponto é o tamanho do contrato. Cada contrato futuro representa um lote padrão, e o produtor precisa calcular quantos contratos correspondem ao seu rebanho, com base na arroba equivalente.'
        ] },
        { t: '20:10', titulo: 'Contratos a termo e trava de preço', texto: [
          'O contrato a termo é um acordo direto entre produtor e comprador, com preço, quantidade e prazo definidos. É o instrumento mais antigo e mais usado no agro brasileiro, justamente porque é simples e não exige conta em corretora.',
          'A grande vantagem é eliminar o risco de base: o preço é o que está escrito. A desvantagem é a rigidez: se o mercado subir muito, o produtor fica amarrado ao preço combinado. Além disso, exige atenção às garantias e às cláusulas de execução.',
          'Trava de preço costuma designar arranjos em que se fixa uma faixa, ou se combina o preço físico com operações no mercado futuro para eliminar a incerteza. Muitas vezes, a trava é feita pelo próprio frigorífico ou pela plataforma digital de negociação.',
          'O importante é que o produtor entenda o que está assinando: quem assume o risco, em que condições o contrato pode ser renegociado e o que acontece em caso de descumprimento.'
        ] },
        { t: '26:00', titulo: 'Do risco à decisão: cenários', texto: [
          'A ferramenta mais poderosa de gestão de risco não é financeira: é a análise de cenários. Antes de fechar uma operação, projete pelo menos três cenários: pessimista, base e otimista.',
          'No cenário pessimista, combine queda de preço de venda, alta no custo da ração e mortalidade acima do esperado. Se a operação ainda sobrevive — ou pelo menos não compromete o caixa — ela é robusta. Se não sobrevive, o tamanho do lote ou o preço de compra precisam ser revistos.',
          'Cenário base é o que você considera mais provável. Cenário otimista serve para entender o potencial, não para decidir. Decidir pelo otimista é o erro mais comum e mais caro.',
          'Gerenciar risco, no fim, é isto: saber qual é o pior caso aceitável e estruturar a operação para não ultrapassá-lo.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Mapa de riscos do confinamento',
        duracao: '18 min',
        objetivo: 'Identificar e classificar os riscos do negócio por probabilidade e impacto.',
        conteudo: [
          'Os riscos do confinamento se organizam em cinco famílias: mercado, produção, sanitário, climático e financeiro. Classificá-los ajuda a decidir onde vale gastar energia e onde basta monitorar.',
          'Risco de mercado é a variação de preço do boi magro, da ração e do boi gordo. Risco de produção inclui desempenho abaixo do esperado, mortalidade e refugo. Risco sanitário envolve surtos de doença. Risco climático afeta conforto e disponibilidade de insumos. Risco financeiro é o descasamento entre quando o dinheiro sai e quando entra.',
          'Uma matriz simples, com probabilidade em um eixo e impacto em outro, revela prioridades. Riscos de alto impacto e alta probabilidade exigem mitigação ativa. Riscos de baixo impacto podem ser apenas monitorados.',
          'O erro mais comum é tratar todos os riscos como iguais. Isso dispersa recursos e deixa os riscos críticos sem tratamento adequado.'
        ],
        pontos: [
          'Cinco famílias de risco: mercado, produção, sanitário, climático e financeiro.',
          'Matriz de probabilidade × impacto prioriza onde agir.',
          'Riscos de alto impacto e alta probabilidade exigem mitigação ativa.',
          'Descasamento de caixa (risco financeiro) é frequentemente o mais subestimado.'
        ],
        pratica: 'Monte a matriz de riscos do seu projeto com pelo menos oito riscos. Ao lado de cada um, escreva uma ação concreta de mitigação e quem é o responsável por ela.'
      },
      {
        titulo: 'Risco de preço e risco de base',
        duracao: '17 min',
        objetivo: 'Diferenciar os dois riscos de preço e entender o que cada instrumento cobre.',
        conteudo: [
          'Risco de preço é a oscilação do valor do boi gordo no mercado. Risco de base é a diferença entre o preço da sua praça e o preço de referência utilizado nos contratos futuros. São riscos distintos e exigem tratamento distinto.',
          'O hedge em mercado futuro trata o risco de preço da referência, mas não o risco de base. Se a sua região tem prêmio ou desconto estrutural em relação à referência, essa diferença permanece. Para eliminar completamente a incerteza, o caminho é o contrato a termo com preço fixado.',
          'Medir a base é simples e revelador. Basta comparar o preço praticado na sua praça com a referência do indicador de mercado por algumas semanas. Uma base estável permite prever o que acontecerá com o preço local quando a referência se mover.',
          'Quem conhece a própria base negocia melhor. Sabe quando reivindicar prêmio e quando aceitar desconto, e sabe quanto de proteção realmente precisa comprar.'
        ],
        pontos: [
          'Risco de preço é a oscilação do mercado; risco de base é a diferença entre a sua praça e a referência.',
          'Hedge trata o risco de preço, não elimina o risco de base.',
          'Contrato a termo com preço fixado elimina os dois riscos de preço.',
          'Medir a base local permite prever o comportamento do preço da sua região.'
        ],
        pratica: 'Durante quatro semanas, anote o preço praticado na sua praça e a referência do indicador. Calcule a base média. Use-a para projetar o preço local a partir da referência futura.'
      },
      {
        titulo: 'Hedge na B3: mecânica e custos',
        duracao: '20 min',
        objetivo: 'Compreender como funciona a proteção via mercado futuro e seus custos operacionais.',
        conteudo: [
          'O hedge no mercado futuro inverte a exposição ao preço. Como o produtor de confinamento tem estoque de boi e vai vender no futuro, ele teme a queda; logo, assume posição de venda no mercado futuro correspondente ao rebanho.',
          'Cada contrato cobre um lote padronizado de arrobas. O produtor calcula a arroba equivalente do seu rebanho e verifica quantos contratos cobrem essa exposição. Cobertura parcial também é válida e, muitas vezes, mais prudente do que cobrir tudo.',
          'Os custos incluem corretagem, emolumentos de bolsa e, principalmente, ajustes diários de margem. Estes últimos exigem que haja caixa disponível: se o mercado se move contra a posição, o operador precisa aportar recursos. Sem reserva, o hedge pode inviabilizar o fluxo de caixa.',
          'A decisão de fazer hedge não é de mercado, é de gestão. Quem protege aceita ganhar menos em cenário de alta em troca de não perder em cenário de queda. A pergunta certa não é "vou ganhar mais?", mas "consigo dormir com essa exposição?"'
        ],
        pontos: [
          'Hedge inverte a exposição: quem vende no futuro assume posição de venda.',
          'Cobertura parcial é válida e costuma ser mais prudente.',
          'Ajustes diários de margem exigem caixa de reserva — isso é parte do custo.',
          'Hedge é decisão de gestão: troca potencial de alta por proteção na queda.'
        ],
        pratica: 'Estime a arroba equivalente do seu rebanho e verifique quantos contratos cobririam 50% e 100% da exposição. Calcule quanto de caixa de reserva seria necessário para suportar uma variação adversa de 10%.'
      },
      {
        titulo: 'Contratos a termo e trava de preço',
        duracao: '18 min',
        objetivo: 'Avaliar quando e como usar contratos a termo na comercialização.',
        conteudo: [
          'O contrato a termo é um acordo de compra e venda com preço, quantidade, prazo e condições de entrega definidos com antecedência. É o instrumento de proteção mais acessível e mais usado no Brasil, porque não exige operar em bolsa.',
          'A vantagem principal é a certeza: fixado o preço, o resultado da operação fica previsível. Isso permite ao produtor negociar com o frigorífico um valor compatível com a sua margem planejada e reduzir drasticamente a ansiedade do ciclo.',
          'A contrapartida é abrir mão da alta. Se o mercado subir muito depois da assinatura, o produtor recebe o preço fixado e deixa dinheiro na mesa. Muitos produtores se arrependem disso — mas é exatamente o preço da previsibilidade.',
          'Atenção às cláusulas: garantias, penalidades por descumprimento, critérios de classificação de carcaça e condições de pagamento. Um contrato malfeito pode transformar uma proteção em disputa judicial.'
        ],
        pontos: [
          'Contrato a termo: preço, quantidade, prazo e entrega definidos previamente.',
          'Vantagem: previsibilidade total do resultado da operação.',
          'Desvantagem: abrir mão da alta do mercado.',
          'Cláusulas de garantia, penalidade e classificação merecem leitura cuidadosa.'
        ],
        pratica: 'Simule uma trava de preço hoje e, ao longo do ciclo, compare com o preço de mercado realizado. Isso mostra, com números, quanto a sua tranquilidade custou — ou valeu.'
      },
      {
        titulo: 'Custo de oportunidade e CDI',
        duracao: '16 min',
        objetivo: 'Comparar o confinamento com a alternativa da renda fixa de forma honesta.',
        conteudo: [
          'Todo capital tem um preço. Se o dinheiro que você coloca no confinamento poderia render na renda fixa sem risco relevante, esse rendimento é o custo de oportunidade. Ignorá-lo faz um projeto ruim parecer bom.',
          'O CDI é a referência de rentabilidade livre de risco no Brasil. Comparar o retorno do confinamento com o CDI é o mínimo que um investidor deveria fazer: o confinamento só compensa se entregar prêmio suficiente para justificar o risco adicional.',
          'Esse raciocínio muda o cálculo. Um projeto com lucro positivo pode, ainda assim, destruir valor se render menos que o CDI no mesmo período. Lucro contábil e criação de valor são coisas diferentes.',
          'Na prática, o produtor deveria definir de antemão um prêmio mínimo exigido — por exemplo, o CDI mais cinco pontos percentuais — e recusar operações que não alcancem esse patamar. Disciplina é o que separa investidor de apostador.'
        ],
        pontos: [
          'Custo de oportunidade é o retorno que o capital teria sem o risco do projeto.',
          'CDI é a referência livre de risco no Brasil e a régua mínima de comparação.',
          'Lucro positivo não garante criação de valor: é preciso superar o CDI.',
          'Definir um prêmio mínimo exigido evita aceitar projetos medíocres.'
        ],
        pratica: 'Defina o seu prêmio mínimo exigido sobre o CDI para projetos de confinamento. Use esse número como filtro em todas as análises do simulador.'
      },
      {
        titulo: 'Análise de cenários: pessimista, base e otimista',
        duracao: '18 min',
        objetivo: 'Estruturar cenários e usar o pior caso como critério de decisão.',
        conteudo: [
          'Análise de cenários é a prática de projetar o resultado sob diferentes combinações de variáveis. O objetivo não é acertar o futuro, mas entender a amplitude dos resultados possíveis e preparar resposta para cada um.',
          'No confinamento, as variáveis que mais mexem no resultado são o preço de venda da arroba, o preço de compra do boi magro, o custo da ração e a mortalidade. Combinar esses fatores em três cenários já oferece uma visão robusta.',
          'A regra é montar o cenário pessimista primeiro. Ele representa o pior caso plausível, não o catástrofe improvável. Se a operação não compromete o caixa nesse cenário, ela é aceitável. Se compromete, o ajuste é de estrutura: lote menor, preço de compra melhor ou proteção via contrato.',
          'O cenário otimista serve para inspiração, não para decisão. Projetar caixa com base no melhor caso é a receita clássica de endividamento. Decida pelo pessimista, trabalhe pelo base e comemore o otimista se ele vier.'
        ],
        pontos: [
          'Variáveis-chave: preço de venda, preço de compra, custo da ração e mortalidade.',
          'Monte o pessimista primeiro: é o critério de decisão.',
          'Se o pessimista compromete o caixa, ajuste a estrutura da operação.',
          'Otimista serve para referência, nunca para decisão.'
        ],
        pratica: 'No simulador, projete três cenários variando preço de venda e mortalidade. Escreva uma frase para cada: o que você faz se ele se concretizar.'
      }
    ],
    quiz: [
      { p: 'O que é o "risco de base" no confinamento?', opcoes: ['O risco de o animal não ganhar peso', 'A diferença entre o preço da sua praça e o preço de referência do mercado futuro', 'O risco de o boitel romper o contrato', 'A variação do custo da ração'], correta: 1, explicacao: 'O hedge atua sobre a referência do mercado futuro. Se a sua região tem prêmio ou desconto estrutural, essa diferença permanece.' },
      { p: 'Fazer hedge na B3 elimina todo o risco de preço?', opcoes: ['Sim, é garantia absoluta', 'Não: trata o risco de preço de referência, mas não elimina o risco de base', 'Sim, desde que cubra 100% do rebanho', 'Não, porque a B3 não negocia boi'], correta: 1, explicacao: 'O contrato a termo com preço fixado é o instrumento que elimina a incerteza completa, porque o preço vai na nota fiscal.' },
      { p: 'Qual exigência prática o hedge na B3 impõe ao produtor?', opcoes: ['Nada além de pagar a corretagem', 'Ter caixa de reserva para os ajustes diários de margem', 'Vender o gado no mesmo dia', 'Registrar o rebanho na bolsa'], correta: 1, explicacao: 'Se o mercado se mover contra a posição, é preciso aportar recursos. Sem reserva, a proteção vira um problema de fluxo de caixa.' },
      { p: 'Qual cenário deve orientar a decisão de investir?', opcoes: ['O otimista, para medir o potencial', 'O base, porque é o mais provável', 'O pessimista, porque é o critério de decisão', 'A média dos três'], correta: 2, explicacao: 'Monte o pessimista primeiro. Se a operação não compromete o caixa nele, é aceitável. Decidir pelo otimista é o erro mais caro.' },
      { p: 'Se o projeto dá lucro positivo, mas o ROIC fica abaixo do CDI no mesmo período:', opcoes: ['Está ótimo, lucro é lucro', 'O projeto destrói valor frente à alternativa livre de risco', 'O CDI não deve ser considerado', 'Basta aumentar o lote para resolver'], correta: 1, explicacao: 'Lucro contábil e criação de valor são coisas diferentes. O confinamento precisa superar o CDI para justificar o risco adicional.' }
    ]
  },

  // ---------------------------------------------------------------
  // 6. BOITEL E CONTRATOS DE PARCERIA
  // ---------------------------------------------------------------
  {
    id: 'boitel',
    titulo: 'Boitel e Contratos de Parceria',
    tema: 'Gestão',
    nivel: 'Intermediário',
    icone: 'clipboard',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=handshake%20between%20a%20farmer%20and%20a%20consultant%20in%20front%20of%20a%20modern%20cattle%20feedlot%20structure%2C%20warm%20sunset%20light%2C%20professional%20business%20agriculture%20photography&image_size=landscape_16_9',
    resumo: 'Domine o modelo de boitel: modalidades de cobrança, cláusulas essenciais do contrato, responsabilidades sobre mortalidade e refugo e como escolher um parceiro de confiança.',
    documentario: {
      titulo: 'O negócio do boitel',
      duracao: '29 min',
      sinopse: 'Quatro capítulos sobre o arranjo que permite a quem não tem curral investir no confinamento e a quem tem estrutura rentabilizar o curral: o modelo de boitel e o contrato que o sustenta.',
      capitulos: [
        { t: '00:00', titulo: 'Dois lados, um negócio', texto: [
          'O boitel existe porque há duas necessidades complementares. De um lado, investidores com capital e sem estrutura. De outro, donos de confinamento com estrutura e sem gado. O boitel é o contrato que une os dois.',
          'Essa união funciona muito bem quando as expectativas estão alinhadas e muito mal quando não estão. Quase todo conflito em boitel nasce de cláusula ambígua: quem paga a mortalidade? quem responde pelo refugo? quem decide a dieta?',
          'Neste documentário, percorremos as modalidades de cobrança, as cláusulas que realmente importam e os critérios para escolher um parceiro.'
        ] },
        { t: '06:40', titulo: 'Modalidades de cobrança', texto: [
          'Existem duas modalidades clássicas de cobrança no boitel. Na primeira, o boitel cobra uma diária por cabeça por dia de permanência. Na segunda, o acerto acontece no gancho, ou seja, no momento do abate, e normalmente corresponde a um valor por cabeça ou por arroba produzida.',
          'A diária transfere ao investidor o risco do tempo: quanto mais dias o animal fica, mais caro fica. Isso incentiva eficiência, mas também pode pressionar o boitel a segurar o animal além do ponto ideal se a remuneração dele depender dos dias.',
          'O acerto no gancho alinha os interesses de outra forma: o boitel ganha quando o animal é abatido, e tem estímulo a fazer o boi ganhar peso. Em contrapartida, o investidor precisa ter clareza sobre como o valor é calculado e sobre o que acontece em caso de morte ou descarte.',
          'A escolha entre modalidades depende do perfil de risco de cada parte. O importante é que a conta caiba nos dois lados — contratos em que só um lado ganha tendem a não durar.'
        ] },
        { t: '14:20', titulo: 'As cláusulas que realmente importam', texto: [
          'Um bom contrato de boitel responde sem ambiguidade a algumas perguntas. Quem fornece o quê? Quem paga o quê? Quem decide o quê? E o que acontece quando as coisas dão errado?',
          'Comece pelas obrigações. O boitel fornece instalação, alimentação, água, mão de obra e manejo; o investidor fornece os animais e o capital de custeio. Deixe explícito o que está incluído e o que é cobrado à parte — medicamentos, frete interno, taxas.',
          'Depois, as responsabilidades sobre perdas. É essencial definir o tratamento dado à mortalidade: até que percentual o investidor absorve e a partir de qual o boitel responde. O mesmo vale para refugo e para animais condenados no abate.',
          'Por fim, a prestação de contas. Um contrato profissional prevê relatórios periódicos com peso, consumo, custos e ocorrências — além de acesso do investidor ao curral para inspeção. Transparência é cláusula, não favor.'
        ] },
        { t: '22:10', titulo: 'Escolhendo o parceiro', texto: [
          'Escolher boitel é escolher um sócio operacional. Antes de assinar, visite a estrutura em dia de trabalho normal, não apenas em visita agendada. Observe limpeza, disponibilidade de água, qualidade do cocho e como a equipe trata os animais.',
          'Converse com outros clientes. Pergunte sobre pontualidade nos relatórios, transparência nos custos, resposta a problemas sanitários e comportamento em situações de conflito. A reputação é o melhor indicador disponível.',
          'Verifique a capacidade e a ocupação. Um boitel operando acima da capacidade tende a piorar o desempenho de todos os lotes. Um boitel com estrutura ociosa tem mais incentivo a negociar bem.',
          'Por último, faça um lote-piloto antes de comprometer capital grande. Nenhuma análise substitui o resultado de um ciclo completo com aquele parceiro.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Como funciona o modelo de boitel',
        duracao: '17 min',
        objetivo: 'Entender a divisão de papéis, obrigações e riscos entre investidor e boitel.',
        conteudo: [
          'No modelo de boitel, o investidor compra os bois magros e paga os custos de engorda; o boitel entrega a estrutura, a alimentação, a mão de obra e o manejo. O animal pertence ao investidor durante todo o ciclo e só é vendido no final.',
          'Essa divisão tem uma consequência importante: o investidor assume integralmente o risco de mercado — preço de compra e de venda — enquanto o boitel assume o risco operacional — desempenho, sanidade e manejo. O contrato precisa refletir com precisão essa divisão.',
          'Onde as fronteiras se confundem, surgem conflitos. Se o animal morre por erro de manejo, quem paga? Se o desempenho fica abaixo do prometido, quem responde? Se o preço da ração dispara, quem absorve? Cada uma dessas perguntas precisa de resposta escrita.',
          'Um boitel bem estruturado oferece relatórios periódicos e permite visitas. O investidor que não acompanha o que acontece no curral está delegando não só a operação, mas também o controle do próprio dinheiro.'
        ],
        pontos: [
          'Investidor: bois magros e custos de engorda; risco de mercado.',
          'Boitel: estrutura, alimentação, mão de obra e manejo; risco operacional.',
          'Fronteiras de responsabilidade precisam estar escritas, não implícitas.',
          'Relatórios periódicos e acesso ao curral são parte do arranjo profissional.'
        ],
        pratica: 'Desenhe uma tabela de duas colunas: "investidor" e "boitel". Em cada linha, coloque uma obrigação ou risco. Se você não souber onde encaixar algum item, esse é o ponto a negociar no contrato.'
      },
      {
        titulo: 'Diária versus acerto no gancho',
        duracao: '18 min',
        objetivo: 'Comparar as modalidades de cobrança e avaliar qual faz sentido em cada caso.',
        conteudo: [
          'Na cobrança por diária, o boitel recebe um valor por cabeça por dia de permanência. É um modelo simples e previsível para o boitel, que passa a ter risco reduzido. Para o investidor, cria incentivo forte à eficiência: cada dia extra custa dinheiro.',
          'No acerto no gancho, o pagamento é feito no momento do abate, geralmente como valor por cabeça ou por arroba produzida. O interesse do boitel fica alinhado ao desempenho do lote, porque ele ganha mais quando o boi ganha mais.',
          'Não existe modalidade universalmente melhor. Diária é mais adequada quando o investidor quer previsibilidade de custo e tem controle sobre o ritmo do lote. Acerto no gancho é mais interessante quando o investidor confia no boitel e quer alinhar incentivos.',
          'Em qualquer caso, calcule o custo total esperado nas duas modalidades antes de decidir. Fazer a mesma simulação com diária e com gancho costuma revelar diferenças relevantes de resultado.'
        ],
        pontos: [
          'Diária: previsível para o boitel, incentiva eficiência no investidor.',
          'Acerto no gancho: alinha o interesse do boitel ao desempenho do lote.',
          'A escolha depende do perfil de risco e da confiança entre as partes.',
          'Simule as duas modalidades antes de decidir: a diferença costuma ser relevante.'
        ],
        pratica: 'No simulador, compare o resultado da operação na modalidade "acerto no gancho" e na modalidade "pagamento à vista / mensal". Anote a diferença e discuta com o boitel qual modalidade está sendo praticada.'
      },
      {
        titulo: 'Cláusulas essenciais do contrato',
        duracao: '19 min',
        objetivo: 'Conhecer os pontos do contrato que protegem o investidor.',
        conteudo: [
          'Um contrato de boitel deve começar pelas partes e pelo objeto: quem são os envolvidos, quantos animais, qual a identificação do lote, qual a data de entrada e qual a previsão de saída. Ambiguidade aqui contamina todo o resto.',
          'O bloco financeiro define a modalidade de cobrança, o valor, a forma e o prazo de pagamento, o que está incluído e o que é cobrado à parte. Também deve prever o reajuste em caso de variação relevante de custos, como milho e combustível.',
          'O bloco de responsabilidades trata de mortalidade, refugo e sinistros. É comum estabelecer uma franquia de mortalidade que o investidor absorve, com o excedente sob responsabilidade do boitel — mas isso precisa estar escrito, com percentual definido e critério de apuração.',
          'O bloco de informação prevê relatórios periódicos, formato, conteúdo e prazo, além de direito de visita e fiscalização. E o bloco final trata de rescisão, solução de conflitos e foro. Contratos claros previnem litígios; contratos vagos os garantem.'
        ],
        pontos: [
          'Objeto: partes, lote, identificação, data de entrada e previsão de saída.',
          'Financeiro: modalidade, valor, prazo, inclusos, à parte e critérios de reajuste.',
          'Responsabilidades: franquia de mortalidade, refugo, sinistros e critérios de apuração.',
          'Informação e rescisão: relatórios, direito de visita, solução de conflitos e foro.'
        ],
        pratica: 'Pegue o contrato que você tem em mãos (ou um modelo) e marque com um traço cada item acima que estiver ausente ou ambíguo. Cada traço é um risco que você está assumindo sem perceber.'
      },
      {
        titulo: 'Mortalidade, refugo e quem paga a conta',
        duracao: '15 min',
        objetivo: 'Definir critérios justos para repartir perdas entre as partes.',
        conteudo: [
          'Mortalidade e refugo são os pontos mais sensíveis de qualquer contrato de boitel. Perder um animal significa perder o custo de compra, a ração já consumida, a diária já paga e a receita futura. A pergunta não é se haverá perdas, mas como elas serão repartidas.',
          'A prática mais comum é estabelecer uma franquia: por exemplo, o investidor absorve perdas até 2% do lote e o boitel responde pelo que exceder. Isso cria incentivo correto nos dois lados — o investidor aceita o risco normal do negócio e o boitel cuida para não haver perdas evitáveis.',
          'É indispensável definir o critério de apuração. Quem atesta a causa da morte? Há exigência de laudo veterinário? Como se calcula o valor do animal perdido — pelo preço de compra, pelo preço de mercado ou pelo valor projetado de venda?',
          'Refugo tem lógica parecida. Animal descartado por problema sanitário, lesão ou baixo desempenho gera prejuízo. Definir desde o início como esse valor entra na conta evita discussão em um momento em que ninguém está disposto a ceder.'
        ],
        pontos: [
          'Franquia de mortalidade é a prática mais comum e equilibra incentivos.',
          'Definir critério de apuração: quem atesta a causa e como se calcula o valor.',
          'Refugo precisa de regra própria, não pode ser tratado como mortalidade.',
          'Regras escritas antes do problema evitam conflito durante o problema.'
        ],
        pratica: 'Negocie por escrito uma franquia de mortalidade e o critério de apuração de causa e valor. Leve a proposta ao boitel como parte da negociação, não como desconfiança.'
      },
      {
        titulo: 'Como escolher um boitel',
        duracao: '17 min',
        objetivo: 'Aplicar critérios objetivos na seleção de um parceiro operacional.',
        conteudo: [
          'O primeiro critério é capacidade técnica: histórico de desempenho, qualidade da dieta, estrutura de cocho e água, existência de sombra e equipe treinada. Peça números de ciclos anteriores — ganho médio diário, mortalidade, conversão.',
          'O segundo é transparência. Um boitel profissional entrega relatórios, permite visita sem restrição e não tem dificuldade em mostrar a conta. Resistência a auditoria é sinal de alerta, mesmo que nada esteja errado.',
          'O terceiro é a saúde financeira do parceiro. Boitel com dificuldade de caixa pode reduzir qualidade de ração, atrasar compra de insumos ou priorizar outros clientes em momentos de aperto. Vale perguntar e verificar referências.',
          'Por último, faça um lote-piloto. Um ciclo completo com um sócio operacional revela mais do que qualquer proposta comercial. Se o primeiro ciclo correr bem, aumente a exposição gradualmente.'
        ],
        pontos: [
          'Avalie desempenho histórico: GMD, mortalidade e conversão de ciclos anteriores.',
          'Transparência e disponibilidade para auditoria são critérios de peso.',
          'Saúde financeira do boitel afeta a qualidade do serviço no aperto.',
          'Comece com um lote-piloto e aumente a exposição gradualmente.'
        ],
        pratica: 'Monte um checklist de avaliação com os quatro critérios e pontue de 0 a 10 cada boitel que você estiver considerando. Visite pelo menos um deles em dia de trabalho normal.'
      },
      {
        titulo: 'Due diligence e visita técnica',
        duracao: '16 min',
        objetivo: 'Executar uma verificação prática da estrutura e da operação antes de contratar.',
        conteudo: [
          'Due diligence, em boitel, é simples: verificar se o que foi prometido existe. Isso começa pela documentação da propriedade, licenças ambientais e sanitárias, e pela regularidade da empresa.',
          'A visita técnica deve ocorrer sem aviso prévio, se possível, para observar a operação real. Leve um roteiro: metros de cocho por animal, número e limpeza de bebedouros, existência de sombra, qualidade visual da ração, presença de sobra no cocho e condição corporal dos animais.',
          'Converse com a equipe. Pergunte quantos animais cada tratador maneja, qual é a rotina de trato e como são tratados os animais doentes. As respostas revelam mais sobre o profissionalismo da operação do que qualquer folder.',
          'Por fim, confirme a capacidade de armazenamento de insumos e a origem dos ingredientes. Boitel que compra bem e armazena bem tem mais condição de manter a dieta estável — e dieta estável é desempenho estável.'
        ],
        pontos: [
          'Due diligence: documentação, licenças e regularidade da empresa.',
          'Visita sem aviso revela a operação real, não a de apresentação.',
          'Roteiro de verificação: cocho, água, sombra, ração, sobra e condição corporal.',
          'Capacidade de compra e armazenagem de insumos sustenta a estabilidade da dieta.'
        ],
        pratica: 'Elabore um roteiro de visita técnica com dez itens objetivos e uma escala de conformidade. Use o mesmo roteiro em todos os candidatos a parceiro para comparar de forma justa.'
      }
    ],
    quiz: [
      { p: 'Na cobrança por diária, quem absorve o risco do tempo de permanência no cocho?', opcoes: ['O boitel', 'O investidor', 'O frigorífico', 'É dividido meio a meio'], correta: 1, explicacao: 'Como cada dia extra custa dinheiro, o investidor absorve o risco do tempo — o que, por outro lado, incentiva eficiência.' },
      { p: 'A modalidade de acerto no gancho tende a alinhar o interesse do boitel com:', opcoes: ['A redução da dieta para economizar', 'O desempenho e o ganho de peso do lote', 'A permanência mais longa do animal', 'A compra de bois mais leves'], correta: 1, explicacao: 'Como o boitel é remunerado no abate, ele ganha mais quando o lote performa melhor. É a lógica de alinhar incentivos.' },
      { p: 'Para que serve a franquia de mortalidade no contrato?', opcoes: ['Esconder o número real de mortes', 'Repartir as perdas de forma justa: o investidor absorve o risco normal e o boitel responde pelo excedente', 'Transferir toda a perda para o boitel', 'Anular o contrato em caso de morte'], correta: 1, explicacao: 'A franquia equilibra incentivos: o investidor aceita o risco do negócio e o boitel cuida para não haver perdas evitáveis.' },
      { p: 'Antes de comprometer capital grande com um boitel, o recomendado é:', opcoes: ['Assinar logo o contrato anual com desconto', 'Fazer um lote-piloto e visitar a estrutura em dia normal de trabalho', 'Confiar apenas na proposta comercial', 'Aceitar a indicação do próprio boitel'], correta: 1, explicacao: 'Um ciclo completo com o parceiro revela mais do que qualquer proposta. A visita sem aviso mostra a operação real, não a de apresentação.' },
      { p: 'Um contrato profissional de boitel precisa prever obrigatoriamente:', opcoes: ['Apenas o valor da diária', 'Relatórios periódicos com peso, consumo, custos e ocorrências, além do direito de visita', 'Somente o prazo de saída dos animais', 'A dieta exata a ser usada'], correta: 1, explicacao: 'Transparência é cláusula, não favor. Sem informação e sem acesso ao curral, o investidor delega o controle do próprio dinheiro.' }
    ]
  },

  // ---------------------------------------------------------------
  // 7. MERCADO, BOI CHINA E COMERCIALIZAÇÃO
  // ---------------------------------------------------------------
  {
    id: 'mercado',
    titulo: 'Mercado, Boi China e Comercialização',
    tema: 'Mercado',
    nivel: 'Intermediário',
    icone: 'compass',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cattle%20truck%20leaving%20a%20Brazilian%20slaughterhouse%20at%20dawn%20with%20shipping%20containers%20in%20the%20background%2C%20logistics%20and%20meat%20export%20concept%2C%20professional%20industrial%20photography&image_size=landscape_16_9',
    resumo: 'Entenda a cadeia da carne, o peso da exportação, os requisitos e o prêmio do Boi China, como funciona a tipificação de carcaça e como negociar melhor com o frigorífico.',
    documentario: {
      titulo: 'O boi que o mundo compra',
      duracao: '31 min',
      sinopse: 'Cinco capítulos sobre o mercado que define o preço da sua arroba: a cadeia da carne, a exportação, o prêmio Boi China, a tipificação de carcaça e a arte de negociar com o frigorífico.',
      capitulos: [
        { t: '00:00', titulo: 'A cadeia da carne', texto: [
          'Entre o curral e o prato há uma cadeia complexa: frigoríficos, distribuidores, atacadistas, varejo, exportação e food service. Cada elo tem margem própria e cada um pressiona no sentido de pagar menos pelo animal e cobrar mais pelo produto.',
          'O produtor de confinamento ocupa a ponta que menos controla preço. Por isso, informação e poder de negociação são ativos tão valiosos quanto genética e dieta.',
          'Entender a cadeia permite identificar onde está o valor e como o produtor pode capturar uma parte maior dele — seja por qualidade de carcaça, por regularidade de entrega ou por acesso ao mercado externo.'
        ] },
        { t: '06:10', titulo: 'Mercado interno e exportação', texto: [
          'O mercado brasileiro de carne bovina tem duas faces. O consumo interno absorve a maior parte do volume, mas costuma ser sensível à renda e apresentar demanda irregular. A exportação, embora menor em volume, é a grande formadora de preço.',
          'Quando o mercado externo aquece, os frigoríficos elevam a compra e o preço da arroba reage. Quando o principal comprador reduz o ritmo, o excedente de oferta pressiona os preços internos para baixo. O produtor brasileiro negocia, portanto, com um olho no câmbio e outro nas decisões de compra de países importadores.',
          'Além do efeito direto no preço, a exportação impõe padrões. Exigências sanitárias, de rastreabilidade e de idade dos animais alteram o que o mercado remunera e definem o que se chama de "elegibilidade".'
        ] },
        { t: '13:20', titulo: 'O prêmio Boi China', texto: [
          'O chamado Boi China designa o animal que atende os requisitos exigidos pelo protocolo sanitário do mercado chinês. Os mais conhecidos são a idade inferior a 30 meses, a ausência de determinados implantes hormonais e o atendimento a exigências de rastreabilidade.',
          'Cumprir esses requisitos dá acesso a um prêmio adicional por arroba, que varia conforme a oferta e a demanda do momento. Em determinados períodos, esse prêmio é justamente o que transforma um resultado apertado em resultado confortável.',
          'A elegibilidade, portanto, começa na compra: comprar animal abaixo de 30 meses já é uma decisão de mercado, não apenas técnica. Ela vale dinheiro no fim do ciclo.',
          'Vale ressaltar que os requisitos e o valor do prêmio mudam ao longo do tempo, conforme acordos sanitários e condições de mercado. Verifique sempre as condições vigentes com o frigorífico antes de fechar a compra dos animais.'
        ] },
        { t: '20:40', titulo: 'Tipificação e bonificações', texto: [
          'O valor que você recebe não depende apenas do preço da arroba. As escalas de tipificação classificam a carcaça por acabamento de gordura, conformação e peso, e essa classificação pode gerar bonificação ou desconto.',
          'Carcaça bem acabada, com gordura de cobertura adequada e peso dentro da faixa desejada, tende a receber bonificação por qualidade. Carcaça com acabamento insuficiente, peso fora da faixa ou sinais de manejo ruim sofre desconto.',
          'Há também bonificações relacionadas a programas específicos: origem rastreada, boi verde, raças específicas e protocolos de bem-estar. Cada uma exige conformidade e costuma valer a pena quando o lote já está bem conduzido.',
          'A conta final é: preço base vezes arrobas, mais bonificações, menos descontos. Dois produtores podem vender no mesmo dia, pelo mesmo preço base, e receber valores finais bem diferentes.'
        ] },
        { t: '26:00', titulo: 'Negociando com o frigorífico', texto: [
          'Negociação com frigorífico não é apenas pechincha de preço. É construção de relação com um comprador que precisa de volume, regularidade e previsibilidade. O produtor que entrega lote homogêneo, no prazo e com documentação em ordem tem poder de barganha muito maior.',
          'Informação é poder. Conhecer as cotações do dia, o desempenho dos contratos futuros e o preço praticado em outras praças dá ao produtor referência para recusar propostas ruins.',
          'Agrupar volume também fortalece. Produtores organizados em grupos ou associações chegam à mesa com lotes maiores e negociam em posição melhor. Volume é alavanca.',
          'Por fim, formalizar tudo por escrito. Preço, bonificação, prazo de pagamento, critério de classificação e condições de entrega devem estar registrados. Acordo verbal sobre bonificação é o tipo de acordo que desaparece na hora da nota fiscal.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'A cadeia da carne bovina',
        duracao: '17 min',
        objetivo: 'Conhecer os elos da cadeia e entender a posição do produtor nela.',
        conteudo: [
          'A cadeia da carne bovina vai da genética e da nutrição até o consumidor final, passando por frigoríficos, distribuição, varejo e exportação. Cada elo agrega valor e captura margem. O produtor de confinamento está na ponta que produz a matéria-prima.',
          'Os frigoríficos são o elo imediatamente à frente e o principal comprador de boi gordo. Eles operam com margens que dependem do preço da arroba comprada, do preço da carne vendida e do nível de utilização da capacidade instalada.',
          'Entender essa dinâmica explica comportamentos que parecem irracionais ao produtor: dias de pouca compra, escalas reduzidas, reajustes súbitos. Não é capricho — é gestão de margem do outro lado da mesa.',
          'O produtor que compreende a cadeia negocia melhor, porque entende quando o comprador tem espaço e quando não tem.'
        ],
        pontos: [
          'A cadeia vai da produção ao consumidor, passando por frigorífico, distribuição e varejo.',
          'Frigoríficos ajustam a compra conforme margem e utilização da capacidade.',
          'Compreender a dinâmica do comprador melhora o timing da negociação.',
          'O produtor está na ponta que menos controla o preço — daí a importância de informação.'
        ],
        pratica: 'Mapeie os compradores da sua região e o destino provável da carne que eles processam. Saber se é mercado interno ou exportação ajuda a antecipar o apetite de compra.'
      },
      {
        titulo: 'Mercado interno versus exportação',
        duracao: '18 min',
        objetivo: 'Entender como a exportação influencia o preço da arroba no Brasil.',
        conteudo: [
          'O consumo interno é o maior destino da carne bovina brasileira, mas é sensível à renda da população e à concorrência de outras proteínas. Quando a economia desacelera, o consumo cede e o preço interno sente.',
          'A exportação, menor em volume, tem impacto desproporcional no preço. Quando o principal importador aumenta as compras, os frigoríficos disputam matéria-prima e o preço da arroba sobe. Quando reduz, o excedente volta ao mercado interno e pressiona para baixo.',
          'O câmbio funciona como amplificador. Um real mais desvalorizado torna a carne brasileira mais competitiva no exterior e melhora a receita em reais do exportador, com efeito positivo sobre o preço pago ao produtor.',
          'Há também o efeito das condições sanitárias. Restrições de mercado por questões sanitárias, mesmo temporárias, redirecionam volumes e afetam preços. Acompanhar notícias do setor é parte do trabalho de quem investe no confinamento.'
        ],
        pontos: [
          'Mercado interno absorve volume; exportação forma preço.',
          'Alta nas compras externas pressiona o preço da arroba para cima.',
          'Câmbio desvalorizado favorece o exportador e o preço pago ao produtor.',
          'Restrições sanitárias a mercados alteram o fluxo e afetam preços.'
        ],
        pratica: 'Acompanhe por quatro semanas os principais indicadores de exportação de carne bovina e a cotação da arroba na sua praça. Tente identificar se existe correlação visível.'
      },
      {
        titulo: 'Boi China: requisitos e prêmio',
        duracao: '18 min',
        objetivo: 'Conhecer os requisitos de elegibilidade e usar isso na decisão de compra.',
        conteudo: [
          'O prêmio Boi China se aplica a animais que atendem aos requisitos do protocolo sanitário acordado com o mercado chinês. Os mais relevantes são a idade do animal, tipicamente inferior a 30 meses, a ausência de certos hormônios de crescimento e o atendimento às exigências de rastreabilidade.',
          'A idade é verificada indiretamente pela dentição. Animais com dentes de leite ou com a primeira troca em curso são considerados jovens e elegíveis. Animais mais velhos saem do protocolo — e com eles vai a bonificação.',
          'O valor do prêmio varia com o tempo e com as condições de mercado. Em períodos de forte demanda chinesa, o prêmio cresce; em períodos de retração, encolhe ou desaparece. Verifique sempre as condições vigentes.',
          'A consequência prática é direta: a decisão de compra do boi magro deve considerar a elegibilidade. Pagar um pouco mais por animal jovem e rastreado pode valer muito mais do que o prêmio aparente, pelo acesso ao mercado de maior valor.'
        ],
        pontos: [
          'Requisitos centrais: idade inferior a 30 meses, ausência de certos hormônios e rastreabilidade.',
          'A idade é verificada por dentição; animais mais velhos saem do protocolo.',
          'O valor do prêmio varia com as condições de mercado — confirme sempre.',
          'Elegibilidade começa na decisão de compra do boi magro.'
        ],
        pratica: 'Ao comprar o próximo lote, classifique os animais por elegibilidade estimada ao mercado de exportação e negocie o preço com base nisso. Registre quantos ficaram elegíveis.'
      },
      {
        titulo: 'Tipificação, bonificações e descontos',
        duracao: '18 min',
        objetivo: 'Entender como a classificação de carcaça altera o valor final recebido.',
        conteudo: [
          'A tipificação de carcaça avalia acabamento de gordura, conformação e peso. Carcaça bem acabada, com gordura de cobertura adequada e peso dentro da faixa preferida pelo frigorífico, tende a ser bonificada. O inverso gera desconto.',
          'Acabamento insuficiente é um dos problemas mais penalizados, porque reduz a vida de prateleira e dificulta a desossa e o porcionamento. Animal vendido sem acabamento adequado perde valor mesmo com peso alto.',
          'Peso fora da faixa também pesa. Carcaças muito leves ou muito pesadas podem sair do padrão e sofrer ajuste. Por isso, o ponto de abate é decisão econômica: nem cedo, nem tarde.',
          'Existem ainda bonificações por programas específicos — origem rastreada, protocolos de bem-estar, raças ou sistemas de produção determinados. Todas exigem conformidade, e todas se acumulam com a bonificação de qualidade quando aplicáveis.'
        ],
        pontos: [
          'Tipificação: acabamento de gordura, conformação e peso.',
          'Acabamento insuficiente é penalizado; afeta vida de prateleira e desossa.',
          'Peso fora da faixa gera ajuste, para cima ou para baixo.',
          'Programas específicos somam bonificações adicionais quando há conformidade.'
        ],
        pratica: 'Peça ao frigorífico os relatórios de tipificação dos seus lotes anteriores e identifique os itens que mais geraram desconto. Esses itens são o alvo do próximo ciclo.'
      },
      {
        titulo: 'Estratégias de negociação com frigoríficos',
        duracao: '19 min',
        objetivo: 'Melhorar o poder de barganha na venda do boi gordo.',
        conteudo: [
          'Negociar bem começa por estar informado. Antes de conversar com o comprador, saiba a cotação da arroba na sua praça e em praças vizinhas, o desempenho recente dos contratos futuros e o ritmo de compra dos frigoríficos da região.',
          'Volume é alavanca. Reunir lotes de produtores vizinhos ou participar de grupos de comercialização dá acesso a negociações que um lote individual não alcança. Frigorífico paga melhor por escala e regularidade.',
          'Qualidade e regularidade valem prêmio. Quem entrega lote homogêneo, com acabamento adequado, no prazo combinado e com documentação em ordem, se torna fornecedor preferencial — e fornecedor preferencial negocia em condição diferente.',
          'E tudo por escrito. Preço base, bonificações, descontos, critério de classificação, prazo e forma de pagamento. Acordo verbal sobre bonificação é acordo que não existe na hora da nota.'
        ],
        pontos: [
          'Informe-se antes: cotação local, praças vizinhas e contratos futuros.',
          'Volume e regularidade ampliam o poder de negociação.',
          'Fornecedor preferencial negocia em condição diferenciada.',
          'Formalize preço, bonificações, descontos e prazos por escrito.'
        ],
        pratica: 'Prepare um one-pager antes da próxima negociação: número de cabeças, peso médio estimado, rendimento esperado, elegibilidade e prazo de entrega. Chegue com números, não com impressões.'
      },
      {
        titulo: 'Logística, frete e GTA',
        duracao: '16 min',
        objetivo: 'Planejar o transporte para reduzir custos e perdas.',
        conteudo: [
          'O frete é um custo relevante e frequentemente subestimado. Ele é composto pela distância, pela tarifa por cabeça, pelo tipo de veículo e por taxas e documentos exigidos no trajeto.',
          'Distância afeta dois momentos: a compra do boi magro e a venda do boi gordo. Em operações de confinamento, é comum que o boi magro venha de regiões distantes, encarecendo a entrada. Otimizar a origem reduz o custo final.',
          'O transporte também afeta o desempenho. Animais transportados por longas distâncias chegam desidratados e estressados, com maior risco de doença respiratória e queda de consumo na adaptação. Reduzir tempo de viagem e respeitar densidade adequada melhora o desempenho subsequente.',
          'A GTA precisa acompanhar o transporte e estar correta. Emissão digital agiliza o processo, mas a informação deve ser precisa: origem, destino, quantidade e finalidade. Erro de documento gera retenção e prejuízo.'
        ],
        pontos: [
          'Frete: distância, tarifa por cabeça, tipo de veículo e taxas.',
          'Otimizar a origem do boi magro reduz o custo de entrada.',
          'Viagens longas e densidade excessiva pioram a adaptação e a sanidade.',
          'GTA correta evita retenção e prejuízo no trajeto.'
        ],
        pratica: 'Liste todos os fretes que a operação envolve e quanto cada um representa do custo total. Verifique se há oportunidade de reduzir distância de compra ou de agrupar cargas.'
      }
    ],
    quiz: [
      { p: 'Qual fator costuma ter maior impacto na formação do preço da arroba no Brasil?', opcoes: ['O consumo interno, que é estável', 'A exportação, cujo ritmo de compra pressiona os preços internos', 'O preço do milho', 'A quantidade de confinamentos na região'], correta: 1, explicacao: 'O mercado interno absorve volume, mas a exportação forma preço. Quando o principal importador acelera as compras, a arroba sobe.' },
      { p: 'Quais são requisitos típicos do protocolo Boi China?', opcoes: ['Peso acima de 600 kg e raça europeia', 'Idade inferior a 30 meses, rastreabilidade e ausência de certos hormônios', 'Apenas vacinação em dia', 'Produção exclusivamente a pasto'], correta: 1, explicacao: 'A idade é verificada por dentição. Como o prêmio varia com o tempo, confirme sempre as condições vigentes com o frigorífico.' },
      { p: 'A tipificação de carcaça avalia principalmente:', opcoes: ['A raça do animal e a cor do pelo', 'Acabamento de gordura, conformação e peso', 'O preço pago pelo boi magro', 'A distância percorrida no transporte'], correta: 1, explicacao: 'Acabamento insuficiente e peso fora da faixa geram desconto. Dois produtores podem vender no mesmo dia e receber valores bem diferentes.' },
      { p: 'O que aumenta o poder de barganha na venda ao frigorífico?', opcoes: ['Vender sempre o menor lote possível', 'Volume, regularidade de entrega e informação de mercado', 'Aceitar o primeiro preço oferecido', 'Evitar formalizar acordos por escrito'], correta: 1, explicacao: 'Lote homogêneo, no prazo e com documentação em ordem cria fornecedor preferencial. E fornecedor preferencial negocia em outra condição.' },
      { p: 'Sobre acordos verbais de bonificação com o frigorífico:', opcoes: ['Costumam ser respeitados e dispensam papel', 'Na prática não existem: tudo deve ser formalizado por escrito', 'Valem mais que o contrato', 'Só precisam ser registrados se houver exportação'], correta: 1, explicacao: 'Acordo verbal sobre bonificação é o tipo de acordo que desaparece na hora da nota fiscal. Preço, descontos e prazos devem constar por escrito.' }
    ]
  },

  // ---------------------------------------------------------------
  // 8. TECNOLOGIA, DADOS E GESTÃO DIGITAL
  // ---------------------------------------------------------------
  {
    id: 'tecnologia',
    titulo: 'Tecnologia, Dados e Gestão Digital no Agro',
    tema: 'Tecnologia',
    nivel: 'Iniciante',
    icone: 'cpu',
    capa: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=farmer%20holding%20a%20tablet%20showing%20a%20data%20dashboard%20next%20to%20a%20digital%20cattle%20scale%20and%20sensors%20in%20a%20modern%20feedlot%2C%20morning%20light%2C%20professional%20agtech%20photography&image_size=landscape_16_9',
    resumo: 'Descubra como dados, sensores e software transformam o confinamento em um negócio gerido por números — do controle de pesagem à modelagem financeira no simulador.',
    documentario: {
      titulo: 'O curral digital',
      duracao: '28 min',
      sinopse: 'Cinco capítulos sobre a fazenda conectada: pesagem, sensores, cochos inteligentes, software de gestão e modelagem financeira como instrumento de decisão.',
      capitulos: [
        { t: '00:00', titulo: 'O fim do caderno de capa preta', texto: [
          'Durante décadas, a gestão de confinamento foi feita em caderno. O peso era anotado à mão, o consumo estimado de cabeça e a decisão tomada por sensação. As melhores operações já eram disciplinadas; as piores, invisíveis até o prejuízo chegar.',
          'A transformação digital do agro não começou com drones nem com inteligência artificial: começou com a pesagem eletrônica. Poder medir com precisão foi o primeiro passo para gerir com precisão.',
          'Neste documentário, percorremos as tecnologias que realmente mudam o resultado no confinamento — sem exagero e com foco no que se paga.'
        ] },
        { t: '05:20', titulo: 'Pesagem: o dado que originou tudo', texto: [
          'Tudo começa no peso. Peso de entrada, peso intermediário e peso de saída são a base do ganho médio diário, da conversão alimentar e do rendimento de carcaça. Sem medição confiável, todos esses indicadores são chute.',
          'A balança eletrônica com leitor de brinco permite acompanhar o desempenho individual e identificar precocemente animais que não estão ganhando peso. Um animal que patina por duas semanas é dinheiro perdido — e, sem balança, ninguém percebe.',
          'O passo seguinte é o registro em sistema. Pesagens manuais em planilha funcionam, mas exigem disciplina. Sistemas que capturam o peso automaticamente eliminam erro humano e liberam tempo da equipe.',
          'O retorno aparece rápido: identificar e tratar ou descartar rapidamente um animal improdutivo pode pagar o investimento em balança em um único ciclo.'
        ] },
        { t: '11:00', titulo: 'Cochos inteligentes e sensores', texto: [
          'O consumo de matéria seca é o dado mais valioso e mais difícil de medir em um confinamento convencional. Cochos inteligentes, ou sistemas de medição de consumo, registram quanto cada animal come e revelam quedas de consumo antes de qualquer sinal clínico.',
          'A queda de consumo é o primeiro indicador de doença. Detectar 24 horas antes pode significar a diferença entre um tratamento barato e a perda do animal. Nesse sentido, medir consumo é a forma mais eficaz de vigilância sanitária automatizada.',
          'Sensores de clima, de temperatura e de umidade também entram em cena, permitindo antecipar ondas de calor e ativar mitigação — aspersão, sombra, ajuste de horário de trato — antes que o desempenho caia.',
          'Nem toda tecnologia se paga em toda escala. Cochos inteligentes têm custo relevante e fazem mais sentido em operações grandes ou em lotes de alto valor. A pergunta certa é sempre: quanto essa informação vale para mim?'
        ] },
        { t: '17:40', titulo: 'Software de gestão e indicadores', texto: [
          'Com os dados coletados, o passo seguinte é transformá-los em indicadores. Um bom software de gestão de confinamento consolida peso, consumo, custos e mortalidade em painéis que mostram a operação em tempo real.',
          'Indicadores essenciais: ganho médio diário do lote, consumo médio, conversão alimentar, custo por quilo de ganho, mortalidade acumulada e projeção de resultado. Cada um responde a uma pergunta de gestão distinta.',
          'A grande vantagem de ter indicadores atualizados é a capacidade de corrigir durante o ciclo. Sem dados, o produtor descobre o resultado só no abate, quando não há mais nada a fazer. Com dados, ele intervém quando ainda dá tempo.',
          'Registrar também é acumular ativos. Histórico de desempenho por lote, por origem de animal e por dieta permite negociar melhor, escolher parceiros com base em evidência e melhorar sistematicamente a cada ciclo.'
        ] },
        { t: '23:00', titulo: 'Modelagem financeira e decisão', texto: [
          'A peça final da gestão digital é a modelagem financeira. Ferramentas como o simulador da Stratum Agro permitem comparar praças, testar cenários e visualizar indicadores de retorno antes de comprometer capital.',
          'Modelar não serve para prever o futuro com precisão. Serve para entender a sensibilidade do resultado às variáveis: quanto o lucro cai se a arroba recuar cinco por cento? E se o milho subir dez? E se a mortalidade dobrar?',
          'Esse entendimento muda a qualidade da decisão. Em vez de decidir por otimismo ou por medo, decide-se por análise. O produtor que modela deixa de apostar e passa a investir.',
          'E o ciclo se completa: medir na fazenda, registrar em sistema, consolidar em indicadores e projetar em modelo. Cada etapa alimenta a seguinte, e o negócio passa a evoluir por aprendizado, não por sorte.'
        ] }
      ]
    },
    aulas: [
      {
        titulo: 'Por que dados mudam o resultado',
        duracao: '16 min',
        objetivo: 'Compreender o valor econômico de medir o que acontece no curral.',
        conteudo: [
          'A maior parte do prejuízo em confinamento não vem de uma decisão errada isolada, mas de um conjunto de pequenas perdas invisíveis: animal que come e não ganha peso, ração que sobra no cocho, lote que fica dias além do ponto ideal.',
          'Sem dados, essas perdas só aparecem no resultado final, quando não há mais nada a corrigir. Com dados, elas aparecem em tempo de serem corrigidas — e é essa diferença de tempo que define o resultado.',
          'Medir tem custo: balança, software, tempo de equipe. A conta fecha quando o valor da informação supera o custo de obtê-la. Em geral, informar-se sai mais barato do que se pensa, e não informar-se custa mais do que se imagina.',
          'O primeiro passo não é comprar tecnologia, é decidir o que medir. Indicadores claros evitam a armadilha de coletar muitos dados e não usar nenhum.'
        ],
        pontos: [
          'Grande parte do prejuízo é composta de pequenas perdas invisíveis.',
          'Dados antecipam a correção para o momento em que ela ainda é possível.',
          'Medir tem custo, mas o custo de não medir costuma ser maior.',
          'O primeiro passo é decidir o que medir, não comprar tecnologia.'
        ],
        pratica: 'Liste três decisões que você tomou no último ciclo por intuição. Ao lado de cada uma, escreva que dado teria permitido decidir com base em evidência.'
      },
      {
        titulo: 'Pesagem e desempenho individual',
        duracao: '16 min',
        objetivo: 'Usar a pesagem para acompanhar ganho de peso e detectar animais improdutivos.',
        conteudo: [
          'A pesagem é a base de todos os indicadores técnicos. Peso de entrada, pesagens intermediárias e peso de saída permitem calcular ganho médio diário por lote, por dieta e por origem de animal.',
          'Pesagens intermediárias permitem detectar desvios durante o ciclo. Um lote que deveria estar ganhando 1,4 quilo por dia e está ganhando 1,1 tem um problema — de dieta, de sanidade ou de manejo. Sem pesagem, esse desvio passa em branco.',
          'A identificação individual com brinco permite acompanhar animais específicos. Alguns respondem pouco à dieta mesmo em condições adequadas; detectá-los cedo permite tratá-los ou separá-los do lote, evitando arrastar a média para baixo.',
          'A frequência ideal de pesagem depende da estrutura. Em muitos casos, pesagens a cada 21 ou 28 dias já são suficientes para uma gestão eficaz, sem estressar o rebanho desnecessariamente.'
        ],
        pontos: [
          'Pesagem é a base de GMD, conversão e projeção de resultado.',
          'Pesagens intermediárias detectam desvios durante o ciclo.',
          'Identificação individual permite agir sobre animais improdutivos.',
          'Pesagens a cada 21 a 28 dias já permitem gestão eficaz.'
        ],
        pratica: 'Verifique a periodicidade das pesagens no seu arranjo atual e quantas estão previstas no contrato. Compare o GMD real com o projetado a cada pesagem.'
      },
      {
        titulo: 'Consumo, cochos inteligentes e IoT',
        duracao: '17 min',
        objetivo: 'Entender as tecnologias de medição de consumo e seu retorno econômico.',
        conteudo: [
          'Consumo de matéria seca é o dado que mais explica desempenho. Animais que comem abaixo do esperado ganham menos, e a queda de consumo é o primeiro sinal de problema sanitário — muitas vezes com 24 horas de antecedência em relação aos sinais clínicos.',
          'Cochos inteligentes medem o consumo por animal ou por baia. Isso permite ajustar dieta diariamente, detectar animais doentes mais cedo e calcular conversão alimentar com precisão. O retorno vem da redução de perdas e da melhoria de eficiência.',
          'Sensores ambientais complementam o quadro, medindo temperatura e umidade para antecipar estresse térmico. Com essa informação, é possível programar o trato para horários mais frescos e acionar mitigação a tempo.',
          'Há também balanças de cocho e sistemas de estoque de insumos que reduzem erro na formulação e evitam desperdício de matéria-prima. Pequenos ganhos de precisão, multiplicados por centenas de animais e centenas de dias, viram valores expressivos.'
        ],
        pontos: [
          'Consumo é o dado que melhor explica desempenho.',
          'Queda de consumo antecede sinais clínicos de doença em cerca de 24 horas.',
          'Sensores ambientais permitem antecipar e mitigar estresse térmico.',
          'Precisão na formulação evita desperdício de insumos caros.'
        ],
        pratica: 'Avalie quais dados você já consegue obter com a estrutura atual e quais exigiriam investimento. Priorize o que tiver maior potencial de evitar perdas, não o que for tecnologicamente mais vistoso.'
      },
      {
        titulo: 'Software de gestão e painéis de indicadores',
        duracao: '17 min',
        objetivo: 'Organizar dados em indicadores que orientem decisões durante o ciclo.',
        conteudo: [
          'Um painel de gestão de confinamento reúne os indicadores que importam em um só lugar: ganho médio diário, consumo, conversão, custo do quilo de ganho, mortalidade acumulada e projeção de resultado.',
          'A atualização frequente é o que dá valor ao painel. Um relatório que chega dois meses depois do fim do ciclo serve para aprender, não para corrigir. A informação precisa estar quente para ser acionável.',
          'Além dos indicadores operacionais, os indicadores financeiros completam a visão: caixa livre em D0, ponto de equilíbrio e ROIC projetado. Juntos, eles respondem se a operação vai bem e se vale a pena continua.',
          'Outro uso valioso é a comparação entre ciclos. Com histórico, é possível identificar padrões: qual origem de animal performa melhor, qual dieta entrega melhor conversão, qual época do ano gera mais problema sanitário.'
        ],
        pontos: [
          'Painel reúne indicadores operacionais e financeiros em um só lugar.',
          'Informação precisa ser atual para permitir correção durante o ciclo.',
          'Indicadores financeiros respondem se vale continuar a operação.',
          'Histórico permite identificar padrões e melhorar a cada ciclo.'
        ],
        pratica: 'Defina cinco indicadores que você vai acompanhar semanalmente e onde eles serão registrados. Combine com o boitel a periodicidade de envio dos relatórios.'
      },
      {
        titulo: 'Modelagem financeira e simulação de cenários',
        duracao: '18 min',
        objetivo: 'Usar modelagem para comparar alternativas e decidir com base em análise.',
        conteudo: [
          'Modelagem financeira no agro é a prática de representar a operação em números e simular o que acontece quando as variáveis mudam. É a ferramenta que transforma uma intuição em decisão justificável.',
          'O simulador da Stratum Agro faz exatamente isso: recebe capital, tamanho do lote, dias de confinamento, diária, bonificação, mortalidade, CDI e imposto, e devolve ranking de praças, lucro por cabeça, ROIC, DRE, fluxo de caixa e análise gráfica.',
          'O maior valor está na comparação. Em minutos, é possível testar várias praças, dois modelos de pagamento e três cenários de preço — algo que levaria dias em planilha manual e provavelmente resultaria em erro.',
          'Modelar também disciplina a decisão. Quando o produtor vê que o projeto só se paga em cenário otimista, ele reavalia. Quando vê que o resultado é robusto mesmo no pessimista, ele executa com confiança.'
        ],
        pontos: [
          'Modelar é representar a operação em números e simular variações.',
          'O simulador entrega ranking de praças, indicadores, DRE e fluxo de caixa.',
          'Comparar alternativas em minutos é a maior vantagem da modelagem.',
          'Modelagem disciplina a decisão: mostra se o projeto depende de otimismo.'
        ],
        pratica: 'Abra o simulador, cadastre seu cenário real e compare dois modelos de pagamento do boitel. Depois, altere só a mortalidade e observe o impacto no ROIC.'
      },
      {
        titulo: 'A fazenda conectada e o futuro do confinamento',
        duracao: '16 min',
        objetivo: 'Vislumbrar as tendências de digitalização e avaliar o que faz sentido adotar.',
        conteudo: [
          'A conectividade no campo deixou de ser luxo. Internet em curral permite usar software em nuvem, coletar dados em tempo real e integrar balanças, sensores e sistemas de gestão em um único fluxo.',
          'Integração é a palavra-chave. Dados isolados valem pouco; dados que conversam entre si geram inteligência. Peso, consumo, clima e custos, integrados, permitem decisões que nenhum dado isolado sustentaria.',
          'A análise preditiva é o horizonte: modelos capazes de estimar data ideal de abate, risco sanitário e resultado final antes do fim do ciclo. Já existem aplicações nesse sentido, e a tendência é de popularização.',
          'O produtor não precisa adotar tudo. Precisa adotar o que se paga. A régua é sempre a mesma: quanto essa tecnologia reduz perda, aumenta ganho ou economiza tempo com retorno mensurável?'
        ],
        pontos: [
          'Conectividade no campo habilita software em nuvem e dados em tempo real.',
          'Integração de dados gera mais valor do que dados isolados.',
          'Análise preditiva tende a se popularizar no confinamento.',
          'Adote o que se paga: retorno mensurável é a régua de decisão.'
        ],
        pratica: 'Escolha uma tecnologia que você considera promissora e calcule, no papel, em quanto tempo ela se pagaria na sua operação. Se não conseguir estimar, provavelmente ainda não é o momento.'
      }
    ],
    quiz: [
      { p: 'Qual dado explica melhor o desempenho do lote?', opcoes: ['A cor do pelame', 'O consumo de matéria seca', 'O número de tratadores', 'A marca da balança'], correta: 1, explicacao: 'Consumo é o dado mais valioso: animais que comem abaixo do esperado ganham menos, e a queda de consumo é o primeiro sinal de problema.' },
      { p: 'Com quanta antecedência a queda de consumo costuma anteceder os sinais clínicos de doença?', opcoes: ['Cerca de 5 minutos', 'Cerca de 24 horas', 'Cerca de 1 semana', 'Não há relação entre consumo e doença'], correta: 1, explicacao: 'Detectar 24 horas antes pode significar a diferença entre um tratamento barato e a perda do animal.' },
      { p: 'Qual periodicidade de pesagem já permite uma gestão eficaz do lote?', opcoes: ['Todos os dias', 'A cada 21 a 28 dias', 'Somente no abate', 'A cada 6 meses'], correta: 1, explicacao: 'Pesagens periódicas detectam desvios durante o ciclo, quando ainda dá tempo de corrigir dieta, sanidade ou manejo.' },
      { p: 'Para que serve principalmente a modelagem financeira de cenários?', opcoes: ['Prever o futuro com exatidão', 'Entender a sensibilidade do resultado às variáveis', 'Substituir o médico veterinário', 'Eliminar o risco do negócio'], correta: 1, explicacao: 'Modelar mostra quanto o lucro cai se a arroba recuar, se o milho subir ou se a mortalidade dobrar. Decide-se por análise, não por otimismo.' },
      { p: 'Sobre dados na gestão do confinamento, é correto afirmar:', opcoes: ['Quanto mais dados coletados sem uso, melhor', 'A integração entre peso, consumo, clima e custos gera mais valor do que dados isolados', 'Planilha manual é sempre superior a um sistema', 'Tecnologia só se paga em operações pequenas'], correta: 1, explicacao: 'Dados isolados valem pouco; integrados, sustentam decisões que nenhum dado sozinho permitiria. E a régua é sempre o retorno mensurável.' }
    ]
  }
];
