# -*- coding: utf-8 -*-
import random
from .common import make_prod

def generate_keyboards():
    items = []
    kb_defs = [
        # (Brand, Model, Switch, Form, Connectivity, Price, Tier)
        ('Razer', 'BlackWidow V4 Pro Mechanical Gaming Keyboard', 'Razer Green Clicky', 'Full Size 100%', 'Wired USB-C + 8K Polling', 229.99, 'Battlestation Command Center'),
        ('Razer', 'BlackWidow V4 75% Hot-Swappable', 'Razer Orange Tactile', '75% Compact', 'Wired USB-C', 189.99, 'Modder Enthusiast Custom'),
        ('Razer', 'Huntsman V3 Pro Analog Esports Keyboard', 'Gen-2 Analog Optical (Rapid Trigger)', 'Full Size 100%', 'Wired Detachable', 249.99, 'Esports Rapid Trigger Pro'),
        ('Razer', 'Huntsman V3 Pro TKL Esports Keyboard', 'Gen-2 Analog Optical', 'Tenkeyless TKL', 'Wired Detachable', 219.99, 'Competitive FPS Tournament'),
        ('Razer', 'Huntsman Mini 60% Optical Gaming Keyboard', 'Razer Linear Optical Red', '60% Ultra-Compact', 'Wired USB-C', 119.99, 'Ultra-Portable FPS King'),
        ('Razer', 'DeathStalker V2 Pro Wireless Low Profile', 'Low Profile Linear Optical', 'Full Size 100%', 'HyperSpeed Wireless + BT', 219.99, 'Ergonomic Low Profile Wireless'),
        ('Logitech', 'G915 LIGHTSPEED Wireless RGB Mechanical', 'GL Tactile Low Profile', 'Full Size 100%', 'LIGHTSPEED Wireless + BT', 229.99, 'Ultra-Thin Aircraft Aluminum'),
        ('Logitech', 'G915 X LIGHTSPEED Low Profile Keyboard', 'GL Linear Low Profile', 'Full Size 100%', 'LIGHTSPEED Wireless + BT', 239.99, 'Next-Gen Ultra-Slim Gamer'),
        ('Logitech', 'G PRO X TKL LIGHTSPEED Gaming Keyboard', 'GX Brown Tactile', 'Tenkeyless TKL', 'LIGHTSPEED Wireless + BT', 199.99, 'Tournament Pro Esports Spec'),
        ('Logitech', 'G513 Carbon RGB Mechanical Gaming Keyboard', 'GX Blue Clicky', 'Full Size 100%', 'Wired USB Passthrough', 139.99, 'Aircraft Grade 5052 Alloy'),
        ('Logitech', 'MX Mechanical Wireless Illuminated Keyboard', 'Tactile Quiet Switches', 'Full Size 100%', 'Bluetooth + Logi Bolt', 169.99, 'Productivity Master Mechanical'),
        ('Corsair', 'K100 RGB Optical-Mechanical Gaming Keyboard', 'Corsair OPX Optical 1.0mm', 'Full Size 100%', 'Wired USB with iCUE Wheel', 229.99, 'Flagship RGB Powerhouse'),
        ('Corsair', 'K70 MAX RGB Magnetic-Mechanical Keyboard', 'CORSAIR MGX Magnetic Adjustable', 'Full Size 100%', 'Wired 8000Hz Polling', 229.99, 'Rapid Trigger Magnetic Linear'),
        ('Corsair', 'K70 RGB PRO Mechanical Gaming Keyboard', 'CHERRY MX Red Linear', 'Full Size 100%', 'Wired Detachable Braided', 169.99, 'Tournament Ready Precision'),
        ('Corsair', 'K65 PLUS WIRELESS 75% RGB Mechanical', 'CORSAIR MLX Red Pre-Lubed', '75% Custom Layout', '2.4GHz Wireless + BT', 159.99, 'Acoustic Dampened 75% Custom'),
        ('Keychron', 'Q1 Pro QMK/VIA Wireless Custom Keyboard', 'Keychron K Pro Banana Tactile', '75% Layout', 'Bluetooth 5.1 + Type-C', 199.99, 'Full CNC Aluminum Gasket Mount'),
        ('Keychron', 'Q3 Max Full Metal Wireless Custom TKL', 'Gateron Jupiter Red', 'Tenkeyless TKL', '2.4GHz + Bluetooth', 219.99, 'Acoustic Foam Acoustic Master'),
        ('Keychron', 'Q6 Pro Full Size QMK/VIA Custom Keyboard', 'Keychron K Pro Brown', 'Full Size 100%', 'Bluetooth 5.1 + Type-C', 219.99, 'Full Size Solid Metal Artisan'),
        ('Keychron', 'V1 QMK Custom Mechanical Keyboard with Knob', 'Keychron K Pro Red', '75% Layout with Knob', 'Wired Type-C', 89.99, 'Entry Level Gasket Perfection'),
        ('Keychron', 'K2 Pro QMK/VIA Wireless Mechanical Keyboard', 'Keychron K Pro Red Linear', '75% Compact', 'Bluetooth + Type-C', 109.99, 'Mac & Windows Wireless Pro'),
        ('SteelSeries', 'Apex Pro Gen 3 OmniPoint 3.0 Keyboard', 'OmniPoint 3.0 Adjustable HyperMagnetic', 'Full Size 100%', 'Wired USB with OLED Smart Display', 239.99, '0.1mm Rapid Trigger Hall Effect'),
        ('SteelSeries', 'Apex Pro TKL Wireless (2024)', 'OmniPoint 2.0 Adjustable', 'Tenkeyless TKL', 'Quantum 2.0 Dual Wireless', 249.99, 'Esports Hall Effect Wireless'),
        ('SteelSeries', 'Apex 7 Mechanical Gaming Keyboard with OLED', 'SteelSeries QX2 Red Linear', 'Full Size 100%', 'Wired Aircraft Grade Alloy', 159.99, 'Integrated OLED Smart Display'),
        ('Asus ROG', 'ROG Azoth 75% Wireless Custom Mechanical', 'ROG NX Snow Pre-Lubed', '75% Gasket Mount', 'ROG SpeedNova 2.4G + BT', 249.99, 'OLED Display & 3-Way Knob'),
        ('Asus ROG', 'ROG Strix Scope II 96 Wireless Keyboard', 'ROG NX Snow Linear', '96% Efficient Layout', '2.4GHz + Bluetooth', 179.99, 'Sound-Dampening Silicone Foam'),
        ('Wooting', 'Wooting 60HE+ Hall Effect Analog Keyboard', 'Lekker Linear60 Hall Effect', '60% Ultra-Compact', 'Wired USB-C', 179.99, 'World Pioneer Analog Rapid Trigger'),
        ('Ducky', 'One 3 RGB Mechanical Gaming Keyboard', 'Cherry MX Speed Silver', 'Full Size 100%', 'Wired Detachable Type-C', 139.99, 'Quack Mechanics Acoustic Tuning'),
        ('Ducky', 'One 3 Mini 60% RGB Mechanical Keyboard', 'Cherry MX Red Linear', '60% Compact', 'Wired Type-C', 119.99, 'Double-Shot PBT Legend'),
        ('Akko', 'MOD007B-PC Multi-Modes Wireless Keyboard', 'Akko Piano Pro Switches', '75% Layout', '2.4G + Bluetooth + Wired', 129.99, 'Polycarbonate Gasket Sound'),
        ('Epomaker', 'RT100 Retro Mechanical Keyboard with Mini TV', 'Sea Salt Silent Switches', '97-Key Compact Full', '2.4G + Bluetooth + Type-C', 109.99, 'Retro Aesthetic with Smart LCD')
    ]

    idx = 1
    for brand, model, switch, form, conn, base_p, tier in kb_defs:
        for var in ['Standard Edition', 'White Edition', 'Sound-Dampened Edition', 'Pro Bundle with Wrist Rest']:
            if len(items) >= 120:
                break
            p = round(base_p * random.uniform(0.95, 1.15), 2)
            disc = random.choice([0, 0, 5, 10, 15, 20])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {var}"

            items.append(make_prod(
                f'prod-kb-{idx}',
                title,
                brand, 'keyboard', p, orig, disc, random.randint(4, 35),
                random.random() < 0.16, random.random() < 0.16, random.random() < 0.18,
                True, tier, round(random.uniform(4.55, 4.97), 2), random.randint(20, 310),
                f'Engineered with premium mechanical switch architecture, multi-layer sound absorbing foam, per-key RGB backlighting, and ultra-durable PBT double-shot keycaps.',
                {
                    'Switch Mechanism': switch,
                    'Form Factor Layout': form,
                    'Connectivity': conn,
                    'Keycaps': 'Double-shot PBT Keycaps (Anti-shine)',
                    'Polling Rate': '1,000 Hz to 8,000 Hz Hyper-Polling',
                    'Hot-Swappable': 'Yes (3-pin and 5-pin MX compatible)',
                    'Backlighting': 'Per-Key Dynamic RGB with onboard memory',
                    'Warranty': '2-Year Official Brand Warranty'
                },
                'Plug and play USB connection. Compatible with Windows 10/11, macOS, and Linux.',
                {
                    'Actuation Response': '0.1 ms - 1.0 ms Ultra-Low Latency',
                    'Switch Durability': '100 Million Keystroke Rating'
                }
            ))
            idx += 1

    while len(items) < 120:
        brand, model, switch, form, conn, base_p, tier = random.choice(kb_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-kb-{idx}',
            f'{brand} {model} (Tournament Edition)',
            brand, 'keyboard', p, orig, disc, random.randint(5, 25),
            False, False, False, True, tier, round(random.uniform(4.45, 4.9), 2), random.randint(10, 75),
            f'Pro esports mechanical keyboard designed for responsive tournament play.',
            { 'Switches': switch, 'Layout': form, 'Connection': conn, 'Warranty': '2-Year Warranty' },
            'Standard USB / Bluetooth connection.',
            { 'Latency': '1 ms' }
        ))
        idx += 1

    return items[:120]


def generate_mice():
    items = []
    mouse_defs = [
        # (Brand, Model, Weight, Sensor, DPI, Polling, Price, Tier)
        ('Logitech', 'G PRO X SUPERLIGHT 2 Wireless Gaming Mouse', '60g', 'HERO 2', '44,000 DPI', '8,000 Hz', 159.99, 'Esports Number 1 Competitive'),
        ('Logitech', 'G502 X PLUS LIGHTSPEED Wireless RGB Mouse', '106g', 'HERO 25K', '25,600 DPI', '1,000 Hz', 149.99, 'Ergonomic Macro Battlestation'),
        ('Logitech', 'G502 HERO High Performance Gaming Mouse', '121g', 'HERO 25K', '25,600 DPI', '1,000 Hz', 49.99, 'Legendary Bestselling Classic'),
        ('Logitech', 'G305 LIGHTSPEED Wireless Gaming Mouse', '99g', 'HERO 12K', '12,000 DPI', '1,000 Hz', 39.99, 'Best Value Wireless Champion'),
        ('Logitech', 'MX Master 3S Advanced Wireless Performance Mouse', '141g', 'Darkfield 8K', '8,000 DPI', '1,000 Hz', 99.99, 'Ultimate Productivity Master'),
        ('Razer', 'DeathAdder V3 Pro Wireless Ergonomic Mouse', '63g', 'Focus Pro 30K', '30,000 DPI', '8,000 Hz Compatible', 149.99, 'Ergonomic Esports Icon'),
        ('Razer', 'Viper V3 Pro Ultra-Lightweight Wireless Mouse', '54g', 'Focus Pro 35K Gen-2', '35,000 DPI', 'True 8,000 Hz Wireless', 159.99, 'World Champion Symmetrical FPS'),
        ('Razer', 'Basilisk V3 Pro Wireless Ergonomic Mouse', '112g', 'Focus Pro 30K', '30,000 DPI', '1,000 Hz', 159.99, 'Full Spectrum RGB Gaming'),
        ('Razer', 'Cobra Pro Wireless RGB Compact Gaming Mouse', '77g', 'Focus Pro 30K', '30,000 DPI', '1,000 Hz', 129.99, '11-Zone Underglow Symmetrical'),
        ('Razer', 'Naga V2 Pro Modular Wireless MMO Gaming Mouse', '134g', 'Focus Pro 30K', '30,000 DPI', '1,000 Hz', 179.99, 'Hot-Swap 3-Side Plates MMO'),
        ('SteelSeries', 'Aerox 3 Wireless Superlight Gaming Mouse', '68g', 'TrueMove Air', '18,000 DPI', '1,000 Hz', 99.99, 'Ultra-Light Honeycomb IP54'),
        ('SteelSeries', 'Aerox 5 Wireless Multi-Genre Gaming Mouse', '74g', 'TrueMove Air', '18,000 DPI', '1,000 Hz', 139.99, '9-Button Lightweight Multi-Genre'),
        ('SteelSeries', 'Rival 3 Wireless Dual-Mode Gaming Mouse', '96g', 'TrueMove Core', '8,500 DPI', '1,000 Hz', 49.99, '400+ Hour Long Battery Budget'),
        ('Asus ROG', 'ROG Harpe Ace Aim Lab Edition Wireless Mouse', '54g', 'ROG AimPoint 36K', '36,000 DPI', 'SpeedNova 2.4GHz', 149.99, 'Aim Lab Certified Pro Esports'),
        ('Asus ROG', 'ROG Gladius III Wireless AimPoint Gaming Mouse', '79g', 'ROG AimPoint 36K', '36,000 DPI', 'Push-Fit Switch Sockets', 119.99, 'Hot-Swappable Switch Modding'),
        ('Glorious', 'Model O 2 Wireless Gaming Mouse', '68g', 'BAMF 2.0 26K', '26,000 DPI', '1,000 Hz', 99.99, 'Honeycomb Symmetrical Speedster'),
        ('Glorious', 'Model D 2 PRO 8KHz Wireless Esports Mouse', '60g', 'BAMF 2.0 26K', '26,000 DPI', '8,000 Hz Polling', 129.99, '8K Polling Ergonomic Grip'),
        ('BenQ ZOWIE', 'EC2-CW Wireless Esports Gaming Mouse', '77g', '3370 Sensor', '3,200 DPI', 'Enhanced Receiver Anti-Interfere', 149.99, 'Gold Standard CS2/Valorant Shape'),
        ('BenQ ZOWIE', 'U2 Wireless Esports Mouse for Claw Grippers', '60g', '3395 Sensor', '3,200 DPI', 'Inward Curved Sides', 149.99, 'Claw Grip Optimized Agility'),
        ('Pulsar', 'X2V2 Mini Wireless Gaming Mouse', '51g', 'PixArt PAW3395', '26,000 DPI', '4K Polling Compatible', 99.99, 'Ultra-Crisp Optical Switch Symmetrical'),
        ('Pulsar', 'Xlite V3 eS Wireless Gaming Mouse (OLED Base)', '65g', 'PixArt PAW3395', '26,000 DPI', '4,000 Hz Wireless', 129.99, 'OLED Display On-Board Config'),
        ('Finalmouse', 'UltralightX Carbon Composite Wireless Mouse', '29g', 'Finalsensor', '26,000 DPI', '8,000 Hz Polling', 189.99, 'World Lightest Carbon Fiber'),
        ('Lamzu', 'Atlantis OG V2 4K Wireless Gaming Mouse', '55g', 'PixArt PAW3395', '26,000 DPI', '4,000 Hz Polling', 119.99, 'Claw Grip Masterpiece'),
        ('Corsair', 'Dark Core RGB Pro SE Wireless Qi Charging', '133g', 'Custom PixArt 3392', '18,000 DPI', 'SLIPSTREAM Wireless', 89.99, 'Qi-Wireless Charging Comfort'),
        ('Corsair', 'Scimitar RGB Elite MMO Optical Gaming Mouse', '122g', 'Custom 18,000 DPI', '18,000 DPI', '17 Programmable Buttons', 79.99, 'Key Slider MMO Macro Dominator')
    ]

    colorways = ['Midnight Black', 'Glacier White', 'Neon Cyan', 'Magenta Pink', 'Esports Yellow']

    idx = 1
    for brand, model, weight, sensor, dpi, poll, base_p, tier in mouse_defs:
        for col in colorways[:4]:
            if len(items) >= 110:
                break
            p = round(base_p * random.uniform(0.95, 1.1), 2)
            disc = random.choice([0, 0, 5, 10, 15, 20])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {col}"

            items.append(make_prod(
                f'prod-mouse-{idx}',
                title,
                brand, 'mouse', p, orig, disc, random.randint(5, 40),
                random.random() < 0.16, random.random() < 0.16, random.random() < 0.18,
                True, tier, round(random.uniform(4.55, 4.98), 2), random.randint(25, 340),
                f'Engineered for competitive esports precision, featuring ultra-low latency wireless technology, flawless optical tracking sensor, and pure PTFE glide mouse skates.',
                {
                    'Sensor': sensor,
                    'Max Sensitivity': dpi,
                    'Weight': weight,
                    'Polling Rate': poll,
                    'Switch Type': 'Optical-Mechanical Hybrid Switches (Zero Double-click)',
                    'Battery Life': 'Up to 95 Hours Continuous Gaming',
                    'Skates': '100% Virgin Grade PTFE Feet',
                    'Warranty': '2-Year Official Brand Warranty'
                },
                'Compatible with PC (Windows 10/11), Mac, and Linux via USB receiver or Bluetooth.',
                {
                    'Click Latency': '0.2 ms Optical Response',
                    'Tracking Speed (IPS)': '750 IPS at 50G Acceleration'
                }
            ))
            idx += 1

    while len(items) < 110:
        brand, model, weight, sensor, dpi, poll, base_p, tier = random.choice(mouse_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-mouse-{idx}',
            f'{brand} {model} (Pro Grip Edition)',
            brand, 'mouse', p, orig, disc, random.randint(6, 25),
            False, False, False, True, tier, round(random.uniform(4.5, 4.9), 2), random.randint(15, 80),
            f'Competitive gaming mouse with textured grip surfaces and balanced sensor position.',
            { 'Sensor': sensor, 'DPI': dpi, 'Weight': weight, 'Warranty': '2-Year Warranty' },
            'Standard USB receiver plug and play.',
            { 'Latency': '0.5 ms' }
        ))
        idx += 1

    return items[:110]


def generate_audio():
    items = []
    audio_defs = [
        # (Brand, Model, Wattage, Playtime, Features, Price, Tier)
        ('JBL', 'Flip 6 Portable Waterproof Bluetooth Speaker', '30W RMS', '12 Hours', 'IP67 Waterproof, PartyBoost, Dual Passives', 129.99, 'Portable Music Box Champion'),
        ('JBL', 'Charge 5 Portable Bluetooth Speaker with Powerbank', '40W RMS', '20 Hours', 'IP67 Waterproof, Built-in USB Powerbank', 179.99, 'Heavy Bass Outdoor Powerhouse'),
        ('JBL', 'Xtreme 4 Portable Bluetooth Powerhouse Speaker', '100W RMS', '24 Hours', 'AI Sound Boost, Replaceable Battery, IP67', 379.99, 'Mega Bass Portable Concert'),
        ('JBL', 'Boombox 3 Wi-Fi & Bluetooth Massive Bass Speaker', '180W RMS', '24 Hours', '3-Way Speaker Design, Subwoofer, Dolby Atmos', 499.99, 'Ultimate High-Power Music Box'),
        ('JBL', 'PartyBox Stage 320 Portable Party Speaker on Wheels', '240W RMS', '18 Hours', 'Telescopic Handle, Dual Mic/Guitar Inputs, Dynamic Lightshow', 599.99, 'Professional Club Sound Machine'),
        ('JBL', 'PartyBox Club 120 Portable Party Speaker', '160W RMS', '12 Hours', 'AI Sound Boost, Folding Handle, Splashproof', 399.99, 'Backyard Bash Essential'),
        ('JBL', 'Clip 4 Ultra-Portable Waterproof Bluetooth Speaker', '5W RMS', '10 Hours', 'Integrated Carabiner, IP67 Waterproof', 79.99, 'Carabiner Pocket Music Box'),
        ('JBL', 'Go 4 Ultra-Compact Bluetooth Music Box', '4.2W RMS', '7 Hours', 'Ultra-pocketable, Multi-speaker PartyBoost', 49.99, 'Pocket Sized Sound Spark'),
        ('Sony', 'SRS-XG300 X-Series Portable Party Bluetooth Speaker', '60W RMS', '25 Hours', 'Mega Bass, Retractable Handle, Ambient Light Rings', 299.99, 'Club Bass & Acoustic Clarity'),
        ('Sony', 'SRS-XE300 Line-Shape Diffuser Portable Speaker', '35W RMS', '24 Hours', 'Line-Shape Diffuser, Shockproof, IP67', 199.99, 'Even Sound Distribution Beast'),
        ('Sony', 'SRS-XB100 Compact Heavy Bass Wireless Speaker', '5W RMS', '16 Hours', 'Sound Diffusion Processor, Multiway Strap', 59.99, 'Mini Outdoor Bass Box'),
        ('Sony', 'ULT FIELD 7 Heavy Bass Portable Bluetooth Speaker', '100W RMS', '30 Hours', 'ULT Bass Button, Karaoke/Guitar Input, Water Resistant', 499.99, 'Deep Rib-Shaking Sub-Bass'),
        ('Sony', 'HT-S20R 5.1ch Dolby Digital Soundbar with Subwoofer', '400W RMS', 'AC Powered', '5.1 Channel Surround, Wired Rear Speakers, Bluetooth', 199.99, 'Home Theater Gaming Soundbar'),
        ('Bose', 'SoundLink Max Portable High-Fidelity Speaker', '80W Peak', '20 Hours', 'Deep Lows, Removable Rope Handle, USB-C Charge Out', 399.99, 'Audiophile Grade Portable Beast'),
        ('Bose', 'SoundLink Flex (2nd Gen) Waterproof Bluetooth Speaker', '30W Peak', '12 Hours', 'PositionIQ Technology, Hi-Res Audio, IP67', 149.99, 'Crystal Clear Vocal Speaker'),
        ('Bose', 'SoundLink Revolve+ II 360-Degree Bluetooth Speaker', '45W Peak', '17 Hours', 'Seamless 360 Sound Coverage, Water Resistant', 329.99, 'Omnidirectional Acoustic Elegance'),
        ('Bose', 'Smart Soundbar 600 with Dolby Atmos & TrueSpace', '120W RMS', 'AC Powered', 'Upfiring Transducers, Voice4Video, eARC HDMI', 499.99, 'Immersive Spatial Gaming Audio'),
        ('Marshall', 'Emberton II Portable Bluetooth Speaker', '20W RMS', '30+ Hours', 'True Stereophonic 360 Sound, IP67, Stack Mode', 169.99, 'Iconic Rock Heritage Music Box'),
        ('Marshall', 'Stanmore III Iconic Home Bluetooth Speaker', '80W RMS', 'AC Powered', 'Class D Amps, Dynamic Loudness, Vintage Knobs', 379.99, 'Vintage Living Room Audiophile'),
        ('Marshall', 'Acton III Compact Home Bluetooth Audio System', '60W RMS', 'AC Powered', 'Custom Tweeters & Woofer, Vintage Brass Details', 279.99, 'Compact Retro Sound Monster'),
        ('Marshall', 'Woburn III Heavyweight Home Audio Speaker', '150W RMS', 'AC Powered', 'Three-Way Driver System, HDMI ARC Input', 579.99, 'Floor-Shaking Master Acoustic'),
        ('Harman Kardon', 'Onyx Studio 8 Premium Bluetooth Speaker', '50W RMS', '8 Hours', 'Self-Tuning Calibration, Recycled Anodized Aluminum Handle', 249.99, 'Sculptural Luxury Acoustic'),
        ('Harman Kardon', 'Aura Studio 4 Ambient Lighting Speaker', '130W RMS', 'AC Powered', '5 Distinct Ambient Diamond Light Themes, 360 Audio', 299.99, 'Visual & Sonic Centerpiece'),
        ('Harman Kardon', 'SoundSticks 4 Iconic 2.1 Bluetooth System', '140W RMS', 'AC Powered', 'Iconic Transparent Dome Subwoofer, 8 Satellite Drivers', 299.99, 'Legendary MoMA Design 2.1'),
        ('Anker Soundcore', 'Motion Boom Plus 80W Outdoor Bluetooth Speaker', '80W RMS', '20 Hours', 'Titanium Drivers, BassUp Tech, IP67 Floating', 179.99, 'Outdoor Pool Party Cannon'),
        ('Anker Soundcore', 'Motion+ Hi-Res 30W Portable Bluetooth Speaker', '30W RMS', '12 Hours', 'Qualcomm aptX, Ultra-Wide Frequency 40kHz, IPX7', 99.99, 'Budget Audiophile Phenomenon'),
        ('Edifier', 'R1280DB Powered Bluetooth Bookshelf Speakers (Pair)', '42W RMS', 'AC Powered', 'Wood Grain MDF Enclosure, Optical & Coaxial Inputs', 149.99, 'Classic Desktop Bookshelf Pair'),
        ('Edifier', 'QR65 Active Desktop Monitor with 65W GaN Charger', '70W RMS', 'AC Powered', 'TempoAbyss Acoustic Cavity, TurboGaN Fast Charger', 349.99, 'Hi-Res Cyberpunk Desktop Monitors'),
        ('Creative', 'Pebble Pro Minimalist RGB 2.0 USB Desktop Speakers', '30W Peak', 'USB-C Powered', 'Custom RGB Rings, Clear Dialog Audio Processing', 59.99, 'Compact Gaming Desktop Speakers'),
        ('Razer', 'Leviathan V2 Pro Head-Tracking AI Gaming Soundbar', '90W Peak', 'AC Powered', 'Audioscenic AI Head Tracking, THX Spatial Audio, Subwoofer', 399.99, 'Next-Gen Beamforming Soundbar')
    ]

    colors = ['Midnight Black', 'Squad Camo', 'Ocean Teal', 'Forest Green', 'Vintage Cream', 'Metallic Silver']

    idx = 1
    for brand, model, watts, battery, feats, base_p, tier in audio_defs:
        for col in colors[:4]:
            if len(items) >= 110:
                break
            p = round(base_p * random.uniform(0.95, 1.12), 2)
            disc = random.choice([0, 0, 5, 10, 15, 20])
            orig = p / (1 - disc/100.0) if disc > 0 else p
            title = f"{brand} {model} - {col}"

            items.append(make_prod(
                f'prod-audio-{idx}',
                title,
                brand, 'audio', p, orig, disc, random.randint(4, 30),
                random.random() < 0.16, random.random() < 0.16, random.random() < 0.18,
                False, tier, round(random.uniform(4.55, 4.97), 2), random.randint(25, 410),
                f'Engineered with high-fidelity acoustic transducers, digital signal processing (DSP), and passive bass radiators to deliver thunderous low-end response and sparkling vocal clarity.',
                {
                    'Power Output': watts,
                    'Battery Life / Power': battery,
                    'Acoustic Features': feats,
                    'Connectivity': 'Bluetooth 5.3 + Aux 3.5mm + USB-C',
                    'Water Resistance': 'IP67 Waterproof & Dustproof' if 'Water' in feats or 'IP' in feats else 'Splash Resistant',
                    'Color Finish': col,
                    'Warranty': '1-Year Official Global Warranty'
                },
                'Connects wirelessly via Bluetooth to Smartphones, Laptops, PCs, and Tablets. Multipoint dual device pairing supported.',
                {
                    'Max Sound Pressure': f'{random.randint(88, 106)} dB SPL',
                    'Frequency Response': '45 Hz - 20,000 Hz Hi-Res'
                }
            ))
            idx += 1

    while len(items) < 110:
        brand, model, watts, battery, feats, base_p, tier = random.choice(audio_defs)
        p = round(base_p * random.uniform(0.9, 1.05), 2)
        disc = random.choice([0, 5, 10])
        orig = p / (1 - disc/100.0) if disc > 0 else p
        items.append(make_prod(
            f'prod-audio-{idx}',
            f'{brand} {model} (Party Edition)',
            brand, 'audio', p, orig, disc, random.randint(5, 20),
            False, False, False, False, tier, round(random.uniform(4.5, 4.9), 2), random.randint(15, 90),
            f'Authentic wireless music box with signature bass sound and durable protective casing.',
            { 'Power': watts, 'Battery': battery, 'Connectivity': 'Bluetooth 5.3', 'Warranty': '1-Year Warranty' },
            'Standard Bluetooth 5.0+ pairing.',
            { 'Output': watts }
        ))
        idx += 1

    return items[:110]
