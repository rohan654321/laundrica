'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useSession } from '@/context/session-context';
import { orderAPI } from '@/lib/api';
import { ArrowLeft, Check, AlertCircle, Truck, Clock, Shield, MapPin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  pickupDate: string;
  pickupTime: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { sessionId } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    notes: '',
    pickupDate: '',
    pickupTime: '',
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + deliveryFee + tax;

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push('/cart');
    }
  }, [cartItems, orderPlaced, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        throw new Error('Please enter your full name');
      }
      if (!formData.phone) {
        throw new Error('Please enter your phone number');
      }
      if (!formData.address) {
        throw new Error('Please enter your delivery address');
      }
      if (!formData.pickupDate || !formData.pickupTime) {
        throw new Error('Please select pickup date and time');
      }

      // Prepare order data
      const orderData = {
        sessionId,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          email: formData.email || '',
          address: formData.address,
          city: formData.city || 'Dubai',
          notes: formData.notes,
        },
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          serviceItems: item.serviceItems || [],
        })),
      };

      console.log('Sending order data:', orderData);

      const response = await orderAPI.createOrder(orderData);
      console.log('Order response:', response);

      if (response.success) {
        setOrderResult(response);
        setOrderPlaced(true);
        toast.success('Order placed successfully!');
        await clearCart();
      } else {
        throw new Error(response.message || 'Failed to create order');
      }

    } catch (err: any) {
      console.error('Order creation error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      toast.error(err.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 18; i++) {
      const period = i < 12 ? 'AM' : 'PM';
      const hour = i > 12 ? i - 12 : i;
      slots.push(`${hour}:00 ${period}`);
      slots.push(`${hour}:30 ${period}`);
    }
    return slots;
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (orderPlaced && orderResult) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 bg-gray-50 py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Order Confirmed!</h1>
              <p className="text-lg text-gray-600 mb-6">Thank you for your order</p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <p className="text-xl font-bold text-green-600">{orderResult.order?.orderNumber}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">AED {orderResult.order?.total?.toFixed(2)}</p>
                </div>
              </div>

              {/* WhatsApp Button */}
              {orderResult.whatsappLink && (
                <a href={orderResult.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-3 py-6 text-lg gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Confirm Order via WhatsApp
                  </Button>
                </a>
              )}

              <div className="space-y-3">
                <Link href={`/track/${orderResult.order?.orderNumber}`} className="block">
                  <Button variant="outline" size="lg" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    Track Your Order
                  </Button>
                </Link>
                <Link href="/services" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  📱 Please click the WhatsApp button above to confirm your order. Our team will contact you shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-white/90">Complete your order to schedule pickup</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-600" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required className="rounded-xl" />
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="rounded-xl" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                <Input name="address" value={formData.address} onChange={handleInputChange} required className="rounded-xl" />
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <Input name="city" value={formData.city} onChange={handleInputChange} required className="rounded-xl" />
                </div>
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Truck className="w-6 h-6 text-green-600" />
                Schedule Pickup
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date *</label>
                  <select
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time *</label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a time slot</option>
                    {getTimeSlots().map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special requests? (e.g., delicate items, allergies, etc.)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl">
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Cart
                </Button>
              </Link>
              <Button type="submit" size="lg" className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl" disabled={isProcessing}>
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Place Order • AED ${finalTotal.toFixed(2)}`
                )}
              </Button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Order Summary
                  </h2>
                  <p className="text-sm text-white/80 mt-1">{cartItems.length} item(s)</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="text-gray-600 font-medium">{item.name}</span>
                          <span className="text-gray-400 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>AED {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (5% VAT)</span>
                      <span>AED {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">AED {finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Note:</strong> After placing your order, you'll be redirected to WhatsApp to confirm. Our team will contact you for payment.
                    </p>
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