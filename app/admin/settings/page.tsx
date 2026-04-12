// app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import {
  Store,
  Mail,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Save,
  RefreshCw,
  DollarSign,
  Truck,
} from 'lucide-react';

interface Settings {
  store: {
    name: string;
    email: string;
    phone: string;
    address: string;
    currency: string;
    timezone: string;
  };
  email: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    fromName: string;
  };
  payment: {
    stripePublicKey: string;
    stripeSecretKey: string;
    codEnabled: boolean;
    codFee: number;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    expressShippingFee: number;
  };
  notifications: {
    orderConfirmation: boolean;
    orderStatusUpdate: boolean;
    newUserWelcome: boolean;
    adminNewOrder: boolean;
  };
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('store');
  const [settings, setSettings] = useState<Settings>({
    store: {
      name: 'Laundrica',
      email: 'info@laundrica.com',
      phone: '+971 4 123 4567',
      address: 'Dubai, UAE',
      currency: 'AED',
      timezone: 'Asia/Dubai',
    },
    email: {
      smtpHost: '',
      smtpPort: '587',
      smtpUser: '',
      smtpPass: '',
      fromEmail: 'noreply@laundrica.com',
      fromName: 'Laundrica',
    },
    payment: {
      stripePublicKey: '',
      stripeSecretKey: '',
      codEnabled: true,
      codFee: 0,
    },
    shipping: {
      freeShippingThreshold: 100,
      standardShippingFee: 15,
      expressShippingFee: 30,
    },
    notifications: {
      orderConfirmation: true,
      orderStatusUpdate: true,
      newUserWelcome: true,
      adminNewOrder: true,
    },
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (data.success) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'store', label: 'Store Settings', icon: Store },
    { id: 'email', label: 'Email Configuration', icon: Mail },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'shipping', label: 'Shipping Settings', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your store configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {/* Store Settings */}
          {activeTab === 'store' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Store Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settings.store.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      store: { ...settings.store, name: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Store Email</label>
                  <input
                    type="email"
                    value={settings.store.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      store: { ...settings.store, email: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.store.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      store: { ...settings.store, phone: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select
                    value={settings.store.currency}
                    onChange={(e) => setSettings({
                      ...settings,
                      store: { ...settings.store, currency: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  >
                    <option value="AED">AED - UAE Dirham</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <textarea
                    value={settings.store.address}
                    onChange={(e) => setSettings({
                      ...settings,
                      store: { ...settings.store, address: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">SMTP Configuration</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.email.smtpHost}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpHost: e.target.value }
                    })}
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Port</label>
                  <input
                    type="text"
                    value={settings.email.smtpPort}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPort: e.target.value }
                    })}
                    placeholder="587"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Username</label>
                  <input
                    type="text"
                    value={settings.email.smtpUser}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpUser: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Password</label>
                  <input
                    type="password"
                    value={settings.email.smtpPass}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPass: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">From Email</label>
                  <input
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromEmail: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">From Name</label>
                  <input
                    type="text"
                    value={settings.email.fromName}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromName: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Payment Gateway</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Stripe Public Key</label>
                  <input
                    type="text"
                    value={settings.payment.stripePublicKey}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, stripePublicKey: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stripe Secret Key</label>
                  <input
                    type="password"
                    value={settings.payment.stripeSecretKey}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, stripeSecretKey: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono"
                  />
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Cash on Delivery</h3>
                  <label className="flex items-center justify-between mb-3">
                    <span>Enable COD</span>
                    <input
                      type="checkbox"
                      checked={settings.payment.codEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        payment: { ...settings.payment, codEnabled: e.target.checked }
                      })}
                      className="rounded"
                    />
                  </label>
                  <div>
                    <label className="block text-sm font-medium mb-1">COD Fee (AED)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settings.payment.codFee}
                      onChange={(e) => setSettings({
                        ...settings,
                        payment: { ...settings.payment, codFee: parseFloat(e.target.value) }
                      })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Shipping Rates</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Free Shipping Threshold (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.shipping.freeShippingThreshold}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, freeShippingThreshold: parseFloat(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Orders above this amount qualify for free shipping
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Standard Shipping Fee (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.shipping.standardShippingFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, standardShippingFee: parseFloat(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Express Shipping Fee (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.shipping.expressShippingFee}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, expressShippingFee: parseFloat(e.target.value) }
                    })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-gray-500">Send email when order is placed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.orderConfirmation}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, orderConfirmation: e.target.checked }
                    })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Order Status Update</p>
                    <p className="text-sm text-gray-500">Send email when order status changes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.orderStatusUpdate}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, orderStatusUpdate: e.target.checked }
                    })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">New User Welcome</p>
                    <p className="text-sm text-gray-500">Send welcome email to new users</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.newUserWelcome}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newUserWelcome: e.target.checked }
                    })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Admin New Order</p>
                    <p className="text-sm text-gray-500">Notify admin when new order is placed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.adminNewOrder}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, adminNewOrder: e.target.checked }
                    })}
                    className="rounded"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}