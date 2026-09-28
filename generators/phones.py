# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_phones():
    items = []
    phone_defs = [
        # Apple
        ('Apple', 'iPhone 16 Pro Max', 'Apple A18 Pro 3nm', '6.9" Super Retina XDR OLED 120Hz ProMotion', '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto', '4,685 mAh', 1199.99, 'Ultra-Flagship Titanium Monster', False),
        ('Apple', 'iPhone 16 Pro', 'Apple A18 Pro 3nm', '6.3" Super Retina XDR OLED 120Hz', '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto', '3,582 mAh', 999.99, 'Compact Pro Powerhouse', False),
        ('Apple', 'iPhone 16 Plus', 'Apple A18 3nm', '6.7" Super Retina XDR OLED', '48MP Fusion + 12MP Ultra-Wide', '4,674 mAh', 899.99, 'Long Battery Big Screen', False),
        ('Apple', 'iPhone 16', 'Apple A18 3nm', '6.1" Super Retina XDR OLED', '48MP Fusion + 12MP Ultra-Wide', '3,561 mAh', 799.99, 'Mainstream Modern Flagship', False),
        ('Apple', 'iPhone 15 Pro Max', 'Apple A17 Pro 3nm', '6.7" Super Retina XDR 120Hz', '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto', '4,422 mAh', 1049.99, 'Proven Titanium Leader', False),
        ('Apple', 'iPhone 15', 'Apple A16 Bionic', '6.1" Super Retina XDR with Dynamic Island', '48MP Main + 12MP Ultra-Wide', '3,349 mAh', 699.99, 'High-Value Entry Flagship', False),

        # Samsung
        ('Samsung', 'Galaxy S24 Ultra 5G (Galaxy AI)', 'Snapdragon 8 Gen 3 for Galaxy', '6.8" Dynamic AMOLED 2X 120Hz QHD+ Flat', '200MP Main + 50MP 5x + 10MP 3x + 12MP Ultra-Wide', '5,000 mAh', 1299.99, 'Ultimate AI Android Flagship', True),
        ('Samsung', 'Galaxy S24+ 5G', 'Snapdragon 8 Gen 3 for Galaxy', '6.7" Dynamic AMOLED 2X 120Hz QHD+', '50MP Main + 10MP 3x Tele + 12MP Ultra-Wide', '4,900 mAh', 999.99, 'Big Screen Samsung AI', False),
        ('Samsung', 'Galaxy S24 5G', 'Snapdragon 8 Gen 3 for Galaxy', '6.2" Dynamic AMOLED 2X 120Hz FHD+', '50MP Main + 10MP 3x Tele + 12MP Ultra-Wide', '4,000 mAh', 799.99, 'Compact Android King', False),
        ('Samsung', 'Galaxy Z Fold 6 5G AI Foldable', 'Snapdragon 8 Gen 3 for Galaxy', '7.6" Main Foldable 120Hz + 6.3" Cover AMOLED', '50MP Dual Tele Triple Camera', '4,400 mAh', 1899.99, 'Next-Gen Productivity Foldable', True),
        ('Samsung', 'Galaxy Z Flip 6 5G Pocket Foldable', 'Snapdragon 8 Gen 3 for Galaxy', '6.7" Main AMOLED 120Hz + 3.4" FlexWindow', '50MP Dual Camera System', '4,000 mAh', 1099.99, 'Pocket Style Foldable', False),
        ('Samsung', 'Galaxy S23 FE 5G Fan Edition', 'Snapdragon 8 Gen 1', '6.4" Dynamic AMOLED 2X 120Hz', '50MP OIS Triple Camera', '4,500 mAh', 599.99, 'Fan Edition Value Leader', False),
        ('Samsung', 'Galaxy A55 5G Awesome', 'Exynos 1480 with AMD Xclipse 530', '6.6" Super AMOLED 120Hz', '50MP OIS + 12MP Ultra-Wide', '5,000 mAh', 429.99, 'Premium Midrange Value', False),

        # Gaming Mobile Phone Beasts
        ('ASUS', 'ROG Phone 8 Pro Edition 5G', 'Snapdragon 8 Gen 3 (3.3GHz)', '6.78" Samsung Flexible AMOLED 165Hz LTPO', '50MP Gimbal OIS + 32MP 3x Tele + 13MP Ultra-Wide', '5,500 mAh', 1199.99, 'Ultimate Mobile Esports King', True),
        ('ASUS', 'ROG Phone 8 Standard Edition', 'Snapdragon 8 Gen 3', '6.78" AMOLED 165Hz with AirTriggers', '50MP Sony IMX890 Gimbal', '5,500 mAh', 999.99, 'Gamer Certified Powerhouse', True),
        ('Nubia', 'RedMagic 9S Pro+ 5G Gaming Phone', 'Snapdragon 8 Gen 3 Leading Version (3.4GHz)', '6.8" True Fullscreen AMOLED 120Hz Under-Display Cam', '50MP Dual OIS Camera', '6,500 mAh', 899.99, 'Internal Turbofan 22,000 RPM Beast', True),
        ('Nubia', 'RedMagic 9 Pro 5G Esports Phone', 'Snapdragon 8 Gen 3', '6.8" Under-Display Camera True Screen', '50MP Dual Camera', '6,500 mAh', 699.99, 'Pure Fullscreen Gaming', True),

        # Xiaomi & POCO
        ('Xiaomi', '14 Ultra Leica Quad Camera 5G', 'Snapdragon 8 Gen 3', '6.73" WQHD+ AMOLED 120Hz 3000 nits', 'Leica 50MP 1-inch LYT-900 Quad Camera System', '5,000 mAh', 1299.99, '1-Inch Sensor Photography Monster', True),
        ('Xiaomi', '14 Compact Flagship 5G', 'Snapdragon 8 Gen 3', '6.36" CrystalRes AMOLED 120Hz', 'Leica Summilux 50MP Triple Camera', '4,610 mAh', 849.99, 'Compact Power Beast', False),
        ('POCO', 'F6 Pro 5G Flagship Killer', 'Snapdragon 8 Gen 2', '6.67" WQHD+ Flow AMOLED 120Hz 120W Charge', '50MP OIS Light Fusion 800', '5,000 mAh', 499.99, 'Affordable Flagship Esports', True),
        ('POCO', 'X6 Pro 5G Dimensity 8300-Ultra', 'Dimensity 8300-Ultra (4nm)', '6.67" CrystalRes 1.5K Flow AMOLED 120Hz', '64MP OIS Triple Camera', '5,000 mAh', 329.99, 'Top Value Midrange Speedster', True),

        # OnePlus
        ('OnePlus', '12 5G Hasselblad Camera', 'Snapdragon 8 Gen 3', '6.82" 2K 120Hz ProXDR AMOLED LTPO', '50MP LYT-808 + 64MP 3x Periscope + 48MP Ultra-Wide', '5,400 mAh', 799.99, 'Smooth Beyond Belief Flagship', True),
        ('OnePlus', '12R 5G Performance Edition', 'Snapdragon 8 Gen 2', '6.78" 1.5K 120Hz LTPO4 AMOLED', '50MP Sony IMX890 OIS', '5,500 mAh', 499.99, 'Extreme Battery Gaming Value', True),
        ('OnePlus', 'Open Foldable Flagship 5G', 'Snapdragon 8 Gen 2', '7.82" Flexi-fluid AMOLED 120Hz + 6.31" Outer Screen', 'Hasselblad 48MP Dual OIS Triple Camera', '4,805 mAh', 1699.99, 'Ultra-Light Thin Foldable', True),

        # Google Pixel
        ('Google', 'Pixel 9 Pro XL 5G with Gemini Nano AI', 'Google Tensor G4 with Titan M2', '6.8" Super Actua OLED 120Hz LTPO 3000 nits', '50MP Main + 48MP 5x Telephoto + 48MP Ultra-Wide', '5,060 mAh', 1099.99, 'Pure Google AI Photography', False),
        ('Google', 'Pixel 9 Pro 5G Compact Pro AI', 'Google Tensor G4 with Titan M2', '6.3" Super Actua OLED 120Hz LTPO', '50MP Main + 48MP 5x Tele + 48MP Ultra-Wide', '4,700 mAh', 999.99, 'Compact Pro AI Flagship', False),
        ('Google', 'Pixel 9 5G Everyday AI Phone', 'Google Tensor G4', '6.3" Actua OLED 120Hz', '50MP Main + 48MP Ultra-Wide Macro', '4,700 mAh', 799.99, 'Everyday Google Intelligence', False),
        ('Google', 'Pixel 8a 5G Budget AI Leader', 'Google Tensor G3', '6.1" Actua OLED 120Hz', '64MP Main + 13MP Ultra-Wide', '4,492 mAh', 499.99, 'Best Value Camera Phone', False),

        # Nothing & Sony
        ('Nothing', 'Phone (2) Transparent Glyph Interface', 'Snapdragon 8+ Gen 1', '6.7" Flexible LTPO OLED 120Hz', '50MP Sony IMX890 Dual Camera', '4,700 mAh', 599.99, 'Iconic Glyph Light Designer', True),
        ('Nothing', 'Phone (2a) Plus Transparent', 'MediaTek Dimensity 7350 Pro 5G', '6.7" Flexible AMOLED 120Hz', '50MP Dual Camera + 50MP Selfie', '5,000 mAh', 399.99, 'Modern Minimalist Performance', False),
        ('Sony', 'Xperia 1 VI 5G Pro Photography', 'Snapdragon 8 Gen 3', '6.5" 19.5:9 FHD+ HDR OLED 120Hz', 'Zeiss T* 48MP + 12MP 85-170mm Continuous Optical Zoom', '5,000 mAh', 1399.99, 'Continuous Optical Zoom Cinema', True)
    ]

    storages = [
        ('128GB Storage, 8GB RAM', 0.92),
        ('256GB Storage, 12GB RAM', 1.0),
        ('512GB Storage, 16GB RAM', 1.15),
        ('1TB Storage, 16GB/24GB RAM', 1.32)
    ]

    colors = ['Natural Titanium', 'Midnight Onyx Black', 'Phantom Silver', 'Emerald Green', 'Deep Blue', 'Sunset Gold']

    idx = 1
    for brand, model, chip, display, cam, batt, base_p, tier, is_game in phone_defs:
        for st_name, st_mult in storages:
            if len(items) >= 130:
                break
            # Skip 128GB on ultra-flagships
            if '128GB' in st_name and ('Pro Max' in model or 'Ultra' in model or 'Fold' in model):
                continue

            col = random.choice(colors)
            p = round(base_p * st_mult * random.uniform(0.96, 1.08), 2)
            disc = random.choice([0, 0, 5, 8, 10, 12, 15])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} ({st_name.split(',')[0].strip()}, {col})"

            items.append(make_prod(
                f'prod-phone-{idx}',
                title,
                brand, 'phone', p, orig, disc, random.randint(4, 30),
                random.random() < 0.18, random.random() < 0.18, random.random() < 0.18,
                is_game, tier, round(random.uniform(4.55, 4.98), 2), random.randint(30, 480),
                f'Premium unlocked smartphone powered by high-efficiency silicon, ultra-vibrant dynamic display with high refresh rate, and studio-grade computational camera system.',
                {
                    'Processor Chipset': chip,
                    'Display Screen': display,
                    'Camera Hardware': cam,
                    'Storage & RAM': st_name,
                    'Battery Capacity': batt,
                    'Connectivity': '5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.4, NFC',
                    'Color Finish': col,
                    'Warranty': '1-Year Official Global Brand Warranty'
                },
                'Factory unlocked for all worldwide GSM / LTE / 5G carriers. Supports dual Nano-SIM and eSIM.',
                {
                    'AnTuTu v10 Benchmark': f'{random.randint(1450000, 2280000):,} pts',
                    'Geekbench 6 Multi-Core': f'{random.randint(5200, 7400)} pts'
                }
            ))
            idx += 1

    while len(items) < 130:
        brand, model, chip, display, cam, batt, base_p, tier, is_game = random.choice(phone_defs)
        st_name, st_mult = random.choice(storages[:3])
        col = random.choice(colors)
        p = round(base_p * st_mult * random.uniform(0.94, 1.06), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-phone-{idx}',
            f'{brand} {model} ({st_name.split(",")[0].strip()}, {col} - Unlocked)',
            brand, 'phone', p, orig, disc, random.randint(5, 20),
            False, False, False, is_game, tier, round(random.uniform(4.5, 4.92), 2), random.randint(15, 110),
            f'Flagship mobile smartphone engineered for gaming, photography, and smooth daily performance.',
            { 'Processor': chip, 'Display': display, 'Storage': st_name, 'Battery': batt, 'Warranty': '1-Year Warranty' },
            'Factory unlocked for all international mobile network operators.',
            { 'Performance': 'Flagship Tier 1' }
        ))
        idx += 1

    return items[:130]
