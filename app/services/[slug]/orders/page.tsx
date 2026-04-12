'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { orderAPI } from '@/lib/api';
import { Package, ArrowRight, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

interface Order {
  _id: string;
  id?: string;
  trackingNumber: string;
  status: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
  };
  createdAt: string;
  pickupDate?: string;
  deliveryDate?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderAPI.getMyOrders();
      console.log('Orders fetched:', data);
      
      if (data.success && data.orders) {
        setOrders(data.orders);
      } else if (data.data) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'picked_up':
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      case 'out_for_delivery':
      case 'picked_up':
        return <Truck className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
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
          <h1 className="text-4xl font-bold">My Orders</h1>
          <p className="opacity-90 mt-2">Track and manage your laundry orders</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
              {error}
              <button onClick={fetchOrders} className="ml-4 text-sm underline">
                Try again
              </button>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-gray-900">No Orders Yet</h2>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders. Browse our services and create your first order.
              </p>
              <Link href="/services">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse Services
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id || order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order ID / Tracking Number</p>
                      <p className="text-xl font-bold text-gray-900">{order.trackingNumber || order._id?.slice(-8)}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold w-fit flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status || 'Pending'}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Items</p>
                    <div className="space-y-2">
                      {order.items && order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900">
                            AED {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order Date</p>
                      <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pickup Date</p>
                     <p className="font-medium text-gray-900">
  {order.pickupDate ? formatDate(order.pickupDate) : 'To be scheduled'}
</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-green-600">AED {order.totalAmount?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Delivery Address</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/orders/${order._id || order.id}`)}
                      className="border-gray-300 text-gray-700"
                    >
                      View Details
                    </Button>
                    {order.status?.toLowerCase() !== 'delivered' && order.status?.toLowerCase() !== 'cancelled' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Track Order
                      </Button>
                    )}
                    {order.status?.toLowerCase() === 'delivered' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Reorder
                      </Button>
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