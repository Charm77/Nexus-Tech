// Store Locator & Physical Outlets Component
// Explicit requirement in Customer Features: "Store find location"

class StoreLocator {
  constructor() {
    this.modalEl = null;
    this.selectedStoreId = 'store-seu';
  }

  open() {
    this.render();
    if (this.modalEl) {
      this.modalEl.classList.remove('hidden');
    }
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  render() {
    let container = document.getElementById('store-locator-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'store-locator-container';
      document.body.appendChild(container);
    }
    this.modalEl = container;

    const stores = store.stores;
    const currentStore = stores.find(s => s.id === this.selectedStoreId) || stores[0];

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-panel rounded-3xl border border-slate-700/80 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 modal-enter relative bg-slate-900/95 text-gray-100">
          
          <!-- Close Button -->
          <button onclick="window.closeStoreLocatorModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 flex items-center justify-center transition">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Header -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold font-gaming text-white">FIND OUR OUTLETS & EXPERTS</h3>
              <p class="text-xs text-gray-400">Visit our physical stores for hands-on gaming testing, custom PC builds, and student discounts</p>
            </div>
          </div>

          <!-- Grid: Store List on Left + Map & Details on Right -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Left: Outlets Selector -->
            <div class="space-y-2.5 md:col-span-1">
              <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-tech block mb-1">
                Official Locations (${stores.length})
              </span>
              ${stores.map(s => `
                <div 
                  onclick="window.selectStoreOutlet('${s.id}')"
                  class="p-3.5 rounded-2xl border cursor-pointer transition ${this.selectedStoreId === s.id ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md' : 'bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700'}"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold truncate">${s.name}</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">${s.city}</span>
                  </div>
                  <p class="text-[11px] text-gray-400 line-clamp-1">${s.address}</p>
                </div>
              `).join('')}
            </div>

            <!-- Right: Selected Store Detail & Visual Map Card -->
            <div class="md:col-span-2 space-y-4">
              
              <!-- Stylized Interactive Map Mockup -->
              <div class="rounded-2xl bg-slate-950 border border-slate-800 h-52 relative overflow-hidden flex flex-col justify-end p-4 group">
                <!-- Grid background & Radar animation -->
                <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div class="relative">
                    <div class="w-10 h-10 rounded-full bg-cyan-500/30 animate-ping absolute inset-0"></div>
                    <div class="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-base font-bold shadow-lg shadow-cyan-500/50 relative z-10">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                  </div>
                  <div class="mt-2 text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/40 shadow">
                    ${currentStore.name}
                  </div>
                </div>

                <div class="relative z-10 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800">
                  <span class="text-gray-300"><i class="fa-solid fa-compass text-cyan-400 mr-1"></i> Lat: ${currentStore.lat}, Lng: ${currentStore.lng}</span>
                  <a href="https://maps.google.com" target="_blank" class="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                    <span>Open in Google Maps</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>
                </div>
              </div>

              <!-- Store Details Box -->
              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs">
                <div>
                  <div class="text-[11px] text-cyan-400 font-bold uppercase font-tech tracking-wider">${currentStore.type}</div>
                  <h4 class="text-base font-bold text-white mt-0.5">${currentStore.name}</h4>
                  <p class="text-gray-300 mt-1"><i class="fa-solid fa-map-pin text-cyan-400 mr-1.5"></i> ${currentStore.address}</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <span class="text-gray-400 block text-[11px]">Opening Hours:</span>
                    <span class="text-white font-semibold">${currentStore.hours}</span>
                  </div>
                  <div>
                    <span class="text-gray-400 block text-[11px]">Hotline / WhatsApp:</span>
                    <span class="text-cyan-400 font-mono font-bold">${currentStore.phone}</span>
                  </div>
                </div>

                <!-- Services Offered Pills -->
                <div class="pt-2 border-t border-slate-800">
                  <span class="text-[11px] text-gray-400 font-bold block mb-1.5 uppercase font-tech">Available Services</span>
                  <div class="flex flex-wrap gap-1.5">
                    ${currentStore.services.map(srv => `
                      <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-gray-200 border border-slate-700 text-[11px] flex items-center gap-1.5">
                        <i class="fa-solid fa-check text-emerald-400 text-[10px]"></i> ${srv}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    `;

    container.classList.remove('hidden');
  }

  selectStore(id) {
    this.selectedStoreId = id;
    this.render();
  }
}

window.StoreLocatorComponent = new StoreLocator();