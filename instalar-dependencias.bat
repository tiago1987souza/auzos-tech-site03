@echo off
echo =======================================
echo   AZUOS TECH - INSTALAÇÃO DE DEPENDÊNCIAS
echo =======================================
echo.

echo Verificando se o Node.js está instalado...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js não encontrado. Por favor, instale o Node.js antes de continuar.
    echo Você pode baixar em: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Criando package.json para o projeto...
echo {^
  "name": "azuos-tech",^
  "version": "1.0.0",^
  "description": "Site AZUOS TECH",^
  "scripts": {^
    "optimize-images": "node js/image-optimizer.js",^
    "minify-js": "minify js/main.js > js/main.min.js && minify js/cart.js > js/cart.min.js && minify js/graphics.js > js/graphics.min.js",^
    "minify-css": "minify styles/main.css > styles/main.min.css && minify styles/produto.css > styles/produto.min.css",^
    "build": "npm run optimize-images && npm run minify-js && npm run minify-css",^
    "deploy": "vercel --prod"^
  },^
  "keywords": [^
    "azuos",^
    "tech",^
    "website",^
    "seo"^
  ],^
  "author": "AZUOS TECH",^
  "license": "UNLICENSED",^
  "private": true,^
  "dependencies": {^
    "dotenv": "^16.0.3"^
  },^
  "devDependencies": {^
    "imagemin": "^8.0.1",^
    "imagemin-gifsicle": "^7.0.0",^
    "imagemin-mozjpeg": "^10.0.0",^
    "imagemin-pngquant": "^9.0.2",^
    "imagemin-svgo": "^10.0.1",^
    "imagemin-webp": "^8.0.0",^
    "minify": "^9.1.0",^
    "sharp": "^0.31.3",^
    "vercel": "^28.15.3"^
  }^
} > package.json

echo Instalando dependências...
npm install

echo Instalando ferramentas globais...
npm install -g minify vercel

echo.
echo =======================================
echo Instalação concluída com sucesso!
echo.
echo Para otimizar as imagens, execute:
echo   npm run optimize-images
echo.
echo Para minificar arquivos JS e CSS, execute:
echo   npm run minify-js
echo   npm run minify-css
echo.
echo Para fazer o deploy na Vercel, execute:
echo   npm run deploy
echo =======================================
echo.

pause
