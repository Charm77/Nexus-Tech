// Main Application Controller
// NexusTech & Kingdom of Games Computer Parts E-Commerce Platform

document.addEventListener('DOMContentLoaded', () => {
  window.initApp();
});

window.initApp = function() {
  console.log("Initializing NexusTech Computer Parts E-Commerce System...");

  // Subscribe to store notifications
  store.subscribe('render', () => window.renderCurrentView());
  store.subscribe('cartUpdated', () => {
    window.NavbarComponent.render('navbar-mount');
    if (window.CartDrawerComponent.drawerEl && !window.CartDrawerComponent.drawerEl.classList.contains('hidden')) {
      window.CartDrawerComponent.render();
    }
  });
  store.subscribe('wishlistUpdated', () => {
    window.NavbarComponent.render('navbar-mount');
  });
  store.subscribe('currencyChanged', (curr) => {
    window.NavbarComponent.render('navbar-mount');
    window.renderCurrentView();
    if (window.CartDrawerComponent && window.CartDrawerComponent.drawerEl && !window.CartDrawerComponent.drawerEl.classList.contains('hidden')) {
      window.CartDrawerComponent.render();
    }
    if (window.ProductModalComponent && window.ProductModalComponent.modalEl && !window.ProductModalComponent.modalEl.classList.contains('hidden')) {
      window.ProductModalComponent.render();
    }
    window.showToast(`Currency set to ${curr === 'BDT' ? 'Bangladeshi Taka (৳)' : 'US Dollar ($)'}`);
  });
  store.subscribe('themeChanged', (th) => {
    window.NavbarComponent.render('navbar-mount');
    window.showToast(`Theme switched to ${th.toUpperCase()} mode!`);
  });

  // Render initial view
  window.renderCurrentView();

  // Initialize AI assistant container
  window.AiAssistantComponent.render('ai-assistant-mount');
};

window.renderCurrentView = function() {
  const isStore = store.view === 'store';

  // Always update Navbar
  window.NavbarComponent.render('navbar-mount');

  const storeContainer = document.getElementById('storefront-view');
  const adminContainer = document.getElementById('admin-view');

  if (isStore) {
    if (storeContainer) storeContainer.classList.remove('hidden');
    if (adminContainer) adminContainer.classList.add('hidden');

    // Render Storefront Components
    window.CategorySidebarComponent.render('category-sidebar-mount');
    window.HeroShowcaseComponent.render('hero-showcase-mount');
    window.DiscountSectionComponent.render('discount-section-mount');
    window.KingdomOfGamesComponent.render('kingdom-games-mount');
    window.ProductCatalogComponent.render('product-catalog-mount');
  } else {
    if (storeContainer) storeContainer.classList.add('hidden');
    if (adminContainer) adminContainer.classList.remove('hidden');

    // Render Admin Portal
    window.AdminPortalComponent.render('admin-view');
  }
};

// Navigation
window.navigateTo = function(viewName) {
  // Guard the hidden admin panel: only authenticated administrators may enter.
  if (viewName === 'admin' && !store.isAdmin()) {
    store.view = 'store';
    window.renderCurrentView();
    window.showToast('Administrator access only. Please sign in with an admin account.');
    window.openAuthModal();
    return;
  }
  store.view = viewName;
  window.renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleAdminPortal = function() {
  if (store.view === 'admin') {
    window.navigateTo('store');
    return;
  }
  if (!store.isAdmin()) {
    window.showToast('Administrator access only. Please sign in with an admin account.');
    window.openAuthModal();
    return;
  }
  window.navigateTo('admin');
};

// Category Filtering
window.selectCategory = function(slug) {
  store.activeCategory = slug;
  store.searchQuery = '';
  window.renderCurrentView();
  
  // Smooth scroll to catalog grid
  const grid = document.getElementById('catalog-grid-section');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth' });
  }

  // Close mobile drawer if open
  const mobileDrawer = document.getElementById('mobile-category-drawer');
  if (mobileDrawer) mobileDrawer.classList.add('hidden');
};

// Search Handlers
window.executeCatalogSearch = function(query) {
  store.searchQuery = query;
  window.renderCurrentView();
  const grid = document.getElementById('catalog-grid-section');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth' });
  }
};

window.clearSearchQuery = function() {
  store.searchQuery = '';
  ['navbar-search-input', 'navbar-search-input-mobile'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  if (window.NavbarComponent) window.NavbarComponent.setMobileSearchOpen(false);
  window.renderCurrentView();
};

// Catalog Filters
window.toggleBrandFilter = function(brand) {
  const idx = store.filters.brands.indexOf(brand);
  if (idx > -1) {
    store.filters.brands.splice(idx, 1);
  } else {
    store.filters.brands.push(brand);
  }
  window.ProductCatalogComponent.render('product-catalog-mount');
};

window.setPriceFilter = function(val, isDragging) {
  const maxPrice = parseFloat(val);
  store.filters.maxPrice = maxPrice;

  const catalog = window.ProductCatalogComponent;
  const slider = document.getElementById('price-range-slider');
  if (slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    slider.style.setProperty('--pct', ((maxPrice - min) / (max - min) * 100).toFixed(2) + '%');
  }

  const label = document.getElementById('price-range-value');
  if (label) label.textContent = store.formatPrice(maxPrice);

  const countEl = document.getElementById('price-range-count');
  if (countEl && catalog) {
    countEl.textContent = catalog.countAtPrice(maxPrice) + ' parts under ' + store.formatPrice(maxPrice);
  }

  // Re-rendering mid-drag replaces the slider element and kills the gesture,
  // so only the readouts update live; the grid refreshes when the user releases.
  if (isDragging) return;

  const hadFocus = document.activeElement && document.activeElement.id === 'price-range-slider';
  catalog.render('product-catalog-mount');
  if (hadFocus) {
    const fresh = document.getElementById('price-range-slider');
    if (fresh) fresh.focus();
  }
};

window.applyPricePreset = function(val) {
  const slider = document.getElementById('price-range-slider');
  if (slider) slider.value = val;
  window.setPriceFilter(val, false);
};

window.toggleInStockFilter = function(val) {
  store.filters.inStockOnly = val;
  window.ProductCatalogComponent.render('product-catalog-mount');
};

window.toggleGamingFilter = function(val) {
  store.filters.gamingOnly = val;
  window.ProductCatalogComponent.render('product-catalog-mount');
};

window.setCatalogSort = function(val) {
  store.filters.sortBy = val;
  window.ProductCatalogComponent.render('product-catalog-mount');
};

window.resetAllFilters = function() {
  store.filters = {
    brands: [],
    minPrice: 0,
    maxPrice: 4500,
    inStockOnly: false,
    gamingOnly: false,
    sortBy: 'recommended'
  };
  store.searchQuery = '';
  store.activeCategory = 'all';
  window.renderCurrentView();
};

// Product Detail Modal
window.openProductDetailModal = function(id) {
  window.ProductModalComponent.open(id);
};

window.closeProductModal = function() {
  window.ProductModalComponent.close();
};

window.switchProductDetailImage = function(url) {
  window.ProductModalComponent.setImage(url);
};

window.switchProductDetailTab = function(tab) {
  window.ProductModalComponent.setTab(tab);
};

window.adjustDetailQuantity = function(delta) {
  window.ProductModalComponent.adjustQuantity(delta);
};

window.addDetailToCart = function() {
  window.ProductModalComponent.addToCart();
};

// Quick Actions
window.quickAddToCart = function(id) {
  const p = store.getProductById(id);
  if (!p) return;
  if (p.stock === 0) {
    window.showToast('Sorry, this hardware component is currently out of stock!');
    return;
  }
  store.addToCart(id, 1);
  window.showToast(`Added 1x ${p.title.slice(0, 26)}... to Cart!`);
};

window.toggleWishlist = function(id) {
  const added = store.toggleWishlist(id);
  const p = store.getProductById(id);
  const title = p ? p.title.slice(0, 24) : 'Item';
  if (added) {
    window.showToast(`Added ${title}... to your Wishlist!`);
  } else {
    window.showToast(`Removed ${title}... from your Wishlist.`);
  }
  // Re-render mounts
  window.HeroShowcaseComponent.render('hero-showcase-mount');
  window.ProductCatalogComponent.render('product-catalog-mount');
};

window.moveAllWishlistToCart = function() {
  const items = store.getWishlistItems();
  items.forEach(item => {
    if (item.stock > 0) store.addToCart(item.id, 1);
  });
  store.wishlist = [];
  store.save('wishlist', store.wishlist);
  window.showToast('All in-stock wishlist hardware moved to cart!');
  window.UserAuthModalComponent.render();
  window.NavbarComponent.render('navbar-mount');
};

// Review Submission
window.submitProductReview = function(e, productId) {
  e.preventDefault();
  const authorInput = document.getElementById('review-author-input');
  const ratingInput = document.getElementById('review-rating-input');
  const commentInput = document.getElementById('review-comment-input');

  if (!authorInput || !ratingInput || !commentInput) return;

  store.addReview(productId, {
    author: authorInput.value.trim(),
    rating: parseInt(ratingInput.value),
    comment: commentInput.value.trim()
  });

  window.showToast('Thank you! Your product review has been published.');
  window.ProductModalComponent.render();
};

// Cart Drawer & Checkout Handlers
window.openCartDrawer = function() {
  window.CartDrawerComponent.open();
};

window.closeCartDrawer = function() {
  window.CartDrawerComponent.close();
};

window.updateCartQty = function(id, qty) {
  store.updateCartQuantity(id, qty);
  window.CartDrawerComponent.render();
};

window.removeFromCart = function(id) {
  store.removeFromCart(id);
  window.CartDrawerComponent.render();
  window.showToast('Item removed from cart.');
};

window.clearUserCart = function() {
  store.clearCart();
  window.CartDrawerComponent.render();
  window.showToast('Shopping cart emptied.');
};

window.applyCartCoupon = function() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const res = store.applyCoupon(input.value);
  window.showToast(res.message);
  window.CartDrawerComponent.render();
};

window.removeCartCoupon = function() {
  store.removeCoupon();
  window.CartDrawerComponent.render();
  window.showToast('Coupon removed.');
};

window.openCheckoutModal = function() {
  window.CheckoutModalComponent.open();
};

window.closeCheckoutModal = function() {
  window.CheckoutModalComponent.close();
};

window.proceedToStep2 = function(e) {
  e.preventDefault();
  window.CheckoutModalComponent.currentStep = 2;
  window.CheckoutModalComponent.render();
};

window.setPaymentMethod = function(method) {
  window.CheckoutModalComponent.selectedPaymentMethod = method;
  window.CheckoutModalComponent.render();
};

window.setShippingMethod = function(method) {
  window.CheckoutModalComponent.selectedShippingMethod = method;
};

window.executeFinalOrderPlacement = function() {
  const nameEl = document.getElementById('chk-name');
  const emailEl = document.getElementById('chk-email');
  const phoneEl = document.getElementById('chk-phone');
  const addrEl = document.getElementById('chk-address');

  const order = store.createOrder({
    customerName: nameEl ? nameEl.value : (store.currentUser ? store.currentUser.name : 'Valued Customer'),
    customerEmail: emailEl ? emailEl.value : (store.currentUser ? store.currentUser.email : 'customer@nexuspc.com'),
    phone: phoneEl ? phoneEl.value : '+880 1700-000346',
    shippingAddress: addrEl ? addrEl.value : 'House 251, Tejgaon Industrial Area, Dhaka',
    paymentMethod: 
      window.CheckoutModalComponent.selectedPaymentMethod === 'card' ? 'Credit / Debit Card (Visa)' :
      window.CheckoutModalComponent.selectedPaymentMethod === 'bkash' ? 'bKash / Mobile Financial Service' :
      window.CheckoutModalComponent.selectedPaymentMethod === 'paypal' ? 'PayPal Instant' : 'Cash on Delivery (COD)'
  });

  window.CheckoutModalComponent.lastCreatedOrder = order;
  window.CheckoutModalComponent.currentStep = 3;
  window.CheckoutModalComponent.render();
  window.showToast(`Order ${order.id} placed successfully!`);
};

window.printInvoice = function() {
  window.print();
};

// User Auth & Order History
window.openAuthModal = function() {
  window.UserAuthModalComponent.open();
};

window.closeUserModal = function() {
  window.UserAuthModalComponent.close();
};

window.openOrderHistoryModal = function() {
  window.UserAuthModalComponent.open('orders');
};

window.openWishlistDrawer = function() {
  window.UserAuthModalComponent.open('wishlist');
};

window.switchUserModalTab = function(tab) {
  window.UserAuthModalComponent.activeTab = tab;
  window.UserAuthModalComponent.render();
};

window.handleLoginForm = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  const res = store.login(email, pass);
  if (res.success) {
    window.showToast(`Welcome back, ${res.user.name}!`);
    window.NavbarComponent.render('navbar-mount');
    if (res.user.role === 'admin') {
      // Verified administrator — close modal and open the hidden admin panel.
      window.UserAuthModalComponent.close();
      window.navigateTo('admin');
      window.showToast('Administrator access granted. Opening dashboard...');
    } else {
      window.UserAuthModalComponent.activeTab = 'profile';
      window.UserAuthModalComponent.render();
    }
  } else {
    window.showToast(res.message);
  }
};

window.handleRegisterForm = function(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const password = document.getElementById('reg-password').value;

  const res = store.register({ name, email, phone, password });
  if (res.success) {
    window.showToast(`Account created! Welcome to NexusTech, ${res.user.name}.`);
    window.NavbarComponent.render('navbar-mount');
    // Role is verified after registration. New public accounts are customers;
    // only the seeded administrator account is granted panel access on login.
    window.UserAuthModalComponent.activeTab = 'profile';
    window.UserAuthModalComponent.render();
  } else {
    window.showToast(res.message);
  }
};

window.loginAsDemo = function(role) {
  store.switchRole(role);
  window.showToast(`Logged in as Demo ${role === 'admin' ? 'Administrator' : 'Customer'}!`);
  window.UserAuthModalComponent.render();
};

window.handleUserLogout = function() {
  store.logout();
  window.showToast('Logged out successfully.');
  window.UserAuthModalComponent.close();
};

// Store Locator
window.openStoreLocatorModal = function() {
  window.StoreLocatorComponent.open();
};

window.closeStoreLocatorModal = function() {
  window.StoreLocatorComponent.close();
};

window.selectStoreOutlet = function(id) {
  window.StoreLocatorComponent.selectStore(id);
};

// AI Assistant
window.toggleAiChat = function() {
  window.AiAssistantComponent.toggle();
};

window.openAiBotWithMessage = function(msg) {
  if (!window.AiAssistantComponent.isOpen) {
    window.AiAssistantComponent.toggle();
  }
  window.AiAssistantComponent.processUserMessage(msg);
};

window.askAiAboutProduct = function(productId) {
  const p = store.getProductById(productId);
  if (!p) return;
  window.closeProductModal();
  window.openAiBotWithMessage(`Can you analyze ${p.title}? What are the compatible motherboards, power supplies, and best use cases for it?`);
};

window.handleAiChatSubmit = function() {
  const input = document.getElementById('ai-user-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  window.AiAssistantComponent.processUserMessage(text);
};

window.sendQuickAiPrompt = function(promptText) {
  window.AiAssistantComponent.processUserMessage(promptText);
};

window.toggleAiSettingsModal = function() {
  const m = document.getElementById('ai-settings-modal');
  if (m) m.classList.toggle('hidden');
};

window.saveAiSettingsForm = function(e) {
  e.preventDefault();
  const keyEl = document.getElementById('cfg-gemini-key');
  const liveEl = document.getElementById('cfg-use-live');
  store.saveAiConfig({
    geminiApiKey: keyEl ? keyEl.value.trim() : '',
    useLiveApi: liveEl ? liveEl.checked : false
  });
  window.showToast('AI Assistant settings updated!');
  window.toggleAiSettingsModal();
  window.AiAssistantComponent.render('ai-assistant-mount');
};

// Kingdom of Games FPS switcher
window.switchKingdomGame = function(gameKey) {
  window.KingdomOfGamesComponent.switchGame(gameKey);
};

// Pre-Orders for Upcoming Products
window.reserveUpcomingPreOrder = function(id) {
  const email = store.currentUser ? store.currentUser.email : 'guest@seu.edu.bd';
  const res = store.reservePreOrder(id, email);
  window.showToast(res.message);
  window.AdminPortalComponent.render('admin-view');
};

// Admin Operations
window.switchAdminTab = function(tab) {
  window.AdminPortalComponent.setTab(tab);
};

window.openAddProductModal = function() {
  window.AdminModalsComponent.openProductModal();
};

window.openEditProductModal = function(id) {
  window.AdminModalsComponent.openProductModal(id);
};

window.confirmDeleteProduct = function(id) {
  window.AdminModalsComponent.openDeleteConfirm(id);
};

window.saveAdminProductForm = function(e, editId) {
  e.preventDefault();
  const title = document.getElementById('adm-p-title').value;
  const brand = document.getElementById('adm-p-brand').value;
  const category = document.getElementById('adm-p-category').value;
  const price = document.getElementById('adm-p-price').value;
  const origPrice = document.getElementById('adm-p-orig-price').value;
  const discount = document.getElementById('adm-p-discount').value;
  const stock = document.getElementById('adm-p-stock').value;
  const image = document.getElementById('adm-p-image').value;
  const desc = document.getElementById('adm-p-desc').value;
  const isGaming = document.getElementById('adm-p-gaming').checked;
  const isFeatured = document.getElementById('adm-p-featured').checked;
  const isLatest = document.getElementById('adm-p-latest').checked;

  const data = {
    title, brand, category, price,
    originalPrice: origPrice || price,
    discountPercent: discount || 0,
    stock, image, description: desc,
    isGaming, isFeatured, isLatest
  };

  if (editId) {
    store.updateProduct(editId, data);
    window.showToast(`Updated "${title}" successfully.`);
  } else {
    store.addProduct(data);
    window.showToast(`Added new hardware component: "${title}" to catalog!`);
  }

  window.AdminModalsComponent.close();
  window.AdminPortalComponent.render('admin-view');
};

window.openAddCategoryModal = function() {
  window.AdminModalsComponent.openCategoryModal();
};

window.saveAdminCategoryForm = function(e) {
  e.preventDefault();
  const name = document.getElementById('adm-c-name').value;
  const slug = document.getElementById('adm-c-slug').value;
  const icon = document.getElementById('adm-c-icon').value;

  store.addCategory({ name, slug, icon });
  window.showToast(`Created category "${name}"!`);
  window.AdminModalsComponent.close();
  window.AdminPortalComponent.render('admin-view');
};

// Mobile Drawer Toggles
window.toggleMobileCategoryDrawer = function() {
  let drawer = document.getElementById('mobile-category-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'mobile-category-drawer';
    drawer.className = 'fixed inset-0 z-50 hidden flex bg-slate-950/80 backdrop-blur-sm lg:hidden';
    document.body.appendChild(drawer);
  }

  drawer.innerHTML = `
    <div class="w-72 bg-slate-900 border-r border-slate-800 p-4 h-full overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <span class="font-gaming text-sm font-bold text-white">NEXUS CONTROL</span>
        <button onclick="document.getElementById('mobile-category-drawer').classList.add('hidden')" class="p-1 text-gray-400 hover:text-white">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <!-- Mobile Currency & Theme Settings -->
      <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700 mb-4 space-y-2.5 text-xs">
        <div class="flex items-center justify-between">
          <span class="text-gray-300 font-semibold flex items-center gap-1.5">
            <i class="fa-solid fa-coins text-cyan-400"></i> Currency:
          </span>
          <div class="flex items-center gap-1">
            <button onclick="store.setCurrency('USD'); window.toggleMobileCategoryDrawer();" class="px-2 py-0.5 rounded text-[11px] font-bold ${store.currency === 'USD' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400'}">USD ($)</button>
            <button onclick="store.setCurrency('BDT'); window.toggleMobileCategoryDrawer();" class="px-2 py-0.5 rounded text-[11px] font-bold ${store.currency === 'BDT' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400'}">BDT (৳)</button>
          </div>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-700/60">
          <span class="text-gray-300 font-semibold flex items-center gap-1.5">
            <i class="fa-solid fa-circle-half-stroke text-amber-400"></i> Theme:
          </span>
          <div class="flex items-center gap-1">
            <button onclick="store.setTheme('dark'); window.toggleMobileCategoryDrawer();" class="px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${store.theme === 'dark' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'text-gray-400'}"><i class="fa-solid fa-moon"></i> Dark</button>
            <button onclick="store.setTheme('light'); window.toggleMobileCategoryDrawer();" class="px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${store.theme === 'light' ? 'bg-amber-400/20 text-amber-500 border border-amber-400/30' : 'text-gray-400'}"><i class="fa-solid fa-sun"></i> Light</button>
          </div>
        </div>
      </div>

      <div class="text-[11px] font-tech font-bold uppercase tracking-wider text-gray-400 mb-2">Quick Links</div>
      <div class="space-y-1 mb-4">
        <button onclick="document.getElementById('mobile-category-drawer').classList.add('hidden'); window.navigateTo('store');" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-house text-cyan-400 w-4 text-center"></i> Home
        </button>
        <a href="#kingdom-games-section" onclick="document.getElementById('mobile-category-drawer').classList.add('hidden')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-gamepad text-purple-400 w-4 text-center"></i> Kingdom of Games
        </a>
        <a href="#discount-deals-section" onclick="document.getElementById('mobile-category-drawer').classList.add('hidden')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-bolt text-amber-400 w-4 text-center"></i> Flash Deals
        </a>
        <a href="#catalog-grid-section" onclick="document.getElementById('mobile-category-drawer').classList.add('hidden')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-boxes-stacked text-gray-400 w-4 text-center"></i> All Parts
        </a>
        <button onclick="document.getElementById('mobile-category-drawer').classList.add('hidden'); window.openStoreLocatorModal();" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-location-dot text-cyan-400 w-4 text-center"></i> Our Stores
        </button>
        <button onclick="document.getElementById('mobile-category-drawer').classList.add('hidden'); window.openOrderHistoryModal();" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-slate-800/60 transition">
          <i class="fa-solid fa-truck-fast text-emerald-400 w-4 text-center"></i> Track My Orders
        </button>
      </div>

      <div class="text-[11px] font-tech font-bold uppercase tracking-wider text-gray-400 mb-2">Hardware Categories</div>
      <div id="mobile-category-list-mount"></div>
    </div>
    <div class="flex-1" onclick="document.getElementById('mobile-category-drawer').classList.add('hidden')"></div>
  `;

  drawer.classList.toggle('hidden');
  if (!drawer.classList.contains('hidden')) {
    window.CategorySidebarComponent.render('mobile-category-list-mount');
  }
};

window.toggleMobileFilters = function() {
  const catalog = window.ProductCatalogComponent;
  if (catalog) catalog.mobileFiltersOpen = !catalog.mobileFiltersOpen;
  const f = document.getElementById('catalog-filters-container');
  if (f) f.classList.toggle('hidden');
};

// Toast Notifications Helper
window.showToast = function(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg px-4 py-3 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl text-xs text-white flex items-center gap-2.5 glass-panel max-w-sm';
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs">
      <i class="fa-solid fa-bell"></i>
    </div>
    <div class="flex-1 leading-snug">${msg}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
