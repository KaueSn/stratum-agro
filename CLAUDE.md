# Stratum Agro — instruções permanentes

Site de vendas + área logada da plataforma Stratum Agro (planejamento de confinamento bovino). Responda e documente em **português**.

## Arquitetura
- `index.html`: página única com CSS, HTML e JS juntos (público, login, perfil, assinatura, admin, editor do site). Sem build.
- `js/materiais-data.js` e `js/materiais-site.js`: seção Materiais de apoio + quiz.
- `api/*.js` + `lib/stripe.js`: funções serverless da Vercel (Stripe Checkout, consulta de assinatura, portal). Variáveis em `.env.example`.
- `vercel.json`: cabeçalhos de segurança (CSP etc.), só na Vercel; o GitHub Pages ignora. **Ao usar um recurso externo novo (script, fonte, imagem, API), acrescente a origem na CSP**, senão ele é bloqueado. `.vercelignore` define o que não vai para a Vercel.
- `lib/stripe.js` tem rate limit em memória (10/min por IP e por uid), parcial por instância serverless.
- `firestore.rules`: regras do Firestore. **Publicadas manualmente** no Console do Firebase (projeto `boitel-analytics`, compartilhado com o simulador).
- O simulador fica em outro repositório: `D:\Devin projetos` → `kauesn/boitel-analytics-pro`. Não confunda os dois repositórios.
- Publicação: push na `main` atualiza o GitHub Pages (`kauesn.github.io/stratum-agro`) e a Vercel (`stratum-agro.vercel.app`).
- Relatório de riscos em aberto: `docs/AUDITORIA.md`. Atualize ao corrigir ou encontrar um problema. **Fica só no computador do dono** (está em `.git/info/exclude`): o repositório é público, então não o adicione ao git.

## Rodar localmente
Servidor estático na pasta (ex.: `npx serve .` ou qualquer servidor HTTP) → `http://127.0.0.1:<porta>/index.html`. Sem Firebase, o login entra em modo demonstração. A API só roda com `vercel dev` e as variáveis de ambiente.

## Testes
- Regras do Firestore: `cd tests/firestore-rules && npm install && npm test`. Usa o Firebase Emulator local com o projeto fictício `demo-stratum` e precisa de Java 21+ no PATH ou em `JAVA_HOME`. **Rode sempre que mudar `firestore.rules`** e acrescente casos novos em `rules.test.js`.
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
