'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      tag: 'Laundry Service That Cares for Every Detail',
      title: 'Freshness That',
      highlight: 'Lasts',
      subtitle:
        'Advanced cleaning methods, gentle detergents, and expert care to keep your clothes fresh longer.',
      cta: 'Schedule a Pickup',
      secondaryCta: 'View Pricing',
      image: '/images/Home1.jpg',
    },
    {
      tag: 'Premium Laundry Service Made Easy',
      title: 'Convenience at Your',
      highlight: 'Fingertips',
      subtitle:
        'Free pickup and delivery while you focus on life. We handle your laundry with precision.',
      cta: 'Book Free Pickup',
      secondaryCta: 'View Pricing',
      image: '/images/Home2.jpg',
    },
    {
      tag: 'Fast & Reliable Laundry Solutions',
      title: 'Clean Clothes,',
      highlight: 'Zero Hassle',
      subtitle:
        'We ensure timely service with high-quality cleaning so you never worry about laundry again.',
      cta: 'Get Started',
      secondaryCta: 'Learn More',
      image: '/images/nobackground.png',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] bg-primary overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]" />

      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-2 h-full"
                >

                  {/* IMAGE SECTION */}
                  <div
                    className={`hidden lg:flex items-center justify-center ${
                      index % 2 === 1 ? 'order-2' : 'order-1'
                    }`}
                  >
                    <div className="relative w-[80%] h-[80%] flex items-center justify-center">

                      {/* Glow Behind */}
                      <div className="absolute w-[400px] h-[400px] bg-accent/30 blur-[140px] rounded-full" />

                      {/* Animated Image */}
                      <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative w-full h-full"
                      >

                        {/* IMAGE */}
                        <img
                          src={slide.image}
                          alt="hero"
                          className="w-full h-full object-contain opacity-90 mix-blend-lighten"
                          style={{
                            WebkitMaskImage:
                              'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                            maskImage:
                              'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                          }}
                        />

                        {/* Color Merge Layer */}
                        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />

                      </motion.div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`flex flex-col justify-center px-6 lg:px-16 text-center lg:text-left ${
                      index % 2 === 1 ? 'order-1' : 'order-2'
                    }`}
                  >

                    {/* Tag */}
                    <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                      <span className="text-xs uppercase tracking-wide text-white">
                        {slide.tag}
                      </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
                      {slide.title}{' '}
                      <span className="text-accent">{slide.highlight}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-300 max-w-xl mb-10">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <Link href="#">
                        <button className="bg-primary text-white font-semibold px-8 h-14 rounded-xl shadow-lg transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1">
                          {slide.cta}
                        </button>
                      </Link>

                      <Link href="#">
                        <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                          {slide.secondaryCta}
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}