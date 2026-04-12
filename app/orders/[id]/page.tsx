'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { orderAPI } from '@/lib/api';
import { ArrowLeft, Loader2, Package, MapPin, Calendar, CreditCard } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  pickupDetails?: {
    date: string;
    time: string;
    instructions?: string;
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

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) {
      return;
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/login?redirect=/orders');
      return;
    }

    // Fetch order details if authenticated and have id
    const orderId = params?.id as string;
    if (isAuthenticated && orderId) {
      fetchOrderDetails(orderId);
    }
  }, [isAuthenticated, authLoading, params?.id, router]);

  const fetchOrderDetails = async (orderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching order details for:', orderId);
      const response = await orderAPI.getOrderById(orderId);
      console.log('Order details response:', response);
      
      if (response.success && response.order) {
        setOrder(response.order);
      } else {
        setError('Order not found');
      }
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError(err.message || 'Failed to load order details');
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
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show loading while checking auth
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

  // Show loading while fetching order
  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Show error if order not found
  if (error || !order) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The order you are looking for does not exist.'}</p>
            <Link href="/orders">
              <Button className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="mr-2" size={18} />
                Back to Orders
              </Button>
            </Link>
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
          <div className="flex items-center gap-4 mb-4">
            <Link href="/orders">
              <Button variant="ghost" className="text-white hover:bg-white/20 -ml-3">
                <ArrowLeft className="mr-2" size={18} />
                Back to Orders
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Order Details</h1>
          <p className="text-white/90 mt-2">Order #{order.orderNumber}</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)} capitalize`}>
                  {getStatusDisplayName(order.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-medium text-gray-900">{formatDateTime(order.createdAt)}</p>
              </div>
              {order.tracking?.trackingNumber && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                  <p className="font-mono font-medium text-gray-900">{order.tracking.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Price Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">AED {order.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">AED {order.deliveryFee?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5% VAT)</span>
                  <span className="text-gray-900">AED {order.tax?.toFixed(2) || '0.00'}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-AED {order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-green-600">AED {order.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Delivery Address
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-800">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                Phone: {order.shippingAddress.phone}<br />
                Email: {order.shippingAddress.email}
              </p>
            </div>
          </div>

          {/* Pickup Details */}
          {order.pickupDetails && order.pickupDetails.date && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Pickup Schedule
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-800">
                  <strong>Date:</strong> {formatDate(order.pickupDetails.date)}<br />
                  <strong>Time:</strong> {order.pickupDetails.time}<br />
                  {order.pickupDetails.instructions && (
                    <><strong>Instructions:</strong> {order.pickupDetails.instructions}</>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Payment Method
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-800 capitalize">{order.paymentMethod}</p>
            </div>
          </div>

          {/* Tracking History */}
          {order.tracking?.history && order.tracking.history.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Tracking History</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.tracking.history.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        {index !== order.tracking!.history.length - 1 && (
                          <div className="absolute top-5 left-1.5 w-0.5 h-full bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-gray-900">{getStatusDisplayName(event.status)}</p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateTime(event.timestamp)} • {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}