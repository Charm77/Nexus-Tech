# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_gpus():
    items = []
    # Anchor product
    items.append(make_prod(
        'prod-gpu-4090',
        'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X',
        'ASUS', 'gpu', 1999.99, 2199.99, 9, 6, True, False, True, True, 'Enthusiast 4K Ultra', 4.9, 48,
        'The definitive powerhouse GPU engineered for ultra-enthusiast gamers and content creators. Powered by Ada Lovelace architecture, DLSS 3 frame generation, and 3.5-slot axial-tech cooling with vapor chamber.',
        { 'Cuda Cores': '16,384', 'Boost Clock': '2640 MHz (OC Mode)', 'Memory': '24GB GDDR6X', 'Memory Bus': '384-bit', 'Recommended PSU': '1000W', 'Power Connectors': '1x 16-pin (12VHPWR)', 'Slots': '3.5 Slot', 'Warranty': '3-Year Official Global Warranty' },
        'Requires case clearance of at least 358mm and ATX 3.0 compatible 1000W+ PSU with dedicated 12VHPWR cable.',
        { 'Cyberpunk 2077 (4K Ray Tracing DLSS 3)': '125 FPS', 'Black Myth: Wukong (4K Cinematic)': '98 FPS', 'Valorant (1440p High)': '580 FPS', 'Call of Duty: Warzone (4K Ultra)': '168 FPS' }
    ))

    chipsets = [
        # NVIDIA
        ('GeForce RTX 4090', '24GB GDDR6X', 1849.99, 'Ada Lovelace', '16384', '384-bit', '1000W', 'Enthusiast 4K Ultra'),
        ('GeForce RTX 4080 Super', '16GB GDDR6X', 999.99, 'Ada Lovelace', '10240', '256-bit', '750W', 'Premium 4K Ultra'),
        ('GeForce RTX 4080', '16GB GDDR6X', 949.99, 'Ada Lovelace', '9728', '256-bit', '750W', 'High-End 4K Gaming'),
        ('GeForce RTX 4070 Ti Super', '16GB GDDR6X', 799.99, 'Ada Lovelace', '8448', '256-bit', '700W', '1440p / 4K Esports Sweetspot'),
        ('GeForce RTX 4070 Ti', '12GB GDDR6X', 729.99, 'Ada Lovelace', '7680', '192-bit', '700W', 'High FPS 1440p Ultra'),
        ('GeForce RTX 4070 Super', '12GB GDDR6X', 599.99, 'Ada Lovelace', '7168', '192-bit', '650W', 'Number 1 1440p Value'),
        ('GeForce RTX 4070', '12GB GDDR6X', 529.99, 'Ada Lovelace', '5888', '192-bit', '650W', 'High-Efficiency 1440p'),
        ('GeForce RTX 4060 Ti 16GB', '16GB GDDR6', 449.99, 'Ada Lovelace', '4352', '128-bit', '550W', 'AI & 1080p High VRAM'),
        ('GeForce RTX 4060 Ti 8GB', '8GB GDDR6', 379.99, 'Ada Lovelace', '4352', '128-bit', '550W', 'Esports 1080p High FPS'),
        ('GeForce RTX 4060', '8GB GDDR6', 299.99, 'Ada Lovelace', '3072', '128-bit', '500W', 'Budget Ada Lovelace'),
        ('GeForce RTX 3060', '12GB GDDR6', 269.99, 'Ampere', '3584', '192-bit', '550W', 'Budget 12GB Champion'),
        ('GeForce RTX 3050', '8GB GDDR6', 199.99, 'Ampere', '2560', '128-bit', '450W', 'Entry Level Ray Tracing'),

        # AMD Radeon
        ('Radeon RX 7900 XTX', '24GB GDDR6', 929.99, 'RDNA 3', '6144', '384-bit', '800W', 'Flagship 4K Rasterization Monster'),
        ('Radeon RX 7900 XT', '20GB GDDR6', 699.99, 'RDNA 3', '5376', '320-bit', '750W', 'Heavy VRAM 4K Contender'),
        ('Radeon RX 7900 GRE', '16GB GDDR6', 539.99, 'RDNA 3', '5120', '256-bit', '700W', 'Golden Rabbit Edition 1440p'),
        ('Radeon RX 7800 XT', '16GB GDDR6', 489.99, 'RDNA 3', '3840', '256-bit', '700W', 'Undisputed 1440p Leader'),
        ('Radeon RX 7700 XT', '12GB GDDR6', 399.99, 'RDNA 3', '3456', '192-bit', '700W', 'Fast 1440p Midrange'),
        ('Radeon RX 7600 XT', '16GB GDDR6', 329.99, 'RDNA 3', '2048', '128-bit', '600W', 'High VRAM 1080p Esports'),
        ('Radeon RX 7600', '8GB GDDR6', 259.99, 'RDNA 3', '2048', '128-bit', '550W', 'Budget 1080p Value King'),
        ('Radeon RX 6750 XT', '12GB GDDR6', 319.99, 'RDNA 2', '2560', '192-bit', '650W', 'Last-Gen High Performance Value'),

        # Intel Arc
        ('Arc A770 Phantom Gaming', '16GB GDDR6', 289.99, 'Alchemist', '4096', '256-bit', '600W', 'XeSS & AV1 Creative Workhorse'),
        ('Arc A750 Challenger', '8GB GDDR6', 209.99, 'Alchemist', '3584', '256-bit', '550W', 'Budget 1080p Contender'),
        ('Arc A580', '8GB GDDR6', 169.99, 'Alchemist', '3072', '256-bit', '500W', 'Entry Level High-Bandwidth')
    ]

    partners = [
        ('ASUS', ['ROG Strix OC', 'TUF Gaming OC', 'Dual OC', 'ProArt OC', 'White Edition']),
        ('MSI', ['Suprim X', 'Gaming X Trio', 'Gaming X Slim', 'Ventus 3X OC', 'Ventus 2X Black']),
        ('Gigabyte', ['AORUS Master', 'Gaming OC', 'Aero OC White', 'Eagle OC', 'Windforce OC']),
        ('ZOTAC', ['AMP Extreme AIRO', 'Trinity OC Black', 'Trinity OC White', 'Twin Edge OC']),
        ('Sapphire', ['NITRO+ Vapor-X', 'PURE White', 'PULSE Gaming']),
        ('PowerColor', ['Red Devil Limited', 'Hellhound Spectral White', 'Fighter Gaming']),
        ('XFX', ['Speedster MERC 310', 'Speedster QICK 319', 'Speedster SWFT 210']),
        ('PNY', ['XLR8 Gaming VERTO EPIC-X RGB', 'Verto Dual Fan']),
        ('Palit', ['GameRock Midnight Kaleidoscope', 'JetStream OC'])
    ]

    idx = 1
    for brand, editions in partners:
        for chip in chipsets:
            if len(items) >= 130:
                break
            name, vram, base_p, arch, stream, bus, psu, tier = chip
            
            # Skip AMD chips on NVIDIA-only AIBs and vice versa
            is_amd_chip = 'Radeon' in name
            is_intel_chip = 'Arc' in name
            if is_amd_chip and brand in ['ZOTAC', 'PNY', 'Palit']:
                continue
            if not is_amd_chip and brand in ['Sapphire', 'PowerColor', 'XFX']:
                continue
            if is_intel_chip and brand not in ['ASRock', 'Sparkle', 'Intel', 'Acer', 'MSI', 'Gigabyte', 'ASUS']:
                continue

            ed = random.choice(editions)
            price = round(base_p * random.uniform(0.98, 1.15), 2)
            disc = random.choice([0, 0, 5, 8, 10, 12, 15])
            orig = price / (1 - disc/100.0) if disc > 0 else price
            full_title = f"{brand} {name} {ed} {vram}"

            items.append(make_prod(
                f'prod-gpu-{idx}',
                full_title,
                brand, 'gpu', price, orig, disc, random.randint(3, 28),
                random.random() < 0.18, random.random() < 0.18, random.random() < 0.18,
                True, tier, round(random.uniform(4.55, 4.97), 2), random.randint(12, 280),
                f'Engineered with advanced {arch} architecture, high-efficiency vapor chamber cooling, and multi-fan thermal layout for silent acoustic performance under heavy gaming and rendering loads.',
                {
                    'GPU Engine': name,
                    'VRAM Memory': vram,
                    'Memory Bus': bus,
                    'Architecture': arch,
                    'Compute Units / Shaders': stream,
                    'Recommended PSU': psu,
                    'Display Outputs': '3x DisplayPort 1.4a/2.1, 1x HDMI 2.1a',
                    'Warranty': '3-Year Official Brand Warranty'
                },
                f'Requires PC case with minimum clearance for {ed} form factor and PSU rated for {psu} with dedicated PCIe cables.',
                {
                    'Cyberpunk 2077 (1440p Ultra)': f'{random.randint(75, 185)} FPS',
                    'Counter-Strike 2 (1440p)': f'{random.randint(280, 560)} FPS',
                    'FurMark Stress Thermals': f'{random.randint(58, 68)}°C Under Load'
                }
            ))
            idx += 1

    # Ensure exactly 130
    while len(items) < 130:
        chip = random.choice(chipsets)
        brand, editions = random.choice(partners)
        name, vram, base_p, arch, stream, bus, psu, tier = chip
        ed = random.choice(editions)
        p = round(base_p * random.uniform(0.95, 1.1), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-gpu-{idx}',
            f'{brand} {name} {ed} {vram} (Edition V2)',
            brand, 'gpu', p, orig, disc, random.randint(4, 20),
            False, False, False, True, tier, round(random.uniform(4.5, 4.9), 2), random.randint(10, 85),
            f'Reliable high-fps graphics card with factory overclock profile and dual-bios switch.',
            { 'GPU': name, 'VRAM': vram, 'Architecture': arch, 'Recommended PSU': psu, 'Warranty': '3-Year Warranty' },
            f'Standard PCIe 4.0 x16 slot required.',
            { '1440p Ultra Gaming': f'{random.randint(90, 160)} FPS' }
        ))
        idx += 1

    return items[:130]
