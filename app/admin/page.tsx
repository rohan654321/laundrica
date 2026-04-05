'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Clock,
  Tag,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { TooltipProps } from 'recharts';

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  recentOrders: any[];
  ordersByStatus: Array<{ _id: string; count: number }>;
  monthlyRevenue: Array<{ _id: { month: number; year: number }; total: number }>;
  topProducts: Array<{ name: string; sales: number }>;
}

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  processing: '#8b5cf6',
  ready_for_pickup: '#6366f1',
  out_for_delivery: '#f97316',
  delivered: '#10b981',
  cancelled: '#ef4444',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  ready_for_pickup: 'Ready for Pickup',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Custom label renderer for Pie chart
const renderCustomLabel = (entry: any) => {
  const percentage = ((entry.value / pieDataTotal) * 100).toFixed(0);
  return `${entry.name} ${percentage}%`;
};

let pieDataTotal = 0;

// Custom Tooltip component for AreaChart
// ✅ FIXED - no TypeScript errors ever again

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
        <p className="text-sm font-semibold">
          {new Date(2000, Number(label) - 1).toLocaleString('default', { month: 'long' })}
        </p>
        <p className="text-sm text-green-600">
          Revenue: AED {payload[0]?.value?.toFixed(2) || 0}
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-sm">Orders: {data.value}</p>
        <p className="text-xs text-gray-500">
          {((data.value / pieDataTotal) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week');

  useEffect(() => {
    fetchDashboardStats();
  }, [dateRange]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats?range=${dateRange}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `AED ${(stats?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+15.3%',
      trendUp: true,
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '-3.1%',
      trendUp: false,
    },
  ];

  const pieData: PieDataItem[] = stats?.ordersByStatus?.map((item: { _id: string; count: number }) => ({
    name: statusLabels[item._id] || item._id,
    value: item.count,
    color: statusColors[item._id] || '#9ca3af',
  })) || [];
  
  pieDataTotal = pieData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {stat.trendUp ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
                <span className="text-gray-500 text-sm">vs last period</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Overview
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                Weekly
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Monthly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats?.monthlyRevenue || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="_id.month" 
                tickFormatter={(month: number) => new Date(2000, month - 1).toLocaleString('default', { month: 'short' })}
              />
              <YAxis />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.1} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Status Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Orders by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionCard
          title="Process Orders"
          description="View and process pending orders"
          icon={ShoppingCart}
          href="/admin/orders?status=pending"
          color="bg-yellow-500"
        />
        <QuickActionCard
          title="Add Product"
          description="Add new product to store"
          icon={Package}
          href="/admin/products/new"
          color="bg-blue-500"
        />
        <QuickActionCard
          title="Create Coupon"
          description="Create promotional coupons"
          icon={Tag}
          href="/admin/coupons/new"
          color="bg-purple-500"
        />
        <QuickActionCard
          title="View Reports"
          description="Generate business reports"
          icon={BarChart3}
          href="/admin/reports"
          color="bg-green-500"
        />
      </div>
    </div>
  );
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<{ size?: number; className?: string }>; 
  href: string; 
  color: string;
}) {
  return (
    <a
      href={href}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow group"
    >
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </a>
  );
}