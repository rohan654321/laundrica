// app/services/[slug]/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { services } from '@/lib/services-data';
import { useCart } from '@/context/cart-context';
import { Minus, Plus, ShoppingCart, ArrowLeft, Check, Clock, Shield, Truck, Leaf } from 'lucide-react';

// Define the category type to match your CartCategory
type CategoryType = 'men' | 'women' | 'children' | 'household';

interface Category {
  id: CategoryType;
  label: string;
  icon: string;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export default function ServiceOrderPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);
  const { addToCart, cartItems } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<CategoryType>('men');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
            <Link href="/services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl">
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
    { id: 'men', label: 'Men', icon: '👔' },
    { id: 'women', label: 'Women', icon: '👗' },
    { id: 'children', label: 'Children', icon: '🧸' },
    { id: 'household', label: 'Household', icon: '🏠' },
  ];

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

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      category: activeCategory, // Now this is properly typed as CategoryType
      description: item.description,
      image: ''
    });

    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1000);

    setQuantities(prev => {
      const { [item.id]: _, ...rest } = prev;
      return rest;
    });
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    const items = service.items[activeCategory] || [];
    items.forEach((item: ServiceItem) => {
      total += (quantities[item.id] || 0) * item.price;
    });
    return total;
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Parallax */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
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
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
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
                  {service.items[activeCategory]?.map((item: ServiceItem) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">AED {item.price}</span>
                            <span className="text-sm text-gray-500 ml-1">/{item.unit}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-xl">
                            <button
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={!quantities[item.id]}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {quantities[item.id] || 0}
                            </span>
                            <button
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
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
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Order Summary
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    {/* Current Selection Summary */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Current Selection</h4>
                      <div className="space-y-2">
                        {Object.entries(quantities).map(([itemId, qty]) => {
                          const item = service.items[activeCategory]?.find(
                            (i: ServiceItem) => i.id === itemId
                          );
                          if (!item) return null;
                          return (
                            <div key={itemId} className="flex justify-between text-sm">
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
                        <span className="text-2xl font-bold text-blue-600">AED {getTotalPrice()}</span>
                      </div>

                      <Link href="/cart">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium rounded-xl mb-3">
                          View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                        </Button>
                      </Link>
                      
                      <Link href="/checkout">
                        <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-6 text-lg font-medium rounded-xl">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <span>Free pickup</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>24-48 hrs</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>Quality assured</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Leaf className="w-4 h-4 text-blue-600" />
                        <span>Eco-friendly</span>
                      </div>
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