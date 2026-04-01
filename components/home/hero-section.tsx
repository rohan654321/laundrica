'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Check, Shield, Clock, Truck, Star } from 'lucide-react';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      tag: 'Premium Laundry Service in Dubai',
      title: 'Freshness That',
      highlight: 'Lasts',
      subtitle: 'Advanced cleaning methods, gentle detergents, and expert hands. Your clothes stay fresh, clean, and ready to wear longer.',
      cta: 'Schedule Pickup',
      secondaryCta: 'View Pricing',
      image: '/images/laundrica_hero2.png',
      features: ['Free Pickup & Delivery', '24h Express Service', 'Eco-Friendly Care']
    },
    {
      tag: 'Convenience Redefined',
      title: 'Laundry Made',
      highlight: 'Easy',
      subtitle: 'No more heavy baskets. We pick up from your home, deliver when ready. Focus on what matters while we handle your laundry with care.',
      cta: 'Book Free Pickup',
      secondaryCta: 'View Pricing',
      image: '/images/laundry_banner1.png',
      features: ['Free Pickup', 'Easy Booking', 'Same-Day Care']
    },
    {
      tag: 'Professional Care',
      title: 'Fast. Clean.',
      highlight: 'Reliable.',
      subtitle: 'Quick turnaround and on-time delivery - because laundry should fit your lifestyle, not interrupt it.',
      cta: 'Try Express Service',
      secondaryCta: 'View Pricing',
      image: '/images/laundrica_hero3.png',
      features: ['Same-Day Service', 'Quality Guaranteed', 'Stain Removal']
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full min-h-screen md:min-h-[700px] overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Hero Slides */}
      <div className="relative z-10">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen md:min-h-[700px] flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20 lg:py-0">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center lg:text-left"
                >
                  {/* Tag Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 border border-green-200 rounded-full">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-xs md:text-sm font-semibold text-green-700 uppercase tracking-wide">
                      {slide.tag}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    {slide.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {slide.subtitle}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="/services/professional-laundry-services-in-dubai/orders">
                      <Button
                        size="lg"
                        className="gap-2 rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/prices">
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 py-6 text-base font-semibold border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300"
                      >
                        {slide.secondaryCta}
                      </Button>
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">100% Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">24h Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">Free Pickup</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Image */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="hidden lg:flex justify-center items-center"
                >
                  <div className="relative w-full max-w-md aspect-square">
                    <Image
                      src={slide.image}
                      alt={slide.tag}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index 
                ? 'w-8 bg-green-600' 
                : 'w-2 bg-gray-300 hover:bg-green-400'
            } h-2 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <svg className="w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}