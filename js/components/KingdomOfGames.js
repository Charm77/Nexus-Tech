// Kingdom of Games Component
// Specially requested highlight feature: "Components which are best for gaming" with high-octane RGB aesthetic and Interactive FPS Benchmarks

class KingdomOfGames {
  constructor() {
    this.container = null;
    this.selectedGame = 'cyberpunk';
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Filter gaming-ready items
    const gamingProducts = store.products.filter(p => p.isGaming).slice(0, 6);

    // Game FPS data presets
    const fpsData = {
      cyberpunk: {
        name: 'Cyberpunk 2077 (Overdrive RT)',
        icon: 'fa-solid fa-radiation',
        color: 'text-amber-400',
        rig4090: '135 FPS (4K DLSS 3)',
        rig4070: '94 FPS (1440p DLSS 3)',
        rx7900: '82 FPS (1440p FSR 3)'
      },
      wukong: {
        name: 'Black Myth: Wukong (Cinematic)',
        icon: 'fa-solid fa-dragon',
        color: 'text-yellow-500',
        rig4090: '112 FPS (4K Ultra)',
        rig4070: '88 FPS (1440p Very High)',
        rx7900: '85 FPS (1440p Cinematic)'
      },
      valorant: {
        name: 'Valorant (Esports Competitive)',
        icon: 'fa-solid fa-crosshairs',
        color: 'text-red-400',
        rig4090: '740 FPS (1440p)',
        rig4070: '580 FPS (1440p)',
        rx7900: '610 FPS (1440p)'
      },
      warzone: {
        name: 'Call of Duty: Warzone (4K Max)',
        icon: 'fa-solid fa-shield-virus',
        color: 'text-green-400',
        rig4090: '215 FPS (4K Ultra)',
        rig4070: '155 FPS (1440p Ultra)',
        rx7900: '170 FPS (1440p Max)'
      }
    };

    const currentFps = fpsData[this.selectedGame] || fpsData.cyberpunk;

    this.container.innerHTML = `
      <section id="kingdom-games-section" class="mb-14 scroll-mt-24">
        
        <!-- RGB Border Wrapper -->
        <div class="rgb-border shadow-2xl">
          <div class="rgb-border-inner p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/40 gaming-scanlines relative">
            
            <!-- Section Header -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 relative z-10">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-md bg-purple-600/30 text-purple-300 border border-purple-500/50 text-[11px] font-black tracking-widest font-gaming uppercase pulse-badge">
                    <i class="fa-solid fa-trophy mr-1"></i> LEVEL 99 BATTLEGROUND
                  </span>
                  <span class="text-xs text-cyan-400 font-tech uppercase tracking-wider font-semibold">
                    God-Tier Gaming Hardware
                  </span>
                </div>
                <h2 class="text-2xl sm:text-4xl font-black font-gaming text-white tracking-wider mt-2">
                  KINGDOM OF <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">GAMES</span>
                </h2>
                <p class="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                  Hand-selected components certified by esports competitors and game developers. Engineered for maximum framerates, zero stutter, and mesmerizing RGB aesthetics.
                </p>
              </div>

              <!-- Interactive FPS Benchmark Quick Selector -->
              <div class="bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl shadow-xl w-full lg:min-w-[300px]">
                <div class="flex items-center justify-between text-xs text-gray-300 font-semibold mb-2.5">
                  <span class="flex items-center gap-1.5 text-purple-300 font-gaming">
                    <i class="fa-solid fa-gauge-high text-cyan-400"></i> Live FPS Estimator
                  </span>
                  <span class="text-[10px] text-gray-400 uppercase font-tech">Select Game</span>
                </div>

                <!-- Game Switcher Buttons -->
                <div class="grid grid-cols-2 gap-1.5 mb-3" id="fps-game-buttons">
                  <button onclick="window.switchKingdomGame('cyberpunk')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${this.selectedGame === 'cyberpunk' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-gray-400 hover:text-gray-200'}">
                    <i class="fa-solid fa-radiation text-amber-400 text-xs"></i> Cyberpunk
                  </button>
                  <button onclick="window.switchKingdomGame('wukong')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${this.selectedGame === 'wukong' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-gray-400 hover:text-gray-200'}">
                    <i class="fa-solid fa-dragon text-yellow-400 text-xs"></i> Wukong
                  </button>
                  <button onclick="window.switchKingdomGame('valorant')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${this.selectedGame === 'valorant' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-gray-400 hover:text-gray-200'}">
                    <i class="fa-solid fa-crosshairs text-red-400 text-xs"></i> Valorant
                  </button>
                  <button onclick="window.switchKingdomGame('warzone')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${this.selectedGame === 'warzone' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-gray-400 hover:text-gray-200'}">
                    <i class="fa-solid fa-shield-halved text-green-400 text-xs"></i> Warzone
                  </button>
                </div>

                <!-- Benchmark Framerates Preview -->
                <div class="space-y-1.5 text-xs bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400 font-medium">RTX 4090 Rig:</span>
                    <span class="font-bold text-cyan-400 font-gaming">${currentFps.rig4090}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400 font-medium">RTX 4070 Ti Super:</span>
                    <span class="font-bold text-purple-400 font-gaming">${currentFps.rig4070}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400 font-medium">RX 7900 XTX:</span>
                    <span class="font-bold text-pink-400 font-gaming">${currentFps.rx7900}</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Gaming Showcase Grid (6 Elite Parts) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              ${gamingProducts.map(p => {
                return `
                  <div class="card-floating glass-panel rounded-2xl p-5 border border-purple-500/20 hover:border-purple-400/60 transition flex flex-col justify-between group bg-slate-900/70">
                    
                    <div>
                      <!-- Gaming Tier Badge -->
                      <div class="flex items-center justify-between mb-3">
                        <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-purple-600/30 text-purple-300 border border-purple-500/40 font-tech uppercase tracking-wider">
                          ${p.gamingTier || 'Gamer Certified'}
                        </span>
                        <button 
                          onclick="event.stopPropagation(); window.toggleWishlist('${p.id}')"
                          class="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-800 flex items-center justify-center transition ${store.isInWishlist(p.id) ? 'text-pink-500' : 'text-gray-400'}"
                          title="Wishlist"
                        >
                          <i class="fa-solid fa-heart text-xs"></i>
                        </button>
                      </div>

                      <!-- Thumbnail -->
                      <div class="product-image-container rounded-xl bg-slate-950/80 p-3 mb-4 border border-purple-900/30 cursor-pointer" onclick="window.openProductDetailModal('${p.id}')">
                        <img src="${p.image}" alt="${p.title}" class="w-full h-44 object-cover rounded-lg" />
                      </div>

                      <!-- Title & Brand -->
                      <div class="text-[11px] text-cyan-400 font-bold tracking-wider uppercase mb-1 font-tech">${p.brand}</div>
                      <h3 onclick="window.openProductDetailModal('${p.id}')" class="text-sm font-bold text-white hover:text-cyan-400 transition cursor-pointer line-clamp-2 mb-2">
                        ${p.title}
                      </h3>
                      <p class="text-xs text-gray-400 line-clamp-2 mb-3">${p.description}</p>
                    </div>

                    <!-- Price & Actions -->
                    <div class="pt-3 border-t border-purple-900/40 flex items-center justify-between gap-2">
                      <div>
                        ${p.originalPrice > p.price ? `<div class="text-[11px] text-gray-500 line-through">${store.formatPrice(p.originalPrice)}</div>` : ''}
                        <div class="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-gaming">
                          ${store.formatPrice(p.price)}
                        </div>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <button 
                          onclick="window.openProductDetailModal('${p.id}')"
                          class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs border border-purple-500/20 transition"
                          title="Specs & Benchmarks"
                        >
                          Specs
                        </button>
                        <button 
                          onclick="window.quickAddToCart('${p.id}')"
                          class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-1"
                        >
                          <i class="fa-solid fa-gamepad"></i> Equip
                        </button>
                      </div>
                    </div>

                  </div>
                `;
              }).join('')}
            </div>

            <!-- Pre-Built Custom Rig Feature Banner (Inside Kingdom of Games) -->
            <div class="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-2xl text-purple-400">
                  <i class="fa-solid fa-server"></i>
                </div>
                <div>
                  <h4 class="font-gaming text-lg font-bold text-white">Need a Custom Water-Cooled Battle Station?</h4>
                  <p class="text-xs text-gray-300">Our certified technicians stress-test every component for 24 hours with custom warranty coverage.</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <button onclick="window.openAiBotWithMessage('I want to build a high performance gaming PC under $1500 with RTX 4070')" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/30 transition flex items-center gap-1.5">
                  <i class="fa-solid fa-robot"></i> Consult AI Builder
                </button>
                <button onclick="window.openStoreLocatorModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold border border-slate-700 transition">
                  Visit Lab
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>
    `;
  }

  switchGame(gameKey) {
    this.selectedGame = gameKey;
    this.render('kingdom-games-mount');
  }
}

window.KingdomOfGamesComponent = new KingdomOfGames();