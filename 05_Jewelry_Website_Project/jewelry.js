// Products database matching the mockup items & high resolution assets
const productsData = [
  {
    id: 1,
    name: "Product 1 - Sterling Silver Cuff",
    price: 99.99,
    category: "Bracelets",
    image: "jewelry_images/jewelry_bracelet_list_1786964963824.png",
    description: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isFeatured: true
  },
  {
    id: 2,
    name: "Product 2 - Gold Crystal Earrings",
    price: 99.99,
    category: "Earrings",
    image: "jewelry_images/jewelry_gold_earrings_1786964988189.png",
    description: "Exquisite gold hoop earrings crafted with high-precision clear crystal stone settings.",
    isFeatured: false
  },
  {
    id: 3,
    name: "Product 3 - Rose Gold Quartz Set",
    price: 99.99,
    category: "Necklaces",
    image: "jewelry_images/jewelry_pink_set_1786965043936.png",
    description: "Elegant rose gold pendant necklace featuring fine pink quartz gem and matching stud earrings.",
    isFeatured: false
  },
  {
    id: 4,
    name: "Product 4 - Diamond Drop Earrings",
    price: 99.99,
    category: "Earrings",
    image: "jewelry_images/jewelry_diamond_earrings_1786965292484.png",
    description: "Radiant dangling teardrop diamond earrings designed for timeless evening sophistication.",
    isFeatured: false
  },
  {
    id: 5,
    name: "Product 5 - Aquamarine Sapphire Set",
    price: 99.99,
    category: "Necklaces",
    image: "jewelry_images/jewelry_blue_set_1786965573644.png",
    description: "Royal aquamarine blue crystal statement necklace with handcrafted matching drop earrings.",
    isFeatured: false
  }
];

// Shopping Cart State
let cart = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initCartEvents();
  initHeroSlider();
  initQuickViewModal();
  initSearch();
});

// Cart Functions
function initCartEvents() {
  const cartBtn = document.getElementById('cart-icon-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-btn');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => openCart());
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => closeCart());
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => closeCart());
  }
}

function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Added "${product.name}" to cart!`);
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-count-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  // Update badge count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalItems;

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotalAmount) cartTotalAmount.textContent = `$${totalPrice.toFixed(2)}`;

  // Render items
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-empty-msg">Your shopping cart is empty.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">&times;</button>
    </div>
  `).join('');
}

// Hero Carousel Slider
function initHeroSlider() {
  const dots = document.querySelectorAll('.hero-pagination-dots .dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

// Quick View Modal
function initQuickViewModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay?.classList.remove('open');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }
}

function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById('modal-overlay');
  const modalImg = document.getElementById('modal-product-img');
  const modalTitle = document.getElementById('modal-product-title');
  const modalPrice = document.getElementById('modal-product-price');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalAddBtn = document.getElementById('modal-add-btn');

  if (modalImg) modalImg.src = product.image;
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalPrice) modalPrice.textContent = `$${product.price.toFixed(2)}`;
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addToCart(product.id);
      modalOverlay?.classList.remove('open');
    };
  }

  modalOverlay?.classList.add('open');
}

// Search Filter
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    filterProducts(term);
  });
}

function filterProducts(term) {
  const cards = document.querySelectorAll('.grid-product-card, .list-product-card');
  cards.forEach(card => {
    const name = card.querySelector('.product-name, .grid-product-name')?.textContent.toLowerCase() || '';
    if (name.includes(term)) {
      card.style.display = 'flex';
      if (card.classList.contains('list-product-card')) card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}

// Toast Alert
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
