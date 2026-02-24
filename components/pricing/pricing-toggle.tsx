'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PricingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export function PricingToggle({ billingCycle, setBillingCycle }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="glassmorphism rounded-full p-1.5 inline-flex gap-2">
        <motion.button
          onClick={() => setBillingCycle('monthly')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            billingCycle === 'monthly'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:text-primary'
          }`}
        >
          Monthly
        </motion.button>
        <motion.button
          onClick={() => setBillingCycle('yearly')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            billingCycle === 'yearly'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:text-primary'
          }`}
        >
          Yearly
        </motion.button>
      </div>

      {billingCycle === 'yearly' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-accent/10 border border-accent/30 rounded-full px-4 py-2 inline-block"
        >
          <p className="text-sm font-semibold text-accent">Save 20% with annual billing</p>
        </motion.div>
      )}
    </div>
  );
}
