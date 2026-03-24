// components/home/how-it-works.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Forest Green themed icons
const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="12" width="2" height="2" fill="currentColor"/>
    <rect x="11" y="12" width="2" height="2" fill="currentColor"/>
    <rect x="15" y="12" width="2" height="2" fill="currentColor"/>
  </svg>
);

const BagIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" fill="currentColor"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 20V12H15V20" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="12" y="14" width="2" height="4" fill="currentColor"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M16 16H8M4 8H12M20 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6" cy="18" r="2" fill="currentColor"/>
    <circle cx="18" cy="18" r="2" fill="currentColor"/>
    <path d="M6 16L4 8H20L18 16H6Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const steps = [
  {
    step: 'Step 1',
    title: 'Place Your Order',
    description: 'Schedule your pickup through our app or website. Choose your preferred date and time, and we\'ll be there.',
    icon: CalendarIcon,
    details: [
      'Available on iOS and Android',
      'Schedule up to 7 days in advance',
      'Choose pickup window (2-hour slots)'
    ]
  },
  {
    step: 'Step 2',
    title: 'We Pick Up',
    description: 'Our friendly staff arrives at your doorstep to collect your laundry. No need to wait all day.',
    icon: BagIcon,
    details: [
      'Free doorstep pickup',
      'Eco-friendly laundry bags provided',
      'Weight verification at pickup'
    ]
  },
  {
    step: 'Step 3',
    title: 'Professional Cleaning',
    description: 'Your garments are cleaned using eco-friendly products and advanced technology for the best results.',
    icon: FacilityIcon,
    details: [
      'Eco-friendly detergents',
      'Temperature-controlled washing',
      'Quality inspection before return'
    ]
  },
  {
    step: 'Step 4',
    title: 'Fresh Delivery',
    description: 'Receive your freshly cleaned and folded laundry within 24-48 hours, delivered right to your door.',
    icon: DeliveryIcon,
    details: [
      'Free delivery to your doorstep',
      'Same-day service available',
      'Real-time tracking updates'
    ]
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to each step for individual animations
  const stepProgresses = steps.map((_, index) => {
    const start = index / steps.length;
    const end = (index + 1) / steps.length;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  return (
    <section className="bg-gradient-to-b from-white to-[#f8faf6] py-24">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-[#1f4f2b] uppercase tracking-wider">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Laundry day, simplified. Four easy steps and you're done.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid with Filling Line Animation */}
        <div className="relative">
          {/* Vertical Filling Line - Only filling animation, no bubbles */}
          <div className="absolute left-[27px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#1f4f2b] to-[#2a6e3a]"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps Cards */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const progress = stepProgresses[index];

              return (
                <motion.div
                  key={index}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Left/Right Content */}
                  <div className={`flex-1 w-full md:w-1/2 ${
                    isEven ? 'md:text-right md:pr-8' : 'md:pl-8'
                  }`}>
                    <motion.div
                      style={{ 
                        opacity: progress,
                        y: useTransform(progress, [0, 1], [30, 0])
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Step Card */}
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-12 h-12 rounded-xl bg-[#1f4f2b]/10 flex items-center justify-center text-[#1f4f2b]">
                            <Icon />
                          </div>
                          <span className="text-sm font-semibold text-[#1f4f2b] uppercase tracking-wider">
                            {step.step}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details list */}
                        <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                              <svg className="w-4 h-4 text-[#1f4f2b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Dot with Progress (No bubble animation, just static) */}
                  <div className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14">
                    <div className="absolute inset-0 bg-white border-2 border-[#1f4f2b]/30 rounded-full z-10" />
                    <motion.div
                      className="absolute inset-[4px] bg-[#1f4f2b] rounded-full z-20"
                      style={{ 
                        scale: progress,
                        opacity: progress
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <span className="text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Empty spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#1f4f2b] text-white rounded-xl font-semibold hover:bg-[#2a6e3a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Get Started Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}