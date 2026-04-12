'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { orderAPI } from '@/lib/api';
import { Package, ArrowRight, Loader2, Eye, RotateCcw, Truck } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  tracking?: {
    trackingNumber: string;
    currentStatus: string;
    estimatedDelivery?: string;
    history: Array<{
      status: string;
      timestamp: string;
      description: string;
      location: string;
    }>;
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to load first
    if (authLoading) {
      return;
    }

    // If not authenticated after auth loads, redirect
    if (!isAuthenticated) {
      router.push('/login?redirect=/orders');
      return;
    }

    // If authenticated, fetch orders
    if (isAuthenticated && user) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading, user, router]);

const fetchOrders = async () => {
  setIsLoading(true);
  setError(null);
  try {
    console.log('Fetching orders...');
    // Check if token exists before making request
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/login?redirect=/orders');
      return;
    }
    
    const response = await orderAPI.getMyOrders();
    console.log('Orders response:', response);
    
    if (response.success && response.orders) {
      setOrders(response.orders);
    } else {
      setOrders([]);
      if (response.message === 'No orders found') {
        // This is not an error, just no orders
        setError(null);
      } else {
        setError(response.message || 'Failed to load orders');
      }
    }
  } catch (err: any) {
    console.error('Error fetching orders:', err);
    setError(err.message || 'Failed to load orders');
    setOrders([]);
    
    // If unauthorized, redirect to login
    if (err.message?.includes('log in') || err.message?.includes('expired')) {
      router.push('/login?redirect=/orders');
    }
  } finally {
    setIsLoading(false);
  }
};

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'picked_up': 'bg-indigo-100 text-indigo-800',
      'washing': 'bg-cyan-100 text-cyan-800',
      'drying': 'bg-teal-100 text-teal-800',
      'ironing': 'bg-orange-100 text-orange-800',
      'quality_check': 'bg-pink-100 text-pink-800',
      'ready_for_pickup': 'bg-green-100 text-green-800',
      'out_for_delivery': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusDisplayName = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'processing': 'Processing',
      'picked_up': 'Picked Up',
      'washing': 'Washing',
      'drying': 'Drying',
      'ironing': 'Ironing',
      'quality_check': 'Quality Check',
      'ready_for_pickup': 'Ready for Pickup',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  const handleReorder = async (order: Order) => {
    try {
      const { cartAPI } = await import('@/lib/api');
      for (const item of order.items) {
        await cartAPI.addToCart({
          productId: item.name.toLowerCase().replace(/\s+/g, '-'),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: '/images/redesign/Laundry.svg',
        });
      }
      router.push('/checkout');
    } catch (err) {
      console.error('Error reordering:', err);
    }
  };

  const handleTrackOrder = (trackingNumber: string) => {
    router.push(`/track/${trackingNumber}`);
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Show loading while fetching orders
  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Redirect if not authenticated (after auth loading is done)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">My Orders</h1>
          <p className="text-white/90 mt-2">Track and manage your laundry orders</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              <p className="font-medium">Error loading orders</p>
              <p className="text-sm">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={fetchOrders}
              >
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && orders.length === 0 && !error && (
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
          )}

          {orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Number</p>
                        <p className="text-xl font-bold text-gray-900">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Date</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(order.createdAt)}
                          <span className="text-gray-400 text-sm ml-2">
                            {formatTime(order.createdAt)}
                          </span>
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(order.status)} capitalize`}>
                        {getStatusDisplayName(order.status)}
                      </div>
                    </div>
                  </div>

                  {/* Tracking Info (if available) */}
                  {order.tracking?.trackingNumber && (
                    <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700">Tracking Number:</span>
                        <span className="font-mono font-medium text-blue-800">
                          {order.tracking.trackingNumber}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Items</p>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className="text-gray-800">{item.name}</span>
                            <span className="text-gray-400 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-medium text-gray-900">
                            AED {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-6 bg-gray-50">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">AED {order.subtotal?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="text-gray-900">AED {order.deliveryFee?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (5% VAT)</span>
                        <span className="text-gray-900">AED {order.tax?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-green-600">
                          AED {order.total?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order._id)}
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReorder(order)}
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                      )}
                      
                      {(order.status === 'out_for_delivery' || order.status === 'processing' || order.status === 'ready_for_pickup') && order.tracking?.trackingNumber && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrackOrder(order.tracking!.trackingNumber)}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                    </div>
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