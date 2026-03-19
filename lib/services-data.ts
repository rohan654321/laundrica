import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  unit: string;
  image?: string;
  sortOrder: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  fullDescription: string;
  image: string;
  rating: number;
  reviews: number;
  turnaround: string;
  tagline: string;
  items: {
    men: ServiceItem[];
    women: ServiceItem[];
    children: ServiceItem[];
    household: ServiceItem[];
  };
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonical: string;
}

export const services: ServiceCategory[] = [
  {
    id: 'laundry-services',
    name: 'Laundry Services (Wash & Press)',
    slug: 'professional-laundry-services-in-dubai',
    icon: '/images/redesign/Laundry.svg',
    description: 'Professional wash and press for all your clothing needs.',
    fullDescription: 'Our comprehensive laundry services include washing and pressing of all types of clothing. We use premium detergents to ensure your clothes come back fresh, clean, and wrinkle-free. Free pickup and delivery within 24 hours, eco-friendly detergents, and professional stain removal treatment.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 245,
    turnaround: '24-48 hours',
    tagline: 'The pile that haunted your weekend? Gone by evening.',
    items: {
      men: [
        { id: 'men-tshirts', name: 'T-shirts/Shirts', price: 6, description: 'Casual and formal shirts', unit: 'Per Item', sortOrder: 0 },
        { id: 'men-trousers', name: 'Trouser', price: 6, description: 'Casual pants, formal trousers, Jeans, Pajama', unit: 'Per Item', sortOrder: 1 },
        { id: 'men-kandora', name: 'Kandora', price: 10, description: 'Traditional Kandora', unit: 'Per Item', sortOrder: 2 },
        { id: 'men-ghatra', name: 'Ghatra', price: 8, description: 'Headwear', unit: 'Per Item', sortOrder: 3 },
        { id: 'men-lungi', name: 'Lungi', price: 6, description: 'Casual wear', unit: 'Per Item', sortOrder: 4 },
        { id: 'men-shorts', name: 'Shorts', price: 6, description: 'Casual shorts', unit: 'Per Item', sortOrder: 5 },
        { id: 'men-cap-tie', name: 'Cap/Tie', price: 5, description: 'Caps and ties', unit: 'Per Item', sortOrder: 6 },
        { id: 'men-jacket', name: 'Jacket/Coat', price: 15, description: 'Light jackets and coats', unit: 'Per Item', sortOrder: 7 },
        { id: 'men-waistcoat', name: 'Waist Coat', price: 10, description: 'Formal waistcoats', unit: 'Per Item', sortOrder: 8 },
        { id: 'men-leather-jacket', name: 'Leather Jacket', price: 25, description: 'Leather jackets', unit: 'Per Item', sortOrder: 9 },
        { id: 'men-sweater', name: 'Sweater', price: 10, description: 'Knit sweaters', unit: 'Per Item', sortOrder: 10 },
        { id: 'men-innerwear', name: 'Inner Wear', price: 4, description: 'Undergarments', unit: 'Per Item', sortOrder: 11 },
        { id: 'men-socks', name: 'Socks (Pair)', price: 4, description: 'Pairs of socks', unit: 'Per Item', sortOrder: 12 },
        { id: 'men-handkerchief', name: 'Handkerchiefs', price: 2, description: 'Handkerchiefs', unit: 'Per Item', sortOrder: 13 },
      ],
      women: [
        { id: 'women-tshirts', name: 'T-shirts/Shirts', price: 6, description: 'Casual tops, blouses', unit: 'Per Item', sortOrder: 0 },
        { id: 'women-trousers', name: 'Trouser', price: 6, description: 'Trousers, jeans, leggings, Pajama', unit: 'Per Item', sortOrder: 1 },
        { id: 'women-abbaya', name: 'Abbaya/Burqah', price: 10, description: 'Traditional Abbaya and Burqah', unit: 'Per Item', sortOrder: 2 },
        { id: 'women-scarf', name: 'Scarf/Dupatta', price: 6, description: 'Scarves and dupattas', unit: 'Per Item', sortOrder: 3 },
        { id: 'women-skirt', name: 'Skirt/Shorts', price: 6, description: 'Skirts and shorts', unit: 'Per Item', sortOrder: 4 },
        { id: 'women-dress', name: 'Full Dress', price: 12, description: 'Casual and formal dresses', unit: 'Per Item', sortOrder: 5 },
        { id: 'women-salwar', name: 'Salwar Kameez', price: 12, description: 'Traditional attire', unit: 'Per Item', sortOrder: 6 },
        { id: 'women-blouse', name: 'Blouse', price: 8, description: 'Formal and casual blouses', unit: 'Per Item', sortOrder: 7 },
        { id: 'women-saree', name: 'Saree', price: 12, description: 'Traditional Saree', unit: 'Per Item', sortOrder: 8 },
        { id: 'women-coat', name: 'Coat/Jacket', price: 15, description: 'Jackets and coats', unit: 'Per Item', sortOrder: 9 },
        { id: 'women-sweater', name: 'Sweater/Pullover', price: 10, description: 'Sweaters, Pullovers, Jumpers', unit: 'Per Item', sortOrder: 10 },
        { id: 'women-innerwear', name: 'Inner Wear', price: 4, description: 'Undergarments, lingerie', unit: 'Per Item', sortOrder: 11 },
        { id: 'women-handkerchief', name: 'Handkerchief', price: 2, description: 'Handkerchief', unit: 'Per Item', sortOrder: 12 },
      ],
      children: [
        { id: 'kids-tshirt', name: 'T-Shirt', price: 4, description: 'For ages 2-12', unit: 'Per Item', sortOrder: 0 },
        { id: 'kids-shorts', name: 'Shorts/Skirt', price: 4, description: 'For ages 2-12', unit: 'Per Item', sortOrder: 1 },
        { id: 'kids-trousers', name: 'Trousers', price: 5, description: 'For ages 2-12', unit: 'Per Item', sortOrder: 2 },
        { id: 'kids-dress', name: 'Dress', price: 8, description: 'For ages 2-12', unit: 'Per Item', sortOrder: 3 },
        { id: 'kids-jacket', name: 'Jacket', price: 10, description: 'For ages 2-12', unit: 'Per Item', sortOrder: 4 },
      ],
      household: [
        { id: 'household-uniform', name: 'Police Dress/Safari Dress', price: 14, description: 'Uniform cleaning', unit: 'Per Item', sortOrder: 0 },
        { id: 'household-duvet-single', name: 'Duvet Cover (Single)', price: 10, description: 'Single sized duvet cover', unit: 'Per Item', sortOrder: 1 },
        { id: 'household-duvet-double', name: 'Duvet Cover (Double)', price: 12, description: 'Double sized duvet cover', unit: 'Per Item', sortOrder: 2 },
        { id: 'household-blanket-single', name: 'Blanket (Single)', price: 25, description: 'Single sized blanket', unit: 'Per Item', sortOrder: 3 },
        { id: 'household-blanket-double', name: 'Blanket (Double)', price: 35, description: 'Double sized blanket', unit: 'Per Item', sortOrder: 4 },
        { id: 'household-duvet-small', name: 'Duvet Small', price: 20, description: 'Small duvet', unit: 'Per Item', sortOrder: 5 },
        { id: 'household-duvet-medium', name: 'Duvet Medium', price: 25, description: 'Medium duvet', unit: 'Per Item', sortOrder: 6 },
        { id: 'household-duvet-large', name: 'Duvet Large', price: 30, description: 'Large duvet', unit: 'Per Item', sortOrder: 7 },
        { id: 'household-bedsheet-single', name: 'Bed Sheet (Single)', price: 10, description: 'Single sized bedsheet', unit: 'Per Item', sortOrder: 8 },
        { id: 'household-bedsheet-double', name: 'Bed Sheet (Double)', price: 12, description: 'Double sized bedsheet', unit: 'Per Item', sortOrder: 9 },
        { id: 'household-pillowcase', name: 'Pillow Case', price: 3, description: 'Pillow cases', unit: 'Per Item', sortOrder: 10 },
        { id: 'household-cushioncover', name: 'Cushion Cover/Pillow Cover', price: 6, description: 'Cushion and pillow covers', unit: 'Per Item', sortOrder: 11 },
        { id: 'household-pillow', name: 'Pillow/Cushion', price: 15, description: 'Pillows and cushions', unit: 'Per Item', sortOrder: 12 },
        { id: 'household-bathrobe', name: 'Bath Robe', price: 15, description: 'Bath robes', unit: 'Per Item', sortOrder: 13 },
        { id: 'household-towel-medium', name: 'Bath Towel (M)', price: 4, description: 'Medium bath towel', unit: 'Per Item', sortOrder: 14 },
        { id: 'household-towel-large', name: 'Bath Towel (L)', price: 6, description: 'Large bath towel', unit: 'Per Item', sortOrder: 15 },
        { id: 'household-wedding-dress', name: 'Wedding Dress', price: 80, description: 'Normal wedding dress', unit: 'Per Item', sortOrder: 16 },
      ],
    },
    metaTitle: 'Professional Laundry Services in Dubai | Laundrica Care',
    metaDescription: 'Get spotless clothes with Laundrica professional laundry service in Dubai. Free pickup & delivery, eco-friendly cleaning, and expert care.',
    keywords: ['Professional Laundry Services in Dubai', 'wash and fold service', 'laundry pickup and delivery'],
    canonical: 'https://laundrica.com/services/laundry-services',
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning Services',
    slug: 'dry-cleaning-services-in-dubai',
    icon: '/images/redesign/Dry-clean.svg',
    description: 'Expert dry cleaning for delicate and formal garments.',
    fullDescription: 'Our dry cleaning service uses gentle, eco-friendly solvents to clean delicate fabrics, suits, dresses, and formal wear. We ensure your garments retain their shape, color, and texture while removing tough stains.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 189,
    turnaround: '24-48 hours',
    tagline: 'Care so gentle, even labels would approve.',
    items: {
      men: [
        { id: 'dry-men-suit', name: '2 Piece Suit', price: 35, description: 'Jacket and trousers', unit: 'Per Suit', sortOrder: 0 },
        { id: 'dry-men-blazer', name: 'Blazer/Jacket', price: 20, description: 'Single blazer or jacket', unit: 'Per Item', sortOrder: 1 },
        { id: 'dry-men-trousers', name: 'Formal Trousers', price: 12, description: 'Dry clean only trousers', unit: 'Per Item', sortOrder: 2 },
        { id: 'dry-men-shirt', name: 'Formal Shirt', price: 10, description: 'Dry clean only shirts', unit: 'Per Item', sortOrder: 3 },
        { id: 'dry-men-tie', name: 'Tie', price: 8, description: 'Neck ties and bow ties', unit: 'Per Item', sortOrder: 4 },
        { id: 'dry-men-waistcoat', name: 'Waistcoat', price: 12, description: 'Formal waistcoat', unit: 'Per Item', sortOrder: 5 },
        { id: 'dry-men-overcoat', name: 'Overcoat', price: 30, description: 'Heavy winter coat', unit: 'Per Item', sortOrder: 6 },
      ],
      women: [
        { id: 'dry-women-dress', name: 'Evening Dress', price: 35, description: 'Formal evening wear', unit: 'Per Item', sortOrder: 0 },
        { id: 'dry-women-blouse', name: 'Silk Blouse', price: 12, description: 'Delicate silk blouses', unit: 'Per Item', sortOrder: 1 },
        { id: 'dry-women-suit', name: 'Skirt Suit', price: 30, description: 'Jacket and skirt', unit: 'Per Suit', sortOrder: 2 },
        { id: 'dry-women-gown', name: 'Wedding Gown', price: 150, description: 'Bridal gowns', unit: 'Per Item', sortOrder: 3 },
        { id: 'dry-women-saree', name: 'Silk Saree', price: 25, description: 'Pure silk sarees', unit: 'Per Item', sortOrder: 4 },
        { id: 'dry-women-lehenga', name: 'Lehenga', price: 40, description: 'Traditional lehenga', unit: 'Per Item', sortOrder: 5 },
      ],
      children: [
        { id: 'dry-kids-suit', name: 'Kids Suit', price: 20, description: 'Formal kids wear', unit: 'Per Item', sortOrder: 0 },
        { id: 'dry-kids-dress', name: 'Fancy Dress', price: 18, description: 'Special occasion dress', unit: 'Per Item', sortOrder: 1 },
      ],
      household: [
        { id: 'dry-curtains', name: 'Curtains (per panel)', price: 25, description: 'Dry clean only curtains', unit: 'Per Panel', sortOrder: 0 },
        { id: 'dry-tablecloth', name: 'Tablecloth', price: 15, description: 'Formal table linens', unit: 'Per Item', sortOrder: 1 },
      ],
    },
    metaTitle: 'Dry Cleaning Services in Dubai | Laundrica Care',
    metaDescription: 'Professional dry cleaning services in Dubai for suits, dresses, and formal wear. Free pickup & delivery with expert care.',
    keywords: ['Dry Cleaning Services in Dubai', 'suit cleaning', 'formal wear cleaning'],
    canonical: 'https://laundrica.com/services/dry-cleaning',
  },
  {
    id: 'steam-pressing',
    name: 'Steam Pressing Service',
    slug: 'steam-pressing-services-in-dubai',
    icon: '/images/redesign/Steam.svg',
    description: 'Professional steam pressing for wrinkle-free clothes.',
    fullDescription: 'Get perfectly pressed clothes with our professional steam pressing service. We remove wrinkles and creases, giving your garments a crisp, fresh look without the risk of damage from traditional ironing.',
    image: 'https://images.unsplash.com/photo-1489276707445-75a5b09b456c?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 156,
    turnaround: '24 hours',
    tagline: 'Wrinkles erased, confidence intact. A standard of polish that matches the pace of the city.',
    items: {
      men: [
        { id: 'steam-men-shirt', name: 'Shirt', price: 5, description: 'Full steam press', unit: 'Per Item', sortOrder: 0 },
        { id: 'steam-men-trousers', name: 'Trousers', price: 5, description: 'Full steam press', unit: 'Per Item', sortOrder: 1 },
        { id: 'steam-men-suit', name: '2 Piece Suit', price: 15, description: 'Jacket and trousers', unit: 'Per Suit', sortOrder: 2 },
        { id: 'steam-men-kandora', name: 'Kandora', price: 8, description: 'Traditional kandora', unit: 'Per Item', sortOrder: 3 },
      ],
      women: [
        { id: 'steam-women-blouse', name: 'Blouse', price: 5, description: 'Full steam press', unit: 'Per Item', sortOrder: 0 },
        { id: 'steam-women-dress', name: 'Dress', price: 8, description: 'Full steam press', unit: 'Per Item', sortOrder: 1 },
        { id: 'steam-women-pants', name: 'Pants', price: 5, description: 'Full steam press', unit: 'Per Item', sortOrder: 2 },
        { id: 'steam-women-abbaya', name: 'Abbaya', price: 8, description: 'Full steam press', unit: 'Per Item', sortOrder: 3 },
      ],
      children: [
        { id: 'steam-kids-shirt', name: 'Kids Shirt', price: 3, description: 'Full steam press', unit: 'Per Item', sortOrder: 0 },
        { id: 'steam-kids-pants', name: 'Kids Pants', price: 3, description: 'Full steam press', unit: 'Per Item', sortOrder: 1 },
      ],
      household: [
        { id: 'steam-tablecloth', name: 'Tablecloth', price: 8, description: 'Full steam press', unit: 'Per Item', sortOrder: 0 },
        { id: 'steam-napkins', name: 'Napkins (set of 4)', price: 6, description: 'Full steam press', unit: 'Per Set', sortOrder: 1 },
      ],
    },
    metaTitle: 'Steam Pressing Service in Dubai | Laundrica',
    metaDescription: 'Professional steam pressing service in Dubai for wrinkle-free clothes. Free pickup & delivery with expert care.',
    keywords: ['Steam Pressing Service Dubai', 'clothes pressing', 'ironing service'],
    canonical: 'https://laundrica.com/services/steam-pressing',
  },
  {
    id: 'shoe-cleaning',
    name: 'Shoe Cleaning',
    slug: 'shoe-and-bag-spa-services-in-dubai',
    icon: '/images/redesign/Shoe-spa.svg',
    description: 'Professional shoe cleaning and restoration.',
    fullDescription: 'Bring your shoes back to life with our professional shoe cleaning service. We clean, disinfect, and restore sneakers, leather shoes, and more.',
    image: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b89a?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 134,
    turnaround: '24-48 hours',
    tagline: 'Fresh enough for first steps, because the shoes you love should outlast the dirt.',
    items: {
      men: [
        { id: 'shoe-men-sneakers', name: 'Sneakers', price: 25, description: 'Full cleaning and deodorizing', unit: 'Per Pair', sortOrder: 0 },
        { id: 'shoe-men-leather', name: 'Leather Shoes', price: 30, description: 'Clean and polish', unit: 'Per Pair', sortOrder: 1 },
        { id: 'shoe-men-suede', name: 'Suede Shoes', price: 35, description: 'Special suede cleaning', unit: 'Per Pair', sortOrder: 2 },
        { id: 'shoe-men-formal', name: 'Formal Shoes', price: 28, description: 'Clean and shine', unit: 'Per Pair', sortOrder: 3 },
      ],
      women: [
        { id: 'shoe-women-sneakers', name: 'Sneakers', price: 25, description: 'Full cleaning and deodorizing', unit: 'Per Pair', sortOrder: 0 },
        { id: 'shoe-women-heels', name: 'High Heels', price: 28, description: 'Clean and polish', unit: 'Per Pair', sortOrder: 1 },
        { id: 'shoe-women-boots', name: 'Boots', price: 35, description: 'Full cleaning', unit: 'Per Pair', sortOrder: 2 },
        { id: 'shoe-women-flats', name: 'Flats', price: 22, description: 'Clean and refresh', unit: 'Per Pair', sortOrder: 3 },
      ],
      children: [
        { id: 'shoe-kids-sneakers', name: 'Kids Sneakers', price: 18, description: 'Full cleaning', unit: 'Per Pair', sortOrder: 0 },
        { id: 'shoe-kids-school', name: 'School Shoes', price: 18, description: 'Clean and polish', unit: 'Per Pair', sortOrder: 1 },
      ],
      household: [
        { id: 'shoe-bag-handbag', name: 'Handbag', price: 40, description: 'Full cleaning', unit: 'Per Item', sortOrder: 0 },
        { id: 'shoe-bag-backpack', name: 'Backpack', price: 30, description: 'Full cleaning', unit: 'Per Item', sortOrder: 1 },
        { id: 'shoe-bag-luggage', name: 'Luggage', price: 50, description: 'Exterior cleaning', unit: 'Per Item', sortOrder: 2 },
      ],
    },
    metaTitle: 'Shoe Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional shoe cleaning and restoration service in Dubai. Free pickup & delivery for sneakers, leather shoes, and more.',
    keywords: ['Shoe Cleaning Dubai', 'sneaker cleaning', 'shoe restoration'],
    canonical: 'https://laundrica.com/services/shoe-cleaning',
  },
  // ... Add similar detailed items for carpet cleaning, curtain cleaning, and commercial laundry
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning Service',
    slug: 'carpet-cleaning-services-in-dubai',
    icon: '/images/redesign/Carpet.svg',
    description: 'Deep cleaning for carpets and rugs.',
    fullDescription: 'Our carpet cleaning service removes deep-seated dirt, stains, and allergens. We use professional equipment and eco-friendly solutions to refresh your carpets.',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 98,
    turnaround: '48-72 hours',
    tagline: 'Dust and stains pulled from where your vacuum can’t reach.',
    items: {
      men: [],
      women: [],
      children: [],
      household: [
        { id: 'carpet-small', name: 'Small Carpet (up to 3x3 ft)', price: 35, description: 'Area rugs, doormats', unit: 'Per Item', sortOrder: 0 },
        { id: 'carpet-medium', name: 'Medium Carpet (up to 6x4 ft)', price: 55, description: 'Medium area rugs', unit: 'Per Item', sortOrder: 1 },
        { id: 'carpet-large', name: 'Large Carpet (up to 8x6 ft)', price: 85, description: 'Large area rugs', unit: 'Per Item', sortOrder: 2 },
        { id: 'carpet-extra-large', name: 'Extra Large Carpet (8x10+ ft)', price: 120, description: 'Extra large rugs', unit: 'Per Item', sortOrder: 3 },
        { id: 'carpet-persian', name: 'Persian/Oriental Rug', price: 150, description: 'Special care for delicate rugs', unit: 'Per Item', sortOrder: 4 },
        { id: 'carpet-stain', name: 'Stain Treatment', price: 25, description: 'Additional stain removal', unit: 'Per Item', sortOrder: 5 },
      ],
    },
    metaTitle: 'Carpet Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional carpet cleaning service in Dubai. Deep cleaning for carpets and rugs with free pickup & delivery.',
    keywords: ['Carpet Cleaning Dubai', 'rug cleaning', 'carpet stain removal'],
    canonical: 'https://laundrica.com/services/carpet-cleaning',
  },
  {
    id: 'curtain-cleaning',
    name: 'Curtain Cleaning Service',
    slug: 'curtain-cleaning-services-in-dubai',
    icon: '/images/redesign/Curtain.svg',
    description: 'Professional cleaning for all curtain types.',
    fullDescription: 'Keep your curtains fresh and dust-free with our professional curtain cleaning service. We handle all fabric types, from delicate sheers to heavy drapes.',
    image: 'https://images.unsplash.com/photo-1582730147825-7d8395c21927?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 87,
    turnaround: '48-72 hours',
    tagline: 'Every breeze leaves something behind — we take it out.',
    items: {
      men: [],
      women: [],
      children: [],
      household: [
        { id: 'curtain-sheer', name: 'Sheer Curtains', price: 15, description: 'Delicate sheer fabric', unit: 'Per Panel', sortOrder: 0 },
        { id: 'curtain-light', name: 'Light Curtains', price: 20, description: 'Cotton, linen, polyester', unit: 'Per Panel', sortOrder: 1 },
        { id: 'curtain-heavy', name: 'Heavy Curtains', price: 30, description: 'Velvet, blackout curtains', unit: 'Per Panel', sortOrder: 2 },
        { id: 'curtain-blackout', name: 'Blackout Curtains', price: 35, description: 'Special blackout fabric', unit: 'Per Panel', sortOrder: 3 },
        { id: 'curtain-roman', name: 'Roman Blinds', price: 25, description: 'Roman style blinds', unit: 'Per Item', sortOrder: 4 },
        { id: 'curtain-vertical', name: 'Vertical Blinds', price: 40, description: 'Set of vertical blinds', unit: 'Per Set', sortOrder: 5 },
      ],
    },
    metaTitle: 'Curtain Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional curtain cleaning service in Dubai for all fabric types. Free pickup & delivery with expert care.',
    keywords: ['Curtain Cleaning Dubai', 'drapery cleaning', 'curtain stain removal'],
    canonical: 'https://laundrica.com/services/curtain-cleaning',
  },
  {
    id: 'commercial-laundry',
    name: 'Commercial Laundry Service',
    slug: 'commercial-laundry-services-in-dubai',
    icon: '/images/redesign/Commercial.svg',
    description: 'Bulk laundry solutions for businesses.',
    fullDescription: 'Our commercial laundry service handles high-volume laundry for hotels, restaurants, salons, and other businesses. We ensure consistent quality and timely delivery.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 76,
    turnaround: '24-48 hours',
    tagline: 'High volume, tight deadlines, zero excuses. Bulk care with boutique standards.',
    items: {
      men: [],
      women: [],
      children: [],
      household: [
        { id: 'commercial-hotel-sheet', name: 'Hotel Bed Sheet', price: 5, description: 'Bulk hotel linen', unit: 'Per Item', sortOrder: 0 },
        { id: 'commercial-hotel-towel', name: 'Hotel Towel', price: 3, description: 'Bulk towel cleaning', unit: 'Per Item', sortOrder: 1 },
        { id: 'commercial-restaurant-tablecloth', name: 'Restaurant Tablecloth', price: 8, description: 'Commercial table linen', unit: 'Per Item', sortOrder: 2 },
        { id: 'commercial-restaurant-napkin', name: 'Restaurant Napkin', price: 2, description: 'Commercial napkins', unit: 'Per Item', sortOrder: 3 },
        { id: 'commercial-salon-towel', name: 'Salon Towel', price: 2, description: 'Salon towel cleaning', unit: 'Per Item', sortOrder: 4 },
        { id: 'commercial-uniform', name: 'Staff Uniform', price: 8, description: 'Bulk uniform cleaning', unit: 'Per Item', sortOrder: 5 },
        { id: 'commercial-apron', name: 'Kitchen Apron', price: 5, description: 'Commercial aprons', unit: 'Per Item', sortOrder: 6 },
      ],
    },
    metaTitle: 'Commercial Laundry Service in Dubai | Laundrica',
    metaDescription: 'Professional commercial laundry service in Dubai for hotels, restaurants, and businesses. Bulk cleaning with reliable delivery.',
    keywords: ['Commercial Laundry Dubai', 'business laundry service', 'hotel laundry service'],
    canonical: 'https://laundrica.com/services/commercial-laundry',
  },
];

export const getServiceById = (id: string) => {
  return services.find(service => service.id === id);
};

export const getServiceBySlug = (slug: string) => {
  return services.find(service => service.slug === slug);
};