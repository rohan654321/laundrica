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
import { ArrowLeft, Check, AlertCircle, Truck, Clock, Shield, MessageCircle, Phone, Mail, User, Home, Calendar } from 'lucide-react';
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
  const { cartItems = [], getTotalPrice, clearCart } = useCart();
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
    if ((!cartItems || cartItems.length === 0) && !orderPlaced) {
      router.push('/cart');
    }
  }, [cartItems, orderPlaced, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format phone number to UAE mobile format
  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-numeric characters and spaces
    let cleaned = phone.replace(/\D/g, '');

    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');

    // Check if it already has country code
    if (cleaned.startsWith('971')) {
      // Ensure it's a mobile number (starts with 9715)
      if (cleaned.length >= 4 && cleaned[3] === '5') {
        return `+${cleaned}`;
      }
      // If it's not a mobile number, try to convert
      return `+9715${cleaned.substring(3)}`;
    }

    // If it's a 9-digit number starting with 5
    if (cleaned.length === 9 && cleaned.startsWith('5')) {
      return `+971${cleaned}`;
    }

    // If it's a 10-digit number starting with 05
    if (cleaned.length === 10 && cleaned.startsWith('05')) {
      return `+971${cleaned.substring(1)}`;
    }

    // If it's a 10-digit number starting with 5
    if (cleaned.length === 10 && cleaned.startsWith('5')) {
      return `+971${cleaned}`;
    }

    // Default: assume it's a mobile number without country code
    if (cleaned.length > 0) {
      const mobilePart = cleaned.replace(/^5?/, '5');
      return `+971${mobilePart}`;
    }

    return phone;
  };

  // Validate UAE mobile number (must start with 5 after country code)
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Check if it's a valid UAE mobile number
    // Options: 
    // - 5XXXXXXXX (9 digits starting with 5)
    // - 05XXXXXXXX (10 digits starting with 05)
    // - 9715XXXXXXXX (12 digits starting with 9715)
    // - +9715XXXXXXXX (13 characters with +)

    const isValid = /^5[0-9]{8}$/.test(digits) ||           // 5XXXXXXXX
      /^05[0-9]{8}$/.test(digits) ||          // 05XXXXXXXX
      /^9715[0-9]{8}$/.test(digits);          // 9715XXXXXXXX

    return isValid;
  };

  // Group cart items by unique ID and sum quantities
  const groupCartItems = () => {
    const grouped = new Map();
    cartItems.forEach(item => {
      const key = item.id;
      if (grouped.has(key)) {
        const existing = grouped.get(key);
        existing.quantity += item.quantity;
      } else {
        grouped.set(key, {
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || '',
          serviceItems: item.serviceItems || [],
          selectedColor: item.selectedColor || null,
          selectedSize: item.selectedSize || null,
          designImage: item.designImage || null,
        });
      }
    });
    return Array.from(grouped.values());
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

      // Format and validate phone number
      const formattedPhone = formatPhoneNumber(formData.phone);
      if (!validatePhoneNumber(formattedPhone)) {
        throw new Error('Please enter a valid UAE mobile number starting with 5 (e.g., 501234567 or +971501234567)');
      }

      if (!formData.address) {
        throw new Error('Please enter your delivery address');
      }
      if (!formData.pickupDate || !formData.pickupTime) {
        throw new Error('Please select pickup date and time');
      }

      if (!cartItems || cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Group cart items
      const transformedItems = groupCartItems();

      // Prepare order data
      const orderData = {
        sessionId,
        items: transformedItems,
        subtotal: totalPrice,
        deliveryFee: deliveryFee,
        tax: tax,
        discount: 0,
        total: finalTotal,
        status: 'pending',
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formattedPhone,
          email: formData.email || '',
          address: formData.address,
          city: formData.city || 'Dubai',
          notes: formData.notes || '',
        },
      };

      console.log('Sending order data:', JSON.stringify(orderData, null, 2));

      const response = await orderAPI.createOrder(orderData);
      console.log('Order response:', response);

      if (response.success || response.order || response._id) {
        setOrderResult(response);
        setOrderPlaced(true);
        toast.success('Order placed successfully!');
        await clearCart();
      } else {
        throw new Error(response.message || response.error || 'Failed to create order');
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

  const cartItemsCount = cartItems?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0;

  if (orderPlaced && orderResult) {
    const order = orderResult.order || orderResult;
    const orderNumber = order?.orderNumber || orderResult.orderNumber || `ORD-${Date.now()}`;
    const whatsappLink = orderResult.whatsappLink ||
      `https://wa.me/${formData.phone.replace(/^\+/, '').replace(/\s/g, '')}?text=${encodeURIComponent(`Hello, I've placed order #${orderNumber}. Please confirm.`)}`;

    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 py-20 px-4">
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
                  <p className="text-xl font-bold text-green-600 font-mono">{orderNumber}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">AED {(order.total || finalTotal).toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Pickup Date</p>
                  <p className="text-gray-800">{formData.pickupDate} at {formData.pickupTime}</p>
                </div>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#25D366] hover:bg-[#20b859] text-white mb-3 py-6 text-lg gap-2 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                  Confirm Order via WhatsApp
                </Button>
              </a>

              <div className="space-y-3">
                <Link href={`/track/${orderNumber}`} className="block">
                  <Button variant="outline" size="lg" className="w-full border-green-600 text-green-600 hover:bg-green-50 rounded-xl">
                    Track Your Order
                  </Button>
                </Link>
                <Link href="/services" className="block">
                  <Button variant="outline" size="lg" className="w-full rounded-xl">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <span>📱</span>
                  <span>Please click the WhatsApp button above to confirm your order. Our team will contact you shortly.</span>
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
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart">
            <button className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-white/90">Complete your order to schedule pickup</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-xl"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Mobile Number * (UAE)
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                    placeholder="501234567"
                  />
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Enter your UAE mobile number (e.g., 501234567 or +971501234567)
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Delivery Address *
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                  placeholder="Street name, building, apartment number"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">City / Area *</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                  placeholder="Dubai"
                />
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map((date) => {
                      const dateObj = new Date(date);
                      return (
                        <option key={date} value={date}>
                          {dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time *</label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full rounded-xl">
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Cart
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                disabled={isProcessing}
              >
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
                  <p className="text-sm text-white/80 mt-1">{cartItemsCount} item(s)</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="text-gray-600">{item.name || 'Unknown Item'}</span>
                          <span className="text-gray-400 ml-2">x{item.quantity || 0}</span>
                        </div>
                        <span className="font-medium text-gray-900">AED {((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
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

                  <div className="flex justify-between items-center text-xl font-bold mb-6">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">AED {finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Shield className="w-3 h-3" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Free pickup & delivery</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Note:</strong> After placing your order, you'll be redirected to WhatsApp to confirm.
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