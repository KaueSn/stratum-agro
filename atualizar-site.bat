@echo off
echo ========================================
echo ATUALIZAR SITE - STRATUM AGRO
echo ========================================
echo.

cd /d "D:\Devin projetos\stratum-agro"

echo Adicionando alteracoes...
git add index.html

echo Fazendo commit...
git commit -m "Atualizacao do site - Stratum Agro"

echo Enviando para GitHub...
git push

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERRO AO FAZER PUSH
    echo ========================================
    echo.
    echo Possiveis causas:
    echo 1. Voce nao fez login no GitHub
    echo 2. Credenciais expiraram
    echo 3. Problema de conexao
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCESSO! Site atualizado!
echo ========================================
echo.
pause
