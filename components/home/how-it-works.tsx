'use client';

import { motion } from 'framer-motion';
import { Phone, Droplet, Truck, Star } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: 'Book Service',
    description: 'Schedule your laundry pickup at your convenience through our app or website',
    number: '01',
  },
  {
    icon: Droplet,
    title: 'Professional Wash',
    description: 'Our experts care for your clothes with premium detergents and techniques',
    number: '02',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Receive your perfectly pressed clothes delivered within 24 hours',
    number: '03',
  },
  {
    icon: Star,
    title: 'Enjoy',
    description: 'More time for what matters while we handle your laundry',
    number: '04',
  },
];

export function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Simple, convenient, and reliable. Get your laundry done in four easy steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent/30" />
              )}

              <div className="glassmorphism rounded-3xl p-8 text-center h-full">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
