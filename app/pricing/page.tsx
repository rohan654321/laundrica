// app/pricing/page.tsx
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { PricingToggle } from '@/components/pricing/pricing-toggle';
import { FeatureComparison } from '@/components/pricing/feature-comparison';
import { ServiceMenu } from '@/components/pricing/service-menu';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Shirt, Home, Crown, Download, FileText } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | 'household' | 'other'>('men');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a temporary link to your PDF file
    const pdfUrl = '/pricing-menu.pdf'; // Update this path to your actual PDF file
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'laundry-price-list.pdf'; // Download with this filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section - Forest Green Theme */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-br from-[#1f4f2b] via-[#2a6e3a] to-[#1f4f2b] overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium text-white">Luxury | Fresh | Clean</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Premium Care for
              <span className="block text-amber-300">Every Fabric</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            >
              Professional laundry, dry cleaning, and garment care. Free pickup & delivery in Dubai.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <i className="fas fa-phone-alt text-amber-300"></i>
                <span>050 925 9667</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <i className="fas fa-map-marker-alt text-amber-300"></i>
                <span>Azizi Riviera 42, Meydan, Dubai</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* A La Carte Services Section - From PDF */}
      <section className="py-20 px-4 bg-[#f8faf6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[#1f4f2b] mb-4"
            >
              A La Carte Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600"
            >
              Pay per item — no subscription needed
            </motion.p>
            <p className="text-sm text-gray-500 mt-2">*Prices in AED | Subject to variation based on garment condition</p>
          </div>

          {/* SQUARE DOWNLOAD BUTTON - BEFORE THE TABLE */}
          <div className="flex justify-center mb-6">
            <motion.button
              onClick={handleDownloadPDF}
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-[#1f4f2b] hover:bg-[#2a6e3a] text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group"
              title="Download Price List PDF"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
            </motion.button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'men', label: 'Men Clothing', icon: 'fa-user-tie' },
              { id: 'women', label: 'Women Clothing', icon: 'fa-female' },
              { id: 'household', label: 'Household Items', icon: 'fa-home' },
              { id: 'other', label: 'Special Items', icon: 'fa-gem' },
            ].map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#1f4f2b] text-white shadow-lg'
                    : 'bg-white text-[#1f4f2b] border border-[#1f4f2b]/20 hover:bg-[#e8f3e6]'
                }`}
              >
                <i className={`fas ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>

          <ServiceMenu activeCategory={activeCategory} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[#f8faf6]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[#1f4f2b] mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="grid gap-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees. Just sign up and start using our service immediately. Your first pickup can be scheduled within 24 hours.',
              },
              {
                q: 'What happens if I cancel?',
                a: 'You can cancel anytime with no penalties. Your plan remains active until the end of your current billing period.',
              },
              {
                q: 'Do you offer discounts for annual billing?',
                a: 'Yes! Annual plans save you 20% compared to monthly billing. That\'s 2+ months free.',
              },
              {
                q: 'Do you clean wedding dresses and special garments?',
                a: 'Absolutely! We offer specialized care for wedding dresses (AED 50-100 for wash/press) and other premium garments. Contact us for a custom quote.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-[#1f4f2b]/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-[#1f4f2b] mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}