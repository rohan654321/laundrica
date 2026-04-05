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
      image: '/images/redesign/hero-img-1.1.svg',
    },
    {
      tag: 'Premium Laundry Service Made Easy',
      title: 'Convenience at Your',
      highlight: 'Fingertips',
      subtitle:
        'Free pickup and delivery while you focus on life. We handle your laundry with precision.',
      cta: 'Book Free Pickup',
      secondaryCta: 'View Pricing',
      image: '/images/redesign/hero-img-2.svg',
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

      {/* 🌿 SOFT FOREST GLOW (FIXED) */}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-2 h-full"
                >
                  {/* Image */}
                  <div className="hidden lg:flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt="hero"
                      className="w-[80%] h-[80%] object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center px-6 lg:px-16 text-center lg:text-left">

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
                        <button className="bg-primary hover:bg-accent text-white font-semibold px-8 h-14 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
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

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all ${
              currentSlide === i
                ? 'w-8 h-2 bg-accent'
                : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}