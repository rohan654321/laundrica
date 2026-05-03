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
import { Minus, Plus, ShoppingCart, ArrowLeft, Check, Clock, Shield, Truck, Leaf, AlertCircle, Phone, MessageCircle, Sparkles, Trash2, MapPin } from 'lucide-react';
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

// Define which categories belong to which service type
const SERVICE_CATEGORY_MAP: Record<string, CategoryType[]> = {
  'laundry': ['men', 'women', 'children', 'household'],
  'dry-cleaning': ['men', 'women', 'children', 'household'],
  'carpet-cleaning': ['carpet'],
  'shoe-cleaning': ['shoes'],
  'curtain-cleaning': ['household'],
  'commercial': ['men', 'women', 'household'],
};

// Default categories with their details
const ALL_CATEGORIES: Record<CategoryType, Category> = {
  men: { id: 'men', label: 'Men', icon: '👔', description: 'Shirts, pants, suits, and more' },
  women: { id: 'women', label: 'Women', icon: '👗', description: 'Dresses, blouses, skirts, and more' },
  children: { id: 'children', label: 'Children', icon: '🧸', description: 'Kids clothing, uniforms, and more' },
  household: { id: 'household', label: 'Household', icon: '🏠', description: 'Curtains, bedding, towels, and more' },
  carpet: { id: 'carpet', label: 'Carpet Cleaning', icon: '🧹', description: 'Professional carpet and rug cleaning', contactForPricing: true },
  shoes: { id: 'shoes', label: 'Shoe Cleaning', icon: '👟', description: 'Premium shoe cleaning and restoration', contactForPricing: true },
};

// Default items for each category
const DEFAULT_ITEMS: Record<CategoryType, ServiceItem[]> = {
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

export default function ServiceOrderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addToCart, cartItems = [], updateQuantity, removeFromCart } = useCart();
  const { sessionId } = useSession();

  const [service, setService] = useState<Service | null>(null);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('men');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactItem, setContactItem] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  // Get the categories available for this service type
  const getAvailableCategories = (): Category[] => {
    if (!service) return [];

    const serviceType = service.category;
    const categoryIds = SERVICE_CATEGORY_MAP[serviceType] || SERVICE_CATEGORY_MAP['laundry'];

    return categoryIds.map(id => ALL_CATEGORIES[id]);
  };

  const availableCategories = getAvailableCategories();

  // Set default active category when service loads
  useEffect(() => {
    if (availableCategories.length > 0) {
      setActiveCategory(availableCategories[0].id);
    }
  }, [service]);

  useEffect(() => {
    const newQuantities: Record<string, number> = {};
    if (Array.isArray(cartItems)) {
      cartItems.forEach((item: any) => {
        if (item && item.id && typeof item.id === 'string') {
          const parts = item.id.split('-');
          if (parts.length > 1) {
            const itemId = parts[1];
            if (itemId) {
              newQuantities[itemId] = item.quantity;
            }
          }
        }
      });
    }
    setLocalQuantities(newQuantities);
  }, [cartItems]);

  const getCartQuantity = (itemId: string) => {
    return localQuantities[itemId] || 0;
  };

  useEffect(() => {
    fetchServiceAndItems();
  }, [slug]);

  const fetchServiceAndItems = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

      try {
        const itemsData = await serviceAPI.getServiceItems(foundService._id);
        if (itemsData && itemsData.success && itemsData.items && itemsData.items.length > 0) {
          setServiceItems(itemsData.items);
        }
      } catch (itemsError) {
        console.log('No service items found, using defaults');
      }

    } catch (err: any) {
      console.error('Error fetching service:', err);
      if (!service) {
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
      'carpet-cleaning-services-in-dubai': {
        _id: 'carpet-1',
        name: 'Carpet Cleaning Services',
        slug: 'carpet-cleaning-services-in-dubai',
        description: 'Professional deep cleaning for carpets and rugs.',
        tagline: 'Deep clean, fresh carpets',
        category: 'carpet-cleaning',
        turnaround: '24-48 hours',
        isActive: true,
      },
      'shoe-cleaning-services-in-dubai': {
        _id: 'shoe-1',
        name: 'Shoe Cleaning Services',
        slug: 'shoe-cleaning-services-in-dubai',
        description: 'Premium shoe cleaning and restoration.',
        tagline: 'Like new, every time',
        category: 'shoe-cleaning',
        turnaround: '24-48 hours',
        isActive: true,
      },
    };
    return localServices[slug] || null;
  };

  const handleIncrement = async (item: ServiceItem) => {
    const currentQty = getCartQuantity(item._id);
    const newQty = currentQty + 1;
    const cartItemId = `${service?._id}-${item._id}`;

    setLocalQuantities(prev => ({ ...prev, [item._id]: newQty }));

    try {
      await addToCart({
        id: cartItemId,
        name: `${service?.name} - ${item.name}`,
        price: item.price,
        quantity: newQty,
        category: activeCategory,
        description: item.description,
        image: service?.image || service?.icon || '',
        serviceItems: []
      });

      setSuccessMessage(`${item.name} added to cart`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 1500);
    } catch (err) {
      setLocalQuantities(prev => ({ ...prev, [item._id]: currentQty }));
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart');
    }
  };

  const handleDecrement = async (item: ServiceItem) => {
    const currentQty = getCartQuantity(item._id);
    if (currentQty === 0) return;

    const newQty = currentQty - 1;
    const cartItemId = `${service?._id}-${item._id}`;

    if (newQty === 0) {
      setLocalQuantities(prev => {
        const { [item._id]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setLocalQuantities(prev => ({ ...prev, [item._id]: newQty }));
    }

    try {
      if (newQty === 0) {
        removeFromCart(cartItemId);
        setSuccessMessage(`${item.name} removed from cart`);
      } else {
        updateQuantity(cartItemId, newQty);
        setSuccessMessage(`${item.name} quantity updated`);
      }
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 1500);
    } catch (err) {
      setLocalQuantities(prev => ({ ...prev, [item._id]: currentQty }));
      console.error('Error updating cart:', err);
      toast.error('Failed to update cart');
    }
  };

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
    // First try to get items from API
    if (serviceItems.length > 0) {
      const filtered = serviceItems.filter(item => item.category === activeCategory);
      if (filtered.length > 0) return filtered;
    }
    // Fallback to default items
    return DEFAULT_ITEMS[activeCategory] || [];
  };

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : 0;
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'fresh10') {
      setPromoApplied(true);
      toast.success('Promo code applied! 10% discount');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const currentCategory = availableCategories.find(c => c.id === activeCategory);
  const isContactCategory = currentCategory?.contactForPricing || false;
  const currentItems = getCurrentItems();
  const cartItemsCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Get hero image based on service category
  const getHeroImage = () => {
    if (service?.image) return service.image;
    const imageMap: Record<string, string> = {
      'laundry': '/images/laundry.jpg',
      'dry-cleaning': '/images/dryCleaning.jpg',
      'carpet-cleaning': '/images/carpetCleaning.jpg',
      'shoe-cleaning': '/images/shoeCleaning.jpg',
      'curtain-cleaning': '/images/curtainCleaning.jpg',
      'commercial': '/images/commercialCleaning.jpg',
    };
    return imageMap[service?.category || 'laundry'] || '/images/laundry.jpg';
  };

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0  border-4 border-emerald-100"></div>
              <div className="absolute inset-0  border-4 border-t-emerald-600 animate-spin"></div>
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

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            key="success-toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
          >
            <Check className="w-4 h-4" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactModal && contactItem && (
          <motion.div
            key="contact-modal"
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

      {/* Hero Banner Section - Same size as About Page */}
      <section>
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{ backgroundImage: `url('${getHeroImage()}')` }}
        >
          {/* LEFT GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d2a]/85 via-[#0b3d2a]/55 to-transparent" />

          {/* BOTTOM GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d2a]/75 via-transparent to-transparent" />

          {/* BACK BUTTON - TOP LEFT CORNER */}
          <Link href="/services">
            <button className="absolute top-6 left-6 z-40 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </Link>

          {/* CENTERED CONTENT */}
          <div className="relative z-30 w-full max-w-10xl mx-auto px-6">
            <div className="max-w-7xl">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {service.name}
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-7xl leading-relaxed">
                {service.tagline || service.description}
              </p>
              {service.turnaround && (
                <div className="flex items-center gap-2 mt-5">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/80 text-sm sm:text-base">
                    Turnaround: {service.turnaround}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation - Only show categories for this service */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {availableCategories.map((category) => (
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
                <div className="grid md:grid-cols-2 gap-4">
                  {currentItems.map((item, index) => {
                    const cartQty = getCartQuantity(item._id);
                    return (
                      <motion.div
                        key={item._id}
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
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center bg-gray-100 rounded-xl">
                                <button
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors disabled:opacity-50 rounded-l-xl"
                                  onClick={() => handleDecrement(item)}
                                  disabled={cartQty === 0}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">
                                  {cartQty}
                                </span>
                                <button
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors rounded-r-xl"
                                  onClick={() => handleIncrement(item)}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {cartQty > 0 && (
                                <span className="text-xs text-emerald-600 font-medium">
                                  In Cart
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

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

              {/* Order Summary / Cart */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Your Cart
                          </h3>
                          <p className="text-white/80 text-sm mt-0.5">
                            {cartItemsCount} items
                          </p>
                        </div>
                        {Array.isArray(cartItems) && cartItems.length > 0 && (
                          <Button
                            onClick={() => {
                              if (Array.isArray(cartItems)) {
                                cartItems.forEach(item => {
                                  if (item && item.id) {
                                    removeFromCart(item.id);
                                    const parts = item.id.split('-');
                                    if (parts.length > 1) {
                                      const itemId = parts[1];
                                      setLocalQuantities(prev => {
                                        const { [itemId]: _, ...rest } = prev;
                                        return rest;
                                      });
                                    }
                                  }
                                });
                              }
                            }}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-1.5 text-sm"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Cart Items List */}
                      <div className="mb-5 max-h-80 overflow-y-auto">
                        {!Array.isArray(cartItems) || cartItems.length === 0 ? (
                          <div className="text-center py-8">
                            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Your cart is empty</p>
                            <p className="text-xs text-gray-400 mt-1">Click + to add items</p>
                          </div>
                        ) : (
                          cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-500">AED {item.price} each</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center bg-gray-100 rounded-lg">
                                  <button
                                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors rounded-l-lg"
                                    onClick={() => {
                                      const newQty = item.quantity - 1;
                                      if (newQty === 0) {
                                        removeFromCart(item.id);
                                        const parts = item.id.split('-');
                                        if (parts.length > 1) {
                                          const itemId = parts[1];
                                          setLocalQuantities(prev => {
                                            const { [itemId]: _, ...rest } = prev;
                                            return rest;
                                          });
                                        }
                                      } else {
                                        updateQuantity(item.id, newQty);
                                        const parts = item.id.split('-');
                                        if (parts.length > 1) {
                                          const itemId = parts[1];
                                          setLocalQuantities(prev => ({ ...prev, [itemId]: newQty }));
                                        }
                                      }
                                    }}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center text-sm font-medium text-gray-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors rounded-r-lg"
                                    onClick={() => {
                                      updateQuantity(item.id, item.quantity + 1);
                                      const parts = item.id.split('-');
                                      if (parts.length > 1) {
                                        const itemId = parts[1];
                                        setLocalQuantities(prev => ({ ...prev, [itemId]: item.quantity + 1 }));
                                      }
                                    }}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                                  onClick={() => {
                                    removeFromCart(item.id);
                                    const parts = item.id.split('-');
                                    if (parts.length > 1) {
                                      const itemId = parts[1];
                                      setLocalQuantities(prev => {
                                        const { [itemId]: _, ...rest } = prev;
                                        return rest;
                                      });
                                    }
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Promo Code */}
                      {Array.isArray(cartItems) && cartItems.length > 0 && (
                        <div className="mb-5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Promo code"
                              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              disabled={promoApplied}
                            />
                            <Button
                              onClick={handleApplyPromo}
                              disabled={promoApplied}
                              className="bg-gray-800 hover:bg-gray-900 text-white px-4 rounded-xl text-sm"
                            >
                              Apply
                            </Button>
                          </div>
                          {promoApplied && (
                            <p className="text-xs text-emerald-600 mt-2">✓ 10% discount applied</p>
                          )}
                        </div>
                      )}

                      {/* Summary Details */}
                      {Array.isArray(cartItems) && cartItems.length > 0 && (
                        <>
                          <div className="space-y-2 mb-5 pt-2 border-t border-gray-100">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Subtotal</span>
                              <span className="font-medium">AED {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Delivery Fee</span>
                              <span className="font-medium">
                                {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}
                              </span>
                            </div>
                            {promoApplied && (
                              <div className="flex justify-between text-sm text-emerald-600">
                                <span>Discount (10%)</span>
                                <span className="font-medium">-AED {discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="pt-2 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <span className="text-base font-semibold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-emerald-600">AED {total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Free Delivery Progress */}
                          {subtotal < 100 && (
                            <div className="mb-5 p-3 bg-emerald-50 rounded-xl">
                              <p className="text-xs text-gray-600 mb-2">
                                Add AED {(100 - subtotal).toFixed(2)} more for free delivery
                              </p>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                                  className="h-full bg-emerald-600 rounded-full"
                                />
                              </div>
                            </div>
                          )}

                          {/* Checkout Button */}
                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-base font-medium rounded-xl mb-3"
                            onClick={handleProceedToCheckout}
                            disabled={isCheckingOut || !Array.isArray(cartItems) || cartItems.length === 0}
                          >
                            {isCheckingOut ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                              </div>
                            ) : (
                              'Proceed to Checkout'
                            )}
                          </Button>

                          {/* Trust Badges */}
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                              <Shield className="w-4 h-4 mx-auto mb-0.5 text-emerald-600" />
                              <p className="text-[10px] text-gray-600">Secure</p>
                            </div>
                            <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                              <Truck className="w-4 h-4 mx-auto mb-0.5 text-emerald-600" />
                              <p className="text-[10px] text-gray-600">Free*</p>
                            </div>
                            <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                              <Clock className="w-4 h-4 mx-auto mb-0.5 text-emerald-600" />
                              <p className="text-[10px] text-gray-600">24-48h</p>
                            </div>
                            <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                              <Leaf className="w-4 h-4 mx-auto mb-0.5 text-emerald-600" />
                              <p className="text-[10px] text-gray-600">Eco</p>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div className="p-2.5 bg-emerald-50 rounded-lg flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                            <p className="text-[11px] text-gray-600">
                              Free delivery on orders AED 100+. Estimated 24-48 hours.
                            </p>
                          </div>
                        </>
                      )}

                      {/* WhatsApp Support */}
                      <div className={`mt-4 p-3 bg-green-50 rounded-lg flex items-center justify-between ${(!Array.isArray(cartItems) || cartItems.length === 0) ? 'mt-0' : ''}`}>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}