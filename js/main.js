// Main JavaScript for AZUOS TECH Website

// Global Variables
let currentStep = 1;
let orderNumber = '';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    
    // Wait for cartManager to be initialized
    if (window.cartManager) {
        updateCartDisplay();
    } else {
        // Poll for cartManager availability
        const checkCartManager = setInterval(() => {
            if (window.cartManager) {
                updateCartDisplay();
                clearInterval(checkCartManager);
            }
        }, 10);
    }
});

// Initialize Website
function initializeWebsite() {
    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Generate order number
    orderNumber = generateOrderNumber();
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
    }
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Quantity Management
function changeQuantity(productId, change) {
    const qtyElement = document.getElementById(productId + '-qty');
    if (qtyElement) {
        let currentQty = parseInt(qtyElement.textContent);
        let newQty = currentQty + change;
        
        if (newQty < 1) newQty = 1;
        if (newQty > 99) newQty = 99;
        
        qtyElement.textContent = newQty;
    }
}

// Add to Cart Functions
function addToCart(id, name, price) {
    const item = {
        id: id,
        name: name,
        price: price,
        quantity: 1,
        category: 'services'
    };
    
    if (window.cartManager) {
        window.cartManager.addItem(item);
        console.log('✅ Item adicionado ao carrinho:', item);
    } else {
        console.error('❌ Cart manager não inicializado');
    }
}

function addToCartWithQuantity(id, name, price) {
    const qtyElement = document.getElementById(id + '-qty');
    const quantity = qtyElement ? parseInt(qtyElement.textContent) : 1;
    
    const item = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        category: 'products'
    };
    
    if (window.cartManager) {
        window.cartManager.addItem(item);
        console.log('✅ Item adicionado ao carrinho com quantidade:', item);
    } else {
        console.error('❌ Cart manager não inicializado');
    }
}

// Cart Display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!window.cartManager) {
        console.error('Cart manager not initialized');
        return;
    }
    
    const items = window.cartManager.items;
    
    // Update cart count
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart items
    if (cartItems) {
        if (items.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Carrinho vazio</p>';
        } else {
            cartItems.innerHTML = items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Quantidade: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = window.cartManager.total.toFixed(2).replace('.', ',');
    }
}

// Remove from Cart
function removeFromCart(id) {
    if (window.cartManager) {
        window.cartManager.removeItem(id);
        updateCartDisplay();
    } else {
        console.error('Cart manager not initialized');
    }
}

// Cart Toggle
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        
        // Prevent body scroll when cart is open
        if (cartSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Cart Storage
function saveCart() {
    localStorage.setItem('azuos_cart', JSON.stringify(cart));
}

function loadCart() {
    // This function is maintained for compatibility but cart is now managed by cartManager
    console.log('📦 loadCart() called - cart is now managed by cartManager');
    if (window.cartManager) {
        console.log('✅ CartManager disponível, dados carregados automaticamente');
    } else {
        console.warn('⚠️ CartManager ainda não inicializado');
    }
}

// Cart Notification
function showCartNotification(itemName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${itemName} adicionado ao carrinho!</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-primary);
        z-index: 1003;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Checkout Process
function proceedToCheckout() {
    console.log('🚀 proceedToCheckout chamada');
    
    // Aguardar DOM estar pronto
    if (document.readyState !== 'complete') {
        console.log('⏳ Aguardando DOM estar pronto...');
        setTimeout(proceedToCheckout, 100);
        return;
    }
    
    if (!window.cartManager) {
        console.error('❌ cartManager não inicializado');
        alert('Erro: Sistema de carrinho não inicializado. Recarregue a página.');
        return;
    }
    
    if (window.cartManager.items.length === 0) {
        console.log('🛒 Carrinho vazio');
        alert('Seu carrinho está vazio!');
        return;
    }
    
    console.log('📦 Carrinho:', window.cartManager.items);
    console.log('💰 Total:', window.cartManager.total);
    
    const checkoutModal = document.getElementById('checkout-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    console.log('🔍 Procurando elementos do modal...');
    console.log('  - checkout-modal:', checkoutModal ? '✅ Encontrado' : '❌ Não encontrado');
    console.log('  - modal-overlay:', modalOverlay ? '✅ Encontrado' : '❌ Não encontrado');
    
    if (checkoutModal && modalOverlay) {
        console.log('🎭 Abrindo modal...');
        
        // Verificar estilos antes
        const modalStyles = window.getComputedStyle(checkoutModal);
        console.log('🎨 Estilos antes:', {
            display: modalStyles.display,
            opacity: modalStyles.opacity,
            visibility: modalStyles.visibility
        });
        
        checkoutModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Verificar estilos depois
        setTimeout(() => {
            const modalStylesAfter = window.getComputedStyle(checkoutModal);
            console.log('🎨 Estilos depois:', {
                display: modalStylesAfter.display,
                opacity: modalStylesAfter.opacity,
                visibility: modalStylesAfter.visibility
            });
            console.log('📊 Classes do modal:', checkoutModal.className);
            console.log('📊 Classes do overlay:', modalOverlay.className);
        }, 100);
        
        // Reset to first step
        currentStep = 1;
        showStep(1);
        updateCheckoutTotal();
        
        console.log('✅ Modal configurado com sucesso');
    } else {
        console.error('❌ Elementos do modal não encontrados');
        
        // Debug adicional
        const allModals = document.querySelectorAll('[id*="modal"]');
        const allOverlays = document.querySelectorAll('[id*="overlay"]');
        console.log('🔍 Elementos com "modal" no ID:', allModals);
        console.log('🔍 Elementos com "overlay" no ID:', allOverlays);
        
        alert('Erro: Elementos do modal não encontrados. Verifique o console para mais detalhes.');
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (checkoutModal && modalOverlay) {
        checkoutModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showStep(step) {
    console.log(`🔄 showStep chamada para step ${step}`);
    
    // Hide all steps
    const allSteps = document.querySelectorAll('.checkout-step');
    console.log(`👁️ Encontrados ${allSteps.length} elementos .checkout-step`);
    
    allSteps.forEach((stepEl, index) => {
        stepEl.style.display = 'none';
        console.log(`   - Step ${index + 1} ocultado`);
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step-${step}`);
    console.log(`🎯 Procurando elemento step-${step}:`, currentStepEl ? '✅ Encontrado' : '❌ Não encontrado');
    
    if (currentStepEl) {
        currentStepEl.style.display = 'block';
        console.log(`✅ Step ${step} exibido`);
    } else {
        console.error(`❌ Elemento step-${step} não encontrado`);
        
        // Debug: listar todos os elementos step
        const stepElements = document.querySelectorAll('[id^="step-"]');
        console.log('🔍 Elementos step encontrados:', Array.from(stepElements).map(el => el.id));
    }
    
    // Update step indicators
    const stepIndicators = document.querySelectorAll('.step');
    console.log(`📊 Encontrados ${stepIndicators.length} indicadores de step`);
    
    stepIndicators.forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('active');
            console.log(`   - Indicador ${index + 1} ativado`);
        } else {
            stepEl.classList.remove('active');
            console.log(`   - Indicador ${index + 1} desativado`);
        }
    });
    
    console.log(`✅ showStep(${step}) concluído`);
}

function nextStep(step) {
    currentStep = step;
    showStep(step);
    
    // Generate order number when reaching step 3
    if (step === 3) {
        const orderNumberEl = document.getElementById('order-number');
        if (orderNumberEl) {
            const orderNumber = generateOrderNumber();
            orderNumberEl.textContent = orderNumber;
            
            // Update WhatsApp link with order details
            updateWhatsAppLink(orderNumber);        }
    }
}

// PIX Functions
function copyPixKey() {
    const pixKeyInput = document.getElementById('pix-key');
    if (pixKeyInput) {
        pixKeyInput.select();
        document.execCommand('copy');
        
        // Show feedback
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#22c55e';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'var(--primary-color)';
        }, 2000);
    }
}

// Generate Order Number
function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `AZ${timestamp}${random}`;
}

// Update Checkout Total
function updateCheckoutTotal() {
    if (!window.cartManager || window.cartManager.items.length === 0) return;
    
    // Update total in checkout modal if it exists
    const checkoutTotal = document.querySelector('.checkout-total');
    if (checkoutTotal) {
        checkoutTotal.textContent = `Total: ${formatCurrency(window.cartManager.total)}`;
    }
    
    // Generate order number when reaching step 3
    if (currentStep === 3) {
        const orderNumberEl = document.getElementById('order-number');
        if (orderNumberEl && !orderNumberEl.textContent) {
            orderNumberEl.textContent = generateOrderNumber();
        }
    }
}

// Update WhatsApp Link
function updateWhatsAppLink(orderNumber) {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn && window.cartManager && window.cartManager.items.length > 0) {
        let message = `Olá! Segue o comprovante do pedido #${orderNumber}%0A%0A`;
        message += `*PEDIDO:* ${orderNumber}%0A`;
        message += `*TOTAL:* ${formatCurrency(window.cartManager.total)}%0A%0A`;
        message += `*ITENS:*%0A`;
        
        window.cartManager.items.forEach(item => {
            message += `• ${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}%0A`;
        });        
        message += `%0APor favor, confirme o recebimento do pagamento!`;
        
        const whatsappNumber = '5551989916919';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        whatsappBtn.href = whatsappURL;
    }
}

// Utility Functions
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function formatPhone(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
}

// Search Functionality
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card, .service-card, .graphic-card');
    query = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3, h4').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter Products
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card, .service-card, .graphic-card');
    
    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Analytics (Placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Performance Monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    // Could send to error tracking service
});

// Initialize performance monitoring
measurePerformance();

// Make toggleCart globally available for onclick handlers
window.toggleCart = toggleCart;

// Export functions for global access
window.azuostech = {
    addToCart,
    addToCartWithQuantity,
    removeFromCart,
    toggleCart,
    changeQuantity,
    proceedToCheckout,
    closeCheckoutModal,
    nextStep,
    copyPixKey,
    searchProducts,
    filterProducts,
    trackEvent
};
