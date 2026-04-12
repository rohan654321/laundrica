// app/admin/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Sparkles,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerUnit: number;
  unit: string;
  category: string;
  estimatedTime: number;
  isActive: boolean;
  isPopular: boolean;
  icon?: string;
  createdAt: string;
}

const serviceCategories = [
  'laundry',
  'dry-cleaning',
  'steam-pressing',
  'shoe-cleaning',
  'carpet-cleaning',
  'curtain-cleaning',
  'commercial',
  'premium',
];

const units = ['kg', 'piece', 'item', 'sq ft', 'pair'];

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    pricePerUnit: '',
    unit: 'kg',
    category: 'laundry',
    estimatedTime: '30',
    isActive: true,
    isPopular: false,
  });

  useEffect(() => {
    fetchServices();
  }, [page, categoryFilter]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/items?page=${page}&category=${categoryFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setServices(data.serviceItems);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingService
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/items/${editingService._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/items`;
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice),
          pricePerUnit: parseFloat(formData.pricePerUnit),
          estimatedTime: parseInt(formData.estimatedTime),
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchServices();
        setShowModal(false);
        resetForm();
      } else {
        alert(data.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    }
  };

  const deleteService = async () => {
    if (!selectedService) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/items/${selectedService._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchServices();
        setShowDeleteModal(false);
        setSelectedService(null);
      } else {
        alert(data.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      pricePerUnit: '',
      unit: 'kg',
      category: 'laundry',
      estimatedTime: '30',
      isActive: true,
      isPopular: false,
    });
    setEditingService(null);
  };

  const editService = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      basePrice: service.basePrice.toString(),
      pricePerUnit: service.pricePerUnit.toString(),
      unit: service.unit,
      category: service.category,
      estimatedTime: service.estimatedTime.toString(),
      isActive: service.isActive,
      isPopular: service.isPopular,
    });
    setShowModal(true);
  };

  const toggleServiceStatus = async (serviceId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/items/${serviceId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your laundry and cleaning services
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
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="">All Categories</option>
            {serviceCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <button
            onClick={fetchServices}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Sparkles size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <span className="text-xs text-gray-500 capitalize">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editService(service)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Base Price</span>
                      <span className="font-semibold text-green-600">
                        AED {service.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Price per {service.unit}</span>
                      <span className="font-medium">
                        AED {service.pricePerUnit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Est. Time</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {service.estimatedTime} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      {service.isPopular && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleServiceStatus(service._id, service.isActive)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                        service.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {service.isActive ? (
                        <>
                          <CheckCircle size={14} />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          Inactive
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-6">
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

      {/* Create/Edit Service Modal */}
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
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    >
                      {serviceCategories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Unit *</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Base Price (AED) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per Unit (AED) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.pricePerUnit}
                      onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Time (minutes) *</label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Popular</span>
                  </label>
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
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Delete Service
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete "{selectedService.name}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteService}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
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