'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { PricingToggle } from '@/components/pricing/pricing-toggle';
import { FeatureComparison } from '@/components/pricing/feature-comparison';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-10 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 mb-6 glassmorphism rounded-full">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Simple, Transparent Pricing</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Choose Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Laundry Plan
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto"
            >
              All plans include free pickup and delivery, professional care, and 24-hour turnaround. No hidden fees, cancel anytime.
            </motion.p>

            <motion.div variants={itemVariants}>
              <PricingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <PricingCards billingCycle={billingCycle} />
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Feature Comparison
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/70"
            >
              Compare all features across our pricing tiers
            </motion.p>
          </div>
          <FeatureComparison />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
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
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.q}</h3>
                <p className="text-foreground/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
