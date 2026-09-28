// Admin Modals Component
// Handles Add/Edit Product Modal, Category Creation Modal, and Deletion Dialogs

class AdminModals {
  constructor() {
    this.container = null;
    this.activeModal = null; // 'product', 'category', 'delete'
    this.editingProduct = null;
    this.deletingProductId = null;
  }

  openProductModal(productId = null) {
    this.editingProduct = productId ? store.getProductById(productId) : null;
    this.activeModal = 'product';
    this.render();
  }

  openCategoryModal() {
    this.activeModal = 'category';
    this.render();
  }

  openDeleteConfirm(productId) {
    this.deletingProductId = productId;
    this.activeModal = 'delete';
    this.render();
  }

  close() {
    this.activeModal = null;
    this.editingProduct = null;
    this.deletingProductId = null;
    if (this.container) {
      this.container.classList.add('hidden');
    }
  }

  render() {
    let el = document.getElementById('admin-modals-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'admin-modals-container';
      document.body.appendChild(el);
    }
    this.container = el;

    const p = this.editingProduct;
    const isEdit = !!p;

    el.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <div class="glass-panel rounded-3xl border border-purple-500/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 modal-enter relative bg-slate-900 text-gray-100">
          
          <!-- Close Button -->
          <button onclick="window.AdminModalsComponent.close()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 flex items-center justify-center transition">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- 1. ADD / EDIT PRODUCT MODAL -->
          ${this.activeModal === 'product' ? `
            <div>
              <div class="flex items-center gap-2.5 pb-3 border-b border-slate-800 mb-5">
                <i class="fa-solid fa-microchip text-cyan-400 text-lg"></i>
                <h3 class="font-gaming text-base font-bold text-white uppercase">
                  ${isEdit ? 'Edit Hardware Component' : 'Add New Hardware to Catalog'}
                </h3>
              </div>

              <form onsubmit="window.saveAdminProductForm(event, '${isEdit ? p.id : ''}')" class="space-y-4 text-xs">
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="sm:col-span-2">
                    <label class="block text-gray-300 font-semibold mb-1">Product Title</label>
                    <input type="text" id="adm-p-title" required value="${isEdit ? p.title : ''}" placeholder="e.g. Gigabyte RTX 4070 Windforce OC 12GB" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Brand</label>
                    <input type="text" id="adm-p-brand" required value="${isEdit ? p.brand : ''}" placeholder="e.g. Gigabyte" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Category</label>
                    <select id="adm-p-category" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400">
                      ${store.categories.filter(c => c.id !== 'all').map(cat => `
                        <option value="${cat.slug}" ${isEdit && p.category === cat.slug ? 'selected' : ''}>${cat.name}</option>
                      `).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Price ($ USD)</label>
                    <input type="number" step="0.01" id="adm-p-price" required value="${isEdit ? p.price : ''}" placeholder="599.99" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Stock Units</label>
                    <input type="number" id="adm-p-stock" required value="${isEdit ? p.stock : '15'}" placeholder="15" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Original Price ($ USD) (Optional)</label>
                    <input type="number" step="0.01" id="adm-p-orig-price" value="${isEdit ? (p.originalPrice || p.price) : ''}" placeholder="699.99" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label class="block text-gray-300 font-semibold mb-1">Discount % (e.g. 15 for -15% OFF)</label>
                    <input type="number" id="adm-p-discount" value="${isEdit ? (p.discountPercent || 0) : '0'}" placeholder="0" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>

                <div>
                  <label class="block text-gray-300 font-semibold mb-1">Image URL</label>
                  <input type="url" id="adm-p-image" required value="${isEdit ? p.image : 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80'}" placeholder="https://..." class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                </div>

                <div>
                  <label class="block text-gray-300 font-semibold mb-1">Description</label>
                  <textarea id="adm-p-desc" rows="2" required placeholder="Component details, cooling technology, boost clocks..." class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400">${isEdit ? p.description : ''}</textarea>
                </div>

                <!-- Gaming & Feature Flags -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="adm-p-gaming" ${isEdit && p.isGaming ? 'checked' : ''} class="rounded bg-slate-900 border-purple-800 text-purple-500" />
                    <span class="text-purple-300 font-semibold">⚔️ Kingdom of Games Certified</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="adm-p-featured" ${isEdit && p.isFeatured ? 'checked' : ''} class="rounded bg-slate-900 border-cyan-800 text-cyan-500" />
                    <span class="text-cyan-300 font-semibold">🌟 Featured Flagship</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="adm-p-latest" ${isEdit && p.isLatest ? 'checked' : ''} class="rounded bg-slate-900 border-cyan-800 text-cyan-500" />
                    <span class="text-white font-semibold">⚡ Latest Arrival</span>
                  </label>
                </div>

                <div class="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                  <button type="button" onclick="window.AdminModalsComponent.close()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-purple-600/30">
                    ${isEdit ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>

              </form>
            </div>
          ` : ''}

          <!-- 2. ADD CATEGORY MODAL -->
          ${this.activeModal === 'category' ? `
            <div>
              <div class="flex items-center gap-2.5 pb-3 border-b border-slate-800 mb-5">
                <i class="fa-solid fa-layer-group text-purple-400 text-lg"></i>
                <h3 class="font-gaming text-base font-bold text-white uppercase">Add New Hardware Category</h3>
              </div>

              <form onsubmit="window.saveAdminCategoryForm(event)" class="space-y-4 text-xs">
                <div>
                  <label class="block text-gray-300 font-semibold mb-1">Category Name</label>
                  <input type="text" id="adm-c-name" required placeholder="e.g. Sound Cards & DACs" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-gray-300 font-semibold mb-1">Category Slug (lowercase, no spaces)</label>
                  <input type="text" id="adm-c-slug" required placeholder="sound-cards" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label class="block text-gray-300 font-semibold mb-1">FontAwesome Icon Class</label>
                  <input type="text" id="adm-c-icon" required value="fa-solid fa-volume-high" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400" />
                </div>

                <div class="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                  <button type="button" onclick="window.AdminModalsComponent.close()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" class="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          ` : ''}

          <!-- 3. DELETE CONFIRMATION -->
          ${this.activeModal === 'delete' ? `
            <div class="text-center space-y-4 py-2">
              <div class="w-14 h-14 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 mx-auto flex items-center justify-center text-2xl">
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <div>
                <h3 class="font-gaming text-base font-bold text-white">Delete Product from Catalog?</h3>
                <p class="text-xs text-gray-400 mt-1 max-w-sm mx-auto">This will permanently delete this hardware item from the store catalog, cart references, and stock tracking.</p>
              </div>
              <div class="pt-3 flex justify-center gap-3">
                <button onclick="window.AdminModalsComponent.close()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold">
                  Cancel
                </button>
                <button onclick="store.deleteProduct('${this.deletingProductId}'); window.AdminModalsComponent.close(); window.showToast('Product successfully deleted.');" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30">
                  Yes, Delete Item
                </button>
              </div>
            </div>
          ` : ''}

        </div>
      </div>
    `;

    el.classList.remove('hidden');
  }
}

window.AdminModalsComponent = new AdminModals();
