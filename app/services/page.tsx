'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services-data';
import { Star, ChevronRight, Clock, Shield, Truck, Sparkles, Leaf, Award, Heart } from 'lucide-react';

export default function ServicesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Pickup & Delivery",
      description: "We come to your doorstep at your convenience"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly Cleaning",
      description: "100% toxin-free, eco-conscious cleaning process"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24-Hour Turnaround",
      description: "Quick service without compromising quality"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Stain Removal Experts",
      description: "Professional treatment for tough stains"
    }
  ];

  const whyChooseUs = [
    {
      icon: "🌿",
      title: "Eco-Friendly",
      description: "100% biodegradable cleaning products safe for your family"
    },
    {
      icon: "⚡",
      title: "Express Service",
      description: "24-hour turnaround with same-day options available"
    },
    {
      icon: "🛡️",
      title: "Stain Removal",
      description: "Professional treatment for even the toughest stains"
    },
    {
      icon: "❤️",
      title: "Love & Care",
      description: "Handled with utmost care like our own clothes"
    }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner with Parallax */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="https://indexlaundry.ae/wp-content/uploads/2024/10/clothes-on-hangers-and-washing-machine-at-home-e1619659651363-1568x1047.jpg"
            alt="Laundry Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        </motion.div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Professional Laundry{' '}
              <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              Designed for Your Lifestyle with Care & Precision
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#services">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Explore Services
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-lg">
                  Schedule Pickup
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary font-medium">Services</span>
          </nav>
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-primary-foreground/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="text-primary">Laundry Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our wide range of professional cleaning services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="group bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-border">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm text-foreground">{service.rating}</span>
                        <span className="text-muted-foreground text-xs">({service.reviews})</span>
                      </div>

                      {/* Turnaround Badge */}
                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full px-3 py-1 text-xs font-medium shadow-lg">
                        {service.turnaround}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                        <p className="text-white/90 text-sm line-clamp-2">{service.tagline}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2">{service.fullDescription}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Truck className="w-4 h-4" />
                          <span>Free pickup</span>
                        </div>
                        
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform rounded-lg">
                          View Details
                          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">Freshora</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference with our premium laundry services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all border border-border"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphism CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1920"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glassmorphism p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for Fresh, Clean Clothes?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule a pickup today and let us handle the rest
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-lg shadow-lg">
                  Schedule Pickup
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}