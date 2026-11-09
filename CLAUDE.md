# Stratum Agro — instruções permanentes

Site de vendas + área logada da plataforma Stratum Agro (planejamento de confinamento bovino). Responda e documente em **português**.

## Arquitetura
- `index.html`: página única com CSS, HTML e JS juntos (público, login, perfil, assinatura, admin, editor do site). Sem build.
- `js/materiais-data.js` e `js/materiais-site.js`: seção Materiais de apoio + quiz.
- `estudos.html` + `js/estudos-data.js` (conteúdo com data e fonte) + `js/estudos.js` + `css/estudos.css`: página de Estudos. **Números só ao vivo (BCB/IBGE via `js/indicadores.js`) ou com fonte oficial e data**; CEPEA é CC BY-NC (uso não comercial): só link, nunca reproduzir valores.
- `js/landing.js`: faixa ao vivo, calculadora rápida, barra de progresso e CTA fixo da página inicial.
- `js/painel.js` + `css/app.css`: início da área logada (saudação, resumo da conta, ferramentas, mercado ao vivo, primeiros passos). Conceito visual: camadas de solo ("stratum"). No celular o menu vira barra inferior. É só interface: autorização continua nas regras e na API.
- `campo.html` (Minha fazenda): `js/campo-calc.js` (cálculos sem tela, testes em `tests/campo.test.js`), `js/campo-dados.js` (grava no aparelho e sincroniza em `users/{uid}/campo_lotes` e `campo_agenda`), `js/campo-ui.js`, `js/campo-lotes.js`, `js/campo-agenda.js`, `js/campo-calculadoras.js`, `js/campo-app.js` e `css/campo.css`. `sw.js` deixa só essa página offline (escopo `/campo*`). Arquivo novo usado por ela entra na lista `ARQUIVOS` do `sw.js`.
- `js/pastas.js`: pastas "ver depois" (localStorage; com login, sincroniza em `users/{uid}.pastas`).
- `js/antibot.js`: armadilha, tempo mínimo, prova de trabalho e espera após falhas no login/cadastro. `js/lgpd.js`: aviso de armazenamento, exportar dados e excluir conta.
- `privacidade.html` e `termos.html` (+ `css/base.css`): documentos legais. Ao mudar dados coletados, fornecedores ou preços, atualize-os e a `VERSAO_TERMOS` em `js/lgpd.js`.
- Imagens: `img/` (fotos Nelore CC BY 2.0 com crédito no rodapé e nos Termos; capas restantes geradas por IA). Favicon: `favicon.svg` + `img/*.png` + `manifest.webmanifest`.
- `api/*.js` + `lib/stripe.js`: funções serverless da Vercel (Stripe Checkout, consulta de assinatura, portal). Variáveis em `.env.example`.
- `vercel.json`: cabeçalhos de segurança (CSP etc.), só na Vercel; o GitHub Pages ignora. **Ao usar um recurso externo novo (script, fonte, imagem, API), acrescente a origem na CSP**, senão ele é bloqueado. `.vercelignore` define o que não vai para a Vercel.
- `lib/stripe.js` limita a 10 req/min por IP e por uid: Upstash Redis se configurado (`lib/rate-limit-redis.js`), senão memória (`lib/rate-limit.js`), parcial por instância serverless. `rateLimit` e `preflight` são assíncronas: sempre use `await`. `lib/token-cache.js` guarda por 5 min os tokens já validados, com chave SHA-256.
- `firestore.rules`: regras do Firestore. **Publicadas manualmente** no Console do Firebase (projeto `boitel-analytics`, compartilhado com o simulador).
- O simulador fica em outro repositório: `D:\Devin projetos` → `kauesn/boitel-analytics-pro`. Não confunda os dois repositórios.
- Publicação: push na `main` atualiza o GitHub Pages (`kauesn.github.io/stratum-agro`) e a Vercel (`stratum-agro.vercel.app`). **Domínio oficial: Vercel** (`SITE_URL`, autorizado no Firebase Auth). O GitHub Pages só redireciona para a Vercel (script no início do `<head>`).
- `firestore.rules` também cobre a comunidade do simulador (`community_posts`, `community_answers`). Regras publicadas em 2026-10-28 a partir deste arquivo.
- `firestore.rules` também cobre `users/{uid}/projetos/{pid}` (Plataforma Patrimonial do simulador; só o dono acessa, criar/alterar exige Pro, ids `p00`–`p49`). Regras publicadas no Console em 2026-11-01 a partir deste arquivo (inclui também termos aceitos, pastas e exclusão da conta pelo dono). Testes em `tests/firestore-rules/projetos.test.js`.
- Editor do site: só o master (pelo token) publica o campo `js`; HTML de textos e blocos passa por `limparHtml()` (tags de formatação, sem scripts/eventos).
- Imagens ficam no próprio repositório (`img/`); não use imagens hospedadas por terceiros.
- Relatório de riscos em aberto: `docs/AUDITORIA.md`. Atualize ao corrigir ou encontrar um problema. **Fica só no computador do dono** (está em `.git/info/exclude`): o repositório é público, então não o adicione ao git.

## Rodar localmente
Servidor estático na pasta (ex.: `npx serve .` ou qualquer servidor HTTP) → `http://127.0.0.1:<porta>/index.html`. Sem Firebase, o login entra em modo demonstração. A API só roda com `vercel dev` e as variáveis de ambiente.

## Testes
- API (Google e Stripe simulados, sem rede): `node --test tests/api-routes.test.js tests/security.test.js`. Rode sempre que mudar `api/` ou `lib/`.
- Regras do Firestore: `cd tests/firestore-rules && npm install && npm test`. Usa o Firebase Emulator local com o projeto fictício `demo-stratum` e precisa de Java 21+ no PATH ou em `JAVA_HOME`. **Rode sempre que mudar `firestore.rules`** e acrescente casos novos em `rules.test.js` (ou `projetos.test.js` para os projetos). Os arquivos rodam em sequência (`--test-concurrency=1`) porque compartilham o emulador.
- Se o CLI do Firebase travar ao iniciar, suba o emulador direto: `java -jar ~/.cache/firebase/emulators/cloud-firestore-emulator-v1.22.0.jar --host 127.0.0.1 --port 8085 --project_id demo-stratum` e rode `FIRESTORE_EMULATOR_HOST=127.0.0.1:8085 node --test --test-concurrency=1 rules.test.js projetos.test.js`.
- `RULES_FILE=<arquivo> npm test` testa outra versão das regras (ex.: a copiada do Console).

## Regras de trabalho
- **Nunca** faça commit, push, merge ou deploy sem pedido explícito. Push na `main` = produção.
- Preserve alterações locais do proprietário. Não reescreva o histórico do git.
- Alto risco, apresente o plano e espere aprovação: autenticação/autorização, `firestore.rules`, pagamentos/Stripe, configurações externas, dados de usuários.
- Não invente dados da empresa, preços, prazos, depoimentos ou números de marketing.
- Não declare algo “seguro” ou “funcionando” sem teste. Diga o que foi e o que não foi verificado.

## Padrões de segurança do código
- Todo dado vindo do Firestore ou do usuário inserido via `innerHTML` passa por `esc()`. Prefira `textContent`.
- Autorização real fica nas regras do Firestore e na API. Checagens no frontend são só cosméticas.
- Identidade e cargo de admin vêm do token do Firebase (`auth.currentUser`), nunca de campos editáveis do documento.
- A chave secreta do Stripe só existe no servidor (variável de ambiente). A `apiKey` web do Firebase é pública por design.
- Endpoints da API devem validar o ID token do Firebase e não confiar em e-mail enviado pelo navegador.

## Acessibilidade
Meta WCAG 2.2 AA: rótulos com `for`, foco visível, `aria-expanded` em toggles, modais com `role="dialog"` e foco gerenciado, não usar só cor para transmitir informação.
