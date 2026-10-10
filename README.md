# Stratum Agro

Planejamento e Controle Estratégico Agro

## 🚀 Como Configurar

### 1. Criar Repositório no GitHub (IMPORTANTE!)

1. Acesse: https://github.com/new
2. Nome do repositório: `stratum-agro`
3. Descrição: `Planejamento e Controle Estratégico Agro`
4. Public/Private: Public (para GitHub Pages gratuito)
5. ⚠️ NÃO marque: "Add a README file"
6. ⚠️ NÃO marque: "Add .gitignore"
7. ⚠️ NÃO marque: "Choose a license"
8. Clique em "Create repository"

### 2. Conectar com GitHub

Depois de criar o repositório, execute na pasta `D:\Devin projetos\stratum-agro`:

```bash
git remote set-url origin https://github.com/KaueSn/stratum-agro.git
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No repositório, vá em Settings > Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Clique em Save

### 4. Configurar Firebase

Siga o arquivo `CONFIGURAR_FIREBASE.md` do projeto anterior para obter as credenciais.

### 5. Atualizar Credenciais

Abra `index.html` e substitua as credenciais do Firebase (linha ~603).

### 6. Deploy

Execute: `atualizar-site.bat`

## 📱 URL do Site

Após configurar: `https://kauesn.github.io/stratum-agro/`

## 🎯 Próximas Etapas

- [ ] Implementar dashboard principal
- [ ] Adicionar simulador de confinamento
- [ ] Implementar sistema de assinaturas
- [ ] Adicionar painel administrativo
- [ ] Integrar com Stripe
- [ ] Implementar sistema de consultoria
