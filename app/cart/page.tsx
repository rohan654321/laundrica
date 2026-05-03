'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useSession } from '@/context/session-context';
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowLeft,
  Truck, Shield, Leaf, CreditCard, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { sessionId } = useSession();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [lastVisitedSlug, setLastVisitedSlug] = useState<string | null>(null);

  // Get last visited service slug from localStorage when component mounts
  useEffect(() => {
    const savedSlug = localStorage.getItem('lastVisitedServiceSlug');
    if (savedSlug) {
      setLastVisitedSlug(savedSlug);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setIsRemoving(id);
      try {
        await removeFromCart(id);
        toast.success('Item removed from cart');
      } catch (err) {
        console.error('Error removing item:', err);
        toast.error('Failed to remove item');
      } finally {
        setIsRemoving(null);
      }
    } else {
      try {
        await updateQuantity(id, newQuantity);
      } catch (err) {
        console.error('Error updating quantity:', err);
        toast.error('Failed to update quantity');
      }
    }
  };

  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id);
    try {
      await removeFromCart(id);
      toast.success('Item removed from cart');
    } catch (err) {
      console.error('Error removing item:', err);
      toast.error('Failed to remove item');
    } finally {
      setIsRemoving(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch (err) {
      console.error('Error clearing cart:', err);
      toast.error('Failed to clear cart');
    }
  };

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

  const handleContinueShopping = () => {
    if (lastVisitedSlug) {
      router.push(`/services/${lastVisitedSlug}/orders`);
    } else {
      router.push('/services');
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        <Header />

        <div className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Continue Shopping
            </Button>
          </motion.div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner Section - Same as About page */}
      <section>
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-fixed flex items-center justify-center" style={{ backgroundImage: "url('/images/curtainCleaning.jpg')" }}>
          {/* LEFT GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r 
            from-[#0b3d2a]/85 
            via-[#0b3d2a]/55 
            to-transparent"
          />

          {/* BOTTOM GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t 
            from-[#0b3d2a]/75 
            via-transparent 
            to-transparent"
          />

          {/* Centered Content */}
          <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              Your Shopping <span className="text-yellow-300">Cart</span>
            </h1>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items ready for <span className="text-yellow-300">professional care</span>
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border border-gray-200 bg-white">
                  <div className="p-6">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">👕</span>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                            <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-emerald-600">AED {item.price}</p>
                            <p className="text-xs text-gray-500">per item</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-200">
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors disabled:opacity-50"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={isRemoving === item.id}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 text-center font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={isRemoving === item.id}
                            >
                              {isRemoving === item.id ? (
                                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          <div className="w-20 text-right">
                            <p className="font-bold text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Continue Shopping Button */}
                <div className="mt-6">
                  <Button
                    onClick={handleContinueShopping}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Continue Shopping
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 border border-gray-200 bg-white">
                  <div className="bg-emerald-600 p-5 text-white">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-5">
                    {/* Promo Code */}
                    <div className="mb-5">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-emerald-400"
                          disabled={promoApplied}
                        />
                        <Button
                          onClick={handleApplyPromo}
                          disabled={promoApplied}
                          className="bg-gray-800 hover:bg-gray-900 text-white px-4 text-sm"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-sm text-emerald-600 mt-2">
                          ✓ Promo code applied: 10% discount
                        </p>
                      )}
                    </div>

                    {/* Summary Details */}
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">AED {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span className="font-medium">
                          {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}
                        </span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount (10%)</span>
                          <span className="font-medium">-AED {discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-emerald-600">AED {total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Free Delivery Progress */}
                    {subtotal < 100 && (
                      <div className="mb-5 p-3 bg-emerald-50">
                        <p className="text-xs text-emerald-700 mb-2">
                          Add AED {(100 - subtotal).toFixed(2)} more for free delivery
                        </p>
                        <div className="w-full h-1 bg-emerald-100">
                          <div
                            className="h-full bg-emerald-600 transition-all"
                            style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Checkout Button */}
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-base font-medium"
                      onClick={handleProceedToCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </Button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { icon: Shield, label: 'Secure' },
                        { icon: Truck, label: 'Free*' },
                        { icon: Leaf, label: 'Eco' },
                      ].map((badge, idx) => (
                        <div key={idx} className="text-center py-2 bg-emerald-50">
                          <badge.icon className="w-4 h-4 mx-auto mb-0.5 text-emerald-600" />
                          <p className="text-[10px] text-gray-600">{badge.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-3 p-2 bg-emerald-50 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                      <p className="text-[11px] text-gray-600">
                        Estimated delivery: 24-48 hours. Free delivery on orders above AED 100.
                      </p>
                    </div>
                  </div>
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