# Otimização para Deploy na Vercel

Este guia contém instruções para otimizar o tempo de deploy do site AZUOS TECH na plataforma Vercel.

## Estrutura recomendada para deploy rápido

```
SITE-AURORA/
├── index.TOPe.html (principal)
├── service-worker.js
├── manifest.json
├── robots.txt
├── sitemap.xml
├── .htaccess
├── _redirects
├── vercel.json
├── browserconfig.xml
├── js/
│   ├── main.js
│   ├── cart.js
│   ├── graphics.js
│   ├── webfont-loader.js
│   ├── speed-optimizer.js
│   ├── performance-monitor.js
│   └── image-optimizer.js
├── styles/
│   ├── main.css
│   └── produto.css
└── IMAGES/
    ├── optimized/ (versões otimizadas)
    ├── responsive/ (versões responsivas)
    └── icons/ (ícones PWA)
```

## Dicas para deploy mais rápido na Vercel

1. **Cache de dependências**:
   - Certifique-se de que o arquivo `.vercelignore` exclui arquivos desnecessários.
   - Arquivos como `node_modules` são ignorados por padrão.

2. **Otimização de imagens antes do deploy**:
   - Execute o script de otimização de imagens antes de fazer o deploy:
   ```bash
   node js/image-optimizer.js
   ```
   - Isso reduz o tamanho dos arquivos que precisam ser enviados.

3. **Redução do tamanho do bundle**:
   - Minimize arquivos CSS e JavaScript:
   ```bash
   # Instalar ferramentas de minificação
   npm install -g minify
   
   # Minificar arquivos JavaScript
   minify js/main.js > js/main.min.js
   minify js/cart.js > js/cart.min.js
   minify js/graphics.js > js/graphics.min.js
   
   # Minificar arquivos CSS
   minify styles/main.css > styles/main.min.css
   minify styles/produto.css > styles/produto.min.css
   ```
   - Atualize as referências no HTML para apontar para os arquivos minificados.

4. **Configuração do cache**:
   - Use a configuração do arquivo `vercel.json` para controlar o cache.
   - Defina headers de cache para recursos estáticos.

5. **Integração com GitHub**:
   - Configure a integração automática com o GitHub para deploys contínuos.
   - Adicione apenas os arquivos necessários no commit para reduzir o tamanho.

## Passos para deploy na Vercel

1. **Vincular ao GitHub**:
   - Faça login na Vercel (vercel.com)
   - Importe seu repositório do GitHub
   - Selecione o repositório SITE-AURORA

2. **Configurar o projeto**:
   - Configure o domínio personalizado azuostech.com.br
   - Defina as variáveis de ambiente necessárias
   - Especifique a pasta raiz como diretório de build

3. **Configurar o domínio**:
   - Adicione o domínio personalizado na Vercel
   - Configure os registros DNS na GoDaddy:
     - Tipo: A, Nome: @, Valor: 76.76.21.21
     - Tipo: CNAME, Nome: www, Valor: cname.vercel-dns.com.

4. **Verificar o deploy**:
   - Verifique se o site está acessível em azuostech.com.br
   - Teste a navegação e funcionalidades
   - Verifique o SSL/TLS (HTTPS)

## Monitoramento após deploy

1. **Verificar a performance**:
   - Use o Google PageSpeed Insights para avaliar a performance
   - Monitore o Console do Google Search para verificar indexação

2. **Monitorar erros**:
   - Verifique os logs de erro no painel da Vercel
   - Configure alertas para notificação de erros

3. **Atualizar regularmente**:
   - Mantenha o site atualizado com novos conteúdos
   - Verifique regularmente o sitemap.xml

## Contato para suporte

Para questões relacionadas ao deploy na Vercel ou configurações de DNS:
- Email: suporte@azuostech.com.br
- WhatsApp: (51) 98991-6919
