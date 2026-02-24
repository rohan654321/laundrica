'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { mockOrders } from '@/lib/mock-data';
import { Package, ArrowRight } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push('/login');
    return null;
  }

  const userOrders = mockOrders.filter((order) => order.userId === user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">My Orders</h1>
          <p className="opacity-90 mt-2">Track and manage your laundry orders</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          {userOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto text-foreground/20 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
              <p className="text-foreground/70 mb-8">
                You haven't placed any orders. Browse our services and create your first order.
              </p>
              <Link href="/services">
                <Button size="lg">
                  Browse Services
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Order ID</p>
                      <p className="text-2xl font-bold">{order.id}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(order.status)} capitalize`}>
                      {order.status}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-sm font-semibold mb-3">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-foreground/70">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Order Date</p>
                      <p className="font-medium">{order.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Delivery Date</p>
                      <p className="font-medium">{order.deliveryDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-primary">₹{(order.totalPrice * 1.18).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'completed' && (
                      <>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
