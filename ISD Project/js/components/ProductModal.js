// Product Detail Modal Component
// In-Depth Product Page View with Image Gallery, Technical Specs, Compatibility Checker, and Reviews System

class ProductModal {
  constructor() {
    this.modalEl = null;
    this.currentProduct = null;
    this.selectedQuantity = 1;
    this.selectedImage = null;
    this.activeTab = 'specs'; // 'specs', 'benchmarks', 'reviews'
  }

  open(productId) {
    const product = store.getProductById(productId);
    if (!product) return;

    this.currentProduct = product;
    this.selectedQuantity = 1;
    this.selectedImage = product.image;
    this.activeTab = 'specs';

    this.render();
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  render() {
    let container = document.getElementById('product-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'product-modal-container';
      document.body.appendChild(container);
    }
    this.modalEl = container;

    const p = this.currentProduct;
    const inWishlist = store.isInWishlist(p.id);
    const reviews = store.getProductReviews(p.id);
    const hasBenchmarks = p.benchmarks && Object.keys(p.benchmarks).length > 0;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-panel rounded-3xl border border-slate-700/80 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 modal-enter relative bg-slate-900/95 text-gray-100">
          
          <!-- Close Button -->
          <button onclick="window.closeProductModal()" class="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center border border-slate-700 transition z-10">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>

          <!-- Top Grid: Gallery on Left + Info & Purchase on Right -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <!-- LEFT: IMAGE GALLERY -->
            <div>
              <!-- Large Preview Image -->
              <div class="rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-center justify-center mb-4 relative overflow-hidden group">
                <img id="detail-main-img" src="${this.selectedImage}" alt="${p.title}" class="w-full h-72 sm:h-80 object-contain rounded-xl transition duration-300" />
                ${p.discountPercent > 0 ? `
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white font-tech uppercase">
                    -${p.discountPercent}% OFF
                  </span>
                ` : ''}
              </div>

              <!-- Thumbnails Selector -->
              <div class="flex items-center gap-2.5 overflow-x-auto pb-2">
                ${(p.gallery || [p.image]).map(imgUrl => `
                  <button 
                    onclick="window.switchProductDetailImage('${imgUrl}')" 
                    class="w-16 h-16 rounded-xl bg-slate-950 p-1 border transition flex-shrink-0 ${this.selectedImage === imgUrl ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'}"
                  >
                    <img src="${imgUrl}" class="w-full h-full object-cover rounded-lg" />
                  </button>
                `).join('')}
              </div>

              <!-- Compatibility Quick Note Banner -->
              ${p.compatibilityNote ? `
                <div class="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2.5">
                  <i class="fa-solid fa-circle-info text-cyan-400 mt-0.5"></i>
                  <div>
                    <strong class="font-bold">Hardware Compatibility:</strong>
                    <div class="text-gray-300 mt-0.5">${p.compatibilityNote}</div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- RIGHT: PRODUCT SUMMARY & PURCHASE CONTROLS -->
            <div class="flex flex-col justify-between">
              <div>
                <!-- Brand & Category -->
                <div class="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-tech font-bold mb-2">
                  <span class="text-cyan-400">${p.brand}</span>
                  <span class="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">${p.category}</span>
                </div>

                <!-- Title -->
                <h1 class="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                  ${p.title}
                </h1>

                <!-- Rating & Reviews Bar -->
                <div class="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800 text-xs">
                  <div class="flex items-center text-amber-400">
                    <i class="fa-solid fa-star"></i>
                    <span class="ml-1.5 font-bold text-white">${p.rating}</span>
                  </div>
                  <span class="text-gray-500">|</span>
                  <button onclick="window.switchProductDetailTab('reviews')" class="text-cyan-400 hover:underline">
                    ${reviews.length} Verified Reviews
                  </button>
                  <span class="text-gray-500">|</span>
                  <span class="text-emerald-400 font-semibold flex items-center gap-1">
                    <i class="fa-solid fa-circle-check"></i> ${p.stock > 0 ? `${p.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>

                <!-- Pricing Box -->
                <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-5 flex items-baseline gap-3">
                  <div class="text-3xl font-black text-cyan-400 font-gaming">
                    ${store.formatPrice(p.price)}
                  </div>
                  ${p.originalPrice > p.price ? `
                    <div class="text-sm text-gray-400 line-through">
                      ${store.formatPrice(p.originalPrice)}
                    </div>
                    <span class="text-xs font-bold text-emerald-400">
                      Save ${store.formatPrice(p.originalPrice - p.price)}
                    </span>
                  ` : ''}
                </div>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  ${p.description}
                </p>
              </div>

              <!-- Quantity Selector & Action Buttons -->
              <div class="space-y-4 pt-4 border-t border-slate-800">
                <div class="flex items-center gap-4">
                  <span class="text-xs font-bold text-gray-300 uppercase font-tech">Quantity:</span>
                  <div class="flex items-center bg-slate-950 border border-slate-700 rounded-xl p-1">
                    <button onclick="window.adjustDetailQuantity(-1)" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-200 flex items-center justify-center font-bold">
                      -
                    </button>
                    <span id="detail-qty-val" class="w-10 text-center font-bold text-sm text-white">${this.selectedQuantity}</span>
                    <button onclick="window.adjustDetailQuantity(1)" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-200 flex items-center justify-center font-bold">
                      +
                    </button>
                  </div>
                  <span class="text-xs text-gray-400">Max ${p.stock} available</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onclick="window.addDetailToCart()"
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition flex items-center justify-center gap-2"
                  >
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                  </button>

                  <button 
                    onclick="window.toggleWishlist('${p.id}'); window.ProductModalComponent.render();"
                    class="w-full py-3 rounded-xl border border-slate-700 hover:border-pink-500 text-gray-200 hover:text-pink-400 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 bg-slate-800/60"
                  >
                    <i class="fa-solid fa-heart ${inWishlist ? 'text-pink-500' : ''}"></i>
                    ${inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>

                <!-- Ask AI Button for this product -->
                <button 
                  onclick="window.askAiAboutProduct('${p.id}')"
                  class="w-full py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <i class="fa-solid fa-robot text-cyan-400"></i> Ask AI Assistant about this part's compatibility
                </button>
              </div>

            </div>
          </div>

          <!-- Bottom Tabs: Specs, Benchmarks, Reviews -->
          <div class="border-t border-slate-800 pt-6">
            <div class="flex items-center gap-4 sm:gap-6 border-b border-slate-800 pb-3 mb-5 overflow-x-auto whitespace-nowrap">
              <button 
                onclick="window.switchProductDetailTab('specs')" 
                class="text-xs sm:text-sm font-bold uppercase font-tech pb-2 transition ${this.activeTab === 'specs' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}"
              >
                Technical Specifications
              </button>
              ${hasBenchmarks ? `
                <button 
                  onclick="window.switchProductDetailTab('benchmarks')" 
                  class="text-xs sm:text-sm font-bold uppercase font-tech pb-2 transition ${this.activeTab === 'benchmarks' ? 'text-purple-400 border-b-2 border-purple-400 font-bold' : 'text-gray-400 hover:text-white'}"
                >
                  Game Benchmarks
                </button>
              ` : ''}
              <button 
                onclick="window.switchProductDetailTab('reviews')" 
                class="text-xs sm:text-sm font-bold uppercase font-tech pb-2 transition ${this.activeTab === 'reviews' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : 'text-gray-400 hover:text-white'}"
              >
                Customer Reviews (${reviews.length})
              </button>
            </div>

            <!-- TAB 1: TECHNICAL SPECS TABLE -->
            ${this.activeTab === 'specs' ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${Object.entries(p.specs || {}).map(([key, val]) => `
                  <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                    <span class="text-gray-400 font-medium">${key}</span>
                    <span class="font-bold text-gray-200">${val}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- TAB 2: GAME BENCHMARKS -->
            ${this.activeTab === 'benchmarks' ? `
              <div class="space-y-3">
                ${Object.entries(p.benchmarks || {}).map(([game, fps]) => `
                  <div class="p-3.5 rounded-xl bg-slate-950/80 border border-purple-900/30 flex items-center justify-between">
                    <div class="flex items-center gap-2.5 text-xs text-gray-200 font-semibold">
                      <i class="fa-solid fa-gamepad text-purple-400"></i>
                      <span>${game}</span>
                    </div>
                    <span class="text-xs sm:text-sm font-bold text-cyan-400 font-gaming">${fps}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- TAB 3: CUSTOMER REVIEWS & FORM -->
            ${this.activeTab === 'reviews' ? `
              <div class="space-y-6">
                <!-- Submit Review Form -->
                <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <h4 class="text-sm font-bold text-white uppercase font-tech mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-pen-nib text-amber-400"></i> Write a Product Review
                  </h4>
                  <form onsubmit="window.submitProductReview(event, '${p.id}')" class="space-y-3">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1 font-medium">Your Name / Gamer Tag</label>
                        <input 
                          type="text" 
                          id="review-author-input" 
                          placeholder="e.g. Mithila Farzana" 
                          value="${store.currentUser ? store.currentUser.name : ''}" 
                          required 
                          class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label class="text-[11px] text-gray-400 block mb-1 font-medium">Rating (Stars)</label>
                        <select id="review-rating-input" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-cyan-400">
                          <option value="5">★★★★★ (5 Stars - Amazing Hardware)</option>
                          <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                          <option value="3">★★★☆☆ (3 Stars - Average)</option>
                          <option value="2">★★☆☆☆ (2 Stars - Below Expectations)</option>
                          <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="text-[11px] text-gray-400 block mb-1 font-medium">Your Review & Performance Feedback</label>
                      <textarea 
                        id="review-comment-input" 
                        rows="3" 
                        placeholder="Share your FPS benchmarks, thermals, overclocking headroom, and overall experience with this part..." 
                        required 
                        class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      ></textarea>
                    </div>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20">
                      <i class="fa-solid fa-paper-plane"></i> Submit Review
                    </button>
                  </form>
                </div>

                <!-- Existing Reviews List -->
                <div class="space-y-3">
                  ${reviews.length === 0 ? `
                    <p class="text-xs text-gray-400 py-4 text-center">No reviews yet for this product. Be the first to share your experience!</p>
                  ` : reviews.map(r => `
                    <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <div class="flex items-center justify-between mb-1.5">
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-gray-200">${r.author}</span>
                          ${r.verified ? `
                            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-semibold border border-emerald-500/30">
                              Verified Purchase
                            </span>
                          ` : ''}
                        </div>
                        <span class="text-[10px] text-gray-500">${r.date}</span>
                      </div>
                      <div class="flex items-center text-amber-400 text-xs mb-2">
                        ${Array.from({ length: 5 }).map((_, i) => `
                          <i class="fa-solid fa-star ${i < r.rating ? 'text-amber-400' : 'text-gray-700'}"></i>
                        `).join('')}
                      </div>
                      <p class="text-gray-300 leading-relaxed">${r.comment}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>

        </div>
      </div>
    `;

    container.classList.remove('hidden');
  }

  setImage(url) {
    this.selectedImage = url;
    const imgEl = document.getElementById('detail-main-img');
    if (imgEl) imgEl.src = url;
  }

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  }

  adjustQuantity(delta) {
    if (!this.currentProduct) return;
    const newQty = Math.max(1, Math.min(this.currentProduct.stock, this.selectedQuantity + delta));
    this.selectedQuantity = newQty;
    const qtyEl = document.getElementById('detail-qty-val');
    if (qtyEl) qtyEl.textContent = newQty;
  }

  addToCart() {
    if (!this.currentProduct) return;
    store.addToCart(this.currentProduct.id, this.selectedQuantity);
    window.showToast(`Added ${this.selectedQuantity}x ${this.currentProduct.title.slice(0, 25)}... to cart!`);
    this.close();
    window.openCartDrawer();
  }
}

window.ProductModalComponent = new ProductModal();