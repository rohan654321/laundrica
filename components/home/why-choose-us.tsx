'use client';

import { motion } from 'framer-motion';
import { Badge, Leaf, Clock, Zap, Shield, Users } from 'lucide-react';

const reasons = [
  {
    icon: Badge,
    title: 'Expert Care',
    description: 'Our professionals are trained in handling all fabric types with utmost care.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We use sustainable practices and biodegradable detergents for your peace of mind.',
  },
  {
    icon: Clock,
    title: '24-Hour Delivery',
    description: 'Fast turnaround time without compromising on quality of service.',
  },
  {
    icon: Zap,
    title: 'Easy Booking',
    description: 'Simple app interface makes scheduling pickups and deliveries effortless.',
  },
  {
    icon: Shield,
    title: 'Guaranteed Safety',
    description: 'Your clothes are fully insured and tracked throughout the process.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: '24/7 support team ready to assist with any concerns or special requests.',
  },
];

export function WhyChooseUs() {
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
            Why Choose Laundrica?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We go beyond basic laundry services to provide an exceptional experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glassmorphism rounded-3xl p-8 text-center group-hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-foreground/70">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
