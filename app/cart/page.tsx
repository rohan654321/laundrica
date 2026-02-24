'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 bg-background py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-foreground/70 mb-8">
              Looks like you haven't added any services yet. Browse our services and add them to your cart.
            </p>
            <Link href="/services">
              <Button size="lg" className="flex items-center gap-2 mx-auto">
                <ArrowLeft size={18} />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-card p-6 rounded-lg border border-border flex gap-6">
                  {/* Item Image */}
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                    🧺
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-foreground/70 mb-4">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border border-border rounded px-2 py-1"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-4">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/services">
              <Button variant="ghost" className="mt-8 flex items-center gap-2">
                <ArrowLeft size={18} />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Tax</span>
                  <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">₹{(totalPrice * 1.18).toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
