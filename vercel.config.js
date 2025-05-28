# Arquivo de configuração para deploy na Vercel

# Dependências necessárias
require('dotenv').config();

// Configurações de exportação
module.exports = {
  // Configurações gerais
  distDir: 'build',
  
  // Headers de segurança e otimização
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https://www.azuostech.com.br; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self';",
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/styles/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },
      {
        source: '/js/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },
    ];
  },
  
  // Redirecionamentos
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/servicos',
        destination: '/#services',
        permanent: true,
      },
      {
        source: '/produtos',
        destination: '/#products',
        permanent: true,
      },
      {
        source: '/sobre',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/contato',
        destination: '/#contact',
        permanent: true,
      },
    ];
  },
  
  // Configuração de região da Vercel (Sul da América)
  regions: ['gru1'],
  
  // Configurações para build
  build: {
    env: {
      SITE_URL: 'https://www.azuostech.com.br',
    },
  },
};
