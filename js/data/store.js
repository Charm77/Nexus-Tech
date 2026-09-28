// Reactive Data Store with LocalStorage Persistence
// NexusTech / Kingdom of Games Computer Parts E-Commerce Store

class Store {
  constructor() {
    this.STORAGE_KEY_PREFIX = 'nexustech_';
    // Fixed hidden administrator credentials (verified on login only).
    this.ADMIN_CREDENTIALS = {
      id: 'user-admin',
      name: 'NexusTech Administrator',
      email: 'admin@nexuspc.com',
      password: 'Admin@123',
      role: 'admin'
    };
    this.listeners = new Map();
    this.init();
  }

  init() {
    // 1. Products & Categories Loading with 1,500 Catalog Synchronization
    const CATALOG_VERSION = '2026.1500_PRODUCTS_V2';
    const savedVersion = this.load('catalog_version', null);
    const savedProducts = this.load('products', null);

    if (!savedProducts || savedVersion !== CATALOG_VERSION || savedProducts.length < 1500) {
      this.products = [...initialProducts];
      this.save('products', this.products);
      this.categories = [...initialCategories];
      this.save('categories', this.categories);
      this.save('catalog_version', CATALOG_VERSION);
    } else {
      this.products = savedProducts;
      this.categories = this.load('categories', initialCategories);
    }
    // 3. Upcoming Products
    this.upcoming = this.load('upcoming', initialUpcomingProducts);
    // 4. Cart
    this.cart = this.load('cart', []);
    this.coupon = this.load('coupon', null);
    // 5. Wishlist
    this.wishlist = this.load('wishlist', ['prod-gpu-4090', 'prod-ssd-samsung-990']);
    // 6. Users & Current User
    this.users = this.load('users', initialUsers);
    // Guarantee the hidden administrator account always exists with fixed credentials,
    // regardless of stale localStorage state. Admin access is verified on login only.
    this.bootstrapAdmin();
    // Require explicit login/registration. No auto-seeded demo session.
    this.currentUser = this.load('currentUser', null);
    // 7. Orders
    this.orders = this.load('orders', initialOrders);
    // 8. Reviews
    this.reviews = this.load('reviews', initialReviews);
    // 9. Store Locations
    this.stores = this.load('stores', initialStores);
    // 10. Trending Searches
    this.trendingSearches = initialTrendingSearches;
    // 11. Currency, Theme & Display Settings
    this.currency = this.load('currency', 'USD'); // USD or BDT
    this.bdtRate = 122.5; // 1 USD = 122.5 BDT
    this.theme = this.load('theme', 'dark'); // 'dark' or 'light'
    this.applyTheme();
    // 12. Active View State
    this.view = 'store'; // 'store', 'admin', 'profile', 'checkout', 'orders'
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.filters = {
      brands: [],
      minPrice: 0,
      maxPrice: 4500,
      inStockOnly: false,
      gamingOnly: false,
      sortBy: 'recommended'
    };
    // 13. AI Settings
    this.aiConfig = this.load('aiConfig', {
      geminiApiKey: '',
      model: 'gemini-1.5-flash',
      useLiveApi: false
    });
    this.aiChatHistory = this.load('aiChatHistory', [
      {
        sender: 'assistant',
        text: "👋 Welcome to NexusTech & Kingdom of Games! I'm your AI Hardware Specialist. Tell me your budget, target games, or ask if components like RTX 4070 or Ryzen 7 are compatible!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }

  // Local Storage Helpers
  load(key, fallback) {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_PREFIX + key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Failed to load ${key} from localStorage:`, e);
      return fallback;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(this.STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to save ${key} to localStorage:`, e);
    }
  }

  // Pub/Sub Event System
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event);
      const idx = arr.indexOf(callback);
      if (idx > -1) arr.splice(idx, 1);
    };
  }

  notify(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb({ event, data }));
    }
  }

  // Currency Formatter
  formatPrice(usdAmount) {
    const num = Number(usdAmount) || 0;
    if (this.currency === 'BDT') {
      const bdt = Math.round(num * this.bdtRate);
      return `৳${bdt.toLocaleString('en-US')}`;
    }
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  setCurrency(curr) {
    this.currency = curr;
    this.save('currency', curr);
    this.notify('currencyChanged', curr);
    this.notify('render');
  }

  // Theme Management
  setTheme(theme) {
    this.theme = theme === 'light' ? 'light' : 'dark';
    this.save('theme', this.theme);
    this.applyTheme();
    this.notify('themeChanged', this.theme);
    this.notify('render');
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  applyTheme() {
    const html = document.documentElement;
    const body = document.body;
    // Disable all transitions/animations for the swap so the theme changes instantly
    // (no laggy cross-fade across every element on the page).
    html.classList.add('theme-switching');
    if (this.theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
      if (body) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
      }
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      if (body) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
      }
    }
    // Force the new colors to commit while transitions are disabled, then re-enable.
    void html.offsetWidth;
    html.classList.remove('theme-switching');
  }

  // Product Management (Customer & Admin CRUD)
  getAllProducts() {
    return [...this.products];
  }

  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  addProduct(productData) {
    const newProduct = {
      id: 'prod-' + Date.now(),
      title: productData.title || 'Untitled Product',
      brand: productData.brand || 'Nexus Brand',
      category: productData.category || 'cpu',
      price: parseFloat(productData.price) || 99.99,
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : parseFloat(productData.price),
      discountPercent: productData.discountPercent ? parseInt(productData.discountPercent) : 0,
      stock: parseInt(productData.stock) || 10,
      isFeatured: !!productData.isFeatured,
      isLatest: !!productData.isLatest,
      isBestSeller: !!productData.isBestSeller,
      isGaming: !!productData.isGaming,
      gamingTier: productData.gamingTier || (productData.isGaming ? 'Gamer Certified' : ''),
      rating: 5.0,
      reviewCount: 0,
      image: productData.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      gallery: productData.gallery || [productData.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'],
      description: productData.description || 'High quality computer hardware component.',
      specs: productData.specs || { 'Model': productData.title },
      compatibilityNote: productData.compatibilityNote || 'Standard ATX / PC compatible.',
      benchmarks: productData.benchmarks || {}
    };

    this.products.unshift(newProduct);
    this.save('products', this.products);
    this.updateCategoryCounts();
    this.notify('productsUpdated', this.products);
    this.notify('render');
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...updatedFields };
      this.save('products', this.products);
      this.updateCategoryCounts();
      this.notify('productsUpdated', this.products);
      this.notify('render');
      return this.products[idx];
    }
    return null;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.save('products', this.products);
    this.updateCategoryCounts();
    this.notify('productsUpdated', this.products);
    this.notify('render');
  }

  quickRestock(id, amount = 10) {
    const prod = this.getProductById(id);
    if (prod) {
      prod.stock += amount;
      this.save('products', this.products);
      this.notify('productsUpdated', this.products);
      this.notify('render');
    }
  }

  updateCategoryCounts() {
    this.categories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = this.products.length;
      } else {
        cat.count = this.products.filter(p => p.category === cat.id).length;
      }
    });
    this.save('categories', this.categories);
  }

  // Category CRUD
  addCategory(categoryData) {
    const newCat = {
      id: categoryData.slug || ('cat-' + Date.now()),
      name: categoryData.name,
      slug: categoryData.slug || ('cat-' + Date.now()),
      icon: categoryData.icon || 'fa-solid fa-microchip',
      count: 0
    };
    this.categories.push(newCat);
    this.save('categories', this.categories);
    this.notify('categoriesUpdated', this.categories);
    this.notify('render');
    return newCat;
  }

  deleteCategory(catId) {
    if (catId === 'all') return;
    this.categories = this.categories.filter(c => c.id !== catId);
    this.save('categories', this.categories);
    this.notify('categoriesUpdated', this.categories);
    this.notify('render');
  }

  // Cart Management
  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return false;

    const existingIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      const currentQty = this.cart[existingIndex].quantity;
      const newQty = Math.min(currentQty + quantity, product.stock);
      this.cart[existingIndex].quantity = newQty;
    } else {
      this.cart.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: Math.min(quantity, product.stock)
      });
    }

    this.save('cart', this.cart);
    this.notify('cartUpdated', this.cart);
    this.notify('renderCartBadge');
    return true;
  }

  updateCartQuantity(productId, quantity) {
    const item = this.cart.find(i => i.productId === productId);
    const product = this.getProductById(productId);
    if (!item) return;

    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const maxStock = product ? product.stock : 99;
    item.quantity = Math.min(quantity, maxStock);
    this.save('cart', this.cart);
    this.notify('cartUpdated', this.cart);
    this.notify('renderCartBadge');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.save('cart', this.cart);
    this.notify('cartUpdated', this.cart);
    this.notify('renderCartBadge');
  }

  clearCart() {
    this.cart = [];
    this.coupon = null;
    this.save('cart', this.cart);
    this.save('coupon', null);
    this.notify('cartUpdated', this.cart);
    this.notify('renderCartBadge');
  }

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'TECH10') {
      this.coupon = { code: 'TECH10', type: 'percent', value: 10, description: '10% University Tech Special Discount' };
      this.save('coupon', this.coupon);
      this.notify('cartUpdated', this.cart);
      return { success: true, message: '🎉 Coupon TECH10 applied: 10% discount!' };
    } else if (cleanCode === 'GAMER50') {
      this.coupon = { code: 'GAMER50', type: 'fixed', value: 50, description: `${this.formatPrice(50)} Kingdom of Games Discount` };
      this.save('coupon', this.coupon);
      this.notify('cartUpdated', this.cart);
      return { success: true, message: `🎉 Coupon GAMER50 applied: ${this.formatPrice(50)} off order!` };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try TECH10 or GAMER50!' };
    }
  }

  removeCoupon() {
    this.coupon = null;
    this.save('coupon', null);
    this.notify('cartUpdated', this.cart);
  }

  getCartTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (this.coupon) {
      if (this.coupon.type === 'percent') {
        discount = (subtotal * this.coupon.value) / 100;
      } else if (this.coupon.type === 'fixed') {
        discount = Math.min(this.coupon.value, subtotal);
      }
    }
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.05; // 5% VAT
    const shipping = subtotal > 150 ? 0 : (subtotal === 0 ? 0 : 9.99);
    const total = Math.max(0, taxableAmount + tax + shipping);

    return {
      subtotal,
      discount,
      coupon: this.coupon,
      tax,
      shipping,
      total
    };
  }

  // Wishlist
  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    let added = false;
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      added = false;
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.save('wishlist', this.wishlist);
    this.notify('wishlistUpdated', this.wishlist);
    this.notify('renderWishlistBadge');
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistItems() {
    return this.wishlist.map(id => this.getProductById(id)).filter(Boolean);
  }

  // Order Management
  createOrder(orderData) {
    const totals = this.getCartTotals();
    const newOrder = {
      id: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
      customerName: orderData.customerName || (this.currentUser ? this.currentUser.name : 'Valued Customer'),
      customerEmail: orderData.customerEmail || (this.currentUser ? this.currentUser.email : 'customer@nexuspc.com'),
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Placed',
      trackingStep: 1, // 1: Placed, 2: Processing, 3: Shipped, 4: Delivered
      shippingMethod: orderData.shippingMethod || 'Standard Delivery (2-3 Days)',
      shippingAddress: orderData.shippingAddress || 'House 12, Road 5, Dhaka',
      phone: orderData.phone || '+880 1700-000000',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (Pay on Arrival)' : 'Paid Online',
      items: this.cart.map(item => ({ ...item })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shippingFee: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      notes: orderData.notes || ''
    };

    // Deduct stock
    this.cart.forEach(cartItem => {
      const prod = this.getProductById(cartItem.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - cartItem.quantity);
      }
    });
    this.save('products', this.products);

    // Save order
    this.orders.unshift(newOrder);
    this.save('orders', this.orders);

    // Update user stats
    if (this.currentUser) {
      this.currentUser.ordersCount = (this.currentUser.ordersCount || 0) + 1;
      this.currentUser.totalSpent = (this.currentUser.totalSpent || 0) + newOrder.total;
      this.save('currentUser', this.currentUser);
    }

    this.clearCart();
    this.notify('orderCreated', newOrder);
    this.notify('ordersUpdated', this.orders);
    this.notify('render');
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Placed') order.trackingStep = 1;
      else if (newStatus === 'Processing') order.trackingStep = 2;
      else if (newStatus === 'Shipped') order.trackingStep = 3;
      else if (newStatus === 'Delivered') order.trackingStep = 4;
      else if (newStatus === 'Cancelled') order.trackingStep = 0;

      this.save('orders', this.orders);
      this.notify('ordersUpdated', this.orders);
      this.notify('render');
      return order;
    }
    return null;
  }

  getUserOrders() {
    if (!this.currentUser) return [];
    return this.orders.filter(o => o.customerEmail === this.currentUser.email);
  }

  // Sales Analytics — computed from live orders, products & categories
  getSalesAnalytics() {
    const orders = this.orders || [];
    const valid = orders.filter(o => o.status !== 'Cancelled');

    const totalRevenue = valid.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const orderCount = orders.length;
    const avgOrderValue = valid.length ? totalRevenue / valid.length : 0;
    const itemsSold = valid.reduce((s, o) => s + (o.items || []).reduce((q, it) => q + (it.quantity || 0), 0), 0);

    // Status breakdown
    const statusCounts = { Placed: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach(o => { if (statusCounts[o.status] !== undefined) statusCounts[o.status]++; });

    // Monthly revenue (last 6 months by order date)
    const monthlyMap = {};
    valid.forEach(o => {
      const key = (o.date || '').slice(0, 7); // YYYY-MM
      if (key) monthlyMap[key] = (monthlyMap[key] || 0) + (Number(o.total) || 0);
    });
    const monthly = Object.keys(monthlyMap).sort().slice(-6).map(k => ({
      month: k,
      revenue: monthlyMap[k]
    }));

    // Revenue + units by category, and top products
    const catMap = {};
    const prodMap = {};
    valid.forEach(o => {
      (o.items || []).forEach(it => {
        const prod = this.getProductById(it.id || it.productId);
        const cat = (prod && prod.category) || it.category || 'other';
        const lineTotal = (Number(it.price) || 0) * (it.quantity || 0);
        catMap[cat] = (catMap[cat] || 0) + lineTotal;
        const pid = it.id || it.productId;
        if (pid) {
          if (!prodMap[pid]) prodMap[pid] = { title: it.title, qty: 0, revenue: 0 };
          prodMap[pid].qty += it.quantity || 0;
          prodMap[pid].revenue += lineTotal;
        }
      });
    });
    const byCategory = Object.keys(catMap)
      .map(k => ({ category: k, revenue: catMap[k] }))
      .sort((a, b) => b.revenue - a.revenue);
    const topProducts = Object.keys(prodMap)
      .map(k => ({ id: k, ...prodMap[k] }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Inventory health
    const products = this.products || [];
    const inventoryValue = products.reduce((s, p) => s + (Number(p.price) || 0) * (p.stock || 0), 0);
    const lowStock = products.filter(p => p.stock <= 5).length;
    const outOfStock = products.filter(p => p.stock <= 0).length;

    return {
      totalRevenue, orderCount, avgOrderValue, itemsSold,
      statusCounts, monthly, byCategory, topProducts,
      inventoryValue, lowStock, outOfStock,
      customerCount: (this.users || []).filter(u => u.role !== 'admin').length
    };
  }

  // Reviews
  getProductReviews(productId) {
    return this.reviews[productId] || [];
  }

  addReview(productId, reviewData) {
    if (!this.reviews[productId]) {
      this.reviews[productId] = [];
    }
    const newReview = {
      id: 'rev-' + Date.now(),
      author: reviewData.author || (this.currentUser ? this.currentUser.name : 'Anonymous Gamer'),
      rating: parseInt(reviewData.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      comment: reviewData.comment || 'Excellent product, works like a charm!'
    };

    this.reviews[productId].unshift(newReview);
    this.save('reviews', this.reviews);

    // Recalculate product rating
    const prod = this.getProductById(productId);
    if (prod) {
      const allRev = this.reviews[productId];
      const avg = allRev.reduce((acc, r) => acc + r.rating, 0) / allRev.length;
      prod.rating = parseFloat(avg.toFixed(2));
      prod.reviewCount = allRev.length;
      this.save('products', this.products);
    }

    this.notify('reviewAdded', { productId, review: newReview });
    this.notify('render');
    return newReview;
  }

  // Authentication & Users
  // Ensures the hidden admin account exists with the fixed credentials.
  bootstrapAdmin() {
    const cred = this.ADMIN_CREDENTIALS;
    const existing = this.users.find(u => u.email.toLowerCase() === cred.email.toLowerCase());
    if (existing) {
      existing.role = 'admin';
      existing.password = cred.password;
      existing.name = existing.name || cred.name;
    } else {
      this.users.unshift({
        id: cred.id,
        name: cred.name,
        email: cred.email,
        password: cred.password,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '+880 1700-112233',
        ordersCount: 0,
        totalSpent: 0,
        status: 'Active'
      });
    }
    this.save('users', this.users);
  }

  isAdmin() {
    return !!(this.currentUser && this.currentUser.role === 'admin');
  }

  login(email, password) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      this.currentUser = user;
      this.save('currentUser', user);
      this.notify('userLoggedIn', user);
      this.notify('render');
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. You can use one of the 1-click demo logins below!' };
  }

  register(userData) {
    const exists = this.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'New Customer',
      email: userData.email,
      password: userData.password,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      phone: userData.phone || '+880 1700-000000',
      ordersCount: 0,
      totalSpent: 0,
      status: 'Active'
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.save('users', this.users);
    this.save('currentUser', newUser);
    this.notify('userLoggedIn', newUser);
    this.notify('render');
    return { success: true, user: newUser };
  }

  switchRole(role) {
    if (role === 'admin') {
      this.currentUser = this.users.find(u => u.role === 'admin') || this.users[0];
    } else {
      this.currentUser = this.users.find(u => u.role === 'customer') || this.users[1];
    }
    this.save('currentUser', this.currentUser);
    this.notify('userLoggedIn', this.currentUser);
    this.notify('render');
  }

  logout() {
    this.currentUser = null;
    this.save('currentUser', null);
    this.view = 'store';
    this.notify('userLoggedOut');
    this.notify('render');
  }

  // Pre-orders for Upcoming Products
  reservePreOrder(upcomingId, customerEmail) {
    const up = this.upcoming.find(u => u.id === upcomingId);
    if (up && up.preOrdersTaken < up.preOrderSlots) {
      up.preOrdersTaken += 1;
      this.save('upcoming', this.upcoming);
      this.notify('upcomingUpdated', this.upcoming);
      return { success: true, message: `Pre-order slot reserved for ${up.title}! We will email ${customerEmail} upon stock arrival.` };
    }
    return { success: false, message: 'Sorry, pre-order slots for this hardware are currently full.' };
  }

  // AI Chat & Config
  addAiChatMessage(sender, text, productCards = null) {
    const msg = {
      sender,
      text,
      productCards,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.aiChatHistory.push(msg);
    this.save('aiChatHistory', this.aiChatHistory);
    this.notify('aiChatUpdated', this.aiChatHistory);
  }

  clearAiChat() {
    this.aiChatHistory = [
      {
        sender: 'assistant',
        text: "AI Chat cleared. What computer parts or PC build can I help you with today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    this.save('aiChatHistory', this.aiChatHistory);
    this.notify('aiChatUpdated', this.aiChatHistory);
  }

  saveAiConfig(config) {
    this.aiConfig = { ...this.aiConfig, ...config };
    this.save('aiConfig', this.aiConfig);
    this.notify('aiConfigUpdated', this.aiConfig);
  }
}

// Global Singleton Instance
window.store = new Store();