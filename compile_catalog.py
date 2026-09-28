# -*- coding: utf-8 -*-
"""
NexusTech 1,500 Products Catalog Compiler
Compiles all 14 categories into ISD Project/js/data/initialData.js
"""

import json
import os
from generators.cpus import generate_cpus
from generators.gpus import generate_gpus
from generators.ram import generate_ram
from generators.storage import generate_ssds, generate_hdds
from generators.peripherals import generate_keyboards, generate_mice, generate_audio
from generators.phones import generate_phones
from generators.systems import (
    generate_motherboards,
    generate_psus,
    generate_cooling,
    generate_monitors,
    generate_prebuilts
)

def main():
    print("Generating products across all categories...")

    cpus = generate_cpus()
    print(f"  [+] CPUs: {len(cpus)} items")

    gpus = generate_gpus()
    print(f"  [+] GPUs: {len(gpus)} items")

    ram = generate_ram()
    print(f"  [+] RAM: {len(ram)} items")

    ssds = generate_ssds()
    print(f"  [+] SSDs: {len(ssds)} items")

    hdds = generate_hdds()
    print(f"  [+] HDDs: {len(hdds)} items")

    keyboards = generate_keyboards()
    print(f"  [+] Keyboards: {len(keyboards)} items")

    mice = generate_mice()
    print(f"  [+] Mice: {len(mice)} items")

    audio = generate_audio()
    print(f"  [+] Music Box & Audio: {len(audio)} items")

    phones = generate_phones()
    print(f"  [+] Mobile Phones: {len(phones)} items")

    motherboards = generate_motherboards()
    print(f"  [+] Motherboards: {len(motherboards)} items")

    psus = generate_psus()
    print(f"  [+] Power Supplies (PSUs): {len(psus)} items")

    cooling = generate_cooling()
    print(f"  [+] Casings & Cooling: {len(cooling)} items")

    monitors = generate_monitors()
    print(f"  [+] Monitors: {len(monitors)} items")

    prebuilts = generate_prebuilts()
    print(f"  [+] Prebuilt Rigs & Laptops: {len(prebuilts)} items")

    all_products = (
        cpus + gpus + ram + ssds + hdds + keyboards + mice +
        audio + phones + motherboards + psus + cooling + monitors + prebuilts
    )

    total_count = len(all_products)
    print(f"\nTotal Compiled Products: {total_count}")
    assert total_count == 1500, f"Expected 1500 products, got {total_count}!"

    # Verify ID uniqueness
    ids = [p['id'] for p in all_products]
    unique_ids = set(ids)
    assert len(unique_ids) == 1500, f"ID collision detected: {len(unique_ids)} unique IDs out of 1500"
    print("  [OK] All 1,500 Product IDs are strictly unique!")

    # Verify categories
    categories = [
        { 'id': 'all', 'name': 'All Components & Tech', 'icon': 'fa-solid fa-microchip', 'count': len(all_products), 'slug': 'all' },
        { 'id': 'cpu', 'name': 'Processors (CPUs)', 'icon': 'fa-solid fa-microchip', 'count': len(cpus), 'slug': 'cpu' },
        { 'id': 'gpu', 'name': 'Graphics Cards (GPUs)', 'icon': 'fa-solid fa-gamepad', 'count': len(gpus), 'slug': 'gpu' },
        { 'id': 'ram', 'name': 'Memory (RAM)', 'icon': 'fa-solid fa-memory', 'count': len(ram), 'slug': 'ram' },
        { 'id': 'ssd', 'name': 'Solid State Drives (SSDs)', 'icon': 'fa-solid fa-compact-disc', 'count': len(ssds), 'slug': 'ssd' },
        { 'id': 'hdd', 'name': 'Hard Discs (HDDs)', 'icon': 'fa-solid fa-hard-drive', 'count': len(hdds), 'slug': 'hdd' },
        { 'id': 'keyboard', 'name': 'Keyboards & Typing', 'icon': 'fa-solid fa-keyboard', 'count': len(keyboards), 'slug': 'keyboard' },
        { 'id': 'mouse', 'name': 'Mice & Gaming Mice', 'icon': 'fa-solid fa-computer-mouse', 'count': len(mice), 'slug': 'mouse' },
        { 'id': 'audio', 'name': 'Music Box & Soundbars', 'icon': 'fa-solid fa-volume-high', 'count': len(audio), 'slug': 'audio' },
        { 'id': 'phone', 'name': 'Mobile Phones & Smartphones', 'icon': 'fa-solid fa-mobile-screen-button', 'count': len(phones), 'slug': 'phone' },
        { 'id': 'motherboard', 'name': 'Motherboards', 'icon': 'fa-solid fa-chess-board', 'count': len(motherboards), 'slug': 'motherboard' },
        { 'id': 'psu', 'name': 'Power Supplies (PSUs)', 'icon': 'fa-solid fa-bolt', 'count': len(psus), 'slug': 'psu' },
        { 'id': 'cooling', 'name': 'Casings & Cooling', 'icon': 'fa-solid fa-fan', 'count': len(cooling), 'slug': 'cooling' },
        { 'id': 'monitor', 'name': 'Monitors & Displays', 'icon': 'fa-solid fa-desktop', 'count': len(monitors), 'slug': 'monitor' },
        { 'id': 'prebuilt', 'name': 'Gaming Rigs & Laptops', 'icon': 'fa-solid fa-server', 'count': len(prebuilts), 'slug': 'prebuilt' }
    ]

    # Read tail of initialData.js to preserve upcoming, stores, searches, users, reviews, orders
    target_path = os.path.join('ISD Project', 'js', 'data', 'initialData.js')
    with open(target_path, 'r', encoding='utf-8') as f:
        existing_content = f.read()

    tail_idx = existing_content.find('const initialUpcomingProducts =')
    assert tail_idx != -1, "Could not find initialUpcomingProducts in existing file"
    tail_section = existing_content[tail_idx:]

    header_section = (
        "// Initial Database for NexusTech / Kingdom of Games Computer Parts E-Commerce Store\n"
        "// Specially curated for SEU ISD CSE346 Project - Complete 1,500 Products Catalog\n\n"
    )

    categories_js = f"const initialCategories = {json.dumps(categories, indent=2)};\n\n"
    products_js = f"const initialProducts = {json.dumps(all_products, indent=2)};\n\n"

    new_content = header_section + categories_js + products_js + tail_section

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"\n[SUCCESS] Wrote full database ({len(new_content)} bytes) to: {target_path}")

if __name__ == '__main__':
    main()
