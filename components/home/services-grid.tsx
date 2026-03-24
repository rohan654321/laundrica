'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Forest Green themed icons
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

// Updated services with actual Freshora Care pricing from PDF
const services = [
  {
    title: "Express Wash & Press",
    icon: ExpressIcon,
    description: "Quick turnaround for everyday clothes. Professional washing and pressing.",
    pricing: "Per Item Pricing:",
    items: [
      { name: "T-Shirts / Shirts", price: "AED 6" },
      { name: "Trousers / Jeans", price: "AED 6" },
      { name: "Kandoora", price: "AED 10" },
      { name: "Ghatra", price: "AED 8" }
    ],
    link: "/services/express-wash"
  },
  {
    title: "Premium Care",
    icon: PremiumIcon,
    description: "Delicate handling for your finest garments with luxury care.",
    pricing: "Premium Items:",
    items: [
      { name: "Suit (2-Piece)", price: "AED 25" },
      { name: "Suit (3-Piece)", price: "AED 35" },
      { name: "Leather Jacket", price: "AED 35" },
      { name: "Waist Coat", price: "AED 15" }
    ],
    link: "/services/premium-care"
  },
  {
    title: "Deep Clean",
    icon: DeepCleanIcon,
    description: "Heavy-duty cleaning for heavily soiled items and work clothes.",
    pricing: "Deep Cleaning:",
    items: [
      { name: "Jacket / Coat", price: "AED 20" },
      { name: "Sweater / Pullover", price: "AED 14" },
      { name: "Inner Wear", price: "AED 5" },
      { name: "Handkerchief", price: "AED 2" }
    ],
    link: "/services/deep-clean"
  },
  {
    title: "Dry Cleaning",
    icon: DryCleanIcon,
    description: "Professional dry cleaning for suits, dresses, and formal wear.",
    pricing: "Dry Clean Only:",
    items: [
      { name: "Abaya / Burqah", price: "AED 14" },
      { name: "Full Dress", price: "AED 15" },
      { name: "Salwar Kameez", price: "AED 15" },
      { name: "Saree", price: "AED 16" }
    ],
    link: "/services/dry-clean"
  },
  {
    title: "Shoe Spa",
    icon: ShoeIcon,
    description: "Professional cleaning and restoration for all types of footwear.",
    pricing: "Call for Pricing:",
    items: [
      { name: "Sneakers", price: "Call" },
      { name: "Leather Shoes", price: "Call" },
      { name: "Boots", price: "Call" }
    ],
    link: "/services/shoe-care"
  },
  {
    title: "Home Linens",
    icon: LinenIcon,
    description: "Fresh, crisp cleaning for bedsheets, towels, curtains, and duvets.",
    pricing: "Per Item Pricing:",
    items: [
      { name: "Bedsheet (Double)", price: "AED 14" },
      { name: "Duvet (Large)", price: "AED 35" },
      { name: "Curtains (per sq m)", price: "AED 20-25" },
      { name: "Bath Towel (Large)", price: "AED 7" }
    ],
    link: "/services/home-linens"
  }
];

export function ServicesPricing() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Scroll-based filling animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const fillWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "100%"]);

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
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, isInView, services.length]);

  const handleManualNavigation = (newSlide: number) => {
    setIsAutoScrolling(false);
    setActiveSlide(newSlide);
    
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 8000);
  };

  return (
    <section ref={sectionRef} id="services" className="bg-[#f8faf6] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with scroll-filling line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold text-[#1f4f2b] uppercase tracking-wider">Services</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                Services & Pricing
              </h2>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleManualNavigation(Math.max(0, activeSlide - 1))}
                className="w-10 h-10 rounded-full border-2 border-[#1f4f2b] flex items-center justify-center text-[#1f4f2b] hover:bg-[#1f4f2b] hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
                disabled={activeSlide === 0}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => handleManualNavigation(Math.min(services.length - 3, activeSlide + 1))}
                className="w-10 h-10 rounded-full border-2 border-[#1f4f2b] flex items-center justify-center text-[#1f4f2b] hover:bg-[#1f4f2b] hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
                disabled={activeSlide >= services.length - 3}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Scroll-triggered Filling Line - The main animation */}
          <div className="mt-6 relative">
            <div className="h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#1f4f2b] to-[#2a6e3a] rounded-full"
                style={{ width: fillWidth }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              Scroll to fill • Auto-scroll {isAutoScrolling ? 'active' : 'paused'}
            </p>
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card with full content */}
                    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group">
                      {/* Header with gradient */}
                      <div className="relative bg-gradient-to-br from-gray-900 to-[#1f4f2b] p-6">
                        <div className="flex items-start justify-between">
                          <div className="w-14 h-14 text-white/30">
                            <IconComponent />
                          </div>
                          <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
                            {service.pricing}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mt-4 mb-2">{service.title}</h3>
                        <p className="text-white/70 text-sm line-clamp-2">{service.description}</p>
                      </div>
                      
                      {/* Content - All inside card */}
                      <div className="p-6 flex-1">
                        {/* Pricing items */}
                        <div className="space-y-3 mb-6">
                          <p className="text-xs font-semibold text-[#1f4f2b] uppercase tracking-wider">Popular Items</p>
                          <div className="grid grid-cols-2 gap-2">
                            {service.items?.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center border-b border-gray-100 py-2">
                                <span className="text-sm text-gray-600">{item.name}</span>
                                <span className="text-sm font-semibold text-[#1f4f2b]">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Additional info */}
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-3">
                            *Prices subject to variation based on garment condition
                          </p>
                          <Link 
                            href={service.link}
                            className="inline-flex items-center gap-2 text-[#1f4f2b] font-semibold hover:gap-3 transition-all group"
                          >
                            <span>View Details</span>
                            <span className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                              <ArrowIcon />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Auto-scroll indicator */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#1f4f2b] rounded-full"
                  animate={{ 
                    width: isAutoScrolling ? ["0%", "100%"] : "0%"
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: isAutoScrolling ? Infinity : 0,
                    ease: "linear"
                  }}
                />
              </div>
              <span className="text-xs text-gray-400">
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(activeSlide / 3) === index 
                    ? 'w-8 bg-[#1f4f2b]' 
                    : 'w-2 bg-gray-300 hover:bg-[#1f4f2b]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#1f4f2b] text-white rounded-xl font-semibold hover:bg-[#2a6e3a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group">
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