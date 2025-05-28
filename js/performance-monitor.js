/**
 * Performance Monitoring para AZUOS TECH
 * Este script coleta métricas Web Vitals para análise de desempenho do site
 */

(function() {
  // Apenas execute se a API de Performance estiver disponível
  if (!('performance' in window) || !performance.timing) {
    console.warn('API de Performance não disponível neste navegador');
    return;
  }
  
  // Coletar Web Vitals quando o documento estiver completamente carregado
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Tempo até interatividade (TTI)
      const tti = performance.timing.domInteractive - performance.timing.navigationStart;
      
      // Tempo até o primeiro byte (TTFB)
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      
      // Tempo de carregamento da página
      const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      // Tempo de renderização do DOM
      const domRenderTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

      // Exibir métricas no console para desenvolvimento
      console.log('📊 Performance Metrics:');
      console.log('Time to First Byte (TTFB):', ttfb + 'ms');
      console.log('DOM Interactive (TTI):', tti + 'ms');
      console.log('DOM Content Loaded:', domRenderTime + 'ms');
      console.log('Page Load Complete:', pageLoadTime + 'ms');
      
      // Armazenar métricas para uso futuro ou envio para analytics
      const performanceMetrics = {
        ttfb: ttfb,
        tti: tti,
        domRenderTime: domRenderTime,
        pageLoadTime: pageLoadTime,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };
      
      // Salvar no localStorage para análise futura
      try {
        // Obter métricas anteriores ou inicializar um array vazio
        let storedMetrics = JSON.parse(localStorage.getItem('azuos_performance_metrics') || '[]');
        
        // Manter apenas as últimas 10 entradas
        if (storedMetrics.length >= 10) {
          storedMetrics.shift();
        }
        
        // Adicionar métricas atuais
        storedMetrics.push(performanceMetrics);
        
        // Salvar métricas atualizadas
        localStorage.setItem('azuos_performance_metrics', JSON.stringify(storedMetrics));
      } catch (e) {
        console.error('Erro ao salvar métricas de performance:', e);
      }
      
      // Verificar se precisa enviar alerta de problemas de performance
      if (pageLoadTime > 3000) { // alerta se tempo de carregamento > 3 segundos
        console.warn('⚠️ Alerta: Tempo de carregamento de página acima do recomendado');
      }
      
    }, 0);
  });
  
  // Monitorar erros de recursos
  window.addEventListener('error', function(e) {
    if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
      console.error('Erro no carregamento de recurso:', e.target.src || e.target.href);
    }
  }, true);
})();
