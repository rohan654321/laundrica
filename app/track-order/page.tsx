'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { orderAPI } from '@/lib/api';
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) return;

        setIsLoading(true);
        setError('');
        setOrder(null);

        try {
            const response = await orderAPI.trackOrder(orderNumber);
            if (response.success && response.order) {
                setOrder(response.order);
            } else {
                setError('Order not found. Please check your order number.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to track order');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const statusMap: Record<string, string> = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'processing':
                return <Truck className="w-5 h-5 text-blue-600" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            default:
                return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
                    <p className="text-white/90 text-lg">Enter your order number to track your laundry</p>
                </div>
            </section>

            <div className="flex-1 py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Search Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                        <form onSubmit={handleTrack} className="flex gap-3">
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Enter order number (e.g., ORD-2412-00001)"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 px-6">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Search className="w-4 h-4 mr-2" />
                                        Track
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    {/* Order Details */}
                    {order && (
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                        <p className="text-xl font-bold text-gray-900">{order.orderNumber}</p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-semibold w-fit flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span className="capitalize">{order.status || 'Pending'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Order Items */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                                    <div className="space-y-2">
                                        {order.items?.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                                <span className="font-medium text-gray-900">AED {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                {order.customerInfo && (
                                    <div className="mb-6 pt-4 border-t border-gray-100">
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-green-600" />
                                            Delivery Details
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {order.customerInfo.name}<br />
                                            {order.customerInfo.phone}<br />
                                            {order.customerInfo.address}<br />
                                            {order.customerInfo.city}
                                        </p>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-green-600">AED {order.total?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>

                                {/* Order Date */}
                                <div className="mt-4 text-sm text-gray-500">
                                    Order placed: {new Date(order.createdAt).toLocaleDateString()}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <Link href="/services" className="flex-1">
                                        <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                                            Order Again
                                        </Button>
                                    </Link>
                                    <Link href="/contact" className="flex-1">
                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                            Need Help?
                                        </Button>
                                    </Link>
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