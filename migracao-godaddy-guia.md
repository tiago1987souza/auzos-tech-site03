# Guia de Migração: Vercel → GoDaddy
# AZUOS TECH - Migração de Hospedagem

## 1. PREPARAÇÃO DOS ARQUIVOS

### 1.1 Arquivo .htaccess
O arquivo .htaccess é essencial para configurar redirecionamentos, compressão e outras otimizações no servidor Apache da GoDaddy:

```
# Ativar reescrita de URL
RewriteEngine On

# Redirecionar HTTP para HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirecionar sem www para com www
RewriteCond %{HTTP_HOST} ^azuostech\.com\.br [NC]
RewriteRule ^(.*)$ https://www.azuostech.com.br/$1 [L,R=301]

# Ativar compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Cabeçalhos de cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# Cabeçalhos de segurança
<IfModule mod_headers.c>
  Header always set X-XSS-Protection "1; mode=block"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

### 1.2 Estrutura de arquivos para upload
Certifique-se de manter a estrutura exata dos arquivos para upload:

```
/
├── index.html (renomeie index.TOPe.html para index.html)
├── sitemap.xml
├── robots.txt
├── .htaccess
├── manifest.json
├── google74b9c39674b8863a.html (arquivo de verificação do Google)
├── styles/
│   ├── main.css
│   └── produto.css
├── js/
│   ├── main.js
│   ├── cart.js
│   ├── graphics.js
│   ├── webfont-loader.js
│   └── speed-optimizer.js
└── IMAGES/
    ├── ...todos os arquivos de imagem
    ├── icons/
    ├── optimized/
    └── responsive/
```

## 2. MIGRAÇÃO PARA GODADDY

### 2.1 Acesse o Painel de Controle da GoDaddy
1. Faça login em https://sso.godaddy.com
2. Navegue até "Meus Produtos" > "Hospedagem Web"
3. Selecione seu plano de hospedagem

### 2.2 Upload dos Arquivos
1. Clique na opção "Gerenciador de Arquivos" ou "File Manager"
2. Navegue até a pasta "public_html" ou "www" (pasta raiz do site)
3. Faça upload de todos os arquivos mantendo a estrutura de diretórios
4. Certifique-se de que o arquivo index.html está na raiz

### 2.3 Configuração de Banco de Dados (se necessário)
1. Se você utilizar banco de dados posteriormente, crie-o pelo painel cPanel
2. Atualize as credenciais de conexão nos arquivos correspondentes

## 3. CONFIGURAÇÃO DNS

### 3.1 Verificar Configuração Atual
1. Execute nslookup para seu domínio:
```
nslookup azuostech.com.br
nslookup www.azuostech.com.br
```

### 3.2 Atualizar Registros DNS (caso já não estejam apontando para GoDaddy)
1. Acesse o painel DNS da GoDaddy
2. Verifique se existem registros A e CNAME configurados:
   - Registro A: @ → Aponta para o IP do servidor GoDaddy
   - Registro CNAME: www → Aponta para @
3. Remova quaisquer registros apontando para Vercel

### 3.3 Tempo de Propagação
- Após alterações de DNS, aguarde até 48 horas para propagação completa
- Você pode verificar a propagação em https://dnschecker.org

## 4. VERIFICAÇÃO PÓS-MIGRAÇÃO

### 4.1 Verificar Funcionamento do Site
1. Acesse https://www.azuostech.com.br em diferentes navegadores
2. Verifique se todas as páginas, imagens e funcionalidades estão operando corretamente
3. Teste em dispositivos móveis e desktops

### 4.2 Reconfigurações no Google Search Console
1. Acesse o Google Search Console: https://search.google.com/search-console
2. Use o método de verificação via arquivo HTML (já feito)
3. Reenvie o sitemap.xml após confirmar que ele está acessível
4. Solicite indexação das URLs principais

### 4.3 Monitoramento
1. Configure monitoramento de tempo de atividade (Uptime) 
2. Verifique os logs de erro nos primeiros dias após a migração
3. Realize testes de velocidade em https://pagespeed.web.dev

## 5. SOLUÇÃO DE PROBLEMAS COMUNS

### 5.1 Erro 500 (Internal Server Error)
- Verifique permissões de arquivos (.htaccess deve ter permissão 644)
- Revise o arquivo .htaccess em busca de diretivas incompatíveis com seu plano

### 5.2 Imagens ou recursos não carregados
- Confirme se os caminhos são relativos e compatíveis com a nova estrutura
- Verifique permissões das pastas de imagem (geralmente 755)

### 5.3 Problemas de HTTPS
- Verifique se o SSL está ativado na hospedagem da GoDaddy
- Certifique-se de que todas as URLs no código usam https://

## CONTATO PARA SUPORTE

Em caso de dúvidas ou problemas durante a migração:
- E-mail: contato@azuostech.com.br
- WhatsApp: (51) 98991-6919