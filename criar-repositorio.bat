@echo off
echo ========================================
echo CONFIGURAR REPOSITORIO GITHUB
echo ========================================
echo.
echo PASSO 1: Criar Repositorio no GitHub
echo.
echo 1. Acesse: https://github.com/new
echo 2. Nome do repositorio: stratum-agro
echo 3. Descricao: Planejamento e Controle Estrategico Agro
echo 4. Public/Private: Public
echo 5. NAO marque: "Add a README file"
echo 6. NAO marque: "Add .gitignore"
echo 7. NAO marque: "Choose a license"
echo 8. Clique em "Create repository"
echo.
pause

echo.
echo PASSO 2: Conectar e enviar para GitHub
echo.

cd /d "D:\Devin projetos\stratum-agro"

git remote set-url origin https://github.com/KaueSn/stratum-agro.git

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERRO AO FAZER PUSH
    echo ========================================
    echo.
    echo Possiveis causas:
    echo 1. Repositorio nao foi criado no GitHub
    echo 2. Nome do repositorio esta errado
    echo 3. Voce nao tem permissao
    echo.
    echo Certifique-se de criar o repositorio em:
    echo https://github.com/new
    echo Nome: stratum-agro
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCESSO! Repositorio configurado!
echo ========================================
echo.
echo Proximo passo: Ativar GitHub Pages
echo.
echo 1. Acesse: https://github.com/KaueSn/stratum-agro/settings/pages
echo 2. Source: Deploy from a branch
echo 3. Branch: main / (root)
echo 4. Clique em Save
echo.
pause
