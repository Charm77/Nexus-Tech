# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_ram():
    items = []
    # Anchor product
    items.append(make_prod(
        'prod-ram-vengeance-32',
        'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30 AMD EXPO',
        'Corsair', 'ram', 119.99, 149.99, 20, 28, False, False, True, True, 'High Performance Sweet-spot', 4.85, 230,
        'The number 1 bestselling high-speed DDR5 memory kit with ultra-low CL30 latency optimized for AMD Ryzen 7000/8000 and Intel 13th/14th Gen. Dynamic ten-zone RGB lighting with Corsair iCUE integration.',
        { 'Capacity': '32GB (2 x 16GB)', 'Speed': 'DDR5 6000 MT/s', 'Tested Latency': '30-36-36-76', 'Voltage': '1.40V', 'Profiles': 'AMD EXPO & Intel XMP 3.0 Ready', 'Heatspreader': 'Solid Anodized Aluminum', 'Warranty': 'Limited Lifetime Warranty' },
        'Requires DDR5 Motherboards. Enables 1-click EXPO memory overclocking in BIOS.',
        { 'Memory Bandwidth': '94.2 GB/s', 'System Latency': '58.4 ns', 'Gaming 1% Lows Boost': '+14% FPS' }
    ))

    ram_brands = [
        ('Corsair', ['Vengeance RGB DDR5', 'Dominator Titanium DDR5', 'Dominator Platinum RGB', 'Vengeance LPX DDR4']),
        ('G.Skill', ['Trident Z5 RGB DDR5', 'Trident Z5 Royal (Gold)', 'Trident Z5 Royal (Silver)', 'Trident Z5 Neo EXPO', 'Ripjaws S5', 'Ripjaws V DDR4']),
        ('Kingston', ['Fury Renegade RGB DDR5', 'Fury Beast RGB DDR5', 'Fury Beast DDR4', 'Fury Impact SODIMM']),
        ('TeamGroup', ['T-Force Delta RGB DDR5', 'T-Force Vulcan DDR5', 'T-Create Expert 64GB Kit']),
        ('Crucial', ['Pro DDR5 Overclocking White', 'Pro DDR5 Plug-and-Play', 'DDR4 Ballistix Sport']),
        ('ADATA', ['XPG Lancer Blade RGB DDR5', 'XPG Spectrix D50 RGB DDR4']),
        ('Patriot', ['Viper Venom RGB DDR5', 'Viper Steel DDR4'])
    ]

    configs = [
        # (Capacity, Speed, Latency, Voltage, Price, Tier, IsGaming)
        ('16GB (2x8GB)', 'DDR4 3200MHz', 'CL16-18-18', '1.35V', 42.99, 'Budget Sweetspot DDR4', True),
        ('32GB (2x16GB)', 'DDR4 3600MHz', 'CL18-22-22', '1.35V', 69.99, 'High Capacity AM4 / LGA1700', True),
        ('64GB (2x32GB)', 'DDR4 3200MHz', 'CL16-20-20', '1.35V', 129.99, 'Creator Studio Workstation', False),
        ('32GB (2x16GB)', 'DDR5 5600MHz', 'CL36-36-36', '1.25V', 94.99, 'Mainstream DDR5 Standard', True),
        ('32GB (2x16GB)', 'DDR5 6000MHz', 'CL30-36-36', '1.35V', 119.99, 'Zen 4/5 1:1 Sweetspot Gaming', True),
        ('32GB (2x16GB)', 'DDR5 6400MHz', 'CL32-39-39', '1.40V', 134.99, 'Intel 14th Gen Fast Clocks', True),
        ('48GB (2x24GB)', 'DDR5 7200MHz', 'CL36-46-46', '1.40V', 189.99, 'Non-Binary High Speed Enthusiast', True),
        ('64GB (2x32GB)', 'DDR5 6000MHz', 'CL30-40-40', '1.35V', 209.99, 'High-End 4K Gaming & Rendering', True),
        ('64GB (2x32GB)', 'DDR5 6400MHz', 'CL32-39-39', '1.40V', 229.99, 'Extreme Enthusiast Workstation', True),
        ('96GB (2x48GB)', 'DDR5 6000MHz', 'CL30-36-36', '1.35V', 339.99, 'Non-Binary Heavy Productivity', False),
        ('128GB (4x32GB)', 'DDR5 5600MHz', 'CL40-40-40', '1.25V', 419.99, 'Virtualization & LLM Compute', False),
        ('32GB (2x16GB)', 'DDR5 8000MHz', 'CL38-48-48', '1.45V', 249.99, 'Apex Extreme Overclocking', True)
    ]

    idx = 1
    for brand, families in ram_brands:
        for fam in families:
            for conf in configs:
                if len(items) >= 120:
                    break
                cap, speed, cl, volt, base_p, tier, is_game = conf
                
                # DDR4 vs DDR5 check
                is_ddr4_fam = 'DDR4' in fam
                is_ddr4_conf = 'DDR4' in speed
                if is_ddr4_fam != is_ddr4_conf:
                    continue

                price = round(base_p * random.uniform(0.95, 1.12), 2)
                disc = random.choice([0, 0, 5, 10, 15, 20])
                orig = price / (1 - disc/100.0) if disc > 0 else price
                title = f"{brand} {fam} {cap} {speed} {cl.split('-')[0]}"

                items.append(make_prod(
                    f'prod-ram-{idx}',
                    title,
                    brand, 'ram', price, orig, disc, random.randint(5, 50),
                    random.random() < 0.15, random.random() < 0.15, random.random() < 0.18,
                    is_game, tier, round(random.uniform(4.5, 4.96), 2), random.randint(15, 250),
                    f'Engineered with premium hand-screened DRAM ICs, thermal-efficient aluminum heatspreaders, and fully verified XMP 3.0 / AMD EXPO profile support for zero-friction memory tuning.',
                    {
                        'Capacity': cap,
                        'Memory Speed': speed,
                        'Timing Latency': cl,
                        'Tested Voltage': volt,
                        'Form Factor': '288-pin DIMM Desktop',
                        'Overclock Profiles': 'Intel XMP 3.0 & AMD EXPO Ready',
                        'Warranty': 'Limited Lifetime Warranty'
                    },
                    f'Requires compatible {"DDR4" if is_ddr4_conf else "DDR5"} motherboard. Check motherboard QVL list for full rated XMP/EXPO speed verification.',
                    {
                        'AIDA64 Read Bandwidth': f'{random.randint(65, 118)} GB/s',
                        'Memory Latency': f'{random.randint(54, 72)} ns'
                    }
                ))
                idx += 1

    # Fill remaining to exactly 120
    colors = ['Matte Black', 'Snow White', 'Titanium Gray', 'Special Edition']
    while len(items) < 120:
        brand, families = random.choice(ram_brands)
        fam = random.choice(families)
        cap, speed, cl, volt, base_p, tier, is_game = random.choice(configs)
        col = random.choice(colors)
        p = round(base_p * random.uniform(0.96, 1.1), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-ram-{idx}',
            f'{brand} {fam} {cap} {speed} - {col}',
            brand, 'ram', p, orig, disc, random.randint(4, 30),
            False, False, False, is_game, tier, round(random.uniform(4.5, 4.9), 2), random.randint(12, 110),
            f'High-performance memory module engineered for rock-solid stability and gaming responsiveness.',
            { 'Capacity': cap, 'Speed': speed, 'Timing': cl, 'Voltage': volt, 'Color': col, 'Warranty': 'Lifetime Warranty' },
            'Standard DIMM desktop socket compatibility.',
            { 'Bandwidth Boost': '+12% FPS in CPU-bound titles' }
        ))
        idx += 1

    return items[:120]
