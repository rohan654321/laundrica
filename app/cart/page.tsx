'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, Clock, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 100 ? 0 : 10;
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success('Order placed successfully!');
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col min-h-screen bg-background">
        <Header />
        
        {/* Empty Cart */}
        <section className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
              Browse our services and find the perfect cleaning solution for your needs.
            </p>
            <Link href="/services">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg">
                Browse Services
                <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Cart Header */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
              <p className="text-primary-foreground/90">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="border-white text-white hover:bg-white/20 rounded-lg"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary font-medium">Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl overflow-hidden bg-card">
                <CardContent className="p-6">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 py-4 border-b border-border last:border-0"
                      >
                        {/* Item Icon/Image */}
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">👕</span>
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Category: <span className="capitalize">{item.category}</span>
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-primary">AED {item.price}</p>
                          <p className="text-xs text-muted-foreground">per item</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-muted rounded-lg">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-l-lg hover:bg-muted-foreground/20"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-r-lg hover:bg-muted-foreground/20"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Item Total */}
                        <div className="w-24 text-right">
                          <p className="font-bold text-primary">AED {item.price * item.quantity}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/services">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32 border-0 shadow-2xl overflow-hidden bg-card">
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order Summary
                  </h2>
                </div>
                
                <CardContent className="p-6">
                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-foreground">AED {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-semibold text-foreground">
                        {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">AED {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Free Delivery Progress */}
                  {subtotal < 100 && (
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        Add AED {(100 - subtotal).toFixed(2)} more for free delivery
                      </p>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(subtotal / 100) * 100}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium transition-all hover:scale-[1.02] rounded-lg mb-3"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </Button>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-muted/30">
                      <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Secure Payment</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Free Delivery*</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <Leaf className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Eco-Friendly</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    <p>*Free delivery on orders above AED 100</p>
                    <p className="mt-1">Estimated delivery: 24-48 hours</p>
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