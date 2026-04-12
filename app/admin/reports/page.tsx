// app/admin/reports/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Printer,
  Mail,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ReportData {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCustomers: number;
    returningCustomers: number;
    conversionRate: number;
  };
  revenueData: Array<{ date: string; revenue: number; orders: number }>;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  topCategories: Array<{ name: string; value: number }>;
  customerStats: {
    newVsReturning: Array<{ name: string; value: number }>;
    averageOrderFrequency: number;
    customerLifetimeValue: number;
  };
  orderStatusBreakdown: Array<{ name: string; value: number; color: string }>;
}

const dateRanges = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    fetchReports();
  }, [dateRange, customStart, customEnd]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports?range=${dateRange}`;
      
      if (dateRange === 'custom' && customStart && customEnd) {
        url += `&start=${customStart}&end=${customEnd}`;
      }
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setReportData(data.report);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: 'csv' | 'pdf') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/export?format=${format}&range=${dateRange}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${new Date().toISOString()}.${format}`;
      a.click();
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and export business analytics
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => exportReport('csv')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FileText size={18} />
            CSV
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            PDF
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          {dateRange === 'custom' && (
            <>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
            </>
          )}
          <button
            onClick={fetchReports}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 border-b">
        {['overview', 'sales', 'customers', 'products'].map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              reportType === type
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {reportData && (
        <div className="space-y-6">
          {/* Overview Report */}
          {reportType === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={`AED ${reportData.summary.totalRevenue.toFixed(2)}`}
                  icon={DollarSign}
                  trend="+12.5%"
                  trendUp={true}
                />
                <StatCard
                  title="Total Orders"
                  value={reportData.summary.totalOrders}
                  icon={ShoppingCart}
                  trend="+8.2%"
                  trendUp={true}
                />
                <StatCard
                  title="Average Order Value"
                  value={`AED ${reportData.summary.averageOrderValue.toFixed(2)}`}
                  icon={TrendingUp}
                  trend="+3.1%"
                  trendUp={true}
                />
                <StatCard
                  title="Total Customers"
                  value={reportData.summary.totalCustomers}
                  icon={Users}
                  trend="+15.3%"
                  trendUp={true}
                />
              </div>

              {/* Revenue Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={reportData.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                      name="Revenue (AED)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                      name="Orders"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Order Status Breakdown */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-6">Order Status</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData.orderStatusBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label
                      >
                        {reportData.orderStatusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-6">Customer Insights</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600">Returning Customers</span>
                      <span className="font-semibold text-lg">
                        {reportData.summary.returningCustomers}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-semibold text-lg">
                        {reportData.summary.conversionRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600">Avg Order Frequency</span>
                      <span className="font-semibold text-lg">
                        {reportData.customerStats.averageOrderFrequency} orders/customer
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600">Customer Lifetime Value</span>
                      <span className="font-semibold text-lg">
                        AED {reportData.customerStats.customerLifetimeValue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Sales Report */}
          {reportType === 'sales' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Daily Sales Performance</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={reportData.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue (AED)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Top Products</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3">Product</th>
                        <th className="text-left py-3">Units Sold</th>
                        <th className="text-left py-3">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.topProducts.map((product, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{product.name}</td>
                          <td className="py-3">{product.sales}</td>
                          <td className="py-3 text-green-600">
                            AED {product.revenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers Report */}
          {reportType === 'customers' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-6">New vs Returning Customers</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData.customerStats.newVsReturning}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#3b82f6" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-6">Top Categories</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.topCategories} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Products Report */}
          {reportType === 'products' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Product Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3">Product</th>
                      <th className="text-left py-3">Category</th>
                      <th className="text-left py-3">Units Sold</th>
                      <th className="text-left py-3">Revenue</th>
                      <th className="text-left py-3">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.topProducts.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{product.name}</td>
                        <td className="py-3 capitalize">{product.category || 'General'}</td>
                        <td className="py-3">{product.sales}</td>
                        <td className="py-3 text-green-600">
                          AED {product.revenue.toFixed(2)}
                        </td>
                        <td className="py-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${Math.min((product.sales / 100) * 100, 100)}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Icon size={24} className="text-green-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trendUp ? (
          <TrendingUp size={16} className="text-green-500" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}
        <span className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
        <span className="text-gray-500 text-sm">vs last period</span>
      </div>
    </div>
  );
}