# Google Search Console Integration Guide
# Azuos Tech - Guia de Configuração

# 1. VERIFICAÇÃO DE DOMÍNIO
# RESOLUÇÃO DE PROBLEMAS COM A VERIFICAÇÃO

Como você está enfrentando o erro "A conexão com seu servidor atingiu o tempo limite" ao verificar com a Tag HTML, aqui estão métodos alternativos:

## Método 1: Verificação por arquivo HTML (Recomendado)

1. Acesse https://search.google.com/search-console/welcome
2. Clique em "Adicionar Propriedade"
3. Selecione "Prefixo de URL" e digite: https://www.azuostech.com.br/
4. Escolha o método de verificação "Arquivo HTML"
5. Baixe o arquivo HTML fornecido pelo Google (será algo como google[código].html)
6. Faça upload desse arquivo para a raiz do seu site (mesmo diretório do index.TOPe.html)
7. Confirme que o arquivo está acessível em https://www.azuostech.com.br/google[código].html
8. Volte ao Search Console e clique em "Verificar"

## Método 2: Verificação via DNS (Alternativa)

1. No Google Search Console, selecione o método "Registro DNS TXT"
2. Copie o valor TXT fornecido pelo Google
3. Acesse o painel de controle DNS do seu domínio (geralmente no registrador onde comprou o domínio)
4. Adicione um novo registro TXT com:
   - Nome/Host: @ (ou deixe em branco para o domínio raiz)
   - Valor/Conteúdo: cole o código TXT do Google
   - TTL: Automático ou 3600
5. Aguarde 15-30 minutos para propagação do DNS
6. Volte ao Search Console e clique em "Verificar"

# 2. ENVIO DO SITEMAP
# Instruções para enviar seu sitemap:

1. Na propriedade do Search Console, clique em "Sitemaps" no menu lateral
2. Digite "sitemap.xml" no campo de URL
3. Clique em "Enviar"
4. Aguarde processamento (pode levar alguns dias)

# 3. INSPECIONAR URLs
# Solicite indexação das páginas principais:

1. No Search Console, use a ferramenta "Inspeção de URL"
2. Digite cada URL importante do seu site
3. Se a página não estiver indexada, clique em "Solicitar Indexação"

# 4. ESTRUTURA DE DADOS/RICH RESULTS
# Valide sua estrutura de dados:

1. Acesse https://search.google.com/test/rich-results
2. Insira a URL do seu site
3. Verifique se os dados estruturados estão sendo detectados corretamente

# 5. CONFIGURAÇÕES ADICIONAIS
# Verificações regulares a serem feitas:

- Monitorar relatórios de desempenho
- Verificar problemas de rastreamento
- Revisar erros de usabilidade em dispositivos móveis

# Para mais orientações, contate: seo@azuostech.com.br
