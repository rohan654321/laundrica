'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { services } from '@/lib/services-data';
import { useCart } from '@/context/cart-context';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export default function ServiceOrderPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);
  const { addToCart, cartItems } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState('men');

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button className="bg-secondary-green hover:bg-green-700 text-white">Back to Services</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 0;
    if (quantity === 0) return;

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      category: activeTab as 'men' | 'women' | 'children' | 'household',
      description: item.description,
      image: ''
    });

    // Reset quantity for this item
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
    if (activeTab === 'men') {
      service.items.men.forEach(item => {
        total += (quantities[item.id] || 0) * item.price;
      });
    } else if (activeTab === 'women') {
      service.items.women.forEach(item => {
        total += (quantities[item.id] || 0) * item.price;
      });
    } else if (activeTab === 'children') {
      service.items.children.forEach(item => {
        total += (quantities[item.id] || 0) * item.price;
      });
    } else if (activeTab === 'household') {
      service.items.household.forEach(item => {
        total += (quantities[item.id] || 0) * item.price;
      });
    }
    return total;
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner - Fixed with correct path and overlay */}
      <section className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6" 
        style={{ backgroundImage: "url('/images/redesign/about-banner.png')" }}>
        <div className="text-white text-base sm:text-2xl md:text-3xl space-y-5 font-medium flex flex-col justify-center text-center items-center z-30">
          <p>Professional Laundry <span className="text-[#FFFF00]">Services Designed for Your Lifestyle</span></p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link href="/" className="hover:text-green-400 text-sm sm:text-base transition-colors">Home</Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <Link href="/services" className="hover:text-green-400 text-sm sm:text-base transition-colors">Services</Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">Order</span>
        </nav>
      </div>

      {/* Service Navigation Tabs - Fixed styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {services.map((s) => (
            <Link key={s.id} href={`/services/${s.slug}/orders`}>
              <div className={`relative px-6 py-3 transition-colors duration-300 flex flex-col items-center group justify-center gap-2 border rounded-md text-center font-medium ${
                s.slug === slug 
                  ? 'bg-primary-green text-white border-primary-green' 
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-primary-green hover:text-white hover:border-primary-green'
              }`}>
                <Image 
                  src={s.icon} 
                  alt={s.name} 
                  width={32} 
                  height={32}
                  className={`w-8 h-8 transition-all duration-300 ${
                    s.slug === slug ? 'brightness-0 invert' : ''
                  }`}
                />
                <span className="text-sm whitespace-nowrap">{s.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Service Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl text-primary-green font-medium text-center">
              {service.name} <span className="text-secondary-green">Pricing</span>
            </h1>
            <p className="text-lg my-3 font-medium text-gray-600 text-center">{service.tagline}</p>
          </div>

          {/* Order Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Grid - Left Column */}
            <div className="lg:col-span-2">
              <Card className="border border-primary-green/20">
                <CardContent className="p-0">
                  <Tabs defaultValue="men" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-4 gap-1 p-4 bg-gray-50 border-b">
                      <TabsTrigger 
                        value="men" 
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green py-2 rounded-md transition-all"
                      >
                        Men
                      </TabsTrigger>
                      <TabsTrigger 
                        value="women" 
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green py-2 rounded-md transition-all"
                      >
                        Women
                      </TabsTrigger>
                      <TabsTrigger 
                        value="children" 
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green py-2 rounded-md transition-all"
                      >
                        Children
                      </TabsTrigger>
                      <TabsTrigger 
                        value="household" 
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green py-2 rounded-md transition-all"
                      >
                        Household
                      </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                      <TabsContent value="men" className="p-6">
                        <motion.div 
                          key="men"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid md:grid-cols-2 gap-6"
                        >
                          {service.items.men.map((item) => (
                            <ServiceItemCard
                              key={item.id}
                              item={item}
                              quantity={quantities[item.id] || 0}
                              onUpdateQuantity={(change) => updateQuantity(item.id, change)}
                              onAddToCart={() => handleAddToCart(item)}
                            />
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="women" className="p-6">
                        <motion.div 
                          key="women"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid md:grid-cols-2 gap-6"
                        >
                          {service.items.women.map((item) => (
                            <ServiceItemCard
                              key={item.id}
                              item={item}
                              quantity={quantities[item.id] || 0}
                              onUpdateQuantity={(change) => updateQuantity(item.id, change)}
                              onAddToCart={() => handleAddToCart(item)}
                            />
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="children" className="p-6">
                        <motion.div 
                          key="children"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid md:grid-cols-2 gap-6"
                        >
                          {service.items.children.map((item) => (
                            <ServiceItemCard
                              key={item.id}
                              item={item}
                              quantity={quantities[item.id] || 0}
                              onUpdateQuantity={(change) => updateQuantity(item.id, change)}
                              onAddToCart={() => handleAddToCart(item)}
                            />
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="household" className="p-6">
                        <motion.div 
                          key="household"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid md:grid-cols-2 gap-6"
                        >
                          {service.items.household.map((item) => (
                            <ServiceItemCard
                              key={item.id}
                              item={item}
                              quantity={quantities[item.id] || 0}
                              onUpdateQuantity={(change) => updateQuantity(item.id, change)}
                              onAddToCart={() => handleAddToCart(item)}
                            />
                          ))}
                        </motion.div>
                      </TabsContent>
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary - Right Column - Fixed styling */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border border-primary-green/20 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary-green">
                    <ShoppingCart className="w-5 h-5" />
                    Order Summary
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-semibold text-primary-green">{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span className="text-gray-700">Total Price:</span>
                      <span className="text-secondary-green">AED {getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/cart">
                      <Button className="w-full bg-secondary-green hover:bg-green-700 text-white py-6 text-base font-medium">
                        View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </Button>
                    </Link>
                    <Link href="/checkout">
                      <Button variant="outline" className="w-full border-primary-green text-primary-green hover:bg-primary-green/10 py-6 text-base font-medium">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Service Item Card Component - Fixed styling to match design
function ServiceItemCard({ 
  item, 
  quantity, 
  onUpdateQuantity, 
  onAddToCart 
}: { 
  item: any; 
  quantity: number; 
  onUpdateQuantity: (change: number) => void; 
  onAddToCart: () => void;
}) {
  return (
    <Card className="border border-gray-200 hover:border-primary-green hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5">
        <div className="mb-4">
          <h4 className="font-semibold text-lg text-primary-green mb-1">{item.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-secondary-green font-bold text-xl">AED {item.price}</span>
            <span className="text-sm text-gray-500 ml-1">/{item.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-full border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              onClick={() => onUpdateQuantity(-1)}
              disabled={quantity === 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-medium min-w-[2rem] text-center text-lg">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-full border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              onClick={() => onUpdateQuantity(1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            className="bg-secondary-green hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={onAddToCart}
            disabled={quantity === 0}
          >
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}