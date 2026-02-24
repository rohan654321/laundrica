'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Shirt, Droplet, Wind } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Shirt,
    title: 'Express Wash',
    description: 'Quick turnaround service for everyday clothes. Ready in 24 hours.',
    color: 'from-blue-500 to-cyan-500',
    price: '₹499',
  },
  {
    icon: Sparkles,
    title: 'Premium Care',
    description: 'Delicate handling for your finest garments with luxury detergent.',
    color: 'from-purple-500 to-pink-500',
    price: '₹799',
  },
  {
    icon: Droplet,
    title: 'Deep Clean',
    description: 'Heavy-duty cleaning for work clothes and heavily soiled items.',
    color: 'from-orange-500 to-red-500',
    price: '₹599',
  },
  {
    icon: Wind,
    title: 'Dry Clean',
    description: 'Professional dry cleaning for suits, dresses, and formal wear.',
    color: 'from-green-500 to-teal-500',
    price: '₹899',
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-primary/5 to-accent/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Services
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose the perfect service for your laundry needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glassmorphism rounded-3xl p-8 h-full border border-white/10 hover:border-primary/30 transition-colors">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-6">{service.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{service.price}</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    View <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/services">
            <Button size="lg" className="rounded-full gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
