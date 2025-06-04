// Cart Management for AZUOS TECH Website

// Cart Class
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.loadFromStorage();
    }    // Add item to cart
    addItem(product) {
        console.log('🛒 Adicionando item ao carrinho:', product);
        
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            console.log('📦 Item já existe, aumentando quantidade');
            existingItem.quantity += product.quantity || 1;
        } else {
            console.log('🆕 Novo item, adicionando à lista');
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: product.image || null,
                category: product.category || 'general'
            });
        }
        
        console.log('📊 Estado antes da atualização:', {
            items: this.items.length,
            total: this.total
        });
        
        this.updateTotal();
        this.saveToStorage();
        this.updateDisplay();
        this.showNotification(`${product.name} adicionado ao carrinho!`);
        
        console.log('✅ Item processado. Estado final:', {
            items: this.items.length,
            total: this.total,
            totalItems: this.getTotalItems()
        });
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveToStorage();
        this.updateDisplay();
        this.showNotification('Item removido do carrinho!', 'remove');
    }    // Update item quantity
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            // Validate quantity
            if (newQuantity <= 0) {
                this.removeItemWithConfirm(productId);
                return;
            }
            
            // Limit maximum quantity
            if (newQuantity > 999) {
                newQuantity = 999;
                this.showNotification('Quantidade máxima: 999 unidades', 'warning');
            }
            
            const oldQuantity = item.quantity;
            item.quantity = newQuantity;
            this.updateTotal();
            this.saveToStorage();
            this.updateDisplay();
            
            // Show quantity update notification
            const diff = newQuantity - oldQuantity;
            if (diff > 0) {
                this.showNotification(`Quantidade aumentada para ${newQuantity}`, 'update');
            } else {
                this.showNotification(`Quantidade diminuída para ${newQuantity}`, 'update');
            }
        }
    }

    // Remove item with confirmation
    removeItemWithConfirm(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const confirmRemoval = confirm(`Deseja remover "${item.name}" do carrinho?`);
            if (confirmRemoval) {
                this.removeItem(productId);
            }
        }
    }    // Clear entire cart
    clearCart() {
        if (this.items.length > 0) {
            const confirmClear = confirm('Deseja realmente limpar todo o carrinho?');
            if (!confirmClear) return;
        }
        
        this.items = [];
        this.total = 0;
        this.saveToStorage();
        this.updateDisplay();
        this.showNotification('Carrinho limpo!', 'clear');
    }    // Update total price
    updateTotal() {
        console.log('💰 Calculando total...');
        const oldTotal = this.total;
        this.total = this.items.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            console.log(`   ${item.name}: R$ ${item.price} x ${item.quantity} = R$ ${itemTotal.toFixed(2)}`);
            return sum + itemTotal;
        }, 0);
        console.log(`💰 Total: R$ ${oldTotal.toFixed(2)} → R$ ${this.total.toFixed(2)}`);
    }

    // Get total items count
    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Save to localStorage
    saveToStorage() {
        localStorage.setItem('azuos_cart', JSON.stringify({
            items: this.items,
            total: this.total,
            timestamp: Date.now()
        }));
    }

    // Load from localStorage
    loadFromStorage() {
        const savedCart = localStorage.getItem('azuos_cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                // Check if cart is less than 24 hours old
                const hoursSinceUpdate = (Date.now() - cartData.timestamp) / (1000 * 60 * 60);
                
                if (hoursSinceUpdate < 24) {
                    this.items = cartData.items || [];
                    this.updateTotal();
                } else {
                    // Clear old cart
                    this.clearCart();
                }
            } catch (error) {
                console.error('Error loading cart from storage:', error);
                this.clearCart();
            }
        }
    }    // Update cart display
    updateDisplay() {
        console.log('🔄 Atualizando display do carrinho...');
        this.updateCartCounter();
        this.updateCartSidebar();
        this.updateCartBadge();
        console.log('✅ Display atualizado');
    }    // Update cart counter in navigation
    updateCartCounter() {
        console.log('🔢 Atualizando contador do carrinho...');
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            console.log(`📊 Total de itens: ${totalItems}`);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            
            // Add bounce animation
            if (totalItems > 0) {
                cartCount.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    cartCount.style.animation = '';
                }, 600);
            }
            console.log('✅ Contador atualizado');
        } else {
            console.warn('⚠️ Elemento #cart-count não encontrado');
        }
    }

    // Update cart sidebar content
    updateCartSidebar() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                        <p style="color: var(--text-secondary); text-align: center;">Seu carrinho está vazio</p>
                        <button class="btn btn-primary" onclick="toggleCart()" style="margin-top: 1rem;">
                            <i class="fas fa-shopping-bag"></i>
                            Continuar Comprando
                        </button>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.items.map(item => this.renderCartItem(item)).join('');
            }
        }        if (cartTotal) {
            const totalElement = document.querySelector('.cart-total-amount #cart-total');
            const itemsCountElement = document.querySelector('.cart-items-count');
            
            // Update total amount
            if (totalElement) {
                totalElement.textContent = this.formatCurrency(this.total).replace('R$ ', '');
            } else {
                cartTotal.textContent = this.formatCurrency(this.total);
            }
            
            // Update items count display
            if (itemsCountElement) {
                const totalItems = this.getTotalItems();
                itemsCountElement.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
            }
            
            // Update footer summary
            this.updateCartFooterSummary();
        }
    }    // Render individual cart item
    renderCartItem(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-category">${this.formatCategory(item.category)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                title="Diminuir quantidade" ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="999" 
                               onchange="cartManager.updateQuantity('${item.id}', parseInt(this.value) || 1)"
                               onkeyup="cartManager.updateQuantity('${item.id}', parseInt(this.value) || 1)">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                title="Aumentar quantidade">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-subtotal">
                        <span class="subtotal-label">Subtotal:</span>
                        <span class="subtotal-value">${this.formatCurrency(item.price * item.quantity)}</span>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">
                        <span class="item-unit-price">Unidade: ${this.formatCurrency(item.price)}</span>
                        <span class="item-total-price">${this.formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    <button class="cart-item-remove" onclick="cartManager.removeItemWithConfirm('${item.id}')" 
                            title="Remover do carrinho">
                        <i class="fas fa-trash-alt"></i>
                        <span>Excluir</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Update cart badge (floating indicator)
    updateCartBadge() {
        let badge = document.querySelector('.cart-badge');
        
        if (this.getTotalItems() > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'cart-badge';
                document.body.appendChild(badge);
            }
            
            badge.innerHTML = `
                <div class="badge-content" onclick="toggleCart()">
                    <i class="fas fa-shopping-cart"></i>
                    <span>${this.getTotalItems()}</span>
                </div>
            `;
            badge.style.display = 'block';
        } else if (badge) {
            badge.style.display = 'none';
        }
    }    // Update cart footer summary
    updateCartFooterSummary() {
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter && this.items.length > 0) {
            const totalItems = this.getTotalItems();
            const itemsCountElement = document.querySelector('.cart-items-count');
            const totalAmountElement = document.querySelector('.cart-total-amount #cart-total');
            
            // Update items count
            if (itemsCountElement) {
                itemsCountElement.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
            }
            
            // Update total amount
            if (totalAmountElement) {
                totalAmountElement.textContent = this.formatCurrency(this.total).replace('R$ ', '');
            }
        } else if (cartFooter && this.items.length === 0) {
            // Reset to empty state
            const itemsCountElement = document.querySelector('.cart-items-count');
            const totalAmountElement = document.querySelector('.cart-total-amount #cart-total');
            
            if (itemsCountElement) {
                itemsCountElement.textContent = '0 itens';
            }
            
            if (totalAmountElement) {
                totalAmountElement.textContent = '0,00';
            }
        }
    }

    // Show notification
    showNotification(message, type = 'add') {
        const notification = document.createElement('div');
        notification.className = `cart-notification cart-notification-${type}`;
          const icons = {
            add: 'fas fa-check-circle',
            remove: 'fas fa-trash',
            clear: 'fas fa-broom',
            update: 'fas fa-edit',
            warning: 'fas fa-exclamation-triangle'
        };
        
        const colors = {
            add: 'var(--gradient-primary)',
            remove: 'linear-gradient(135deg, #ff6b35 0%, #ff4444 100%)',
            clear: 'linear-gradient(135deg, #6b73ff 0%, #9c27b0 100%)',
            update: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
            warning: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${icons[type]}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Apply styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type],
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            zIndex: '1003',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            minWidth: '300px',
            maxWidth: '400px'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Get cart summary
    getCartSummary() {
        return {
            items: this.items,
            totalItems: this.getTotalItems(),
            totalPrice: this.total,
            categories: this.getCategories(),
            isEmpty: this.items.length === 0
        };
    }

    // Get unique categories in cart
    getCategories() {
        const categories = new Set(this.items.map(item => item.category));
        return Array.from(categories);
    }

    // Apply discount code
    applyDiscount(code) {
        const discountCodes = {
            'AZUOS10': 0.1,
            'WELCOME': 0.05,
            'FIRST': 0.15
        };
        
        const discount = discountCodes[code.toUpperCase()];
        if (discount) {
            const discountAmount = this.total * discount;
            this.showNotification(`Desconto aplicado: ${this.formatCurrency(discountAmount)}`, 'add');
            return {
                valid: true,
                discount: discount,
                amount: discountAmount,
                newTotal: this.total - discountAmount
            };
        } else {
            this.showNotification('Código de desconto inválido', 'remove');
            return {
                valid: false,
                discount: 0,
                amount: 0,
                newTotal: this.total
            };
        }
    }

    // Calculate shipping
    calculateShipping(zipCode) {
        // Simplified shipping calculation
        // In a real application, this would integrate with shipping APIs
        const shippingRates = {
            'express': 15.90,
            'standard': 8.90,
            'economic': 5.90
        };
        
        // Simulate shipping calculation based on zip code
        const isLocalDelivery = zipCode && zipCode.startsWith('90'); // Porto Alegre area
        
        if (isLocalDelivery) {
            shippingRates.express = 12.90;
            shippingRates.standard = 6.90;
            shippingRates.economic = 3.90;
        }
        
        // Free shipping for orders over R$ 199
        if (this.total >= 199) {
            shippingRates.standard = 0;
            shippingRates.economic = 0;
        }
        
        return shippingRates;
    }

    // Validate cart before checkout
    validateCart() {
        const errors = [];
        
        if (this.items.length === 0) {
            errors.push('Carrinho está vazio');
        }
        
        if (this.total <= 0) {
            errors.push('Total do carrinho inválido');
        }
        
        // Check for invalid quantities
        this.items.forEach(item => {
            if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
                errors.push(`Quantidade inválida para ${item.name}`);
            }
        });
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    // Utility methods
    formatCurrency(value) {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }

    formatCategory(category) {
        const categoryNames = {
            'digital': 'Produto Digital',
            'service': 'Serviço',
            'graphic': 'Produto Gráfico',
            'course': 'Curso',
            'template': 'Template',
            'ebook': 'E-book'
        };
        
        return categoryNames[category] || 'Produto';
    }

    // Export cart data for checkout
    exportForCheckout() {
        const validation = this.validateCart();
        if (!validation.valid) {
            throw new Error(`Erro na validação do carrinho: ${validation.errors.join(', ')}`);
        }
        
        return {
            items: this.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            })),
            summary: {
                subtotal: this.total,
                totalItems: this.getTotalItems(),
                categories: this.getCategories()
            },
            timestamp: Date.now(),
            orderNumber: this.generateOrderNumber()
        };
    }

    generateOrderNumber() {
        const prefix = 'AZ';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    }
}

// Initialize cart manager
console.log('🚀 Inicializando CartManager...');
const cartManager = new ShoppingCart();

// Make cart manager globally available
window.cartManager = cartManager;

// Create global cart array for compatibility with legacy scripts
window.cart = cartManager.items;

console.log('✅ CartManager e array cart disponíveis globalmente');

// Update display on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM carregado, atualizando display do carrinho...');
    cartManager.updateDisplay();
    console.log('📊 Estado inicial:', {
        items: cartManager.items.length,
        total: cartManager.total,
        totalItems: cartManager.getTotalItems()
    });
});

// CSS for cart notifications and badge
const cartStyles = `
    <style>
        .cart-notification {
            font-family: 'Exo 2', sans-serif;
            display: flex;
            align-items: center;
            animation: slideInRight 0.3s ease;
        }
        
        .cart-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .cart-notification i {
            font-size: 1.2rem;
        }
        
        .cart-badge {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
            display: none;
        }
        
        .badge-content {
            background: var(--gradient-primary);
            color: white;
            border-radius: 50px;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            box-shadow: var(--shadow-primary);
            transition: all 0.3s ease;
            font-weight: bold;
        }
        
        .badge-content:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 50px rgba(0, 212, 255, 0.4);
        }
        
        .cart-item-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }
        
        .quantity-btn {
            width: 30px;
            height: 30px;
            border: none;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 0.8rem;
        }
        
        .quantity-btn:hover {
            background: var(--accent-color);
            transform: scale(1.1);
        }
        
        .quantity-display {
            min-width: 30px;
            text-align: center;
            font-weight: bold;
            color: var(--text-primary);
        }
        
        .cart-item-category {
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }
        
        .item-unit-price {
            font-size: 0.8rem;
            color: var(--text-secondary);
            display: block;
        }
        
        .item-total-price {
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .empty-cart {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            text-align: center;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .cart-badge {
                bottom: 80px;
            }
            
            .cart-notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', cartStyles);

// Global compatibility functions for legacy scripts
window.updateTotal = function() {
    if (window.cartManager) {
        window.cartManager.updateTotal();
        window.cartManager.updateDisplay();
        console.log('✅ updateTotal() executado via cartManager');
    } else {
        console.error('❌ CartManager não disponível');
    }
};

window.openCart = function() {
    if (typeof toggleCart === 'function') {
        toggleCart();
    } else {
        console.error('❌ Função toggleCart não encontrada');
    }
};

window.closeCart = function() {
    if (typeof toggleCart === 'function') {
        toggleCart();
    } else {
        console.error('❌ Função toggleCart não encontrada');
    }
};

window.clearCart = function() {
    if (window.cartManager) {
        window.cartManager.clearCart();
        console.log('✅ clearCart() executado via cartManager');
    } else {
        console.error('❌ CartManager não disponível');
    }
};

// Update global cart array whenever cartManager items change
const originalAddItem = cartManager.addItem.bind(cartManager);
const originalRemoveItem = cartManager.removeItem.bind(cartManager);
const originalUpdateQuantity = cartManager.updateQuantity.bind(cartManager);
const originalClearCart = cartManager.clearCart.bind(cartManager);

cartManager.addItem = function(product) {
    originalAddItem(product);
    window.cart = this.items; // Sync global cart array
};

cartManager.removeItem = function(productId) {
    originalRemoveItem(productId);
    window.cart = this.items; // Sync global cart array
};

cartManager.updateQuantity = function(productId, newQuantity) {
    originalUpdateQuantity(productId, newQuantity);
    window.cart = this.items; // Sync global cart array
};

cartManager.clearCart = function() {
    originalClearCart();
    window.cart = this.items; // Sync global cart array
};

console.log('✅ Funções de compatibilidade configuradas');
