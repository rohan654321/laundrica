'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CalendarIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BagIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4M12 4L9 7M12 4L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 16H8M16 16C16 17.1046 16.8954 18 18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16ZM8 16C8 14.8954 7.10457 14 6 14C4.89543 14 4 14.8954 4 16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16ZM4 8H12M4 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const steps = [
    {
      number: "Step 1",
      title: "Place Your Order on the App",
      description: "Download the Laundrica app, schedule a pickup time that suits you, and we'll collect your laundry right from your doorstep.",
      icon: CalendarIcon,
      image: "/images/step1.jpg",
      badge: {
        icon: "/images/pickup-badge.svg",
        alt: "Pick up schedule",
        position: "top-left"
      }
    },
    {
      number: "Step 2",
      title: "Prepare Your Order",
      description: "Fill the laundry bags based on the services you need and leave the bags outside your door or hand them to the driver.",
      icon: BagIcon,
      image: "/images/step2.jpg"
    },
    {
      number: "Step 3",
      title: "Cleaned at Our State-of-the-Art Facility",
      description: "Your items are taken to our modern facility, cleaned with specialized programs, and returned fresh – within 24-48 hours.",
      icon: FacilityIcon,
      image: "/images/step3.jpg"
    },
    {
      number: "Step 4",
      title: "Next-Day Delivery Available",
      description: "Get your items back fresh and ready to wear in as little as 24 hours. Simply select next-day delivery when setting up your order.",
      icon: DeliveryIcon,
      image: "/images/step4.jpg",
      badges: {
        topRight: {
          icon: "/images/delivery-badge.svg",
          alt: "Delivery options"
        },
        bottomLeft: {
          icon: "/images/order-status.svg",
          alt: "Order status"
        }
      }
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-forest uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
              Laundry day, simplified.
              <span className="text-forest block">Four steps and you're done.</span>
            </h2>
          </div>
          <Link 
            href="/app" 
            className="inline-flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all group"
          >
            <span>Download Laundrica</span>
            <span className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* Progress Line (desktop) */}
        <div className="hidden lg:block relative h-0.5 bg-forest/10 mb-16">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-forest"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number Circle (desktop) */}
                <div className="hidden lg:block absolute left-0 -top-6">
                  <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                    <StepIcon />
                  </div>
                </div>

                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="lg:pl-16">
                      <span className="text-sm font-semibold text-forest/60 block mb-2">{step.number}</span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-forest mb-4">{step.title}</h3>
                      <p className="text-foreground/70 leading-relaxed mb-6 max-w-xl">
                        {step.description}
                      </p>
                      
                      {/* CTA for step 1 */}
                      {index === 0 && (
                        <Link 
                          href="/download" 
                          className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg font-semibold hover:bg-forest/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        >
                          Download Laundrica
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Image with badges */}
                  <div className="flex-1 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-forest/10">
                      <div className="aspect-[4/3] relative bg-forest/5">
                        <div className="absolute inset-0 flex items-center justify-center text-forest/20">
                          <StepIcon />
                        </div>
                      </div>
                      
                      {/* Badges */}
                      {step.badge && (
                        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-[200px] border border-forest/10">
                          <div className="w-full h-8 bg-forest/10 rounded"></div>
                        </div>
                      )}
                      
                      {step.badges?.topRight && (
                        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-[200px] border border-forest/10">
                          <div className="w-full h-8 bg-forest/10 rounded"></div>
                        </div>
                      )}
                      
                      {step.badges?.bottomLeft && (
                        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-[200px] border border-forest/10">
                          <div className="w-full h-8 bg-forest/10 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center lg:hidden"
        >
          <Link 
            href="/download" 
            className="inline-flex items-center px-8 py-4 bg-forest text-white rounded-lg font-semibold hover:bg-forest/90 transition-colors shadow-lg"
          >
            Download Laundrica
          </Link>
        </motion.div>
      </div>
    </section>
  );
}