// Discounted Products Feature Component
// Features Deals of the Day, Live Countdown Timer, Discount Badges, and Stock Scarcity Bars

class DiscountSection {
  constructor() {
    this.container = null;
    this.timerInterval = null;
    this.remainingSeconds = 8 * 3600 + 42 * 60 + 15; // 8h 42m 15s initial countdown
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    const discountedProducts = store.products
      .filter(p => p.discountPercent > 0 || p.originalPrice > p.price)
      .slice(0, 4);

    this.container.innerHTML = `
      <section id="discount-deals-section" class="mb-12 scroll-mt-24">
        
        <!-- Header Banner with Live Animated Countdown -->
        <div class="glass-panel rounded-2xl p-5 sm:p-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 shadow-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest font-tech">
              <i class="fa-solid fa-bolt animate-bounce"></i> Limited Time Offer
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold font-gaming text-white tracking-wide mt-0.5">
              FLASH DEALS & <span class="text-amber-400">DISCOUNTED HARDWARE</span>
            </h2>
            <p class="text-xs text-gray-400 mt-1">Special price drops on top-tier components before current stock sells out.</p>
          </div>

          <!-- Countdown Timer Widget -->
          <div class="flex items-center gap-2 bg-slate-950/90 border border-amber-500/40 px-4 py-2.5 rounded-2xl shadow-inner">
            <span class="text-xs text-gray-400 font-medium mr-1 hidden sm:inline">Deal ends in:</span>
            <div class="flex items-center gap-1.5 text-center font-gaming text-amber-400">
              <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1 min-w-[36px]">
                <span id="deal-timer-hours" class="text-base font-bold">08</span>
                <div class="text-[8px] text-gray-400 uppercase font-tech">HRS</div>
              </div>
              <span class="text-amber-400 font-bold">:</span>
              <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1 min-w-[36px]">
                <span id="deal-timer-minutes" class="text-base font-bold">42</span>
                <div class="text-[8px] text-gray-400 uppercase font-tech">MIN</div>
              </div>
              <span class="text-amber-400 font-bold">:</span>
              <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1 min-w-[36px]">
                <span id="deal-timer-seconds" class="text-base font-bold">15</span>
                <div class="text-[8px] text-gray-400 uppercase font-tech">SEC</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4 Discounted Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${discountedProducts.map(p => {
            const savings = p.originalPrice ? (p.originalPrice - p.price) : 0;
            const stockPct = Math.min(100, Math.max(15, (p.stock / 20) * 100));

            return `
              <div class="card-floating glass-panel rounded-2xl p-4 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between relative group transition">
                
                <!-- Discount Badge -->
                <div class="absolute top-3 left-3 z-10">
                  <span class="px-2.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg font-tech tracking-wider uppercase flex items-center gap-1">
                    <i class="fa-solid fa-fire text-[10px]"></i> -${p.discountPercent}% OFF
                  </span>
                </div>

                <!-- Wishlist Heart -->
                <button 
                  onclick="event.stopPropagation(); window.toggleWishlist('${p.id}')"
                  class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 flex items-center justify-center transition ${store.isInWishlist(p.id) ? 'text-pink-500' : 'text-gray-400'}"
                  title="Wishlist"
                >
                  <i class="fa-solid fa-heart text-xs"></i>
                </button>

                <!-- Product Thumbnail -->
                <div class="product-image-container rounded-xl bg-slate-900 p-3 mb-3 border border-slate-800/80 cursor-pointer" onclick="window.openProductDetailModal('${p.id}')">
                  <img src="${p.image}" alt="${p.title}" class="w-full h-40 object-cover rounded-lg" />
                </div>

                <!-- Brand & Title -->
                <div>
                  <div class="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">${p.brand}</div>
                  <h3 onclick="window.openProductDetailModal('${p.id}')" class="text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition cursor-pointer line-clamp-2 mb-2">
                    ${p.title}
                  </h3>

                  <!-- Stock Progress Bar -->
                  <div class="mb-3">
                    <div class="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>Stock Status</span>
                      <span class="text-amber-400 font-semibold">${p.stock <= 5 ? `Only ${p.stock} left!` : `${p.stock} in stock`}</span>
                    </div>
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-red-500 to-amber-400 h-full rounded-full" style="width: ${stockPct}%"></div>
                    </div>
                  </div>
                </div>

                <!-- Price and Action Buttons -->
                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <div class="text-[11px] text-gray-400 line-through">${store.formatPrice(p.originalPrice)}</div>
                    <div class="text-base font-extrabold text-amber-400 font-gaming">${store.formatPrice(p.price)}</div>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button 
                      onclick="window.openProductDetailModal('${p.id}')"
                      class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs border border-slate-700 transition"
                      title="View Details"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button 
                      onclick="window.quickAddToCart('${p.id}')"
                      class="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition flex items-center gap-1"
                    >
                      <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </section>
    `;

    this.startCountdown();
  }

  startCountdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
      } else {
        this.remainingSeconds = 12 * 3600; // Reset loop
      }

      const hrs = Math.floor(this.remainingSeconds / 3600);
      const mins = Math.floor((this.remainingSeconds % 3600) / 60);
      const secs = this.remainingSeconds % 60;

      const hEl = document.getElementById('deal-timer-hours');
      const mEl = document.getElementById('deal-timer-minutes');
      const sEl = document.getElementById('deal-timer-seconds');

      if (hEl) hEl.textContent = String(hrs).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }, 1000);
  }
}

window.DiscountSectionComponent = new DiscountSection();