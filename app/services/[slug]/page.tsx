// app/services/[slug]/page.tsx
'use client';

import { useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { services } from '@/lib/services-data';
import { Star, ChevronRight, Clock, Shield, Truck, Leaf, Award, Sparkles, Users, ThumbsUp } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Service Not Found</h1>
            <Link href="/services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const features = [
    { icon: <Truck className="w-5 h-5" />, label: 'Free Pickup & Delivery' },
    { icon: <Clock className="w-5 h-5" />, label: '24-48 Hours Turnaround' },
    { icon: <Shield className="w-5 h-5" />, label: 'Stain Removal Guarantee' },
    { icon: <Leaf className="w-5 h-5" />, label: 'Eco-Friendly Products' },
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Professional Cleaning',
      description: 'Expert care for all fabric types with premium products'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Experienced Team',
      description: 'Trained professionals with years of experience'
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      title: '100% Satisfaction',
      description: 'We guarantee you\'ll love the results'
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50" ref={containerRef}>
      <Header />

      {/* Hero Section with Parallax */}
      <section className="relative h-[500px] overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-white/70 ml-1">({service.reviews} reviews)</span>
              </div>
              <span className="bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {service.turnaround}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{service.name}</h1>
            <p className="text-xl text-white/90 mb-8">{service.fullDescription}</p>
            
            <div className="flex flex-wrap gap-4">
              <Link href={`/services/${service.slug}/orders`}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg">
                  Order Now
                  <ChevronRight className="ml-2 w-5 h-5" />
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

      {/* Features Strip */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <span className="font-medium text-sm">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800"
                alt="Laundry Service"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional {service.name} Service
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Free pickup and delivery within your area</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Professional stain treatment for all items</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Eco-friendly cleaning products</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Quality checked before return delivery</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the best laundry service in town. Schedule a pickup today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/services/${service.slug}/orders`}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl">
                  Order Now
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl">
                  Schedule Pickup
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Related Services */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Other Services You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.filter(s => s.slug !== slug).slice(0, 4).map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/services/${relatedService.slug}`}>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Image src={relatedService.icon} alt={relatedService.name} width={32} height={32} />
                        <h3 className="font-semibold text-gray-900">{relatedService.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedService.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}