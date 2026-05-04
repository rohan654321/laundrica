// app/pricing/page.tsx
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { PricingToggle } from '@/components/pricing/pricing-toggle';
import { FeatureComparison } from '@/components/pricing/feature-comparison';
import { ServiceMenu } from '@/components/pricing/service-menu';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FAQAccordionMinimal } from '@/components/pricing/faq-accordion-minimal';

import {
  Sparkles, Shirt, Home, Crown, Download, FileText,
  Check, Clock, Heart, Leaf, Zap, Award, ArrowRight,
  Phone, MessageCircle, Shield, Truck, Star, Calendar,
  Gem, ThumbsUp, Droplets, Wind, WashingMachine
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | 'household' | 'other'>('men');
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const handleDownloadPDF = () => {
    const pdfUrl = '/pricing-menu.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'laundrica-price-list.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#f9faf7]">
      <Header />

      {/* Premium Hero Banner */}
      <section ref={heroRef} className="relative min-h-[450px] flex items-center overflow-hidden pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Transparent Pricing</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">
              Premium Care for <span className="text-emerald-700">Every Fabric</span>
            </h1>
            <p className="text-lg text-[#5c5f5e] mb-8 leading-relaxed max-w-lg">
              Professional laundry, dry cleaning, and garment care. Free pickup & delivery across Dubai.
              Transparent pricing with no hidden fees.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/booking">
                <button className="px-8 py-3.5 bg-[#00261b] text-white rounded-xl font-semibold hover:opacity-90 transition">
                  Book Your Service
                </button>
              </Link>
              <button
                onClick={handleDownloadPDF}
                className="px-8 py-3.5 bg-white border border-gray-200 text-[#00261b] rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Price List
              </button>
            </div>
            <div className="space-y-5 pt-5 border-t border-gray-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Free Pickup & Delivery</p>
                <p className="text-sm font-medium text-[#00261b]/70">On all orders — no minimum required</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Express Service Available</p>
                <p className="text-sm font-medium text-[#00261b] flex items-center gap-2 flex-wrap">
                  Same-day delivery for orders placed before 10 AM
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#bcedd7]/30 to-[#00261b]/10 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-[#bcedd7] rounded-full flex items-center justify-center mb-6">
                  <Image
                    src="/images/laundry.jpg"
                    alt="Laundry"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#00261b]">Starting from</h3>
                <p className="text-5xl font-bold text-emerald-700 mt-2">AED 6</p>
                <p className="text-[#5c5f5e] mt-2">per garment</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl max-w-[200px]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-[#00261b]">Quality Guaranteed</p>
                  <p className="text-xs text-gray-500">100% satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Service Menu Section with Category Tabs */}
      <section className="py-16 bg-[#edeeeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">A La Carte Pricing</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Complete Price List</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
              Transparent pricing for all our services. No hidden charges, just premium care.
            </motion.p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'men', label: 'Men\'s Clothing', icon: Shirt },
              { id: 'women', label: 'Women\'s Clothing', icon: Heart },
              { id: 'household', label: 'Household Items', icon: Home },
              { id: 'other', label: 'Special Items', icon: Star }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-[#00261b] text-white shadow-lg'
                    : 'bg-white text-[#00261b] hover:bg-[#bcedd7] border border-gray-200'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          <ServiceMenu activeCategory={activeCategory} />
        </div>
      </section>


      {/* Why Choose Us Section - Premium */}
      <section className="py-16 bg-[#f9faf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Our Advantages</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Why Choose Laundrica</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
              Experience the difference of premium fabric care
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Personalized Care", desc: "Every fabric type treated with precision and expertise", color: "bg-rose-50", iconColor: "text-rose-600" },
              { icon: Gem, title: "Flexible Pricing", desc: "Options designed to suit every budget and need", color: "bg-emerald-50", iconColor: "text-emerald-600" },
              { icon: Clock, title: "Effortless Convenience", desc: "Your laundry completed with a single request", color: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: Award, title: "Premium Products", desc: "Only the finest detergents and cleaning solutions", color: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Zap, title: "Express Service", desc: "Delivery in as little as eight hours", color: "bg-purple-50", iconColor: "text-purple-600" },
              { icon: ThumbsUp, title: "Real-Time Updates", desc: "Complete transparency throughout the process", color: "bg-cyan-50", iconColor: "text-cyan-600" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="font-bold text-xl text-[#00261b] mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <FAQAccordionMinimal /> */}
      <Footer />
    </main>
  );
}