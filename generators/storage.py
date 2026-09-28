# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_ssds():
    items = []
    # Anchor product
    items.append(make_prod(
        'prod-ssd-samsung-990',
        'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 Internal SSD with Heatsink',
        'Samsung', 'ssd', 169.99, 249.99, 32, 22, True, False, True, True, 'Enthusiast PCIe 4.0 Speedster', 4.95, 340,
        'The definitive champion of PCIe 4.0 internal solid-state drives. Reaching staggering read speeds of 7,450 MB/s with smart thermal control and custom nickel-coated controller. Certified for both extreme PC gaming and Sony PlayStation 5 console expansion.',
        { 'Form Factor': 'M.2 2280', 'Interface': 'PCIe Gen 4.0 x4, NVMe 2.0', 'Sequential Read': 'Up to 7,450 MB/s', 'Sequential Write': 'Up to 6,900 MB/s', 'Random Read (4KB)': '1,400,000 IOPS', 'Endurance (TBW)': '1,200 TBW', 'Heatsink': 'Integrated Low-Profile Aluminum', 'Warranty': '5-Year Manufacturer Warranty' },
        'Requires M.2 NVMe slot supporting PCIe 4.0 x4 for full 7,450 MB/s throughput. Backward compatible with PCIe 3.0. PS5 compatible.',
        { 'Cyberpunk 2077 Level Load': '3.2 Seconds', '4K Video Direct Scrubbing': 'Instant (0 ms stutter)', 'DirectStorage Load Boost': '4.8x Faster' }
    ))

    ssd_defs = [
        # (Brand, Model, Interface, Read, Write, Form, Tier)
        ('Samsung', '990 PRO with Heatsink', 'PCIe 4.0 NVMe', '7,450 MB/s', '6,900 MB/s', 'M.2 2280', 'Enthusiast Flagship Gen4'),
        ('Samsung', '990 PRO Bare Drive', 'PCIe 4.0 NVMe', '7,450 MB/s', '6,900 MB/s', 'M.2 2280', 'Flagship Gaming Gen4'),
        ('Samsung', '990 EVO Hybrid PCIe 4.0/5.0', 'PCIe 4.0 x4 / 5.0 x2', '5,000 MB/s', '4,200 MB/s', 'M.2 2280', 'Mainstream Energy Efficient'),
        ('Samsung', '980 PRO with Heatsink', 'PCIe 4.0 NVMe', '7,000 MB/s', '5,100 MB/s', 'M.2 2280', 'PS5 Console Ready Gen4'),
        ('Samsung', '870 EVO SATA III 2.5 Inch', 'SATA III 6Gb/s', '560 MB/s', '530 MB/s', '2.5" 7mm', 'Reliable SATA Bulk Storage'),
        ('Western Digital', 'WD_BLACK SN850X with Heatsink', 'PCIe 4.0 NVMe', '7,300 MB/s', '6,600 MB/s', 'M.2 2280', 'High-FPS Game Drive'),
        ('Western Digital', 'WD_BLACK SN850X Non-Heatsink', 'PCIe 4.0 NVMe', '7,300 MB/s', '6,600 MB/s', 'M.2 2280', 'Desktop & Laptop NVMe'),
        ('Western Digital', 'WD_BLACK SN770 DRAM-less', 'PCIe 4.0 NVMe', '5,150 MB/s', '4,900 MB/s', 'M.2 2280', 'Best Value Gaming SSD'),
        ('Western Digital', 'WD Blue SN580', 'PCIe 4.0 NVMe', '4,150 MB/s', '4,150 MB/s', 'M.2 2280', 'Everyday Content Creator'),
        ('Western Digital', 'WD Red SN700 NAS NVMe', 'PCIe 3.0 NVMe', '3,400 MB/s', '3,100 MB/s', 'M.2 2280', 'High-Endurance 24/7 NAS Cache'),
        ('Crucial', 'T705 Gen5 with Copper Heatsink', 'PCIe 5.0 NVMe', '14,500 MB/s', '12,700 MB/s', 'M.2 2280', 'World Fastest Gen5 Titan'),
        ('Crucial', 'T700 Gen5 with Passive Heatsink', 'PCIe 5.0 NVMe', '12,400 MB/s', '11,800 MB/s', 'M.2 2280', 'Extreme Gen5 Bandwidth'),
        ('Crucial', 'T500 Gen4 with Heatsink', 'PCIe 4.0 NVMe', '7,400 MB/s', '7,000 MB/s', 'M.2 2280', 'Micron 232-Layer Flagship'),
        ('Crucial', 'P3 Plus Gen4', 'PCIe 4.0 NVMe', '5,000 MB/s', '4,200 MB/s', 'M.2 2280', 'Affordable High-Capacity NVMe'),
        ('Kingston', 'KC3000 PCIe 4.0', 'PCIe 4.0 NVMe', '7,000 MB/s', '7,000 MB/s', 'M.2 2280', 'High Endurance Powerhouse'),
        ('Kingston', 'FURY Renegade PCIe 4.0 with Heatsink', 'PCIe 4.0 NVMe', '7,300 MB/s', '7,000 MB/s', 'M.2 2280', 'Competitive Gamer NVMe'),
        ('Kingston', 'NV2 PCIe 4.0 Entry', 'PCIe 4.0 NVMe', '3,500 MB/s', '2,800 MB/s', 'M.2 2280', 'Budget Friendly NVMe M.2'),
        ('Kingston', 'A400 2.5 Inch SATA', 'SATA III 6Gb/s', '500 MB/s', '450 MB/s', '2.5" 7mm', 'Legacy Laptop Upgrade SATA'),
        ('Corsair', 'MP700 PRO PCIe 5.0 Air Cooler', 'PCIe 5.0 NVMe', '12,400 MB/s', '11,800 MB/s', 'M.2 2280', 'Active Fan Cooled Gen5'),
        ('Corsair', 'MP600 PRO LPX PS5 Ready', 'PCIe 4.0 NVMe', '7,100 MB/s', '6,800 MB/s', 'M.2 2280', 'Low-Profile PS5 Optimizer'),
        ('Corsair', 'MP600 Core XT', 'PCIe 4.0 NVMe', '5,000 MB/s', '4,400 MB/s', 'M.2 2280', 'QLC High Capacity Value'),
        ('Sabrent', 'Rocket 5 Gen5 Extreme', 'PCIe 5.0 NVMe', '14,000 MB/s', '12,000 MB/s', 'M.2 2280', 'Extreme DirectStorage Pioneer'),
        ('Sabrent', 'Rocket 4 Plus-G Gaming', 'PCIe 4.0 NVMe', '7,300 MB/s', '6,900 MB/s', 'M.2 2280', 'DirectStorage Optimized'),
        ('Lexar', 'NM790 M.2 2280', 'PCIe 4.0 NVMe', '7,400 MB/s', '6,500 MB/s', 'M.2 2280', 'Maxiogek Controller Value Champion'),
        ('Lexar', 'NM800 PRO with Heatsink', 'PCIe 4.0 NVMe', '7,500 MB/s', '6,500 MB/s', 'M.2 2280', 'Heavy Heatspreader Gaming NVMe'),
        ('SK Hynix', 'Platinum P41', 'PCIe 4.0 NVMe', '7,000 MB/s', '6,500 MB/s', 'M.2 2280', 'In-House Controller Legend'),
        ('Seagate', 'FireCuda 530 with EKWB Heatsink', 'PCIe 4.0 NVMe', '7,300 MB/s', '6,900 MB/s', 'M.2 2280', 'Endurance Workhorse (2,550 TBW)')
    ]

    capacities = [
        ('1TB', 84.99, '600 TBW'),
        ('2TB', 149.99, '1,200 TBW'),
        ('4TB', 289.99, '2,400 TBW'),
        ('500GB', 54.99, '300 TBW'),
        ('8TB', 599.99, '4,800 TBW')
    ]

    idx = 1
    for brand, model, iface, read_s, write_s, form, tier in ssd_defs:
        for cap, base_p, tbw in capacities:
            if len(items) >= 120:
                break
            # Skip 8TB on budget drives
            if cap == '8TB' and ('Budget' in tier or 'Mainstream' in tier or 'SATA' in model):
                continue
            # Adjust price for Gen5
            mult = 1.6 if 'Gen5' in iface or '5.0' in iface else (0.75 if 'SATA' in iface else 1.0)
            p = round(base_p * mult * random.uniform(0.95, 1.1), 2)
            disc = random.choice([0, 0, 5, 10, 15, 20])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} {cap} Internal Solid State Drive"

            items.append(make_prod(
                f'prod-ssd-{idx}',
                title,
                brand, 'ssd', p, orig, disc, random.randint(5, 45),
                random.random() < 0.15, random.random() < 0.15, random.random() < 0.18,
                True, tier, round(random.uniform(4.5, 4.96), 2), random.randint(20, 310),
                f'High-speed internal solid state drive engineered with 3D TLC NAND technology and high-throughput controller to deliver blisteringly fast game load times and file transfers.',
                {
                    'Capacity': cap,
                    'Interface': iface,
                    'Form Factor': form,
                    'Sequential Read': read_s,
                    'Sequential Write': write_s,
                    'Endurance': tbw,
                    'Warranty': '5-Year Manufacturer Warranty'
                },
                f'Requires compatible M.2 slot supporting {iface}. Backward compatible with older revisions.',
                {
                    'Sequential Read Speed': read_s,
                    'Game Boot Time': f'{random.uniform(2.8, 5.5):.1f}s'
                }
            ))
            idx += 1

    while len(items) < 120:
        brand, model, iface, read_s, write_s, form, tier = random.choice(ssd_defs)
        cap, base_p, tbw = random.choice(capacities[:3])
        p = round(base_p * random.uniform(0.9, 1.1), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-ssd-{idx}',
            f'{brand} {model} {cap} NVMe SSD (Retail Box)',
            brand, 'ssd', p, orig, disc, random.randint(6, 30),
            False, False, False, True, tier, round(random.uniform(4.4, 4.9), 2), random.randint(10, 80),
            f'Reliable high-speed internal storage drive.',
            { 'Capacity': cap, 'Interface': iface, 'Read Speed': read_s, 'Warranty': '5-Year Official Warranty' },
            'Standard M.2 2280 compatibility.',
            { 'Transfer Speed': read_s }
        ))
        idx += 1

    return items[:120]


def generate_hdds():
    items = []
    hdd_lines = [
        ('Seagate', 'BarraCuda 3.5" Desktop Hard Drive', 'SATA 6Gb/s', 7200, 'Desktop Computing & Gaming Storage', False),
        ('Seagate', 'IronWolf NAS Internal Hard Drive', 'SATA 6Gb/s', 7200, 'Home & SMB 1-8 Bay NAS', False),
        ('Seagate', 'IronWolf Pro Commercial NAS Drive', 'SATA 6Gb/s', 7200, '24/7 Commercial Enterprise NAS', False),
        ('Seagate', 'SkyHawk Surveillance Internal HDD', 'SATA 6Gb/s', 7200, 'DVR & NVR Security Surveillance', False),
        ('Seagate', 'Exos Enterprise Capacity Server HDD', 'SATA 6Gb/s', 7200, 'Hyperscale Cloud & Big Data', False),
        ('Western Digital', 'WD Blue 3.5" Desktop PC Hard Drive', 'SATA 6Gb/s', 5400, 'Everyday PC Desktop Storage', False),
        ('Western Digital', 'WD Black Performance Hard Drive', 'SATA 6Gb/s', 7200, 'Gaming & Heavy Content Creation', True),
        ('Western Digital', 'WD Red Plus NAS Hard Drive (CMR)', 'SATA 6Gb/s', 5400, 'Reliable NAS Cloud Storage', False),
        ('Western Digital', 'WD Red Pro Commercial NAS Hard Drive', 'SATA 6Gb/s', 7200, 'Multi-bay Enterprise NAS', False),
        ('Western Digital', 'WD Purple Surveillance Hard Drive', 'SATA 6Gb/s', 5400, 'AllFrame 4K Security Surveillance', False),
        ('Western Digital', 'WD Gold Enterprise Class SATA HDD', 'SATA 6Gb/s', 7200, 'Data Center Enterprise Reliability', False),
        ('Toshiba', 'P300 High-Performance Desktop Hard Drive', 'SATA 6Gb/s', 7200, 'Everyday High Performance PC', False),
        ('Toshiba', 'X300 Gaming & Performance Hard Drive', 'SATA 6Gb/s', 7200, 'Gaming Rig Bulk Mass Storage', True),
        ('Toshiba', 'N300 NAS Internal Hard Drive', 'SATA 6Gb/s', 7200, 'Home Server & High Reliability NAS', False),
        ('Toshiba', 'MG Enterprise Capacity 3.5" Hard Drive', 'SATA 6Gb/s', 7200, 'Enterprise Server & Cloud Storage', False)
    ]

    capacities = [
        ('1TB', 49.99, '64MB'),
        ('2TB', 64.99, '256MB'),
        ('4TB', 89.99, '256MB'),
        ('6TB', 129.99, '256MB'),
        ('8TB', 169.99, '256MB'),
        ('10TB', 219.99, '256MB'),
        ('12TB', 259.99, '256MB'),
        ('16TB', 319.99, '512MB'),
        ('18TB', 369.99, '512MB'),
        ('20TB', 429.99, '512MB'),
        ('22TB', 499.99, '512MB'),
        ('24TB', 579.99, '512MB')
    ]

    idx = 1
    for brand, model, iface, rpm, tier, is_game in hdd_lines:
        for cap, base_p, cache in capacities:
            if len(items) >= 90:
                break
            # Skip 1TB on Enterprise lines
            if 'Enterprise' in model and cap in ['1TB', '2TB', '4TB']:
                continue
            # Skip 24TB on basic lines
            if 'Blue' in model and cap in ['16TB', '18TB', '20TB', '22TB', '24TB']:
                continue

            # Price modifier for Pro / Enterprise
            mult = 1.3 if 'Pro' in model or 'Enterprise' in model or 'Gold' in model else 1.0
            price = round(base_p * mult * random.uniform(0.95, 1.08), 2)
            disc = random.choice([0, 0, 5, 8, 10, 15])
            orig = price / (1 - disc/100.0) if disc > 0 else price
            title = f"{brand} {model} {cap} {rpm}RPM {cache} Cache"

            items.append(make_prod(
                f'prod-hdd-{idx}',
                title,
                brand, 'hdd', price, orig, disc, random.randint(4, 35),
                random.random() < 0.12, random.random() < 0.12, random.random() < 0.15,
                is_game, tier, round(random.uniform(4.4, 4.92), 2), random.randint(15, 190),
                f'Engineered with Conventional Magnetic Recording (CMR) technology and vibration dampening sensors for uninterrupted 24/7 continuous read and write operations.',
                {
                    'Capacity': cap,
                    'Rotational Speed': f'{rpm} RPM',
                    'Cache Buffer': cache,
                    'Interface': iface,
                    'Form Factor': '3.5-inch Standard Internal Drive',
                    'Workload Rate': '180TB - 550TB / Year',
                    'MTBF': '1.0 to 2.5 Million Hours',
                    'Warranty': '3 to 5 Years Official Brand Warranty'
                },
                'Requires 3.5" internal drive bay and standard SATA power + SATA data cable connected to motherboard.',
                {
                    'Sequential Transfer': f'{random.randint(190, 285)} MB/s',
                    'Sustained Throughput': 'Continuous 24/7 CMR Rated'
                }
            ))
            idx += 1

    while len(items) < 90:
        brand, model, iface, rpm, tier, is_game = random.choice(hdd_lines)
        cap, base_p, cache = random.choice(capacities[:6])
        p = round(base_p * random.uniform(0.95, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-hdd-{idx}',
            f'{brand} {model} {cap} SATA III Hard Drive',
            brand, 'hdd', p, orig, disc, random.randint(5, 25),
            False, False, False, is_game, tier, round(random.uniform(4.4, 4.88), 2), random.randint(10, 60),
            f'Dependable mass storage drive for backup archiving and bulk game installation.',
            { 'Capacity': cap, 'RPM': f'{rpm} RPM', 'Interface': iface, 'Warranty': '3-Year Warranty' },
            'Standard SATA 3.5" drive bay required.',
            { 'Transfer Speed': '210 MB/s' }
        ))
        idx += 1

    return items[:90]
