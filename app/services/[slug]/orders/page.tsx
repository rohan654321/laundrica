// app/services/[slug]/orders/page.tsx
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
import { Star, ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
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
              <Button>Back to Services</Button>
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

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center justify-center px-6" 
        style={{ backgroundImage: "url('/images/redesign/about-banner.png')" }}>
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center z-30">
          <p>Professional Laundry <span className="text-[#FFFF00]">Services Designed for Your Lifestyle</span></p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5 w-full">
        <nav className="flex items-center space-x-2 text-black">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <span>/</span>
          <span className="text-primary capitalize">Order</span>
        </nav>
      </div>

      {/* Service Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex max-w-fit mx-auto px-10 py-5 gap-3 overflow-x-scroll lg:overflow-hidden">
          {services.map((s) => (
            <Link key={s.id} href={`/services/${s.slug}/orders`}>
              <div className={`relative w-[110px] p-3 transition-colors duration-300 flex flex-col items-center group justify-start gap-3 border border-primary text-center font-medium rounded text-base ${
                s.slug === slug 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-50 text-foreground/70 hover:bg-primary hover:text-white'
              }`}>
                <Image 
                  src={s.icon} 
                  alt={s.name} 
                  width={32} 
                  height={32}
                  className={`w-8 h-8 transition-all duration-300 ${
                    s.slug === slug ? 'invert brightness-0 sepia hue-rotate-[120deg] saturate-[10]' : ''
                  }`}
                />
                <span className="text-xs">{s.name.split(' ')[0]}</span>
                {s.slug === slug && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary block"></div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

{/* Main Content */}
<section className="min-h-screen bg-white py-8">
  <div className="max-w-7xl mx-auto px-4">
    {/* Service Header */}
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      {/* ... header content ... */}
    </div>

    {/* Order Form */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items Grid - Left Column */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="men" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 gap-2 p-4 bg-white border-b">
                <TabsTrigger value="men" className="data-[state=active]:bg-primary data-[state=active]:text-white">Men</TabsTrigger>
                <TabsTrigger value="women" className="data-[state=active]:bg-primary data-[state=active]:text-white">Women</TabsTrigger>
                <TabsTrigger value="children" className="data-[state=active]:bg-primary data-[state=active]:text-white">Children</TabsTrigger>
                <TabsTrigger value="household" className="data-[state=active]:bg-primary data-[state=active]:text-white">Household</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="men" className="p-4">
                  <motion.div 
                    key="men"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 gap-4"
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

                {/* Other TabsContent components... */}
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary - Right Column - FIX THIS PART */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span>Total Items:</span>
                <span className="font-semibold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-primary">AED {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Link href="/cart">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white mb-3">
                View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Button>
            </Link>
            <Link href="/checkout">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Proceed to Checkout
              </Button>
            </Link>
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

// Service Item Card Component
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
    <Card className="border border-primary hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col">
        <div className="flex-grow flex flex-col items-center text-center mb-3">
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-sm text-foreground/70 mb-2">{item.description}</p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-primary font-bold text-lg">AED {item.price}<span className="text-sm font-normal text-foreground/70"> /{item.unit}</span></p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => onUpdateQuantity(-1)}
                disabled={quantity === 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => onUpdateQuantity(1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white rounded"
              onClick={onAddToCart}
              disabled={quantity === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}