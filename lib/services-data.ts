// lib/services-data.ts
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
    slug: 'laundry-services',
    icon: '/images/redesign/Laundry.svg',
    description: 'Professional wash and press for all your clothing needs.',
    fullDescription: 'Our comprehensive laundry services include washing and pressing of all types of clothing. We use premium detergents to ensure your clothes come back fresh, clean, and wrinkle-free. Free pickup and delivery within 24 hours, eco-friendly detergents, and professional stain removal treatment.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 245,
    turnaround: '24-48 hours',
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
    slug: 'dry-cleaning',
    icon: '/images/redesign/Dry-clean.svg',
    description: 'Expert dry cleaning for delicate and formal garments.',
    fullDescription: 'Our dry cleaning service uses gentle, eco-friendly solvents to clean delicate fabrics, suits, dresses, and formal wear. We ensure your garments retain their shape, color, and texture while removing tough stains.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.9,
    reviews: 189,
    turnaround: '24-48 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
    },
    metaTitle: 'Dry Cleaning Services in Dubai | Laundrica Care',
    metaDescription: 'Professional dry cleaning services in Dubai for suits, dresses, and formal wear. Free pickup & delivery with expert care.',
    keywords: ['Dry Cleaning Services in Dubai', 'suit cleaning', 'formal wear cleaning'],
    canonical: 'https://laundrica.com/services/dry-cleaning',
  },
  {
    id: 'steam-pressing',
    name: 'Steam Pressing Service',
    slug: 'steam-pressing',
    icon: '/images/redesign/Steam.svg',
    description: 'Professional steam pressing for wrinkle-free clothes.',
    fullDescription: 'Get perfectly pressed clothes with our professional steam pressing service. We remove wrinkles and creases, giving your garments a crisp, fresh look without the risk of damage from traditional ironing.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.7,
    reviews: 156,
    turnaround: '24 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
    },
    metaTitle: 'Steam Pressing Service in Dubai | Laundrica',
    metaDescription: 'Professional steam pressing service in Dubai for wrinkle-free clothes. Free pickup & delivery with expert care.',
    keywords: ['Steam Pressing Service Dubai', 'clothes pressing', 'ironing service'],
    canonical: 'https://laundrica.com/services/steam-pressing',
  },
  {
    id: 'shoe-cleaning',
    name: 'Shoe Cleaning',
    slug: 'shoe-cleaning',
    icon: '/images/redesign/Shoe-spa.svg',
    description: 'Professional shoe cleaning and restoration.',
    fullDescription: 'Bring your shoes back to life with our professional shoe cleaning service. We clean, disinfect, and restore sneakers, leather shoes, and more.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.8,
    reviews: 134,
    turnaround: '24-48 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
    },
    metaTitle: 'Shoe Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional shoe cleaning and restoration service in Dubai. Free pickup & delivery for sneakers, leather shoes, and more.',
    keywords: ['Shoe Cleaning Dubai', 'sneaker cleaning', 'shoe restoration'],
    canonical: 'https://laundrica.com/services/shoe-cleaning',
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning Service',
    slug: 'carpet-cleaning',
    icon: '/images/redesign/Carpet.svg',
    description: 'Deep cleaning for carpets and rugs.',
    fullDescription: 'Our carpet cleaning service removes deep-seated dirt, stains, and allergens. We use professional equipment and eco-friendly solutions to refresh your carpets.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.8,
    reviews: 98,
    turnaround: '48-72 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
    },
    metaTitle: 'Carpet Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional carpet cleaning service in Dubai. Deep cleaning for carpets and rugs with free pickup & delivery.',
    keywords: ['Carpet Cleaning Dubai', 'rug cleaning', 'carpet stain removal'],
    canonical: 'https://laundrica.com/services/carpet-cleaning',
  },
  {
    id: 'curtain-cleaning',
    name: 'Curtain Cleaning Service',
    slug: 'curtain-cleaning',
    icon: '/images/redesign/Curtain.svg',
    description: 'Professional cleaning for all curtain types.',
    fullDescription: 'Keep your curtains fresh and dust-free with our professional curtain cleaning service. We handle all fabric types, from delicate sheers to heavy drapes.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.7,
    reviews: 87,
    turnaround: '48-72 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
    },
    metaTitle: 'Curtain Cleaning Service in Dubai | Laundrica',
    metaDescription: 'Professional curtain cleaning service in Dubai for all fabric types. Free pickup & delivery with expert care.',
    keywords: ['Curtain Cleaning Dubai', 'drapery cleaning', 'curtain stain removal'],
    canonical: 'https://laundrica.com/services/curtain-cleaning',
  },
  {
    id: 'commercial-laundry',
    name: 'Commercial Laundry Service',
    slug: 'commercial-laundry',
    icon: '/images/redesign/Commercial.svg',
    description: 'Bulk laundry solutions for businesses.',
    fullDescription: 'Our commercial laundry service handles high-volume laundry for hotels, restaurants, salons, and other businesses. We ensure consistent quality and timely delivery.',
    image: 'https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg',
    rating: 4.9,
    reviews: 76,
    turnaround: '24-48 hours',
    items: {
      men: [],
      women: [],
      children: [],
      household: [],
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