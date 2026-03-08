'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Truck, Droplets, Package } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Schedule Pickup',
    description: 'Book your laundry pickup at your convenience through our app or website',
    number: '01',
  },
  {
    icon: Truck,
    title: 'We Collect',
    description: 'Our professional team picks up your clothes from your doorstep',
    number: '02',
  },
  {
    icon: Droplets,
    title: 'We Clean',
    description: 'Expert cleaning with premium detergents and techniques',
    number: '03',
  },
  {
    icon: Package,
    title: 'We Deliver',
    description: 'Fresh, clean clothes delivered back to you within 24 hours',
    number: '04',
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:gap-12 items-center">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              <span className="text-primary">How It Works </span>
              <span className="text-accent">- Simple 4-Step Process</span>
            </h2>
            <p className="text-base text-foreground/70 text-center my-3 max-w-2xl mx-auto">
              Get your laundry done in four simple steps
            </p>
          </motion.div>
          
          {/* Process Steps with Animated Line */}
          <div className="w-full max-w-4xl flex flex-col">
            <div className="flex justify-between items-center w-full px-4 sm:px-6">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center relative">
                  <motion.div 
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-500 ${
                      index <= activeStep 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 text-gray-400 bg-gray-100'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={index <= activeStep ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-full flex items-center justify-center relative h-full">
                      {index <= activeStep ? (
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                  <span className={`absolute -bottom-8 text-xs sm:text-sm mt-2 text-nowrap font-medium leading-tight ${
                    index <= activeStep ? 'text-primary' : 'text-foreground/50'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Animated Connecting Line */}
            <div className="relative w-full h-1 mt-8 mb-12">
              <div className="absolute top-0 left-[10%] right-[10%] h-full bg-gray-200 rounded-full">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <motion.div 
            className="text-center w-full sm:px-10 md:px-16 lg:px-22"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-foreground/70 leading-relaxed mb-4 text-sm sm:text-base">
              Laundry should work around your lifestyle, not the other way around. With Laundrica, it's simple: schedule a pickup, hand over your clothes, and receive them back fresh, spotless, and neatly packed.
            </p>
            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base">
              With trusted experience, Laundrica is one of the best laundry services in Dubai. Our blend of modern cleaning methods and eco-safe solutions makes us a go-to choice for families, professionals, and businesses.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/services/professional-laundry-services-in-dubai/orders">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Schedule a Pickup Now
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}