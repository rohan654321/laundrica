// components/home/how-it-works.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M12 12V4M12 4L9 7M12 4L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FacilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 3L21 9V20H3V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 16H8M16 16C16 17.1046 16.8954 18 18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16ZM8 16C8 14.8954 7.10457 14 6 14C4.89543 14 4 14.8954 4 16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16ZM4 8H12M4 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps = [
    {
      step: "Step 1",
      title: "Place Your Order on the App",
      description: "Download the Washmen app, schedule a pickup time that suits you, and we'll collect your laundry right from your doorstep.",
      icon: CalendarIcon,
      image: "/images/step1.jpg",
      imageAlt: "A woman sitting on a yellow couch, looking at her smartphone with a slight smile",
      badges: [
        {
          position: "bottom-right",
          className: "is-bottom-right"
        },
        {
          position: "top-left",
          className: "is-top-left rounded-corners"
        }
      ]
    },
    {
      step: "Step 2",
      title: "Prepare Your Order",
      description: "Fill the laundry bags based on the services you need and leave the bags outside your door or hand the bags to the driver.",
      icon: BagIcon,
      image: "/images/step2.jpg",
      imageAlt: "A woman seated on a chair, holding a decorative pillow, with a pink shipping bag placed beside her",
      badges: []
    },
    {
      step: "Step 3",
      title: "Cleaned at Our State-of-the-Art Facility",
      description: "Your items are taken to our award-winning facility, cleaned with over 50 specialized programs, and returned fresh, folded, or pressed – within 48 hours.",
      icon: FacilityIcon,
      image: "/images/step3.jpg",
      imageAlt: "A white dress shirt displayed on a mannequin in a modern laundry facility",
      badges: []
    },
    {
      step: "Step 4",
      title: "Next-Day Delivery Available",
      description: "Get your items back fresh and ready to wear in as little as 24 hours. Simply select next-day delivery when setting up your order and enjoy the convenience of a quick turnaround.",
      icon: DeliveryIcon,
      image: "/images/step4.jpg",
      imageAlt: "A man wearing a blue polo shirt holds a suit covered in plastic garment bag",
      badges: [
        {
          position: "top-right",
          className: "is-top-right z-index-0"
        },
        {
          position: "bottom-left",
          className: "is-bottom-left z-index-2"
        }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="lg:w-1/2">
            <span className="text-sm font-semibold text-forest uppercase tracking-wider mb-2 block">How It Works</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Laundry day, simplified. <span className="text-forest">Four steps and you're done.</span>
            </h2>
          </div>
          <Link 
            href="/download" 
            className="hidden lg:inline-flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all group"
          >
            <span>Download Laundrica</span>
            <span className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </Link>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-[auto,1fr] gap-8 lg:gap-12">
          {/* Progress Line Column */}
          <div className="hidden lg:block relative w-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-forest/10">
              <motion.div 
                className="w-full bg-forest origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                style={{ height: "100%" }}
              />
            </div>
            
            {/* Step Circles */}
            <div className="relative flex flex-col items-center">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative z-10 mb-32 last:mb-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                      <IconComponent />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Steps Content */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Mobile Step Indicator */}
                  <div className="flex items-center gap-3 mb-4 lg:hidden">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                      <IconComponent />
                    </div>
                    <span className="text-sm font-semibold text-forest/60">{step.step}</span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <span className="hidden lg:block text-sm font-semibold text-forest/60 mb-2">{step.step}</span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-forest mb-4">{step.title}</h3>
                      <p className="text-foreground/70 leading-relaxed mb-6 max-w-xl">
                        {step.description}
                      </p>
                      
                      {index === 0 && (
                        <Link 
                          href="/download" 
                          className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg font-semibold hover:bg-forest/90 transition-colors shadow-lg lg:hidden"
                        >
                          Download Laundrica
                        </Link>
                      )}
                    </div>

                    {/* Image Card with Badges */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        {/* Image Placeholder */}
                        <div className="aspect-[4/3] relative bg-gradient-to-br from-forest/20 to-forest/5">
                          <div className="absolute inset-0 flex items-center justify-center text-forest/30">
                            <IconComponent />
                          </div>
                        </div>

                        {/* Badges */}
                        {step.badges.map((badge, idx) => {
                          const positionClasses = {
                            'bottom-right': 'absolute bottom-4 right-4',
                            'top-left': 'absolute top-4 left-4',
                            'top-right': 'absolute top-4 right-4',
                            'bottom-left': 'absolute bottom-4 left-4'
                          };
                          
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                              className={`${positionClasses[badge.position as keyof typeof positionClasses]} ${badge.className} bg-white rounded-xl shadow-lg p-3 max-w-[200px] border border-forest/10`}
                            >
                              <div className="w-full h-12 bg-forest/10 rounded flex items-center justify-center text-forest text-xs">
                                {badge.position === 'bottom-right' && 'Pick Up · Today 03:00 - 04:00 pm'}
                                {badge.position === 'top-left' && 'Delivery at Door · In person'}
                                {badge.position === 'top-right' && 'Drop Off · Tomorrow · Free next-day delivery'}
                                {badge.position === 'bottom-left' && 'Order received · Collected · In process · Delivery Tuesday'}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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