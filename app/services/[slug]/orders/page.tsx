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
import { Minus, Plus, ShoppingCart, ArrowLeft, Check, Clock, Shield, Truck, Leaf, Award, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';

export default function ServiceOrderPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);
  const { addToCart, cartItems } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState('men');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
            <Link href="/services">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg">
                Back to Services
              </Button>
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
    if (quantity === 0) {
      toast.error('Please select a quantity first', {
        style: {
          borderRadius: '10px',
          background: 'var(--destructive)',
          color: 'var(--destructive-foreground)',
        }
      });
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      category: activeTab as 'men' | 'women' | 'children' | 'household',
      description: item.description,
      image: ''
    });

    // Show success animation
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1000);

    // Reset quantity for this item
    setQuantities(prev => {
      const { [item.id]: _, ...rest } = prev;
      return rest;
    });

    toast.success(`Added ${quantity} ${item.name} to cart`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: 'var(--primary)',
        color: 'var(--primary-foreground)',
      }
    });
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    const items = service.items[activeTab as keyof typeof service.items] || [];
    items.forEach((item: any) => {
      total += (quantities[item.id] || 0) * item.price;
    });
    return total;
  };

  const features = [
    { icon: <Truck className="w-4 h-4" />, text: "Free Pickup & Delivery" },
    { icon: <Clock className="w-4 h-4" />, text: "24-48 Hours Turnaround" },
    { icon: <Leaf className="w-4 h-4" />, text: "Eco-Friendly" },
    { icon: <Award className="w-4 h-4" />, text: "Quality Assured" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Simple Header with Glassmorphism */}
      <div className="sticky top-16 z-40 glassmorphism border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/services/${service.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Service</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="text-primary">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {service.name}
            </h1>
            <p className="text-lg text-muted-foreground">{service.tagline}</p>
          </div>

          {/* Service Navigation Tabs */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {services.map((s) => (
                <Link key={s.id} href={`/services/${s.slug}/orders`}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                      s.slug === slug 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'bg-card text-muted-foreground hover:bg-muted border border-border'
                    }`}
                  >
                    <Image src={s.icon} alt={s.name} width={20} height={20} className={s.slug === slug ? 'brightness-0 invert' : ''} />
                    <span className="text-sm font-medium whitespace-nowrap">{s.name}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Grid */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl overflow-hidden bg-card">
                <Tabs defaultValue="men" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4 gap-1 p-2 bg-muted/50 rounded-none border-b border-border">
                    {['men', 'women', 'children', 'household'].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground capitalize py-3 rounded-lg transition-all"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <AnimatePresence mode="wait">
                    {['men', 'women', 'children', 'household'].map((tab) => (
                      <TabsContent key={tab} value={tab} className="p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {service.items[tab as keyof typeof service.items]?.map((item: any) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ y: -2 }}
                            >
                              <Card className="border border-border hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden bg-background">
                                <CardContent className="p-4">
                                  <div className="mb-3">
                                    <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <span className="text-primary font-bold text-xl">AED {item.price}</span>
                                      <span className="text-sm text-muted-foreground ml-1">/{item.unit}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center bg-muted rounded-lg">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-10 w-10 rounded-l-lg hover:bg-muted-foreground/20 text-foreground"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        disabled={!quantities[item.id]}
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="w-12 text-center font-medium text-foreground">
                                        {quantities[item.id] || 0}
                                      </span>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-10 w-10 rounded-r-lg hover:bg-muted-foreground/20 text-foreground"
                                        onClick={() => updateQuantity(item.id, 1)}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    
                                    <Button
                                      className={`flex-1 h-10 transition-all rounded-lg ${
                                        addedItems[item.id]
                                          ? 'bg-green-600 scale-105'
                                          : 'bg-primary hover:bg-primary/90'
                                      } text-primary-foreground`}
                                      onClick={() => handleAddToCart(item)}
                                      disabled={!quantities[item.id]}
                                    >
                                      {addedItems[item.id] ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        'Add'
                                      )}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                    ))}
                  </AnimatePresence>
                </Tabs>
              </Card>
            </div>

            {/* Order Summary with Glassmorphism */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32 border-0 shadow-2xl overflow-hidden bg-card">
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Order Summary
                  </h3>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Selected Items:</span>
                      <span className="font-semibold text-lg text-primary">{getTotalItems()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-foreground font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-primary">AED {getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/cart">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium transition-all hover:scale-[1.02] rounded-lg">
                        View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </Button>
                    </Link>
                    
                    <Link href="/checkout">
                      <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 text-lg font-medium transition-all rounded-lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>

                  {/* Trust Badges with Glassmorphism */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-muted/30">
                        <div className="text-2xl mb-1">🔒</div>
                        <p className="text-xs text-muted-foreground">Secure Payment</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/30">
                        <div className="text-2xl mb-1">✨</div>
                        <p className="text-xs text-muted-foreground">Quality Assured</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/30">
                        <div className="text-2xl mb-1">🚚</div>
                        <p className="text-xs text-muted-foreground">Free Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Eco-friendly Badge */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span>100% Eco-friendly cleaning products</span>
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