// components/home/how-it-works.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Forest Green themed icons - simplified
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="12" width="2" height="2" fill="white"/>
    <rect x="11" y="12" width="2" height="2" fill="white"/>
    <rect x="15" y="12" width="2" height="2" fill="white"/>
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4M8 8H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" fill="white"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 20V12H15V20" stroke="white" strokeWidth="1.5"/>
    <rect x="12" y="14" width="2" height="4" fill="white"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 16H8M4 8H12M20 8H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6" cy="18" r="2" fill="white"/>
    <circle cx="18" cy="18" r="2" fill="white"/>
    <path d="M6 16L4 8H20L18 16H6Z" stroke="white" strokeWidth="1.5"/>
  </svg>
);

const steps = [
  {
    step: '01',
    title: 'Place Your Order',
    description: 'Schedule your pickup through our app or website. Choose your preferred date and time.',
    icon: CalendarIcon,
    bgImage: '/images/step-1.png'
  },
  {
    step: '02',
    title: 'We Pick Up',
    description: 'Our friendly staff arrives at your doorstep to collect your laundry. No need to wait all day.',
    icon: BagIcon,
    bgImage: '/images/step-2.jpg'
  },
  {
    step: '03',
    title: 'Professional Cleaning',
    description: 'Your garments are cleaned using eco-friendly products and advanced technology.',
    icon: FacilityIcon,
    bgImage: '/images/step-3.jpg'
  },
  {
    step: '04',
    title: 'Fresh Delivery',
    description: 'Receive your freshly cleaned laundry within 24-48 hours, delivered to your door.',
    icon: DeliveryIcon,
    bgImage: '/images/step-4.jpg'
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const getStepProgress = (index: number) => {
    const stepStart = index / steps.length;
    const stepEnd = (index + 0.8) / steps.length;
    return useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image: ${steps[index].bgImage}`);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="relative bg-black">
      {/* Steps Container */}
      <div ref={containerRef} className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;
          const progress = getStepProgress(index);

          return (
            <motion.div
              key={index}
              className="relative h-screen w-full overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {!imageErrors[index] && step.bgImage ? (
                  <Image
                    src={step.bgImage}
                    alt={step.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                    priority={index === 0}
                    sizes="100vw"
                    quality={90}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                )}
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <motion.div
                    style={{
                      x: useTransform(progress, [0, 1], [isEven ? -100 : 100, 0]),
                      opacity: progress
                    }}
                    transition={{ duration: 0.6 }}
                    className={`max-w-2xl ${isEven ? 'md:ml-0' : 'md:ml-auto'}`}
                  >
                    {/* Step Number */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-7xl md:text-8xl font-bold text-white/5 mb-4"
                    >
                      {step.step}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="w-16 h-16 rounded-2xl bg-[#1f4f2b] flex items-center justify-center mb-6 shadow-lg"
                    >
                      <Icon />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                    >
                      {step.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-lg"
                    >
                      {step.description}
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="h-1 bg-[#1f4f2b] rounded-full"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Scroll Indicator for all but last step */}
              {index < steps.length - 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Final CTA Section - Redesigned and more attractive */}
        <motion.div
          className="relative min-h-[60vh] w-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f4f2b] via-[#2a6e3a] to-[#0a1f10]">
            <div className="absolute inset-0 bg-black/20" />
            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>
          
          {/* Content */}
          <div className="relative min-h-[60vh] flex items-center justify-center text-center py-20">
            <div className="max-w-4xl mx-auto px-6">
              {/* Small badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
              >
                ✨ Join Our Community
              </motion.div>
              
              {/* Main heading - smaller and more elegant */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Ready to Experience the Best Laundry Service?
              </motion.h2>
              
              {/* Subheading */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              >
                Join over 10,000+ satisfied customers who enjoy fresh, clean laundry delivered right to their doorstep
              </motion.p>
              
              {/* Features row */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 mb-10"
              >
                {[
                  { text: "Free Pickup & Delivery", icon: "🚀" },
                  { text: "24-48 Hour Turnaround", icon: "⚡" },
                  { text: "Eco-Friendly Products", icon: "🌿" },
                  { text: "100% Satisfaction", icon: "💯" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-white/90 text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/services">
                  <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1f4f2b] rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-base">
                    Get Started Today
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                
                <Link href="/pricing">
                  <button className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all transform hover:-translate-y-1 text-base">
                    View Pricing
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
              
              {/* Trust indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 pt-8 border-t border-white/10"
              >
                <div className="flex justify-center items-center gap-6 text-white/60 text-sm">
                  <span>⭐ 4.9/5 from 2,500+ reviews</span>
                  <span>🔒 Secure Payment</span>
                  <span>✅ Satisfaction Guaranteed</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add custom scroll animation styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(8px);
            opacity: 0;
          }
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}