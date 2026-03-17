'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  
  const steps = [
    {
      number: "Step 1",
      title: "Place Your Order on the App",
      description: "Download the Laundrica app, schedule a pickup time that suits you, and we'll collect your laundry right from your doorstep.",
      icon: CalendarIcon,
      image: "/images/step1.jpg",
      badgeTop: {
        icon: "/images/pickup-badge.svg",
        alt: "Pick up schedule",
        text: "Pick Up Today 03:00 - 04:00 pm"
      },
      badgeBottom: {
        icon: "/images/delivery-badge.jpg",
        alt: "Delivery options",
        text: "Delivery at Door · Delivery in person"
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
      badgeTopRight: {
        icon: "/images/delivery-badge.svg",
        alt: "Delivery options",
        text: "Drop Off · Tomorrow · Free next-day delivery"
      },
      badgeBottomLeft: {
        icon: "/images/order-status.svg",
        alt: "Order status",
        text: "Order received 22 Aug · Order collected · Items in process · Delivery on Tuesday"
      }
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-16">
          <span className="text-sm font-semibold text-forest uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 leading-tight">
            Laundry day, simplified.
            <span className="text-forest block">Four steps and you're done.</span>
          </h2>
        </div>

        {/* Steps with Vertical Scroll Effect */}
        <div className="relative">
          {/* Progress Line - This fills as you scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-forest/10 hidden lg:block">
            <motion.div 
              className="w-full bg-forest origin-top"
              style={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ amount: 0.3 }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  {/* Step Circle Indicator */}
                  <div className="absolute left-0 -top-6 hidden lg:flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                      <StepIcon />
                    </div>
                    <span className="text-sm font-semibold text-forest/60">{step.number}</span>
                  </div>

                  {/* Content - alternates sides */}
                  <div className={`lg:pl-16 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <span className="text-sm font-semibold text-forest/60 block lg:hidden mb-2">{step.number}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-forest mb-4">{step.title}</h3>
                    <p className="text-foreground/70 leading-relaxed mb-6 max-w-xl">
                      {step.description}
                    </p>
                    
                    {index === 0 && (
                      <Link 
                        href="/download" 
                        className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg font-semibold hover:bg-forest/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                      >
                        Download Laundrica
                      </Link>
                    )}
                  </div>

                  {/* Image Card with Badges - Like Washmen's design */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-forest/10">
                      {/* Image Placeholder - Replace with actual images */}
                      <div className="aspect-[4/3] relative bg-gradient-to-br from-forest/20 to-forest/5">
                        <div className="absolute inset-0 flex items-center justify-center text-forest/30">
                          <StepIcon />
                        </div>
                      </div>
                      
                      {/* Badge Top Left - Like Washmen's first step */}
                      {step.badgeTop && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 max-w-[200px] border border-forest/10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-forest/10 rounded-lg flex items-center justify-center text-forest text-xs">
                              📅
                            </div>
                            <div className="text-xs">
                              <p className="font-medium text-forest">Pick Up</p>
                              <p className="text-foreground/60">Today 03:00 - 04:00 pm</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Badge Bottom Left - Like Washmen's first step */}
                      {step.badgeBottom && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3 max-w-[220px] border border-forest/10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-forest/10 rounded-full overflow-hidden">
                              <div className="w-full h-full bg-forest/20"></div>
                            </div>
                            <div className="text-xs">
                              <p className="font-medium text-forest">Delivery options</p>
                              <p className="text-foreground/60">Delivery at Door · In person</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Badge Top Right - Like Washmen's fourth step */}
                      {step.badgeTopRight && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 max-w-[220px] border border-forest/10"
                        >
                          <div className="text-xs">
                            <p className="font-medium text-forest mb-1">Drop Off</p>
                            <p className="text-forest/70">Tomorrow · Free next-day delivery</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Badge Bottom Left - Like Washmen's fourth step */}
                      {step.badgeBottomLeft && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3 max-w-[240px] border border-forest/10"
                        >
                          <div className="text-xs">
                            <p className="font-medium text-forest mb-1">Order Status</p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-forest rounded-full"></span>
                                <span className="text-forest/70">Order received 22 Aug</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-forest rounded-full"></span>
                                <span className="text-forest/70">Order collected</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-forest rounded-full"></span>
                                <span className="text-forest/70">Items in process</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-forest rounded-full"></span>
                                <span className="text-forest/70">Delivery on Tuesday</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
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
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
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