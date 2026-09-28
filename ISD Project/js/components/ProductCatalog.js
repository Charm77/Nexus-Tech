// Product Catalog & Filter Component
// Features Multi-Factor Filters: Brand, Price Range Slider, Availability, Gaming Tag, and Sorting

class ProductCatalog {
  constructor() {
    this.container = null;
    this.HOME_LIMIT = 50;
    this.PRICE_MIN = 50;
    this.PRICE_MAX = 4500;
    this._homeIds = null; // stable random subset for the default home view
    this.mobileFiltersOpen = false;
  }

  // True when the user is on the default "browse everything" home view
  // (no search, no category, no brand/stock/gaming filters, default sort & max price).
  isDefaultBrowse() {
    return !store.searchQuery &&
      (!store.activeCategory || store.activeCategory === 'all') &&
      store.filters.sortBy === 'recommended' &&
      store.filters.brands.length === 0 &&
      !store.filters.inStockOnly &&
      !store.filters.gamingOnly &&
      store.filters.maxPrice >= 4500;
  }

  // A stable, random selection of HOME_LIMIT products for the home page.
  // Computed once per page load so it doesn't reshuffle on every re-render.
  getHomeShowcase() {
    const all = store.products;
    if (!this._homeIds || this._homeIds.length === 0) {
      const ids = all.map(p => p.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      this._homeIds = ids.slice(0, this.HOME_LIMIT);
    }
    return this._homeIds.map(id => store.getProductById(id)).filter(Boolean);
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // On the default home view show only a random 50; otherwise show full filtered results.
    const isHome = this.isDefaultBrowse();
    const products = isHome ? this.getHomeShowcase() : this.getFilteredProducts();
    const allBrands = Array.from(new Set(store.products.map(p => p.brand))).sort();
    const currentCategory = store.categories.find(c => c.slug === store.activeCategory);
    const categoryName = currentCategory ? currentCategory.name : 'All Components';
    const countLabel = isHome
      ? `${products.length} Featured of ${store.products.length}`
      : `${products.length} Items Found`;
    const activeFilterCount = store.filters.brands.length
      + (store.filters.inStockOnly ? 1 : 0)
      + (store.filters.gamingOnly ? 1 : 0)
      + (store.filters.maxPrice < 4500 ? 1 : 0);
    const PRICE_MIN = this.PRICE_MIN;
    const PRICE_MAX = this.PRICE_MAX;
    const pricePct = ((store.filters.maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100).toFixed(2);
    const priceMatches = this.countAtPrice(store.filters.maxPrice);
    const pricePresets = [250, 500, 1000, 2500, PRICE_MAX];

    this.container.innerHTML = `
      <section id="catalog-grid-section" class="scroll-mt-24 mb-14">
        
        <!-- Section Top Header & Sort Bar -->
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-lg sm:text-2xl font-black font-tech text-white uppercase tracking-wider truncate">
                ${categoryName}
              </h2>
              <span class="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 whitespace-nowrap">
                ${countLabel}
              </span>
            </div>
            ${store.searchQuery ? `
              <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>Filtering by keyword: "<strong>${store.searchQuery}</strong>"</span>
                <button onclick="window.clearSearchQuery()" class="text-cyan-400 hover:underline font-semibold">(Clear)</button>
              </div>
            ` : ''}
          </div>

          <!-- Controls: Sort & Filter Toggle (Mobile) -->
          <div class="flex items-center gap-3">
            <button 
              onclick="window.toggleMobileFilters()" 
              class="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-gray-200 text-xs font-semibold border border-slate-700"
            >
              <i class="fa-solid fa-sliders text-cyan-400"></i> Filters
              ${activeFilterCount > 0 ? `<span class="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black">${activeFilterCount}</span>` : ''}
            </button>

            <!-- Sort By Selector -->
            <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
              <i class="fa-solid fa-arrow-down-wide-short text-gray-400 text-xs"></i>
              <label for="catalog-sort-select" class="text-xs text-gray-400">Sort:</label>
              <select 
                id="catalog-sort-select" 
                onchange="window.setCatalogSort(this.value)" 
                class="bg-transparent text-xs text-cyan-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="recommended" class="bg-slate-900 text-gray-200" ${store.filters.sortBy === 'recommended' ? 'selected' : ''}>Recommended</option>
                <option value="price-asc" class="bg-slate-900 text-gray-200" ${store.filters.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-desc" class="bg-slate-900 text-gray-200" ${store.filters.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                <option value="rating" class="bg-slate-900 text-gray-200" ${store.filters.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
                <option value="discount" class="bg-slate-900 text-gray-200" ${store.filters.sortBy === 'discount' ? 'selected' : ''}>Biggest Discounts</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Layout: Left Filters Column + Right Products Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <!-- Filters Sidebar (Brand, Price, Availability) -->
          <div class="lg:col-span-1 ${this.mobileFiltersOpen ? '' : 'hidden'} lg:block" id="catalog-filters-container">
            <div class="glass-panel rounded-2xl p-5 border border-slate-800 shadow-lg space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8.5rem)] lg:overflow-y-auto lg:pr-4 scroll-contain">
              
              <!-- Filter Title & Reset -->
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <span class="font-tech text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <i class="fa-solid fa-filter text-cyan-400"></i> Refine Parts
                </span>
                <button onclick="window.resetAllFilters()" class="text-[11px] text-gray-400 hover:text-cyan-400 transition underline">
                  Reset All
                </button>
              </div>

              <!-- ??? BRAND FILTER -->
              <div>
                <h4 class="text-xs font-bold text-gray-200 uppercase tracking-wider font-tech mb-2.5 flex items-center justify-between">
                  <span>Brands</span>
                  <span class="text-[10px] text-gray-400">(${allBrands.length})</span>
                </h4>
                <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  ${allBrands.map(brand => {
                    const isChecked = store.filters.brands.includes(brand);
                    const brandCount = store.products.filter(p => p.brand === brand).length;
                    return `
                      <label class="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-1 px-1 rounded hover:bg-slate-800/50">
                        <div class="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            value="${brand}" 
                            ${isChecked ? 'checked' : ''} 
                            onchange="window.toggleBrandFilter('${brand}')"
                            class="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                          <span>${brand}</span>
                        </div>
                        <span class="text-[10px] text-gray-500">${brandCount}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- BUDGET / MAX PRICE SLIDER -->
              <div class="pt-4 border-t border-slate-800">
                <div class="flex items-center justify-between mb-2.5">
                  <span class="text-xs font-bold text-gray-200 uppercase tracking-wider font-tech">Max Price</span>
                  <span
                    id="price-range-value"
                    class="text-xs font-bold text-cyan-200 font-gaming bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-lg tabular-nums"
                  >${store.formatPrice(store.filters.maxPrice)}</span>
                </div>

                <input
                  type="range"
                  id="price-range-slider"
                  min="${PRICE_MIN}"
                  max="${PRICE_MAX}"
                  step="25"
                  value="${store.filters.maxPrice}"
                  style="--pct:${pricePct}%"
                  oninput="window.setPriceFilter(this.value, true)"
                  onchange="window.setPriceFilter(this.value, false)"
                  class="nexus-range"
                  aria-label="Maximum price budget"
                />

                <div class="flex justify-between text-[10px] text-gray-500 mt-0.5 tabular-nums">
                  <span>${store.formatPrice(PRICE_MIN)}</span>
                  <span>${store.formatPrice(Math.round((PRICE_MIN + PRICE_MAX) / 2))}</span>
                  <span>${store.formatPrice(PRICE_MAX)}</span>
                </div>

                <!-- Live match feedback while dragging -->
                <div class="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400">
                  <i class="fa-solid fa-magnifying-glass-chart text-cyan-400"></i>
                  <span id="price-range-count">${priceMatches} parts under ${store.formatPrice(store.filters.maxPrice)}</span>
                </div>

                <!-- Quick budget presets -->
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                  ${pricePresets.map(v => {
                    const isOn = Math.abs(store.filters.maxPrice - v) < 1;
                    const label = v >= PRICE_MAX ? 'Any price' : 'Under ' + store.formatPrice(v);
                    return `
                      <button
                        onclick="window.applyPricePreset(${v})"
                        class="px-2 py-1 rounded-lg text-[10px] font-semibold border transition ${isOn
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-900 text-gray-300 border-slate-700 hover:border-cyan-500/60 hover:text-cyan-300'}"
                      >${label}</button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- ?? AVAILABILITY FILTER -->
              <div class="pt-4 border-t border-slate-800 space-y-2">
                <span class="text-xs font-bold text-gray-200 uppercase tracking-wider font-tech">Availability</span>
                <label class="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer py-1">
                  <input 
                    type="checkbox" 
                    ${store.filters.inStockOnly ? 'checked' : ''} 
                    onchange="window.toggleInStockFilter(this.checked)"
                    class="rounded bg-slate-900 border-slate-700 text-cyan-500 cursor-pointer"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <!-- ?? GAMING READY FILTER -->
              <div class="pt-4 border-t border-slate-800 space-y-2">
                <span class="text-xs font-bold text-purple-300 uppercase tracking-wider font-tech">Certification</span>
                <label class="flex items-center gap-2 text-xs text-gray-300 hover:text-purple-300 cursor-pointer py-1">
                  <input 
                    type="checkbox" 
                    ${store.filters.gamingOnly ? 'checked' : ''} 
                    onchange="window.toggleGamingFilter(this.checked)"
                    class="rounded bg-slate-900 border-purple-800 text-purple-500 cursor-pointer"
                  />
                  <span>Kingdom of Games Certified</span>
                </label>
              </div>

            </div>
          </div>

          <!-- ?? PRODUCTS GRID -->
          <div class="lg:col-span-3">
            ${products.length === 0 ? `
              <div class="glass-panel rounded-2xl p-12 text-center border border-slate-800">
                <div class="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-gray-400 text-2xl mb-4">
                  <i class="fa-solid fa-box-open"></i>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">No Matching Computer Parts</h3>
                <p class="text-xs text-gray-400 max-w-md mx-auto mb-5">We couldn't find any hardware matching your current filters. Try loosening your price limit or clearing selected brands.</p>
                <button onclick="window.resetAllFilters()" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition">
                  Reset All Filters
                </button>
              </div>
            ` : `
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                ${products.map(p => {
                  const inWishlist = store.isInWishlist(p.id);
                  const isDiscounted = p.discountPercent > 0;

                  return `
                    <div class="card-floating glass-panel rounded-2xl p-4 border border-slate-800/80 hover:border-cyan-500/50 flex flex-col justify-between group transition relative">
                      
                      <!-- Badges Top Row -->
                      <div class="flex items-center justify-between gap-1 mb-2.5">
                        <div class="flex items-center gap-1">
                          ${isDiscounted ? `
                            <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-600/80 text-white font-tech uppercase">
                              -${p.discountPercent}%
                            </span>
                          ` : ''}
                          ${p.isGaming ? `
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/30 font-tech uppercase">
                              Gaming
                            </span>
                          ` : ''}
                        </div>

                        <!-- Wishlist Toggle -->
                        <button 
                          onclick="event.stopPropagation(); window.toggleWishlist('${p.id}')"
                          class="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-800 flex items-center justify-center transition ${inWishlist ? 'text-pink-500' : 'text-gray-400'}"
                          title="Wishlist"
                        >
                          <i class="fa-solid fa-heart text-xs"></i>
                        </button>
                      </div>

                      <!-- Thumbnail -->
                      <div class="product-image-container rounded-xl bg-slate-900 p-3 mb-3 border border-slate-800 cursor-pointer" onclick="window.openProductDetailModal('${p.id}')">
                        <img src="${p.image}" alt="${p.title}" class="w-full h-44 object-cover rounded-lg" />
                      </div>

                      <!-- Brand & Title -->
                      <div>
                        <div class="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-1">
                          <span class="uppercase tracking-wider text-cyan-400 font-tech">${p.brand}</span>
                          <div class="flex items-center gap-1 text-amber-400">
                            <i class="fa-solid fa-star text-[10px]"></i>
                            <span>${p.rating}</span>
                          </div>
                        </div>

                        <h3 onclick="window.openProductDetailModal('${p.id}')" class="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition cursor-pointer line-clamp-2 mb-2">
                          ${p.title}
                        </h3>

                        <!-- Stock Status Tag -->
                        <div class="flex items-center gap-1.5 text-[11px] mb-4 ${p.stock > 0 ? 'text-emerald-400' : 'text-red-400'}">
                          <span class="w-1.5 h-1.5 rounded-full ${p.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}"></span>
                          <span>${p.stock > 0 ? (p.stock <= 5 ? `Low Stock (${p.stock} units)` : 'In Stock') : 'Out of Stock'}</span>
                        </div>
                      </div>

                      <!-- Price & Buttons Footer -->
                      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div>
                          ${isDiscounted ? `<div class="text-[11px] text-gray-400 line-through">${store.formatPrice(p.originalPrice)}</div>` : ''}
                          <div class="text-base font-extrabold text-cyan-400 font-gaming">${store.formatPrice(p.price)}</div>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <button 
                            onclick="window.openProductDetailModal('${p.id}')"
                            class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs border border-slate-700 transition"
                            title="Product Details & Reviews"
                          >
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                          </button>
                          <button 
                            onclick="window.quickAddToCart('${p.id}')"
                            class="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5 ${p.stock === 0 ? 'opacity-50 pointer-events-none' : ''}"
                          >
                            <i class="fa-solid fa-cart-shopping"></i> Add
                          </button>
                        </div>
                      </div>

                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

        </div>

      </section>
    `;
  }

  // How many parts the current filters would return at a given max price.
  // Used for the live "N parts under $X" readout while the slider is dragged.
  countAtPrice(maxPrice) {
    const saved = store.filters.maxPrice;
    store.filters.maxPrice = maxPrice;
    const count = this.getFilteredProducts().length;
    store.filters.maxPrice = saved;
    return count;
  }

  getFilteredProducts() {
    let list = [...store.products];

    // Category filter
    if (store.activeCategory && store.activeCategory !== 'all') {
      list = list.filter(p => p.category === store.activeCategory);
    }

    // Keyword Search filter
    if (store.searchQuery) {
      const q = store.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Brand filter
    if (store.filters.brands.length > 0) {
      list = list.filter(p => store.filters.brands.includes(p.brand));
    }

    // Price Max filter
    list = list.filter(p => p.price <= store.filters.maxPrice);

    // In Stock Only filter
    if (store.filters.inStockOnly) {
      list = list.filter(p => p.stock > 0);
    }

    // Gaming Only filter
    if (store.filters.gamingOnly) {
      list = list.filter(p => p.isGaming);
    }

    // Sorting
    if (store.filters.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (store.filters.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (store.filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (store.filters.sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return list;
  }
}

window.ProductCatalogComponent = new ProductCatalog();