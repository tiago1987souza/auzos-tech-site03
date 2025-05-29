# Configuração do Domínio GoDaddy com a Vercel
# AZUOS TECH - Guia de Integração

## 1. CONFIGURAÇÃO DOS REGISTROS DNS NA GODADDY

Para direcionar seu domínio da GoDaddy para sua aplicação na Vercel, siga estes passos:

1. Acesse sua conta GoDaddy em https://sso.godaddy.com
2. Vá para "Meus Produtos" e clique em "Gerenciar DNS" ao lado do domínio azuostech.com.br
3. Configure os seguintes registros DNS:

### Para o domínio raiz (azuostech.com.br)
Adicione ou edite os registros DNS:

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 600 segundos (ou 1 hora)
```

### Para o subdomínio www (www.azuostech.com.br)
```
Tipo: CNAME
Nome: www (se não for aceito, tente sem nada ou ":loja")
Valor: cname.vercel-dns.com.
TTL: 600 segundos (ou 1 hora)
```

> Nota: Em alguns painéis da GoDaddy no Brasil, pode ser necessário usar formatos diferentes como ":loja" ou deixar em branco o campo "Nome" para o registro CNAME. O importante é que ele aponte para cname.vercel-dns.com.

> Observação: O ponto final no valor do CNAME é importante. Certifique-se de incluí-lo.

## 2. ADICIONAR DOMÍNIO NA VERCEL

1. Acesse o painel da Vercel: https://vercel.com/dashboard
2. Selecione seu projeto "AZUOS TECH"
3. Navegue até "Settings" > "Domains"
4. Adicione os seguintes domínios:
   - azuostech.com.br
   - www.azuostech.com.br
5. A Vercel irá verificar e confirmar automaticamente os domínios

## 3. VERIFICAÇÃO E SSL

1. Aguarde até 24 horas para a propagação completa do DNS
2. Verifique se os certificados SSL estão ativos (deve mostrar "Valid Configuration" na Vercel)
3. Teste os dois domínios em seu navegador:
   - https://azuostech.com.br
   - https://www.azuostech.com.br
4. Verifique se ambos carregam o site corretamente com o cadeado de HTTPS

## 4. REDIRECIONAMENTO PARA VERSÃO PADRÃO

Para SEO, é recomendado que todas as versões do domínio redirecionem para uma versão canônica. Na Vercel, configure:

1. Na seção "Domains" do seu projeto
2. Defina um dos domínios como primário (recomendamos www.azuostech.com.br)
3. Configure redirecionamentos para o domínio primário:
   - Clique nos 3 pontos ao lado do domínio não-primário
   - Selecione "Redirect to Primary Domain"

## 5. TESTANDO A CONFIGURAÇÃO

Para verificar se a configuração de DNS está correta, execute no terminal:

```
nslookup azuostech.com.br
nslookup www.azuostech.com.br
```

Para verificar o certificado SSL:
```
curl -I https://www.azuostech.com.br
```

## 6. RESOLUÇÃO DE PROBLEMAS COMUNS

### Problema: Registros DNS não propagados
- Aguarde até 48 horas para propagação completa
- Verifique se há erros de digitação nos registros DNS
- Use https://dnschecker.org para verificar a propagação global

### Problema: Erro de certificado SSL
- Verifique se os registros DNS estão corretamente configurados
- Na Vercel, vá para Settings > Domains e clique em "Refresh" no domínio
- Se o problema persistir, remova e adicione o domínio novamente

### Problema: Site não carrega
- Verifique se o build na Vercel foi bem-sucedido
- Confirme se o domínio está corretamente configurado na Vercel
- Teste diretamente pela URL da Vercel (seu-projeto.vercel.app) para isolar o problema

## SUPORTE

Para suporte técnico durante esta configuração:
- E-mail: contato@azuostech.com.br
- WhatsApp: (51) 98991-6919
