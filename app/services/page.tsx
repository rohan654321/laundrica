'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { serviceAPI } from '@/lib/api';
import {
  Star, ChevronRight, Clock, Shield, Truck,
  Leaf, Award, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';

interface Service {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  fullDescription: string;
  image: string;
  icon: string;
  rating: number;
  turnaround: string;
  category: string;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceImage = (serviceName: string): string => {
    const imageMap: { [key: string]: string } = {
      'Laundry Services (Wash & Press)': '/images/laundry.jpg',
      'Dry Cleaning Services': '/images/dryCleaning.jpg',
      'Steam Pressing Service': '/images/steamPressing.jpg',
      'Shoe Cleaning': '/images/shoeCleaning.jpg',
      'Carpet Cleaning': '/images/carpetCleaning.jpg',
      'Curtain Cleaning': '/images/curtainCleaning.jpg',
      'Commercial Laundry': '/images/CommercialLaundry.jpg',
      'Apparel Care': '/images/ApparelCare.jpg',
      'Uniform Services': '/images/Uniform.jpg',
      'Accessories Cleaning': '/images/AccessoriesCleaning.jpg'
    };
    return imageMap[serviceName] || '/images/services/placeholder.jpg';
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await serviceAPI.getAllServices();
      if (data && data.success && data.services) {
        setServices(data.services);
      } else if (data && data.data && Array.isArray(data.data)) {
        setServices(data.data);
      } else if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
        setError('Received unexpected data format from server');
      }
    } catch (err: any) {
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('❌ Cannot connect to backend server. Please make sure the backend is running on port 5000');
      } else if (err.message?.includes('JSON')) {
        setError('❌ Server returned an error page. Please check if backend is running correctly');
      } else {
        setError(err.message || 'Failed to load services');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: <Truck className="w-5 h-5" />, title: "Free Pickup & Delivery", description: "We come to your doorstep" },
    { icon: <Leaf className="w-5 h-5" />, title: "Eco-Friendly", description: "100% biodegradable products" },
    { icon: <Clock className="w-5 h-5" />, title: "24-Hour Turnaround", description: "Quick & efficient service" },
    { icon: <Award className="w-5 h-5" />, title: "Stain Experts", description: "Professional treatment" },
  ];



  const guarantees = [
    'Certified organic detergents',
    'Hypoallergenic options available',
    'Expert fabric care specialists',
    '100% satisfaction guarantee',
  ];

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen" style={{ background: '#f8f9f4' }}>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            {/* Branded spinner */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <p className="text-gray-700 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Preparing your experience…
            </p>
            <p className="text-xs text-gray-400 mt-2">Connecting to services</p>
          </div>
        </div>
        <Footer />
        <style>{googleFonts}</style>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen" style={{ background: '#f8f9f4' }}>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => fetchServices()} className="bg-emerald-600 hover:bg-emerald-700">
                Try Again
              </Button>
              <Button onClick={() => window.open('http://localhost:5000/health', '_blank')} variant="outline">
                Test Connection
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <style>{googleFonts}</style>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen" style={{ background: '#f8f9f4', fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] overflow-hidden flex items-center" style={{ background: 'linear-gradient(135deg, #0f2b1a 0%, #1a4a2e 40%, #0d3320 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #86efac 0%, transparent 70%)' }} />

        {/* Geometric grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Right side image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1000"
            alt="Laundry"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0f2b1a 10%, transparent 60%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-400/10"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium tracking-wide uppercase">Premium Laundry Care</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
            >
              Your Clothes,
              <br />
              <span style={{ color: '#4ade80' }}>Perfected.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg"
            >
              From delicate silks to everyday essentials — our expert care ensures
              every garment is returned fresh, crisp, and ready to wear.
            </motion.p>

            {/* Guarantees list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-2 gap-2 mb-10"
            >
              {guarantees.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{g}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#services">
                <button className="hero-btn-primary group inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', boxShadow: '0 8px 32px rgba(34,197,94,0.4)' }}>
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/schedule">
                <button className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm border border-white/20 text-white transition-all duration-300"
                  style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
                  Schedule Pickup
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ── FEATURES STRIP ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg"
                style={{ background: 'white' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', color: '#059669' }}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                {/* Subtle hover line accent */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, #22c55e, #86efac)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────── */}
      <section id="services" className="py-20" style={{ background: '#f8f9f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, #22c55e, transparent)' }} />
              <span className="text-emerald-600 text-xs font-semibold tracking-widest uppercase">What We Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
              Professional Services<br />
              <span style={{ color: '#16a34a' }}>Built Around You</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl leading-relaxed">
              Every service is handled with care, precision, and eco-friendly products — because your garments deserve the best.
            </p>
          </motion.div>

          {services.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <div className="text-5xl mb-4">🧺</div>
              <p className="text-gray-600 font-medium">No services available right now.</p>
              <p className="text-xs text-gray-400 mt-1">Try adding services to your database</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {services.map((service, index) => (
                <motion.div
                  key={service._id || service.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  onHoverStart={() => setHoveredService(service._id)}
                  onHoverEnd={() => setHoveredService(null)}
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-500 cursor-pointer"
                      style={{
                        boxShadow: hoveredService === service._id
                          ? '0 24px 64px rgba(22,163,74,0.18), 0 4px 24px rgba(0,0,0,0.08)'
                          : '0 2px 16px rgba(0,0,0,0.06)',
                        transform: hoveredService === service._id ? 'translateY(-6px)' : 'translateY(0)',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}>

                      {/* Image */}
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={service.image || getServiceImage(service.name)}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Layered overlay */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)' }} />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ background: 'rgba(255,255,255,0.95)', color: '#1a4a2e', backdropFilter: 'blur(8px)' }}>
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {service.rating || '4.9'}
                          </div>
                          <div className="px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white' }}>
                            {service.turnaround || '24 Hrs'}
                          </div>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-xl font-bold text-white mb-1 leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                            {service.name}
                          </h3>
                          <p className="text-white/80 text-xs leading-snug line-clamp-1">
                            {service.tagline || 'Professional care for your garments'}
                          </p>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                          {service.fullDescription || 'Premium laundry and dry cleaning services with free pickup and delivery.'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Truck className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Free pickup</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Eco-safe</span>
                            </div>
                          </div>

                          <button
                            className="group/btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', boxShadow: '0 4px 12px rgba(34,197,94,0.3)' }}
                          >
                            Book Now
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BRAND TRUST BANNER ──────────────────────────────────── */}
      <section className="py-20 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #0f2b1a 0%, #1a4a2e 100%)' }}>
        {/* Decoration */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 50%, #86efac 0%, transparent 50%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-xs font-medium tracking-wide">Our Promise to You</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Care you can<br />
                <span style={{ color: '#4ade80' }}>always trust.</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                We treat every garment as if it were our own — with expert hands, premium eco-friendly products,
                and a guarantee that puts your satisfaction first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 w-full lg:max-w-sm"
            >
              {[
                { icon: '♻️', label: 'Eco-friendly products' },
                { icon: '🏆', label: 'Award-winning service' },
                { icon: '🔒', label: 'Insured & secure' },
                { icon: '⚡', label: '24-hr turnaround' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-white/10"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white/80 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready for fresh?
            </h2>
            <p className="text-gray-500 mb-8 text-lg leading-relaxed">
              Schedule a free pickup today and experience the difference that premium laundry care makes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schedule">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.35)' }}>
                  Schedule Free Pickup
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <style>{googleFonts}</style>
    </main>
  );
}

const googleFonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
`;