// Category Sidebar Component (Left Side, Top to Bottom Navigation)
// Renders all hardware categories vertically with icons, item counts, and quick filter shortcuts

class CategorySidebar {
  constructor() {
    this.container = null;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    const categories = store.categories;
    const activeCategory = store.activeCategory;
    const totalProducts = store.products.length;
    // The desktop sidebar is sticky, so it scrolls inside itself instead of
    // dragging the product grid along with it. The mobile drawer already scrolls.
    const isDesktopRail = containerId !== 'mobile-category-list-mount';

    this.container.innerHTML = `
      <div class="glass-panel rounded-2xl p-4 border border-slate-800 shadow-xl space-y-5 ${isDesktopRail ? 'scroll-contain max-h-[calc(100vh-7.5rem)] overflow-y-auto pr-3' : ''}">
        
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-list-check text-cyan-400"></i>
            <h3 class="font-tech text-base font-bold tracking-wide text-white uppercase">Categories</h3>
          </div>
          <span class="text-xs bg-slate-800 text-cyan-400 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
            ${totalProducts} Parts
          </span>
        </div>

        <!-- Vertical Top-to-Bottom Categories Navigation -->
        <nav class="space-y-1" id="category-list-nav">
          ${categories.map(cat => {
            const isActive = activeCategory === cat.slug;
            const count = cat.slug === 'all' 
              ? store.products.length 
              : store.products.filter(p => p.category === cat.slug).length;

            return `
              <button 
                onclick="window.selectCategory('${cat.slug}')"
                class="cat-nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border-l-4 border-cyan-400' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/60'
                }"
              >
                <div class="flex items-center gap-2.5 truncate">
                  <i class="${cat.icon} w-4 text-center ${isActive ? 'text-cyan-400' : 'text-gray-400'}"></i>
                  <span class="truncate">${cat.name}</span>
                </div>
                <span class="text-[11px] px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-cyan-400/30 text-cyan-200 font-bold' 
                    : 'bg-slate-800 text-gray-400'
                }">
                  ${count}
                </span>
              </button>
            `;
          }).join('')}
        </nav>

        <!-- Quick Experience Shortcuts -->
        <div class="pt-4 border-t border-slate-800 space-y-2">
          <div class="text-[10px] font-tech uppercase tracking-widest text-gray-400 font-bold px-1">
            Fast Portals
          </div>
          
          <a href="#kingdom-games-section" class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 text-purple-300 text-xs font-semibold transition group">
            <i class="fa-solid fa-gamepad text-purple-400 group-hover:scale-110 transition"></i>
            <span>Kingdom of Games</span>
            <span class="ml-auto text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded font-bold">VIP</span>
          </a>

          <a href="#discount-deals-section" class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 text-amber-300 text-xs font-semibold transition group">
            <i class="fa-solid fa-bolt text-amber-400 group-hover:scale-110 transition"></i>
            <span>Hot Flash Deals</span>
            <span class="ml-auto text-[9px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">SALE</span>
          </a>

          <button onclick="window.openStoreLocatorModal()" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-gray-300 text-xs font-medium transition">
            <i class="fa-solid fa-location-dot text-cyan-400"></i>
            <span>Store Locator (4 Outlets)</span>
          </button>
        </div>

        <!-- Campus / Store Badge Banner -->
        <div class="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/20 text-center">
          <div class="text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-shield-halved"></i> 100% Genuine Parts
          </div>
          <div class="text-[11px] text-gray-400 mt-1">Official Brand Warranty & SEU Student Perks</div>
        </div>

      </div>
    `;
  }
}

window.CategorySidebarComponent = new CategorySidebar();