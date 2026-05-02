'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { serviceAPI } from '@/lib/api';
import {
  WashingMachine, Shirt,        // instead of DryCleaning
  Footprints,   // instead of Shoe
  LayoutGrid,   // instead of Carpet
  Blinds,
  Briefcase, Sparkles, Clock, Truck, Leaf, Shield,
  ChevronRight, Star, MessageCircle, Globe, Phone,
  CheckCircle2, ArrowRight, Heart
} from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  turnaround?: string;
  features?: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'website' | 'whatsapp'>('website');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await serviceAPI.getAllServices();

      let servicesList: Service[] = [];
      if (data && data.success && data.services) {
        servicesList = data.services;
      } else if (data && data.data && Array.isArray(data.data)) {
        servicesList = data.data;
      } else if (Array.isArray(data)) {
        servicesList = data;
      }

      // Sort by sortOrder
      servicesList.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setServices(servicesList);

      // Select first service by default
      if (servicesList.length > 0) {
        setSelectedService(servicesList[0]);
      }
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setError(err.message || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  // Get icon based on category
  const getCategoryIcon = (category: string, size = "w-5 h-5") => {
    const iconMap: Record<string, React.ReactNode> = {
      'laundry': <WashingMachine className={size} />,
      'dry-cleaning': <Shirt className={size} />,
      'shoe-cleaning': <Footprints className={size} />,
      'carpet-cleaning': <LayoutGrid className={size} />,
      'curtain-cleaning': <Blinds className={size} />,
      'commercial': <Briefcase className={size} />,
    };
    return iconMap[category] || <Sparkles className={size} />;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'laundry': 'from-green-500 to-emerald-600',
      'dry-cleaning': 'from-blue-500 to-indigo-600',
      'shoe-cleaning': 'from-purple-500 to-pink-600',
      'carpet-cleaning': 'from-orange-500 to-red-600',
      'curtain-cleaning': 'from-teal-500 to-cyan-600',
      'commercial': 'from-gray-600 to-gray-800',
    };
    return colorMap[category] || 'from-green-500 to-emerald-600';
  };

  // Get category badge color
  const getCategoryBadgeColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'laundry': 'bg-green-100 text-green-700',
      'dry-cleaning': 'bg-blue-100 text-blue-700',
      'shoe-cleaning': 'bg-purple-100 text-purple-700',
      'carpet-cleaning': 'bg-orange-100 text-orange-700',
      'curtain-cleaning': 'bg-teal-100 text-teal-700',
      'commercial': 'bg-gray-100 text-gray-700',
    };
    return colorMap[category] || 'bg-emerald-100 text-emerald-700';
  };

  const getCategoryLabel = (category: string) => {
    const labelMap: Record<string, string> = {
      'laundry': 'Laundry',
      'dry-cleaning': 'Dry Cleaning',
      'shoe-cleaning': 'Shoe Care',
      'carpet-cleaning': 'Carpet',
      'curtain-cleaning': 'Curtains',
      'commercial': 'Commercial',
    };
    return labelMap[category] || category;
  };

  // Handle WhatsApp order
  const handleWhatsAppOrder = () => {
    const phoneNumber = "971501234567";
    const message = encodeURIComponent(
      `Hello! I'm interested in ${selectedService?.name} service. Could you please share more details and help me place an order?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Loading State
  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">Loading services...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchServices} className="bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Minimal Hero Section - Small, Clean */}
      <section className="pt-20 pb-8 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-600 text-sm font-medium tracking-wide">OUR SERVICES</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Choose Your <span className="text-emerald-600">Service</span>
              </h1>
              <p className="text-gray-500 mt-2 max-w-lg">
                Professional laundry & dry cleaning services tailored to your needs
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Free Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Sidebar + Content Layout */}
      <section className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT SIDEBAR - Service Tabs */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="font-semibold text-gray-900">All Services</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{services.length} services available</p>
                </div>
                <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                  {services.map((service) => (
                    <button
                      key={service._id}
                      onClick={() => setSelectedService(service)}
                      className={`w-full text-left p-4 transition-all duration-200 group ${selectedService?._id === service._id
                          ? 'bg-emerald-50 border-l-4 border-l-emerald-500'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${selectedService?._id === service._id
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                          }`}>
                          {getCategoryIcon(service.category, "w-5 h-5")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium truncate ${selectedService?._id === service._id ? 'text-emerald-700' : 'text-gray-900'
                            }`}>
                            {service.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryBadgeColor(service.category)}`}>
                              {getCategoryLabel(service.category)}
                            </span>
                            {service.turnaround && (
                              <span className="text-xs text-gray-400">{service.turnaround}</span>
                            )}
                          </div>
                        </div>
                        {selectedService?._id === service._id && (
                          <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT - Service Details */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.div
                    key={selectedService._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Service Header with Gradient */}
                    <div className={`bg-gradient-to-r ${getCategoryColor(selectedService.category)} p-6 text-white`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                              {getCategoryIcon(selectedService.category, "w-4 h-4 text-white")}
                            </div>
                            <span className="text-white/80 text-sm">{getCategoryLabel(selectedService.category)}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedService.name}</h2>
                          <p className="text-white/80 text-sm max-w-lg">
                            {selectedService.description || 'Professional cleaning service with premium quality and care.'}
                          </p>
                        </div>
                        {selectedService.isFeatured && (
                          <div className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Service Details Body */}
                    <div className="p-6">
                      {/* Features Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Truck className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-gray-500">Pickup</p>
                            <p className="text-sm font-medium text-gray-900">Free Doorstep</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Clock className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-gray-500">Turnaround</p>
                            <p className="text-sm font-medium text-gray-900">{selectedService.turnaround || '24-48 hours'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Leaf className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-gray-500">Products</p>
                            <p className="text-sm font-medium text-gray-900">Eco-Friendly</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-gray-500">Insurance</p>
                            <p className="text-sm font-medium text-gray-900">100% Covered</p>
                          </div>
                        </div>
                      </div>

                      {/* Service Benefits */}
                      <div className="mb-8">
                        <h3 className="font-semibold text-gray-900 mb-3">Why choose our {selectedService.name.toLowerCase()}?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'Professional cleaning techniques',
                            'Premium eco-friendly products',
                            'Stain removal specialists',
                            'Quality checked before return',
                            'Free pickup & delivery',
                            '24/7 customer support',
                          ].map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        {/* Tab Selector */}
                        <div className="flex bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => setActiveTab('website')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'website'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            <Globe className="w-4 h-4" />
                            Book Online
                          </button>
                          <button
                            onClick={() => setActiveTab('whatsapp')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'whatsapp'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Order
                          </button>
                        </div>

                        <div className="flex-1"></div>

                        {/* Action Button based on selected tab */}
                        {activeTab === 'website' ? (
                          <Link href={`/services/${selectedService.slug}/orders`}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl gap-2">
                              Book Now
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            onClick={handleWhatsAppOrder}
                            className="bg-[#25D366] hover:bg-[#20b859] text-white px-6 py-2.5 rounded-xl gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Order on WhatsApp
                          </Button>
                        )}
                      </div>

                      {/* WhatsApp Info Message */}
                      {activeTab === 'whatsapp' && (
                        <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-start gap-2">
                          <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-green-700">
                            Order via WhatsApp and get personalized assistance. Our team will help you with pricing,
                            scheduling, and any special requirements.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other Services Quick View */}
              {services.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Other Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.filter(s => s._id !== selectedService?._id).slice(0, 3).map((service) => (
                      <button
                        key={service._id}
                        onClick={() => setSelectedService(service)}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group text-left"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                          {getCategoryIcon(service.category, "w-4 h-4 text-gray-500 group-hover:text-emerald-600")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{service.name}</p>
                          <p className="text-xs text-gray-400">{getCategoryLabel(service.category)}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Free Pickup</p>
                <p className="text-xs text-gray-500">From your doorstep</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">24hr Service</p>
                <p className="text-xs text-gray-500">Quick turnaround</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">100% Safe</p>
                <p className="text-xs text-gray-500">Quality assured</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">24/7 Support</p>
                <p className="text-xs text-gray-500">WhatsApp & Call</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </main>
  );
}