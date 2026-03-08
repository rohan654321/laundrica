// app/services/page.tsx
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services-data';
import { Star, ChevronRight } from 'lucide-react';

export default function ServicesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center justify-center px-6" 
        style={{ backgroundImage: "url('/images/redesign/about-banner.png')" }}>
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center z-30">
          <p>Professional Laundry <span className="text-[#FFFF00]">Services Designed for Your Lifestyle</span></p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5 w-full">
        <nav className="flex items-center space-x-2 text-black">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary">Services</span>
        </nav>
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary font-medium text-center">
            Professional <span className="text-accent">Laundry Services</span>
          </h2>
          <p className="text-xl my-3 font-medium text-foreground/70 text-center">Our Services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Link href={`/services/${service.slug}`}>
                <div className="bg-white shadow-md rounded-md border border-primary overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 w-full h-36 sm:w-56 sm:h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover object-center transition-transform duration-500"
                      style={{ transform: hoveredId === service.id ? 'scale(1.1)' : 'scale(1)' }}
                    />
                  </div>
                  <div className="p-4 text-left flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{service.rating}</span>
                        </div>
                        <span className="text-xs text-foreground/50">({service.reviews} reviews)</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-3">{service.fullDescription}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground/50">{service.turnaround}</span>
                      <Button className="bg-accent hover:bg-accent/90 text-white text-sm px-6 py-2 rounded transition-all flex items-center gap-2">
                        Get the Service <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="my-10">
            <h2 className="text-3xl md:text-4xl text-primary font-medium text-center">
              Professional Laundry Services <span className="text-accent">with a Full Range of Features</span>
            </h2>
            <p className="text-xl my-3 font-medium text-foreground/70 text-center">Why you'll love us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <motion.div 
              className="flex gap-4 items-start p-6 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="font-semibold text-lg text-accent mb-3">Eco-Friendly Cleaning</h3>
                <p className="text-foreground/70 text-sm">Our commitment to eco-friendly practices extends beyond our use of 100% toxin-free cleaning techniques. We're proud to be a carbon-neutral business.</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-4 items-start p-6 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h3 className="font-semibold text-lg text-accent mb-3">Wash & Fold</h3>
                <p className="text-foreground/70 text-sm">We offer quality laundry services alongside our dry cleaning and wash & fold service. Our staff use the highest quality products.</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-4 items-start p-6 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h3 className="font-semibold text-lg text-accent mb-3">Bag & Shoe Care</h3>
                <p className="text-foreground/70 text-sm">We offer one-day laundry service, combining excellence with ultimate convenience in laundry delivery.</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-4 items-start p-6 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <h3 className="font-semibold text-lg text-accent mb-3">Free Pickup & Delivery</h3>
                <p className="text-foreground/70 text-sm">Laundry services are the most convenient services you can find. We make cleaning effortless with doorstep service.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}