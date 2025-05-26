// Graphics Products Management for AZUOS TECH Website
// Based on ANS.com.br products with 50 reais markup

// Graphics products data (ANS.com.br + R$50)
const graphicsProducts = [
    // Cartões
    {
        id: 'cartao-visita-simples',
        name: 'Cartão de Visita Simples',
        description: 'Cartão de visita simples 8,5x4,7cm - 4x4 cores - 1000 unidades',
        price: 105.00,
        image: 'IMAGES/CARTAO-VISITA-SIMPLES.png',
        features: ['1000 unidades', '8,5x4,7cm', 'Supremo 250gr', '4x4 cores', 'Frente e verso'],
        category: 'cartoes'
    },
    {
        id: 'cartao-visita-economico',
        name: 'Cartão de Visita Econômico',
        description: 'Cartão de visita econômico 8,5x4,7cm - 4x0 - Impressão Digital',
        price: 68.00,
        image: 'IMAGES/CARTAO-VISITA-ECONOMICO.png',
        features: ['100 unidades', '8,5x4,7cm', 'Couchê Fosco 300gr', '4x0 cores', 'Digital'],
        category: 'cartoes'
    },
    
    // Banners
    {
        id: 'banner-lona-brilho',
        name: 'Banner em Lona Brilho',
        description: 'Banner em lona brilho 440g - Tamanho personalizável',
        price: 70.00,
        image: 'IMAGES/BANNER-LONA-BRILHO.png',
        features: ['Lona brilho 440g', 'Tamanho personalizado', 'M² a partir de', 'Alta qualidade'],
        category: 'banners'
    },
    {
        id: 'banner-lona-fosca',
        name: 'Banner em Lona Fosca Premium',
        description: 'Banner em lona fosca solid premium 60x90cm alta definição',
        price: 123.00,
        image: 'IMAGES/BANNER-LONA-FOSCA-PREMIUM.png',
        features: ['60x90cm', 'Lona fosca premium', 'Alta resolução', 'Sem trama'],
        category: 'banners'
    },
    {
        id: 'faixa-bixo',
        name: 'Faixa Bixo',
        description: 'Faixa bixo para formatura 50x150cm - Lona brilho 440g',
        price: 110.00,
        image: 'IMAGES/FAIXA-BIXO.png',
        features: ['50x150cm', 'Lona brilho 440g', 'Para formatura', 'Impressão 4x0'],
        category: 'banners'
    },
    {
        id: 'wind-banner-kit',
        name: 'Wind Banner Kit Completo',
        description: 'Wind banner kit - base + antena + tecido 73,5x206,9cm',
        price: 330.00,
        image: 'IMAGES/WIND-BANNER.png',
        features: ['Kit completo', '73,5x206,9cm', 'Tecido wide', 'Base + antena'],
        category: 'banners'
    },
    {
        id: 'wind-banner-tecido',
        name: 'Wind Banner Só Tecido',
        description: 'Wind banner somente a bandeira 73,5x206,9cm',
        price: 230.00,
        image: 'IMAGES/WIND-BANNER-2.png',
        features: ['Só o tecido', '73,5x206,9cm', 'Tecido wide', 'Impressão 4x0'],
        category: 'banners'
    },
    
    // Adesivos
    {
        id: 'adesivo-vinil-automotivo',
        name: 'Adesivo Vinil Automotivo',
        description: 'Adesivo vinil automotivo Oracal 3651 - impressão latex ultra',
        price: 163.50,
        image: 'IMAGES/ADESIVO-VINIL-AUTO.jpg',
        features: ['M² personalizado', 'Oracal 3651', 'Impressão latex', 'Para carros'],
        category: 'adesivos'
    },
    {
        id: 'adesivo-perfurado',
        name: 'Adesivo Perfurado',
        description: 'Adesivo perfurado - tamanho personalizável',
        price: 97.00,
        image: 'IMAGES/ADESIVO-PERFURADO.png',
        features: ['M² personalizado', 'Perfurado adesivo', 'Visibilidade', 'Resistente'],
        category: 'adesivos'
    },
    {
        id: 'adesivo-pisos',
        name: 'Adesivos para Pisos',
        description: 'Adesivos para pisos e mesas - tamanho personalizável',
        price: 77.00,
        image: 'IMAGES/ADESIVO-PISO.jpg',
        features: ['M² personalizado', 'Adesivo fosco', 'Para pisos', 'Resistente'],
        category: 'adesivos'
    },
    
    // Etiquetas
    {
        id: 'etiquetas-adesivas',
        name: 'Etiquetas Adesivas 9x9',
        description: 'Etiquetas adesivas redondas 9x9cm - 250 unidades',
        price: 270.00,
        image: 'IMAGES/ETIQUETAS-ADESIVAS.png',
        features: ['250 unidades', '9x9cm redondas', 'Adesivo brilho', 'Impressão 4x0'],
        category: 'etiquetas'
    },
    
    // Impressos
    {
        id: 'folder-couche',
        name: 'Folder Couchê Brilho',
        description: 'Folder couchê brilho 170gr - 15x21cm - 4x4 cores',
        price: 875.00,
        image: 'IMAGES/FOLDER-COUCHE-BRILHO.png',
        features: ['2500 unidades', '15x21cm', 'Couchê brilho 170gr', '4x4 cores'],
        category: 'impressos'
    },
    {
        id: 'folhas-timbradas',
        name: 'Folhas Timbradas',
        description: 'Folhas timbradas 21x29,7cm - Off-set 90gr',
        price: 170.00,
        image: 'IMAGES/FOLHAS-TIMBRADAS.png',
        features: ['50 unidades', '21x29,7cm', 'Off-set 90gr', 'Impressão 4x0'],
        category: 'impressos'
    },
    {
        id: 'impressao-a3',
        name: 'Impressão Digital A3+',
        description: 'Impressão digital A3+ 31,5x46cm - papel à escolher',
        price: 52.80,
        image: 'IMAGES/IMPRESSAO-A3.png',
        features: ['31,5x46cm', 'Papel à escolher', 'Digital', 'Impressão 4x0'],
        category: 'impressos'
    },
    {
        id: 'impressao-digital-gigante',
        name: 'Impressão Digital Gigante',
        description: 'Impressão digital gigante 88x31,5cm',
        price: 69.00,
        image: 'IMAGES/IMPRESSAO-DIGITAL-GIGANTE.jpg',
        features: ['88x31,5cm', 'Papel à escolher', 'Digital gigante', 'Alta resolução'],
        category: 'impressos'
    },
    
    // Embalagens
    {
        id: 'caixa-hamburger',
        name: 'Caixa de Hambúrguer',
        description: 'Embalagem para hambúrguer 12x12x8cm - Supremo 300gr',
        price: 135.00,
        image: 'IMAGES/CAIXA-HAMBURGUER.png',
        features: ['50 unidades', '12x12x8cm', 'Supremo 300gr', 'Automática'],
        category: 'embalagens'
    },
    {
        id: 'caixa-pizza-35cm',
        name: 'Caixa de Pizza 35cm',
        description: 'Caixa de pizza 35cm - 42,3x42,3cm - Cartão duplex',
        price: 247.00,
        image: 'IMAGES/CAIXA-PIZZA-35C.png',
        features: ['50 unidades', '42,3x42,3cm', 'Cartão duplex supera 350g', 'Pronta entrega'],
        category: 'embalagens'
    },
    {
        id: 'caixa-batatinha',
        name: 'Caixa de Batatinha',
        description: 'Caixa de batatinha 29,6x16cm - Supremo 250gr',
        price: 97.50,
        image: 'IMAGES/CAIXA-BATATINHA.png',
        features: ['50 unidades', '29,6x16cm', 'Supremo 250gr', 'Impressão 4x0'],
        category: 'embalagens'
    },
    {
        id: 'caixa-fatia-torta',
        name: 'Caixa Fatia de Torta',
        description: 'Caixa para fatia de torta 12x7x16,5cm',
        price: 135.00,
        image: 'IMAGES/CAIXA-FATIA-TORTA.png',
        features: ['50 unidades', '12x7x16,5cm', 'Duplex strong', 'Para doces'],
        category: 'embalagens'
    },
    {
        id: 'delivery-box-500ml',
        name: 'Delivery Box 500ml',
        description: 'Embalagem delivery M 500ml box antivazamento',
        price: 165.00,
        image: 'IMAGES/DELIVERY-BOX.png',
        features: ['50 unidades', '8,7x8,7x10,4cm', 'Duplex strong', 'Antivazamento'],
        category: 'embalagens'
    },
    {
        id: 'delivery-box-750ml',
        name: 'Delivery Box 750ml',
        description: 'Embalagem delivery G 750ml box antivazamento',
        price: 170.00,
        image: 'IMAGES/DELIVERY-BOX-750G.png',
        features: ['50 unidades', '9,9x9,9x11,9cm', 'Duplex strong', 'Grande'],
        category: 'embalagens'
    },
    {
        id: 'sacola-personalizada',
        name: 'Sacola Personalizada',
        description: 'Sacola personalizada 16x24,5x6cm - Supremo 250gr',
        price: 1696.50,
        image: 'IMAGES/SACOLA-PERSONALIZADA.png',
        features: ['500 unidades', '16x24cm', 'Supremo 250gr', 'Impressão 4x0'],
        category: 'embalagens'
    },
    
    // Decoração
    {
        id: 'papel-parede',
        name: 'Papel de Parede Fosco',
        description: 'Papel de parede adesivo vinil fosco - tamanho personalizável',
        price: 123.80,
        image: 'IMAGES/PAPEL-PAREDE-ADESIVO-VINIL-FOSCO.jpg',
        features: ['0,575x2,5m ou 3m', 'Adesivo vinil branco', 'Fosco premium', 'M² personalizado'],
        category: 'decoracao'
    },
    {
        id: 'foto-madeira-13x40',
        name: 'Foto na Madeira',
        description: 'Foto impressa na madeira - adesivo papel laminado BOPP',
        price: 85.32,
        image: 'IMAGES/FOTO-NA-MADEIRA.png',
        features: ['Tamanhos variados', 'MDF 6mm', 'Adesivo papel laminado BOPP', 'Personalizada'],
        category: 'decoracao'
    },
    {
        id: 'foto-madeira-2',
        name: 'Foto na Madeira Premium',
        description: 'Foto impressa na madeira premium - alta qualidade',
        price: 112.92,
        image: 'IMAGES/FOTO-MADEIRA-2.png',
        features: ['Tamanhos grandes', 'MDF premium', 'Impressão HD', 'Acabamento superior'],
        category: 'decoracao'
    },
    {
        id: 'quadro-canvas',
        name: 'Quadro Canvas',
        description: 'Quadro em tecido canvas com moldura',
        price: 122.50,
        image: 'IMAGES/QUADRO-CANVAS.png',
        features: ['Tamanhos variados', 'Canvas tecido', 'Com moldura', 'Alta qualidade'],
        category: 'decoracao'
    },
    {
        id: 'quadro-canvas-2',
        name: 'Quadro Canvas Premium',
        description: 'Quadro em tecido canvas premium com moldura especial',
        price: 198.00,
        image: 'IMAGES/QUADRO-CANVAS2.png',
        features: ['Tamanhos grandes', 'Canvas premium', 'Moldura especial', 'Qualidade superior'],
        category: 'decoracao'
    },
    
    // Outros
    {
        id: 'ima-geladeira',
        name: 'Imã de Geladeira',
        description: 'Imã personalizado 5x4cm - 1000 unidades',
        price: 270.00,
        image: 'IMAGES/IMA-GELADEIRA.png',
        features: ['1000 unidades', '5x4cm', 'Supremo 250gr', 'Impressão 4x0'],
        category: 'outros'
    },
    {
        id: 'cracha-pvc',
        name: 'Crachá em PVC',
        description: 'Crachá em PVC 0.7mm - 8,5x5,4cm com bordas arredondadas',
        price: 64.00,
        image: 'IMAGES/CRACHA-PVC.png',
        features: ['8,6x5,4cm', 'PVC 0.7mm', 'Bordas arredondadas', 'Frente 4x0'],
        category: 'outros'
    },
    {
        id: 'calendario-parede',
        name: 'Calendário de Parede 2025',
        description: 'Calendário de parede 2025 - 30x46cm - Supremo 300gr',
        price: 230.00,
        image: 'IMAGES/CALENDARIO-PAREDE.png',
        features: ['50 unidades', '30x46cm', 'Supremo 300gr', 'Impressão 4x0'],
        category: 'outros'
    },
    {
        id: 'revista-catalogo',
        name: 'Revista/Catálogo',
        description: 'Revista P - 8 páginas - 14x20cm - couchê brilho 115gr',
        price: 1030.00,
        image: 'IMAGES/REVISTA-CATALOGO.png',
        features: ['500 unidades', '14x20cm', '8 páginas', 'Couchê brilho 115gr'],
        category: 'outros'
    },
    {
        id: 'pasta-inteligente',
        name: 'Pasta Inteligente',
        description: 'Pasta inteligente 43x30.5cm com bolsa de encaixe',
        price: 1040.00,
        image: 'IMAGES/PASTA-INTELIGENTE.png',
        features: ['250 unidades', '43x30.5cm', 'Supremo 250gr', 'Bolsa de encaixe'],
        category: 'outros'
    },
    {
        id: 'bloco-15x21',
        name: 'Bloco Personalizado',
        description: 'Bloco 15x21cm - 50 folhas - 1 via - Off-set 90gr',
        price: 227.10,
        image: 'IMAGES/BLOCO.png',
        features: ['5 unidades', '15x21cm', '50 folhas', 'Off-set 90gr'],
        category: 'outros'
    },
    {
        id: 'caderno-capa-dura',
        name: 'Caderno Capa Dura',
        description: 'Caderno com capa dura personalizável 20x27,5cm',
        price: 103.50,
        image: 'IMAGES/CADERNO-CAPA-DURA.png',
        features: ['20x27,5cm', 'Capa dura', 'Miolo offset 75g', 'Wire-o'],
        category: 'outros'
    },
    {
        id: 'cardapio-plastificacao',
        name: 'Cardápio com Plastificação',
        description: 'Cardápio com plastificação dura (polaseal) 21x30cm',
        price: 196.00,
        image: 'IMAGES/CARDAPIO-PLASTIFICADO.png',
        features: ['10 unidades', '21x30cm', 'Off-set 180g', 'Plastificação dura'],
        category: 'outros'
    },
    {
        id: 'foto-gigante',
        name: 'Foto Gigante',
        description: 'Foto gigante 88x31,5cm - papel à escolher',
        price: 69.00,
        image: 'IMAGES/FOTO-GIGANTE.jpg',
        features: ['88x31,5cm', 'Papel à escolher', 'Grande formato', 'Impressão 4x0'],
        category: 'outros'
    },
    {
        id: 'dtf-textil',
        name: 'DTF Têxtil',
        description: 'DTF têxtil 58x30cm para impressão em tecidos',
        price: 94.00,
        image: 'IMAGES/DTF-TEXTIL.jpeg',        features: ['58x30cm', 'DTF têxtil', 'Para tecidos', 'Alta qualidade'],
        category: 'outros'
    }
];

// Load graphics products into the page
function loadGraphicsProducts() {
    console.log('🎨 Loading graphics products...');
    const container = document.getElementById('graphics-grid');
    if (!container) {
        console.error('❌ Graphics grid container not found!');
        return;
    }
    
    console.log('📦 Found', graphicsProducts.length, 'graphics products to load');

    container.innerHTML = graphicsProducts.map(product => {
        // Check if image is a file path or FontAwesome icon
        const isImageFile = product.image && (product.image.includes('.jpg') || product.image.includes('.png') || product.image.includes('.jpeg'));
        
        const imageHtml = isImageFile 
            ? `<div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     style="width:100%; height:200px; object-fit:cover; border-radius:12px; 
                            border: 2px solid rgba(0, 212, 255, 0.2); transition: all 0.3s ease;">
               </div>`
            : `<div class="product-icon-container">
                <i class="${product.image}" style="font-size:4rem; color:#007bff;"></i>
               </div>`;

        return `
        <div class="graphic-card" data-aos="fade-up" data-category="${product.category}">
            <div class="graphic-icon">
                ${imageHtml}
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="graphic-features">
                ${product.features.map(feature => `<span>${feature}</span>`).join('')}
            </div>
            <div class="graphic-pricing">
                <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <div class="quantity-selector">
                    <button onclick="changeQuantity('${product.id}', -1)">-</button>
                    <span id="${product.id}-qty">1</span>
                    <button onclick="changeQuantity('${product.id}', 1)">+</button>
                </div>
            </div>
            <button class="btn btn-primary" onclick="addToCartWithQuantity('${product.id}', '${product.name}', ${product.price})">
                <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
            </button>
        </div>
        `;
    }).join('');
}

// Category filter functionality
function filterGraphics(category) {
    const cards = document.querySelectorAll('.graphic-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize graphics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGraphicsProducts();
      // Add filter buttons if they don't exist
    const graphicsSection = document.getElementById('graphics');
    if (graphicsSection && !document.querySelector('.graphics-filters')) {
        const filtersHtml = `
            <div class="graphics-filters">
                <button class="filter-btn active" onclick="filterGraphics('all')">Todos</button>
                <button class="filter-btn" onclick="filterGraphics('cartoes')">Cartões</button>
                <button class="filter-btn" onclick="filterGraphics('banners')">Banners</button>
                <button class="filter-btn" onclick="filterGraphics('adesivos')">Adesivos</button>
                <button class="filter-btn" onclick="filterGraphics('etiquetas')">Etiquetas</button>
                <button class="filter-btn" onclick="filterGraphics('impressos')">Impressos</button>
                <button class="filter-btn" onclick="filterGraphics('embalagens')">Embalagens</button>
                <button class="filter-btn" onclick="filterGraphics('decoracao')">Decoração</button>
                <button class="filter-btn" onclick="filterGraphics('outros')">Outros</button>
            </div>
        `;
        
        const container = document.querySelector('.container');
        const sectionHeader = container.querySelector('.section-header');
        sectionHeader.insertAdjacentHTML('afterend', filtersHtml);
    }
});