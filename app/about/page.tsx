// app/about/page.tsx
'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Heart,
  Zap,
  Award,
  Clock,
  Leaf,
  Check,
  Shield,
  Truck,
  Sparkles,
  Gem,
  Phone,
  Star,
  Droplets,
  WashingMachine,
  Shirt,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  ThumbsUp
} from 'lucide-react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#f9faf7]">
      <Header />

      {/* Premium Hero Banner - Clean minimal design like home page */}
      <section ref={heroRef} className="relative min-h-[500px] flex items-center overflow-hidden pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Our Story</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">
              Redefining the <span className="text-emerald-700">Art of Laundry</span>
            </h1>
            <p className="text-lg text-[#5c5f5e] mb-8 leading-relaxed">
              With over two decades of expertise, we've perfected the balance of advanced technology and meticulous care.
              From delicate silks to everyday essentials, every garment is handled with precision and respect.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/services">
                <button className="px-8 py-3.5 bg-[#00261b] text-white rounded-xl font-semibold hover:opacity-90 transition">
                  Book Your Service
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-3.5 bg-white border border-gray-200 text-[#00261b] rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <div className="space-y-5 pt-5 border-t border-gray-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Our Promise</p>
                <p className="text-sm font-medium text-[#00261b]/70">Uncompromising Quality • Eco-Conscious Practices • Seamless Convenience</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Free Collection & Delivery</p>
                <p className="text-sm font-medium text-[#00261b] flex items-center gap-2 flex-wrap">
                  We come to you — laundry no longer disrupts your lifestyle, it enhances it.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#bcedd7]/30 to-[#00261b]/10">
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-[#bcedd7] rounded-full flex items-center justify-center mb-6">
                    <Image
                      src="/images/dryCleaning.jpg" // 👈 your actual image
                      alt="Laundry Service"
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#00261b]">20+ Years</h3>
                  <p className="text-[#5c5f5e]">Of Excellence in Fabric Care</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl max-w-[200px]">
              <p className="text-2xl font-semibold text-[#00261b] mb-1">24h</p>
              <p className="text-xs text-[#5c5f5e]">Express service available for urgent needs.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Quote Card - Elegant */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border-l-8 border-[#00261b]">
            <p className="text-gray-600 text-lg md:text-xl italic leading-relaxed">
              "We partner with trusted laundry experts and handle everything from pickup to delivery, ensuring a seamless,
              high-quality experience for your clothes."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-10 h-10 bg-[#bcedd7] rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-[#00261b]" />
              </div>
              <div>
                <p className="font-semibold text-[#00261b]">Laundrica Team</p>
                <p className="text-xs text-gray-400">Since 2004</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section - Premium Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Why Choose Us</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Our Core Values</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">What makes Laundrica the trusted name in fabric care across Dubai</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Pure Care", desc: "Fabric-safe cleaning that protects colors, texture, and quality", color: "bg-rose-100", iconColor: "text-rose-600" },
              { icon: Leaf, title: "Eco-Responsible", desc: "Perc-free solutions that respect your wardrobe and the planet", color: "bg-emerald-100", iconColor: "text-emerald-600" },
              { icon: Clock, title: "Time Saving", desc: "No unnecessary trips — we come to you with free pickup & delivery", color: "bg-blue-100", iconColor: "text-blue-600" },
              { icon: Gem, title: "Affordable Luxury", desc: "Exceptional care without compromise, priced for everyone", color: "bg-amber-100", iconColor: "text-amber-600" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#f9faf7] rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-[#00261b] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages - Grid with icons */}
      <section className="py-16 bg-[#edeeeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Our Advantages</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Excellence Without Exception</h2>
            <p className="text-[#5c5f5e] max-w-2xl mx-auto">Every garment receives our highest attention to detail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "100% Customer Satisfaction", desc: "Every item receives our highest attention to detail" },
              { icon: Truck, title: "Free Collection & Delivery", desc: "Effortless convenience, directly to your door" },
              { icon: Gem, title: "Affordable Luxury", desc: "Exceptional care without compromise" },
              { icon: Sparkles, title: "Unmatched Quality", desc: "Only premium products and processes for lasting results" },
              { icon: Zap, title: "Express Service", desc: "Delivery in as little as eight hours" },
              { icon: TrendingUp, title: "Real-Time Updates", desc: "Complete transparency throughout the process" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-[#bcedd7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#00261b]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#00261b] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section - Premium */}
      <section className="py-20 bg-[#00261b] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Shield className="w-16 h-16 text-[#bcedd7] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Guarantee to You</h2>
            <p className="text-[#79a894] text-lg mb-8 leading-relaxed">
              Laundrica has been the trusted name in garment care. We are committed to returning every piece in immaculate condition.
              In the rare instance of loss or damage, we provide reimbursement up to the full value of the item.
            </p>
            <Link href="/services">
              <button className="px-8 py-3.5 bg-white text-[#00261b] rounded-xl font-semibold hover:bg-[#bcedd7] transition-colors inline-flex items-center gap-2">
                Get Service Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* A Tradition of Care */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Our Legacy</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-6 leading-tight">
                A Tradition <span className="text-emerald-700">of Care</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Laundrica was founded on a vision to redefine everyday laundry with exceptional service and craftsmanship.
                We recognized that modern lifestyles demand more than ordinary solutions.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                From laundry and dry cleaning to luxury shoe care, upholstery, and curtain cleaning, Laundrica has grown into
                a symbol of reliability and refinement. We reject compromise — no delays, no shortcuts, only consistent excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <button className="px-6 py-3 bg-[#00261b] text-white rounded-xl font-semibold hover:opacity-90 transition">
                    Explore Our Services
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-6 py-3 border border-gray-300 text-[#00261b] rounded-xl font-semibold hover:bg-gray-50 transition">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex-1"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#bcedd7]/20 to-[#00261b]/5 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#bcedd7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/images/laundry.jpg"
                      alt="Laundry"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <p className="text-3xl font-bold text-[#00261b]">10,000+</p>
                  <p className="text-gray-500">Happy Customers</p>
                  <div className="mt-6 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-400">Call for Quality Service</p>
                    <a href="tel:+971509259667" className="text-sm font-bold text-[#00261b] hover:text-emerald-700">+971 50 925 9667</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Matching home page */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#00261b] rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#bcedd7] rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6">Ready for Effortless Care?</h2>
              <p className="text-[#79a894] text-lg mb-10 max-w-xl mx-auto">
                Experience the invisible luxury of professional fabric care. Fast, reliable, and just a click away.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/services">
                  <button className="px-8 py-3.5 bg-white text-[#00261b] rounded-xl font-semibold hover:bg-[#bcedd7] transition-colors">
                    Book Your Service
                  </button>
                </Link>
                <a href="https://wa.me/971509259667" target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-3.5 border border-white/30 bg-white/5 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                    {/* <span className="material-symbols-outlined">chat</span> */}
                    <FaWhatsapp className="w-5 h-5 text-green-500" />
                    WhatsApp Booking
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}