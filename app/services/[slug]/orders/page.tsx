// app/services/[slug]/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/lib/services-data';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { OTPLoginModal } from '@/components/auth/otp-login-modal';
import { Minus, Plus, ShoppingCart, ArrowLeft, Check, Clock, Shield, Truck, Leaf, AlertCircle } from 'lucide-react';

// Define the category type to match your CartCategory
type CategoryType = 'men' | 'women' | 'children' | 'household';

interface Category {
  id: CategoryType;
  label: string;
  icon: string;
  description: string;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  image?: string;
}

export default function ServiceOrderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);
  const { addToCart, cartItems } = useCart();
  const { isAuthenticated, requireAuth } = useAuth();
  
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<CategoryType>('men');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<ServiceItem | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show success toast
  const showToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
            <Link href="/services">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const categories: Category[] = [
    { id: 'men', label: 'Men', icon: '👔', description: 'Shirts, pants, suits, and more' },
    { id: 'women', label: 'Women', icon: '👗', description: 'Dresses, blouses, skirts, and more' },
    { id: 'children', label: 'Children', icon: '🧸', description: 'Kids clothing, uniforms, and more' },
    { id: 'household', label: 'Household', icon: '🏠', description: 'Curtains, bedding, towels, and more' },
  ];

  // Default items for each category if not provided in service data
  const defaultItems: Record<CategoryType, ServiceItem[]> = {
    men: [
      { id: 'men-shirts', name: 'Shirts', price: 8, unit: 'piece', description: 'Professional pressing and folding' },
      { id: 'men-pants', name: 'Pants/Trousers', price: 12, unit: 'piece', description: 'Stain removal and crease-free' },
      { id: 'men-suits', name: 'Suits/Blazers', price: 25, unit: 'piece', description: 'Expert dry cleaning' },
      { id: 'men-jeans', name: 'Jeans', price: 10, unit: 'piece', description: 'Color-safe washing' },
    ],
    women: [
      { id: 'women-dresses', name: 'Dresses', price: 15, unit: 'piece', description: 'Delicate fabric care' },
      { id: 'women-blouses', name: 'Blouses', price: 10, unit: 'piece', description: 'Gentle hand wash option' },
      { id: 'women-skirts', name: 'Skirts', price: 12, unit: 'piece', description: 'Professional pressing' },
      { id: 'women-sarees', name: 'Sarees', price: 20, unit: 'piece', description: 'Expert saree cleaning' },
    ],
    children: [
      { id: 'kids-shirts', name: 'Kids Shirts', price: 6, unit: 'piece', description: 'Safe for sensitive skin' },
      { id: 'kids-pants', name: 'Kids Pants', price: 8, unit: 'piece', description: 'Stain removal treatment' },
      { id: 'kids-uniforms', name: 'School Uniforms', price: 10, unit: 'piece', description: 'Quick turnaround' },
      { id: 'kids-sweaters', name: 'Sweaters', price: 12, unit: 'piece', description: 'Gentle wool care' },
    ],
    household: [
      { id: 'house-curtains', name: 'Curtains', price: 25, unit: 'pair', description: 'Professional cleaning and ironing' },
      { id: 'house-bedding', name: 'Bed Sheets', price: 15, unit: 'set', description: 'Fresh and crisp finish' },
      { id: 'house-towels', name: 'Towels', price: 8, unit: 'piece', description: 'Fluffy and absorbent' },
      { id: 'house-cushions', name: 'Cushion Covers', price: 10, unit: 'set', description: 'Stain removal' },
    ],
  };

  const items = service.items?.[activeCategory] || defaultItems[activeCategory];

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

  const handleAddToCart = (item: ServiceItem) => {
    const quantity = quantities[item.id] || 0;
    if (quantity === 0) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      setPendingItem(item);
      setShowLoginModal(true);
      return;
    }

    // Add to cart
    addToCart({
      id: `${service.id}-${item.id}`,
      name: `${service.name} - ${item.name}`,
      price: item.price,
      quantity,
      category: activeCategory,
      description: item.description,
      image: service.icon || ''
    });

    // Show success animation
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    showToast(`Added ${quantity} × ${item.name} to cart!`);
    
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1000);

    // Reset quantity for this item
    setQuantities(prev => {
      const { [item.id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleLoginSuccess = () => {
    if (pendingItem) {
      const quantity = quantities[pendingItem.id] || 0;
      if (quantity > 0) {
        addToCart({
          id: `${service.id}-${pendingItem.id}`,
          name: `${service.name} - ${pendingItem.name}`,
          price: pendingItem.price,
          quantity,
          category: activeCategory,
          description: pendingItem.description,
          image: service.icon || ''
        });
        setAddedItems(prev => ({ ...prev, [pendingItem.id]: true }));
        showToast(`Added ${quantity} × ${pendingItem.name} to cart!`);
        setTimeout(() => {
          setAddedItems(prev => ({ ...prev, [pendingItem.id]: false }));
        }, 1000);
        setQuantities(prev => {
          const { [pendingItem.id]: _, ...rest } = prev;
          return rest;
        });
      }
      setPendingItem(null);
    }
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    items.forEach((item: ServiceItem) => {
      total += (quantities[item.id] || 0) * item.price;
    });
    return total;
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

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

      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
        </motion.div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <Link 
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Service</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{service.tagline}</p>
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
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="mr-2 text-xl">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
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
                  {items.map((item: ServiceItem, index: number) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-green-600">AED {item.price}</span>
                            <span className="text-sm text-gray-500 ml-1">/{item.unit}</span>
                          </div>
                          {service.turnaround && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{service.turnaround}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-xl">
                            <button
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={!quantities[item.id]}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {quantities[item.id] || 0}
                            </span>
                            <button
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            className={`flex-1 h-10 rounded-xl font-medium transition-all ${
                              addedItems[item.id]
                                ? 'bg-green-500 text-white'
                                : quantities[item.id]
                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() => handleAddToCart(item)}
                            disabled={!quantities[item.id]}
                          >
                            {addedItems[item.id] ? (
                              <Check className="w-5 h-5 mx-auto" />
                            ) : (
                              'Add to Cart'
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State for Category */}
              {items.length === 0 && (
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
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
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
                          const item = items.find(
                            (i: ServiceItem) => i.id === itemId
                          );
                          if (!item) return null;
                          return (
                            <div key={itemId} className="flex justify-between text-sm py-1">
                              <span className="text-gray-600">
                                {item.name} x{qty}
                              </span>
                              <span className="font-medium text-gray-900">
                                AED {item.price * qty}
                              </span>
                            </div>
                          );
                        })}
                        {Object.keys(quantities).length === 0 && (
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
                        <span className="text-2xl font-bold text-green-600">AED {getTotalPrice()}</span>
                      </div>

                      <Link href="/cart">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-medium rounded-xl mb-3">
                          View Cart ({getCartCount()} items)
                        </Button>
                      </Link>
                      
                      <Link href="/checkout">
                        <Button variant="outline" className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-6 text-lg font-medium rounded-xl">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Service Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Truck className="w-4 h-4 text-green-600" />
                          <span>Free pickup</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span>{service.turnaround}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>Quality assured</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Leaf className="w-4 h-4 text-green-600" />
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
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTP Login Modal */}
      <OTPLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingItem(null);
        }}
        onSuccess={handleLoginSuccess}
        message="Please login to add items to your cart"
      />

      <Footer />
    </main>
  );
}