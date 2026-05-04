'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Droplets, PackageCheck, Clock, Shield, Leaf, Star, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Place Order',
    shortTitle: 'Order',
    description: 'Book your laundry pickup in seconds through our seamless platform.',
    fullDescription: 'Simply select your laundry items, choose a pickup time that works for you, and confirm your order in under 60 seconds. Our intuitive interface makes scheduling effortless.',
    icon: <ShoppingBag size={28} />,
    features: ['Easy booking', 'Flexible timing', 'Instant confirmation'],
  },
  {
    title: 'Pickup',
    shortTitle: 'Pickup',
    description: 'Our executive collects your laundry from your doorstep at your convenience.',
    fullDescription: 'A professional delivery partner arrives at your selected time, carefully collects your laundry, and provides a confirmation receipt. No more rushing to the laundromat!',
    icon: <Truck size={28} />,
    features: ['Doorstep service', 'Real-time tracking', 'Professional handling'],
  },
  {
    title: 'Wash & Care',
    shortTitle: 'Wash',
    description: 'We use premium cleaning methods and eco-friendly detergents.',
    fullDescription: 'Your clothes receive expert care with our state-of-the-art washing technology. We separate by color, fabric type, and use premium eco-friendly detergents for lasting freshness.',
    icon: <Droplets size={28} />,
    features: ['Eco-friendly', 'Fabric care', 'Stain removal'],
  },
  {
    title: 'Quality Check',
    shortTitle: 'Check',
    description: 'Every item undergoes rigorous quality inspection before packaging.',
    fullDescription: 'Our trained quality assurance team meticulously examines each garment for cleanliness, fabric integrity, and finishing details. We ensure your clothes meet our premium standards before they are packed for delivery.',
    icon: <CheckCircle size={28} />,
    features: ['Meticulous inspection', 'Stain verification', 'Finishing check'],
  },
  {
    title: 'Delivery',
    shortTitle: 'Deliver',
    description: 'Fresh, neatly packed clothes delivered back to your home.',
    fullDescription: 'Your clean, folded laundry arrives at your doorstep in premium packaging. Fresh, crisp, and ready to wear - we bring convenience right to you.',
    icon: <PackageCheck size={28} />,
    features: ['Neat folding', 'Premium packaging', 'On-time delivery'],
  },
];

export default function HowItWorksPremium() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calculate progress percentage (0% to 100%)
  const progressPercentage = (active / (steps.length - 1)) * 100;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              How It <span className="text-green-500">Works</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A simple, reliable process designed for your convenience
            </p>
          </motion.div>
        </div>

        {/* Steps Row with Progress Bar */}
        <div className="relative mb-12">

          {/* Progress Bar Container */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-6 md:px-8">
            {/* Background Gray Line */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full" />

            {/* Green Filling Line */}
            <motion.div
              className="h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full relative"
              style={{
                width: `${progressPercentage}%`,
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between items-center z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center w-full cursor-pointer"
                onClick={() => setActive(index)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Circle */}
                <motion.div
                  className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active >= index
                      ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-200'
                      : 'border-gray-300 bg-white text-gray-400 hover:border-green-300 hover:text-green-400'
                    }`}
                  animate={{
                    scale: active === index ? 1.1 : 1,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={active >= index ? 'text-white' : 'text-current'}>
                    {step.icon}
                  </div>

                  {/* Glow Pulse */}
                  {active === index && (
                    <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-75" />
                  )}
                </motion.div>

                {/* Step Number & Title for Desktop */}
                <div className="mt-3 text-center hidden md:block">
                  <span className={`text-xs font-medium ${active >= index ? 'text-green-600' : 'text-gray-400'}`}>
                    STEP {`0${index + 1}`}
                  </span>
                  <p className={`text-sm font-semibold mt-1 ${active >= index ? 'text-gray-800' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>

                {/* Mobile view - just step number */}
                <div className="mt-2 text-center md:hidden">
                  <span className={`text-xs font-medium ${active >= index ? 'text-green-600' : 'text-gray-400'}`}>
                    {`0${index + 1}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile step titles row */}
        <div className="flex justify-between px-2 mb-8 md:hidden">
          {steps.map((step, index) => (
            <p key={index} className={`text-xs font-medium ${active >= index ? 'text-green-600' : 'text-gray-400'}`}>
              {step.shortTitle}
            </p>
          ))}
        </div>

        {/* Active Content Card - Enhanced */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 md:px-8 py-5 border-b border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md">
                  {steps[active].icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {steps[active].title}
                  </h3>
                  <p className="text-green-600 text-sm font-medium">
                    Step {active + 1} of {steps.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                {steps[active].fullDescription}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-gray-100">
                {steps[active].features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      {idx === 0 && <Star size={14} className="text-green-600" />}
                      {idx === 1 && <Clock size={14} className="text-green-600" />}
                      {idx === 2 && <Shield size={14} className="text-green-600" />}
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}