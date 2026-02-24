export const mockServices = [
  {
    id: '1',
    name: 'Express Wash',
    description: 'Quick wash and dry service',
    price: 99,
    image: 'https://images.unsplash.com/photo-1610993030169-d07b248f28db?w=500&h=500&fit=crop',
    category: 'washing',
    duration: '2 hours',
  },
  {
    id: '2',
    name: 'Dry Cleaning',
    description: 'Professional dry cleaning for delicate fabrics',
    price: 249,
    image: 'https://images.unsplash.com/photo-1577720643272-265f434f0fbc?w=500&h=500&fit=crop',
    category: 'dry-cleaning',
    duration: '3 days',
  },
  {
    id: '3',
    name: 'Ironing Service',
    description: 'Professional ironing and pressing',
    price: 149,
    image: 'https://images.unsplash.com/photo-1612881260504-5eb4c8aeef33?w=500&h=500&fit=crop',
    category: 'ironing',
    duration: '1 day',
  },
  {
    id: '4',
    name: 'Stain Removal',
    description: 'Expert stain removal treatment',
    price: 199,
    image: 'https://images.unsplash.com/photo-1582274455522-e60f0db34818?w=500&h=500&fit=crop',
    category: 'treatment',
    duration: '2 days',
  },
  {
    id: '5',
    name: 'Fabric Care',
    description: 'Specialized care for premium fabrics',
    price: 299,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&h=500&fit=crop',
    category: 'fabric-care',
    duration: '4 days',
  },
  {
    id: '6',
    name: 'Wash & Fold',
    description: 'Basic wash, dry and fold service',
    price: 149,
    image: 'https://images.unsplash.com/photo-1545665225-cd034faf3088?w=500&h=500&fit=crop',
    category: 'washing',
    duration: '1 day',
  },
];

export const mockOrders = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      { id: '1', name: 'Express Wash', quantity: 1, price: 99 },
    ],
    totalPrice: 99,
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    deliveryDate: new Date('2024-01-17'),
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      { id: '2', name: 'Dry Cleaning', quantity: 1, price: 249 },
      { id: '3', name: 'Ironing Service', quantity: 2, price: 149 },
    ],
    totalPrice: 547,
    status: 'processing',
    createdAt: new Date('2024-01-20'),
    deliveryDate: new Date('2024-01-23'),
  },
];

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0100',
    address: '123 Main St, City, State 12345',
    role: 'customer',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0101',
    address: '456 Oak Ave, City, State 12346',
    role: 'customer',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@laundrica.com',
    phone: '+1-555-0200',
    address: '789 Admin Ln, City, State 12347',
    role: 'admin',
  },
];

export const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'washing', name: 'Washing' },
  { id: 'dry-cleaning', name: 'Dry Cleaning' },
  { id: 'ironing', name: 'Ironing' },
  { id: 'treatment', name: 'Treatment' },
  { id: 'fabric-care', name: 'Fabric Care' },
];
