// components/home/how-it-works.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Icons (keep these as they are)
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 16H8M4 8H12" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export function HowItWorks() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const steps = [
    {
      step: 'Step 1',
      title: 'Place Your Order on the App',
      description: 'Schedule pickup and we collect your laundry.',
    },
    {
      step: 'Step 2',
      title: 'Prepare Your Order',
      description: 'Pack your clothes and hand them over.',
    },
    {
      step: 'Step 3',
      title: 'Cleaned at Facility',
      description: 'We clean using advanced technology.',
    },
    {
      step: 'Step 4',
      title: 'Delivery',
      description: 'Delivered fresh within 24–48 hours.',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Reversed the grid layout: [1fr, 80px, 300px] instead of [300px,80px,1fr] */}
        <div className="grid lg:grid-cols-[1fr,80px,300px] gap-12">

          {/* LEFT SCROLLING CONTENT - Now on the left side */}
          <div className="space-y-40">
            {steps.map((step, index) => {
              const progress = useTransform(
                scrollYProgress,
                [index * 0.25, (index + 1) * 0.25],
                [0, 1]
              );

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity: progress,
                    y: useTransform(progress, [0, 1], [80, 0]),
                  }}
                  className="max-w-xl"
                >
                  <p className="text-sm text-green-600 mb-2">
                    {step.step}
                  </p>

                  <h3 className="text-3xl font-bold mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">
                    {step.description}
                  </p>

                  <div className="mt-6 h-64 rounded-xl bg-green-100 flex items-center justify-center">
                    Image
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* TIMELINE FIXED - Still in the middle */}
          <div className="hidden lg:flex flex-col items-center relative sticky top-32 h-fit">

            {/* Line */}
            <div className="absolute top-0 w-[2px] h-[400px] bg-gray-200">
              <motion.div
                className="w-full bg-green-600 origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            {/* Dots */}
            <div className="flex flex-col gap-24 relative z-10">
              {steps.map((_, index) => {
                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.25, (index + 1) * 0.25],
                  [0.3, 1]
                );

                return (
                  <motion.div
                    key={index}
                    style={{
                      scale: progress,
                      opacity: progress,
                    }}
                    className="w-10 h-10 rounded-full bg-green-100 border border-green-400"
                  />
                );
              })}
            </div>
          </div>

          {/* RIGHT FIXED - Now the title is on the right side */}
          <div className="hidden lg:block sticky top-32 h-fit text-right">
            <p className="text-sm text-green-600 mb-2">How It Works</p>
            <h2 className="text-4xl font-bold">
              Laundry day, simplified.
              <br />
              <span className="text-green-600">
                Four steps and you're done.
              </span>
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}