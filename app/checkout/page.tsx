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
import { ArrowLeft, Check, AlertCircle, Truck, Clock, Shield, MessageCircle, Phone, Mail, User, Home, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems = [], getTotalPrice, clearCart } = useCart();
  const { sessionId } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Toggle switches for carpet and shoes - store in localStorage
  const [carpetToggle, setCarpetToggle] = useState(false);
  const [shoesToggle, setShoesToggle] = useState(false);

  // Load toggle states from localStorage on mount
  useEffect(() => {
    const savedCarpet = localStorage.getItem('carpetContactToggle');
    const savedShoes = localStorage.getItem('shoesContactToggle');
    if (savedCarpet) setCarpetToggle(savedCarpet === 'true');
    if (savedShoes) setShoesToggle(savedShoes === 'true');
  }, []);

  // Save toggle states to localStorage
  const handleCarpetToggle = (value: boolean) => {
    setCarpetToggle(value);
    localStorage.setItem('carpetContactToggle', String(value));
    toast.success(value ? 'Carpet: Contact required for pricing' : 'Carpet: Items can be added directly');
  };

  const handleShoesToggle = (value: boolean) => {
    setShoesToggle(value);
    localStorage.setItem('shoesContactToggle', String(value));
    toast.success(value ? 'Shoes: Contact required for pricing' : 'Shoes: Items can be added directly');
  };

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    notes: '',
  });

  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice;

  useEffect(() => {
    if ((!cartItems || cartItems.length === 0) && !orderPlaced) {
      router.push('/cart');
    }
  }, [cartItems, orderPlaced, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    cleaned = cleaned.replace(/^0+/, '');

    if (cleaned.startsWith('971')) {
      if (cleaned.length >= 4 && cleaned[3] === '5') {
        return `+${cleaned}`;
      }
      return `+9715${cleaned.substring(3)}`;
    }

    if (cleaned.length === 9 && cleaned.startsWith('5')) {
      return `+971${cleaned}`;
    }

    if (cleaned.length === 10 && cleaned.startsWith('05')) {
      return `+971${cleaned.substring(1)}`;
    }

    if (cleaned.length === 10 && cleaned.startsWith('5')) {
      return `+971${cleaned}`;
    }

    if (cleaned.length > 0) {
      const mobilePart = cleaned.replace(/^5?/, '5');
      return `+971${mobilePart}`;
    }

    return phone;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    const isValid = /^5[0-9]{8}$/.test(digits) ||
      /^05[0-9]{8}$/.test(digits) ||
      /^9715[0-9]{8}$/.test(digits);
    return isValid;
  };

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
          serviceName: item.metadata?.serviceName || '',
          category: item.category || '',
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
      if (!formData.firstName || !formData.lastName) {
        throw new Error('Please enter your full name');
      }
      if (!formData.phone) {
        throw new Error('Please enter your phone number');
      }

      const formattedPhone = formatPhoneNumber(formData.phone);
      if (!validatePhoneNumber(formattedPhone)) {
        throw new Error('Please enter a valid UAE mobile number starting with 5 (e.g., 501234567 or +971501234567)');
      }

      if (!formData.address) {
        throw new Error('Please enter your delivery address');
      }

      if (!cartItems || cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      const transformedItems = groupCartItems();

      const orderData = {
        sessionId,
        items: transformedItems,
        subtotal: totalPrice,
        deliveryFee: 0,
        tax: 0,
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

  const cartItemsCount = cartItems?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0;

  if (orderPlaced && orderResult) {
    const order = orderResult.order || orderResult;
    const orderNumber = order?.orderNumber || orderResult.orderNumber || `ORD-${Date.now()}`;
    const whatsappLink = orderResult.whatsappLink ||
      `https://wa.me/${formData.phone.replace(/^\+/, '').replace(/\s/g, '')}?text=${encodeURIComponent(`Hello, I've placed order #${orderNumber}. Please confirm.`)}`;

    return (
      <main className="flex flex-col min-h-screen bg-[#f9faf7]">
        <Header />
        <div className="flex-1 py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#bcedd7] rounded-full mb-6">
                <Check size={40} className="text-[#00261b]" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-[#00261b]">Order Confirmed!</h1>
              <p className="text-lg text-[#5c5f5e] mb-6">Thank you for your order</p>

              <div className="bg-[#f9faf7] rounded-xl p-6 mb-8 text-left">
                <div className="mb-4">
                  <p className="text-sm text-[#5c5f5e] mb-1">Order Number</p>
                  <p className="text-xl font-bold text-[#00261b] font-mono">{orderNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-[#5c5f5e] mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-[#00261b]">AED {(order.total || finalTotal).toFixed(2)}</p>
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
                  <Button variant="outline" size="lg" className="w-full border-[#00261b] text-[#00261b] hover:bg-[#bcedd7] rounded-xl">
                    Track Your Order
                  </Button>
                </Link>
                <Link href="/services" className="block">
                  <Button variant="outline" size="lg" className="w-full rounded-xl">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-[#bcedd7]/20 rounded-xl">
                <p className="text-sm text-[#00261b] flex items-start gap-2">
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
    <main className="flex flex-col min-h-screen bg-[#f9faf7]">
      <Header />

      <section className="bg-[#00261b] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart">
            <button className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-white/80">Complete your order to proceed</p>
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
              <h2 className="text-xl font-bold mb-6 text-[#00261b] flex items-center gap-2">
                <User className="w-5 h-5 text-[#00261b]" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#00261b] mb-2">First Name *</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#00261b] mb-2">Last Name *</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#00261b] mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#00261b] mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Mobile Number * (UAE)
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                    placeholder="501234567"
                  />
                  <p className="text-xs text-[#00261b] mt-1">
                    ✓ Enter your UAE mobile number (e.g., 501234567 or +971501234567)
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#00261b] mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Delivery Address *
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                  placeholder="Street name, building, apartment number"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#00261b] mb-2">City / Area *</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-gray-200 focus:border-[#00261b] focus:ring-[#00261b]"
                  placeholder="Dubai"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#00261b] mb-2">Special Instructions (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special requests? (e.g., delicate items, allergies, etc.)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00261b] focus:border-[#00261b] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full rounded-xl border-[#00261b] text-[#00261b] hover:bg-[#bcedd7]">
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Cart
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-[#00261b] hover:bg-emerald-800 text-white rounded-xl"
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

          {/* Order Summary - WITH TOGGLE BUTTONS */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-[#00261b] to-emerald-800 p-6 text-white">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Order Summary
                  </h2>
                  <p className="text-sm text-white/80 mt-1">{cartItemsCount} item(s)</p>
                </div>

                <div className="p-6">
                  {/* TOGGLE BUTTONS FOR CARPET AND SHOES */}
                  <div className="mb-4 space-y-3 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🧹</span>
                        <div>
                          <p className="text-sm font-medium text-[#00261b]">Carpet Items</p>
                          <p className="text-xs text-gray-500">Require contact for pricing</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCarpetToggle(!carpetToggle)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${carpetToggle ? 'bg-[#00261b]' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${carpetToggle ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👟</span>
                        <div>
                          <p className="text-sm font-medium text-[#00261b]">Shoe Items</p>
                          <p className="text-xs text-gray-500">Require contact for pricing</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleShoesToggle(!shoesToggle)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${shoesToggle ? 'bg-[#00261b]' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${shoesToggle ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="text-[#00261b]">{item.name || 'Unknown Item'}</span>
                          <span className="text-gray-400 ml-2">x{item.quantity || 0}</span>
                          {item.metadata?.serviceName && (
                            <p className="text-xs text-gray-400 mt-0.5">{item.metadata.serviceName}</p>
                          )}
                        </div>
                        <span className="font-medium text-[#00261b]">AED {((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-[#5c5f5e]">
                      <span>Subtotal</span>
                      <span>AED {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xl font-bold mb-6">
                    <span className="text-[#00261b]">Total</span>
                    <span className="text-[#00261b]">AED {finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#5c5f5e]">
                      <Shield className="w-3 h-3" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5c5f5e]">
                      <Truck className="w-3 h-3" />
                      <span>Free delivery</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#bcedd7]/20 rounded-xl">
                    <p className="text-xs text-[#00261b]">
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