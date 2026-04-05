'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Tag,
  Calendar,
  DollarSign,
  Percent,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount: number | null;
  minPurchase: number;
  validFrom: string;
  validTo: string;
  usageLimit: number | null;
  usageLimitPerUser: number | null;
  usageCount: number;
  isActive: boolean;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    maxDiscount: '',
    minPurchase: '0',
    validFrom: '',
    validTo: '',
    usageLimit: '',
    usageLimitPerUser: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingCoupon
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/${editingCoupon._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/coupons`;
      
      const response = await fetch(url, {
        method: editingCoupon ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          discountValue: parseFloat(formData.discountValue),
          maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
          minPurchase: parseFloat(formData.minPurchase),
          usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
          usageLimitPerUser: formData.usageLimitPerUser ? parseInt(formData.usageLimitPerUser) : null,
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchCoupons();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        fetchCoupons();
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      maxDiscount: '',
      minPurchase: '0',
      validFrom: '',
      validTo: '',
      usageLimit: '',
      usageLimitPerUser: '',
      isActive: true,
    });
    setEditingCoupon(null);
  };

  const editCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || '',
      minPurchase: coupon.minPurchase.toString(),
      validFrom: coupon.validFrom.split('T')[0],
      validTo: coupon.validTo.split('T')[0],
      usageLimit: coupon.usageLimit?.toString() || '',
      usageLimitPerUser: coupon.usageLimitPerUser?.toString() || '',
      isActive: coupon.isActive,
    });
    setShowModal(true);
  };

  const toggleCouponStatus = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchCoupons();
      }
    } catch (error) {
      console.error('Error toggling coupon status:', error);
    }
  };

  const isExpired = (validTo: string) => {
    return new Date(validTo) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create and manage promotional coupons
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => {
            const expired = isExpired(coupon.validTo);
            return (
              <motion.div
                key={coupon._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border ${
                  expired ? 'border-gray-200 dark:border-gray-700' : 'border-green-200 dark:border-green-800'
                }`}
              >
                <div className="p-6">
                  {/* Coupon Code */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Tag size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-mono text-xl font-bold text-green-600">
                          {coupon.code}
                        </h3>
                        <p className="text-sm text-gray-500">{coupon.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editCoupon(coupon)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteCoupon(coupon._id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Discount Info */}
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Discount</span>
                      <span className="font-bold text-xl text-green-600">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% OFF`
                          : `AED ${coupon.discountValue} OFF`}
                      </span>
                    </div>
                    {coupon.minPurchase > 0 && (
                      <p className="text-xs text-gray-500">
                        Min. Purchase: AED {coupon.minPurchase}
                      </p>
                    )}
                    {coupon.maxDiscount && (
                      <p className="text-xs text-gray-500">
                        Max Discount: AED {coupon.maxDiscount}
                      </p>
                    )}
                  </div>

                  {/* Usage Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Used</span>
                      <span className="font-medium">
                        {coupon.usageCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ''}
                      </span>
                    </div>
                    {coupon.usageLimitPerUser && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Per User</span>
                        <span className="font-medium">{coupon.usageLimitPerUser}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Valid Until</span>
                      <span className={`font-medium ${expired ? 'text-red-500' : 'text-green-600'}`}>
                        {new Date(coupon.validTo).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <button
                      onClick={() => toggleCouponStatus(coupon._id, coupon.isActive)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                        coupon.isActive && !expired
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      disabled={expired}
                    >
                      {coupon.isActive && !expired ? (
                        <>
                          <CheckCircle size={14} />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          {expired ? 'Expired' : 'Inactive'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Coupon Code *</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono"
                      placeholder="WELCOME10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder="10% off on first order"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Type *</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (AED)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {formData.discountType === 'percentage' ? 'Discount % *' : 'Discount Amount *'}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder={formData.discountType === 'percentage' ? '10' : '20'}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Purchase (AED)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Discount (AED)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder="Unlimited"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Valid From *</label>
                    <input
                      type="date"
                      value={formData.validFrom}
                      onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valid To *</label>
                    <input
                      type="date"
                      value={formData.validTo}
                      onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Usage Limit (Total)</label>
                    <input
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder="Unlimited"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Usage Limit (Per User)</label>
                    <input
                      type="number"
                      value={formData.usageLimitPerUser}
                      onChange={(e) => setFormData({ ...formData, usageLimitPerUser: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}