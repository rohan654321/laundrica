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
  WashingMachine, Shirt,
  Footprints,
  LayoutGrid,
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
  image?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'website' | 'whatsapp'>('website');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await serviceAPI.getAllServices();
      let servicesList: Service[] = [];
      if (data?.success && data.services) servicesList = data.services;
      else if (data?.data && Array.isArray(data.data)) servicesList = data.data;
      else if (Array.isArray(data)) servicesList = data;
      servicesList.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setServices(servicesList);
      if (servicesList.length > 0) setSelectedService(servicesList[0]);
    } catch (err: any) {
      setError(err.message || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

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

  const getCategoryLabel = (category: string) => {
    const labelMap: Record<string, string> = {
      'laundry': 'Laundry', 'dry-cleaning': 'Dry Cleaning',
      'shoe-cleaning': 'Shoe Care', 'carpet-cleaning': 'Carpet',
      'curtain-cleaning': 'Curtains', 'commercial': 'Commercial',
    };
    return labelMap[category] || category;
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "971501234567";
    const message = encodeURIComponent(`Hello! I'm interested in ${selectedService?.name} service. Could you please help me place an order?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Get hero image based on selected service category
  const getHeroImage = () => {
    if (selectedService?.image && !imageErrors.has(selectedService.image)) {
      return selectedService.image;
    }
    const imageMap: Record<string, string> = {
      'laundry': '/images/laundry.jpg',
      'dry-cleaning': '/images/dryCleaning.jpg',
      'carpet-cleaning': '/images/carpetCleaning.jpg',
      'shoe-cleaning': '/images/shoeCleaning.jpg',
      'curtain-cleaning': '/images/curtainCleaning.jpg',
      'commercial': '/images/commercialCleaning.jpg',
    };
    return imageMap[selectedService?.category || 'laundry'] || '/images/laundry.jpg';
  };

  const handleImageError = () => {
    if (selectedService?.image && !imageErrors.has(selectedService.image)) {
      setImageErrors(prev => new Set(prev).add(selectedService.image!));
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0  border-4 border-emerald-100"></div>
              <div className="absolute inset-0  border-4 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <p className="text-gray-700 font-semibold">Loading services...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-32 px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50  flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-500 mb-5">{error}</p>
            <button onClick={fetchServices} className="bg-emerald-600 text-white px-6 py-2 ">Try Again</button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner Section - Dynamic Image based on selected service */}
      <section>
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{ backgroundImage: `url('${getHeroImage()}')` }}
        >
          {/* Gradient Overlay - Forest Green */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d2a]/85 via-[#0b3d2a]/55 to-transparent" />

          {/* BOTTOM SHADE */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d2a]/75 via-transparent to-transparent" />

          {/* Centered Content */}
          <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm  border border-white/20 mx-auto w-fit">
              <Leaf className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Eco-Friendly Cleaning</span>
            </div>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Care That <span className="text-yellow-300">Your Clothes</span>
            </h1>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
              Choose from our premium laundry & dry-cleaning services
            </h2>
          </div>
        </div>

        {/* Layout */}
        <div className="layout-wrap flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '28px', alignItems: 'start' }}>
              {/* Sidebar */}
              <aside className="sidebar-card" style={{ background: '#fff', border: '1px solid #daeee3', boxShadow: '0 2px 12px rgba(30,138,82,.07)', overflow: 'hidden', position: 'sticky', top: '88px' }}>
                <div className="sidebar-head" style={{ padding: '18px 20px', background: 'linear-gradient(135deg, #f0faf4, #fff)', borderBottom: '1px solid #daeee3', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="sidebar-count" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#1e8a52', fontWeight: 700 }}>{services.length}</span>
                  <span className="sidebar-label" style={{ color: '#6b8070', fontSize: '.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Services Available</span>
                </div>
                <nav className="sidebar-nav" style={{ maxHeight: '520px', overflowY: 'auto' }}>
                  {services.map(service => (
                    <button
                      key={service._id}
                      onClick={() => setSelectedService(service)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
                        border: 'none', background: selectedService?._id === service._id ? '#f0faf4' : 'none',
                        cursor: 'pointer', transition: 'background .18s', textAlign: 'left',
                        borderLeft: selectedService?._id === service._id ? '3px solid #2da065' : '3px solid transparent'
                      }}
                    >
                      <span style={{
                        width: '40px', height: '40px',
                        background: selectedService?._id === service._id ? '#1e8a52' : '#d9f2e3',
                        color: selectedService?._id === service._id ? '#fff' : '#1e8a52',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        boxShadow: selectedService?._id === service._id ? '0 4px 14px rgba(30,138,82,.35)' : 'none'
                      }}>
                        {getCategoryIcon(service.category)}
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', color: '#0f2d1c' }}>{service.name}</span>
                        <span style={{ display: 'block', fontSize: '.75rem', color: '#6b8070', marginTop: '2px' }}>
                          {getCategoryLabel(service.category)}
                          {service.turnaround && <> · {service.turnaround}</>}
                        </span>
                      </span>
                      {selectedService?._id === service._id && <ChevronRight className="w-4 h-4" style={{ color: '#2da065' }} />}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Detail Panel */}
              <div className="detail-col">
                <AnimatePresence mode="wait">
                  {selectedService && (
                    <motion.div
                      key={selectedService._id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.28 }}
                      className="detail-card"
                      style={{ background: '#fff', border: '1px solid #daeee3', boxShadow: '0 6px 28px rgba(30,138,82,.12)', overflow: 'hidden' }}
                    >
                      <div className="detail-header" style={{ padding: '28px 28px 0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #2da065, #16703f)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 18px rgba(30,138,82,.3)' }}>
                          {getCategoryIcon(selectedService.category, 'w-6 h-6')}
                        </div>
                        <div>
                          <div style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#2da065', marginBottom: '4px' }}>{getCategoryLabel(selectedService.category)}</div>
                          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.7rem', color: '#0f2d1c', lineHeight: 1.25 }}>{selectedService.name}</h2>
                          {selectedService.isFeatured && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fef3c7', color: '#92400e', fontSize: '.72rem', fontWeight: 700, padding: '4px 10px', marginTop: '6px' }}>
                              <Star className="w-3 h-3 fill-current" /> Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <p style={{ padding: '14px 28px 0', color: '#374a3c', fontSize: '.95rem', lineHeight: 1.65 }}>
                        {selectedService.description || 'Professional cleaning service with premium quality and gentle care for all your garments.'}
                      </p>

                      {/* Stat chips */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '22px 28px 0' }}>
                        {[
                          { icon: <Truck className="w-4 h-4" />, label: 'Pickup', value: 'Free Doorstep' },
                          { icon: <Clock className="w-4 h-4" />, label: 'Turnaround', value: selectedService.turnaround || '24–48 hrs' },
                          { icon: <Leaf className="w-4 h-4" />, label: 'Products', value: 'Eco-Friendly' },
                          { icon: <Shield className="w-4 h-4" />, label: 'Insurance', value: '100% Covered' },
                        ].map(s => (
                          <div key={s.label} style={{ background: '#f0faf4', border: '1px solid #d9f2e3', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{ color: '#2da065', flexShrink: 0 }}>{s.icon}</span>
                            <div>
                              <div style={{ fontSize: '.68rem', color: '#6b8070', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</div>
                              <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#0f2d1c', marginTop: '2px' }}>{s.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div style={{ padding: '22px 28px 0' }}>
                        <h3 style={{ fontWeight: 700, color: '#0f2d1c', marginBottom: '12px', fontSize: '.95rem' }}>Why choose this service?</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          {[
                            'Professional cleaning techniques',
                            'Premium eco-friendly products',
                            'Stain removal specialists',
                            'Quality checked before return',
                            'Free pickup & delivery',
                            '24/7 customer support',
                          ].map(b => (
                            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.85rem', color: '#374a3c' }}>
                              <CheckCircle2 className="w-4 h-4" style={{ color: '#2da065', flexShrink: 0 }} />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div style={{ padding: '24px 28px 0', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', borderTop: '1px solid #daeee3', margin: '22px 28px 0', paddingTop: '22px' }}>
                        <div style={{ display: 'flex', background: '#f0faf4', padding: '4px', border: '1px solid #d9f2e3', paddingTop: '4px'}}>
                          <button
                            onClick={() => setActiveTab('website')}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px',
                              border: 'none', background: activeTab === 'website' ? '#fff' : 'none',
                               fontSize: '.82rem', fontWeight: 600,
                              color: activeTab === 'website' ? '#1e8a52' : '#6b8070',
                              cursor: 'pointer', boxShadow: activeTab === 'website' ? '0 2px 12px rgba(30,138,82,.07)' : 'none'
                            }}
                          >
                            <Globe className="w-4 h-4" /> Book Online
                          </button>
                          <button
                            onClick={() => setActiveTab('whatsapp')}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px',
                              border: 'none', background: activeTab === 'whatsapp' ? '#fff' : 'none',
                              borderRadius: '9px', fontSize: '.82rem', fontWeight: 600,
                              color: activeTab === 'whatsapp' ? '#1e8a52' : '#6b8070',
                              cursor: 'pointer', boxShadow: activeTab === 'whatsapp' ? '0 2px 12px rgba(30,138,82,.07)' : 'none'
                            }}
                          >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                          </button>
                        </div>

                        {activeTab === 'website' ? (
                          <Link href={`/services/${selectedService.slug}/orders`}>
                            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #2da065, #16703f)', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(30,138,82,.3)' }}>
                              Book Now <ArrowRight className="w-4 h-4" />
                            </button>
                          </Link>
                        ) : (
                          <button onClick={handleWhatsAppOrder} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,211,102,.3)' }}>
                            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
                          </button>
                        )}
                      </div>

                      {activeTab === 'whatsapp' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{ margin: '14px 28px 28px', padding: '12px 16px', background: '#f0fdf6', border: '1px solid #bbf7d0', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '.82rem', color: '#166534', lineHeight: 1.55 }}
                        >
                          <Heart className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a', marginTop: '2px' }} />
                          <p>Order via WhatsApp and get personalized help with pricing, scheduling, and any special requirements.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Other services */}
                {services.length > 1 && (
                  <div style={{ marginTop: '28px' }}>
                    <h3 style={{ fontSize: '.82rem', fontWeight: 700, color: '#6b8070', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '12px' }}>Explore Other Services</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {services.filter(s => s._id !== selectedService?._id).slice(0, 3).map(service => (
                        <button
                          key={service._id}
                          onClick={() => setSelectedService(service)}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #daeee3', padding: '12px 14px', cursor: 'pointer', textAlign: 'left' }}
                        >
                          <span style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f0faf4', color: '#1e8a52', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {getCategoryIcon(service.category, 'w-4 h-4')}
                          </span>
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, color: '#0f2d1c' }}>{service.name}</span>
                            <span style={{ display: 'block', fontSize: '.72rem', color: '#6b8070', marginTop: '2px' }}>{getCategoryLabel(service.category)}</span>
                          </span>
                          <ChevronRight className="w-4 h-4" style={{ color: '#7dcea8', flexShrink: 0 }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: '#fff', borderTop: '1px solid #daeee3', padding: '28px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
            {[
              { icon: <Truck className="w-5 h-5" />, title: 'Free Pickup', sub: 'From your doorstep' },
              { icon: <Clock className="w-5 h-5" />, title: '24hr Service', sub: 'Quick turnaround' },
              { icon: <Shield className="w-5 h-5" />, title: '100% Safe', sub: 'Quality assured' },
              { icon: <MessageCircle className="w-5 h-5" />, title: '24/7 Support', sub: 'WhatsApp & Call' },
            ].map(t => (
              <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0faf4', color: '#1e8a52', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: '.9rem', fontWeight: 700, color: '#0f2d1c' }}>{t.title}</div>
                  <div style={{ fontSize: '.75rem', color: '#6b8070', marginTop: '2px' }}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, width: '52px', height: '52px', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,.45)' }}>
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </main>
  );
}