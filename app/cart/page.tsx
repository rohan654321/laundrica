// app/cart/page.tsx
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
  Truck, Shield, Leaf, CreditCard, MapPin, Sparkles,
  CheckCircle, Clock, Award, ChevronRight
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
      <main className="flex flex-col min-h-screen bg-[#f9faf7]">
        <Header />
        <div className="flex-1 flex items-center justify-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-[#bcedd7] rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-[#00261b]" />
            </div>
            <h1 className="text-3xl font-bold text-[#00261b] mb-4">Your Cart is Empty</h1>
            <p className="text-[#5c5f5e] mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-[#00261b] text-white hover:bg-emerald-800 rounded-xl px-8 py-5"
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
    <main className="flex flex-col min-h-screen bg-[#f9faf7]">
      <Header />

      {/* Premium Hero Banner */}
      <section className="relative min-h-[300px] flex items-center overflow-hidden pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Your Cart</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#00261b] mb-4">
              Shopping <span className="text-emerald-700">Cart</span>
            </h1>
            <p className="text-[#5c5f5e] text-lg max-w-2xl mx-auto">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items ready for professional care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-[#00261b] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="p-6">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-16 h-16 bg-[#bcedd7] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-8 h-8 text-[#00261b]" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-[#00261b] text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                          <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="font-bold text-[#00261b] text-lg">AED {item.price}</p>
                          <p className="text-xs text-gray-400">per item</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors disabled:opacity-50"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isRemoving === item.id}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center font-medium text-[#00261b]">
                              {item.quantity}
                            </span>
                            <button
                              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            className="w-9 h-9 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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

                        <div className="w-24 text-right">
                          <p className="font-bold text-emerald-700 text-lg">AED {(item.price * item.quantity).toFixed(2)}</p>
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
                  className="border-[#00261b] text-[#00261b] hover:bg-[#bcedd7] rounded-xl px-6 py-5"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary - Premium Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="bg-[#00261b] p-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-6">
                    {/* Promo Code */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-[#00261b] mb-2 block">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00261b] focus:ring-1 focus:ring-[#00261b]"
                          disabled={promoApplied}
                        />
                        <Button
                          onClick={handleApplyPromo}
                          disabled={promoApplied}
                          className="bg-[#00261b] hover:bg-emerald-800 text-white px-5 text-sm rounded-xl"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Promo code applied: 10% discount
                        </p>
                      )}
                    </div>

                    {/* Summary Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600 py-2">
                        <span>Subtotal</span>
                        <span className="font-medium">AED {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 py-2 border-b border-gray-100">
                        <span>Delivery Fee</span>
                        <span className="font-medium">
                          {deliveryFee === 0 ? (
                            <span className="text-emerald-600">FREE</span>
                          ) : (
                            `AED ${deliveryFee}`
                          )}
                        </span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-600 py-2">
                          <span>Discount (10%)</span>
                          <span className="font-medium">-AED {discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-[#00261b]">Total</span>
                          <span className="text-2xl font-bold text-emerald-700">AED {total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Free Delivery Progress */}
                    {subtotal < 100 && (
                      <div className="mb-6 p-4 bg-[#bcedd7]/20 rounded-xl">
                        <p className="text-sm text-[#00261b] font-medium mb-2">
                          Add AED {(100 - subtotal).toFixed(2)} more for free delivery
                        </p>
                        <div className="w-full h-2 bg-[#bcedd7] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00261b] rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Checkout Button */}
                    <Button
                      className="w-full bg-[#00261b] hover:bg-emerald-800 text-white py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg"
                      onClick={handleProceedToCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </Button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { icon: Shield, label: 'Secure Payment', color: 'bg-blue-50' },
                        { icon: Truck, label: 'Free Delivery*', color: 'bg-emerald-50' },
                        { icon: Leaf, label: 'Eco-Friendly', color: 'bg-green-50' },
                      ].map((badge, idx) => (
                        <div key={idx} className={`text-center py-3 ${badge.color} rounded-xl`}>
                          <badge.icon className="w-5 h-5 mx-auto mb-1 text-[#00261b]" />
                          <p className="text-xs font-medium text-gray-700">{badge.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#00261b]">Delivery Information</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Estimated delivery: 24-48 hours. Free delivery on orders above AED 100.
                        </p>
                      </div>
                    </div>

                    {/* Quality Promise */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>Quality Checked</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        <span>24-48 hrs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-500" />
                        <span>Premium Care</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}