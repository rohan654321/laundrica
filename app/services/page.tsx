'use client';

import { useState, useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/lib/services-data';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', 'Washing', 'Cleaning', 'Pressing', 'Special', 'Quick', 'Bulk'];

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section with Parallax */}
      <motion.section
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden flex items-center justify-center"
      >
        {/* Parallax background shapes */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
          style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl"
          style={{ y: useTransform(scrollY, [0, 500], [0, -150]) }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              <span className="text-emerald-600">Professional</span> Laundry Services
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our Services
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'all' ? 'all' : cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  (cat === 'all' && selectedCategory === 'all') || selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-foreground border-2 border-emerald-200 hover:border-emerald-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid with Parallax Cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-500 transition-all"
      style={{ y }}
      whileHover={{ boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
    >
      {/* Image container with parallax */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{service.name}</h3>
        <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{service.shortDescription}</p>

        {/* Features list */}
        <div className="mb-6 space-y-2">
          {service.features.slice(0, 3).map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-sm text-foreground/60"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-emerald-500">✓</span>
              {feature}
            </motion.div>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
          <div>
            <span className="text-2xl font-bold text-emerald-600">${service.price}</span>
            <p className="text-xs text-foreground/50">{service.turnaround}</p>
          </div>
          <Link href={`/services/${service.id}`}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                Get the Service
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
