// AI Shopping Assistant Chatbot Component ("Nexus AI")
// Features an Intelligent Built-in Hardware Expert Engine with:
//  - A game database (GTA 6, Assassin's Creed, Cyberpunk, Wukong, esports titles...)
//  - Engineering / workload profiles (CSE, Mechanical CAD, Civil BIM, EEE, ML, Game Dev, Content Creation)
//  - Budget & resolution aware full PC build assembly from the LIVE store catalog
//  - Compatibility analysis and optional Live Gemini AI API integration

// ---- GPU performance classes, best first (matched against catalog titles) ----
const GPU_FAMILIES = {
  ultra: [/RTX 4090/i],
  high: [/RTX 4080 Super/i, /RTX 4080(?! Super)/i, /RX 7900 XT/i],
  upper: [/RTX 4070 Ti Super/i, /RTX 4070 Ti(?! Super)/i, /RX 7900(?! XT)/i],
  mid: [/RTX 4070 Super/i, /RX 7800 XT/i, /RTX 4070(?! [ST])/i],
  entry: [/RTX 4060 Ti/i, /RX 7700 XT/i, /RX 7600 XT/i],
  basic: [/RTX 4060(?! Ti)/i, /RTX 3060/i, /RX 7600(?! XT)/i, /Arc A7/i]
};

// ---- CPU performance classes, socket-consistent with the catalog motherboards ----
const CPU_FAMILIES = {
  ultra: [/Ryzen 9 9950X/i, /Ryzen 9 9900X/i, /Core i9-14900K/i, /Ryzen 9 7950X3D/i],
  high: [/Ryzen 7 7800X3D/i, /Core i7-14700K/i, /Ryzen 9 7900X/i],
  mid: [/Ryzen 7 7700X/i, /Ryzen 7 7700(?!X)/i, /Core i5-14600K/i, /Core i5-13600K/i],
  entry: [/Ryzen 5 7[56]00/i, /Core i5-12600K/i, /Ryzen 7 5700X/i]
};

const TIER_ORDER = ['starter', 'value', 'mid', 'high', 'ultra', 'extreme'];
const TIER_BUDGET_ANCHOR = { starter: 800, value: 1200, mid: 1650, high: 2300, ultra: 3300, extreme: 4600 };

const BUILD_TIERS = {
  starter: { label: 'Starter 1080p Gaming', gpu: 'basic', cpu: 'entry', ramGB: 16, ssdTB: 1, psuW: 750, moboTarget: 175 },
  value:   { label: 'Value 1440p Gaming', gpu: 'entry', cpu: 'mid', ramGB: 32, ssdTB: 1, psuW: 750, moboTarget: 190 },
  mid:     { label: 'Mid-Range 1440p High-Refresh', gpu: 'mid', cpu: 'mid', ramGB: 32, ssdTB: 2, psuW: 850, moboTarget: 230 },
  high:    { label: 'High-End 1440p Ultra / Entry 4K', gpu: 'upper', cpu: 'high', ramGB: 32, ssdTB: 2, psuW: 850, moboTarget: 280 },
  ultra:   { label: 'Ultra 4K / Pro Workstation', gpu: 'high', cpu: 'ultra', ramGB: 64, ssdTB: 2, psuW: 1000, moboTarget: 340 },
  extreme: { label: 'Extreme Flagship / Heavy Workstation', gpu: 'ultra', cpu: 'ultra', ramGB: 96, ssdTB: 4, psuW: 1200, moboTarget: 450 }
};

// ---- Game database: fps values are 1440p estimates on High/Ultra presets ----
const GAME_DB = [
  { id: 'gta6', name: 'GTA VI (GTA 6)', aliases: ['gta 6', 'gta6', 'gta vi', 'gtavi', 'gta six', 'grand theft auto 6', 'grand theft auto vi'],
    year: 2026, demand: 'EXTREME', min: 'high', rec: 'ultra', cap: null,
    fps: { high: 65, ultra: 90, extreme: 110 },
    note: 'GTA VI is a 2026 console-first flagship with a massive streaming open world. It wants a fast 8-core+ CPU, 32GB RAM and a 16GB+ VRAM GPU for 1440p Ultra textures; DLSS 3 / FSR 3 frame generation is strongly recommended.' },
  { id: 'ac-shadows', name: "Assassin's Creed Shadows", aliases: ['ac shadows', "assassin's creed shadows", 'assassins creed shadows'],
    year: 2025, demand: 'HEAVY', min: 'mid', rec: 'high', cap: null,
    fps: { mid: 55, high: 80, ultra: 100, extreme: 115 },
    note: 'Shadows uses heavy ray-traced global illumination and dense foliage. A RTX 4070-class GPU with DLSS is the sensible floor for 1440p.' },
  { id: 'ac-syndicate', name: "Assassin's Creed Syndicate", aliases: ['syndicate', 'ac syndicate', "assassin's creed syndicate", 'assassins creed syndicate'],
    year: 2015, demand: 'LIGHT', min: 'starter', rec: 'value', cap: null,
    fps: { starter: 95, value: 130, mid: 160, high: 180, ultra: 200, extreme: 200 },
    note: 'Syndicate is a 2015 title - any modern budget build runs it maxed at high FPS. Spend your money on a better monitor instead of a bigger GPU for this one.' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', aliases: ['cyberpunk', '2077', 'night city'],
    year: 2020, demand: 'HEAVY (RT)', min: 'mid', rec: 'high', cap: null,
    fps: { mid: 60, high: 85, ultra: 110, extreme: 125 },
    note: 'With Path Tracing / RT Overdrive enabled even flagship GPUs need DLSS 3. For raster-only Ultra settings the High tier is the sweet spot.' },
  { id: 'wukong', name: 'Black Myth: Wukong', aliases: ['wukong', 'black myth', 'blackmyth'],
    year: 2024, demand: 'EXTREME', min: 'high', rec: 'ultra', cap: null,
    fps: { high: 60, ultra: 85, extreme: 105 },
    note: 'Full ray tracing + Nanite-grade foliage in Unreal 5. VRAM hungry (12GB+ at 1440p Cinematic); frame generation is almost mandatory above 60 FPS.' },
  { id: 'elden', name: 'Elden Ring', aliases: ['elden ring', 'eldenring'],
    year: 2022, demand: 'MEDIUM', min: 'starter', rec: 'value', cap: 60,
    fps: { starter: 60, value: 60, mid: 60, high: 60, ultra: 60, extreme: 60 },
    note: 'Elden Ring is locked to 60 FPS by the engine, so a Value-tier build already gives the complete experience. Extra GPU budget is wasted here.' },
  { id: 'rdr2', name: 'Red Dead Redemption 2', aliases: ['rdr2', 'red dead', 'red dead redemption'],
    year: 2019, demand: 'MEDIUM-HEAVY', min: 'value', rec: 'mid', cap: null,
    fps: { value: 65, mid: 85, high: 100, ultra: 115, extreme: 120 },
    note: 'Still one of the best-looking games ever made. CPU-heavy in towns; 6 cores minimum, 8 preferred.' },
  { id: 'forza5', name: 'Forza Horizon 5', aliases: ['forza', 'forza horizon'],
    year: 2021, demand: 'MEDIUM', min: 'value', rec: 'mid', cap: null,
    fps: { value: 90, mid: 120, high: 140, ultra: 160, extreme: 170 },
    note: 'Superb optimization. The Mid tier comfortably drives a 144Hz 1440p monitor at Extreme preset.' },
  { id: 'warzone', name: 'Call of Duty: Warzone', aliases: ['warzone', 'call of duty', 'cod mw', 'modern warfare'],
    year: 2024, demand: 'MEDIUM-HIGH (CPU)', min: 'value', rec: 'mid', cap: null,
    fps: { value: 110, mid: 150, high: 190, ultra: 220, extreme: 240 },
    note: 'Competitive Warzone is CPU-bound: a 3D V-Cache CPU (Ryzen 7 7800X3D) adds more FPS than a GPU upgrade.' },
  { id: 'valorant', name: 'Valorant / CS2 (Esports)', aliases: ['valorant', 'cs2', 'counter strike', 'counter-strike'],
    year: 2024, demand: 'LIGHT (CPU)', min: 'starter', rec: 'value', cap: null,
    fps: { starter: 220, value: 350, mid: 500, high: 600, ultra: 650, extreme: 700 },
    note: 'Pure CPU/latency titles. Prioritize a fast 6-8 core CPU and a 240Hz+ monitor; GPU choice barely matters.' },
  { id: 'hogwarts', name: 'Hogwarts Legacy', aliases: ['hogwarts', 'hogwarts legacy'],
    year: 2023, demand: 'HEAVY', min: 'mid', rec: 'high', cap: null,
    fps: { mid: 60, high: 85, ultra: 105, extreme: 115 },
    note: 'Very VRAM and shader hungry in Hogsmeade. 12GB VRAM recommended for 1440p Ultra.' },
  { id: 'starfield', name: 'Starfield', aliases: ['starfield'],
    year: 2023, demand: 'HEAVY (CPU+GPU)', min: 'mid', rec: 'high', cap: null,
    fps: { mid: 55, high: 75, ultra: 95, extreme: 105 },
    note: 'CPU and storage streaming bound in cities. A Gen4 NVMe SSD removes stutter more than any GPU upgrade.' },
  { id: 'msfs', name: 'MS Flight Simulator 2024', aliases: ['flight simulator', 'msfs', 'flight sim'],
    year: 2024, demand: 'EXTREME (CPU)', min: 'high', rec: 'ultra', cap: null,
    fps: { high: 55, ultra: 75, extreme: 90 },
    note: 'The heaviest CPU + RAM bandwidth workload in gaming. 3D V-Cache or a 16-core CPU plus 64GB RAM transforms smoothness.' },
  { id: 'fortnite', name: 'Fortnite (Performance Mode)', aliases: ['fortnite'],
    year: 2024, demand: 'MEDIUM', min: 'value', rec: 'mid', cap: null,
    fps: { value: 144, mid: 240, high: 300, ultra: 340, extreme: 360 },
    note: 'In Performance Mode even the Value tier hits 144+ FPS; Nanite/Lumen Ultra settings need the High tier.' },
  { id: 'minecraft', name: 'Minecraft + RTX / Shaders', aliases: ['minecraft'],
    year: 2024, demand: 'MEDIUM-HIGH (SHADERS)', min: 'value', rec: 'mid', cap: null,
    fps: { value: 90, mid: 140, high: 180, ultra: 200, extreme: 220 },
    note: 'Vanilla runs on anything; RTX path tracing and heavy shader packs scale directly with GPU power. Allocate 4-8GB RAM to the JVM.' }
];

// ---- Engineering / professional workload profiles ----
const FIELD_DB = [
  { id: 'cse', label: 'Computer Science / Software Engineering', tier: 'mid',
    keywords: ['computer science', 'software engineer', 'software engineering', 'programming', 'coding', 'developer', 'web development', 'full stack', 'cse'],
    software: 'VS Code / JetBrains IDEs, Docker & Kubernetes VMs, Git, local databases, Android Studio emulators',
    priority: 'Fast compile times and lots of RAM for containers/VMs. Single-core speed matters more than core count for most builds; GPU is optional unless you game.',
    tip: '32GB RAM is the real productivity upgrade here - Android emulators and Docker eat RAM long before they eat CPU.' },
  { id: 'ml', label: 'Data Science / AI / Machine Learning', tier: 'ultra',
    keywords: ['data science', 'machine learning', 'deep learning', 'neural network', 'tensorflow', 'pytorch', 'ai model', 'llm', 'cuda', 'data scientist'],
    software: 'Python, PyTorch / TensorFlow, CUDA & cuDNN, Jupyter, Pandas, local LLM inference (Ollama / LM Studio)',
    priority: 'An NVIDIA GPU with large VRAM is everything: model size is limited by VRAM, training speed by CUDA cores. 64GB+ system RAM and a fast NVMe drive for datasets.',
    tip: 'For local LLMs aim for 16GB VRAM minimum (RTX 4070 Ti SUPER); 24GB (RTX 4090) lets you run 30B-class models comfortably. AMD GPUs are not recommended for CUDA workflows.' },
  { id: 'mech', label: 'Mechanical Engineering / CAD & Simulation', tier: 'high',
    keywords: ['mechanical', 'solidworks', 'cad', 'catia', 'ansys', 'fea', 'creo', 'nx cad', 'mechanical engineer'],
    software: 'SolidWorks, AutoCAD, CATIA, ANSYS Mechanical / Fluent, Fusion 360, KeyShot rendering',
    priority: 'CAD viewport and modeling love high single-core clock speed; FEA/CFD solves scale with core count. 32-64GB RAM for large assemblies, RTX GPU for viewport and rendering.',
    tip: 'SolidWorks officially certifies workstation GPUs, but a GeForce RTX 4070 Ti SUPER gives students far better price/performance for assemblies under ~5k parts.' },
  { id: 'civil', label: 'Civil Engineering / Architecture / BIM', tier: 'high',
    keywords: ['civil', 'architecture', 'architect', 'revit', 'bim', 'lumion', 'twinmotion', 'autocad', 'sketchup', 'vray', 'civil engineer'],
    software: 'Revit, AutoCAD Civil 3D, ETABS, SAP2000, Lumion / Twinmotion / V-Ray rendering, SketchUp',
    priority: 'BIM modeling is CPU single-thread + RAM heavy; real-time renderers (Lumion, Twinmotion, Enscape) are pure GPU workloads with big VRAM appetite.',
    tip: 'If your courses render in Lumion, put the budget in the GPU first - a RTX 4080-class card cuts render waits dramatically.' },
  { id: 'eee', label: 'Electrical / Electronics Engineering', tier: 'value',
    keywords: ['electrical', 'electronics', 'matlab', 'simulink', 'pcb', 'altium', 'proteus', 'multisim', 'embedded', 'microcontroller', 'eee', 'verilog', 'vhdl'],
    software: 'MATLAB / Simulink, Altium Designer, Proteus, Multisim, Vivado / Quartus (FPGA), Keil, STM32 toolchains',
    priority: 'Most EDA tools are lightly threaded and memory-hungry rather than GPU-hungry. A strong 6-8 core CPU and 32GB RAM covers simulation and FPGA synthesis.',
    tip: 'FPGA place-and-route (Vivado) is the one step that uses all cores - if you do heavy FPGA work, step up to the Mid/High tier CPU.' },
  { id: 'gamedev', label: 'Game Development (Unreal / Unity)', tier: 'ultra',
    keywords: ['game dev', 'game development', 'unreal', 'unity', 'godot', 'game developer', 'level design'],
    software: 'Unreal Engine 5 (Lumen/Nanite), Unity, Blender, Substance Painter, Visual Studio, Perforce/Git LFS',
    priority: 'UE5 shader compilation is brutal on CPU cores; Lumen/Nanite editing needs a big-VRAM GPU; projects are 100GB+ so fast large NVMe storage is mandatory.',
    tip: 'Budget for a 4TB NVMe drive - a single UE5 project with source assets easily exceeds 200GB.' },
  { id: 'creator', label: 'Video Editing / 3D & Content Creation', tier: 'high',
    keywords: ['video editing', 'video editor', 'premiere', 'davinci', 'after effects', 'content creator', 'streaming', 'blender', '3d rendering', 'photoshop', 'youtube'],
    software: 'Premiere Pro, DaVinci Resolve, After Effects, Blender Cycles, Photoshop, OBS streaming',
    priority: 'Timeline playback and exports use GPU encoders (NVENC) heavily; After Effects and Blender want RAM and cores. Fast NVMe scratch disks for 4K footage.',
    tip: 'NVIDIA NVENC + CUDA makes Premiere/Resolve exports much faster than AMD at the same price - stay on GeForce for creative work.' }
];

class AiAssistant {
  constructor() {
    this.isOpen = false;
    this.container = null;
    this.isThinking = false;
  }

  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    const chatHistory = store.aiChatHistory;
    const aiConfig = store.aiConfig;

    this.container.innerHTML = `
      <!-- Floating AI Assistant Launcher Button -->
      <button 
        onclick="window.toggleAiChat()" 
        id="ai-bot-fab"
        class="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full ai-fab-button flex items-center justify-center text-white shadow-2xl cursor-pointer group"
        title="Chat with AI Hardware Specialist"
      >
        <i class="fa-solid fa-robot text-2xl transition group-hover:scale-110"></i>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></span>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
      </button>

      <!-- Slide-Up Chat Window -->
      <div 
        id="ai-chat-window" 
        class="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-[420px] max-h-[600px] h-[550px] rounded-3xl glass-panel border border-purple-500/40 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${this.isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}"
      >
        <!-- Header -->
        <div class="p-4 bg-slate-950 border-b border-purple-900/40 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-base shadow-md">
              <i class="fa-solid fa-robot"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs font-bold font-gaming text-white">NEXUS AI ADVISOR</h4>
                <span class="text-[9px] px-1.5 py-0.2 rounded font-bold ${aiConfig.useLiveApi ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}">
                  ${aiConfig.useLiveApi ? 'LIVE GEMINI API' : 'OFFLINE EXPERT'}
                </span>
              </div>
              <p class="text-[10px] text-gray-400">PC Builds for Games, Engineering & Creator Workloads</p>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <!-- Settings Modal Toggle -->
            <button onclick="window.toggleAiSettingsModal()" class="p-1.5 text-gray-400 hover:text-cyan-300 rounded-lg transition" title="AI API Configuration">
              <i class="fa-solid fa-gear text-sm"></i>
            </button>
            <!-- Clear History -->
            <button onclick="store.clearAiChat()" class="p-1.5 text-gray-400 hover:text-amber-300 rounded-lg transition" title="Clear Chat History">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
            <!-- Close Button -->
            <button onclick="window.toggleAiChat()" class="p-1.5 text-gray-400 hover:text-white rounded-lg transition" title="Minimize">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div id="ai-chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-900/70 text-xs">
          ${chatHistory.map(msg => `
            <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}">
              <div class="max-w-[85%] p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-medium rounded-tr-none shadow'
                  : 'bg-slate-950 border border-purple-500/30 text-gray-200 rounded-tl-none shadow-lg'
              }">
                <div class="leading-relaxed whitespace-pre-line">${msg.text}</div>
              </div>
              <span class="text-[9px] text-gray-500 mt-1 px-1">${msg.timestamp}</span>

              <!-- Embedded Product Recommendation Cards -->
              ${msg.productCards && msg.productCards.length > 0 ? `
                <div class="mt-2.5 space-y-2 w-full max-w-[90%]">
                  <div class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-tech flex items-center gap-1">
                    <i class="fa-solid fa-microchip"></i> Recommended From Our Catalog:
                  </div>
                  ${msg.productCards.map(p => `
                    <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-between gap-2.5">
                      <img src="${p.image}" class="w-10 h-10 rounded-lg object-cover bg-slate-900 p-0.5 border border-slate-700 flex-shrink-0" />
                      <div class="flex-1 min-w-0">
                        <div class="text-[11px] font-bold text-white truncate">${p.title}</div>
                        <div class="text-[10px] font-bold text-cyan-400 font-gaming">${store.formatPrice(p.price)}</div>
                      </div>
                      <div class="flex items-center gap-1">
                        <button onclick="window.openProductDetailModal('${p.id}')" class="px-2 py-1 rounded-lg bg-slate-800 text-[10px] text-gray-200 hover:bg-slate-700 transition">
                          View
                        </button>
                        <button onclick="window.quickAddToCart('${p.id}')" class="px-2 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[10px] hover:bg-cyan-400 transition">
                          +Cart
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${this.isThinking ? `
            <div class="flex items-center gap-2 text-cyan-400 text-xs py-2">
              <i class="fa-solid fa-circle-notch animate-spin text-sm"></i>
              <span class="font-tech tracking-wider uppercase font-semibold">Analyzing PC hardware catalog...</span>
            </div>
          ` : ''}
        </div>

        <!-- Quick Prompt Suggestion Chips -->
        <div class="px-3 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <button onclick="window.sendQuickAiPrompt('Best PC build for GTA 6?')" class="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 transition">
            <i class="fa-solid fa-car mr-1"></i> PC build for GTA 6
          </button>
          <button onclick="window.sendQuickAiPrompt('PC build for Mechanical Engineering with SolidWorks')" class="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/20 transition">
            <i class="fa-solid fa-gears mr-1"></i> Mechanical Eng (SolidWorks)
          </button>
          <button onclick="window.sendQuickAiPrompt('Machine learning workstation under $2500')" class="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 transition">
            <i class="fa-solid fa-brain mr-1"></i> ML workstation under $2500
          </button>
          <button onclick="window.sendQuickAiPrompt('Budget build for Assassins Creed Syndicate and esports')" class="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20 transition">
            <i class="fa-solid fa-feather mr-1"></i> AC Syndicate budget build
          </button>
        </div>

        <!-- Input Box -->
        <div class="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input 
            type="text" 
            id="ai-user-input" 
            placeholder="Ask: best build for GTA 6, Civil Eng, ML, 1440p..." 
            onkeydown="if (event.key === 'Enter') window.handleAiChatSubmit()"
            class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          <button 
            onclick="window.handleAiChatSubmit()" 
            class="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center shadow-lg transition hover:scale-105"
            title="Send Message"
          >
            <i class="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>

      </div>

      <!-- AI Configuration Modal -->
      <div id="ai-settings-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-panel rounded-3xl border border-slate-700 w-full max-w-md p-6 bg-slate-900 text-gray-100 modal-enter">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 class="font-gaming text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-sliders text-cyan-400"></i> AI API Configuration
            </h3>
            <button onclick="window.toggleAiSettingsModal()" class="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <p class="text-xs text-gray-300 leading-relaxed mb-4">
            By default, NexusTech runs an **Intelligent Built-in Hardware Expert Engine** that assembles real PC builds from our live catalog for games (GTA 6, Assassin's Creed, Cyberpunk...) and engineering workloads (CAD, BIM, ML, EDA). You can optionally connect your live Google Gemini API key below:
          </p>

          <form onsubmit="window.saveAiSettingsForm(event)" class="space-y-4 text-xs">
            <div>
              <label class="block text-gray-300 font-semibold mb-1">Google Gemini API Key (Optional)</label>
              <input 
                type="password" 
                id="cfg-gemini-key" 
                placeholder="AIzaSy..." 
                value="${aiConfig.geminiApiKey || ''}" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
              />
              <span class="text-[10px] text-gray-500 mt-1 block">Leave blank to use the offline built-in hardware knowledge base.</span>
            </div>

            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="cfg-use-live" 
                ${aiConfig.useLiveApi ? 'checked' : ''} 
                class="rounded bg-slate-950 border-slate-700 text-cyan-500 cursor-pointer"
              />
              <label for="cfg-use-live" class="text-gray-300 cursor-pointer">Enable Live Google Gemini API responses</label>
            </div>

            <div class="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button type="button" onclick="window.toggleAiSettingsModal()" class="px-3.5 py-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white font-semibold">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.scrollToBottom();
  }

  scrollToBottom() {
    const el = document.getElementById('ai-chat-messages');
    if (el) {
      setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.render('ai-assistant-mount');
  }

  async processUserMessage(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // 1. Add user message
    store.addAiChatMessage('user', cleanText);
    this.isThinking = true;
    this.render('ai-assistant-mount');

    // 2. Decide response strategy (Live Gemini API vs Built-in Hardware Engine)
    if (store.aiConfig.useLiveApi && store.aiConfig.geminiApiKey) {
      try {
        const responseText = await this.callGeminiApi(cleanText);
        this.isThinking = false;
        store.addAiChatMessage('assistant', responseText, this.matchCatalogCards(cleanText));
        this.render('ai-assistant-mount');
        return;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to built-in hardware engine:', err);
      }
    }

    // Built-in Hardware Specialist Engine
    setTimeout(() => {
      this.isThinking = false;
      const { reply, cards } = this.generateHardwareResponse(cleanText);
      store.addAiChatMessage('assistant', reply, cards);
      this.render('ai-assistant-mount');
    }, 700);
  }

  // ================= CATALOG PICKING HELPERS =================

  catList(cat) {
    return store.products.filter(p => p.category === cat);
  }

  pickByFamilies(cat, families) {
    for (const re of families) {
      const hits = this.catList(cat).filter(p => re.test(p.title) && p.stock > 0);
      if (hits.length) {
        hits.sort((a, b) => (b.rating - a.rating) || (a.price - b.price));
        return hits[0];
      }
    }
    return null;
  }

  bestValue(pool, fraction) {
    if (!pool.length) return null;
    const sorted = [...pool].sort((a, b) => a.price - b.price);
    const cut = sorted.slice(0, Math.max(1, Math.ceil(sorted.length * fraction)));
    cut.sort((a, b) => (b.rating - a.rating) || (a.price - b.price));
    return cut[0];
  }

  capacityOf(p, unit) {
    const raw = String((p.specs && (p.specs['Capacity'] || p.specs['Total Capacity'])) || p.title || '');
    const m = new RegExp('(\\d+)\\s?' + unit).exec(raw);
    return m ? parseInt(m[1], 10) : 0;
  }

  pickRam(gb) {
    const ddr5 = this.catList('ram').filter(p =>
      p.stock > 0 && /DDR5/i.test(p.title + ' ' + JSON.stringify(p.specs || {}))
    );
    let pool = ddr5.filter(p => this.capacityOf(p, 'GB') === gb);
    if (!pool.length) {
      const sizes = [...new Set(ddr5.map(p => this.capacityOf(p, 'GB')))].filter(n => n > 0).sort((a, b) => a - b);
      const near = sizes.find(s => s >= gb) || sizes[sizes.length - 1];
      pool = ddr5.filter(p => this.capacityOf(p, 'GB') === near);
    }
    if (!pool.length) pool = this.catList('ram').filter(p => p.stock > 0 && this.capacityOf(p, 'GB') === gb);
    return this.bestValue(pool, 0.4);
  }

  pickSsd(tb) {
    let pool = this.catList('ssd').filter(p => p.stock > 0 && this.capacityOf(p, 'TB') === tb);
    if (!pool.length) {
      pool = this.catList('ssd').filter(p => p.stock > 0 && /(\d+)\s?TB/.test(p.title) && parseInt(/(\d+)\s?TB/.exec(p.title)[1], 10) === tb);
    }
    const nvme = pool.filter(p => /NVMe|PCIe/i.test(p.title));
    if (nvme.length) pool = nvme;
    const fast = pool.filter(p => !/NAS|WD Red|Green|Entry|Basic|QVO|A400|BX500/i.test(p.title));
    if (fast.length) pool = fast;
    return this.bestValue(pool, 0.5);
  }

  pickPsu(watts) {
    const list = this.catList('psu').filter(p => p.stock > 0);
    const withW = list.map(p => ({ p, w: parseInt((p.specs && p.specs['Continuous Wattage']) || '0', 10) }))
      .filter(x => x.w > 0);
    const enough = withW.filter(x => x.w >= watts).sort((a, b) => (a.w - b.w) || (a.p.price - b.p.price));
    if (enough.length) return enough[0].p;
    withW.sort((a, b) => b.w - a.w);
    return withW.length ? withW[0].p : null;
  }

  pickMobo(socket, target) {
    const re = socket === 'AM5' ? /AM5|B650|X670|B850|X870/i : /LGA1700|Z790|B760|Z690|B660/i;
    let list = this.catList('motherboard').filter(p =>
      p.stock > 0 && (re.test(p.title) || re.test((p.specs && p.specs['CPU Socket']) || ''))
    );
    if (!list.length) return null;
    const atx = list.filter(p => !/Micro-ATX|Mini-ITX|Micro ATX|Mini ITX/i.test(p.title + ' ' + ((p.specs && p.specs['Form Factor']) || '')));
    if (atx.length) list = atx;
    const score = p => Math.abs(p.price - target) - Math.max(0, p.rating - 4.5) * 25;
    return [...list].sort((a, b) => score(a) - score(b))[0];
  }

  assembleBuild(tierKey) {
    const t = BUILD_TIERS[tierKey];
    const gpu = this.pickByFamilies('gpu', GPU_FAMILIES[t.gpu]);
    const cpu = this.pickByFamilies('cpu', CPU_FAMILIES[t.cpu]);
    const socket = cpu && /Ryzen/i.test(cpu.title) ? 'AM5' : 'LGA1700';
    const ram = this.pickRam(t.ramGB);
    const ssd = this.pickSsd(t.ssdTB);
    const psu = this.pickPsu(t.psuW);
    const mobo = this.pickMobo(socket, t.moboTarget);
    const parts = [gpu, cpu, ram, ssd, psu, mobo].filter(Boolean);
    const total = parts.reduce((s, p) => s + p.price, 0);
    return { tier: tierKey, label: t.label, socket, ramGB: t.ramGB, psuW: t.psuW, gpu, cpu, ram, ssd, psu, mobo, parts, total };
  }

  tierThatFits(budget) {
    let best = null;
    for (const t of TIER_ORDER) {
      const b = this.assembleBuild(t);
      if (b.total <= budget * 1.05) best = { tierKey: t, build: b };
    }
    return best;
  }

  fitToBudget(tierKey, budget) {
    if (!budget) return { tierKey, build: this.assembleBuild(tierKey) };
    const idealIdx = TIER_ORDER.indexOf(tierKey);
    const fit = this.tierThatFits(budget) || { tierKey: TIER_ORDER[0], build: this.assembleBuild(TIER_ORDER[0]) };
    let idx = TIER_ORDER.indexOf(fit.tierKey);
    if (idx > idealIdx + 1) idx = idealIdx + 1;
    const build = idx === TIER_ORDER.indexOf(fit.tierKey) ? fit.build : this.assembleBuild(TIER_ORDER[idx]);
    return { tierKey: TIER_ORDER[idx], build };
  }

  tierForBudget(budget) {
    let chosen = TIER_ORDER[0];
    for (const t of TIER_ORDER) {
      if (budget >= TIER_BUDGET_ANCHOR[t] * 0.9) chosen = t;
    }
    return chosen;
  }

  // ================= INTENT DETECTION =================

  detectGame(p) {
    for (const g of GAME_DB) {
      if (g.aliases.some(a => p.includes(a))) return g;
    }
    return null;
  }

  detectField(p) {
    for (const f of FIELD_DB) {
      if (f.keywords.some(k => p.includes(k))) return f;
    }
    return null;
  }

  detectBudget(p) {
    let m = /\$\s?(\d{3,5})/.exec(p);
    if (m) return parseInt(m[1], 10);
    m = /under\s+(\d{3,5})/.exec(p);
    if (m) return parseInt(m[1], 10);
    m = /(\d{3,5})\s?(usd|dollars|budget of)/.exec(p);
    if (m) return parseInt(m[1], 10);
    m = /(\d{5,7})\s?(bdt|taka|tk)/.exec(p);
    if (m) return Math.round(parseInt(m[1], 10) / 120);
    return null;
  }

  detectResolution(p) {
    if (/4k|uhd|2160p/.test(p)) return '4k';
    if (/1080p|fhd/.test(p)) return '1080p';
    if (/1440p|2k|qhd/.test(p)) return '1440p';
    return '1440p';
  }

  fpsAt(game, tierKey, res) {
    let key = tierKey;
    if (game.fps[key] == null) {
      let idx = TIER_ORDER.indexOf(key);
      while (idx >= 0 && game.fps[TIER_ORDER[idx]] == null) idx--;
      if (idx < 0) {
        idx = TIER_ORDER.indexOf(key);
        while (idx < TIER_ORDER.length && game.fps[TIER_ORDER[idx]] == null) idx++;
      }
      if (idx < 0 || idx >= TIER_ORDER.length) return null;
      key = TIER_ORDER[idx];
    }
    let v = game.fps[key];
    if (res === '1080p') v = v * 1.3;
    if (res === '4k') v = v * 0.5;
    if (game.cap) v = Math.min(v, game.cap);
    return Math.round(v / 5) * 5;
  }

  gameById(id) {
    return GAME_DB.find(g => g.id === id);
  }

  partLine(icon, label, product) {
    if (!product) return '';
    return '  ' + icon + ' ' + label + ': ' + product.title + ' - ' + store.formatPrice(product.price);
  }

  buildBlock(build) {
    const lines = [];
    lines.push('RECOMMENDED BUILD - ' + build.label.toUpperCase() + ' (' + build.tier + ' tier)');
    if (build.gpu) lines.push(this.partLine('[GPU]', 'GPU', build.gpu));
    if (build.cpu) lines.push(this.partLine('[CPU]', 'CPU', build.cpu));
    if (build.ram) lines.push(this.partLine('[RAM]', 'RAM', build.ram));
    if (build.ssd) lines.push(this.partLine('[SSD]', 'Storage', build.ssd));
    if (build.mobo) lines.push(this.partLine('[MB ]', 'Motherboard', build.mobo));
    if (build.psu) lines.push(this.partLine('[PSU]', 'Power Supply', build.psu));
    lines.push('  Estimated parts total: ' + store.formatPrice(build.total) + ' (VAT & shipping calculated at checkout)');
    lines.push('  Compatibility: ' + build.socket + ' CPU + matching ' + build.socket + ' board, DDR5 ' + build.ramGB + 'GB+ kit, ' + build.psuW + 'W+ PSU for safe transient headroom.');
    return lines.filter(Boolean).join('\n');
  }

  // ================= RESPONSE GENERATION =================

  generateHardwareResponse(prompt) {
    const p = prompt.toLowerCase();
    const budget = this.detectBudget(p);
    const game = this.detectGame(p);
    const field = this.detectField(p);
    const res = this.detectResolution(p);
    const resLabel = res === '4k' ? '4K UHD' : res === '1080p' ? '1080p FHD' : '1440p QHD';

    // ---- 1. GAME-SPECIFIC BUILD RECOMMENDATION ----
    if (game) {
      let tierKey = budget ? this.tierForBudget(budget) : game.rec;
      const fitted = this.fitToBudget(tierKey, budget);
      tierKey = fitted.tierKey;
      const build = fitted.build;

      const lines = [];
      lines.push('GAME ANALYSIS: ' + game.name + ' (' + game.year + ')');
      lines.push('Demand class: ' + game.demand + '  |  Target: ' + resLabel);
      lines.push('');
      lines.push(this.buildBlock(build));
      lines.push('');

      const minIdx = TIER_ORDER.indexOf(game.min);
      const curIdx = TIER_ORDER.indexOf(tierKey);
      if (curIdx < minIdx) {
        lines.push('WARNING: this build is BELOW the recommended minimum for ' + game.name + '.');
        lines.push('Minimum viable tier: ' + game.min.toUpperCase() + ' (' + BUILD_TIERS[game.min].label + '). Expect reduced settings / resolution scaling.');
      } else if (curIdx > TIER_ORDER.indexOf(game.rec)) {
        lines.push('NOTE: this build exceeds the recommended spec for ' + game.name + ' - you will have plenty of headroom for future titles.');
      } else {
        lines.push('This tier meets or exceeds the recommended spec for ' + game.name + '.');
      }
      lines.push('');

      lines.push('ESTIMATED FPS @ ' + resLabel + ' (High/Ultra presets):');
      for (const t of TIER_ORDER.slice(Math.max(0, minIdx - 1))) {
        if (game.fps[t] == null) continue;
        const fps = this.fpsAt(game, t, res);
        if (fps == null) continue;
        const marker = t === tierKey ? '  <-- your build' : '';
        lines.push('  - ' + t.toUpperCase().padEnd(8) + ' (' + BUILD_TIERS[t].label + '): ~' + fps + ' FPS' + (game.cap && fps >= game.cap ? ' (engine-capped)' : '') + marker);
      }
      lines.push('');
      lines.push('ADVISOR NOTE: ' + game.note);
      if (budget) {
        lines.push('');
        lines.push('Your stated budget: ' + store.formatPrice(budget) + ' - selected build total ' + store.formatPrice(build.total) + (build.total <= budget ? ' (within budget, ' + store.formatPrice(budget - build.total) + ' left for monitor/peripherals).' : ' (closest achievable tier; see warning above).'));
      }

      const cards = [build.gpu, build.cpu, build.ram].filter(Boolean);
      return { reply: lines.join('\n'), cards };
    }

    // ---- 2. ENGINEERING / PROFESSIONAL WORKLOAD BUILD ----
    if (field) {
      let tierKey = budget ? this.tierForBudget(budget) : field.tier;
      const fitted = this.fitToBudget(tierKey, budget);
      tierKey = fitted.tierKey;
      const build = fitted.build;
      const idealIdx = TIER_ORDER.indexOf(field.tier);
      const curIdx = TIER_ORDER.indexOf(tierKey);

      const lines = [];
      lines.push('WORKLOAD PROFILE: ' + field.label);
      lines.push('Typical software: ' + field.software);
      lines.push('');
      lines.push('WHAT MATTERS FOR THIS FIELD:');
      lines.push('  ' + field.priority);
      lines.push('');
      lines.push(this.buildBlock(build));
      lines.push('');
      if (curIdx < idealIdx) {
        lines.push('CAUTION: the ideal workstation tier for this field is ' + field.tier.toUpperCase() + '. The build above is budget-constrained - expect longer simulation/render/export times, but modeling and day-to-day work stays smooth.');
      } else {
        lines.push('This configuration matches the ' + field.tier.toUpperCase() + ' workstation class recommended for this field.');
      }
      lines.push('');
      lines.push('PRO TIP: ' + field.tip);
      if (budget) {
        lines.push('');
        lines.push('Budget check: ' + store.formatPrice(budget) + ' stated vs ' + store.formatPrice(build.total) + ' assembled.');
      }

      const cards = [build.cpu, build.gpu, build.ram].filter(Boolean);
      return { reply: lines.join('\n'), cards };
    }

    // ---- 3. PSU / WATTAGE COMPATIBILITY ----
    if (/(psu|watt|power supply)/.test(p) && /(4070|4080|4090|4060|7900|7800|7700|gpu|graphics|rtx|radeon)/.test(p)) {
      const psu = this.pickPsu(850);
      const reply = [
        'PSU SIZING ANALYSIS:',
        '',
        '- NVIDIA recommends 650W for RTX 4070, 750W for RTX 4070 Ti / 4080 class, and 850W+ for RTX 4090 or RX 7900 XTX class cards.',
        '- A quality 80+ Gold 650W unit is fine for an RTX 4070 paired with a 65-105W CPU (Ryzen 5 / 7, Core i5).',
        '- For i9 / Ryzen 9 CPUs, overclocking, or transient-spike safety, step up to 850W ATX 3.0 with native 12VHPWR.',
        '',
        psu ? 'Catalog pick: ' + psu.title + ' (' + ((psu.specs && psu.specs['Continuous Wattage']) || '') + ', ' + ((psu.specs && psu.specs['Efficiency Certification']) || '') + ') - ' + store.formatPrice(psu.price) : '',
        '',
        'Rule of thumb: PSU watts = (CPU TDP + GPU TDP) x 1.6 headroom, rounded up to the next common rating.'
      ].filter(l => l !== '').join('\n');
      return { reply, cards: psu ? [psu] : [] };
    }

    // ---- 4. GPU SHOPPING BY PRICE / RESOLUTION ----
    if (/(gpu|graphics card|video card|graphics|\bcard\b)/.test(p)) {
      const cap = budget || 600;
      const list = this.catList('gpu').filter(g => g.stock > 0 && g.price <= cap)
        .sort((a, b) => (b.price - a.price) || (b.rating - a.rating))
        .slice(0, 3);
      const lines = [
        'BEST GPUs UNDER ' + store.formatPrice(cap) + ' (target ' + resLabel + '):',
        ''
      ];
      list.forEach((g, i) => {
        lines.push((i + 1) + '. ' + g.title + ' - ' + store.formatPrice(g.price) + ' (rated ' + g.rating + '/5)');
      });
      lines.push('');
      lines.push('ADVISOR NOTE: sorted by raw performance within your cap - the most expensive card that still fits is normally the fastest. At this price band expect 1080p Ultra or 1440p High with DLSS/FSR in current AAA titles. For native 1440p Ultra in heavy games (GTA 6, Wukong) plan on an $800-$1,100 GPU (RTX 4070 Ti SUPER / RTX 4080 SUPER class).');
      return { reply: lines.join('\n'), cards: list };
    }

    // ---- 5. DDR4 vs DDR5 ----
    if (!budget && /ddr4|ddr5/.test(p)) {
      const ram = this.pickRam(32);
      const reply = [
        'DDR4 vs DDR5 BREAKDOWN:',
        '',
        '- Speed: DDR5 runs 4800-8000MHz; DDR4 tops out around 3600-4000MHz.',
        '- Power: DDR5 has an onboard PMIC for cleaner, more efficient voltage regulation.',
        '- Platforms: AMD AM5 (Ryzen 7000/9000) is DDR5-only. Intel LGA1700 boards exist in both DDR4 and DDR5 variants - check the motherboard model.',
        '- Latency: early DDR5 had loose timings; today DDR5-6000 CL30 beats DDR4-3600 CL16 in both gaming and productivity.',
        '',
        'VERDICT: for any new 2026 build, DDR5 6000MHz CL30 (32GB kit) is the gold standard.',
        ram ? 'Catalog pick: ' + ram.title + ' - ' + store.formatPrice(ram.price) : ''
      ].filter(l => l !== '').join('\n');
      return { reply, cards: ram ? [ram] : [] };
    }

    // ---- 6. BUDGET / GENERAL PC BUILD REQUEST ----
    if (budget && /(build|pc|rig|setup|machine|workstation|gaming)/.test(p)) {
      const fitted = this.tierThatFits(budget) || { tierKey: TIER_ORDER[0], build: this.assembleBuild(TIER_ORDER[0]) };
      const tierKey = fitted.tierKey;
      const build = fitted.build;
      const cyber = this.gameById('cyberpunk');
      const wukong = this.gameById('wukong');
      const esports = this.gameById('valorant');
      const lines = [];
      lines.push('CUSTOM PC BUILD for a ' + store.formatPrice(budget) + ' budget');
      lines.push('Selected class: ' + build.label.toUpperCase() + ' (' + tierKey + ' tier)');
      lines.push('');
      lines.push(this.buildBlock(build));
      lines.push('');
      lines.push('EXPECTED GAMING PERFORMANCE @ 1440p:');
      lines.push('  - AAA titles (Cyberpunk class): ~' + this.fpsAt(cyber, tierKey, '1440p') + ' FPS | (Black Myth Wukong class): ~' + this.fpsAt(wukong, tierKey, '1440p') + ' FPS with DLSS/FSR');
      lines.push('  - Esports (Valorant, CS2): ~' + this.fpsAt(esports, tierKey, '1440p') + ' FPS');
      lines.push('');
      if (build.total > budget) {
        lines.push('BUDGET NOTE: ' + store.formatPrice(build.total) + ' is the closest complete configuration to your ' + store.formatPrice(budget) + ' target (' + store.formatPrice(build.total - budget) + ' over). The next tier down would fit the budget but is a large performance drop, so this is the better buy - watch our flash deals to close the gap.');
      } else {
        lines.push('BUDGET NOTE: total ' + store.formatPrice(build.total) + ' leaves ' + store.formatPrice(budget - build.total) + ' for a monitor, keyboard/mouse or a Windows license.');
      }
      lines.push('');
      lines.push('ADVISOR NOTE: all parts above are live catalog items - tap a card below to view specs or add to cart. Pair with a 1440p 165Hz monitor for the best experience.');
      const cards = [build.gpu, build.cpu, build.ram, build.ssd].filter(Boolean);
      return { reply: lines.join('\n'), cards };
    }

    // ---- 7. STORAGE ----
    if (/(ssd|storage|nvme|hard drive)/.test(p)) {
      const ssd = this.pickSsd(2);
      const reply = [
        'HIGH-SPEED STORAGE RECOMMENDATION:',
        '',
        '- Gen4 NVMe (Samsung 990 PRO class) delivers ~7,450 MB/s reads - the practical PCIe 4.0 ceiling, ideal for game streaming (Starfield, MSFS) and video scratch disks.',
        '- Gen3 NVMe (~3,500 MB/s) is still 5x faster than SATA and fine for OS + games on a budget.',
        '- Keep a large HDD only for cold archival storage; never install modern games on one.',
        '',
        ssd ? 'Catalog pick: ' + ssd.title + ' - ' + store.formatPrice(ssd.price) : ''
      ].filter(l => l !== '').join('\n');
      return { reply, cards: ssd ? [ssd] : [] };
    }

    // ---- 8. FALLBACK: guided menu ----
    const featured = [];
    const seenCats = {};
    for (const x of store.products) {
      if (!(x.isFeatured || x.isBestSeller) || x.stock <= 0) continue;
      if (seenCats[x.category]) continue;
      seenCats[x.category] = true;
      featured.push(x);
      if (featured.length === 3) break;
    }
    const reply = [
      'I can assemble a complete, priced PC build from our live catalog. Try asking:',
      '',
      '- "Best PC build for GTA 6" / "Cyberpunk 2077 at 4K" / "AC Syndicate budget build"',
      '- "PC for Mechanical Engineering with SolidWorks" / "Civil BIM + Lumion build"',
      '- "Machine learning workstation under $2500" / "Data science PC"',
      '- "Build me a $1200 gaming PC" / "Best GPU under $600 for 1440p"',
      '- "Will an RTX 4070 work with a 650W PSU?" / "DDR4 vs DDR5"',
      '',
      'I detect your game, field of study, budget and target resolution automatically, then pick real in-stock parts (GPU, CPU, RAM, SSD, motherboard, PSU) and estimate FPS.',
      '',
      'Meanwhile, here are a few customer favourites:'
    ].join('\n');
    return { reply, cards: featured };
  }

  matchCatalogCards(text) {
    const words = text.toLowerCase().split(/\s+/);
    return store.products.filter(p =>
      words.some(w => w.length > 3 && (p.title.toLowerCase().includes(w) || p.brand.toLowerCase().includes(w)))
    ).slice(0, 3);
  }

  async callGeminiApi(prompt) {
    const apiKey = store.aiConfig.geminiApiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = "You are NexusTech AI, an expert computer hardware sales consultant for an e-commerce computer parts store. Recommend components, explain technical specs (CPU sockets, PSU wattage, DDR5, PCIe 4.0), check bottlenecks, and keep answers friendly, concise, and formatted in markdown.";

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
        }
      ]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }
}

window.AiAssistantComponent = new AiAssistant();
