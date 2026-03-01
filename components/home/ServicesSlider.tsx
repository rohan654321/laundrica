'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

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

const duplicated = [...services, ...services];

export default function ServicesSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Animate curve height
  const curveHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ['180px', '450px']
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background pt-40 pb-32 overflow-hidden"
    >
      {/* Animated Curved Background */}
      <motion.div
        style={{ height: curveHeight }}
        className="absolute top-0 left-1/2 -translate-x-1/2 
                   w-[200%] bg-muted rounded-b-[100%] z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-primary font-medium text-lg tracking-wide">
            Dry Cleaning & Laundry, Free Delivery
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Our Services
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">

          <motion.div
            className="flex gap-10 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicated.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 180 }}
                className="relative min-w-[380px] h-[460px] 
                           rounded-[40px] overflow-hidden 
                           flex-shrink-0 shadow-2xl bg-card"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                <div className="absolute bottom-0 w-full bg-primary py-6 text-center">
                  <h3 className="text-primary-foreground text-lg font-semibold tracking-wide">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-background to-transparent" />

        </div>
      </div>
    </section>
  );
}