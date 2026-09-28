// User Authentication, Profile, Wishlist & Order History Component
// Features Login/Register Tabs, Account Profile, and Customer Order History Tracking

class UserAuthModal {
  constructor() {
    this.modalEl = null;
    this.activeTab = 'login'; // 'login', 'register', 'profile', 'orders', 'wishlist'
  }

  open(tab = null) {
    if (tab) {
      this.activeTab = tab;
    } else {
      this.activeTab = store.currentUser ? 'profile' : 'login';
    }
    this.render();
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  render() {
    let container = document.getElementById('user-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'user-modal-container';
      document.body.appendChild(container);
    }
    this.modalEl = container;

    const user = store.currentUser;
    const orders = store.getUserOrders();
    const wishlistItems = store.getWishlistItems();

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-panel rounded-3xl border border-slate-700/80 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 modal-enter relative bg-slate-900/95 text-gray-100">
          
          <!-- Close Button -->
          <button onclick="window.closeUserModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 flex items-center justify-center transition z-10">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Navigation Tabs Bar -->
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
            ${user ? `
              <button onclick="window.switchUserModalTab('profile')" class="text-xs sm:text-sm font-bold uppercase font-tech px-3 py-1.5 rounded-xl transition ${this.activeTab === 'profile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'}">
                <i class="fa-regular fa-user mr-1"></i> Profile
              </button>
              <button onclick="window.switchUserModalTab('orders')" class="text-xs sm:text-sm font-bold uppercase font-tech px-3 py-1.5 rounded-xl transition ${this.activeTab === 'orders' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'}">
                <i class="fa-solid fa-clock-rotate-left mr-1"></i> Order History (${orders.length})
              </button>
              <button onclick="window.switchUserModalTab('wishlist')" class="text-xs sm:text-sm font-bold uppercase font-tech px-3 py-1.5 rounded-xl transition ${this.activeTab === 'wishlist' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:text-white'}">
                <i class="fa-solid fa-heart mr-1"></i> Wishlist (${wishlistItems.length})
              </button>
            ` : `
              <button onclick="window.switchUserModalTab('login')" class="text-xs sm:text-sm font-bold uppercase font-tech px-4 py-1.5 rounded-xl transition ${this.activeTab === 'login' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'}">
                Sign In
              </button>
              <button onclick="window.switchUserModalTab('register')" class="text-xs sm:text-sm font-bold uppercase font-tech px-4 py-1.5 rounded-xl transition ${this.activeTab === 'register' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'}">
                Create Account
              </button>
              <button onclick="window.switchUserModalTab('wishlist')" class="text-xs sm:text-sm font-bold uppercase font-tech px-4 py-1.5 rounded-xl transition ${this.activeTab === 'wishlist' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:text-white'}">
                Wishlist (${wishlistItems.length})
              </button>
            `}
          </div>

          <!-- TAB 1: LOGIN -->
          ${this.activeTab === 'login' ? `
            <div class="space-y-5">
              <div class="text-center">
                <h3 class="text-xl font-bold font-gaming text-white">WELCOME BACK</h3>
                <p class="text-xs text-gray-400 mt-1">Sign in to track orders, build custom PC carts, and claim discounts</p>
              </div>

              <!-- Login Form -->
              <form onsubmit="window.handleLoginForm(event)" class="space-y-3.5">
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Email Address</label>
                  <input type="email" id="login-email" required placeholder="name@domain.com" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Password</label>
                  <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <button type="submit" class="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition">
                  Sign In to NexusTech
                </button>
              </form>

              <div class="text-center text-xs text-gray-400">
                Don't have an account yet? 
                <button onclick="window.switchUserModalTab('register')" class="text-cyan-400 font-bold hover:underline">Register here</button>
              </div>
            </div>
          ` : ''}

          <!-- TAB 2: REGISTER -->
          ${this.activeTab === 'register' ? `
            <div class="space-y-4">
              <div class="text-center">
                <h3 class="text-xl font-bold font-gaming text-white">CREATE AN ACCOUNT</h3>
                <p class="text-xs text-gray-400 mt-1">Join Kingdom of Games & NexusTech for custom hardware perks</p>
              </div>

              <form onsubmit="window.handleRegisterForm(event)" class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Full Name</label>
                  <input type="text" id="reg-name" required placeholder="e.g. Farha Islam" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Email Address</label>
                  <input type="email" id="reg-email" required placeholder="farha@gmail.com" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Phone Number</label>
                  <input type="tel" id="reg-phone" placeholder="+880 1800-000000" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Password</label>
                  <input type="password" id="reg-password" required placeholder="••••••••" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition">
                  Create My Account
                </button>
              </form>

              <div class="text-center text-xs text-gray-400">
                Already registered? 
                <button onclick="window.switchUserModalTab('login')" class="text-cyan-400 font-bold hover:underline">Sign in</button>
              </div>
            </div>
          ` : ''}

          <!-- TAB 3: PROFILE (LOGGED IN) -->
          ${this.activeTab === 'profile' && user ? `
            <div class="space-y-6">
              <!-- User Header Card -->
              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <img src="${user.avatar}" class="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-lg" alt="${user.name}" />
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="text-lg font-bold text-white">${user.name}</h3>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}">
                        ${user.role.toUpperCase()}
                      </span>
                    </div>
                    <div class="text-xs text-gray-400 mt-0.5">${user.email}</div>
                    <div class="text-xs text-gray-500">${user.phone || '+880 1700-000346'}</div>
                  </div>
                </div>

                <div class="flex sm:flex-col gap-2">
                  <button onclick="window.switchUserModalTab('orders')" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition">
                    View Orders
                  </button>
                  <button onclick="window.handleUserLogout()" class="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/40 transition">
                    Sign Out
                  </button>
                </div>
              </div>

              <!-- Quick Stats Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400 uppercase font-tech">Lifetime Orders</div>
                  <div class="text-xl font-bold text-cyan-400 font-gaming mt-1">${user.ordersCount || orders.length}</div>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <div class="text-[10px] text-gray-400 uppercase font-tech">Total Spend</div>
                  <div class="text-xl font-bold text-emerald-400 font-gaming mt-1">${store.formatPrice(user.totalSpent || 2450)}</div>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <div class="text-[10px] text-gray-400 uppercase font-tech">Saved Wishlist</div>
                  <div class="text-xl font-bold text-pink-400 font-gaming mt-1">${store.wishlist.length} Items</div>
                </div>
              </div>

              <!-- Admin Mode Shortcut if Admin -->
              ${user.role === 'admin' ? `
                <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-screwdriver-wrench text-purple-400"></i>
                    <div>
                      <div class="text-xs font-bold text-white">Administrator Access Enabled</div>
                      <div class="text-[11px] text-purple-300">Access full CRUD product manager, category settings, and stock alerts.</div>
                    </div>
                  </div>
                  <button onclick="window.closeUserModal(); window.navigateTo('admin');" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition">
                    Open Dashboard
                  </button>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- TAB 4: ORDER HISTORY -->
          ${this.activeTab === 'orders' ? `
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold font-gaming text-white">CUSTOMER ORDER HISTORY</h3>
                  <p class="text-xs text-gray-400">Track current dispatches and download invoices</p>
                </div>
                <span class="text-xs text-cyan-400 font-bold">${orders.length} Total Orders</span>
              </div>

              ${orders.length === 0 ? `
                <div class="text-center py-12 glass-panel rounded-2xl border border-slate-800">
                  <i class="fa-solid fa-receipt text-3xl text-gray-500 mb-2"></i>
                  <h4 class="text-xs font-bold text-white">No past orders found</h4>
                  <p class="text-[11px] text-gray-400 max-w-xs mx-auto mt-1 mb-4">When you place orders for computer parts, your tracking history will appear here.</p>
                  <button onclick="window.closeUserModal(); window.navigateTo('store');" class="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
                    Start Shopping
                  </button>
                </div>
              ` : `
                <div class="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                  ${orders.map(o => `
                    <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      
                      <!-- Order Header -->
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-800/80 gap-2">
                        <div>
                          <div class="text-xs font-bold text-cyan-400 font-mono">${o.id}</div>
                          <div class="text-[10px] text-gray-400">${o.date} • ${o.shippingMethod}</div>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-xs px-2.5 py-0.5 rounded-full font-bold font-tech uppercase ${
                            o.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            o.status === 'Shipped' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                            o.status === 'Processing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-slate-800 text-gray-300'
                          }">
                            ${o.status}
                          </span>
                        </div>
                      </div>

                      <!-- Tracking Step Bar -->
                      <div class="grid grid-cols-4 gap-1 text-center text-[9px] py-1">
                        <div class="p-1 rounded bg-cyan-500/20 text-cyan-300 font-semibold">1. Placed</div>
                        <div class="p-1 rounded ${o.trackingStep >= 2 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'bg-slate-900 text-gray-600'}">2. Processing</div>
                        <div class="p-1 rounded ${o.trackingStep >= 3 ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'bg-slate-900 text-gray-600'}">3. Shipped</div>
                        <div class="p-1 rounded ${o.trackingStep >= 4 ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'bg-slate-900 text-gray-600'}">4. Delivered</div>
                      </div>

                      <!-- Ordered Items -->
                      <div class="space-y-1 text-xs">
                        ${o.items.map(item => `
                          <div class="flex justify-between items-center text-[11px] text-gray-300">
                            <span class="truncate pr-2">${item.quantity}x ${item.title}</span>
                            <span class="font-mono text-gray-400 flex-shrink-0">${store.formatPrice(item.price * item.quantity)}</span>
                          </div>
                        `).join('')}
                      </div>

                      <!-- Order Footer -->
                      <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span class="text-[11px] text-gray-400">Payment: <strong>${o.paymentMethod}</strong></span>
                        <div class="text-sm font-bold text-white font-gaming">Total: <span class="text-cyan-400">${store.formatPrice(o.total)}</span></div>
                      </div>

                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          ` : ''}

          <!-- TAB 5: WISHLIST -->
          ${this.activeTab === 'wishlist' ? `
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold font-gaming text-white">MY SAVED HARDWARE</h3>
                  <p class="text-xs text-gray-400">Parts you have saved for upcoming PC builds</p>
                </div>
                ${wishlistItems.length > 0 ? `
                  <button onclick="window.moveAllWishlistToCart()" class="px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold transition hover:bg-cyan-400">
                    Move All to Cart
                  </button>
                ` : ''}
              </div>

              ${wishlistItems.length === 0 ? `
                <div class="text-center py-12 glass-panel rounded-2xl border border-slate-800">
                  <i class="fa-regular fa-heart text-3xl text-gray-500 mb-2"></i>
                  <h4 class="text-xs font-bold text-white">Your wishlist is empty</h4>
                  <p class="text-[11px] text-gray-400 max-w-xs mx-auto mt-1 mb-4">Click the heart icon on any processor, GPU, or peripheral to save it here.</p>
                  <button onclick="window.closeUserModal(); window.navigateTo('store');" class="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
                    Explore Catalog
                  </button>
                </div>
              ` : `
                <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
                  ${wishlistItems.map(p => `
                    <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <img src="${p.image}" class="w-14 h-14 rounded-lg object-cover bg-slate-900 p-1 border border-slate-800 flex-shrink-0" />
                      <div class="flex-1 min-w-0">
                        <div class="text-xs font-bold text-white truncate">${p.title}</div>
                        <div class="text-xs font-bold text-cyan-400 font-gaming">${store.formatPrice(p.price)}</div>
                        <div class="text-[10px] text-emerald-400">${p.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                      </div>
                      <div class="flex items-center gap-2">
                        <button onclick="window.quickAddToCart('${p.id}'); window.toggleWishlist('${p.id}'); window.UserAuthModalComponent.render();" class="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition">
                          Add to Cart
                        </button>
                        <button onclick="window.toggleWishlist('${p.id}'); window.UserAuthModalComponent.render();" class="text-gray-500 hover:text-red-400 p-1.5 text-xs transition">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          ` : ''}

        </div>
      </div>
    `;

    container.classList.remove('hidden');
  }
}

window.UserAuthModalComponent = new UserAuthModal();