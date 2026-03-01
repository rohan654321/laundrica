'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const serviceSlides = [
  {
    id: 1,
    name: 'Steam Pressing',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Laundry',
    image: 'https://images.unsplash.com/photo-1580809361436-42a7986e5266?w=500&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Dry Cleaning',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Express Laundry',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=500&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Shoe Cleaning',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop',
  },
];

function ServiceCard({ service }: { service: typeof serviceSlides[0] }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-full object-cover"
      />

      {/* Wavy green overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-primary to-primary/90 flex items-center justify-center">
        {/* Wavy SVG top border */}
        <svg
          className="absolute top-0 left-0 right-0 -translate-y-full"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q360,0 720,50 T1440,50 L1440,120 L0,120 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>

        {/* Service name */}
        <h3 className="text-white text-xl md:text-2xl font-semibold relative z-10">
          {service.name}
        </h3>
      </div>

      {/* Dark overlay on image */}
      <div className="absolute inset-0 bg-black/10" />
    </motion.div>
  );
}

export default function ServicesSlider() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <section className="relative w-full bg-white">
      {/* Header */}
      <div className="relative pt-12 pb-8 px-4 md:px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            <span className="text-primary">Dry Cleaning & Laundry,</span> Free Delivery
          </h1>
          <p className="text-lg text-muted-foreground">Our Services</p>
        </motion.div>

        {/* Notification badge */}
        <div className="absolute top-6 right-6 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-lg">✨</span>
        </div>
      </div>

      {/* Service Slider */}
      {isReady && (
        <div className="relative px-4 md:px-6 pb-12">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-service',
              prevEl: '.swiper-button-prev-service',
            }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            loop
            className="relative"
          >
            {serviceSlides.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <button className="swiper-button-prev-service absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow -ml-5 md:-ml-6">
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button className="swiper-button-next-service absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow -mr-5 md:-mr-6">
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </Swiper>
        </div>
      )}

      {/* WhatsApp floating button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.div>
    </section>
  );
}
