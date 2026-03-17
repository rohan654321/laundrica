// components/home/how-it-works.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

// Icons
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4M12 4L9 7M12 4L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 16H8M4 8H12M4 12H10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export function HowItWorks() {
  const sectionRef = useRef(null);

  // 🔥 Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const steps = [
    {
      step: "Step 1",
      title: "Place Your Order on the App",
      description: "Schedule pickup and we collect your laundry.",
      icon: CalendarIcon,
    },
    {
      step: "Step 2",
      title: "Prepare Your Order",
      description: "Pack your clothes and hand them over.",
      icon: BagIcon,
    },
    {
      step: "Step 3",
      title: "Cleaned at Facility",
      description: "We clean using advanced technology.",
      icon: FacilityIcon,
    },
    {
      step: "Step 4",
      title: "Delivery",
      description: "Delivered fresh within 24–48 hours.",
      icon: DeliveryIcon,
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold">
            Laundry day, simplified.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[80px,1fr] gap-12">

          {/* LEFT TIMELINE */}
          <div className="hidden lg:block relative">

            {/* Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gray-200">
              <motion.div
                className="w-full bg-green-600 origin-top"
                style={{
                  scaleY: scrollYProgress
                }}
              />
            </div>

            {/* Circles */}
            <div className="flex flex-col items-center gap-28 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;

                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.2, (index + 1) * 0.2],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={index}
                    style={{
                      scale: progress,
                      opacity: progress
                    }}
                    className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700"
                  >
                    <Icon />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative">

            <div className="sticky top-24 space-y-32">

              {steps.map((step, index) => {
                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.2, (index + 1) * 0.2],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={index}
                    style={{
                      opacity: progress,
                      y: useTransform(progress, [0, 1], [100, 0])
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

                    {/* Fake Image Card */}
                    <div className="mt-6 h-64 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                      <span className="text-green-400">Image</span>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}