'use client';

import { useState } from 'react';
import {
  Search,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Package,
  Home,
  Send,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackingUpdate {
  orderId: string;
  trackingNumber: string;
  status: string;
  location: string;
  description: string;
  estimatedDelivery: string;
}

export default function AdminTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    location: '',
    description: '',
    estimatedDelivery: '',
  });

  const searchOrder = async () => {
    if (!trackingNumber) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/track/${trackingNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setOrderData(data);
        setUpdateData({
          status: data.orderStatus,
          location: '',
          description: '',
          estimatedDelivery: data.estimatedDelivery || '',
        });
      }
    } catch (error) {
      console.error('Error searching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTracking = async () => {
    if (!orderData || !updateData.status) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderData.orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: updateData.status,
            trackingUpdate: {
              description: updateData.description,
              location: updateData.location,
              estimatedDelivery: updateData.estimatedDelivery,
            },
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert('Tracking updated successfully!');
        searchOrder(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating tracking:', error);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { value: 'processing', label: 'Processing', icon: Package },
    { value: 'ready_for_pickup', label: 'Ready for Pickup', icon: MapPin },
    { value: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { value: 'delivered', label: 'Delivered', icon: Home },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Tracking</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track and update order delivery status
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter tracking number (e.g., LND12345678ABCD)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono"
            />
          </div>
          <button
            onClick={searchOrder}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Search size={18} />
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </div>
      </div>

      {/* Order Details */}
      {orderData && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Number:</span>
                <span className="font-mono font-medium">{orderData.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="font-mono font-medium">{orderData.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Status:</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {orderData.orderStatus}
                </span>
              </div>
              {orderData.estimatedDelivery && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span>{new Date(orderData.estimatedDelivery).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Tracking History */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Tracking History</h3>
              <div className="space-y-4">
                {orderData.tracking?.history?.slice().reverse().map((event: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-600"></div>
                      {index !== orderData.tracking.history.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 ml-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                      {event.location && (
                        <p className="text-sm text-gray-500">Location: {event.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Update Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Update Tracking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                >
                  <option value="">Select status</option>
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={updateData.location}
                  onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                  placeholder="e.g., Laundrica Facility, Dubai"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  placeholder="e.g., Order has been picked up and is being processed"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estimated Delivery Date</label>
                <input
                  type="date"
                  value={updateData.estimatedDelivery.split('T')[0]}
                  onChange={(e) => setUpdateData({ ...updateData, estimatedDelivery: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>

              <button
                onClick={updateTracking}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Update Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}