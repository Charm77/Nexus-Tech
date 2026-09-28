# -*- coding: utf-8 -*-
"""
NexusTech 1,500 Products Catalog Generator
Generates full initialData.js with exactly 1500 rich, realistic computer parts and electronics.
"""

import json
import random

random.seed(346)

CATEGORY_IMAGES = {
    'cpu': [
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80'
    ],
    'gpu': [
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80'
    ],
    'ram': [
        'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=800&q=80'
    ],
    'ssd': [
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80'
    ],
    'hdd': [
        'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80'
    ],
    'keyboard': [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80'
    ],
    'mouse': [
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1626922247990-2521a0f913d8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80'
    ],
    'audio': [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    'phone': [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    'motherboard': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80'
    ],
    'psu': [
        'https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    'cooling': [
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80'
    ],
    'monitor': [
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=800&q=80'
    ],
    'prebuilt': [
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80'
    ]
}

def get_images(cat):
    imgs = CATEGORY_IMAGES.get(cat, CATEGORY_IMAGES['cpu'])
    primary = random.choice(imgs)
    others = [i for i in imgs if i != primary]
    gallery = [primary]
    if others:
        gallery.append(random.choice(others))
    return primary, gallery

CATEGORIES = [
    { 'id': 'all', 'name': 'All Components & Tech', 'icon': 'fa-solid fa-microchip', 'count': 1500, 'slug': 'all' },
    { 'id': 'cpu', 'name': 'Processors (CPUs)', 'icon': 'fa-solid fa-microchip', 'count': 110, 'slug': 'cpu' },
    { 'id': 'gpu', 'name': 'Graphics Cards (GPUs)', 'icon': 'fa-solid fa-gamepad', 'count': 130, 'slug': 'gpu' },
    { 'id': 'ram', 'name': 'Memory (RAM)', 'icon': 'fa-solid fa-memory', 'count': 120, 'slug': 'ram' },
    { 'id': 'ssd', 'name': 'Solid State Drives (SSDs)', 'icon': 'fa-solid fa-compact-disc', 'count': 120, 'slug': 'ssd' },
    { 'id': 'hdd', 'name': 'Hard Discs (HDDs)', 'icon': 'fa-solid fa-hard-drive', 'count': 90, 'slug': 'hdd' },
    { 'id': 'keyboard', 'name': 'Keyboards & Typing', 'icon': 'fa-solid fa-keyboard', 'count': 120, 'slug': 'keyboard' },
    { 'id': 'mouse', 'name': 'Mice & Gaming Mice', 'icon': 'fa-solid fa-computer-mouse', 'count': 110, 'slug': 'mouse' },
    { 'id': 'audio', 'name': 'Music Box & Soundbars', 'icon': 'fa-solid fa-volume-high', 'count': 110, 'slug': 'audio' },
    { 'id': 'phone', 'name': 'Mobile Phones & Smartphones', 'icon': 'fa-solid fa-mobile-screen-button', 'count': 130, 'slug': 'phone' },
    { 'id': 'motherboard', 'name': 'Motherboards', 'icon': 'fa-solid fa-chess-board', 'count': 100, 'slug': 'motherboard' },
    { 'id': 'psu', 'name': 'Power Supplies (PSUs)', 'icon': 'fa-solid fa-bolt', 'count': 90, 'slug': 'psu' },
    { 'id': 'cooling', 'name': 'Casings & Cooling', 'icon': 'fa-solid fa-fan', 'count': 95, 'slug': 'cooling' },
    { 'id': 'monitor', 'name': 'Monitors & Displays', 'icon': 'fa-solid fa-desktop', 'count': 95, 'slug': 'monitor' },
    { 'id': 'prebuilt', 'name': 'Gaming Rigs & Laptops', 'icon': 'fa-solid fa-server', 'count': 80, 'slug': 'prebuilt' }
]

def make_prod(pid, title, brand, category, price, orig_price, discount, stock, is_featured, is_latest, is_bestseller, is_gaming, gaming_tier, rating, review_count, desc, specs, compat, benchmarks):
    img, gallery = get_images(category)
    return {
        'id': pid,
        'title': title,
        'brand': brand,
        'category': category,
        'price': round(float(price), 2),
        'originalPrice': round(float(orig_price), 2),
        'discountPercent': int(discount),
        'stock': int(stock),
        'isFeatured': bool(is_featured),
        'isLatest': bool(is_latest),
        'isBestSeller': bool(is_bestseller),
        'isGaming': bool(is_gaming),
        'gamingTier': gaming_tier,
        'rating': round(float(rating), 2),
        'reviewCount': int(review_count),
        'image': img,
        'gallery': gallery,
        'description': desc,
        'specs': specs,
        'compatibilityNote': compat,
        'benchmarks': benchmarks
    }

print("Catalog generator ready.")
