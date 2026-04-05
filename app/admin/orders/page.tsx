'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  Home,
  MoreVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Order {
  _id: string;
  orderNumber: string;
  user: { name: string; email: string; phone: string };
  total: number;
  status: string;
  createdAt: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: Package },
  { value: 'ready_for_pickup', label: 'Ready for Pickup', color: 'bg-indigo-100 text-indigo-800', icon: Package },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800', icon: Truck },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800', icon: Home },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?page=${page}&status=${statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const bulkUpdateStatus = async (newStatus: string) => {
    if (selectedOrders.length === 0) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/bulk-update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderIds: selectedOrders,
            status: newStatus,
            trackingUpdate: {
              description: `Bulk update to ${newStatus}`,
              location: 'Admin Dashboard',
            },
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSelectedOrders([]);
        fetchOrders();
      }
    } catch (error) {
      console.error('Error bulk updating orders:', error);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o._id));
    }
  };

  const exportOrders = () => {
    const csvData = filteredOrders.map(order => ({
      'Order Number': order.orderNumber,
      'Customer': order.user?.name,
      'Email': order.user?.email,
      'Total': order.total,
      'Status': order.status,
      'Date': new Date(order.createdAt).toLocaleDateString(),
    }));
    
    const csv = convertToCSV(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString()}.csv`;
    a.click();
  };

  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => JSON.stringify(obj[header])).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportOrders}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </button>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by order number, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">All Status</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-green-700 dark:text-green-400">
                {selectedOrders.length} orders selected
              </span>
              <button
                onClick={() => setSelectedOrders([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
            <div className="flex gap-2">
              <select
                onChange={(e) => bulkUpdateStatus(e.target.value)}
                className="px-3 py-1 text-sm border rounded-lg bg-white dark:bg-gray-800"
                defaultValue=""
              >
                <option value="" disabled>Bulk Action</option>
                <option value="confirmed">Mark as Confirmed</option>
                <option value="processing">Mark as Processing</option>
                <option value="out_for_delivery">Mark as Out for Delivery</option>
                <option value="delivered">Mark as Delivered</option>
                <option value="cancelled">Mark as Cancelled</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b">
                  <tr>
                    <th className="w-12 py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Order #
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Items
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Total
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const statusOption = statusOptions.find(opt => opt.value === order.status);
                    const StatusIcon = statusOption?.icon || Clock;
                    
                    return (
                      <tr key={order._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => toggleSelectOrder(order._id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                          {order.orderNumber}
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {order.user?.name || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {order.user?.email || 'N/A'}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                          {order.items?.length || 0} items
                        </td>
                        <td className="py-4 px-6 font-medium text-green-600">
                          AED {order.total?.toFixed(2) || '0.00'}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusOption?.color}`}
                          >
                            {statusOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <Link href={`/admin/orders/${order._id}`}>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <Eye size={18} />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 py-6 border-t">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-4 py-1 text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}