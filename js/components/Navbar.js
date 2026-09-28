// Navigation Bar Component
// Features Top-Right Search with Trending Products, Wishlist & Cart Counters, Auth & Admin Switcher
// Fully responsive: desktop keeps the inline search, phones get a collapsible full-width search row.

class Navbar {
  constructor() {
    this.container = null;
    this.mobileSearchOpen = false;
    this._outsideListenerBound = false;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    const cartCount = store.getCartCount();
    const wishlistCount = store.wishlist.length;
    const user = store.currentUser;
    const isAdmin = user && user.role === 'admin';
    const isStoreView = store.view === 'store';

    this.container.innerHTML = `
      <!-- Top Announcement Bar -->
      <div class="top-announcement-bar bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border-b border-purple-900/40 text-xs py-1.5 px-3 sm:px-8 text-gray-300 flex flex-wrap justify-between items-center gap-x-3 gap-y-1.5">
        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
            SEU CSE346 SPECIAL
          </span>
          <span class="hidden sm:inline">Use code <strong class="text-cyan-400 cursor-pointer" onclick="navigator.clipboard.writeText('TECH10'); window.showToast('Copied TECH10 to clipboard! 10% OFF');">TECH10</strong> for 10% OFF | Free Shipping over ${store.formatPrice(150)}</span>
        </div>
        <div class="flex flex-wrap items-center justify-end gap-x-2.5 gap-y-1.5 sm:gap-4 text-xs">
          <!-- Currency Selector with BDT (৳) -->
          <div class="flex items-center gap-1 sm:gap-1.5 bg-slate-800/80 px-1.5 sm:px-2 py-0.5 rounded border border-gray-700">
            <span class="text-gray-400 hidden sm:inline">Currency:</span>
            <button onclick="store.setCurrency('USD')" class="hover:text-cyan-400 font-medium px-1 rounded transition ${store.currency === 'USD' ? 'text-cyan-400 font-bold bg-cyan-500/20' : 'text-gray-400'}">USD ($)</button>
            <span class="text-gray-600">|</span>
            <button onclick="store.setCurrency('BDT')" class="hover:text-cyan-400 font-medium px-1 rounded transition ${store.currency === 'BDT' ? 'text-cyan-400 font-bold bg-cyan-500/20' : 'text-gray-400'}">BDT (৳)</button>
          </div>
          <!-- Theme Selector -->
          <div class="flex items-center gap-1 bg-slate-800/80 px-1.5 sm:px-2 py-0.5 rounded border border-gray-700">
            <span class="text-gray-400 mr-0.5 hidden sm:inline">Theme:</span>
            <button onclick="store.setTheme('dark')" class="hover:text-amber-400 font-medium px-1.5 py-0.2 rounded transition flex items-center gap-1 ${store.theme === 'dark' ? 'text-amber-400 font-bold bg-amber-400/20' : 'text-gray-400'}" title="Dark Mode">
              <i class="fa-solid fa-moon text-[11px]"></i> <span class="hidden sm:inline">Dark</span>
            </button>
            <span class="text-gray-600">|</span>
            <button onclick="store.setTheme('light')" class="hover:text-amber-500 font-medium px-1.5 py-0.2 rounded transition flex items-center gap-1 ${store.theme === 'light' ? 'text-amber-500 font-bold bg-amber-400/20' : 'text-gray-400'}" title="Light Mode">
              <i class="fa-solid fa-sun text-[11px]"></i> <span class="hidden sm:inline">Light</span>
            </button>
          </div>
          <!-- Store Locator Link -->
          <button onclick="window.openStoreLocatorModal()" class="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition" title="Our Stores">
            <i class="fa-solid fa-location-dot text-cyan-400"></i>
            <span class="hidden md:inline">Our Stores</span>
          </button>
        </div>
      </div>

      <!-- Main Sticky Navigation Bar -->
      <header class="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">

          <!-- Brand Logo & Mobile Drawer Toggle -->
          <div class="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button id="btn-mobile-cat-toggle" class="lg:hidden p-2 -ml-1 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800 flex-shrink-0" title="Open Categories">
              <i class="fa-solid fa-bars text-lg sm:text-xl"></i>
            </button>
            <a href="#" onclick="window.navigateTo('store'); return false;" class="flex items-center gap-2 sm:gap-2.5 group min-w-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition flex-shrink-0">
                <i class="fa-solid fa-microchip text-base sm:text-xl text-white"></i>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-gaming text-sm sm:text-xl font-bold tracking-wider text-white truncate">NEXUS<span class="text-cyan-400">TECH</span></span>
                <span class="hidden sm:block text-[10px] tracking-widest text-purple-400 font-tech font-semibold uppercase -mt-1 truncate">Kingdom of Parts</span>
              </div>
            </a>
          </div>

          <!-- Quick Navigation Links (Center) -->
          <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button onclick="window.navigateTo('store')" class="${isStoreView ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:text-white'} transition flex items-center gap-1.5">
              <i class="fa-solid fa-house text-xs"></i> Home
            </button>
            <a href="#kingdom-games-section" class="text-purple-400 hover:text-purple-300 transition flex items-center gap-1.5 font-bold">
              <i class="fa-solid fa-gamepad text-xs"></i> Kingdom of Games
            </a>
            <a href="#discount-deals-section" class="text-amber-400 hover:text-amber-300 transition flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-bolt text-xs"></i> Flash Deals
            </a>
            <a href="#catalog-grid-section" class="text-gray-300 hover:text-white transition flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-boxes-stacked text-xs"></i> All Parts
            </a>
          </nav>

          <!-- Right Action Zone -->
          <div class="flex items-center gap-1 sm:gap-2.5 md:gap-3.5 flex-shrink-0">

            <!-- Desktop Inline Search -->
            <div class="relative hidden md:block" id="navbar-search-wrapper">
              <div class="flex items-center bg-slate-900/90 border border-slate-700 hover:border-cyan-500/60 focus-within:border-cyan-500 rounded-full px-3.5 py-1.5 transition w-44 md:w-64 lg:w-80 shadow-inner">
                <i class="fa-solid fa-magnifying-glass text-gray-400 mr-2.5 text-sm"></i>
                <input
                  type="text"
                  id="navbar-search-input"
                  placeholder="Search RTX 4090, CPUs, SSDs..."
                  class="bg-transparent text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none w-full"
                  autocomplete="off"
                />
                <button id="navbar-search-clear" class="hidden text-gray-400 hover:text-white text-xs ml-1">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              ${this.buildSuggestionsPopover('search-suggestions-popover', 'search-autocomplete-results', 'right-0 w-80 lg:w-96')}
            </div>

            <!-- Mobile Search Toggle -->
            <button id="btn-mobile-search-toggle" class="md:hidden p-2 text-gray-300 hover:text-cyan-400 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-center" title="Search">
              <i class="fa-solid fa-magnifying-glass text-lg"></i>
            </button>

            <!-- Quick 1-Click Theme Switcher Button (hidden on phones, announcement bar covers it) -->
            <button
              onclick="store.toggleTheme()"
              class="relative p-2 sm:p-2.5 text-gray-300 hover:text-amber-400 rounded-xl hover:bg-slate-800/80 transition border border-slate-700/60 bg-slate-900/60 items-center justify-center hidden sm:flex"
              title="Switch to ${store.theme === 'dark' ? 'Light' : 'Dark'} Mode"
              id="theme-quick-toggle-btn"
            >
              ${store.theme === 'dark'
                ? '<i class="fa-solid fa-sun text-amber-400 text-lg"></i>'
                : '<i class="fa-solid fa-moon text-indigo-400 text-lg"></i>'}
            </button>

            <!-- Wishlist Button -->
            <button onclick="window.openWishlistDrawer()" class="relative p-2 sm:p-2.5 text-gray-300 hover:text-pink-400 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-center" title="Wishlist">
              <i class="fa-solid fa-heart text-lg"></i>
              ${wishlistCount > 0 ? `
                <span class="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 rounded-full bg-pink-600 text-[10px] font-bold text-white flex items-center justify-center shadow">
                  ${wishlistCount}
                </span>
              ` : ''}
            </button>

            <!-- Shopping Cart Button -->
            <button onclick="window.openCartDrawer()" class="relative p-2 sm:p-2.5 text-gray-300 hover:text-cyan-400 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-center" title="Shopping Cart">
              <i class="fa-solid fa-cart-shopping text-lg"></i>
              ${cartCount > 0 ? `
                <span class="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  ${cartCount}
                </span>
              ` : ''}
            </button>

            <!-- User Auth / Profile Button -->
            <button onclick="window.openAuthModal()" class="flex items-center gap-2 p-1 sm:p-1.5 sm:px-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-cyan-500/60 transition" title="Account">
              ${user ? `
                <img src="${user.avatar}" class="w-7 h-7 rounded-full object-cover border border-cyan-400" alt="${user.name}" />
                <span class="hidden sm:inline text-xs font-semibold text-gray-200 max-w-[90px] truncate">${user.name.split(' ')[0]}</span>
              ` : `
                <i class="fa-regular fa-user text-gray-300 text-base"></i>
                <span class="hidden sm:inline text-xs font-medium text-gray-200">Sign In</span>
              `}
            </button>

            <!-- Admin Portal Switch Button (visible only to authenticated administrators) -->
            ${isAdmin ? `
            <button
              onclick="window.toggleAdminPortal()"
              class="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold border transition ${
                store.view === 'admin'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-purple-300 border-purple-600/40 hover:bg-purple-950/40'
              }"
              title="Toggle Admin Management Portal"
            >
              <i class="fa-solid fa-screwdriver-wrench"></i>
              <span class="hidden sm:inline">${store.view === 'admin' ? 'Store View' : 'Admin'}</span>
            </button>
            ` : ''}

          </div>
        </div>

        <!-- Mobile Collapsible Search Row -->
        <div id="mobile-search-row" class="md:hidden border-t border-slate-800 px-3 sm:px-6 py-3 bg-slate-950/95 ${this.mobileSearchOpen ? '' : 'hidden'}">
          <div class="relative" id="navbar-search-wrapper-mobile">
            <div class="flex items-center bg-slate-900 border border-slate-700 focus-within:border-cyan-500 rounded-full px-3.5 py-2 transition shadow-inner">
              <i class="fa-solid fa-magnifying-glass text-gray-400 mr-2.5 text-sm"></i>
              <input
                type="text"
                id="navbar-search-input-mobile"
                placeholder="Search RTX 4090, CPUs, SSDs..."
                class="bg-transparent text-sm text-gray-100 placeholder-gray-500 focus:outline-none w-full"
                autocomplete="off"
                inputmode="search"
              />
              <button id="navbar-search-clear-mobile" class="hidden text-gray-400 hover:text-white text-xs ml-1">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            ${this.buildSuggestionsPopover('search-suggestions-popover-mobile', 'search-autocomplete-results-mobile', 'left-0 right-0 w-auto')}
          </div>
        </div>
      </header>
    `;

    this.bindSearchEvents();
  }

  buildSuggestionsPopover(popoverId, resultsId, positionClasses) {
    return `
      <div id="${popoverId}" class="hidden absolute ${positionClasses} mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 z-50 glass-panel modal-enter">
        <div class="mb-3">
          <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span class="font-semibold text-gray-300 flex items-center gap-1.5">
              <i class="fa-solid fa-arrow-trend-up text-cyan-400"></i> Trending Searches
            </span>
            <span class="text-[10px] text-cyan-400 uppercase tracking-wide font-tech">Hot Right Now</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${store.trendingSearches.map(term => `
              <button class="trending-tag text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-gray-300 border border-slate-700/80 transition" data-term="${term}" data-popover="${popoverId}" data-target-input="${popoverId === 'search-suggestions-popover' ? 'navbar-search-input' : 'navbar-search-input-mobile'}">
                ${term}
              </button>
            `).join('')}
          </div>
        </div>

        <div id="${resultsId}" class="border-t border-slate-800 pt-2.5 max-h-64 overflow-y-auto">
          <p class="text-xs text-gray-400">Type at least 2 characters to search components...</p>
        </div>
      </div>
    `;
  }

  buildResultHtml(matches, query, popoverId) {
    if (matches.length === 0) {
      return `<p class="text-xs text-gray-400 py-2">No components found for "<strong>${query}</strong>". Try RTX, Ryzen, or Corsair!</p>`;
    }

    return `
      <div class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Matching Products (${matches.length})</div>
      <div class="space-y-2">
        ${matches.map(p => `
          <div onclick="window.openProductDetailModal('${p.id}'); document.getElementById('${popoverId}').classList.add('hidden');" class="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 cursor-pointer transition">
            <img src="${p.image}" class="w-10 h-10 rounded-lg object-cover bg-slate-900 p-0.5 border border-slate-700" alt="${p.title}" />
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-gray-200 truncate">${p.title}</div>
              <div class="text-[11px] text-cyan-400 font-bold">${store.formatPrice(p.price)}</div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-gray-300 uppercase hidden sm:inline">${p.category}</span>
          </div>
        `).join('')}
      </div>
      <button onclick="window.executeCatalogSearch('${query}'); document.getElementById('${popoverId}').classList.add('hidden');" class="w-full mt-2.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-xs font-semibold transition text-center border border-cyan-500/30">
        View all results for "${query}" &rarr;
      </button>
    `;
  }

  bindSearchInstance(config) {
    const input = document.getElementById(config.inputId);
    const popover = document.getElementById(config.popoverId);
    const resultsContainer = document.getElementById(config.resultsId);
    const clearBtn = document.getElementById(config.clearId);
    if (!input || !popover || !resultsContainer || !clearBtn) return;

    const placeholder = '<p class="text-xs text-gray-400">Type at least 2 characters to search components...</p>';

    input.addEventListener('focus', () => {
      this.closeAllPopoversExcept(config.popoverId);
      popover.classList.remove('hidden');
    });

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearBtn.classList.toggle('hidden', query.length === 0);

      if (query.length < 2) {
        resultsContainer.innerHTML = placeholder;
        return;
      }

      const q = query.toLowerCase();
      const matches = store.products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);

      resultsContainer.innerHTML = this.buildResultHtml(matches, query, config.popoverId);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      resultsContainer.innerHTML = placeholder;
      input.focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          window.executeCatalogSearch(query);
          popover.classList.add('hidden');
          if (config.onSearch) config.onSearch();
        }
      }
    });
  }

  closeAllPopoversExcept(popoverId) {
    ['search-suggestions-popover', 'search-suggestions-popover-mobile'].forEach(id => {
      if (id === popoverId) return;
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
  }

  bindSearchEvents() {
    this.bindSearchInstance({
      inputId: 'navbar-search-input',
      popoverId: 'search-suggestions-popover',
      resultsId: 'search-autocomplete-results',
      clearId: 'navbar-search-clear'
    });

    this.bindSearchInstance({
      inputId: 'navbar-search-input-mobile',
      popoverId: 'search-suggestions-popover-mobile',
      resultsId: 'search-autocomplete-results-mobile',
      clearId: 'navbar-search-clear-mobile',
      onSearch: () => { this.setMobileSearchOpen(false); }
    });

    // Trending chips (both desktop and mobile popovers)
    document.querySelectorAll('.trending-tag').forEach(chip => {
      chip.addEventListener('click', () => {
        const term = chip.getAttribute('data-term');
        const popoverId = chip.getAttribute('data-popover');
        const targetInput = document.getElementById(chip.getAttribute('data-target-input'));
        if (targetInput) targetInput.value = term;
        const pop = document.getElementById(popoverId);
        if (pop) pop.classList.add('hidden');
        window.executeCatalogSearch(term);
      });
    });

    // Single document-level click-outside handler (registered once per Navbar instance)
    if (!this._outsideListenerBound) {
      this._outsideListenerBound = true;
      document.addEventListener('click', (e) => {
        [['navbar-search-wrapper', 'search-suggestions-popover'],
         ['navbar-search-wrapper-mobile', 'search-suggestions-popover-mobile']].forEach(([wrapperId, popoverId]) => {
          const wrapper = document.getElementById(wrapperId);
          const pop = document.getElementById(popoverId);
          if (wrapper && pop && !wrapper.contains(e.target)) pop.classList.add('hidden');
        });
      });
    }

    // Mobile search row toggle
    const searchToggle = document.getElementById('btn-mobile-search-toggle');
    if (searchToggle) {
      searchToggle.addEventListener('click', () => {
        this.setMobileSearchOpen(!this.mobileSearchOpen, true);
      });
    }

    // Mobile category drawer toggle
    const mobileCatBtn = document.getElementById('btn-mobile-cat-toggle');
    if (mobileCatBtn) {
      mobileCatBtn.addEventListener('click', () => {
        window.toggleMobileCategoryDrawer();
      });
    }
  }

  setMobileSearchOpen(open, focusInput) {
    this.mobileSearchOpen = open;
    const row = document.getElementById('mobile-search-row');
    if (!row) return;
    row.classList.toggle('hidden', !open);
    if (!open) {
      const pop = document.getElementById('search-suggestions-popover-mobile');
      if (pop) pop.classList.add('hidden');
      return;
    }
    if (focusInput) {
      const input = document.getElementById('navbar-search-input-mobile');
      if (input) setTimeout(() => input.focus(), 50);
    }
  }
}

window.NavbarComponent = new Navbar();
