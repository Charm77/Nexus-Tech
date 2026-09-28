// Admin Portal Component (Hidden — administrators only)
// Features: Dashboard, Product CRUD (paginated + searchable), Category Management,
// Inventory Management, Order Management, Customer Management, Sales Analytics.

class AdminPortal {
  constructor() {
    this.container = null;
    this.currentTab = 'dashboard'; // dashboard | products | categories | inventory | orders | users | analytics
    // Product table state (performance for large catalogs)
    this.productSearch = '';
    this.productPage = 1;
    this.productPageSize = 15;
    // Order table state
    this.orderFilter = 'all';
    this.orderSearch = '';
    // Customer table state
    this.userSearch = '';
    // Chart instances
    this.revenueChart = null;
    this.categoryChart = null;
    this.analyticsRevenueChart = null;
    this.analyticsCategoryChart = null;
  }

  // ---- Helpers ----
  categoryName(slug) {
    const c = (store.categories || []).find(cat => cat.slug === slug || cat.id === slug);
    return c ? c.name : (slug || '—');
  }

  destroyCharts() {
    [this.revenueChart, this.categoryChart, this.analyticsRevenueChart, this.analyticsCategoryChart]
      .forEach(ch => { if (ch) { try { ch.destroy(); } catch (e) {} } });
    this.revenueChart = this.categoryChart = null;
    this.analyticsRevenueChart = this.analyticsCategoryChart = null;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Access guard — the panel is hidden from anyone but a verified administrator.
    if (!store.isAdmin()) {
      this.destroyCharts();
      this.container.innerHTML = `
        <div class="min-h-[70vh] flex items-center justify-center px-4">
          <div class="glass-panel rounded-3xl border border-red-500/40 p-6 sm:p-8 max-w-md text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center text-2xl mb-4">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h2 class="font-gaming text-lg font-bold text-white">Administrator Access Required</h2>
            <p class="text-xs text-gray-400 mt-2 mb-5">This management portal is hidden and restricted. Please sign in with an authorized administrator account to continue.</p>
            <div class="flex justify-center gap-2.5">
              <button onclick="window.navigateTo('store')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold">Back to Store</button>
              <button onclick="window.openAuthModal()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold">Sign In</button>
            </div>
          </div>
        </div>`;
      return;
    }

    const products = store.products;
    const orders = store.orders;
    const categories = store.categories;
    const users = store.users;
    const upcoming = store.upcoming;
    const lowStockItems = products.filter(p => p.stock <= 5);
    const a = store.getSalesAnalytics();

    this.destroyCharts();

    this.container.innerHTML = `
      <div class="min-h-screen pb-16">

        <!-- Admin Top Bar -->
        <div class="glass-panel border-b border-purple-900/50 bg-slate-950/90 py-3 px-4 sm:py-3.5 sm:px-8 mb-6 sticky top-16 sm:top-20 z-30 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-400 flex items-center justify-center text-base">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h2 class="font-gaming text-sm sm:text-base font-bold text-white tracking-wider">
                NEXUS<span class="text-purple-400">ADMIN</span> PORTAL
              </h2>
              <span class="text-[10px] text-gray-400 font-tech uppercase">SEU ISD CSE346 E-Commerce Operations</span>
            </div>
          </div>
          <div class="flex items-center gap-2.5">
            <button onclick="window.navigateTo('store')" class="px-3 sm:px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow" title="Back to Storefront">
              <i class="fa-solid fa-store"></i><span class="hidden sm:inline">Back to Storefront</span><span class="sm:hidden">Store</span>
            </button>
            <button onclick="window.handleUserLogout(); window.navigateTo('store');" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-gray-300 hover:text-red-200 text-xs font-semibold transition flex items-center gap-1.5" title="Sign out">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <div class="text-xs text-gray-400 border-l border-slate-700 pl-3 hidden sm:block">
              Logged in: <strong class="text-purple-300">${store.currentUser ? store.currentUser.name : 'Administrator'}</strong>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <!-- Tabs -->
          <div class="flex items-center gap-1.5 pb-2 mb-6 overflow-x-auto border-b border-slate-800 text-xs font-tech font-bold uppercase">
            ${this.tabButton('dashboard', 'fa-chart-line', 'Dashboard')}
            ${this.tabButton('products', 'fa-microchip', `Products (${products.length})`)}
            ${this.tabButton('categories', 'fa-layer-group', `Categories (${categories.length})`)}
            ${this.tabButton('inventory', 'fa-boxes-stacked', `Inventory (${lowStockItems.length} Low)`)}
            ${this.tabButton('orders', 'fa-cart-flatbed', `Orders (${orders.length})`)}
            ${this.tabButton('users', 'fa-users', `Customers (${users.filter(u => u.role !== 'admin').length})`)}
            ${this.tabButton('analytics', 'fa-arrow-trend-up', 'Sales Analytics')}
          </div>

          ${this.currentTab === 'dashboard' ? this.renderDashboard(a, orders, products, categories, lowStockItems) : ''}
          ${this.currentTab === 'products' ? this.renderProducts(products) : ''}
          ${this.currentTab === 'categories' ? this.renderCategories(categories, products) : ''}
          ${this.currentTab === 'inventory' ? this.renderInventory(products, lowStockItems, upcoming, a) : ''}
          ${this.currentTab === 'orders' ? this.renderOrders(orders) : ''}
          ${this.currentTab === 'users' ? this.renderUsers(users) : ''}
          ${this.currentTab === 'analytics' ? this.renderAnalytics(a) : ''}

        </div>
      </div>
    `;

    this.postRender();
  }

  tabButton(tab, icon, label) {
    const active = this.currentTab === tab;
    return `
      <button onclick="window.switchAdminTab('${tab}')" class="px-3.5 py-2 rounded-xl transition whitespace-nowrap ${active ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'}">
        <i class="fa-solid ${icon} mr-1.5"></i> ${label}
      </button>`;
  }

  // ---- 1. DASHBOARD ----
  renderDashboard(a, orders, products, categories, lowStockItems) {
    return `
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${this.kpi('Total Sales Revenue', 'fa-dollar-sign', 'emerald', store.formatPrice(a.totalRevenue), `${a.orderCount} orders lifetime`)}
          ${this.kpi('Active Orders', 'fa-truck-fast', 'cyan', `${a.statusCounts.Placed + a.statusCounts.Processing + a.statusCounts.Shipped} Pending`, `${a.statusCounts.Delivered} delivered`)}
          ${this.kpi('Catalog Size', 'fa-microchip', 'amber', `${products.length} Parts`, `Across ${categories.length - 1} categories`)}
          ${this.kpi('Stock Attention', 'fa-triangle-exclamation', 'red', `${lowStockItems.length} Low Units`, `${a.outOfStock} out of stock`, 'inventory')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-gaming text-sm font-bold text-white uppercase">Revenue Trend</h3>
              <span class="text-xs text-cyan-400 font-tech">Live order data</span>
            </div>
            <div class="h-64"><canvas id="adminRevenueChart"></canvas></div>
          </div>
          <div class="lg:col-span-1 glass-panel rounded-2xl p-5 border border-slate-800">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-gaming text-sm font-bold text-white uppercase">Revenue by Category</h3>
            </div>
            <div class="h-64 flex items-center justify-center"><canvas id="adminCategoryChart"></canvas></div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-5 border border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-gaming text-sm font-bold text-white uppercase">Latest Orders</h3>
            <button onclick="window.switchAdminTab('orders')" class="text-xs text-cyan-400 hover:underline">Manage All Orders →</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="text-gray-400 border-b border-slate-800 uppercase font-tech text-[11px]">
                  <th class="py-2 px-3">Order ID</th><th class="py-2 px-3">Customer</th><th class="py-2 px-3">Date</th>
                  <th class="py-2 px-3">Status</th><th class="py-2 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800">
                ${orders.slice(0, 5).map(o => `
                  <tr class="hover:bg-slate-800/40">
                    <td class="py-2.5 px-3 font-mono text-cyan-400 font-bold">${o.id}</td>
                    <td class="py-2.5 px-3 text-gray-200">${o.customerName}</td>
                    <td class="py-2.5 px-3 text-gray-400">${o.date}</td>
                    <td class="py-2.5 px-3">${this.statusBadge(o.status)}</td>
                    <td class="py-2.5 px-3 text-right font-bold text-white font-gaming">${store.formatPrice(o.total)}</td>
                  </tr>`).join('') || '<tr><td colspan="5" class="py-6 text-center text-gray-500">No orders yet.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  kpi(label, icon, color, value, sub, jumpTab) {
    const colors = {
      emerald: 'border-emerald-500/30 text-emerald-400',
      cyan: 'border-cyan-500/30 text-cyan-400',
      amber: 'border-amber-500/30 text-amber-400',
      red: 'border-red-500/30 text-red-400'
    };
    const c = colors[color] || colors.cyan;
    return `
      <div class="glass-panel rounded-2xl p-5 border ${c.split(' ')[0]}">
        <div class="flex items-center justify-between text-xs text-gray-400 uppercase font-tech">
          <span>${label}</span><i class="fa-solid ${icon} ${c.split(' ')[1]} text-base"></i>
        </div>
        <div class="text-2xl font-black text-white font-gaming mt-2">${value}</div>
        ${jumpTab
          ? `<button onclick="window.switchAdminTab('${jumpTab}')" class="text-[11px] text-cyan-400 hover:underline mt-1 block">${sub} →</button>`
          : `<div class="text-[11px] text-gray-400 mt-1">${sub}</div>`}
      </div>`;
  }

  statusBadge(status) {
    const map = {
      'Delivered': 'bg-emerald-500/20 text-emerald-400',
      'Shipped': 'bg-cyan-500/20 text-cyan-300',
      'Processing': 'bg-amber-500/20 text-amber-300',
      'Placed': 'bg-slate-700/40 text-gray-300',
      'Cancelled': 'bg-red-500/20 text-red-400'
    };
    return `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${map[status] || map['Placed']}">${status}</span>`;
  }

  // ---- 2. PRODUCT CRUD (paginated + searchable) ----
  getFilteredProducts() {
    const q = this.productSearch.trim().toLowerCase();
    let list = store.products;
    if (q) {
      list = list.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q));
    }
    return list;
  }

  renderProducts(products) {
    return `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 class="font-gaming text-base font-bold text-white">PRODUCT MANAGEMENT (CRUD)</h3>
            <p class="text-xs text-gray-400">Create, update pricing/stock, or remove hardware components</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
              <input id="admin-product-search" type="text" value="${this.productSearch}" placeholder="Search ${products.length} parts..." class="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 w-52" />
            </div>
            <button onclick="window.openAddProductModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-2 whitespace-nowrap">
              <i class="fa-solid fa-plus"></i> Add Product
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-gray-400 border-b border-slate-800 uppercase font-tech text-[11px]">
                <th class="py-2.5 px-3">Product</th><th class="py-2.5 px-3">Category</th><th class="py-2.5 px-3">Price</th>
                <th class="py-2.5 px-3">Stock</th><th class="py-2.5 px-3">Tags</th><th class="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-products-tbody" class="divide-y divide-slate-800"></tbody>
          </table>
        </div>
        <div id="admin-products-pagination" class="flex items-center justify-between pt-2"></div>
      </div>`;
  }

  renderProductRows() {
    const tbody = document.getElementById('admin-products-tbody');
    const pag = document.getElementById('admin-products-pagination');
    if (!tbody) return;
    const list = this.getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(list.length / this.productPageSize));
    if (this.productPage > totalPages) this.productPage = totalPages;
    const start = (this.productPage - 1) * this.productPageSize;
    const pageItems = list.slice(start, start + this.productPageSize);

    tbody.innerHTML = pageItems.map(p => `
      <tr class="hover:bg-slate-800/40">
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-3">
            <img src="${p.image}" loading="lazy" class="w-9 h-9 rounded-lg object-cover bg-slate-900 border border-slate-700 flex-shrink-0" />
            <div class="truncate max-w-[220px]">
              <div class="font-bold text-white truncate" title="${p.title}">${p.title}</div>
              <span class="text-[10px] text-cyan-400 font-semibold">${p.brand}</span>
            </div>
          </div>
        </td>
        <td class="py-2.5 px-3 text-gray-300 text-[10px] uppercase">${this.categoryName(p.category)}</td>
        <td class="py-2.5 px-3 font-bold text-white font-gaming">${store.formatPrice(p.price)}
          ${p.discountPercent > 0 ? `<span class="ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400">-${p.discountPercent}%</span>` : ''}
        </td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${p.stock <= 0 ? 'bg-red-500/30 text-red-300' : p.stock <= 5 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'}">${p.stock} units</span>
        </td>
        <td class="py-2.5 px-3 space-x-1">
          ${p.isGaming ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300">GAMING</span>' : ''}
          ${p.isFeatured ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">FEATURED</span>' : ''}
          ${p.isLatest ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300">NEW</span>' : ''}
        </td>
        <td class="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
          <button onclick="window.openEditProductModal('${p.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="store.quickRestock('${p.id}', 10); AdminPortalComponent.refreshProductRows(); window.showToast('Restocked +10 units.');" class="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-emerald-400 transition" title="Quick restock +10"><i class="fa-solid fa-plus"></i></button>
          <button onclick="window.confirmDeleteProduct('${p.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-red-400 transition" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>`).join('') || '<tr><td colspan="6" class="py-8 text-center text-gray-500">No products match your search.</td></tr>';

    if (pag) {
      pag.innerHTML = `
        <span class="text-[11px] text-gray-400">Showing ${list.length ? start + 1 : 0}–${Math.min(start + this.productPageSize, list.length)} of ${list.length}</span>
        <div class="flex items-center gap-1">
          <button ${this.productPage <= 1 ? 'disabled' : ''} onclick="AdminPortalComponent.goToProductPage(${this.productPage - 1})" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-gray-200 text-xs">Prev</button>
          <span class="text-xs text-gray-300 px-2">Page ${this.productPage} / ${totalPages}</span>
          <button ${this.productPage >= totalPages ? 'disabled' : ''} onclick="AdminPortalComponent.goToProductPage(${this.productPage + 1})" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-gray-200 text-xs">Next</button>
        </div>`;
    }
  }

  goToProductPage(n) {
    this.productPage = n;
    this.renderProductRows();
  }

  refreshProductRows() {
    this.renderProductRows();
  }

  // ---- 3. CATEGORIES ----
  renderCategories(categories, products) {
    return `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 class="font-gaming text-base font-bold text-white">CATEGORY MANAGEMENT</h3>
            <p class="text-xs text-gray-400">Manage hardware taxonomy, icons and slug mappings</p>
          </div>
          <button onclick="window.openAddCategoryModal()" class="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5">
            <i class="fa-solid fa-plus"></i> New Category
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${categories.filter(c => c.id !== 'all').map(cat => {
            const count = products.filter(p => p.category === cat.slug || p.category === cat.id).length;
            return `
              <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 truncate">
                  <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 text-base"><i class="${cat.icon}"></i></div>
                  <div class="truncate">
                    <div class="text-xs font-bold text-white truncate">${cat.name}</div>
                    <span class="text-[10px] text-gray-400 font-mono">${cat.slug}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold">${count}</span>
                  <button onclick="store.deleteCategory('${cat.id}'); AdminPortalComponent.rerender();" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete Category"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  // ---- 4. INVENTORY ----
  renderInventory(products, lowStockItems, upcoming, a) {
    const totalUnits = products.reduce((s, p) => s + (p.stock || 0), 0);
    return `
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${this.kpi('Inventory Value', 'fa-warehouse', 'emerald', store.formatPrice(a.inventoryValue), 'Stock at retail price')}
          ${this.kpi('Total Units', 'fa-boxes-stacked', 'cyan', totalUnits.toLocaleString('en-US'), 'Across all products')}
          ${this.kpi('Low / Out of Stock', 'fa-triangle-exclamation', 'red', `${a.lowStock} / ${a.outOfStock}`, 'Need restocking')}
        </div>

        <div class="glass-panel rounded-2xl p-5 border border-red-500/30 space-y-4">
          <div class="flex items-center gap-2.5 text-red-400 pb-3 border-b border-slate-800">
            <i class="fa-solid fa-triangle-exclamation text-lg"></i>
            <div>
              <h3 class="font-gaming text-sm font-bold text-white">LOW STOCK ALERTS (≤ 5 UNITS)</h3>
              <p class="text-xs text-gray-400">Urgent restock recommendations to prevent backorders</p>
            </div>
          </div>
          <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            ${lowStockItems.length === 0
              ? '<p class="text-xs text-emerald-400 py-3">All products currently have healthy stock levels.</p>'
              : lowStockItems.slice(0, 60).map(p => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 truncate">
                    <img src="${p.image}" loading="lazy" class="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-700 flex-shrink-0" />
                    <div class="truncate">
                      <div class="text-xs font-bold text-white truncate">${p.title}</div>
                      <span class="text-[11px] ${p.stock <= 0 ? 'text-red-500' : 'text-red-400'} font-bold">${p.stock <= 0 ? 'Out of stock!' : 'Only ' + p.stock + ' left'}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <button onclick="store.quickRestock('${p.id}', 10); AdminPortalComponent.rerender(); window.showToast('Restocked +10 units.');" class="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition">+10</button>
                    <button onclick="store.quickRestock('${p.id}', 50); AdminPortalComponent.rerender(); window.showToast('Restocked +50 units.');" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition">+50</button>
                  </div>
                </div>`).join('')}
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-5 border border-purple-500/30 space-y-4">
          <div class="flex items-center gap-2.5 text-purple-400 pb-3 border-b border-slate-800">
            <i class="fa-solid fa-hourglass-start text-lg"></i>
            <div>
              <h3 class="font-gaming text-sm font-bold text-white">UPCOMING RELEASES & PRE-ORDERS</h3>
              <p class="text-xs text-gray-400">Next-gen hardware pipeline</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${(upcoming || []).map(up => `
              <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between text-[10px] text-purple-300 font-bold uppercase font-tech mb-2">
                    <span>${up.brand}</span><span class="bg-purple-900/40 px-2 py-0.5 rounded border border-purple-500/30">${up.expectedRelease}</span>
                  </div>
                  <img src="${up.image}" loading="lazy" class="w-full h-32 object-cover rounded-xl mb-3 border border-slate-800" />
                  <h4 class="text-xs font-bold text-white mb-1">${up.title}</h4>
                  <p class="text-[11px] text-gray-400 mb-3">${up.specs}</p>
                </div>
                <div class="pt-3 border-t border-slate-800">
                  <div class="flex justify-between text-xs text-gray-300 mb-2"><span>Pre-Orders:</span><span class="font-bold text-cyan-400">${up.preOrdersTaken} / ${up.preOrderSlots}</span></div>
                  <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3"><div class="bg-purple-500 h-full rounded-full" style="width:${(up.preOrdersTaken / up.preOrderSlots) * 100}%"></div></div>
                  <button onclick="window.reserveUpcomingPreOrder('${up.id}')" class="w-full py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition">Simulate Pre-Order</button>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  // ---- 5. ORDERS ----
  getFilteredOrders() {
    let list = store.orders;
    if (this.orderFilter !== 'all') list = list.filter(o => o.status === this.orderFilter);
    const q = this.orderSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(o =>
        (o.id || '').toLowerCase().includes(q) ||
        (o.customerName || '').toLowerCase().includes(q) ||
        (o.customerEmail || '').toLowerCase().includes(q));
    }
    return list;
  }

  renderOrders(orders) {
    const statuses = ['all', 'Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    return `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 class="font-gaming text-base font-bold text-white">ORDER MANAGEMENT</h3>
            <p class="text-xs text-gray-400">Update fulfillment status: Placed → Processing → Shipped → Delivered</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <input id="admin-order-search" type="text" value="${this.orderSearch}" placeholder="Search orders..." class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 w-44" />
            <select id="admin-order-filter" class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none cursor-pointer">
              ${statuses.map(s => `<option value="${s}" ${this.orderFilter === s ? 'selected' : ''}>${s === 'all' ? 'All Statuses' : s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div id="admin-orders-list" class="space-y-4 max-h-[70vh] overflow-y-auto pr-1"></div>
      </div>`;
  }

  renderOrderList() {
    const el = document.getElementById('admin-orders-list');
    if (!el) return;
    const list = this.getFilteredOrders();
    el.innerHTML = list.map(o => `
      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-800/80 gap-2">
          <div>
            <span class="font-mono font-bold text-cyan-400 text-sm">${o.id}</span>
            <span class="text-gray-400 ml-2">Customer: <strong class="text-white">${o.customerName}</strong> (${o.customerEmail})</span>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-400 text-[11px] font-semibold">Status:</label>
            <select onchange="store.updateOrderStatus('${o.id}', this.value); AdminPortalComponent.renderOrderList(); window.showToast('Order ${o.id} → ' + this.value);" class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-bold focus:outline-none cursor-pointer">
              ${['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-300">
          <div>
            <div><strong>Address:</strong> ${o.shippingAddress}</div>
            <div><strong>Delivery:</strong> ${o.shippingMethod}</div>
            <div><strong>Payment:</strong> ${o.paymentMethod}</div>
            <div><strong>Date:</strong> ${o.date}</div>
          </div>
          <div class="space-y-1">
            <strong>Items (${(o.items || []).length}):</strong>
            ${(o.items || []).map(item => `
              <div class="flex justify-between text-gray-400"><span class="truncate pr-2">${item.quantity}x ${item.title}</span><span class="font-mono text-gray-200">${store.formatPrice(item.price * item.quantity)}</span></div>`).join('')}
            <div class="text-right text-xs font-bold text-cyan-400 pt-1 border-t border-slate-900">Total: ${store.formatPrice(o.total)}</div>
          </div>
        </div>
      </div>`).join('') || '<p class="py-8 text-center text-gray-500">No orders match this filter.</p>';
  }

  // ---- 6. CUSTOMERS ----
  renderUsers(users) {
    return `
      <div class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 class="font-gaming text-base font-bold text-white">CUSTOMER MANAGEMENT</h3>
            <p class="text-xs text-gray-400">Registration records, purchase totals and role assignments</p>
          </div>
          <input id="admin-user-search" type="text" value="${this.userSearch}" placeholder="Search customers..." class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 w-52" />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-gray-400 border-b border-slate-800 uppercase font-tech text-[11px]">
                <th class="py-2.5 px-3">User</th><th class="py-2.5 px-3">Contact</th><th class="py-2.5 px-3">Role</th>
                <th class="py-2.5 px-3">Orders</th><th class="py-2.5 px-3">Total Spent</th><th class="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody id="admin-users-tbody" class="divide-y divide-slate-800"></tbody>
          </table>
        </div>
      </div>`;
  }

  renderUserRows() {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;
    const q = this.userSearch.trim().toLowerCase();
    let list = store.users;
    if (q) {
      list = list.filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
    }
    tbody.innerHTML = list.map(u => `
      <tr class="hover:bg-slate-800/40">
        <td class="py-3 px-3">
          <div class="flex items-center gap-3">
            <img src="${u.avatar}" loading="lazy" class="w-8 h-8 rounded-full object-cover border ${u.role === 'admin' ? 'border-purple-400' : 'border-cyan-400'} flex-shrink-0" />
            <div><div class="font-bold text-white">${u.name}</div><div class="text-[10px] text-gray-400">${u.email}</div></div>
          </div>
        </td>
        <td class="py-3 px-3 text-gray-300">${u.phone || 'N/A'}</td>
        <td class="py-3 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-cyan-500/20 text-cyan-300'}">${u.role}</span></td>
        <td class="py-3 px-3 text-gray-300 font-mono">${u.ordersCount || 0}</td>
        <td class="py-3 px-3 font-bold text-emerald-400 font-gaming">${store.formatPrice(u.totalSpent || 0)}</td>
        <td class="py-3 px-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">${u.status || 'Active'}</span></td>
      </tr>`).join('') || '<tr><td colspan="6" class="py-8 text-center text-gray-500">No customers found.</td></tr>';
  }

  // ---- 7. SALES ANALYTICS ----
  renderAnalytics(a) {
    const best = a.byCategory[0];
    return `
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${this.kpi('Gross Revenue', 'fa-sack-dollar', 'emerald', store.formatPrice(a.totalRevenue), `${a.orderCount} orders`)}
          ${this.kpi('Avg Order Value', 'fa-receipt', 'cyan', store.formatPrice(a.avgOrderValue), 'Per valid order')}
          ${this.kpi('Units Sold', 'fa-box-open', 'amber', a.itemsSold.toLocaleString('en-US'), 'Across all orders')}
          ${this.kpi('Customers', 'fa-users', 'red', a.customerCount, 'Registered accounts', 'users')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-gaming text-sm font-bold text-white uppercase">Monthly Revenue</h3>
              <span class="text-xs text-cyan-400 font-tech">Computed from orders</span>
            </div>
            <div class="h-72"><canvas id="analyticsRevenueChart"></canvas></div>
          </div>
          <div class="glass-panel rounded-2xl p-5 border border-slate-800">
            <div class="flex items-center justify-between mb-4"><h3 class="font-gaming text-sm font-bold text-white uppercase">Category Share</h3></div>
            <div class="h-72 flex items-center justify-center"><canvas id="analyticsCategoryChart"></canvas></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="glass-panel rounded-2xl p-5 border border-slate-800">
            <h3 class="font-gaming text-sm font-bold text-white uppercase mb-4">Top Selling Products</h3>
            <div class="space-y-2.5">
              ${a.topProducts.length ? a.topProducts.map((p, i) => `
                <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="flex items-center gap-2.5 truncate">
                    <span class="w-6 h-6 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center text-[11px] font-bold flex-shrink-0">${i + 1}</span>
                    <div class="truncate"><div class="text-xs font-bold text-white truncate">${p.title}</div><span class="text-[10px] text-gray-400">${p.qty} units sold</span></div>
                  </div>
                  <span class="text-xs font-bold text-emerald-400 font-gaming flex-shrink-0">${store.formatPrice(p.revenue)}</span>
                </div>`).join('')
                : '<p class="text-xs text-gray-500 py-4 text-center">No sales data yet.</p>'}
            </div>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800">
            <h3 class="font-gaming text-sm font-bold text-white uppercase mb-4">Order Status Breakdown</h3>
            <div class="space-y-3">
              ${['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => {
                const count = a.statusCounts[s] || 0;
                const pct = a.orderCount ? (count / a.orderCount) * 100 : 0;
                const bar = { Placed: 'bg-slate-500', Processing: 'bg-amber-500', Shipped: 'bg-cyan-500', Delivered: 'bg-emerald-500', Cancelled: 'bg-red-500' }[s];
                return `
                  <div>
                    <div class="flex justify-between text-[11px] text-gray-300 mb-1"><span class="font-semibold">${s}</span><span>${count} (${pct.toFixed(0)}%)</span></div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div class="${bar} h-full rounded-full" style="width:${pct}%"></div></div>
                  </div>`;
              }).join('')}
            </div>
            ${best ? `<div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-gray-400">Top category: <strong class="text-cyan-400">${this.categoryName(best.category)}</strong> — ${store.formatPrice(best.revenue)}</div>` : ''}
          </div>
        </div>
      </div>`;
  }

  // ---- Post-render wiring (event listeners + charts + dynamic tables) ----
  postRender() {
    if (this.currentTab === 'dashboard') this.initDashboardCharts();
    if (this.currentTab === 'analytics') this.initAnalyticsCharts();
    if (this.currentTab === 'products') {
      this.renderProductRows();
      const s = document.getElementById('admin-product-search');
      if (s) s.addEventListener('input', (e) => {
        this.productSearch = e.target.value;
        this.productPage = 1;
        this.renderProductRows();
      });
    }
    if (this.currentTab === 'orders') {
      this.renderOrderList();
      const os = document.getElementById('admin-order-search');
      const of = document.getElementById('admin-order-filter');
      if (os) os.addEventListener('input', (e) => { this.orderSearch = e.target.value; this.renderOrderList(); });
      if (of) of.addEventListener('change', (e) => { this.orderFilter = e.target.value; this.renderOrderList(); });
    }
    if (this.currentTab === 'users') {
      this.renderUserRows();
      const us = document.getElementById('admin-user-search');
      if (us) us.addEventListener('input', (e) => { this.userSearch = e.target.value; this.renderUserRows(); });
    }
  }

  rerender() {
    this.render('admin-view');
  }

  setTab(tab) {
    this.currentTab = tab;
    this.render('admin-view');
  }

  initDashboardCharts() {
    const a = store.getSalesAnalytics();
    setTimeout(() => {
      const revCanvas = document.getElementById('adminRevenueChart');
      if (revCanvas && typeof Chart !== 'undefined') {
        this.revenueChart = new Chart(revCanvas, {
          type: 'line',
          data: {
            labels: a.monthly.length ? a.monthly.map(m => m.month) : ['No data'],
            datasets: [{
              label: 'Revenue', data: a.monthly.length ? a.monthly.map(m => m.revenue) : [0],
              borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.15)', borderWidth: 3, tension: 0.35, fill: true
            }]
          },
          options: this.lineOptions()
        });
      }
      const catCanvas = document.getElementById('adminCategoryChart');
      if (catCanvas && typeof Chart !== 'undefined') {
        const top = a.byCategory.slice(0, 6);
        this.categoryChart = new Chart(catCanvas, {
          type: 'doughnut',
          data: {
            labels: top.length ? top.map(c => this.categoryName(c.category)) : ['No sales'],
            datasets: [{ data: top.length ? top.map(c => c.revenue) : [1], backgroundColor: ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#64748b'], borderWidth: 0 }]
          },
          options: this.doughnutOptions()
        });
      }
    }, 60);
  }

  initAnalyticsCharts() {
    const a = store.getSalesAnalytics();
    setTimeout(() => {
      const revCanvas = document.getElementById('analyticsRevenueChart');
      if (revCanvas && typeof Chart !== 'undefined') {
        this.analyticsRevenueChart = new Chart(revCanvas, {
          type: 'bar',
          data: {
            labels: a.monthly.length ? a.monthly.map(m => m.month) : ['No data'],
            datasets: [{ label: 'Revenue', data: a.monthly.length ? a.monthly.map(m => m.revenue) : [0], backgroundColor: 'rgba(139,92,246,0.6)', borderColor: '#8b5cf6', borderWidth: 2, borderRadius: 6 }]
          },
          options: this.lineOptions()
        });
      }
      const catCanvas = document.getElementById('analyticsCategoryChart');
      if (catCanvas && typeof Chart !== 'undefined') {
        const top = a.byCategory.slice(0, 6);
        this.analyticsCategoryChart = new Chart(catCanvas, {
          type: 'doughnut',
          data: {
            labels: top.length ? top.map(c => this.categoryName(c.category)) : ['No sales'],
            datasets: [{ data: top.length ? top.map(c => c.revenue) : [1], backgroundColor: ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#64748b'], borderWidth: 0 }]
          },
          options: this.doughnutOptions()
        });
      }
    }, 60);
  }

  lineOptions() {
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
      }
    };
  }

  doughnutOptions() {
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#d1d5db', boxWidth: 12, font: { size: 10 } } } }
    };
  }
}

window.AdminPortalComponent = new AdminPortal();
