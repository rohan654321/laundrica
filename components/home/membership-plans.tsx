'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    period: '/month',
    description: 'Perfect for light laundry needs',
    features: ['4 washes per month', 'Express delivery', 'Basic care', '10% discount on services', 'Customer support'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹2,499',
    period: '/month',
    description: 'For regular laundry requirements',
    features: ['12 washes per month', 'Express delivery', 'Premium care', '25% discount on services', 'Priority support', 'Free dry clean (2x/month)'],
    popular: true,
  },
  {
    name: 'Elite',
    price: '₹4,999',
    period: '/month',
    description: 'Unlimited laundry solutions',
    features: ['Unlimited washes', 'Same-day delivery', 'Premium care', '40% discount on services', 'VIP support', 'Unlimited dry clean', 'Personal laundry assistant'],
    popular: false,
  },
];

export function MembershipPlans() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Choose Your Plan
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Flexible membership plans designed for every lifestyle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'md:scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`glassmorphism rounded-3xl p-8 h-full ${plan.popular ? 'ring-2 ring-primary/50' : ''}`}>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-foreground/70 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-foreground/70">{plan.period}</span>
                  </div>
                </div>

                <Button className="w-full rounded-full mb-8" variant={plan.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
