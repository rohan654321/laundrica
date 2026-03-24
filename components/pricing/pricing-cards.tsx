// components/pricing/pricing-cards.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star, Shirt, Truck, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

interface PricingCardsProps {
  billingCycle: 'monthly' | 'yearly';
}

const pricingTiers = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Star,
    description: 'Perfect for occasional laundry needs',
    monthlyPrice: 99,
    yearlyPrice: 1188,
    features: [
      'Up to 5 kg per order',
      'Weekly pickup and delivery',
      'Standard wash & fold',
      'Email support',
      'Free stain removal',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    description: 'Our most popular choice',
    monthlyPrice: 299,
    yearlyPrice: 3588,
    features: [
      'Unlimited orders',
      'Twice weekly pickup & delivery',
      'Express service (24h)',
      'Dry cleaning included',
      'Free stain removal',
      'Priority support',
      'Fabric conditioning',
      'SMS notifications',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    icon: Zap,
    description: 'For ultimate laundry care',
    monthlyPrice: 599,
    yearlyPrice: 7188,
    features: [
      'Everything in Premium',
      'Daily pickup & delivery',
      'Same-day express service',
      'Premium ironing service',
      'Wardrobe management',
      '24/7 priority support',
      'Dedicated account manager',
      'Whitening & special treatments',
      'Free alterations',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export function PricingCards({ billingCycle }: PricingCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {pricingTiers.map((tier) => {
        const Icon = tier.icon;
        const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
        const savings = billingCycle === 'yearly' ? Math.round((tier.monthlyPrice * 12 - tier.yearlyPrice) / 12) : 0;

        return (
          <motion.div
            key={tier.id}
            variants={cardVariants}
            whileHover={hoverVariants}
            className={`relative group rounded-3xl overflow-hidden transition-all duration-300 ${
              tier.featured ? 'md:scale-105' : ''
            }`}
          >
            {/* Featured badge */}
            {tier.featured && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <div className="bg-gradient-to-r from-[#1f4f2b] to-[#2a6e3a] text-white px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                  Most Popular
                </div>
              </motion.div>
            )}

            {/* Card background */}
            <div className={`absolute inset-0 bg-white border ${tier.featured ? 'border-[#1f4f2b] shadow-xl' : 'border-gray-200'} rounded-3xl`} />

            {/* Gradient overlay for featured card */}
            {tier.featured && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1f4f2b]/5 to-[#2a6e3a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              />
            )}

            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Icon and title */}
              <div className="mb-6">
                <motion.div
                  className={`inline-block p-3 rounded-2xl mb-4 ${
                    tier.featured ? 'bg-[#1f4f2b]/10' : 'bg-gray-100'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`w-6 h-6 ${tier.featured ? 'text-[#1f4f2b]' : 'text-gray-600'}`} />
                </motion.div>
                <h3 className={`text-2xl font-bold mb-2 ${tier.featured ? 'text-[#1f4f2b]' : 'text-gray-800'}`}>
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-500">{tier.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-5xl font-bold ${tier.featured ? 'text-[#1f4f2b]' : 'text-gray-800'}`}>
                    AED {price}
                  </span>
                  <span className="text-gray-500 text-lg">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                {billingCycle === 'yearly' && savings > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[#1f4f2b] font-medium"
                  >
                    Save AED {savings}/month
                  </motion.p>
                )}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mb-8"
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className={`w-full rounded-xl font-semibold ${
                      tier.featured
                        ? 'bg-[#1f4f2b] text-white hover:bg-[#2a6e3a]'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>

              {/* Features list */}
              <div className="space-y-4 border-t border-gray-100 pt-8">
                {tier.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <Check className="w-5 h-5 text-[#1f4f2b]" />
                    </motion.div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}