'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const heroSlides = [
  {
    tag: 'Laundry Service in Dubai That Cares for Every Detail',
    title: 'Freshness That Lasts',
    subtitle: 'Advanced cleaning methods, gentle detergents, and expert hands, your clothes stay fresh, clean, and ready to wear longer.',
    cta: 'Schedule a Pickup',
    image: 'data:image/jpeg;base64,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',
    imagePosition: 'left',
    gradient: 'from-primary/30 via-primary/20 to-transparent',
    highlight: 'Freshness',
  },
  {
    tag: 'Premium Laundry Service in Dubai, Made Easy',
    title: 'Convenience at Your Fingertips',
    subtitle: 'Enjoy free pickup and delivery anywhere in Dubai. While you focus on life, we handle your laundry with precision and care',
    cta: 'Book Free Pickup',
    image: 'data:image/jpeg;base64,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',
    imagePosition: 'right',
    gradient: 'from-accent/30 via-accent/20 to-transparent',
    highlight: 'Convenience',
  },
  {
    tag: 'Professional Laundry Service That You Can Rely On',
    title: 'Fast. Clean. Reliable.',
    subtitle: 'Quick turnaround and on-time delivery - because laundry should fit your lifestyle, not interrupt it',
    cta: 'Try Our Express Service',
    image: 'data:image/jpeg;base64,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',
    imagePosition: 'left',
    gradient: 'from-primary/30 via-primary/20 to-transparent',
    highlight: 'Reliable',
  },
  {
    tag: 'Dry Cleaning Services with a Personal Touch',
    title: 'Gentle Care, Premium Results',
    subtitle: 'From abayas to designer suits, delicate garments are treated with expert care to preserve their beauty and texture.',
    cta: 'Experience Premium Care',
    image: 'data:image/jpeg;base64,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',
    imagePosition: 'right',
    gradient: 'from-accent/30 via-accent/20 to-transparent',
    highlight: 'Premium Results',
  },
];

function WashingMachineAnimation() {
  return (
    <motion.div
      className="relative w-32 h-32 md:w-48 md:h-48 mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Outer washing machine body */}
      <motion.div
        className="absolute inset-0 border-4 border-primary/40 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner drum with rotation */}
      <motion.div
        className="absolute inset-4 border-2 border-primary/30 rounded-full bg-primary/5"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-primary/20 m-2" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
          animate={{
            x: [0, Math.cos((i / 6) * Math.PI * 2) * 40, 0],
            y: [0, Math.sin((i / 6) * Math.PI * 2) * 40, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: (i * 0.5),
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Center sparkle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </motion.div>
    </motion.div>
  );
}

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

  return (
    <section className="relative w-full min-h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-10 md:top-20 -left-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 md:bottom-20 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
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
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
              
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                  {/* Left content */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-center lg:text-left"
                  >
                    {/* Badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{slide.tag}</span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
                      {slide.title.split(slide.highlight)[0]}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base md:text-lg text-foreground/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {slide.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/services">
                          <Button size="lg" className="gap-2 rounded-full px-8 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                            {slide.cta}
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/pricing">
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="rounded-full px-8 font-semibold border-2 border-primary text-primary hover:bg-primary/10"
                          >
                            View Pricing
                          </Button>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Stats row */}
                    <motion.div
                      className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto lg:mx-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <div className="text-xl md:text-2xl font-bold text-primary">10K+</div>
                        <p className="text-xs text-foreground/60">Customers</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <div className="text-xl md:text-2xl font-bold text-primary">24h</div>
                        <p className="text-xs text-foreground/60">Delivery</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <div className="text-xl md:text-2xl font-bold text-primary">100%</div>
                        <p className="text-xs text-foreground/60">Guaranteed</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right side - 3D Washing Machine */}
                  <motion.div
                    className="hidden lg:flex justify-center"
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <WashingMachineAnimation />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

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