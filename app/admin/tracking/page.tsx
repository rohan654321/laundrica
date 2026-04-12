// app/admin/tracking/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Package,
  Home,
  Send,
  RefreshCw,
  AlertCircle,
  Printer,
  Mail,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
  _id: string;
  orderNumber: string;
  trackingNumber: string;
  user: { name: string; email: string; phone: string };
  status: string;
  total: number;
  createdAt: string;
  items: Array<{ name: string; quantity: number }>;
}

interface TrackingUpdate {
  status: string;
  location: string;
  description: string;
  timestamp: Date;
  estimatedDelivery?: Date;
}

const trackingStatuses = [
  { value: 'pending', label: 'Pending', icon: Clock, color: 'bg-gray-500', nextStatus: 'confirmed' },
  { value: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, color: 'bg-blue-500', nextStatus: 'processing' },
  { value: 'processing', label: 'Processing', icon: Package, color: 'bg-purple-500', nextStatus: 'picked_up' },
  { value: 'picked_up', label: 'Picked Up', icon: Truck, color: 'bg-indigo-500', nextStatus: 'washing' },
  { value: 'washing', label: 'Washing', icon: Package, color: 'bg-cyan-500', nextStatus: 'drying' },
  { value: 'drying', label: 'Drying', icon: Package, color: 'bg-teal-500', nextStatus: 'ironing' },
  { value: 'ironing', label: 'Ironing / Pressing', icon: Package, color: 'bg-sky-500', nextStatus: 'quality_check' },
  { value: 'quality_check', label: 'Quality Check', icon: CheckCircle, color: 'bg-emerald-500', nextStatus: 'ready_for_pickup' },
  { value: 'ready_for_pickup', label: 'Ready for Pickup', icon: MapPin, color: 'bg-yellow-500', nextStatus: 'out_for_delivery' },
  { value: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'bg-orange-500', nextStatus: 'delivered' },
  { value: 'delivered', label: 'Delivered', icon: Home, color: 'bg-green-500', nextStatus: null },
  { value: 'cancelled', label: 'Cancelled', icon: AlertCircle, color: 'bg-red-500', nextStatus: null },
];

export default function AdminTracking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateTrackingModal, setShowCreateTrackingModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    location: '',
    description: '',
    estimatedDelivery: '',
  });

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?status=${statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTrackingNumber = () => {
    const prefix = 'LND';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const createTracking = async (order: Order) => {
    try {
      const token = localStorage.getItem('token');
      const trackingNumber = generateTrackingNumber();
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${order._id}/tracking`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            trackingNumber,
            status: 'pending',
            history: [{
              status: 'pending',
              description: 'Order received and tracking created',
              timestamp: new Date(),
              location: 'Laundrica Facility',
            }],
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchOrders();
        setShowCreateTrackingModal(false);
        alert(`Tracking created! Number: ${trackingNumber}`);
      }
    } catch (error) {
      console.error('Error creating tracking:', error);
      alert('Error creating tracking');
    }
  };

  const updateTracking = async () => {
    if (!selectedOrder || !updateData.status) return;
    
    try {
      const token = localStorage.getItem('token');
      const statusInfo = trackingStatuses.find(s => s.value === updateData.status);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${selectedOrder._id}/tracking`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: updateData.status,
            trackingUpdate: {
              status: updateData.status,
              description: updateData.description || `${statusInfo?.label} at ${updateData.location || 'Laundrica Facility'}`,
              location: updateData.location || 'Laundrica Facility',
              estimatedDelivery: updateData.estimatedDelivery,
              timestamp: new Date(),
            },
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchOrders();
        setShowUpdateModal(false);
        setSelectedOrder(null);
        setUpdateData({ status: '', location: '', description: '', estimatedDelivery: '' });
        alert('Tracking updated successfully!');
      }
    } catch (error) {
      console.error('Error updating tracking:', error);
      alert('Error updating tracking');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusInfo = (status: string) => {
    return trackingStatuses.find(s => s.value === status) || trackingStatuses[0];
  };

  const getNextStatuses = (currentStatus: string) => {
    const currentIndex = trackingStatuses.findIndex(s => s.value === currentStatus);
    if (currentIndex === -1) return [];
    return trackingStatuses.slice(currentIndex + 1).filter(s => s.value !== 'cancelled');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Tracking Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create tracking numbers and update order status for customers
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by order number, customer name, or tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="">All Status</option>
            {trackingStatuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Order #
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Tracking Number
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Current Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr key={order._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                        {order.orderNumber}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.user?.name || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">{order.user?.email || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {order.trackingNumber ? (
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                            {order.trackingNumber}
                          </code>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowCreateTrackingModal(true);
                            }}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1"
                          >
                            <Plus size={14} />
                            Create Tracking
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {order.trackingNumber && (
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                            <span className="text-sm">{statusInfo.label}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        {order.trackingNumber && (
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setUpdateData({
                                status: order.status,
                                location: '',
                                description: '',
                                estimatedDelivery: '',
                              });
                              setShowUpdateModal(true);
                            }}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                          >
                            <Truck size={14} />
                            Update Status
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Tracking Modal */}
      <AnimatePresence>
        {showCreateTrackingModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowCreateTrackingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Tracking
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Generate a tracking number for order #{selectedOrder.orderNumber}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Customer: {selectedOrder.user?.name} ({selectedOrder.user?.email})
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateTrackingModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createTracking(selectedOrder)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Tracking
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Tracking Modal */}
      <AnimatePresence>
        {showUpdateModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={() => setShowUpdateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Update Order Status
              </h2>
              
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500">Order #{selectedOrder.orderNumber}</p>
                <p className="font-medium">{selectedOrder.user?.name}</p>
                <code className="text-xs text-gray-500">Tracking: {selectedOrder.trackingNumber}</code>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Update Status *</label>
                  <select
                    value={updateData.status}
                    onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  >
                    <option value="">Select new status</option>
                    {getNextStatuses(selectedOrder.status).map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                    <option value="cancelled">Cancel Order</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={updateData.location}
                    onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                    placeholder="e.g., Laundrica Facility, Dubai Mall, etc."
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={updateData.description}
                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                    placeholder="e.g., Your laundry has been picked up and is being processed"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Delivery Date</label>
                  <input
                    type="datetime-local"
                    value={updateData.estimatedDelivery}
                    onChange={(e) => setUpdateData({ ...updateData, estimatedDelivery: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTracking}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Update Status
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}