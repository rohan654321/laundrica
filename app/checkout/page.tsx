'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { ArrowLeft, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice * 1.18;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const mockOrderId = `ORD-${Date.now()}`;
      setOrderId(mockOrderId);
      setOrderPlaced(true);
      setIsProcessing(false);
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 bg-background py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-xl text-foreground/70 mb-8">Your cart is empty</p>
            <Link href="/services">
              <Button size="lg">
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
        <div className="flex-1 bg-background py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
              <Check size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-xl text-foreground/70 mb-4">Thank you for your order</p>
            <div className="bg-card border border-border p-6 rounded-lg mb-8 text-left">
              <p className="text-foreground/70 mb-2">Order ID</p>
              <p className="text-2xl font-bold text-primary mb-6">{orderId}</p>
              <p className="text-foreground/70 mb-2">Estimated Delivery</p>
              <p className="text-lg font-semibold mb-6">Within 3-4 business days</p>
              <p className="text-foreground/70 mb-2">Total Amount</p>
              <p className="text-2xl font-bold">₹{finalTotal.toFixed(2)}</p>
            </div>
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button size="lg" className="w-full">
                  View Orders
                </Button>
              </Link>
              <Link href="/services" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
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

      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <Input
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="CVC"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Cart
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                className="flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Tax (18%)</span>
                  <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
