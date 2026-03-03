'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSlides = [
  {
    title: 'Your Clothes, Our Care',
    subtitle: 'Professional laundry services delivered to your doorstep in 24 hours',
    gradient: 'from-emerald-700/30 via-emerald-800 to-emerald-900/40',
    highlight: 'Our Care',
  },
  {
    title: 'Premium Care for Every Fabric',
    subtitle: 'Expert treatment for delicate and everyday garments with professional expertise',
    gradient: 'from-emerald-600/25 via-emerald-800 to-emerald-900/35',
    highlight: 'Every Fabric',
  },
  {
    title: 'Eco-Friendly & Sustainable',
    subtitle: 'We use environmentally conscious methods without compromising on quality',
    gradient: 'from-emerald-700/28 via-emerald-800 to-emerald-900/38',
    highlight: 'Sustainable',
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
        className="absolute inset-0 border-4 border-emerald-400/40 rounded-3xl bg-gradient-to-br from-emerald-400/5 to-transparent"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner drum with rotation */}
      <motion.div
        className="absolute inset-4 border-2 border-emerald-400/30 rounded-full bg-emerald-400/5"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-emerald-400/20 m-2" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-emerald-400/60 rounded-full"
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
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-emerald-300" />
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Swiper Carousel */}
      {isReady && (
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => (
              `<span class="${className} !bg-white !opacity-50 hover:!opacity-100 transition-opacity"></span>`
            ),
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          loop
          className="w-full h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index} className="!flex items-center justify-center">
              {({ isActive }) => (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Animated blobs */}
                    <motion.div
                      className="absolute top-10 md:top-20 -left-40 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl"
                      animate={{ y: [0, 50, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-10 md:bottom-20 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"
                      animate={{ y: [0, -50, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
                      {/* Left content */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                      >
                        {/* Badge */}
                        <motion.div
                          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Sparkles className="w-4 h-4 text-emerald-300" />
                          <span className="text-sm font-medium text-white">Premium Service</span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                          {slide.title.split(slide.highlight)[0]}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-200">
                            {slide.highlight}
                          </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                          {slide.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/services">
                              <Button size="lg" className="gap-2 rounded-full px-8 font-semibold bg-emerald-500 hover:bg-emerald-600 text-white">
                                Shop Services <ArrowRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/about">
                              <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full px-8 font-semibold border-2 border-white text-white hover:bg-white/10"
                              >
                                Learn More
                              </Button>
                            </Link>
                          </motion.div>
                        </div>

                        {/* Stats row */}
                        <motion.div
                          className="grid grid-cols-3 gap-4 mt-12"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                            <div className="text-2xl font-bold text-emerald-300">10K+</div>
                            <p className="text-xs text-white/60">Customers</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                            <div className="text-2xl font-bold text-emerald-300">24h</div>
                            <p className="text-xs text-white/60">Delivery</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                            <div className="text-2xl font-bold text-emerald-300">100%</div>
                            <p className="text-xs text-white/60">Guaranteed</p>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Right side - 3D Washing Machine */}
                      <motion.div
                        className="hidden md:flex justify-center"
                        initial={{ opacity: 0, x: 30, y: 20 }}
                        animate={isActive ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        <WashingMachineAnimation />
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm text-white/60 font-medium">Scroll to explore</p>
        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
