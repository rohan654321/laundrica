'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowLeft,
  Truck, Shield, Clock, Leaf, CreditCard, MapPin
} from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'fresh10') {
      setPromoApplied(true);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        <section className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/services">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl">
                Browse Services
              </Button>
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Cart Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-white/90">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
              </p>
            </div>
            <Button
              onClick={clearCart}
              className="bg-transparent border border-white text-white hover:bg-white/10 rounded-xl"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">👕</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                          <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-green-600">AED {item.price}</p>
                          <p className="text-xs text-gray-500">per item</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/services">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-6">
                    {/* Promo Code */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                          disabled={promoApplied}
                        />
                        <Button
                          onClick={handleApplyPromo}
                          disabled={promoApplied}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-4 rounded-xl"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-sm text-green-600 mt-2">
                          Promo code applied: 10% discount
                        </p>
                      )}
                    </div>

                    {/* Summary Details */}
                    <div className="space-y-3 mb-6">
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
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span className="font-medium">-AED {discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-green-600">AED {total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Free Delivery Progress */}
                    {subtotal < 100 && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">
                          Add AED {(100 - subtotal).toFixed(2)} more for free delivery
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(subtotal / 100) * 100}%` }}
                            className="h-full bg-green-600"
                          />
                        </div>
                      </div>
                    )}

                    {/* Checkout Button */}
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium rounded-xl mb-3"
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
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-gray-600">Secure</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Truck className="w-5 h-5 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-gray-600">Free*</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Leaf className="w-5 h-5 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-gray-600">Eco</p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-xs text-gray-600">
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