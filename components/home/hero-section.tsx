'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const heroSlides = [
  {
    tag: 'Laundry Service in Dubai That Cares for Every Detail',
    title: 'Freshness That Lasts',
    description: 'Advanced cleaning methods, gentle detergents, and expert hands, your clothes stay fresh, clean, and ready to wear longer.',
    cta: 'Schedule a Pickup',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=600&fit=crop',
    imagePosition: 'left',
    bgGradient: 'from-primary/30 via-primary/20 to-transparent',
  },
  {
    tag: 'Premium Laundry Service in Dubai, Made Easy',
    title: 'Convenience at Your Fingertips',
    description: 'Enjoy free pickup and delivery anywhere in Dubai. While you focus on life, we handle your laundry with precision and care',
    cta: 'Book Free Pickup',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop',
    imagePosition: 'right',
    bgGradient: 'from-accent/30 via-accent/20 to-transparent',
  },
  {
    tag: 'Professional Laundry Service That You Can Rely On',
    title: 'Fast. Clean. Reliable.',
    description: 'Quick turnaround and on-time delivery - because laundry should fit your lifestyle, not interrupt it',
    cta: 'Try Our Express Service',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&h=600&fit=crop',
    imagePosition: 'left',
    bgGradient: 'from-primary/30 via-primary/20 to-transparent',
  },
  {
    tag: 'Dry Cleaning Services with a Personal Touch',
    title: 'Gentle Care, Premium Results',
    description: 'From abayas to designer suits, delicate garments are treated with expert care to preserve their beauty and texture.',
    cta: 'Experience Premium Care',
    image: 'https://images.unsplash.com/photo-1604335399105-b0fc5857d7a3?w=600&h=600&fit=crop',
    imagePosition: 'right',
    bgGradient: 'from-accent/30 via-accent/20 to-transparent',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full min-h-[600px] md:h-[650px] lg:h-[700px] bg-gradient-to-b from-primary/5 to-accent/5 overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Hero Slides */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
              
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: slide.imagePosition === 'left' ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={`order-2 lg:order-1 text-center lg:text-left ${
                      slide.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-5"
                    >
                      <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                        {slide.tag}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-3"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed mb-8"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                    >
                      <Link href="/services/professional-laundry-services-in-dubai/orders">
                        <Button 
                          size="lg" 
                          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm sm:text-base h-14 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500"
                        >
                          {slide.cta}
                        </Button>
                      </Link>
                      <Link href="/pricing">
                        <Button 
                          size="lg" 
                          variant="outline"
                          className="w-full sm:w-auto gap-2 border-2 border-primary text-primary hover:bg-primary/10 font-bold text-sm sm:text-base h-14 px-8 rounded-lg transform hover:-translate-y-1 transition-all duration-500"
                        >
                          View Pricing
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className={`order-1 lg:order-2 flex justify-center ${
                      slide.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative w-full max-w-md lg:max-w-lg">
                      <div className="relative aspect-square">
                        <Image
                          src={slide.image}
                          alt="Laundry Service"
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      
                      {/* Decorative elements */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -right-10 w-32 h-32 border-2 border-primary/20 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-10 -left-10 w-24 h-24 border-2 border-accent/20 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-foreground/30 hover:bg-primary/50'
            } h-2 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm text-foreground/60 font-medium">Scroll</p>
        <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}