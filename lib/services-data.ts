export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: string;
  features: string[];
  price: number;
  turnaround: string;
  category: string;
}

export const services: Service[] = [
  {
    id: 'laundry-services',
    name: 'Laundry Services',
    shortDescription: 'The pile that haunted your weekend? Gone by evening.',
    fullDescription: 'Professional laundry care for everyday garments. We use advanced washing techniques, gentle detergents, and expert handling to ensure your clothes come back fresh, clean, and perfectly folded.',
    image: 'https://images.unsplash.com/photo-1580809361436-42a7986e5266?w=800&h=600&fit=crop',
    icon: '🧺',
    features: [
      'Premium detergent formulation',
      'Soft fabric treatment',
      'Color-safe washing',
      'Machine wash & fold',
      'Quick turnaround available',
      'Stain pre-treatment included'
    ],
    price: 5.99,
    turnaround: '24 hours',
    category: 'Washing'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning Services',
    shortDescription: 'Care so gentle, even labels would approve.',
    fullDescription: 'Expert dry cleaning for delicate fabrics, formal wear, and specialty items. Our certified professionals use eco-friendly solvents and precision handling to preserve the quality and longevity of your garments.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    icon: '✨',
    features: [
      'Eco-friendly solvents',
      'Delicate fabric expertise',
      'Formal wear specialists',
      'Stain removal experts',
      'Press & finish included',
      'Premium packaging'
    ],
    price: 12.99,
    turnaround: '2 days',
    category: 'Cleaning'
  },
  {
    id: 'steam-pressing',
    name: 'Steam Pressing Service',
    shortDescription: 'Wrinkles erased, confidence intact. Polish that matches the pace of the city.',
    fullDescription: 'Professional steam pressing and ironing for all garment types. Our expert pressers restore your clothes to perfect condition with precise temperature control and expert techniques.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    icon: '🔥',
    features: [
      'Expert temperature control',
      'Wrinkle-free guarantee',
      'All fabric types',
      'Steam & press finish',
      'Quick turnaround',
      'Professional fold or hanger'
    ],
    price: 3.99,
    turnaround: '4 hours',
    category: 'Pressing'
  },
  {
    id: 'shoe-cleaning',
    name: 'Shoe Cleaning',
    shortDescription: 'Fresh enough for first steps, because the shoes you love should outlast the dirt.',
    fullDescription: 'Professional shoe and footwear cleaning using specialized techniques for different materials. We restore your shoes to like-new condition while protecting their integrity and appearance.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    icon: '👟',
    features: [
      'Leather care specialists',
      'Canvas & mesh cleaning',
      'Suede expertise',
      'Sole restoration',
      'Water-resistant treatment',
      'Odor elimination'
    ],
    price: 8.99,
    turnaround: '2 days',
    category: 'Special'
  },
  {
    id: 'express-laundry',
    name: 'Express Laundry',
    shortDescription: 'When you need your clothes back fast without compromising on quality.',
    fullDescription: 'Quick turnaround laundry service for urgent needs. Perfect for travel, events, or when you just ran out of clean clothes. Same-day available in select areas.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=800&h=600&fit=crop',
    icon: '⚡',
    features: [
      'Same-day service available',
      'Priority processing',
      'Full care guarantee',
      'Flexible drop-off times',
      'Premium packaging',
      'Loyalty rewards'
    ],
    price: 9.99,
    turnaround: '4-12 hours',
    category: 'Quick'
  },
  {
    id: 'bulk-laundry',
    name: 'Bulk & Household Laundry',
    shortDescription: 'Large loads handled with care. Bedding, towels, curtains, and more.',
    fullDescription: 'Specialized service for bulk items and household textiles. From bed sheets to curtains, we handle large quantities with expert care using appropriate washing and drying techniques.',
    image: 'https://images.unsplash.com/photo-1580809361436-42a7986e5266?w=800&h=600&fit=crop',
    icon: '🛏️',
    features: [
      'Large quantity handling',
      'Bedding specialists',
      'Curtain cleaning',
      'Towel freshening',
      'Bulk discounts available',
      'Delivery included'
    ],
    price: 4.99,
    turnaround: '48 hours',
    category: 'Bulk'
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}
