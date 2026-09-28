// Shopping Cart Drawer Component
// Slide-Over Cart Drawer with Quantity Controls, Promo Coupons, Cost Calculation, and Checkout Bridge

class CartDrawer {
  constructor() {
    this.drawerEl = null;
  }

  open() {
    this.render();
    if (this.drawerEl) {
      this.drawerEl.classList.remove('hidden');
    }
  }

  close() {
    if (this.drawerEl) {
      this.drawerEl.classList.add('hidden');
    }
  }

  render() {
    let container = document.getElementById('cart-drawer-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cart-drawer-container';
      document.body.appendChild(container);
    }
    this.drawerEl = container;

    const cart = store.getCart();
    const totals = store.getCartTotals();
    const cartCount = store.getCartCount();

    container.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
        <div class="absolute inset-0" onclick="window.closeCartDrawer()"></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between modal-enter text-gray-100">
            
            <!-- Drawer Header -->
            <div class="p-5 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-cart-shopping text-cyan-400 text-lg"></i>
                <h3 class="font-gaming text-base font-bold text-white tracking-wider">YOUR CART</h3>
                <span class="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  ${cartCount} items
                </span>
              </div>
              <button onclick="window.closeCartDrawer()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 flex items-center justify-center transition">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Cart Items List -->
            <div class="flex-1 overflow-y-auto p-5 space-y-4">
              ${cart.length === 0 ? `
                <div class="text-center py-16">
                  <div class="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-2xl text-gray-400 mb-3">
                    <i class="fa-solid fa-basket-shopping"></i>
                  </div>
                  <h4 class="text-sm font-bold text-white mb-1">Your cart is empty</h4>
                  <p class="text-xs text-gray-400 max-w-xs mx-auto mb-6">Explore our top processors, GPUs, and gaming rigs to start building!</p>
                  <button onclick="window.closeCartDrawer(); window.navigateTo('store');" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition">
                    Browse Hardware
                  </button>
                </div>
              ` : cart.map(item => `
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex gap-3 items-center relative group">
                  <!-- Thumbnail -->
                  <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover bg-slate-900 p-1 border border-slate-800 flex-shrink-0" />

                  <!-- Details -->
                  <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-bold text-white truncate mb-1" title="${item.title}">${item.title}</h5>
                    <div class="text-xs font-extrabold text-cyan-400 font-gaming mb-2">${store.formatPrice(item.price)}</div>
                    
                    <!-- Quantity Buttons -->
                    <div class="flex items-center gap-2">
                      <div class="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                        <button onclick="window.updateCartQty('${item.productId}', ${item.quantity - 1})" class="w-6 h-6 rounded bg-slate-800 text-gray-300 hover:text-white flex items-center justify-center text-xs font-bold">-</button>
                        <span class="w-7 text-center text-xs font-bold text-white">${item.quantity}</span>
                        <button onclick="window.updateCartQty('${item.productId}', ${item.quantity + 1})" class="w-6 h-6 rounded bg-slate-800 text-gray-300 hover:text-white flex items-center justify-center text-xs font-bold">+</button>
                      </div>
                      <span class="text-[10px] text-gray-400">Total: ${store.formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <button onclick="window.removeFromCart('${item.productId}')" class="text-gray-500 hover:text-red-400 p-1.5 transition text-xs" title="Remove">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              `).join('')}
            </div>

            <!-- Drawer Footer with Promo Code & Totals -->
            ${cart.length > 0 ? `
              <div class="p-5 border-t border-slate-800 bg-slate-950/90 space-y-4">
                
                <!-- Coupon Code Box -->
                <div>
                  ${totals.coupon ? `
                    <div class="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
                      <div class="flex items-center gap-1.5 text-emerald-300 font-semibold">
                        <i class="fa-solid fa-ticket"></i>
                        <span>Coupon <strong>${totals.coupon.code}</strong> Applied</span>
                      </div>
                      <button onclick="window.removeCartCoupon()" class="text-gray-400 hover:text-red-400 text-xs font-bold">Remove</button>
                    </div>
                  ` : `
                    <div class="flex gap-2">
                      <input 
                        type="text" 
                        id="cart-coupon-input" 
                        placeholder="Promo code (e.g. TECH10)" 
                        class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button onclick="window.applyCartCoupon()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition">
                        Apply
                      </button>
                    </div>
                  `}
                </div>

                <!-- Price Breakdown -->
                <div class="space-y-1.5 text-xs text-gray-300 border-t border-slate-800/80 pt-3">
                  <div class="flex justify-between">
                    <span class="text-gray-400">Subtotal:</span>
                    <span>${store.formatPrice(totals.subtotal)}</span>
                  </div>
                  ${totals.discount > 0 ? `
                    <div class="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount (${totals.coupon ? totals.coupon.code : ''}):</span>
                      <span>-${store.formatPrice(totals.discount)}</span>
                    </div>
                  ` : ''}
                  <div class="flex justify-between">
                    <span class="text-gray-400">VAT / Tax (5%):</span>
                    <span>${store.formatPrice(totals.tax)}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Shipping:</span>
                    <span>${totals.shipping === 0 ? '<span class="text-emerald-400 font-bold">FREE</span>' : store.formatPrice(totals.shipping)}</span>
                  </div>
                  <div class="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800 font-gaming">
                    <span>Estimated Total:</span>
                    <span class="text-cyan-400 text-base">${store.formatPrice(totals.total)}</span>
                  </div>
                </div>

                <!-- Checkout & Clear Buttons -->
                <div class="space-y-2">
                  <button 
                    onclick="window.closeCartDrawer(); window.openCheckoutModal();"
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition flex items-center justify-center gap-2"
                  >
                    <i class="fa-solid fa-lock text-xs"></i> Proceed to Checkout
                  </button>
                  <button onclick="window.clearUserCart()" class="w-full py-1.5 text-[11px] text-gray-400 hover:text-red-400 text-center transition">
                    Empty Cart
                  </button>
                </div>

              </div>
            ` : ''}

          </div>
        </div>
      </div>
    `;

    container.classList.remove('hidden');
  }
}

window.CartDrawerComponent = new CartDrawer();