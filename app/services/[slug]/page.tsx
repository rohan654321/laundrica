// app/services/[slug]/page.tsx
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { services } from '@/lib/services-data';
import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button className="bg-secondary-green hover:bg-green-700 text-white">
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{ backgroundImage: "url('/images/redesign/about-banner.png')" }}>
        <div className="text-white text-base sm:text-2xl md:text-3xl space-y-5 font-medium flex flex-col justify-center text-center items-center z-30">
          <p>Professional Laundry <span className="text-[#FFFF00]">Services Designed for Your Lifestyle</span></p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link href="/" className="hover:text-green-400 text-sm sm:text-base transition-colors">Home</Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <Link href="/services" className="hover:text-green-400 text-sm sm:text-base transition-colors">Services</Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">{service.name}</span>
        </nav>
      </div>

      {/* Service Detail */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl text-primary-green font-medium mb-4">{service.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-medium">{service.rating}</span>
                </div>
                <span className="text-gray-500">({service.reviews} reviews)</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{service.turnaround}</span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{service.fullDescription}</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-xl font-semibold text-primary-green mb-4">Service Includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-secondary-green rounded-full"></span>
                  Free pickup and delivery
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-secondary-green rounded-full"></span>
                  Eco-friendly cleaning products
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-secondary-green rounded-full"></span>
                  Professional stain treatment
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-secondary-green rounded-full"></span>
                  Quality checked before return
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link href={`/services/${service.slug}/orders`} className="flex-1">
                <Button className="w-full bg-secondary-green hover:bg-green-700 text-white py-6 text-lg font-medium">
                  Order Now <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" className="w-full border-primary-green text-primary-green hover:bg-primary-green/10 py-6 text-lg font-medium">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Services */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl text-primary-green font-medium text-center mb-8">
            Other <span className="text-secondary-green">Services</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter(s => s.slug !== slug).slice(0, 4).map((relatedService) => (
              <Link key={relatedService.id} href={`/services/${relatedService.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Image src={relatedService.icon} alt={relatedService.name} width={32} height={32} />
                    <h3 className="font-semibold text-primary-green">{relatedService.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedService.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}