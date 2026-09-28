// Hero Showcase Component
// User Requirement: "the first thing will be in the home page is Feature product, latest product, best sellers all 3 side by side floating"

class HeroShowcase {
  constructor() {
    this.container = null;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Find the 3 highlighted items
    const featured = store.products.find(p => p.isFeatured) || store.products[0];
    const latest = store.products.find(p => p.isLatest) || store.products[1];
    const bestSeller = store.products.find(p => p.isBestSeller) || store.products[2];

    this.container.innerHTML = `
      <section class="mb-10">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest font-tech">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Curated Elite Hardware
            </div>
            <h2 class="text-xl sm:text-3xl font-extrabold font-gaming text-white tracking-wide mt-1 leading-tight">
              FLAGSHIP <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">TRIO SPOTLIGHT</span>
            </h2>
          </div>
          <div class="text-xs text-gray-400 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="flex items-center gap-1"><i class="fa-solid fa-bolt text-amber-400"></i> Tested Compatibility</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-truck-fast text-cyan-400"></i> Express Delivery</span>
          </div>
        </div>

        <!-- 3 SIDE-BY-SIDE FLOATING CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <!-- ?? CARD 1: FEATURED PRODUCT -->
          <div class="card-floating glass-panel rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden group">
            <!-- Glow Accent -->
            <div class="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <!-- Top Badge -->
              <div class="flex items-center justify-between mb-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-tech uppercase tracking-wider">
                  <i class="fa-solid fa-star text-amber-400"></i> FEATURED PRODUCT
                </span>
                <span class="text-xs text-gray-400 font-semibold">${featured.brand}</span>
              </div>

              <!-- Product Image with Zoom Container -->
              <div class="product-image-container rounded-xl bg-slate-900/80 p-4 mb-4 border border-slate-800 relative cursor-pointer" onclick="window.openProductDetailModal('${featured.id}')">
                <img src="${featured.image}" alt="${featured.title}" class="w-full h-48 object-cover rounded-lg" />
                <button 
                  onclick="event.stopPropagation(); window.toggleWishlist('${featured.id}')"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 flex items-center justify-center transition ${store.isInWishlist(featured.id) ? 'text-pink-500' : 'text-gray-400'}"
                  title="Add to Wishlist"
                >
                  <i class="fa-solid fa-heart text-sm"></i>
                </button>
              </div>

              <!-- Title & Key Highlight -->
              <h3 onclick="window.openProductDetailModal('${featured.id}')" class="text-base font-bold text-white hover:text-cyan-400 transition cursor-pointer line-clamp-2 mb-2">
                ${featured.title}
              </h3>
              <p class="text-xs text-gray-400 line-clamp-2 mb-3">${featured.description}</p>

              <!-- Specs Pills -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700">
                  <i class="fa-solid fa-microchip text-[9px] mr-1"></i> ${featured.category.toUpperCase()}
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-purple-300 border border-slate-700">
                  <i class="fa-solid fa-shield text-[9px] mr-1"></i> 3-Yr Warranty
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-green-300 border border-slate-700">
                  In Stock (${featured.stock})
                </span>
              </div>
            </div>

            <!-- Price & Actions Footer -->
            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <div class="text-xs text-gray-400 line-through">${store.formatPrice(featured.originalPrice)}</div>
                <div class="text-xl font-extrabold text-cyan-400 font-gaming">${store.formatPrice(featured.price)}</div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  onclick="window.openProductDetailModal('${featured.id}')"
                  class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold border border-slate-700 transition"
                  title="View Specs & Reviews"
                >
                  Details
                </button>
                <button 
                  onclick="window.quickAddToCart('${featured.id}')"
                  class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/30 transition flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-cart-plus"></i> Buy
                </button>
              </div>
            </div>
          </div>


          <!-- ? CARD 2: LATEST PRODUCT -->
          <div class="card-floating glass-panel rounded-2xl p-5 border border-purple-500/30 flex flex-col justify-between relative overflow-hidden group">
            <!-- Glow Accent -->
            <div class="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <!-- Top Badge -->
              <div class="flex items-center justify-between mb-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40 font-tech uppercase tracking-wider">
                  <i class="fa-solid fa-bolt text-purple-400"></i> LATEST PRODUCT
                </span>
                <span class="text-xs text-gray-400 font-semibold">${latest.brand}</span>
              </div>

              <!-- Product Image with Zoom Container -->
              <div class="product-image-container rounded-xl bg-slate-900/80 p-4 mb-4 border border-slate-800 relative cursor-pointer" onclick="window.openProductDetailModal('${latest.id}')">
                <img src="${latest.image}" alt="${latest.title}" class="w-full h-48 object-cover rounded-lg" />
                <button 
                  onclick="event.stopPropagation(); window.toggleWishlist('${latest.id}')"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 flex items-center justify-center transition ${store.isInWishlist(latest.id) ? 'text-pink-500' : 'text-gray-400'}"
                  title="Add to Wishlist"
                >
                  <i class="fa-solid fa-heart text-sm"></i>
                </button>
              </div>

              <!-- Title & Key Highlight -->
              <h3 onclick="window.openProductDetailModal('${latest.id}')" class="text-base font-bold text-white hover:text-purple-400 transition cursor-pointer line-clamp-2 mb-2">
                ${latest.title}
              </h3>
              <p class="text-xs text-gray-400 line-clamp-2 mb-3">${latest.description}</p>

              <!-- Specs Pills -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-purple-300 border border-slate-700">
                  <i class="fa-solid fa-sparkles text-[9px] mr-1"></i> Next-Gen Tech
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700">
                  3D V-Cache
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-green-300 border border-slate-700">
                  In Stock (${latest.stock})
                </span>
              </div>
            </div>

            <!-- Price & Actions Footer -->
            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <div class="text-xs text-gray-400 line-through">${store.formatPrice(latest.originalPrice)}</div>
                <div class="text-xl font-extrabold text-purple-400 font-gaming">${store.formatPrice(latest.price)}</div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  onclick="window.openProductDetailModal('${latest.id}')"
                  class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold border border-slate-700 transition"
                  title="View Specs & Reviews"
                >
                  Details
                </button>
                <button 
                  onclick="window.quickAddToCart('${latest.id}')"
                  class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30 transition flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-cart-plus"></i> Buy
                </button>
              </div>
            </div>
          </div>


          <!-- ?? CARD 3: BEST SELLER -->
          <div class="card-floating glass-panel rounded-2xl p-5 border border-amber-500/30 flex flex-col justify-between relative overflow-hidden group">
            <!-- Glow Accent -->
            <div class="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <!-- Top Badge -->
              <div class="flex items-center justify-between mb-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-tech uppercase tracking-wider">
                  <i class="fa-solid fa-crown text-amber-400"></i> BEST SELLER
                </span>
                <span class="text-xs text-gray-400 font-semibold">${bestSeller.brand}</span>
              </div>

              <!-- Product Image with Zoom Container -->
              <div class="product-image-container rounded-xl bg-slate-900/80 p-4 mb-4 border border-slate-800 relative cursor-pointer" onclick="window.openProductDetailModal('${bestSeller.id}')">
                <img src="${bestSeller.image}" alt="${bestSeller.title}" class="w-full h-48 object-cover rounded-lg" />
                <button 
                  onclick="event.stopPropagation(); window.toggleWishlist('${bestSeller.id}')"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 flex items-center justify-center transition ${store.isInWishlist(bestSeller.id) ? 'text-pink-500' : 'text-gray-400'}"
                  title="Add to Wishlist"
                >
                  <i class="fa-solid fa-heart text-sm"></i>
                </button>
              </div>

              <!-- Title & Key Highlight -->
              <h3 onclick="window.openProductDetailModal('${bestSeller.id}')" class="text-base font-bold text-white hover:text-amber-400 transition cursor-pointer line-clamp-2 mb-2">
                ${bestSeller.title}
              </h3>
              <p class="text-xs text-gray-400 line-clamp-2 mb-3">${bestSeller.description}</p>

              <!-- Star Rating & Review Count -->
              <div class="flex items-center gap-2 mb-4">
                <div class="flex items-center text-amber-400 text-xs">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <span class="text-xs font-bold text-gray-200">${bestSeller.rating}</span>
                <span class="text-xs text-gray-400">(${bestSeller.reviewCount} reviews)</span>
              </div>
            </div>

            <!-- Price & Actions Footer -->
            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <div class="text-xs text-gray-400 line-through">${store.formatPrice(bestSeller.originalPrice)}</div>
                <div class="text-xl font-extrabold text-amber-400 font-gaming">${store.formatPrice(bestSeller.price)}</div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  onclick="window.openProductDetailModal('${bestSeller.id}')"
                  class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold border border-slate-700 transition"
                  title="View Specs & Reviews"
                >
                  Details
                </button>
                <button 
                  onclick="window.quickAddToCart('${bestSeller.id}')"
                  class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/30 transition flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-cart-plus"></i> Buy
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;
  }
}

window.HeroShowcaseComponent = new HeroShowcase();