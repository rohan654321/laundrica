'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Icons matching Washmen's style
const ExpressIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"/>
  </svg>
);

const PremiumIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="currentColor"/>
  </svg>
);

const DeepCleanIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="currentColor"/>
  </svg>
);

const DryCleanIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" fill="currentColor"/>
  </svg>
);

const ShoeIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 14.5C21 14.5 19 12 15 12C11 12 6 14.5 6 14.5C6 14.5 3 16 3 18C3 20 4 20 4 20H20C20 20 21 20 21 18C21 16.5 21 14.5 21 14.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 14L5 9" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 14L19 9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const LinenIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H14" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="4" width="12" height="16" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
  </svg>
);

export function ServicesPricing() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const services = [
    {
      title: "Express Wash",
      icon: ExpressIcon,
      description: "Quick turnaround service for everyday clothes. Ready in 24 hours.",
      pricing: "Priced per bag:",
      items: [
        { name: "Up to 5 kg", price: "₹499" },
        { name: "Up to 8 kg", price: "₹699" },
        { name: "Up to 12 kg", price: "₹899" }
      ],
      image: "/images/express-wash.jpg",
      link: "/services/express-wash"
    },
    {
      title: "Premium Care",
      icon: PremiumIcon,
      description: "Delicate handling for your finest garments with luxury detergent.",
      pricing: "Priced per item:",
      items: [
        { name: "Shirts", price: "₹199" },
        { name: "Pants", price: "₹249" },
        { name: "Suits", price: "₹599" },
        { name: "Dresses", price: "₹399" }
      ],
      image: "/images/premium-care.jpg",
      link: "/services/premium-care"
    },
    {
      title: "Deep Clean",
      icon: DeepCleanIcon,
      description: "Heavy-duty cleaning for work clothes and heavily soiled items.",
      pricing: "Priced per bag:",
      items: [
        { name: "Up to 5 kg", price: "₹599" },
        { name: "Up to 8 kg", price: "₹799" },
        { name: "Up to 12 kg", price: "₹999" }
      ],
      image: "/images/deep-clean.jpg",
      link: "/services/deep-clean"
    },
    {
      title: "Dry Clean",
      icon: DryCleanIcon,
      description: "Professional dry cleaning for suits, dresses, and formal wear.",
      pricing: "Priced per item:",
      items: [
        { name: "Suits", price: "₹899" },
        { name: "Dresses", price: "₹599" },
        { name: "Coats", price: "₹799" },
        { name: "Traditional Wear", price: "₹699" }
      ],
      image: "/images/dry-clean.jpg",
      link: "/services/dry-clean"
    },
    {
      title: "Shoe Care",
      icon: ShoeIcon,
      description: "Professional cleaning and restoration for all types of footwear.",
      pricing: "Priced per pair:",
      items: [
        { name: "Sneakers", price: "₹399" },
        { name: "Leather Shoes", price: "₹499" },
        { name: "Boots", price: "₹599" }
      ],
      image: "/images/shoe-care.jpg",
      beforeAfter: true,
      link: "/services/shoe-care"
    },
    {
      title: "Home Linens",
      icon: LinenIcon,
      description: "Fresh, crisp cleaning for bedsheets, towels, and curtains.",
      pricing: "Priced per item:",
      items: [
        { name: "Bedsheets", price: "₹299" },
        { name: "Towels (set)", price: "₹249" },
        { name: "Curtains", price: "₹499" },
        { name: "Duvets", price: "₹699" }
      ],
      image: "/images/home-linens.jpg",
      link: "/services/home-linens"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoScrolling && isInView) {
      interval = setInterval(() => {
        setActiveSlide((prev) => {
          const maxSlide = services.length - 3;
          if (prev >= maxSlide) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, isInView, services.length]);

  // Pause auto-scroll when user interacts
  const handleManualNavigation = (newSlide: number) => {
    setIsAutoScrolling(false);
    setActiveSlide(newSlide);
    
    // Resume auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="services" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-forest uppercase tracking-wider">Services</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-2">
              Services & Pricing
            </h2>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleManualNavigation(Math.max(0, activeSlide - 1))}
              className="w-10 h-10 rounded-full border border-forest flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
              disabled={activeSlide === 0}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleManualNavigation(Math.min(services.length - 3, activeSlide + 1))}
              className="w-10 h-10 rounded-full border border-forest flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none"
              disabled={activeSlide >= services.length - 3}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${activeSlide * (100 / 3 + 1.5)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {services.map((service, index) => {
                const IconComponent = service.icon;
                
                return (
                  <motion.div
                    key={index}
                    className="min-w-[calc(33.333%-16px)] flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="rounded-2xl border-2 border-black/10 overflow-hidden h-full flex flex-col bg-white hover:shadow-xl transition-shadow group">
                      {/* Image area with black/green gradient */}
                      <div className="relative h-48 bg-gradient-to-br from-black to-forest">
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                          <div className="w-24 h-24">
                            <IconComponent />
                          </div>
                        </div>
                        
                        {/* Service title overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <div className="w-12 h-1 bg-forest rounded-full" />
                        </div>
                        
                        {service.beforeAfter && (
                          <>
                            <span className="absolute top-4 left-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">Before</span>
                            <span className="absolute top-4 right-4 bg-forest text-white text-xs px-3 py-1.5 rounded-full">After</span>
                          </>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-1">
                        <p className="text-black/60 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        
                        {service.pricing && (
                          <>
                            <p className="text-xs font-medium text-forest mb-2">{service.pricing}</p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {service.items?.map((item, idx) => (
                                <span key={idx} className="px-3 py-1 bg-black/5 text-black rounded-full text-xs border border-black/10">
                                  {item.name}: <span className="font-semibold text-forest">{item.price}</span>
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                        
                        <Link 
                          href={service.link}
                          className="inline-flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all group mt-2 text-sm"
                        >
                          <span>Learn More</span>
                          <span className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                            <ArrowIcon />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Auto-scroll indicator */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            {/* Progress indicator for auto-scroll */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-black/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-forest"
                  animate={{ 
                    width: isAutoScrolling ? ["0%", "100%"] : "0%"
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: isAutoScrolling ? Infinity : 0,
                    ease: "linear"
                  }}
                />
              </div>
              <span className="text-xs text-black/40">
                {isAutoScrolling ? 'Auto-scrolling' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(index * 3)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(activeSlide / 3) === index 
                    ? 'w-8 bg-forest' 
                    : 'w-2 bg-black/20 hover:bg-forest/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-forest transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group">
              View All Services
              <span className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <ArrowIcon />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}