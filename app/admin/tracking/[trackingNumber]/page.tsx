// app/track/[trackingNumber]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Home,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackingInfo {
  trackingNumber: string;
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  history: Array<{
    status: string;
    description: string;
    location: string;
    timestamp: string;
  }>;
  order: {
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    deliveryAddress: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
}

const statusSteps = [
  { key: 'pending', label: 'Order Received', icon: Clock, description: 'Your order has been received' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, description: 'Order has been confirmed' },
  { key: 'processing', label: 'Processing', icon: Package, description: 'Preparing your items' },
  { key: 'picked_up', label: 'Picked Up', icon: Truck, description: 'Items have been picked up' },
  { key: 'washing', label: 'Washing', icon: Package, description: 'Washing in progress' },
  { key: 'drying', label: 'Drying', icon: Package, description: 'Drying in progress' },
  { key: 'ironing', label: 'Ironing', icon: Package, description: 'Ironing & pressing' },
  { key: 'quality_check', label: 'Quality Check', icon: CheckCircle, description: 'Final quality check' },
  { key: 'ready_for_pickup', label: 'Ready for Pickup', icon: MapPin, description: 'Ready for collection' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, description: 'On the way to you' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Successfully delivered' },
];

export default function TrackOrderPage({ params }: { params: { trackingNumber: string } }) {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrackingInfo();
  }, [params.trackingNumber]);

  const fetchTrackingInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/track/${params.trackingNumber}`
      );
      const data = await response.json();
      if (data.success) {
        setTrackingInfo(data.tracking);
      } else {
        setError(data.message || 'Tracking number not found');
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
      setError('Unable to fetch tracking information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !trackingInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tracking Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {error || 'Please check your tracking number and try again'}
          </p>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === trackingInfo.status);
  const currentStep = statusSteps[currentStatusIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Truck size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Track Your Order
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Tracking Number: <span className="font-mono font-semibold">{trackingInfo.trackingNumber}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Order Number: {trackingInfo.orderNumber}
          </p>
        </div>

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              {currentStep?.icon ? <currentStep.icon size={24} className="text-green-600" /> : <Truck size={24} className="text-green-600" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Current Status: {currentStep?.label || trackingInfo.status}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {currentStep?.description}
              </p>
            </div>
          </div>
          
          {trackingInfo.estimatedDelivery && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-4 pt-4 border-t">
              <Calendar size={16} />
              <span>Estimated Delivery: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</span>
            </div>
          )}
          
          {trackingInfo.currentLocation && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
              <MapPin size={16} />
              <span>Current Location: {trackingInfo.currentLocation}</span>
            </div>
          )}
        </motion.div>

        {/* Tracking Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Order Timeline
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
            
            {/* Timeline items */}
            <div className="space-y-6">
              {trackingInfo.history.map((event, index) => {
                const step = statusSteps.find(s => s.key === event.status);
                const Icon = step?.icon || CheckCircle;
                const isCompleted = true;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-4"
                  >
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <Icon size={20} className={isCompleted ? 'text-green-600' : 'text-gray-400'} />
                      </div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {step?.label || event.status}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                        {event.description}
                      </p>
                      {event.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Items */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Summary
            </h3>
            <div className="space-y-3">
              {trackingInfo.order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium">AED {item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">AED {trackingInfo.order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delivery Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Delivery Address</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {trackingInfo.order.deliveryAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Contact Number</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {trackingInfo.order.customerPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {trackingInfo.order.customerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Need help? Contact our support team at{' '}
            <a href="tel:+97141234567" className="text-green-600 hover:underline">
              +971 4 123 4567
            </a>{' '}
            or email{' '}
            <a href="mailto:support@laundrica.com" className="text-green-600 hover:underline">
              support@laundrica.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}