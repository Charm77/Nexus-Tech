# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_motherboards():
    items = []
    mb_defs = [
        # (Brand, Model, Socket, Chipset, Form, VRM, Price, Tier)
        ('ASUS', 'ROG MAXIMUS Z790 DARK HERO', 'LGA1700', 'Intel Z790', 'ATX', '20+1+2 Power Stages', 699.99, 'Overclocking Extreme Flagship'),
        ('ASUS', 'ROG MAXIMUS Z790 FORMULA White', 'LGA1700', 'Intel Z790', 'ATX', 'HybridChill Water Cooling Block', 749.99, 'Custom Loop Enthusiast White'),
        ('ASUS', 'ROG STRIX Z790-E GAMING WIFI II', 'LGA1700', 'Intel Z790', 'ATX', '18+1+2 Stages, PCIe 5.0 M.2', 429.99, 'Top-Tier Gamer Choice'),
        ('ASUS', 'TUF GAMING Z790-PLUS WIFI', 'LGA1700', 'Intel Z790', 'ATX', '16+1 DrMOS, Military Grade', 229.99, 'Rock-Solid Durability Value'),
        ('ASUS', 'PROART Z790-CREATOR WIFI', 'LGA1700', 'Intel Z790', 'ATX', 'Dual Thunderbolt 4, 10G LAN', 469.99, 'Professional Creator Studio'),
        ('ASUS', 'ROG STRIX B760-I GAMING WIFI', 'LGA1700', 'Intel B760', 'Mini-ITX', '8+1 Power Stages', 219.99, 'Compact SFF Mini-ITX Monster'),
        ('ASUS', 'PRIME Z790-P WIFI-CSM', 'LGA1700', 'Intel Z790', 'ATX', '14+1 DrMOS Stages', 199.99, 'Affordable Z790 Entry'),
        ('ASUS', 'ROG CROSSHAIR X670E HERO', 'AM5', 'AMD X670E', 'ATX', '18+2+2 Power Stages, USB4', 629.99, 'Zen 4/5 Flagship Enthusiast'),
        ('ASUS', 'ROG STRIX B650E-F GAMING WIFI', 'AM5', 'AMD B650E', 'ATX', '12+2 Power Stages, PCIe 5.0', 269.99, 'Sweetspot AM5 Esports Board'),
        ('ASUS', 'TUF GAMING B650-PLUS WIFI', 'AM5', 'AMD B650', 'ATX', '12+2 DrMOS, 2.5G Ethernet', 199.99, 'Bestselling AM5 Gaming Board'),
        ('MSI', 'MEG Z790 GODLIKE MAX', 'LGA1700', 'Intel Z790', 'E-ATX', '26+2 Power Phases, M-Vision LCD', 1199.99, 'Super-Enthusiast Halo Board'),
        ('MSI', 'MPG Z790 CARBON WIFI', 'LGA1700', 'Intel Z790', 'ATX', '19+1+1 Duet Rail VRM', 369.99, 'Carbon Fiber Stealth Aesthetic'),
        ('MSI', 'MAG Z790 TOMAHAWK MAX WIFI', 'LGA1700', 'Intel Z790', 'ATX', '16+1+1 Mirrored Power, Wi-Fi 7', 249.99, 'Number 1 Value Gaming Motherboard'),
        ('MSI', 'PRO Z790-A MAX WIFI', 'LGA1700', 'Intel Z790', 'ATX', '16+1+1 Phase, Extended Heatsink', 209.99, 'Clean Minimalist All-Rounder'),
        ('MSI', 'MEG X670E ACE', 'AM5', 'AMD X670E', 'E-ATX', '22+2+1 Phases, M.2 Xpander Card', 699.99, 'AM5 High Frequency Titan'),
        ('MSI', 'MAG B650 TOMAHAWK WIFI', 'AM5', 'AMD B650', 'ATX', '14+2+1 Duet Rail, Extended PWM', 199.99, 'Top Selling AMD AM5 Board'),
        ('MSI', 'B650M MORTAR WIFI', 'AM5', 'AMD B650', 'Micro-ATX', '12+2+1 Phase, 2.5G LAN', 179.99, 'Best Micro-ATX AM5 Gaming'),
        ('Gigabyte', 'Z790 AORUS XTREME X', 'LGA1700', 'Intel Z790', 'E-ATX', '24+1+2 Digital VRM, 5-inch Screen', 999.99, 'Extreme Overclocking Halo'),
        ('Gigabyte', 'Z790 AORUS MASTER X', 'LGA1700', 'Intel Z790', 'E-ATX', '20+1+2 Phase, 10GbE LAN', 499.99, 'Heavyweight Enthusiast Aorus'),
        ('Gigabyte', 'Z790 AERO G White Edition', 'LGA1700', 'Intel Z790', 'ATX', 'VisionLINK Type-C, Pure White', 279.99, 'White Aesthetic Creator Choice'),
        ('Gigabyte', 'Z790 AORUS ELITE AX', 'LGA1700', 'Intel Z790', 'ATX', '16+2+1 Twin Digital VRM', 229.99, 'High Performance Value King'),
        ('Gigabyte', 'B760 GAMING X AX', 'LGA1700', 'Intel B760', 'ATX', '8+1+1 Phase Power', 159.99, 'Budget Intel 14th Gen Gaming'),
        ('Gigabyte', 'X670E AORUS MASTER', 'AM5', 'AMD X670E', 'E-ATX', '16+2+2 Phase, Quad M.2 Thermal Guard', 449.99, 'AM5 Enthusiast Overclocking'),
        ('Gigabyte', 'B650 AORUS ELITE AX ICE (White)', 'AM5', 'AMD B650', 'ATX', '12+2+2 Phase, Pure Snow White PCB', 219.99, 'Clean White AM5 Build Hero'),
        ('ASRock', 'Z790 Taichi Carrara', 'LGA1700', 'Intel Z790', 'E-ATX', '24+1+2 Phase, Italian Marble Cover', 479.99, 'Carrara Marble Aesthetic Master'),
        ('ASRock', 'Phantom Gaming Z790 Nova WiFi', 'LGA1700', 'Intel Z790', 'ATX', '20+1+1 SPS VRM, 6x M.2 Slots', 279.99, 'Max M.2 NVMe Storage King'),
        ('ASRock', 'X670E Taichi', 'AM5', 'AMD X670E', 'E-ATX', '24+2+1 Phase, Killer 2.5G + Wi-Fi 6E', 489.99, 'Heavy Duty Cogwheel Design'),
        ('ASRock', 'B650 Steel Legend WiFi', 'AM5', 'AMD B650', 'ATX', '16+2+1 Power Phase, Camo White', 189.99, 'Camo Winter Themed Rig')
    ]

    idx = 1
    for brand, model, socket, chip, form, vrm, base_p, tier in mb_defs:
        for var in ['Retail Box', 'WiFi-7 Edition', 'Special Overclocking Bundle']:
            if len(items) >= 100:
                break
            p = round(base_p * random.uniform(0.95, 1.12), 2)
            disc = random.choice([0, 0, 5, 10, 12, 15])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} ({chip}, {form})"

            items.append(make_prod(
                f'prod-mb-{idx}',
                title,
                brand, 'motherboard', p, orig, disc, random.randint(4, 25),
                random.random() < 0.15, random.random() < 0.15, random.random() < 0.15,
                True, tier, round(random.uniform(4.5, 4.95), 2), random.randint(15, 190),
                f'Engineered with multi-phase digital VRM power delivery, massive thermal heatsinks, PCIe 5.0 graphics slot, and ultra-fast multi-gigabit networking for peak processor sustained frequencies.',
                {
                    'CPU Socket': socket,
                    'Chipset': chip,
                    'Form Factor': form,
                    'Power Delivery VRM': vrm,
                    'Memory Slots': '4x DDR5 DIMM (up to 8000+ MHz OC)',
                    'Expansion Slots': '1x PCIe 5.0 x16, 2x PCIe 4.0 x16',
                    'M.2 Storage Slots': '4x to 5x M.2 NVMe with Shield Frozr / Thermal Guards',
                    'Networking': '2.5G/5G/10G LAN + Wi-Fi 6E / Wi-Fi 7',
                    'Warranty': '3-Year Official Brand Warranty'
                },
                f'Requires {socket} compatible processor and {form} compatible desktop PC case.',
                {
                    'VRM Load Temperature': f'{random.randint(48, 58)}°C Under Cinebench',
                    'Memory OC Headroom': 'DDR5-8000+ Verified Stable'
                }
            ))
            idx += 1

    while len(items) < 100:
        brand, model, socket, chip, form, vrm, base_p, tier = random.choice(mb_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-mb-{idx}',
            f'{brand} {model} (Rev 1.2)',
            brand, 'motherboard', p, orig, disc, random.randint(5, 20),
            False, False, False, True, tier, round(random.uniform(4.4, 4.9), 2), random.randint(10, 60),
            f'Reliable desktop motherboard engineered for smooth daily gaming and workstation tasks.',
            { 'Socket': socket, 'Chipset': chip, 'Form Factor': form, 'Warranty': '3-Year Warranty' },
            f'Standard {socket} CPU required.',
            { 'Stability': '100% Factory Burn-In Tested' }
        ))
        idx += 1

    return items[:100]


def generate_psus():
    items = []
    psu_defs = [
        # (Brand, Model, Wattage, Rating, Standard, Price, Tier)
        ('Corsair', 'RM850x Shift Fully Modular Power Supply (Side Interface)', '850W', '80 PLUS Gold', 'ATX 3.0 / PCIe 5.0', 149.99, 'Side-Mounted Cable Innovation'),
        ('Corsair', 'RM1000x Shift Fully Modular Power Supply', '1000W', '80 PLUS Gold', 'ATX 3.0 / PCIe 5.0', 199.99, 'Ultra-Clean Cable Management 1000W'),
        ('Corsair', 'RM1200x Shift Fully Modular Power Supply', '1200W', '80 PLUS Gold', 'ATX 3.0 / PCIe 5.0', 239.99, 'High-Wattage 4090 Monster'),
        ('Corsair', 'HX1000i Platinum Fully Modular Power Supply', '1000W', '80 PLUS Platinum', 'ATX 3.0, iCUE Digital Control', 249.99, 'Digital DSP Platinum Efficiency'),
        ('Corsair', 'HX1500i Platinum Power Supply', '1500W', '80 PLUS Platinum', 'ATX 3.0, 140mm FDB Fan', 399.99, 'Extreme Multi-GPU Workstation'),
        ('Corsair', 'SF750 Platinum SFX Power Supply', '750W', '80 PLUS Platinum', 'SFX Small Form Factor', 179.99, 'King of Small Form Factor Mini-ITX'),
        ('Corsair', 'RM750e Fully Modular Low-Noise Power Supply', '750W', '80 PLUS Gold', 'ATX 3.0 Ready', 99.99, 'Compact High Value 750W'),
        ('Seasonic', 'PRIME TX-1600 ATX 3.0 Titanium Power Supply', '1600W', '80 PLUS Titanium (94%+)', 'ATX 3.0 & PCIe 5.0 Dual 12VHPWR', 529.99, 'The Undisputed PSU Pinnacle'),
        ('Seasonic', 'PRIME TX-1000 ATX 3.0 Titanium Power Supply', '1000W', '80 PLUS Titanium', 'ATX 3.0 Native 12VHPWR', 349.99, 'Ultra-Low Ripple Titanium Luxury'),
        ('Seasonic', 'FOCUS GX-850 ATX 3.0 Power Supply', '850W', '80 PLUS Gold', 'ATX 3.0 Native', 139.99, 'Bulletproof 10-Year Reliability'),
        ('Seasonic', 'FOCUS GX-1000 ATX 3.0 Power Supply', '1000W', '80 PLUS Gold', 'ATX 3.0 Native', 169.99, 'Gold Standard 1000W Workhorse'),
        ('Seasonic', 'Vertex GX-1200 ATX 3.0 Power Supply', '1200W', '80 PLUS Gold', 'ATX 3.0 Dedicated 16-pin', 229.99, 'Modern Power Spike Resistance'),
        ('be quiet!', 'Dark Power Pro 13 1300W Titanium Power Supply', '1300W', '80 PLUS Titanium', 'ATX 3.0, Overclocking Key', 389.99, 'Silent Acoustic Perfection Titanium'),
        ('be quiet!', 'Dark Power Pro 13 1600W Titanium Power Supply', '1600W', '80 PLUS Titanium', 'ATX 3.0, Frameless Silent Wings Fan', 449.99, 'Supercomputing Silent PSU'),
        ('be quiet!', 'Pure Power 12 M 850W Modular Power Supply', '850W', '80 PLUS Gold', 'ATX 3.0 Native', 129.99, 'Whisper Quiet Operation'),
        ('MSI', 'MEG Ai1300P PCIE5 1300W Platinum Power Supply', '1300W', '80 PLUS Platinum', 'ATX 3.0, Gaming Intelligence USB', 329.99, 'Smart Software Monitored Power'),
        ('MSI', 'MAG A850GL PCIE5 850W Power Supply', '850W', '80 PLUS Gold', 'ATX 3.0 Dual-color 16-pin', 119.99, 'Safe Yellow-Tip 12VHPWR Plug'),
        ('MSI', 'MAG A750GL PCIE5 750W Power Supply', '750W', '80 PLUS Gold', 'ATX 3.0 Native', 99.99, 'Mainstream RTX 4070 Ready'),
        ('ASUS ROG', 'ROG Thor 1200W Platinum II Power Supply', '1200W', '80 PLUS Platinum', 'ATX 3.0, OLED Power Display', 369.99, 'Integrated OLED Wattage Meter'),
        ('ASUS ROG', 'ROG Loki SFX-L 850W Platinum White Edition', '850W', '80 PLUS Platinum', 'SFX-L Form Factor, ARGB Fan', 219.99, 'White Mini-ITX Luxury'),
        ('Thermaltake', 'Toughpower GF3 1200W Gold Power Supply', '1200W', '80 PLUS Gold', 'ATX 3.0 PCIe 5.0', 189.99, 'High Surge Capacity 1200W'),
        ('Cooler Master', 'V850 SFX Gold Full-Modular Power Supply', '850W', '80 PLUS Gold', 'SFX Compact Format', 149.99, 'SFF Desktop Essential')
    ]

    idx = 1
    for brand, model, watts, cert, std, base_p, tier in psu_defs:
        for var in ['Standard Pack', 'White Sleeved Cable Edition', 'Custom Modder Edition', 'Enterprise Bulk Pack']:
            if len(items) >= 90:
                break
            p = round(base_p * random.uniform(0.95, 1.15), 2)
            disc = random.choice([0, 0, 5, 8, 10, 15])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {var}"

            items.append(make_prod(
                f'prod-psu-{idx}',
                title,
                brand, 'psu', p, orig, disc, random.randint(4, 30),
                random.random() < 0.15, random.random() < 0.15, random.random() < 0.15,
                True, tier, round(random.uniform(4.55, 4.97), 2), random.randint(15, 210),
                f'Engineered with 100% Japanese 105°C electrolytic capacitors, zero-RPM silent fan mode, and ATX 3.0 transient power excursion suppression rated up to 200% peak spikes.',
                {
                    'Continuous Wattage': watts,
                    'Efficiency Certification': cert,
                    'Standard & Specifications': std,
                    'Modularity': '100% Fully Modular Flat / Sleeved Cables',
                    'Fan Type': 'Fluid Dynamic Bearing (FDB) with Zero RPM Mode',
                    'Protection Circuits': 'OCP, OVP, UVP, OPP, SCP, OTP',
                    'Dedicated 12VHPWR': 'Yes (Native 16-pin 600W Rated Cable)',
                    'Warranty': '10-Year to 12-Year Official Brand Warranty'
                },
                'Standard ATX power supply mounting holes. Compatible with all modern gaming motherboards and cases.',
                {
                    'Voltage Regulation': 'Strict ±1.0% Load Regulation',
                    'Efficiency Under Load': 'Up to 94.2% Efficiency'
                }
            ))
            idx += 1

    while len(items) < 90:
        brand, model, watts, cert, std, base_p, tier = random.choice(psu_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-psu-{idx}',
            f'{brand} {model} (Eco Version)',
            brand, 'psu', p, orig, disc, random.randint(5, 20),
            False, False, False, True, tier, round(random.uniform(4.45, 4.9), 2), random.randint(10, 60),
            f'High efficiency computer power supply with robust electrical protections.',
            { 'Wattage': watts, 'Certification': cert, 'Modularity': 'Fully Modular', 'Warranty': '10-Year Warranty' },
            'Standard ATX PC chassis compatibility.',
            { 'Ripple Noise': '< 20mV Ultra Low' }
        ))
        idx += 1

    return items[:90]


def generate_cooling():
    items = []
    cool_defs = [
        # (Brand, Model, Type, Radiator/Fan, Price, Tier)
        ('NZXT', 'Kraken Elite 360 RGB LCD Liquid Cooler (Black)', 'AIO Liquid Cooler', '360mm Triple 120mm Fans', 279.99, '2.36" Custom 60Hz LCD Screen'),
        ('NZXT', 'Kraken Elite 360 RGB LCD Liquid Cooler (White)', 'AIO Liquid Cooler', '360mm Triple 120mm Fans', 289.99, 'All-White Panoramic Liquid Master'),
        ('NZXT', 'Kraken 240 RGB Liquid Cooler with Display', 'AIO Liquid Cooler', '240mm Dual 120mm Fans', 179.99, 'Compact LCD Custom Display'),
        ('Arctic', 'Liquid Freezer III 360 A-RGB Liquid Cooler', 'AIO Liquid Cooler', '360mm Radiator, VRM Fan', 139.99, 'Best Thermal Performance Value'),
        ('Arctic', 'Liquid Freezer III 420 A-RGB Monster Liquid Cooler', 'AIO Liquid Cooler', '420mm Triple 140mm Fans', 159.99, 'Giant 420mm Overclocking Titan'),
        ('Corsair', 'iCUE LINK H150i LCD Liquid CPU Cooler', 'AIO Liquid Cooler', '360mm Radiator, Single-Cable LINK', 289.99, 'Single-Cable iCUE LINK Innovation'),
        ('DeepCool', 'LT720 360mm High-Performance Liquid Cooler', 'AIO Liquid Cooler', '360mm Radiator, Multidimensional Mirror', 139.99, 'Infinity Mirror Geometric Pump'),
        ('DeepCool', 'AK620 Digital Dual-Tower CPU Air Cooler', 'Dual-Tower Air Cooler', 'Dual 120mm FDB Fans, Real-time Temp Display', 79.99, 'Digital Temp Display Air Cooler'),
        ('Thermalright', 'Peerless Assassin 120 SE CPU Air Cooler', 'Dual-Tower Air Cooler', '6 Heatpipes, Dual C12C PWM Fans', 39.99, 'Unbeatable Value Air Cooling Champion'),
        ('Thermalright', 'Phantom Spirit 120 EVO Flagship Air Cooler', 'Dual-Tower Air Cooler', '7 Heatpipes, TL-K12 High Speed Fans', 49.99, '7-Heatpipe Air Cooling Titan'),
        ('Noctua', 'NH-D15 G2 Flagship Dual-Tower CPU Cooler', 'Flagship Dual-Tower Air Cooler', 'Dual NF-A14x25 G2 Fans', 149.99, 'The Undisputed King of Air Cooling'),
        ('Noctua', 'NH-U12A chromax.black High Performance Cooler', 'Single-Tower 7-Heatpipe Air Cooler', 'Dual NF-A12x25 Fans', 129.99, 'Stealth Black 140mm Class in 120mm'),
        ('Lian Li', 'O11 Dynamic EVO RGB Panoramic PC Case (Black)', 'Mid-Tower PC Case', 'Dual Chamber, Dual Tempered Glass', 169.99, 'Number 1 Showcase Case in Esports'),
        ('Lian Li', 'O11 Dynamic EVO RGB Panoramic PC Case (White)', 'Mid-Tower PC Case', 'Dual Chamber, Pure Snow White', 179.99, 'White Showcase Rig Icon'),
        ('Lian Li', 'O11 Vision Dual Tempered Glass (No Pillar)', 'Mid-Tower PC Case', '3-Sided Pillarless Tempered Glass', 139.99, 'Zero Pillar Aquarium Vision'),
        ('Fractal Design', 'North XL Charcoal Black with Real Walnut Wood', 'Full Tower PC Case', 'FSC Certified Real Solid Walnut Front', 179.99, 'Scandinavian Architectural Elegance'),
        ('Fractal Design', 'North Chalk White with Real Oak Wood Front', 'Mid-Tower PC Case', 'FSC Certified Solid Oak Wood Front', 139.99, 'Clean Nordic Interior Design Case'),
        ('Fractal Design', 'Torrent High Airflow RGB Full Tower Case', 'Full Tower High Airflow', 'Dual 180mm Front Intake Fans', 229.99, 'World Airflow Benchmark Champion'),
        ('NZXT', 'H9 Flow Dual-Chamber High Airflow PC Case', 'Mid-Tower Dual Chamber', 'Wraparound Glass, Perforated Top', 159.99, 'Ultra-Clean Dual Chamber Airflow'),
        ('NZXT', 'H6 Flow Compact Dual-Chamber Case', 'Compact Dual Chamber', 'Angled Front-Right Fan Intakes', 109.99, 'Compact Dual-Chamber Value Hero'),
        ('Corsair', '5000D AIRFLOW High-Airflow Mid-Tower Case', 'Mid-Tower PC Case', 'High-Airflow Steel Front Panel, RapidRoute', 174.99, 'High-Performance Clean Cable Routing'),
        ('HYTE', 'Y70 Touch Infinite with 4K 60Hz Integrated Touchscreen', 'Corner Glass Showcase Case', '14.1" 4K 60Hz 10-Point Touch Display', 379.99, 'Next-Gen Interactive Digital Battlestation'),
        ('Phanteks', 'NV7 Panoramic Full Tower Showcase Case', 'Full Tower Showcase', 'Outer-Bevel Glass, Integrated ARGB Radiance', 219.99, 'Motherboard Centric Geometric Frame'),
        ('Montech', 'King 95 Pro Curved Glass Panoramic Case', 'Dual Chamber Curved Glass', 'Single Curved Glass Panel, 6x ARGB Fans Included', 149.99, 'Curved Glass Showcase with Fans')
    ]

    idx = 1
    for brand, model, ctype, spec, base_p, tier in cool_defs:
        for var in ['Standard Edition', 'ARGB Performance Pack', 'Silent Fan Edition', 'Deluxe Bundle']:
            if len(items) >= 95:
                break
            p = round(base_p * random.uniform(0.95, 1.15), 2)
            disc = random.choice([0, 0, 5, 10, 15])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} ({var})"

            items.append(make_prod(
                f'prod-cool-{idx}',
                title,
                brand, 'cooling', p, orig, disc, random.randint(4, 28),
                random.random() < 0.15, random.random() < 0.15, random.random() < 0.15,
                True, tier, round(random.uniform(4.55, 4.96), 2), random.randint(15, 230),
                f'Engineered with high thermodynamic dissipation efficiency, acoustic optimized fans, and precision mounting brackets for sub-ambient cooling performance.',
                {
                    'Product Category': ctype,
                    'Cooling / Chassis Spec': spec,
                    'Socket / Form Factor Compatibility': 'Intel LGA1700/1851 & AMD AM4/AM5' if 'Cooler' in ctype else 'E-ATX, ATX, Micro-ATX, Mini-ITX',
                    'Materials': 'Copper Cold Plate + Aluminum Radiator' if 'Liquid' in ctype else ('Aluminum Fins + Copper Heatpipes' if 'Air' in ctype else 'Steel Chassis + Tempered Glass'),
                    'Fan Bearings': 'Fluid Dynamic Bearing (FDB)',
                    'Warranty': '5 to 6 Years Manufacturer Warranty'
                },
                'Universal mounting bracket included. Check PC case radiator clearance or CPU cooler height limit.',
                {
                    'Noise Level at Max Load': f'{random.randint(18, 31)} dBA (Ultra-Silent)',
                    'Thermal Dissipation (TDP)': '280W - 350W Maximum Headroom' if 'Cooler' in ctype else 'Optimized Airflow Velocity'
                }
            ))
            idx += 1

    while len(items) < 95:
        brand, model, ctype, spec, base_p, tier = random.choice(cool_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-cool-{idx}',
            f'{brand} {model} (Performance Pack)',
            brand, 'cooling', p, orig, disc, random.randint(5, 20),
            False, False, False, True, tier, round(random.uniform(4.45, 4.9), 2), random.randint(10, 70),
            f'Thermal hardware cooling component engineered for reliable system temperatures.',
            { 'Type': ctype, 'Specification': spec, 'Warranty': '5-Year Warranty' },
            'Standard ATX chassis / CPU socket mounting.',
            { 'Acoustics': 'Quiet Tuned' }
        ))
        idx += 1

    return items[:95]


def generate_monitors():
    items = []
    mon_defs = [
        # (Brand, Model, Size, Res, Refresh, Panel, Price, Tier)
        ('ASUS ROG', 'Swift OLED PG32UCDM 4K QD-OLED Gaming Monitor', '32"', '4K UHD (3840x2160)', '240 Hz, 0.03ms', '3rd Gen QD-OLED', 1299.99, 'The 4K QD-OLED Gaming Benchmark'),
        ('ASUS ROG', 'Swift OLED PG27AQDM 1440p Esports OLED', '27"', 'QHD (2560x1440)', '240 Hz, 0.03ms', 'OLED Panel with Custom Heatsink', 899.99, 'Pro Esports 1440p King'),
        ('ASUS ROG', 'Swift Pro PG248QP 540Hz Esports Tournament Monitor', '24.1"', 'FHD (1920x1080)', '540 Hz (OC), 0.2ms', 'Esports-TN (E-TN)', 899.99, 'World Fastest 540Hz Tournament'),
        ('ASUS ROG', 'Strix XG27ACS Fast IPS Gaming Monitor', '27"', 'QHD (2560x1440)', '180 Hz, 1ms', 'Fast IPS with USB-C PD', 269.99, 'Best Value 1440p Esports'),
        ('Samsung', 'Odyssey Neo G9 57" Dual 4K UHD Curved Monitor', '57"', 'Dual 4K (7680x2160)', '240 Hz, 1ms 1000R', 'Quantum Mini-LED 2,392 Zones', 2299.99, 'Colossal Dual 4K Battlestation'),
        ('Samsung', 'Odyssey OLED G9 49" Curved Gaming Monitor', '49"', 'Dual QHD (5120x1440)', '240 Hz, 0.03ms 1800R', 'Neo Quantum Processor OLED', 1399.99, 'Ultra-Immersive 32:9 Super Ultrawide'),
        ('Samsung', 'Odyssey OLED G8 34" Ultrawide Gaming Monitor', '34"', 'WQHD (3440x1440)', '175 Hz, 0.03ms 1800R', 'QD-OLED with CoreSync RGB', 999.99, 'Cinematic Ultrawide OLED'),
        ('Samsung', 'Odyssey G7 28" 4K 144Hz Gaming Monitor', '28"', '4K UHD (3840x2160)', '144 Hz, 1ms IPS', 'Fast IPS with HDMI 2.1', 599.99, 'Crisp 4K Console & PC Gaming'),
        ('LG UltraGear', '32GS95UE Dual-Mode 4K 240Hz / FHD 480Hz WOLED', '32"', 'Dual-Mode 4K / FHD', '240 Hz 4K / 480 Hz FHD', 'WOLED with Pixel Sound', 1399.99, 'World First Dual-Mode 480Hz OLED'),
        ('LG UltraGear', '27GR95QE 27" 240Hz OLED Gaming Monitor', '27"', 'QHD (2560x1440)', '240 Hz, 0.03ms', 'OLED with Anti-Glare AGLR', 799.99, 'Competitive 240Hz Sensation'),
        ('LG UltraGear', '27GP850-B Nano IPS 180Hz Monitor', '27"', 'QHD (2560x1440)', '180 Hz (OC), 1ms', 'Nano IPS 1ms DCI-P3 98%', 349.99, 'Color Accurate Gaming Pioneer'),
        ('Alienware', 'AW3423DWF 34" QD-OLED Curved Gaming Monitor', '34"', 'WQHD (3440x1440)', '165 Hz, 0.1ms 1800R', 'Quantum Dot OLED, True Black 400', 899.99, 'Legendary Ultrawide QD-OLED'),
        ('Alienware', 'AW2725DF 27" 360Hz QD-OLED Esports Monitor', '27"', 'QHD (2560x1440)', '360 Hz, 0.03ms', '3rd Gen QD-OLED', 899.99, 'Ultra-Smooth 360Hz QD-OLED Pro'),
        ('Alienware', 'AW2524H 500Hz Fast IPS Esports Gaming Monitor', '24.5"', 'FHD (1920x1080)', '500 Hz (OC), 0.5ms', 'Fast IPS with NVIDIA Reflex', 699.99, 'FPS Esports Pure Reaction Time'),
        ('MSI', 'MPG 271QRX QD-OLED 360Hz Gaming Monitor', '27"', 'QHD (2560x1440)', '360 Hz, 0.03ms', 'QD-OLED with Graphene Heatsink', 799.99, 'Graphene Film Silent Cooled OLED'),
        ('MSI', 'MAG 323UPF 32" 4K 160Hz Rapid IPS Gaming Monitor', '32"', '4K UHD (3840x2160)', '160 Hz, 1ms Rapid IPS', 'Rapid IPS 90W Type-C KVM', 649.99, 'Large Screen 4K Fast Gaming'),
        ('Gigabyte', 'M27Q X 27" 240Hz 1440p Gaming Monitor with KVM', '27"', 'QHD (2560x1440)', '240 Hz, 1ms SS-IPS', 'Super Speed IPS with KVM Switch', 399.99, 'Bestselling KVM Switch Gaming'),
        ('Gigabyte', 'AORUS FO32U2P 4K 240Hz OLED with DisplayPort 2.1', '32"', '4K UHD (3840x2160)', '240 Hz, 0.03ms', 'QD-OLED with Full DP 2.1 UHBR20', 1299.99, 'First Native DP 2.1 4K OLED'),
        ('BenQ ZOWIE', 'XL2566K 360Hz Esports Monitor with DyAc+', '24.5"', 'FHD (1920x1080)', '360 Hz, 0.5ms', 'Fast TN with DyAc+ Motion Blur Reduction', 599.99, 'CS2 & Valorant Pro Major Official'),
        ('BenQ ZOWIE', 'XL2546K 240Hz Esports Gaming Monitor', '24.5"', 'FHD (1920x1080)', '240 Hz, 0.5ms', 'Fast TN with DyAc Tech & S-Switch', 429.99, 'The Esports Pro Gold Standard')
    ]

    idx = 1
    for brand, model, size, res, hz, panel, base_p, tier in mon_defs:
        for var in ['Factory Calibrated', 'With Heavy Duty Ergonomic Arm', 'Zero Dead Pixel Warranty Edition', 'Creator Bundle']:
            if len(items) >= 95:
                break
            p = round(base_p * random.uniform(0.96, 1.15), 2)
            disc = random.choice([0, 0, 5, 8, 10, 15])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {var}"

            items.append(make_prod(
                f'prod-mon-{idx}',
                title,
                brand, 'monitor', p, orig, disc, random.randint(3, 20),
                random.random() < 0.18, random.random() < 0.18, random.random() < 0.18,
                True, tier, round(random.uniform(4.6, 4.98), 2), random.randint(20, 320),
                f'Engineered with state-of-the-art display panel technology, ultra-fast pixel response time, factory color calibration (Delta E < 1.5), and full variable refresh rate certification.',
                {
                    'Screen Size': size,
                    'Resolution': res,
                    'Refresh Rate & Response': hz,
                    'Panel Technology': panel,
                    'Color Gamut Coverage': '99% DCI-P3 / 100% sRGB / 10-bit Color',
                    'VRR Support': 'AMD FreeSync Premium Pro & NVIDIA G-SYNC Compatible',
                    'Video Inputs': '2x HDMI 2.1, 1x/2x DisplayPort 1.4a/2.1, USB-C 90W PD',
                    'Warranty': '3-Year Official Brand Warranty (Including Burn-in Protection for OLED)'
                },
                'VESA 100x100mm mounting compatible. Requires HDMI 2.1 or DisplayPort 1.4+ for maximum refresh rate and resolution.',
                {
                    'Pixel Response Time': '0.03 ms GtG True Instant' if 'OLED' in panel else '1.0 ms Fast GtG',
                    'Contrast Ratio': '1,500,000:1 True Black' if 'OLED' in panel else '1,000:1 Static Contrast'
                }
            ))
            idx += 1

    while len(items) < 95:
        brand, model, size, res, hz, panel, base_p, tier = random.choice(mon_defs)
        p = round(base_p * random.uniform(0.92, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-mon-{idx}',
            f'{brand} {model} (Pro Series)',
            brand, 'monitor', p, orig, disc, random.randint(4, 18),
            False, False, False, True, tier, round(random.uniform(4.5, 4.92), 2), random.randint(12, 80),
            f'High refresh rate gaming monitor with crystal clear panel clarity.',
            { 'Size': size, 'Resolution': res, 'Refresh Rate': hz, 'Panel': panel, 'Warranty': '3-Year Warranty' },
            'Standard VESA 100x100 mounting.',
            { 'Response': 'Ultra Fast GtG' }
        ))
        idx += 1

    return items[:95]


def generate_prebuilts():
    items = []
    rig_defs = [
        # Desktops
        ('NexusTech', 'Apex Liquid Overkill Custom Hardline Rig', 'Ryzen 7 7800X3D + ROG RTX 4090 24GB', '64GB DDR5 6000MHz, 4TB Gen4 NVMe, Dual 360mm Hardline Loop, Lian Li O11 Vision', 4499.99, 'Ultra Enthusiast Custom Loop Sovereign', True),
        ('NexusTech', 'Esports Champion Gaming PC Rig', 'Core i7-14700K + RTX 4070 Ti Super 16GB', '32GB DDR5 6000MHz, 2TB Gen4 SSD, 360mm AIO Cooler, NZXT H9 Flow Case', 2299.99, 'High-FPS 1440p/4K Competitive Rig', True),
        ('NexusTech', 'Creator Studio Workstation Rig', 'Core i9-14900K + RTX 4080 Super 16GB', '128GB DDR5 RAM, 4TB Gen4 SSD + 16TB Enterprise HDD, Fractal North XL Charcoal', 3499.99, '3D Animation, VFX & AI LLM Studio', True),
        ('NexusTech', 'Cyber Valkyrie Pure Snow White Rig', 'Ryzen 7 7700X + RTX 4070 Super 12GB White', '32GB DDR5 6000MHz RGB White, 2TB SSD, Lian Li O11 Dynamic EVO RGB White', 1899.99, 'Aesthetic Pure White Masterpiece', True),
        ('NexusTech', 'Stealth Striker Budget Esports PC', 'Ryzen 5 7600 + RTX 4060 Ti 8GB', '32GB DDR5 5600MHz, 1TB Gen4 SSD, DeepCool AK620, Montech Case', 1199.99, 'Affordable 1080p/1440p Esports King', True),
        ('Corsair', 'ONE i500 Compact Desktop Workstation (Wood Accent)', 'Core i9-14900K + RTX 4090 24GB', '64GB DDR5, 2TB NVMe SSD, Custom Liquid Cooling, FSC Walnut Front', 3999.99, 'Luxury Small-Footprint Supercomputer', True),
        ('Alienware', 'Aurora R16 Gaming Desktop PC', 'Core i9-14900F + RTX 4080 Super 16GB', '32GB DDR5, 2TB NVMe SSD, 240mm Liquid Cooling, Clear Side Panel', 2699.99, 'Sleek Legend 3.0 Aerodynamic Desktop', True),
        ('MSI', 'MEG Trident X2 14th Extreme Gaming Desktop', 'Core i9-14900KF + RTX 4090 24GB', '64GB DDR5, 2TB SSD + 2TB HDD, HMI 2.0 Touchscreen Panel', 4599.99, 'Front Touchscreen Integrated Halo Rig', True),

        # High-End Laptops
        ('ASUS ROG', 'Strix SCAR 18 (2024) Flagship Gaming Laptop', 'Core i9-14900HX + RTX 4090 175W', '64GB DDR5, 2TB + 2TB PCIe 4.0 RAID0, 18" 2.5K 240Hz Mini-LED Nebula HDR', 3899.99, 'Uncompromised 18-Inch Desktop Replacement', True),
        ('ASUS ROG', 'Zephyrus G16 (2024) OLED Gaming Laptop', 'Intel Core Ultra 9 185H + RTX 4090 115W', '32GB LPDDR5X, 2TB SSD, 16" 2.5K 240Hz OLED ROG Nebula, CNC Aluminum 1.85kg', 3299.99, 'Ultra-Thin OLED Gaming Perfection', True),
        ('ASUS ROG', 'Zephyrus G14 (2024) Compact OLED Laptop', 'AMD Ryzen 9 8945HS + RTX 4070', '32GB LPDDR5X, 1TB SSD, 14" 3K 120Hz OLED, Slash Lighting 1.5kg', 2199.99, 'Best Portable 14-Inch Gaming Machine', True),
        ('Lenovo', 'Legion Pro 7i Gen 9 (16" Intel) Gaming Laptop', 'Core i9-14900HX + RTX 4080 175W', '32GB DDR5 5600MHz, 2TB SSD, 16" WQXGA 240Hz PureSight 500 nits', 2699.99, 'Engineered for Esports Dominance', True),
        ('Lenovo', 'Legion 7i Gen 9 Glacier White Gaming Laptop', 'Core i9-14900HX + RTX 4070 140W', '32GB DDR5, 1TB SSD, 16" 3.2K 165Hz IPS, Anodized White Aluminum', 1999.99, 'All-Metal Glacier White Powerhouse', True),
        ('Razer', 'Blade 16 Dual-Mode Mini-LED Gaming Laptop', 'Core i9-14900HX + RTX 4090 175W', '32GB DDR5, 2TB SSD, 16" Dual-Mode Mini-LED (4K 120Hz & FHD 240Hz Native)', 4199.99, 'World First Dual-Mode Display Flagship', True),
        ('Razer', 'Blade 14 Ultra-Portable Gaming Laptop', 'Ryzen 9 8945HS + RTX 4070 140W', '32GB DDR5, 1TB SSD, 14" QHD+ 240Hz, CNC Aluminum Matte Black', 2399.99, 'Ultra-Compact Precision Milled Gaming', True),
        ('MSI', 'Titan 18 HX A14V Titan Flagship Laptop', 'Core i9-14900HX + RTX 4090 175W', '128GB DDR5 RAM (4x32GB), 4TB SSD, 18" 4K 120Hz Mini-LED, Cherry MX Keyboard', 4999.99, 'Extreme Enthusiast Titan Laptop', True),
        ('Alienware', 'm18 R2 Gaming Laptop (18-inch Display)', 'Core i9-14900HX + RTX 4090 175W', '64GB DDR5, 4TB SSD, 18" QHD+ 165Hz, Element 31 Cryo-Tech Cooling', 3699.99, 'Heavyweight Cryo-Tech Gaming Titan', True)
    ]

    idx = 1
    for brand, model, core_spec, full_spec, base_p, tier, is_game in rig_defs:
        for var in ['Pro Config', 'Performance Overclocked', 'Creator Edition', 'Deluxe Bundle with Peripherals', 'VIP Warranty Pack']:
            if len(items) >= 80:
                break
            p = round(base_p * random.uniform(0.96, 1.12), 2)
            disc = random.choice([0, 0, 5, 8, 10])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {var}"

            items.append(make_prod(
                f'prod-prebuilt-{idx}',
                title,
                brand, 'prebuilt', p, orig, disc, random.randint(2, 12),
                random.random() < 0.22, random.random() < 0.22, random.random() < 0.22,
                is_game, tier, round(random.uniform(4.65, 4.98), 2), random.randint(15, 180),
                f'Fully assembled, stress-tested, and plug-and-play ready. Built with premium genuine branded components, clean cable management, factory tuned fan curves, and Windows 11 Pro pre-installed.',
                {
                    'Core Processor & GPU': core_spec,
                    'System Configuration': full_spec,
                    'Operating System': 'Windows 11 Pro 64-bit Genuine Activated',
                    'Quality Assurance': '72-Hour Stress Test & Thermal Thermal-Image Passed',
                    'Assembly': 'Professional Clean Cable Routing & Zip Sleeving',
                    'Warranty & Support': '3-Year NexusTech Comprehensive On-Site Warranty'
                },
                'Plug and play ready straight out of the box with all driver updates and BIOS optimizations applied.',
                {
                    'Cyberpunk 2077 (4K Ultra Ray Tracing)': f'{random.randint(95, 140)} FPS' if '4090' in core_spec else f'{random.randint(65, 95)} FPS',
                    'Counter-Strike 2 (1440p Esports)': f'{random.randint(380, 620)} FPS',
                    'Cinebench R23 Score': f'{random.randint(28000, 42000)} pts'
                }
            ))
            idx += 1

    while len(items) < 80:
        brand, model, core_spec, full_spec, base_p, tier, is_game = random.choice(rig_defs)
        p = round(base_p * random.uniform(0.92, 1.05), 2)
        disc = random.choice([0, 5, 8])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-prebuilt-{idx}',
            f'{brand} {model} (Custom Special Edition)',
            brand, 'prebuilt', p, orig, disc, random.randint(2, 10),
            False, False, False, is_game, tier, round(random.uniform(4.55, 4.95), 2), random.randint(10, 60),
            f'Certified high performance desktop / laptop system fully tested for stability.',
            { 'Specs': core_spec, 'Details': full_spec, 'OS': 'Windows 11 Pro', 'Warranty': '3-Year Warranty' },
            'Comes ready with plug and play installation.',
            { 'Performance': 'Enthusiast Certified' }
        ))
        idx += 1

    return items[:80]
