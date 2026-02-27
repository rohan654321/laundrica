'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  image: string;
}

const services: Service[] = [
  { id: 1, title: 'Commercial Laundry', image: '/services/service1.jpg' },
  { id: 2, title: 'Carpet Cleaning', image: '/services/service2.jpg' },
  { id: 3, title: 'Curtain Cleaning', image: '/services/service3.jpg' },
  { id: 4, title: 'Soft Toy Cleaning', image: '/services/service4.jpg' },
  { id: 5, title: 'Steam Pressing', image: '/services/service5.jpg' },
  { id: 6, title: 'Commercial Laundry', image: '/services/service1.jpg' },
  { id: 7, title: 'Carpet Cleaning', image: '/services/service2.jpg' },
  { id: 8, title: 'Curtain Cleaning', image: '/services/service3.jpg' },
  { id: 9, title: 'Soft Toy Cleaning', image: '/services/service4.jpg' },
  { id: 10, title: 'Steam Pressing', image: '/services/service5.jpg' },
];

export default function ServicesSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Animate ellipse height while scrolling
  const ellipseY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['40%', '70%', '100%']
  );

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === 'left' ? -400 : 400,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-100 py-32">

      <motion.section
        ref={sectionRef}
        className="relative bg-white py-24 overflow-hidden"
        style={{
          clipPath: `ellipse(150% ${ellipseY} at 50% 50%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-green-600 font-medium text-lg">
              Dry Cleaning & Laundry, Free Delivery
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Our Services
            </h2>
          </div>

          {/* Slider */}
          <div className="relative group">

            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight />
            </button>

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-6 scrollbar-hide"
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[400px] h-[420px] rounded-xl overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 w-full bg-green-600 py-4 text-center">
                    <h3 className="text-white font-semibold text-lg">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.section>
    </div>
  );
}