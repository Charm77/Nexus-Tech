# NexusTech & Kingdom of Games — Computer Parts E-Commerce Platform

> **CSE346 — Information Systems Design (ISD) Project**  
> **Institution:** Southeast University  
> **Course Lecturer & Co-Ordinator:** Ms. Shimul Dey Katha  
> **Team Members:** Mithila Farzana Trisha (2023200000318), Farha Islam Ashka (2024000000173), Nafees Ahmed Rafi (2024000000015)

---

## ⚡ Project Overview

**NexusTech & Kingdom of Games** is a modern, high-performance, responsive e-commerce web application specialized in selling computer components, custom gaming battlestations, and high-performance hardware.

It is built as a complete single-page application (SPA) with zero external server dependencies, running natively in any modern browser with persistent `localStorage` database management, full Admin operations, and a smart AI Shopping Assistant.

---

## 🌟 Key Features Implemented

### 1. Home Page Architecture (Exact Prompt Specifications)
- **Left-Hand Product Categories (Top-to-Bottom)**:
  - Vertical category sidebar on the left with dedicated hardware icons, live part counters, and category filters (*Processors/CPUs, Graphics Cards/GPUs, Motherboards, Memory/RAM, Storage/SSDs, Power Supplies, Casings & Cooling, Monitors, Gaming Peripherals, Pre-built Rigs*).
- **Top-Right Search Bar with Trending Suggestions**:
  - Positioned in the top right header.
  - Dropdown popover suggesting **Trending Searches** (`RTX 4080 Super`, `Ryzen 7 7800X3D`, `Samsung 990 Pro`, `360mm AIO Cooler`, etc.).
  - Live auto-complete search showing matching hardware with thumbnails, category tags, and real-time prices.
- **Hero Showcase: 3 Floating Side-by-Side Cards**:
  - 🌟 **Featured Product** (Flagship hardware spotlight with specs, warranty tags, and direct CTA).
  - ⚡ **Latest Product** (Next-gen architecture, new arrival tag).
  - 🔥 **Best Seller** (#1 community choice with 5-star ratings).
- **Discounted Products ("Flash Deals of the Day")**:
  - Live animated countdown timer ticking down in real time (`HH:MM:SS`).
  - Discount badges (`-32% OFF`, `-22% OFF`), original crossed-out prices, and visual stock scarcity progress bars (*"Only 4 units left!"*).
- **⚔️ "Kingdom of Games" (Highly Recommended Feature)**:
  - Futuristic cyberpunk/RGB dark aesthetic.
  - Gaming Tier classifications (*Enthusiast 4K Ultra, Esports 1440p Dominator, Rapid Trigger*).
  - **Interactive Live FPS Benchmark Estimator**: Switch between *Cyberpunk 2077*, *Black Myth: Wukong*, *Valorant*, and *Call of Duty: Warzone* to view real-time expected framerates across featured hardware!

### 2. General E-Commerce Storefront Features
- **Multi-Factor Hardware Filters**:
  - Filter by Brand (Intel, AMD, NVIDIA, ASUS, Corsair, MSI, Samsung, etc.).
  - Price Range Slider (interactive from \$50 to \$4500).
  - Availability status (In Stock vs Out of Stock).
  - Kingdom of Games Certified toggle.
  - Sort by Recommended, Price (Low-to-High / High-to-Low), Rating, and Discounts.
- **In-Depth Product Detail Page / Modal**:
  - High-res photo gallery with interactive thumbnail switcher.
  - Full Technical Specifications table (Socket, TDP, Clock Speed, Memory Bus, VRAM, Form factor).
  - **Hardware Compatibility Checker Notes** (e.g. *Requires AM5 motherboard and DDR5 RAM*).
  - Game benchmarks table for gaming components.
  - Customer Reviews section with average rating breakdown and a **"Write a Review" form** with star rating selector.
- **Slide-Over Shopping Cart**:
  - Item increment/decrement/removal.
  - Promo code discounts (Supports `TECH10` for 10% off and `GAMER50` for \$50 off).
  - Subtotal, 5% VAT, and free delivery threshold calculation.
- **Wishlist Management**:
  - 1-click heart icon save on all hardware.
  - Wishlist drawer with 1-click "Move All to Cart".
- **Multi-Step Checkout Flow**:
  - Step 1: Customer details & delivery address (Dhaka, Chittagong, Sylhet, etc.).
  - Step 2: Shipping method (Standard Courier, Express 24h, or SEU Tejgaon Campus Store Pickup).
  - Step 3: **Diverse Payment Options**:
    - 💳 Credit / Debit Card with live card mockup.
    - 📱 bKash / Nagad / Rocket Mobile Banking (with Transaction ID simulator).
    - 🌐 PayPal Instant.
    - 💵 Cash on Delivery (COD with zero advance).
  - Step 4: Order Confirmation & Printable Invoice Receipt.
- **Customer Order History**:
  - Real-time tracking progress bar (*Placed ➔ Processing ➔ Shipped ➔ Delivered*).
  - Itemized history of all placed hardware orders.
- **Store Locator**:
  - Physical outlets map and locator for Southeast University Campus Express, BCS Computer City IDB Bhaban, Banani Experience Centre, and Chittagong Tech Hub.

### 3. AI Shopping Assistant ("Nexus AI")
- Floating robotic assistant in the bottom-right corner.
- **Dual-Engine Architecture**:
  1. **Intelligent Offline Hardware Engine**: Answers PC building questions, checks PSU wattage vs GPU requirements (e.g., *Is 650W enough for RTX 4070?*), recommends balanced \$1200 / \$1500 builds, and outputs interactive **Product Cards inside the chat** with instant "Add to Cart" buttons.
  2. **Live Google Gemini API Mode**: Optional settings panel where instructors or users can provide a Gemini API Key to unlock real-time generative AI conversational intelligence.

### 4. Admin Management Portal
- Switchable via top header toggle button `[ 🛠️ Admin / 🛒 Storefront ]`.
- **Dashboard Overview**:
  - KPI Stat Cards: Gross Revenue, Active Orders, Catalog Size, Low-Stock alerts.
  - Chart.js Visual Charts: Monthly Revenue Trend line chart & Category Share doughnut chart.
- **Product Management (Full CRUD)**:
  - Add New Product with title, brand, category, price, discount, stock, image URL, gaming tags, and description.
  - Edit existing products in real time.
  - Delete products with confirmation alert.
- **Category Management**:
  - Add and delete custom hardware categories and slugs.
- **Inventory & Stock Management**:
  - Low Stock alert table (≤ 5 units) with 1-click **Quick Restock (+10 units)**.
  - **Upcoming Products & Pre-Orders** showcase (RTX 5090 Blackwell, Arrow Lake, Gen5 SSDs) with pre-order slot tracker.
- **Order Management Pipeline**:
  - Live customer orders list.
  - Instant status switcher (*Placed, Processing, Shipped, Delivered, Cancelled*).
- **Customer Directory**:
  - View registered user accounts, order counters, and spending totals.

---

## 🚀 How to Run the Project

No Node.js or `npm install` required!

### Option A: Directly in your Browser
Simply double-click `index.html` or right-click `index.html` ➔ **Open with Google Chrome / Microsoft Edge / Firefox**.

### Option B: Local Web Server (Recommended)
Run Python's built-in HTTP server:
```powershell
python -m http.server 8000
```
Then open your browser at:
```
http://localhost:8000
```

---

## 🔑 Accounts for Evaluation

| Role | Email | Password | Features |
|---|---|---|---|
| **Customer** | `customer@nexuspc.com` | `user123` | Storefront browsing, Wishlist, Cart, Checkout, Order History |
| **Administrator** | `admin@nexuspc.com` | `Admin@123` | Hidden Admin Panel: Dashboard, Product CRUD, Categories, Inventory, Orders, Customers, Sales Analytics |

*The Admin Panel is hidden from the public storefront. There is no visible admin link or role switcher — a user must register/sign in, and the administrator account above is verified by role on login. Only then does the Admin button appear in the navbar. New public registrations are always customers.*

---

## 🏷️ Test Coupons

- `TECH10` — 10% Discount on entire order (University Tech Special).
- `GAMER50` — \$50 Instant discount on gaming hardware.
