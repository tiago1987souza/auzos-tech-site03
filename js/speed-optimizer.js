// Arquivo para otimização de velocidade de carregamento

// Função para observar imagens com lazy loading
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Carregar a imagem
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          // Carregar srcset se existir
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores antigos
    document.addEventListener('scroll', handleLazyLoad);
    window.addEventListener('resize', handleLazyLoad);
    window.addEventListener('orientationchange', handleLazyLoad);
    handleLazyLoad();
  }
}

// Manipulador de lazy loading para navegadores sem suporte a IntersectionObserver
function handleLazyLoad() {
  const lazyImages = document.querySelectorAll('img.lazy');
  if (lazyImages.length === 0) {
    document.removeEventListener('scroll', handleLazyLoad);
    window.removeEventListener('resize', handleLazyLoad);
    window.removeEventListener('orientationchange', handleLazyLoad);
    return;
  }
  
  // Verificar quais imagens estão visíveis
  lazyImages.forEach(img => {
    if (isInViewport(img)) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.classList.remove('lazy');
    }
  });
}

// Verificar se um elemento está na viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Executa quando o documento está pronto
document.addEventListener('DOMContentLoaded', function() {
  setupLazyLoading();
  
  // Prefetch de recursos que serão necessários mais tarde
  const prefetchLinks = [
    '/js/main.js',
    '/js/cart.js',
    '/js/graphics.js'
  ];
  
  prefetchLinks.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Adiar scripts não críticos
  setTimeout(() => {
    const deferScripts = document.querySelectorAll('script[data-defer]');
    deferScripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
      script.remove();
    });
  }, 2000);
});
