'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
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

// Duplicate for seamless infinite loop
const duplicatedServices = [...services, ...services];

export default function ServicesSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // More dramatic visible curve
  const ellipseY = useTransform(
    scrollYProgress,
    [0, 1],
    ['20%', '120%']
  );

  // Proper motion template for clip-path
  const clipPath = useMotionTemplate`
    ellipse(150% ${ellipseY} at 50% 0%)
  `;

  return (
    <div className="py-32 bg-muted">

      <motion.section
        ref={sectionRef}
        style={{ clipPath }}
        className="relative py-24 overflow-hidden bg-background"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-primary font-medium text-lg">
              Dry Cleaning & Laundry, Free Delivery
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Our Services
            </h2>
          </div>

          {/* Auto Infinite Carousel */}
          <div className="relative overflow-hidden">

            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 25,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {duplicatedServices.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative min-w-[350px] h-[420px] rounded-[2rem] overflow-hidden shadow-xl flex-shrink-0"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Bottom Title Bar */}
                  <div className="absolute bottom-0 w-full bg-primary py-5 text-center">
                    <h3 className="text-primary-foreground font-semibold text-lg tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Left Fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent" />

            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent" />

          </div>
        </div>
      </motion.section>
    </div>
  );
}