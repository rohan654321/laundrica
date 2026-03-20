// app/services/page.tsx
'use client';

import { useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services-data';
import { 
  Star, ChevronRight, Clock, Shield, Truck, 
  Sparkles, Leaf, Award, ThumbsUp, Users 
} from 'lucide-react';

export default function ServicesPage() {
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "start 0.3"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Pickup & Delivery",
      description: "We come to your doorstep"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly",
      description: "100% biodegradable products"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24-Hour Turnaround",
      description: "Quick & efficient service"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Stain Experts",
      description: "Professional treatment"
    }
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '50K+', label: 'Items Cleaned' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Customer Support' },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[600px] overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600"
            alt="Laundry Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
            >
              Professional Laundry Services
            </motion.span>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Fresh, Clean Clothes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                Delivered to Your Door
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Experience premium laundry care with free pickup and delivery. 
              Eco-friendly products, expert stain removal, and 24-hour turnaround.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#services">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg">
                  Explore Services
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl">
                  Schedule Pickup
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of premium laundry services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-sm">{service.rating}</span>
                        </div>
                        <div className="bg-green-600 text-white rounded-full px-3 py-1 text-xs font-medium">
                          {service.turnaround}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                        <p className="text-white/90 text-sm line-clamp-2">{service.tagline}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{service.fullDescription}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Truck className="w-4 h-4" />
                          <span>Free pickup</span>
                        </div>
                        
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                          Learn More
                          <ChevronRight className="ml-2 w-4 h-4" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for Fresh, Clean Clothes?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of happy customers who trust us with their laundry
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schedule">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg">
                  Schedule Pickup
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl">
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