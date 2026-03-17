'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: "Clean & Press",
    icon: "/icons/cleanpress.svg",
    description: "We ensures your clothes are treated and steamed with expert attention from tailored suits and dress shirts to silks and fine fabrics.",
    pricing: "Priced per item:",
    items: [
      { name: "Shirts", price: "₹18" },
      { name: "Pants", price: "₹23" },
      { name: "Suits", price: "₹52" }
    ],
    color: "green",
    image: "/images/clean-press.jpg",
    imageAlt: "Smiling woman holding a pink shirt covered in a transparent garment bag",
    link: "/services/clean-and-press"
  },
  {
    title: "Wash & Fold",
    icon: "/icons/washfold.svg",
    description: "We wash and fold your everyday laundry. You can send up to 12 kg of laundry for just ₹75. Perfect for sportswear, casualwear, and loungewear.",
    color: "blue",
    image: "/images/wash-fold.jpg",
    imageAlt: "Man folding white socks next to a stack of folded clothes",
    link: "/services/wash-and-fold"
  },
  {
    title: "Press Only",
    icon: "/icons/pressonly.svg",
    description: "Already washed? Let us handle the wrinkles. Our Steam-Press Service gives pre-cleaned garments a crisp, polished look. Priced per item.",
    color: "gray",
    image: "/images/press-only.jpg",
    imageAlt: "Man holding a covered brown shirt labeled 'wishmen'",
    link: "/services/press-only"
  },
  {
    title: "Bed & Bath",
    icon: "/icons/homecare.svg",
    description: "We turn your home linens into crisp, fresh pieces. You can send up to 15 home linens for ₹85. Perfect for bedsheets, duvets, towels.",
    color: "purple",
    image: "/images/bed-bath.jpg",
    imageAlt: "Smiling woman arranging a decorative pillow on a neatly made bed",
    link: "/services/bed-and-bath"
  },
  {
    title: "Shoe Care",
    icon: "/icons/shoecare.svg",
    description: "We clean, repair, and restore all types of shoes from sneakers to leather shoes, formal heels, and casual loafers. Priced per pair.",
    color: "orange",
    image: "/images/shoe-care.jpg",
    imageAlt: "Pair of beige leather slide sandals",
    beforeAfter: true,
    link: "/services/shoecare"
  },
  {
    title: "Bag Care",
    icon: "/icons/bagcare.svg",
    description: "We handle bag cleaning, strap repair, interior stain removal, color touch-ups, and protective finishing. Priced per item.",
    color: "orange",
    image: "/images/bag-care.jpg",
    imageAlt: "Yellow designer handbag with logo",
    beforeAfter: true,
    link: "/services/bagcare"
  }
];

const ArrowIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.9159 13.2096H2.70736C2.45869 13.2096 2.25361 13.1288 2.09211 12.9671C1.93044 12.8055 1.84961 12.6024 1.84961 12.3579C1.84961 12.1134 1.93044 11.9103 2.09211 11.7486C2.25361 11.587 2.45869 11.5061 2.70736 11.5061H18.9099L14.3964 6.99865C14.2265 6.82865 14.1416 6.62873 14.1416 6.3989C14.1416 6.16906 14.2265 5.96915 14.3964 5.79915C14.5664 5.62932 14.7663 5.5454 14.9961 5.5474C15.2259 5.5494 15.4259 5.63531 15.5959 5.80515L21.5519 11.7611C21.6432 11.8525 21.7085 11.9468 21.7479 12.0441C21.787 12.1413 21.8066 12.2479 21.8066 12.3639C21.8066 12.4759 21.787 12.5805 21.7479 12.6776C21.7085 12.775 21.6432 12.8693 21.5519 12.9606L15.5959 18.9166C15.4259 19.0865 15.2259 19.1724 14.9961 19.1744C14.7663 19.1764 14.5664 19.0905 14.3964 18.9166C14.2265 18.7466 14.1416 18.5477 14.1416 18.3199C14.1416 18.0919 14.2265 17.893 14.3964 17.7231L18.9159 13.2096Z" fill="currentColor"/>
  </svg>
);

export function ServicesPricing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-emerald-50 border-emerald-200',
      blue: 'bg-blue-50 border-blue-200',
      gray: 'bg-gray-50 border-gray-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200'
    };
    return colors[color] || colors.blue;
  };

  const totalSlides = Math.ceil(services.length / 3);

  return (
    <section ref={sectionRef} id="services" className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with navigation - Exactly like Washmen */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Services & Pricing</h2>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center hover:bg-forest/5 transition-colors disabled:opacity-40"
              disabled={currentSlide === 0}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.31066 8.75001L9.03033 14.4697L7.96967 15.5303L0.439339 8.00001L7.96967 0.469676L9.03033 1.53034L3.31066 7.25001L15.5 7.25L15.5 8.75L3.31066 8.75001Z" fill="currentColor"/>
              </svg>
            </button>
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
              className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center hover:bg-forest/5 transition-colors disabled:opacity-40"
              disabled={currentSlide === totalSlides - 1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75H0.5V7.25H12.6893Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-6">
                  {services.slice(slideIndex * 3, slideIndex * 3 + 3).map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-1"
                    >
                      <div className={`rounded-2xl border-2 ${getColorClass(service.color)} overflow-hidden h-full flex flex-col`}>
                        {/* Card Content */}
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-forest">{service.title}</h3>
                            <div className="w-10 h-10 sm:w-12 sm:h-12">
                              <img src={service.icon} alt={service.title} className="w-full h-full" />
                            </div>
                          </div>
                          
                          <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                            {service.description}
                          </p>
                          
                          {service.pricing && (
                            <>
                              <p className="text-xs font-medium text-forest/70 mb-2">{service.pricing}</p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {service.items?.map((item, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-forest/5 text-forest rounded-full text-xs border border-forest/10">
                                    {item.name}: {item.price}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                          
                          <Link 
                            href={service.link}
                            className="inline-flex items-center gap-1 text-forest font-semibold hover:gap-2 transition-all group text-sm"
                          >
                            <span>Learn More</span>
                            <span className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                              <ArrowIcon />
                            </span>
                          </Link>
                        </div>
                        
                        {/* Image Section */}
                        <div className="relative h-40 sm:h-44 bg-forest/5">
                          <div className="absolute inset-0 flex items-center justify-center text-forest/20">
                            <img src={service.icon} alt="" className="w-12 h-12 opacity-20" />
                          </div>
                          {service.beforeAfter && (
                            <>
                              <span className="absolute top-2 left-2 bg-forest/80 text-white text-xs px-2 py-1 rounded">Before</span>
                              <span className="absolute top-2 right-2 bg-forest text-white text-xs px-2 py-1 rounded">After</span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots - Exactly like Washmen */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-8 bg-forest' 
                    : 'w-1.5 bg-forest/30 hover:bg-forest/50'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter - Like Washmen */}
          <div className="absolute bottom-0 right-0 text-sm text-forest/60">
            {currentSlide + 1}/{totalSlides}
          </div>
        </div>
      </div>
    </section>
  );
}