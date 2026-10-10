# 🔐 Configurar Firebase - Stratum Agro

## 📋 O que precisa ser configurado:

Para que o login funcione, você precisa configurar o Firebase Authentication.

---

## 🚀 Passo a Passo Completo

### 1. Criar Projeto Firebase

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"** (ou "Add project")
3. Nome do projeto: `stratum-agro`
4. Desative Google Analytics (opcional para teste)
5. Clique em **"Criar projeto"** (Create project)
6. Aguarde a criação (pode levar 1-2 minutos)
7. Clique em **"Continuar"** quando terminar

### 2. Configurar Authentication

1. No projeto, no menu lateral esquerdo, clique em **Build** > **Authentication**
2. Clique em **"Começar"** (Get started)
3. Aba **"Sign-in method"**
4. Habilite **"E-mail/Senha"**:
   - Clique em "E-mail/Senha"
   - Ative o switch: "Ativar"
   - Clique em "Salvar"
5. Habilite **"Google"**:
   - Clique em "Google"
   - Ative o switch: "Ativar"
   - Em "Nome de exibição público do projeto", digite: `Stratum Agro`
   - Em "E-mail de suporte", digite seu e-mail
   - Clique em "Salvar"

### 3. Configurar Firestore Database (Opcional para futuro)

Para salvar dados de usuários e simulações no futuro:

1. No menu lateral, clique em **Build** > **Firestore Database**
2. Clique em **"Criar banco de dados"** (Create database)
3. Escolha localização: **"Sul América (sulamerica-east1)"** ou a mais próxima do Brasil
4. Escolha modo: **"Modo de teste"** (recomendado por 30 dias)
5. Clique em **"Habilitar"** (Enable)

### 4. Obter Credenciais

1. No Firebase Console, clique no ícone de engrenagem ⚙️ **Configurações do projeto** (Project settings) no menu lateral
2. Role até a seção **"Seus apps"** (Your apps)
3. Clique no ícone **</>** (Web) - terceiro ícone
4. Nome do app: `Stratum Agro`
5. **NÃO** marque "Firebase Hosting" (vamos usar GitHub Pages)
6. Clique em **"Registrar app"** (Register app)
7. **NÃO** copie o script do SDK (já está no código)
8. Clique em **"Continuar no console"** (Continue to console)
9. **Copie as credenciais** que aparecem na tela

As credenciais serão algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "stratum-agro.firebaseapp.com",
  projectId: "stratum-agro",
  storageBucket: "stratum-agro.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 5. Atualizar o Código

1. Abra o arquivo: `D:\Devin projetos\stratum-agro\index.html`
2. Procure por (linha ~603):
```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```
3. Substitua pelos valores que você copiou do Firebase
4. Salve o arquivo

### 6. Adicionar Domínio no Firebase

1. No Firebase Console, vá em **Authentication** > **Configurações** (Settings) > **Domínios autorizados** (Authorized domains)
2. Clique em **"Adicionar domínio"** (Add domain)
3. Digite: `kauesn.github.io`
4. Clique em **"Adicionar"** (Add)

### 7. Fazer Deploy das Alterações

Execute o script: `atualizar-site.bat`

Ou manualmente:
```bash
cd "D:\Devin projetos\stratum-agro"
git add index.html
git commit -m "Configurado Firebase"
git push
```

---

## 🎯 Testar o Login

Após o deploy (1-2 minutos):

1. Acesse: https://kauesn.github.io/stratum-agro/
2. Você verá a página de login
3. Clique em **"Criar conta grátis"**
4. Preencha e-mail e senha
5. Clique em **"Criar Conta"**
6. Você será redirecionado para o dashboard (placeholder)

---

## 🧪 Testar Login com Google

1. Na página de login, clique em **"Entrar com Google"**
2. Será aberto uma janela do Google
3. Faça login com sua conta Google
4. Você será redirecionado de volta para o site
5. Login realizado!

---

## 🐛 Solução de Problemas

### Erro: "Firebase não configurado"
- Verifique se substituiu as credenciais no código
- Certifique-se de que o apiKey não é "SUA_API_KEY_AQUI"
- Feito o deploy após alterar o código?

### Erro: "auth/unauthorized-domain"
- Adicione `kauesn.github.io` nos domínios autorizados do Firebase
- Aguarde 1-2 minutos após adicionar o domínio

### Erro: "auth/popup-blocked"
- Permita popups para o site no navegador
- Tente em uma aba normal (não incógnito)

### Login com Google não funciona
- Verifique se habilitou o provedor Google no Firebase Console
- Verifique se configurou o consentimento OAuth corretamente

---

## 📱 Domínios Autorizados

No Firebase, adicione estes domínios:
- `kauesn.github.io`
- Se usar domínio personalizado no futuro, adicione também

---

## ✅ Checklist de Configuração

- [ ] Projeto Firebase criado
- [ ] Authentication habilitado (Email/Senha)
- [ ] Authentication habilitado (Google)
- [ ] Firestore Database criado (opcional)
- [ ] Credenciais copiadas
- [ ] Credenciais atualizadas no index.html
- [ ] Domínio adicionado no Firebase
- [ ] Deploy realizado
- [ ] Login com e-mail testado
- [ ] Login com Google testado

---

## 🎉 Após Configurar

O sistema de login estará 100% funcional!

- ✅ Usuários podem criar conta
- ✅ Login com e-mail/senha
- ✅ Login com Google
- ✅ Sistema seguro
- ✅ Pronto para expansão futura (assinaturas, consultoria, etc.)

---

## 📞 Suporte

- Firebase Docs: https://firebase.google.com/docs
- Authentication Docs: https://firebase.google.com/docs/auth
- Firestore Docs: https://firebase.google.com/docs/firestore
