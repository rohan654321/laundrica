// app/page.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  TbTruckDelivery,
  TbCoin,
  TbShieldCheck,
  TbClock,
  TbLeaf,
  TbWalk,
  TbDeviceImac,
  TbBox,
  TbDroplet,
  TbFold,
  TbMist,
  TbShoe,
  TbIroningSteam,
  TbLayoutGrid,
  TbBuilding,
  TbBuildingStore,
  TbCalendarEvent,
  TbBriefcase,
  TbCircleCheck,
  TbStar,
  TbMessageCircle,
  TbArrowRight,
  TbShirt,
  TbChevronRight
} from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';

// Trust Strip Component - Icons only with hover
function TrustStrip() {
  const trustItems = [
    { icon: TbTruckDelivery, label: 'Free Pickup & Delivery' },
    { icon: TbCoin, label: 'Affordable Service' },
    { icon: TbShieldCheck, label: 'Quality Checked' },
    { icon: TbClock, label: '24–48 Hours' },
    { icon: TbLeaf, label: 'Eco-Friendly' },
  ];

  return (
    <section className="bg-[#edeeeb] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group flex items-center gap-2 text-sm font-medium text-[#00261b] hover:text-green-700 transition-colors duration-300 cursor-default"
            >
              <item.icon className="text-2xl transition-all duration-300 group-hover:text-green-600 group-hover:scale-110" />
              <span className="transition-colors duration-300">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// How It Works Component with hover effects
function HowItWorks() {
  const steps = [
    { icon: TbWalk, title: 'Pickup', description: 'Schedule a time that fits your lifestyle. Our concierge arrives at your location for a contactless, secure garment collection.' },
    { icon: TbDeviceImac, title: 'Care Handling', description: 'Each garment is treated based on its DNA. Professional handle for delicate fibers, silk, and high-performance wear.' },
    { icon: TbBox, title: 'Delivery', description: 'Your wardrobe essentials return fresh, steamed, and ready to use. Packaged sustainably and delivered to your doorstep.' },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16  text-center flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">How it Works</h2>
          <p className="text-[#5c5f5e] max-w-md">Seamless fabric care from your doorstep back to your wardrobe.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group p-8 sm:p-10 rounded-2xl bg-[#f9faf7] border border-gray-100 hover:border-[#bcedd7] hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 bg-[#bcedd7] rounded-xl flex items-center justify-center mb-8"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <step.icon className="text-[#00261b] text-2xl" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#00261b] mb-4 group-hover:text-emerald-700 transition-colors">{step.title}</h3>
              <p className="text-[#5c5f5e] leading-relaxed group-hover:text-gray-700 transition-colors">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Grid Component with hover effects
function ServicesGrid() {
  const services = [
    {
      name: 'Wash & Press',
      icon: TbShirt,
      description: 'Everyday professional wear handled with precision heat and eco-safe detergents.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaHDEQVLbQfnwFR9_VyvfLd-ko007XGQDbe8hwTsWY87HzOxSF5OEi1VIUhp',
      slug: 'wash-and-press-services-in-dubai'
    },
    {
      name: 'Dry Cleaning',
      icon: TbDroplet,
      description: 'Gentle non-solvent cleaning for your most delicate silks, wools, and tailored suits.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDSmGE2TtzW6YVlJMSyDumNuxjDafzBKzMdR4qG3eqVcTjAah0uNIQZPkLuWeHPHol4b4KvmlsPFC_KN3p7tWQBQ6QwwY9XUZtHuIIRZFMG-vCYoyJ0_b_XudUiAoeNPHtFhFaLpyFciaiUZmTUIz8SpnuLdtIr0RiWN6TrQRdNdIb0l8hb8_Ixsen9jOJTPqkeWMIP7psQVAw1npMZJXsAkH52LwBCa_R3N1DEIzyDhvtApslLYMdiQNPrDDyWg663DoZ--vmdfsf',
      slug: 'dry-cleaning-services-in-dubai'
    },
    {
      name: 'Wash & Fold',
      icon: TbFold,
      description: 'Perfectly folded bulk laundry, saving you hours every week. Ready for the drawer.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyptsqgZUbgwL6Bq4bEsstny-6nDqBiqN5cBGYnfUgzSDXYcQRlm_pDhIj6-7C68tcWLpUVUoyuqYl-KtPTYiEtKvAJKV-rN_GAYoaYWEJWdkhtUtLShsLIqrzAO6qwGzS6zO7N7uSjdF1P9-5EztAjqUgYK-p6ctAHvjW1HY9dOh0XDdiAVOm2igRfKnzzKg7pled4rUzMo9aRGOi5PSI77IxhAP5ks-Hikp_CL0RfODVncfmgpsv7pnnGfj_ibEbUbaBjB1zew3f',
      slug: 'wash-and-fold-services-in-dubai'
    },
    {
      name: 'Steam Press',
      icon: TbIroningSteam, // You may need to import a suitable icon (e.g., TbIron, TbTemperature)
      description: 'Vertical steaming and heavy pressing for items that need that extra crisp finish.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYBa0ieuDAivzAotxiNgiAMrmoECVA1ks4ROokbZsxh4liVfcx2Pb1lWpKSTRPV_45qGjQ0Uz4y79LBIxx6-KAkjcB6d4ka18xLSn8rBWrMXOKDebhuHiJiVUHUQOHIrPw0gb9R-UhGAhEK4uSooNZqU8EGJcCfFU4w3FqWoQ3Es_QriCLgMwCPCs60G7Zq0D4tTMDRhhQyOdhSCKVVbS_NlQaDPLPYUrmT_ANvY58guyVIOe4e96pPzXXCNpM-MHeLGbGmHXJJy2N',
      slug: 'steam-press-services-in-dubai'
    },
    {
      name: 'Shoe Care',
      icon: TbShoe,
      description: 'Deep cleaning and rejuvenation for leather, suede, and designer footwear.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP4Fl1mcL71ms-0aDco1bos4KJFJEZx5OQnJIOBWlWluJMOTU3XhoRrxAQvDa2yackx6UDbMN2aeY0HX3vJrKxXZZvOxDngQlZRCw6IC4qNlNInPtj13VA8r8kN-3-D0Jxrt44nDI5JAqB96hap1m-Sa8t_3oq6LroL8Ag9vqpd38eVyGtjT49EfXZUUUEmpo9H8CJRr1964I_IjjhCECEuvi3KYyJIWnmLx6Um420B0z6GG4nyB3DmF5ORn7DB6p1qP9FsFWioqH3',
      slug: 'shoe-care-services-in-dubai'
    },
    {
      name: 'Carpet Care',
      icon: TbLayoutGrid,
      description: 'Industrial-grade extraction cleaning for rugs and carpets to remove deep-seated allergens.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA45R7mYBYS5a_-9pcT1PdHvi75OrnW6SgurkHhCX-fJ_ymGD8x0ZZuqiCo5Rh908iElZhzYe3KP3UjAx1wUQ4w_Gkwp_0eqEpz_6SyRfDVW2dl0ja2MyCknffKUydongro0YT2wxCiDPDXKNyOovJkMUoqOJr4ZA-NfMZLhrLsPSzz1PycN1W0-fHxB0FkSehzYFH-4oAoWgJiJMcL_xJ9Sn_AkpjsLYsdhmJFybGq8Ju4kHUF-wp0f_OGW_HJf2FKgFPDwm8vZA6D',
      slug: 'carpet-care-services-in-dubai'
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#edeeeb]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Our Specialized Services</h2>
          <p className="text-[#5c5f5e] max-w-lg mx-auto">Comprehensive care for everything from your daily essentials to your home's foundation.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <Link href={`/services/${service.slug}/orders`}>
                <div className="h-48 overflow-hidden relative">
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ x: 5 }}
                  >
                    <service.icon className="text-emerald-700 text-2xl group-hover:text-[#00261b] transition-colors" />
                    <h3 className="text-xl font-bold text-[#00261b] group-hover:text-emerald-700 transition-colors">{service.name}</h3>
                  </motion.div>
                  <p className="text-[#5c5f5e] text-sm line-clamp-3 group-hover:text-gray-700 transition-colors">{service.description}</p>
                  <motion.div
                    className="flex items-center gap-1 text-emerald-600 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-sm font-medium">Learn More</span>
                    <TbChevronRight className="text-sm" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Commercial Section with hover effects
function CommercialSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const features = [
    { icon: TbBuilding, title: 'Hotels & Spas', desc: 'Crisp linens and plush towels.' },
    { icon: TbBuildingStore, title: 'Restaurants', desc: 'Spotless table linens and uniforms.' },
    { icon: TbCalendarEvent, title: 'Events', desc: 'Rapid turnaround for galas.' },
    { icon: TbBriefcase, title: 'Offices', desc: 'Staff uniform programs.' },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#00261b] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">Elevating Hospitality Standards</h2>
          <p className="text-[#79a894] text-lg mb-8 leading-relaxed">Laundrica provides scalable, high-volume laundry solutions for Dubai's premier businesses. From boutique hotels to bustling corporate offices, we ensure your brand's textile quality never wavers.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-3 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="text-[#bcedd7] text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-bold group-hover:text-[#bcedd7] transition-colors">{feature.title}</p>
                  <p className="text-sm text-[#79a894] group-hover:text-white/80 transition-colors">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            className="px-8 py-3.5 bg-white text-[#00261b] rounded-xl font-bold hover:bg-[#bcedd7] transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Business Service
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square group cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA45R7mYBYS5a_-9pcT1PdHvi75OrnW6SgurkHhCX-fJ_ymGD8x0ZZuqiCo5Rh908iElZhzYe3KP3UjAx1wUQ4w_Gkwp_0eqEpz_6SyRfDVW2dl0ja2MyCknffKUydongro0YT2wxCiDPDXKNyOovJkMUoqOJr4ZA-NfMZLhrLsPSzz1PycN1W0-fHxB0FkSehzYFH-4oAoWgJiJMcL_xJ9Sn_AkpjsLYsdhmJFybGq8Ju4kHUF-wp0f_OGW_HJf2FKgFPDwm8vZA6D"
            alt="Commercial Laundry"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Why Laundrica Section with hover effects
function WhyLaundrica() {
  const benefits = [
    { text: 'Fabric-appropriate handling', desc: 'Every item is sorted by fiber type and color to prevent degradation.' },
    { text: 'Consistent quality checks', desc: 'Three-stage inspection process before any item is cleared for delivery.' },
    { text: 'Reliable turnaround time', desc: 'Real-time tracking and delivery windows that we actually stick to.' },
    { text: 'Easy pickup & delivery', desc: 'Simple app-based scheduling with zero hidden logistics fees.' },
    { text: 'Everyday usability', desc: 'Premium care priced for regular use, not just special occasions.' },
    { text: 'Business scalability', desc: 'Support infrastructure built to grow with your personal or business needs.' },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-6">The Laundrica Standard</h2>
            <p className="text-[#5c5f5e] leading-relaxed">Why leading residences in Downtown and Marina trust our care.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.text}
                className="space-y-2 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-bold text-[#00261b] flex items-center gap-2 group-hover:text-emerald-700 transition-colors">
                  <TbCircleCheck className="text-emerald-600 group-hover:scale-110 transition-transform" />
                  {benefit.text}
                </p>
                <p className="text-sm text-[#5c5f5e] group-hover:text-gray-700 transition-colors">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// About Section with hover effects
function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#edeeeb]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-16 shadow-xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          <motion.div
            className="lg:w-1/2 overflow-hidden rounded-2xl group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyX6I42VtuMvpG_fjvHENno8OFXNmaac40XuQja4TCLWcUU9RH3OTDWp76joEn_yaG4OJSZFZufUWdT-lFHypcnNWPLLighIqN24K8z6HkcG3xv69vOKPj3OfVK7mkdDoQnqRFAaljwLSPszzYGst-cgZtoB1vI0iPxcKNDj-Mqf3ZjCqEVK11i562tWLUIxUZ1pJADlp1f4ocPhxJb2CI7pkzti5qfdAIG6aIr3WOoZp-esmZpjc2PLHxMKqMyVsYhXvUp4YbNWOz"
              alt="About Laundrica"
              className="rounded-2xl w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-6 group-hover:text-emerald-700 transition-colors">Redefining Fabric Care in Dubai</h2>
            <p className="text-lg text-[#5c5f5e] mb-6 leading-relaxed">Born from the need for a truly seamless fabric care experience in Dubai's fast-paced environment, Laundrica combines traditional craftsmanship with modern logistics. We believe that caring for your clothes is an act of preserving your personal identity.</p>
            <p className="text-base text-[#5c5f5e] leading-relaxed">Our facility in Al Quoz is equipped with the latest in European laundry technology, operated by technicians who understand the soul of textiles. We don't just wash clothes; we restore them.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section with hover effects
function TestimonialsSection() {
  const testimonials = [
    { text: '"The most reliable service I\'ve found in Marina. My suits return looking better than when I bought them. Truly premium."', name: 'James Kensington', role: 'Marina Resident' },
    { text: '"Laundrica handles our boutique hotel linens with incredible care. Their commercial service is unmatched in Dubai."', name: 'Sarah Al-Maktoum', role: 'Hospitality Manager' },
    { text: '"Finally, a dry cleaner that understands silk. The pickup process is so easy, I never have to worry about my weekend wear."', name: 'Elena Rodriguez', role: 'Fashion Designer' },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Trust Across the Emirates</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-6 md:p-8 rounded-2xl bg-[#f9faf7] border border-gray-100 hover:border-[#bcedd7] hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex text-emerald-600 mb-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <TbStar key={i} className="fill-emerald-600 group-hover:scale-110 transition-transform" />
                ))}
              </div>
              <p className="text-[#00261b] font-medium mb-6 flex-grow italic group-hover:text-emerald-700 transition-colors">{testimonial.text}</p>
              <div>
                <p className="font-bold text-[#00261b] group-hover:text-emerald-700 transition-colors">{testimonial.name}</p>
                <p className="text-sm text-[#5c5f5e] group-hover:text-gray-700 transition-colors">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section with hover effects
function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#00261b] rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 w-64 h-64 bg-[#bcedd7] rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 group-hover:scale-105 transition-transform duration-500">Book Your Service Today</h2>
            <p className="text-[#79a894] text-lg mb-10 max-w-xl mx-auto group-hover:text-white/80 transition-colors">Experience the invisible luxury of professional fabric care. Fast, reliable, and just a click away.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services">
                <motion.button
                  className="px-8 py-3.5 bg-white text-[#00261b] rounded-xl font-semibold hover:bg-[#bcedd7] transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Online Booking
                </motion.button>
              </Link>
              <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="px-8 py-3.5 border border-white/30 bg-white/5 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                  WhatsApp Booking
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Hero Section with hover effects
function HeroSection() {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <section ref={heroRef} className="relative min-h-[800px] lg:min-h-[921px] flex items-center overflow-hidden pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="z-10"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6 cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            Premium Care in Dubai
          </motion.span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">Fabric Care, Effortlessly Delivered</h1>
          <p className="text-lg text-[#5c5f5e] mb-8 max-w-lg">Luxury freshness within reach. We handle your most delicate garments with precision, ensuring they return to you in pristine condition.</p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/services">
              <motion.button
                className="px-6 sm:px-8 py-3.5 bg-[#00261b] text-white rounded-xl font-semibold hover:opacity-90 transition cursor-pointer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Online Booking
              </motion.button>
            </Link>
            <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="px-6 sm:px-8 py-3.5 bg-white border border-gray-200 text-[#00261b] rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="text-emerald-600 text-xl" />
                WhatsApp Booking
              </motion.button>
            </a>
          </div>
          <div className="space-y-5 pt-5 border-t border-gray-100">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Our Services</p>
              <p className="text-sm font-medium text-[#00261b]/70">Wash & Press • Dry Cleaning • Wash & Fold • Steam Press • Shoe Care • Carpet Care</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">The Process</p>
              <p className="text-sm font-medium text-[#00261b] flex items-center gap-2 flex-wrap">
                Pickup <TbArrowRight className="text-xs" /> Care Handling <TbArrowRight className="text-xs" /> Quality Check <TbArrowRight className="text-xs" /> Delivery
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group"
        >
          <motion.div
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-aoAAnkjjQt19efSZRO767z2VuQrDxjdIUzszcRmWkd3WYmW_-XM6VBVhWIVJmZxGrUH1ZYmWeNmZLe66K-CTAAKsh728s2SFb7FVtizkYb9OHvqPgiSGoHbngxXx_ygofpAcrp0pFB8Ql8yeJ5OaGv54zSQDY4UxNX_f6035AqVf3SOyigizbTdMS7o5g3S4_fVp4XiRGlvupVXd1-bI3iGf_yek7nZSxpCYx63O90fL0RYfVcLdYzgVCKEQeqVj6KAirF9bZqd3"
              alt="Luxury Fabric Care"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-5 -left-5 bg-white p-5 rounded-2xl shadow-xl max-w-[180px] cursor-default"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <p className="text-2xl font-semibold text-[#00261b] mb-1">24h</p>
            <p className="text-xs text-[#5c5f5e]">Express turnaround available for your essentials.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="bg-[#f9faf7] text-[#1a1c1b] font-['Inter'] overflow-x-hidden">
      <Header />
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <ServicesGrid />
      <CommercialSection />
      <WhyLaundrica />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}