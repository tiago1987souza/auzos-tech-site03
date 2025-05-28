// WebFont Loader para carregamento otimizado de fontes
// Reduz o FOIT (Flash of Invisible Text) e melhora a performance

(function(window) {
  'use strict';

  // Configuração para carregar fontes
  function loadFonts() {
    const WebFontConfig = {
      google: {
        families: ['Orbitron:400,700,900', 'Exo+2:300,400,500,600,700']
      },
      // Quando as fontes estão ativas
      active: function() {
        sessionStorage.setItem('fontsLoaded', 'true');
        document.documentElement.classList.add('fonts-loaded');
      },
      // Timeout para fallback caso as fontes não carreguem
      timeout: 5000
    };

    // Carregar o script do WebFontLoader
    (function(d) {
      const wf = d.createElement('script'), s = d.scripts[0];
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
      wf.async = true;
      s.parentNode.insertBefore(wf, s);
      
      // Adicionar classe para estilização durante carregamento
      document.documentElement.classList.add('fonts-loading');
      
      // Carregar a configuração
      window.WebFontConfig = WebFontConfig;
    })(document);
  }

  // Verificar se as fontes já foram carregadas anteriormente
  if (sessionStorage.getItem('fontsLoaded')) {
    // Adicionar classe fonts-loaded imediatamente para evitar piscadas no texto
    document.documentElement.classList.add('fonts-loaded');
  } else {
    // Primeira visita ou sessão expirada: carregar fontes
    loadFonts();
  }
})(window);
