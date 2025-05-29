@echo off
echo ========================================
echo    AZUOS TECH - Deploy para a Vercel
echo ========================================
echo.
echo Este script vai preparar os arquivos e fazer o deploy do site para a Vercel.

REM Verificar se o Vercel CLI está instalado
echo Verificando instalação do Vercel CLI...
call vercel --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI não encontrado. Instalando...
    call npm install -g vercel
) else (
    echo Vercel CLI já está instalado.
)

REM Renomear index.TOPe.html para index.html se necessário
echo Verificando arquivos principais...
if exist index.TOPe.html (
    echo Renomeando index.TOPe.html para index.html...
    copy index.TOPe.html index.html /Y
)

REM Verifica se todos os arquivos essenciais existem
echo Verificando arquivos essenciais para SEO...
if not exist robots.txt (
    echo ERRO: robots.txt não encontrado!
    exit /b 1
)
if not exist sitemap.xml (
    echo ERRO: sitemap.xml não encontrado!
    exit /b 1
)
if not exist vercel.json (
    echo ERRO: vercel.json não encontrado!
    exit /b 1
)

echo.
echo Todos os arquivos essenciais estão presentes.
echo.

REM Configurar environment variables
echo Configurando variáveis de ambiente...
echo SITE_URL=https://www.azuostech.com.br > .env

echo.
echo Pronto para iniciar o deploy!
echo.

REM Perguntar ao usuário se deseja continuar com o deploy
set /p CONTINUE=Deseja continuar com o deploy para a Vercel? (S/N): 

if /I "%CONTINUE%"=="S" (
    echo.
    echo Iniciando deploy para a Vercel...
    call vercel --prod
    
    echo.
    echo ========================================
    echo    Deploy concluído!
    echo ========================================
    echo.
    echo Próximos passos:
    echo 1. Verifique seu site em https://www.azuostech.com.br
    echo 2. Configure o Google Search Console seguindo o guia
    echo    google-search-console-guide.md
    echo.
) else (
    echo.
    echo Deploy cancelado pelo usuário.
    echo.
)

echo Pressione qualquer tecla para sair...
pause > nul
