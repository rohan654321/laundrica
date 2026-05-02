'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useSession } from '@/context/session-context';
import { serviceAPI } from '@/lib/api';
import { Minus, Plus, ShoppingCart, ArrowLeft, Check, Clock, Shield, Truck, Leaf, AlertCircle, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Define types
type CategoryType = 'men' | 'women' | 'children' | 'household' | 'carpet' | 'shoes';

interface Category {
  id: CategoryType;
  label: string;
  icon: string;
  description: string;
  contactForPricing?: boolean;
}

interface ServiceItem {
  _id: string;
  id?: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  category: string;
  image?: string;
  contactForPricing?: boolean;
}

interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  tagline?: string;
  category: string;
  turnaround?: string;
  features?: string[];
  image?: string;
  icon?: string;
  isActive: boolean;
}

export default function ServiceOrderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addToCart, cartItems } = useCart();
  const { sessionId } = useSession();

  const [service, setService] = useState<Service | null>(null);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<CategoryType>('men');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactItem, setContactItem] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define categories
  const categories: Category[] = [
    { id: 'men', label: 'Men', icon: '👔', description: 'Shirts, pants, suits, and more' },
    { id: 'women', label: 'Women', icon: '👗', description: 'Dresses, blouses, skirts, and more' },
    { id: 'children', label: 'Children', icon: '🧸', description: 'Kids clothing, uniforms, and more' },
    { id: 'household', label: 'Household', icon: '🏠', description: 'Curtains, bedding, towels, and more' },
    { id: 'carpet', label: 'Carpet Cleaning', icon: '🧹', description: 'Professional carpet and rug cleaning', contactForPricing: true },
    { id: 'shoes', label: 'Shoe Cleaning', icon: '👟', description: 'Premium shoe cleaning and restoration', contactForPricing: true },
  ];

  // Default items if API doesn't return any
  const defaultItems: Record<CategoryType, ServiceItem[]> = {
    men: [
      { _id: 'men-shirts', name: 'T-shirts / Polo Shirts', price: 8, unit: 'piece', description: 'Professional pressing and folding', category: 'men' },
      { _id: 'men-formal-shirts', name: 'Formal Shirts', price: 10, unit: 'piece', description: 'Crisp ironing and stain removal', category: 'men' },
      { _id: 'men-pants', name: 'Trousers / Pants', price: 12, unit: 'piece', description: 'Crease-free pressing', category: 'men' },
      { _id: 'men-jeans', name: 'Jeans', price: 15, unit: 'piece', description: 'Color-safe washing', category: 'men' },
      { _id: 'men-kandora', name: 'Kandora / Dishdasha', price: 18, unit: 'piece', description: 'Expert care for traditional wear', category: 'men' },
      { _id: 'men-suits', name: 'Suit (2 piece)', price: 45, unit: 'set', description: 'Expert dry cleaning', category: 'men' },
      { _id: 'men-blazer', name: 'Blazer / Sport Coat', price: 25, unit: 'piece', description: 'Professional care', category: 'men' },
      { _id: 'men-sweater', name: 'Sweater / Jumper', price: 18, unit: 'piece', description: 'Gentle wool care', category: 'men' },
      { _id: 'men-shorts', name: 'Shorts', price: 8, unit: 'piece', description: 'Fresh and clean', category: 'men' },
    ],
    women: [
      { _id: 'women-shirts', name: 'T-shirts / Blouses', price: 8, unit: 'piece', description: 'Gentle fabric care', category: 'women' },
      { _id: 'women-pants', name: 'Trousers / Pants', price: 12, unit: 'piece', description: 'Perfect pressing', category: 'women' },
      { _id: 'women-jeans', name: 'Jeans', price: 15, unit: 'piece', description: 'Color protection', category: 'women' },
      { _id: 'women-abaya', name: 'Abaya', price: 25, unit: 'piece', description: 'Special care for abayas', category: 'women' },
      { _id: 'women-dress-casual', name: 'Casual Dress', price: 20, unit: 'piece', description: 'Gentle washing', category: 'women' },
      { _id: 'women-dress-formal', name: 'Formal Dress / Gown', price: 35, unit: 'piece', description: 'Premium dry cleaning', category: 'women' },
      { _id: 'women-skirt', name: 'Skirt', price: 10, unit: 'piece', description: 'Expert pressing', category: 'women' },
      { _id: 'women-saree', name: 'Saree', price: 40, unit: 'piece', description: 'Traditional saree care', category: 'women' },
      { _id: 'women-lehenga', name: 'Lehenga / Choli', price: 50, unit: 'set', description: 'Special care for wedding wear', category: 'women' },
    ],
    children: [
      { _id: 'kids-shirts', name: 'Kids Shirts', price: 6, unit: 'piece', description: 'Safe for sensitive skin', category: 'children' },
      { _id: 'kids-pants', name: 'Kids Pants', price: 8, unit: 'piece', description: 'Stain removal treatment', category: 'children' },
      { _id: 'kids-uniforms', name: 'School Uniforms', price: 10, unit: 'piece', description: 'Quick turnaround', category: 'children' },
      { _id: 'kids-dress', name: 'Kids Dress', price: 10, unit: 'piece', description: 'Gentle care', category: 'children' },
      { _id: 'kids-jeans', name: 'Kids Jeans', price: 8, unit: 'piece', description: 'Durable cleaning', category: 'children' },
      { _id: 'kids-shorts', name: 'Kids Shorts', price: 5, unit: 'piece', description: 'Fresh and clean', category: 'children' },
    ],
    household: [
      { _id: 'house-bedsheet-single', name: 'Bed Sheet (Single)', price: 15, unit: 'piece', description: 'Crisp and fresh', category: 'household' },
      { _id: 'house-bedsheet-double', name: 'Bed Sheet (Double)', price: 20, unit: 'piece', description: 'Professional pressing', category: 'household' },
      { _id: 'house-bedsheet-king', name: 'Bed Sheet (King)', price: 25, unit: 'piece', description: 'Expert care', category: 'household' },
      { _id: 'house-pillow', name: 'Pillow Cover', price: 6, unit: 'pair', description: 'Clean and fresh', category: 'household' },
      { _id: 'house-duvet', name: 'Duvet / Comforter', price: 45, unit: 'piece', description: 'Deep cleaning', category: 'household' },
      { _id: 'house-towel-bath', name: 'Bath Towel', price: 8, unit: 'piece', description: 'Fluffy and absorbent', category: 'household' },
      { _id: 'house-curtains', name: 'Curtains', price: 30, unit: 'panel', description: 'Dust-free cleaning', category: 'household' },
    ],
    carpet: [
      { _id: 'carpet-area', name: 'Area Rugs', price: 0, unit: 'sq ft', description: 'Professional deep cleaning for area rugs', category: 'carpet', contactForPricing: true },
      { _id: 'carpet-wall-to-wall', name: 'Wall-to-Wall Carpet', price: 0, unit: 'room', description: 'Complete carpet cleaning service', category: 'carpet', contactForPricing: true },
      { _id: 'carpet-stain', name: 'Stain Removal', price: 0, unit: 'stain', description: 'Specialized stain treatment', category: 'carpet', contactForPricing: true },
      { _id: 'carpet-protection', name: 'Carpet Protection', price: 0, unit: 'treatment', description: 'Protective coating application', category: 'carpet', contactForPricing: true },
    ],
    shoes: [
      { _id: 'shoes-sneakers', name: 'Sneakers', price: 0, unit: 'pair', description: 'Deep cleaning and deodorizing for sneakers', category: 'shoes', contactForPricing: true },
      { _id: 'shoes-leather', name: 'Leather Shoes', price: 0, unit: 'pair', description: 'Premium leather cleaning and conditioning', category: 'shoes', contactForPricing: true },
      { _id: 'shoes-suede', name: 'Suede Shoes', price: 0, unit: 'pair', description: 'Specialized suede cleaning and restoration', category: 'shoes', contactForPricing: true },
      { _id: 'shoes-luxury', name: 'Luxury Footwear', price: 0, unit: 'pair', description: 'Premium care for designer shoes', category: 'shoes', contactForPricing: true },
    ],
  };

  useEffect(() => {
    fetchServiceAndItems();
  }, [slug]);

  const fetchServiceAndItems = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch service details
      const servicesData = await serviceAPI.getAllServices();
      let foundService = null;

      if (servicesData.success && servicesData.services) {
        foundService = servicesData.services.find((s: any) => s.slug === slug);
      } else if (Array.isArray(servicesData)) {
        foundService = servicesData.find((s: any) => s.slug === slug);
      }

      if (!foundService) {
        setError('Service not found');
        return;
      }

      setService(foundService);

      // Fetch service items from API
      const itemsData = await serviceAPI.getServiceItems(foundService._id);
      if (itemsData.success && itemsData.items && itemsData.items.length > 0) {
        // Group items by category
        const categorizedItems: Record<string, ServiceItem[]> = {};
        itemsData.items.forEach((item: ServiceItem) => {
          if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
          }
          categorizedItems[item.category].push(item);
        });

        // Update default items with API data
        for (const [category, items] of Object.entries(categorizedItems)) {
          if (defaultItems[category as CategoryType]) {
            // Merge: keep API items that exist, add default ones if missing
            const existingIds = new Set(items.map(i => i._id));
            const mergedItems = [...items];
            for (const defaultItem of defaultItems[category as CategoryType]) {
              if (!existingIds.has(defaultItem._id)) {
                mergedItems.push(defaultItem);
              }
            }
            defaultItems[category as CategoryType] = mergedItems;
          }
        }
      }

    } catch (err: any) {
      console.error('Error fetching service:', err);
      // Don't set error if we have default items - just use defaults
      if (!service) {
        // Try to find service from local data based on slug
        const localService = getLocalServiceBySlug(slug);
        if (localService) {
          setService(localService);
        } else {
          setError(err.message || 'Failed to load service');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback local services
  const getLocalServiceBySlug = (slug: string): Service | null => {
    const localServices: Record<string, Service> = {
      'professional-laundry-services-in-dubai': {
        _id: 'laundry-1',
        name: 'Laundry Services (Wash & Press)',
        slug: 'professional-laundry-services-in-dubai',
        description: 'Professional wash and press for all your clothing needs.',
        tagline: 'Fresh, clean, and perfectly pressed',
        category: 'laundry',
        turnaround: '24-48 hours',
        isActive: true,
      },
      'dry-cleaning-services-in-dubai': {
        _id: 'dry-clean-1',
        name: 'Dry Cleaning Services',
        slug: 'dry-cleaning-services-in-dubai',
        description: 'Expert dry cleaning for delicate and formal garments.',
        tagline: 'Gentle care for delicate fabrics',
        category: 'dry-cleaning',
        turnaround: '24-48 hours',
        isActive: true,
      },
    };
    return localServices[slug] || null;
  };

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const newValue = Math.max(0, current + change);
      if (newValue === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newValue };
    });
  };

  const handleAddToCart = async (item: ServiceItem) => {
    const quantity = quantities[item._id] || 0;
    if (quantity === 0) return;

    try {
      await addToCart({
        id: `${service?._id}-${item._id}`,
        name: `${service?.name} - ${item.name}`,
        price: item.price,
        quantity,
        category: activeCategory,
        description: item.description,
        image: service?.image || service?.icon || '',
        serviceItems: []
      });

      // Show success animation
      setAddedItems(prev => ({ ...prev, [item._id]: true }));
      setSuccessMessage(`Added ${quantity} × ${item.name} to cart!`);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);

      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [item._id]: false }));
      }, 1000);

      // Reset quantity for this item
      setQuantities(prev => {
        const { [item._id]: _, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart');
    }
  };

  // Handle WhatsApp contact for pricing
  const handleWhatsAppContact = (item: ServiceItem) => {
    const phoneNumber = "971501234567";
    const message = encodeURIComponent(
      `Hello, I'm interested in pricing for ${service?.name} - ${item.name}. Please share the pricing details.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setShowContactModal(false);
  };

  const handleCallContact = () => {
    window.location.href = `tel:+971501234567`;
    setShowContactModal(false);
  };

  const getCurrentItems = (): ServiceItem[] => {
    if (serviceItems.length > 0) {
      return serviceItems.filter(item => item.category === activeCategory);
    }
    return defaultItems[activeCategory] || [];
  };

  const getTotalItems = () => {
    const items = getCurrentItems();
    return items.reduce((sum, item) => sum + (quantities[item._id] || 0), 0);
  };

  const getTotalPrice = () => {
    const items = getCurrentItems();
    let total = 0;
    items.forEach((item) => {
      if (!item.contactForPricing) {
        total += (quantities[item._id] || 0) * item.price;
      }
    });
    return total;
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getHeroImage = () => {
    if (service?.image) return service.image;
    const fallbackImages: Record<string, string> = {
      'laundry': '/images/services/laundry.jpg',
      'dry-cleaning': '/images/services/dry-cleaning.jpg',
      'shoe-cleaning': '/images/services/shoe-cleaning.jpg',
      'carpet-cleaning': '/images/services/carpet-cleaning.jpg',
      'curtain-cleaning': '/images/services/curtain-cleaning.jpg',
    };
    return fallbackImages[service?.category || 'laundry'] || '/images/services/placeholder.jpg';
  };

  const currentCategory = categories.find(c => c.id === activeCategory);
  const isContactCategory = currentCategory?.contactForPricing || false;
  const currentItems = getCurrentItems();

  // Loading State
  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Error State
  if (error || !service) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The service you are looking for does not exist.'}</p>
            <Link href="/services">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && contactItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact for Pricing</h3>
                <p className="text-gray-600">
                  For {contactItem.name}, pricing varies based on size, material, and specific requirements.
                  Please contact us directly for a personalized quote.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleWhatsAppContact(contactItem)}
                  className="w-full bg-[#25D366] hover:bg-[#20b859] text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp
                </Button>

                <Button
                  onClick={handleCallContact}
                  variant="outline"
                  className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call for Quote
                </Button>

                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Our team will respond within minutes during business hours
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getHeroImage()}
            alt={service.name}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/images/services/placeholder.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <Link href="/services">
              <button className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{service.tagline || service.description}</p>
            {service.turnaround && (
              <div className="flex items-center gap-2 mt-4">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span className="text-white/80">Turnaround: {service.turnaround}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${activeCategory === category.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  <span className="mr-2 text-xl">{category.icon}</span>
                  <span>{category.label}</span>
                  {category.contactForPricing && (
                    <span className="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                      Contact
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {currentCategory?.description}
            </p>
            {isContactCategory && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Pricing varies based on requirements. Contact us for a personalized quote.</span>
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Grid */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            {item.contactForPricing || isContactCategory ? (
                              <div className="flex items-center gap-2">
                                <span className="text-amber-600 font-semibold">Contact for Price</span>
                                <Phone className="w-4 h-4 text-amber-500" />
                              </div>
                            ) : (
                              <>
                                <span className="text-2xl font-bold text-emerald-600">AED {item.price}</span>
                                <span className="text-sm text-gray-500 ml-1">/{item.unit}</span>
                              </>
                            )}
                          </div>
                          {service.turnaround && !(item.contactForPricing || isContactCategory) && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{service.turnaround}</span>
                            </div>
                          )}
                        </div>

                        {item.contactForPricing || isContactCategory ? (
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => {
                                setContactItem(item);
                                setShowContactModal(true);
                              }}
                              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Contact for Quote
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center bg-gray-100 rounded-xl">
                                <button
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors disabled:opacity-50"
                                  onClick={() => updateQuantity(item._id, -1)}
                                  disabled={!quantities[item._id]}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium text-gray-900">
                                  {quantities[item._id] || 0}
                                </span>
                                <button
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                                  onClick={() => updateQuantity(item._id, 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                className={`flex-1 h-10 rounded-xl font-medium transition-all ${addedItems[item._id]
                                    ? 'bg-emerald-500 text-white'
                                    : quantities[item._id]
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25'
                                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                onClick={() => handleAddToCart(item)}
                                disabled={!quantities[item._id]}
                              >
                                {addedItems[item._id] ? (
                                  <Check className="w-5 h-5 mx-auto" />
                                ) : (
                                  'Add to Cart'
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {currentItems.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Available</h3>
                  <p className="text-gray-500">
                    No items are currently available in this category. Please check another category.
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 text-white">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Order Summary
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {getTotalItems()} items selected
                    </p>
                  </div>

                  <div className="p-6">
                    {/* Current Selection Summary */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Current Selection</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Object.entries(quantities).map(([itemId, qty]) => {
                          const item = currentItems.find(i => i._id === itemId);
                          if (!item || item.contactForPricing) return null;
                          return (
                            <div key={itemId} className="flex justify-between text-sm py-1">
                              <span className="text-gray-600">
                                {item.name} x{qty}
                              </span>
                              <span className="font-medium text-gray-900">
                                AED {(item.price * qty).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                        {Object.keys(quantities).filter(key => {
                          const item = currentItems.find(i => i._id === key);
                          return item && !item.contactForPricing;
                        }).length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                              No items selected
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="font-semibold text-lg text-gray-900">{getTotalItems()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                        <span className="text-2xl font-bold text-emerald-600">AED {getTotalPrice()}</span>
                      </div>

                      <Link href="/cart">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-medium rounded-xl mb-3">
                          View Cart ({getCartCount()} items)
                        </Button>
                      </Link>

                      <Link href="/checkout">
                        <Button variant="outline" className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-6 text-lg font-medium rounded-xl">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Service Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Truck className="w-4 h-4 text-emerald-600" />
                          <span>Free pickup</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span>{service.turnaround || '24hr'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="w-4 h-4 text-emerald-600" />
                          <span>Quality assured</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Leaf className="w-4 h-4 text-emerald-600" />
                          <span>Eco-friendly</span>
                        </div>
                      </div>
                    </div>

                    {/* Info Note */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-800">
                        💡 <strong>Note:</strong> All items are professionally cleaned, pressed, and folded. Free pickup and delivery included.
                      </p>
                    </div>

                    {/* WhatsApp Support */}
                    <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-800">Need help?</span>
                      </div>
                      <button
                        onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                        className="text-xs text-green-600 font-semibold hover:underline"
                      >
                        Chat with us
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}