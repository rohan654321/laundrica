'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
  { number: '10000+', label: 'Happy Customers' },
  { number: '5000+', label: 'Items Cleaned' },
  { number: '98%', label: 'Satisfaction Rate' },
  { number: '24/7', label: 'Customer Support' },
];

export default function SlidingStats() {
  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex justify-center py-20 bg-white">
      <div className="w-[100%] max-w-7xl flex  overflow-hidden shadow-lg">

        {/* LEFT STATIC */}
        <div className="w-1/2 bg-gray-200 p-10 flex flex-col justify-center">
          <p className="text-5xl font-light text-gray-500">
            Expected
          </p>
          <p className="text-6xl font-bold text-black -mt-4">
            Numbers
          </p>
        </div>

        {/* RIGHT SLIDER */}
        <div className="w-1/2 bg-green-400 relative overflow-hidden flex items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute w-full px-10 flex items-center justify-start gap-4"
            >
              <h2 className="text-6xl font-bold text-gray-800">
                {stats[index].number}
              </h2>
              <p className="text-3xl text-gray-700">
                {stats[index].label}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-10 flex gap-2">
        {stats.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-cyan-500' : 'w-4 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}