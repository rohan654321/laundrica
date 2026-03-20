// app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { OTPLoginModal } from '@/components/auth/otp-login-modal';
import { ArrowLeft, Check, AlertCircle, Truck, Clock, Shield, MapPin } from 'lucide-react';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, requireAuth } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Split user name safely
  const getUserName = () => {
    if (!user?.name) return { firstName: '', lastName: '' };
    const nameParts = user.name.split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || ''
    };
  };

  const { firstName: defaultFirstName, lastName: defaultLastName } = getUserName();

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: defaultFirstName,
    lastName: defaultLastName,
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  useEffect(() => {
    // Check authentication on mount
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 100 ? 0 : 10;
  const tax = totalPrice * 0.05; // 5% VAT for UAE
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication again before processing
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const mockOrderId = `ORD-${Date.now()}`;
      setOrderId(mockOrderId);
      setOrderPlaced(true);
      setIsProcessing(false);
      clearCart();
      
      // Save order to localStorage for demo
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        id: mockOrderId,
        date: new Date().toISOString(),
        items: cartItems,
        total: finalTotal,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        pickupDetails: {
          date: formData.pickupDate,
          time: formData.pickupTime,
          instructions: formData.specialInstructions
        },
        status: 'confirmed'
      });
      localStorage.setItem('orders', JSON.stringify(orders));
    }, 2000);
  };

  const handleLoginSuccess = () => {
    // After successful login, the user will be authenticated
    // The component will re-render and show the checkout form
    setShowLoginModal(false);
  };

  // Generate available time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 18; i++) {
      slots.push(`${i}:00 AM`);
      slots.push(`${i}:30 AM`);
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

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 bg-gray-50 py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Checkout</h1>
            <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
            <Link href="/services">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="mr-2" size={18} />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (orderPlaced) {
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
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-green-600">{orderId}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Pickup Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.pickupDate || 'Will be scheduled'}
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Estimated Return</p>
                  <p className="text-lg font-semibold text-gray-900">
                    Within 24-48 hours after pickup
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">AED {finalTotal.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link href="/orders" className="block">
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    View My Orders
                  </Button>
                </Link>
                <Link href="/services" className="block">
                  <Button variant="outline" size="lg" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    Continue Shopping
                  </Button>
                </Link>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-white/90">Complete your order to schedule pickup</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-600" />
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <Input
                  placeholder="Street address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                />
              </div>
              
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <Input
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area *
                  </label>
                  <Input
                    placeholder="Area/State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <Input
                    placeholder="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date *
                  </label>
                  <select
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange as any}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Time *
                  </label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange as any}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special requests? (e.g., delicate items, allergies, etc.)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Payment Method
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={16}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <Input
                      placeholder="MM/YY"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC *
                    </label>
                    <Input
                      placeholder="123"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      required
                      maxLength={3}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  🔒 Your payment information is secure. We use SSL encryption.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl">
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
                  'Place Order'
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
                </div>
                
                <div className="p-6">
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="text-gray-600 font-medium">
                            {item.name}
                          </span>
                          <span className="text-gray-400 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          AED {(item.price * item.quantity).toFixed(2)}
                        </span>
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
                      <span>
                        {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (5% VAT)</span>
                      <span>AED {tax.toFixed(2)}</span>
                    </div>
                    {totalPrice < 100 && (
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                        Add AED {(100 - totalPrice).toFixed(2)} more for free delivery
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">AED {finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>Free pickup within 24 hours of scheduling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Login Modal */}
      <OTPLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          router.push('/cart');
        }}
        onSuccess={handleLoginSuccess}
        message="Please login to complete your checkout"
      />

      <Footer />
    </main>
  );
}