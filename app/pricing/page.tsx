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
import { Sparkles, Shirt, Home, Crown, Download, FileText, Check, Clock, Heart, Leaf, Zap, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

      {/* Hero Banner Section with Parallax - Reduced Height */}
      <section>
        <div
          className="relative h-[350px] bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/curtainCleaning.jpg')",
            
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-r 
  from-[#0b3d2a]/85 
  via-[#0b3d2a]/55 
  to-transparent"
          />
          <div className="absolute inset-0 bg-gradient-to-t 
  from-[#0b3d2a]/70 
  to-transparent"
          />
          <div className="relative z-30 text-white text-center">
            

            {/* TOP BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-yellow-400 text-sm">✨</span>
              <span className="text-sm text-white">Luxury | Fresh | Clean</span>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Premium Care for
              <span className="block text-yellow-400">Every Fabric</span>
            </h1>

            {/* SUBTEXT */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Professional laundry, dry cleaning, and garment care. Free pickup & delivery in Dubai.
            </p>

          </div>
        </div>
      </section>

      {/* Effortless Care Section - Matching About Page */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1f4f2b] font-medium mb-10 text-center">
            Effortless Care, <span className="text-foreground"> Elevated Service</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/contact" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1f4f2b]/10 rounded-full flex items-center justify-center group-hover:bg-[#1f4f2b] transition-colors duration-300 flex-shrink-0">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#1f4f2b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                    <span className="group-hover:text-[#1f4f2b] transition-colors">Save Time and Money</span>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">No unnecessary trips; we come to you!</p>
                </div>
              </div>
            </Link>

            <Link href="/contact" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1f4f2b]/10 rounded-full flex items-center justify-center group-hover:bg-[#1f4f2b] transition-colors duration-300 flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#1f4f2b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                    <span className="group-hover:text-[#1f4f2b] transition-colors">Pure Care for Every Fabric</span>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Professional, fabric-safe cleaning that protects colors, texture, and quality.</p>
                </div>
              </div>
            </Link>

            <Link href="#" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block sm:col-span-2 lg:col-span-1 border border-border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1f4f2b]/10 rounded-full flex items-center justify-center group-hover:bg-[#1f4f2b] transition-colors duration-300 flex-shrink-0">
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-[#1f4f2b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                    <span className="group-hover:text-[#1f4f2b] transition-colors">Eco-Responsible Cleaning</span>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Perc-free solutions that respect your wardrobe and the planet.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Excellence Without Exception - Parallax Section */}
      <section className="bg-white my-12">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1f4f2b] font-medium text-center">
            Excellence<span className="text-foreground"> Without Exception</span>
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-muted-foreground text-center mt-2">Our Guarantee</h3>
        </div>
        <div
          className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{ backgroundImage: "url('/images/curtainCleaning.jpg')" }}
        >{/* LEFT → RIGHT DEPTH */}
          <div className="absolute inset-0 bg-gradient-to-r 
  from-[#0b3d2a]/85 
  via-[#0b3d2a]/55 
  to-transparent"
          />

          {/* BOTTOM SHADE */}
          <div className="absolute inset-0 bg-gradient-to-t 
  from-[#0b3d2a]/75 
  via-transparent 
  to-transparent"
          />
          <div className="text-white text-center max-w-4xl mx-auto px-6 z-30 relative">
            <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              Laundrica has been the trusted name in garment care. We are committed to returning every piece in immaculate condition. In the rare instance of loss or damage, we provide reimbursement up to the full value of the item.
            </p>
            <Link href="/best-laundry-services-in-dubai">
              <Button className="bg-white text-[#1f4f2b] hover:bg-gray-100 shadow-lg">
                Get Service Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white mb-20 px-4">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1f4f2b] font-medium text-center">
            Why<span className="text-foreground"> Choose Us</span>
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-muted-foreground text-center mt-2">Our Advantages</h3>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Personalized Care</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Every fabric type treated with precision.</p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Flexible Pricing</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Options designed to suit your needs.</p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Effortless Convenience</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Your laundry, completed with a single request.</p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Heart className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Premium Products</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Only the finest detergents and cleaning solutions.</p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Express Service</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Delivery in as little as eight hours.</p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-[#1f4f2b]/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1f4f2b]/10 flex items-center justify-center">
                <Check className="w-7 h-7 text-[#1f4f2b]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1f4f2b] text-base sm:text-lg">Real-Time Updates</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Complete transparency throughout the process.</p>
              </div>
            </div>
          </div>
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