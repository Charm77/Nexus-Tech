# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_cpus():
    items = []
    # Anchor product
    items.append(make_prod(
        'prod-cpu-7800x3d',
        'AMD Ryzen 7 7800X3D 8-Core 16-Thread Gaming Processor',
        'AMD', 'cpu', 389.99, 449.99, 13, 14, True, True, True, True, 'Esports & AAA Crown', 4.95, 112,
        'The undisputed king of modern PC gaming. Features AMD 3D V-Cache technology with an immense 96MB of L3 cache to deliver unprecedented FPS in top esports and open-world AAA titles with remarkable energy efficiency.',
        { 'Cores / Threads': '8 Cores / 16 Threads', 'Base Clock': '4.2 GHz', 'Max Boost Clock': 'Up to 5.0 GHz', 'Total L3 Cache': '96MB 3D V-Cache', 'Socket': 'AM5', 'TDP': '120W', 'Memory Support': 'DDR5 up to 6000MHz (EXPO)', 'Warranty': '3-Year AMD Box Warranty' },
        'Requires AMD AM5 Socket Motherboard (B650, X670) and DDR5 RAM. CPU Cooler required (AIO 240mm+ or dual-tower air cooler recommended).',
        { 'Cyberpunk 2077 (1440p Ultra)': '155 FPS', 'Valorant (1080p High)': '680 FPS', 'Counter-Strike 2 (1080p High)': '520 FPS', 'Baldurs Gate 3 (Act 3)': '118 FPS' }
    ))

    # Base curated CPU SKUs
    cpu_defs = [
        # AMD Ryzen 9000 Zen 5
        ('AMD', 'Ryzen 9 9950X 16-Core 32-Thread Flagship Desktop Processor', 649.99, 'AM5', '16/32', '4.3 GHz', '5.7 GHz', '80MB', '170W', 'Zen 5 Workstation & Extreme Gaming', True),
        ('AMD', 'Ryzen 9 9900X 12-Core 24-Thread High-End Processor', 499.99, 'AM5', '12/24', '4.4 GHz', '5.6 GHz', '76MB', '120W', 'Zen 5 Creator & Streamer Powerhouse', True),
        ('AMD', 'Ryzen 7 9700X 8-Core 16-Thread Desktop Processor', 359.99, 'AM5', '8/16', '3.8 GHz', '5.5 GHz', '40MB', '65W', 'Zen 5 Ultra-Efficient Gaming', True),
        ('AMD', 'Ryzen 5 9600X 6-Core 12-Thread Gaming Processor', 279.99, 'AM5', '6/12', '3.9 GHz', '5.4 GHz', '38MB', '65W', 'Zen 5 Sweet-spot Gaming', True),

        # AMD Ryzen 7000 / 8000
        ('AMD', 'Ryzen 9 7950X3D 16-Core Processor with 3D V-Cache', 599.99, 'AM5', '16/32', '4.2 GHz', '5.7 GHz', '144MB', '120W', 'Dual-CCD Creator + V-Cache Gaming', True),
        ('AMD', 'Ryzen 9 7950X 16-Core 32-Thread Unlocked Desktop Processor', 529.99, 'AM5', '16/32', '4.5 GHz', '5.7 GHz', '80MB', '170W', 'Ultimate Multithreading Heavyweight', True),
        ('AMD', 'Ryzen 9 7900X3D 12-Core Processor with 3D V-Cache', 449.99, 'AM5', '12/24', '4.4 GHz', '5.6 GHz', '140MB', '120W', 'V-Cache Hybrid Powerhouse', True),
        ('AMD', 'Ryzen 9 7900X 12-Core 24-Thread Desktop Processor', 389.99, 'AM5', '12/24', '4.7 GHz', '5.6 GHz', '76MB', '170W', 'High-FPS Gaming & 3D Rendering', True),
        ('AMD', 'Ryzen 9 7900 12-Core 24-Thread 65W Processor with Wraith Prism', 349.99, 'AM5', '12/24', '3.7 GHz', '5.4 GHz', '76MB', '65W', 'Cool & Quiet Workstation', True),
        ('AMD', 'Ryzen 7 7700X 8-Core 16-Thread Desktop Processor', 299.99, 'AM5', '8/16', '4.5 GHz', '5.4 GHz', '40MB', '105W', 'High Performance 1440p Gaming', True),
        ('AMD', 'Ryzen 7 7700 8-Core 16-Thread 65W Processor with Cooler', 279.99, 'AM5', '8/16', '3.8 GHz', '5.3 GHz', '40MB', '65W', 'High Efficiency 8-Core', True),
        ('AMD', 'Ryzen 5 7600X 6-Core 12-Thread Desktop Processor', 209.99, 'AM5', '6/12', '4.7 GHz', '5.3 GHz', '38MB', '105W', 'Pure Esports Performance', True),
        ('AMD', 'Ryzen 5 7600 6-Core 12-Thread 65W Processor with Wraith Stealth', 189.99, 'AM5', '6/12', '3.8 GHz', '5.1 GHz', '38MB', '65W', 'Budget AM5 Entry', True),
        ('AMD', 'Ryzen 5 7500F 6-Core Desktop Gaming Processor', 159.99, 'AM5', '6/12', '3.7 GHz', '5.0 GHz', '38MB', '65W', 'Best Value Esports Chip', True),
        ('AMD', 'Ryzen 7 8700G 8-Core APU with Radeon 780M Graphics & NPU AI', 319.99, 'AM5', '8/16', '4.2 GHz', '5.1 GHz', '24MB', '65W', 'Flagship APU with NPU AI', True),
        ('AMD', 'Ryzen 5 8600G 6-Core APU with Radeon 760M Graphics', 229.99, 'AM5', '6/12', '4.3 GHz', '5.0 GHz', '22MB', '65W', 'Entry Gaming APU', True),
        ('AMD', 'Ryzen 5 8500G 6-Core Desktop APU with Radeon 740M', 169.99, 'AM5', '6/12', '3.5 GHz', '5.0 GHz', '22MB', '65W', 'Compact PC Build APU', False),

        # AMD Ryzen 5000 AM4
        ('AMD', 'Ryzen 7 5800X3D 8-Core Processor with 3D V-Cache', 329.99, 'AM4', '8/16', '3.4 GHz', '4.5 GHz', '100MB', '105W', 'Ultimate AM4 Gaming Upgrade', True),
        ('AMD', 'Ryzen 7 5700X3D 8-Core Processor with 3D V-Cache', 219.99, 'AM4', '8/16', '3.0 GHz', '4.1 GHz', '100MB', '105W', 'Value 3D V-Cache AM4', True),
        ('AMD', 'Ryzen 9 5950X 16-Core 32-Thread Desktop Processor', 379.99, 'AM4', '16/32', '3.4 GHz', '4.9 GHz', '72MB', '105W', 'AM4 Productivity Titan', True),
        ('AMD', 'Ryzen 9 5900X 12-Core 24-Thread Desktop Processor', 269.99, 'AM4', '12/24', '3.7 GHz', '4.8 GHz', '70MB', '105W', 'Legendary AM4 12-Core', True),
        ('AMD', 'Ryzen 7 5800X 8-Core 16-Thread Desktop Processor', 189.99, 'AM4', '8/16', '3.8 GHz', '4.7 GHz', '36MB', '105W', 'Solid AM4 8-Core Gaming', True),
        ('AMD', 'Ryzen 7 5700X 8-Core 16-Thread 65W Desktop Processor', 169.99, 'AM4', '8/16', '3.4 GHz', '4.6 GHz', '36MB', '65W', 'Cool 65W AM4 Upgrade', True),
        ('AMD', 'Ryzen 7 5700G 8-Core Processor with Radeon Vega Graphics', 179.99, 'AM4', '8/16', '3.8 GHz', '4.6 GHz', '20MB', '65W', 'Integrated Graphics Favorite', False),
        ('AMD', 'Ryzen 5 5600X 6-Core 12-Thread Desktop Gaming Processor', 144.99, 'AM4', '6/12', '3.7 GHz', '4.6 GHz', '35MB', '65W', 'Bestselling AM4 Gamer Chip', True),
        ('AMD', 'Ryzen 5 5600 6-Core 12-Thread Processor with Wraith Stealth', 124.99, 'AM4', '6/12', '3.5 GHz', '4.4 GHz', '35MB', '65W', 'Unbeatable Value Budget CPU', True),
        ('AMD', 'Ryzen 5 5600GT 6-Core Processor with Radeon Graphics', 129.99, 'AM4', '6/12', '3.6 GHz', '4.6 GHz', '19MB', '65W', 'Refreshed AM4 APU', False),
        ('AMD', 'Ryzen 5 5500 6-Core 12-Thread Desktop Processor', 89.99, 'AM4', '6/12', '3.6 GHz', '4.2 GHz', '19MB', '65W', 'Budget Builder Special', False),
        ('AMD', 'Ryzen 3 4100 4-Core 8-Thread Desktop Processor', 59.99, 'AM4', '4/8', '3.8 GHz', '4.0 GHz', '6MB', '65W', 'Ultra-budget Entry', False),

        # AMD Threadripper
        ('AMD', 'Ryzen Threadripper 7980X 64-Core 128-Thread HEDT Processor', 4999.99, 'sTR5', '64/128', '3.2 GHz', '5.1 GHz', '320MB', '350W', 'Supercomputer HEDT Monster', False),
        ('AMD', 'Ryzen Threadripper 7970X 32-Core 64-Thread HEDT Processor', 2499.99, 'sTR5', '32/64', '4.0 GHz', '5.3 GHz', '160MB', '350W', '3D Cinema & VFX Workstation', False),
        ('AMD', 'Ryzen Threadripper 7960X 24-Core 48-Thread HEDT Processor', 1499.99, 'sTR5', '24/48', '4.2 GHz', '5.3 GHz', '152MB', '350W', 'High Frequency Workstation', False),

        # Intel 14th Gen
        ('Intel', 'Core i9-14900KS 24-Core Special Edition 6.2 GHz Processor', 689.99, 'LGA1700', '24 (8P+16E)/32', '3.2 GHz', '6.2 GHz', '36MB', '150W', 'Binned 6.2GHz World Record Holder', True),
        ('Intel', 'Core i9-14900K 24-Core 32-Thread Desktop Processor', 549.99, 'LGA1700', '24 (8P+16E)/32', '3.2 GHz', '6.0 GHz', '36MB', '125W', 'Enthusiast Flagship Raptor Lake-R', True),
        ('Intel', 'Core i9-14900KF 24-Core Desktop Processor (Discrete Graphics Req.)', 529.99, 'LGA1700', '24 (8P+16E)/32', '3.2 GHz', '6.0 GHz', '36MB', '125W', 'Pure Gaming 6.0GHz Monster', True),
        ('Intel', 'Core i9-14900 24-Core 65W Desktop Processor with Laminar Cooler', 499.99, 'LGA1700', '24 (8P+16E)/32', '2.0 GHz', '5.8 GHz', '36MB', '65W', 'Locked 65W Multi-core Power', True),
        ('Intel', 'Core i7-14700K 20-Core 28-Thread Desktop Processor', 399.99, 'LGA1700', '20 (8P+12E)/28', '3.4 GHz', '5.6 GHz', '33MB', '125W', 'Gamer & Creator Favorite Sweetspot', True),
        ('Intel', 'Core i7-14700KF 20-Core Desktop Processor', 379.99, 'LGA1700', '20 (8P+12E)/28', '3.4 GHz', '5.6 GHz', '33MB', '125W', 'Top Value High-End Gaming', True),
        ('Intel', 'Core i7-14700 20-Core 65W Desktop Processor', 369.99, 'LGA1700', '20 (8P+12E)/28', '2.1 GHz', '5.4 GHz', '33MB', '65W', 'Balanced Power 20-Core', True),
        ('Intel', 'Core i5-14600K 14-Core 20-Thread Desktop Processor', 299.99, 'LGA1700', '14 (6P+8E)/20', '3.5 GHz', '5.3 GHz', '24MB', '125W', 'Overclockable Esports King', True),
        ('Intel', 'Core i5-14600KF 14-Core Desktop Processor', 279.99, 'LGA1700', '14 (6P+8E)/20', '3.5 GHz', '5.3 GHz', '24MB', '125W', 'Best Value Midrange Unlocked', True),
        ('Intel', 'Core i5-14500 14-Core Desktop Processor with Laminar RM1 Cooler', 239.99, 'LGA1700', '14 (6P+8E)/20', '2.6 GHz', '5.0 GHz', '24MB', '65W', 'Excellent Non-K Multitasker', True),
        ('Intel', 'Core i5-14400 10-Core Desktop Processor with Integrated UHD 770', 219.99, 'LGA1700', '10 (6P+4E)/16', '2.5 GHz', '4.7 GHz', '20MB', '65W', 'Mainstream Productivity', True),
        ('Intel', 'Core i5-14400F 10-Core Desktop Gaming Processor', 189.99, 'LGA1700', '10 (6P+4E)/16', '2.5 GHz', '4.7 GHz', '20MB', '65W', 'Number 1 Budget Intel Gaming CPU', True),
        ('Intel', 'Core i3-14100 4-Core 8-Thread Desktop Processor', 129.99, 'LGA1700', '4P/8', '3.5 GHz', '4.7 GHz', '12MB', '60W', 'Budget 4-Core Fast Clocks', False),
        ('Intel', 'Core i3-14100F 4-Core Desktop Gaming Processor', 109.99, 'LGA1700', '4P/8', '3.5 GHz', '4.7 GHz', '12MB', '58W', 'Ultra-budget Discrete Gaming', True),

        # Intel 13th Gen
        ('Intel', 'Core i9-13900KS 24-Core 6.0 GHz Desktop Processor', 599.99, 'LGA1700', '24 (8P+16E)/32', '3.2 GHz', '6.0 GHz', '36MB', '150W', 'Collector Edition 6GHz', True),
        ('Intel', 'Core i9-13900K 24-Core 32-Thread Desktop Processor', 479.99, 'LGA1700', '24 (8P+16E)/32', '3.0 GHz', '5.8 GHz', '36MB', '125W', 'Proven Raptor Lake Titan', True),
        ('Intel', 'Core i7-13700K 16-Core 24-Thread Desktop Processor', 349.99, 'LGA1700', '16 (8P+8E)/24', '3.4 GHz', '5.4 GHz', '30MB', '125W', 'High Value 16-Core Gaming', True),
        ('Intel', 'Core i5-13600K 14-Core 20-Thread Desktop Processor', 259.99, 'LGA1700', '14 (6P+8E)/20', '3.5 GHz', '5.1 GHz', '24MB', '125W', 'Benchmark Champion Midrange', True),
        ('Intel', 'Core i5-13400F 10-Core Desktop Processor', 169.99, 'LGA1700', '10 (6P+4E)/16', '2.5 GHz', '4.6 GHz', '20MB', '65W', 'Budget Favorite 10-Core', True),
        ('Intel', 'Core i3-13100F 4-Core Desktop Processor', 89.99, 'LGA1700', '4P/8', '3.4 GHz', '4.5 GHz', '12MB', '58W', 'Entry Level Value', False),

        # Intel 12th Gen
        ('Intel', 'Core i9-12900K 16-Core 24-Thread Desktop Processor', 369.99, 'LGA1700', '16 (8P+8E)/24', '3.2 GHz', '5.2 GHz', '30MB', '125W', 'Alder Lake Groundbreaker', True),
        ('Intel', 'Core i7-12700K 12-Core 20-Thread Desktop Processor', 269.99, 'LGA1700', '12 (8P+4E)/20', '3.6 GHz', '5.0 GHz', '25MB', '125W', '12-Core High Clock Gaming', True),
        ('Intel', 'Core i5-12600K 10-Core 16-Thread Desktop Processor', 179.99, 'LGA1700', '10 (6P+4E)/16', '3.7 GHz', '4.9 GHz', '20MB', '125W', 'Overclockable Budget King', True),
        ('Intel', 'Core i5-12400F 6-Core 12-Thread Gaming Processor', 129.99, 'LGA1700', '6P/12', '2.5 GHz', '4.4 GHz', '18MB', '65W', 'Legendary Budget 6-Core', True),
        ('Intel', 'Core i3-12100F 4-Core 8-Thread Desktop Processor', 79.99, 'LGA1700', '4P/8', '3.3 GHz', '4.3 GHz', '12MB', '58W', 'Budget Office / Light Gaming', False),

        # Intel Core Ultra 200S
        ('Intel', 'Core Ultra 9 285K Arrow Lake 24-Core Desktop Processor', 619.99, 'LGA1851', '24 (8P+16E)/24', '3.7 GHz', '5.7 GHz', '36MB', '125W', 'Next-Gen TSMC 3nm with NPU', True),
        ('Intel', 'Core Ultra 7 265K 20-Core AI Desktop Processor', 419.99, 'LGA1851', '20 (8P+12E)/20', '3.9 GHz', '5.5 GHz', '33MB', '125W', 'Next-Gen AI Hardware Acceleration', True),
        ('Intel', 'Core Ultra 7 265KF 20-Core Desktop Processor', 399.99, 'LGA1851', '20 (8P+12E)/20', '3.9 GHz', '5.5 GHz', '33MB', '125W', 'High Efficiency Architecture', True),
        ('Intel', 'Core Ultra 5 245K 14-Core Desktop Processor', 319.99, 'LGA1851', '14 (6P+8E)/14', '4.2 GHz', '5.2 GHz', '24MB', '125W', 'Mainstream Next-Gen Arrow Lake', True),
        ('Intel', 'Core Ultra 5 245KF 14-Core Desktop Processor', 299.99, 'LGA1851', '14 (6P+8E)/14', '4.2 GHz', '5.2 GHz', '24MB', '125W', 'Optimal Thermal Efficiency', True),

        # Intel Xeon
        ('Intel', 'Xeon w9-3495X 56-Core 112-Thread Workstation Processor', 5889.99, 'LGA4677', '56/112', '1.9 GHz', '4.8 GHz', '105MB', '350W', 'Mission-Critical Scientific Compute', False),
        ('Intel', 'Xeon w7-3465X 28-Core 56-Thread Workstation Processor', 2899.99, 'LGA4677', '28/56', '2.5 GHz', '4.8 GHz', '75MB', '300W', 'High-Bandwidth AI & CAD Engine', False),
        ('Intel', 'Xeon w5-3435X 16-Core 32-Thread Workstation Processor', 1599.99, 'LGA4677', '16/32', '3.1 GHz', '4.7 GHz', '45MB', '270W', 'Studio Rendering Workstation', False),
        ('Intel', 'Xeon E-2388G 8-Core Server Processor with UHD P750', 589.99, 'LGA1200', '8/16', '3.2 GHz', '5.1 GHz', '16MB', '95W', 'Small Business NAS / Server', False)
    ]

    idx = 1
    for m in cpu_defs:
        if len(items) >= 110:
            break
        brand, name, price, socket, cores, base_c, boost_c, cache, tdp, tier, is_game = m
        disc = random.choice([0, 0, 5, 8, 10, 12, 15, 18, 20])
        orig = price / (1 - disc/100.0) if disc > 0 else price
        items.append(make_prod(
            f'prod-cpu-{idx}',
            f'{brand} {name}',
            brand, 'cpu', price, orig, disc, random.randint(3, 40),
            random.random() < 0.2, random.random() < 0.2, random.random() < 0.2,
            is_game, tier, round(random.uniform(4.5, 4.98), 2), random.randint(15, 320),
            f'Engineered with high performance architecture to deliver ultra-fast multi-core throughput and high IPC clock speeds for modern gaming and heavy computational workloads.',
            {
                'Cores / Threads': cores,
                'Base Clock': base_c,
                'Max Boost Clock': boost_c,
                'L3 Cache': cache,
                'Socket': socket,
                'TDP': tdp,
                'Memory Support': 'DDR5 / DDR4 High Speed' if 'LGA1700' in socket else 'DDR5 EXPO',
                'Warranty': '3-Year Official Brand Warranty'
            },
            f'Compatible with {socket} motherboards. Requires proper cooling solution rated for {tdp} or higher.',
            { 'Cinebench R23 Multi': f'{random.randint(12000, 48000)} pts', 'Geekbench 6 Single': f'{random.randint(2200, 3250)} pts', 'Gaming 1080p Ultra': f'{random.randint(140, 450)} FPS' }
        ))
        idx += 1

    # Fill remaining variants to reach exactly 110
    var_names = ['Special Edition Binned Gold', 'Black Edition Boxed', 'Industrial Bulk Tray Pack', 'Overclockers Edition', 'Low Voltage Eco Edition', 'Enterprise Pack']
    while len(items) < 110:
        base = random.choice(cpu_defs)
        var = random.choice(var_names)
        brand, name, price, socket, cores, base_c, boost_c, cache, tdp, tier, is_game = base
        p = round(price * random.uniform(0.92, 1.08), 2)
        disc = random.choice([0, 5, 10, 15])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-cpu-{idx}',
            f'{brand} {name} ({var})',
            brand, 'cpu', p, orig, disc, random.randint(2, 25),
            False, False, False, is_game, tier, round(random.uniform(4.4, 4.95), 2), random.randint(8, 95),
            f'Premium {brand} desktop processor SKU featuring certified silicon binning for reliable boost frequencies.',
            { 'Cores / Threads': cores, 'Base Clock': base_c, 'Max Boost Clock': boost_c, 'L3 Cache': cache, 'Socket': socket, 'TDP': tdp, 'Warranty': '3-Year Official Warranty' },
            f'Standard {socket} compatibility with updated motherboard BIOS.',
            { 'Cinebench R23': f'{random.randint(14000, 39000)} pts', 'Power Efficiency': 'Rated Tier-A' }
        ))
        idx += 1

    return items[:110]
