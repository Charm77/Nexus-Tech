// Checkout & Payment Modal Component
// Multi-Step Checkout: Shipping Address -> Delivery Method -> Payment Options -> Order Confirmation & Receipt

class CheckoutModal {
  constructor() {
    this.modalEl = null;
    this.currentStep = 1; // 1: Shipping, 2: Delivery & Payment, 3: Order Confirmation
    this.selectedPaymentMethod = 'card'; // 'card', 'bkash', 'paypal', 'cod'
    this.selectedShippingMethod = 'standard';
    this.lastCreatedOrder = null;
  }

  open() {
    const cart = store.getCart();
    if (cart.length === 0) {
      window.showToast('Your cart is empty! Add parts before checking out.');
      return;
    }
    this.currentStep = 1;
    this.render();
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  render() {
    let container = document.getElementById('checkout-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'checkout-modal-container';
      document.body.appendChild(container);
    }
    this.modalEl = container;

    const cart = store.getCart();
    const totals = store.getCartTotals();
    const user = store.currentUser || { name: 'Mithila Farzana', email: 'customer@nexuspc.com', phone: '+880 1700-000346' };

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-panel rounded-3xl border border-slate-700/80 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 modal-enter relative bg-slate-900/95 text-gray-100">
          
          <!-- Close Button -->
          <button onclick="window.closeCheckoutModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 flex items-center justify-center transition">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Top Checkout Steps Indicator -->
          <div class="mb-8">
            <div class="flex items-center justify-between max-w-md mx-auto">
              <!-- Step 1 -->
              <div class="flex flex-col items-center gap-1.5">
                <div class="step-bubble w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${this.currentStep >= 1 ? 'active' : 'bg-slate-800 text-gray-400'}">
                  1
                </div>
                <span class="text-[11px] font-semibold text-gray-300 font-tech">Shipping</span>
              </div>
              <div class="flex-1 h-0.5 mx-3 ${this.currentStep >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}"></div>
              
              <!-- Step 2 -->
              <div class="flex flex-col items-center gap-1.5">
                <div class="step-bubble w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${this.currentStep >= 2 ? 'active' : 'bg-slate-800 text-gray-400'}">
                  2
                </div>
                <span class="text-[11px] font-semibold text-gray-300 font-tech">Payment</span>
              </div>
              <div class="flex-1 h-0.5 mx-3 ${this.currentStep >= 3 ? 'bg-cyan-400' : 'bg-slate-800'}"></div>
              
              <!-- Step 3 -->
              <div class="flex flex-col items-center gap-1.5">
                <div class="step-bubble w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${this.currentStep >= 3 ? 'completed' : 'bg-slate-800 text-gray-400'}">
                  3
                </div>
                <span class="text-[11px] font-semibold text-gray-300 font-tech">Receipt</span>
              </div>
            </div>
          </div>

          <!-- STEP 1: SHIPPING & CONTACT DETAILS -->
          ${this.currentStep === 1 ? `
            <div>
              <div class="flex items-center gap-2 mb-4">
                <i class="fa-solid fa-truck-ramp-box text-cyan-400 text-lg"></i>
                <h3 class="text-lg font-bold font-gaming text-white">SHIPPING & CONTACT DETAILS</h3>
              </div>

              <form onsubmit="window.proceedToStep2(event)" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-300 mb-1 font-semibold">Full Name</label>
                    <input type="text" id="chk-name" required value="${user.name}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-300 mb-1 font-semibold">Email Address</label>
                    <input type="email" id="chk-email" required value="${user.email}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-300 mb-1 font-semibold">Phone Number</label>
                    <input type="tel" id="chk-phone" required value="${user.phone || '+880 1700-000346'}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-300 mb-1 font-semibold">City / Region</label>
                    <select id="chk-city" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400">
                      <option value="Dhaka">Dhaka (Same Day / 24h Available)</option>
                      <option value="Chattogram">Chattogram (1-2 Days)</option>
                      <option value="Sylhet">Sylhet (2 Days)</option>
                      <option value="Rajshahi">Rajshahi (2 Days)</option>
                      <option value="Khulna">Khulna (2 Days)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs text-gray-300 mb-1 font-semibold">Complete Street Address</label>
                  <textarea id="chk-address" rows="2" required placeholder="House number, Road, Area (e.g. House 14, Road 5, Tejgaon, Dhaka)" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">House 251, Tejgaon Industrial Area (Near SEU Campus), Dhaka</textarea>
                </div>

                <!-- Delivery Method Selector -->
                <div class="pt-2">
                  <label class="block text-xs text-gray-300 mb-2 font-semibold">Choose Delivery Method</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label class="p-3 rounded-xl border border-slate-700 bg-slate-950/70 hover:border-cyan-400 cursor-pointer flex flex-col justify-between">
                      <div class="flex items-center gap-2 mb-1">
                        <input type="radio" name="shippingMethod" value="standard" checked onchange="window.setShippingMethod('standard')" class="text-cyan-500" />
                        <span class="text-xs font-bold text-white">Standard Courier</span>
                      </div>
                      <span class="text-[10px] text-gray-400">2-3 Business Days</span>
                      <span class="text-xs text-cyan-400 font-bold mt-1">${totals.shipping === 0 ? 'FREE' : store.formatPrice(totals.shipping)}</span>
                    </label>

                    <label class="p-3 rounded-xl border border-slate-700 bg-slate-950/70 hover:border-cyan-400 cursor-pointer flex flex-col justify-between">
                      <div class="flex items-center gap-2 mb-1">
                        <input type="radio" name="shippingMethod" value="express" onchange="window.setShippingMethod('express')" class="text-cyan-500" />
                        <span class="text-xs font-bold text-white">Express 24h</span>
                      </div>
                      <span class="text-[10px] text-gray-400">Next Day Dispatch</span>
                      <span class="text-xs text-cyan-400 font-bold mt-1">${store.formatPrice(14.99)}</span>
                    </label>

                    <label class="p-3 rounded-xl border border-slate-700 bg-slate-950/70 hover:border-cyan-400 cursor-pointer flex flex-col justify-between">
                      <div class="flex items-center gap-2 mb-1">
                        <input type="radio" name="shippingMethod" value="pickup" onchange="window.setShippingMethod('pickup')" class="text-cyan-500" />
                        <span class="text-xs font-bold text-white">Store Pickup</span>
                      </div>
                      <span class="text-[10px] text-gray-400">SEU Tejgaon Hub</span>
                      <span class="text-xs text-emerald-400 font-bold mt-1">FREE</span>
                    </label>
                  </div>
                </div>

                <div class="pt-4 flex justify-between items-center border-t border-slate-800">
                  <div class="text-xs text-gray-400">
                    Order Total: <strong class="text-cyan-400 text-sm font-gaming">${store.formatPrice(totals.total)}</strong>
                  </div>
                  <button type="submit" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition flex items-center gap-2">
                    <span>Continue to Payment</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          ` : ''}

          <!-- STEP 2: PAYMENT OPTIONS -->
          ${this.currentStep === 2 ? `
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-credit-card text-cyan-400 text-lg"></i>
                  <h3 class="text-lg font-bold font-gaming text-white">SELECT PAYMENT OPTION</h3>
                </div>
                <button onclick="window.CheckoutModalComponent.currentStep = 1; window.CheckoutModalComponent.render();" class="text-xs text-gray-400 hover:text-cyan-400 transition">
                  <i class="fa-solid fa-arrow-left mr-1"></i> Back to Shipping
                </button>
              </div>

              <!-- Payment Method Selector Tabs -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                
                <!-- Card -->
                <button 
                  onclick="window.setPaymentMethod('card')" 
                  class="p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${this.selectedPaymentMethod === 'card' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow' : 'bg-slate-950/70 border-slate-700 text-gray-300 hover:border-slate-600'}"
                >
                  <i class="fa-solid fa-credit-card text-lg"></i>
                  <span class="text-xs">Debit / Credit</span>
                </button>

                <!-- bKash / Mobile Wallet -->
                <button 
                  onclick="window.setPaymentMethod('bkash')" 
                  class="p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${this.selectedPaymentMethod === 'bkash' ? 'bg-pink-950/40 border-pink-500 text-pink-300 font-bold shadow' : 'bg-slate-950/70 border-slate-700 text-gray-300 hover:border-slate-600'}"
                >
                  <i class="fa-solid fa-mobile-screen-button text-lg"></i>
                  <span class="text-xs">bKash / Nagad</span>
                </button>

                <!-- PayPal -->
                <button 
                  onclick="window.setPaymentMethod('paypal')" 
                  class="p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${this.selectedPaymentMethod === 'paypal' ? 'bg-blue-950/40 border-blue-500 text-blue-300 font-bold shadow' : 'bg-slate-950/70 border-slate-700 text-gray-300 hover:border-slate-600'}"
                >
                  <i class="fa-brands fa-paypal text-lg"></i>
                  <span class="text-xs">PayPal</span>
                </button>

                <!-- Cash on Delivery -->
                <button 
                  onclick="window.setPaymentMethod('cod')" 
                  class="p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${this.selectedPaymentMethod === 'cod' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold shadow' : 'bg-slate-950/70 border-slate-700 text-gray-300 hover:border-slate-600'}"
                >
                  <i class="fa-solid fa-hand-holding-dollar text-lg"></i>
                  <span class="text-xs">Cash on Delivery</span>
                </button>

              </div>

              <!-- Payment Form Panels -->
              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
                
                <!-- CARD FORM -->
                ${this.selectedPaymentMethod === 'card' ? `
                  <div class="space-y-3">
                    <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span class="font-semibold text-white">Enter Card Details (Mock Sandbox)</span>
                      <div class="flex gap-2 text-base text-gray-300">
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                        <i class="fa-brands fa-cc-amex"></i>
                      </div>
                    </div>
                    <div>
                      <label class="block text-[11px] text-gray-400 mb-1">Card Number</label>
                      <input type="text" value="4532 •••• •••• 8841" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-[11px] text-gray-400 mb-1">Expiration Date</label>
                        <input type="text" value="08/28" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label class="block text-[11px] text-gray-400 mb-1">CVC / CVV</label>
                        <input type="password" value="842" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                      </div>
                    </div>
                  </div>
                ` : ''}

                <!-- BKASH / NAGAD FORM -->
                ${this.selectedPaymentMethod === 'bkash' ? `
                  <div class="space-y-3">
                    <div class="p-3 rounded-xl bg-pink-950/20 border border-pink-500/30 text-xs text-pink-300">
                      <strong>bKash / Nagad Instant Gateway:</strong> Send payment to Merchant Number: <code>+880 1700-000346</code> and paste your Transaction ID below.
                    </div>
                    <div>
                      <label class="block text-[11px] text-gray-400 mb-1">Your Mobile Wallet Number</label>
                      <input type="tel" value="+880 1822-334455" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                    </div>
                    <div>
                      <label class="block text-[11px] text-gray-400 mb-1">Transaction ID (TrxID)</label>
                      <input type="text" value="TXN-9941038" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase" />
                    </div>
                  </div>
                ` : ''}

                <!-- PAYPAL FORM -->
                ${this.selectedPaymentMethod === 'paypal' ? `
                  <div class="text-center py-4 space-y-2">
                    <i class="fa-brands fa-paypal text-3xl text-blue-400"></i>
                    <h4 class="text-xs font-bold text-white">PayPal Instant Checkout</h4>
                    <p class="text-[11px] text-gray-400">Clicking 'Confirm Order' will securely simulate PayPal one-touch transaction.</p>
                  </div>
                ` : ''}

                <!-- CASH ON DELIVERY -->
                ${this.selectedPaymentMethod === 'cod' ? `
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <i class="fa-solid fa-hand-holding-dollar text-base"></i>
                      <span>Cash on Delivery (Zero Advance Required)</span>
                    </div>
                    <p class="text-[11px] text-gray-300 leading-relaxed">
                      You can inspect all computer hardware packaging, warranty seals, and accessories when the courier arrives before handing over the cash payment.
                    </p>
                  </div>
                ` : ''}

              </div>

              <!-- Complete Order Action -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span class="text-xs text-gray-400 block">Total Due:</span>
                  <span class="text-xl font-black text-cyan-400 font-gaming">${store.formatPrice(totals.total)}</span>
                </div>
                <button 
                  onclick="window.executeFinalOrderPlacement()" 
                  class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition flex items-center gap-2"
                >
                  <i class="fa-solid fa-circle-check"></i>
                  <span>Confirm & Place Order</span>
                </button>
              </div>

            </div>
          ` : ''}

          <!-- STEP 3: ORDER CONFIRMED & INVOICE RECEIPT -->
          ${this.currentStep === 3 && this.lastCreatedOrder ? `
            <div class="text-center space-y-6">
              
              <!-- Celebration Icon -->
              <div class="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-2xl animate-bounce">
                <i class="fa-solid fa-check"></i>
              </div>

              <div>
                <span class="text-xs font-bold text-emerald-400 uppercase font-tech tracking-widest">Order Placed Successfully!</span>
                <h3 class="text-2xl font-black font-gaming text-white mt-1">THANK YOU FOR YOUR ORDER</h3>
                <p class="text-xs text-gray-400 mt-1">A confirmation receipt has been issued. Your components are being prepared for dispatch.</p>
              </div>

              <!-- Order ID Badge & Live Tracker Timeline -->
              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                  <div>
                    <span class="text-[11px] text-gray-400">Order ID:</span>
                    <span class="font-mono text-xs sm:text-sm font-bold text-cyan-400 ml-1.5">${this.lastCreatedOrder.id}</span>
                  </div>
                  <div>
                    <span class="text-[11px] text-gray-400">Date:</span>
                    <span class="text-xs text-gray-200 ml-1">${this.lastCreatedOrder.date}</span>
                  </div>
                </div>

                <!-- 4-Step Tracking Timeline -->
                <div>
                  <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-tech">Live Delivery Tracker</div>
                  <div class="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div class="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold">
                      <i class="fa-solid fa-clipboard-check block text-xs mb-1"></i> Placed
                    </div>
                    <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-500">
                      <i class="fa-solid fa-box-archive block text-xs mb-1"></i> Processing
                    </div>
                    <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-500">
                      <i class="fa-solid fa-truck-fast block text-xs mb-1"></i> Shipped
                    </div>
                    <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-500">
                      <i class="fa-solid fa-house-circle-check block text-xs mb-1"></i> Delivered
                    </div>
                  </div>
                </div>

                <!-- Itemized Summary Table -->
                <div class="border-t border-slate-800 pt-3">
                  <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-tech">Ordered Hardware</div>
                  <div class="space-y-2 max-h-40 overflow-y-auto">
                    ${this.lastCreatedOrder.items.map(item => `
                      <div class="flex items-center justify-between text-xs py-1 border-b border-slate-900">
                        <div class="flex items-center gap-2 truncate pr-2">
                          <span class="text-gray-400 font-mono">${item.quantity}x</span>
                          <span class="text-gray-200 truncate">${item.title}</span>
                        </div>
                        <span class="font-bold text-cyan-400 font-mono">${store.formatPrice(item.price * item.quantity)}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Total Row -->
                <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span class="text-gray-400 font-bold">Paid via ${this.lastCreatedOrder.paymentMethod}</span>
                  <span class="text-base font-black text-cyan-400 font-gaming">Total: ${store.formatPrice(this.lastCreatedOrder.total)}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button onclick="window.printInvoice()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-2">
                  <i class="fa-solid fa-print"></i> Print Invoice
                </button>
                <button onclick="window.closeCheckoutModal(); window.openOrderHistoryModal();" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                  <i class="fa-solid fa-clock-rotate-left"></i> View Order History
                </button>
              </div>

            </div>
          ` : ''}

        </div>
      </div>
    `;

    container.classList.remove('hidden');
  }
}

window.CheckoutModalComponent = new CheckoutModal();