'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { productAPI } from '@/lib/api';

import {
  Shirt, Home, Crown, Download,
  Heart, Leaf, Zap, Award,
  Phone, MessageCircle, Shield, Truck,
  Gem, ThumbsUp,
  Clock
} from 'lucide-react';

interface ServiceItem {
  _id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  category: string;
  serviceId: string;
  serviceName?: string;
  contactForPricing?: boolean;
}

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | 'children' | 'household'>('men');
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch all service items from backend
  useEffect(() => {
    fetchAllServiceItems();
  }, []);

  const fetchAllServiceItems = async () => {
    try {
      setIsLoading(true);

      // Get all products first
      const productsResponse = await productAPI.getAllProducts();

      if (productsResponse.success && productsResponse.products) {
        let allItems: ServiceItem[] = [];

        // Fetch items for each product
        for (const product of productsResponse.products) {
          // Skip carpet and shoe cleaning as they are contact-based
          if (product.category === 'carpet-cleaning' || product.category === 'shoe-cleaning') {
            continue;
          }

          try {
            const itemsResponse = await productAPI.getServiceItemsForProduct(product._id);
            if (itemsResponse.success && itemsResponse.items) {
              // Add service name to each item
              const itemsWithService = itemsResponse.items.map((item: ServiceItem) => ({
                ...item,
                serviceName: product.name
              }));
              allItems = [...allItems, ...itemsWithService];
            }
          } catch (error) {
            console.log(`No items for product: ${product.name}`);
          }
        }

        setServiceItems(allItems);
        console.log(`Loaded ${allItems.length} service items for pricing`);
      }
    } catch (error) {
      console.error('Error fetching service items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const pdfUrl = '/pricing-menu.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'laundrica-price-list.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get items for current category
  const getCurrentItems = () => {
    const filtered = serviceItems.filter(item => item.category === activeCategory);
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  };

  const currentItems = getCurrentItems();

  return (
    <main className="flex flex-col min-h-screen bg-[#f9faf7]">
      <Header />

      {/* Premium Hero Banner */}
      <section ref={heroRef} className="relative min-h-[450px] flex items-center overflow-hidden pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <span className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-6">Transparent Pricing</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00261b] mb-6 leading-tight">
              Premium Care for <span className="text-emerald-700">Every Fabric</span>
            </h1>
            <p className="text-lg text-[#5c5f5e] mb-8 leading-relaxed max-w-lg">
              Professional laundry, dry cleaning, and garment care. Free pickup & delivery across Dubai.
              Transparent pricing with no hidden fees.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/services">
                <button className="px-8 py-3.5 bg-[#00261b] text-white rounded-xl font-semibold hover:opacity-90 transition">
                  Book Your Service
                </button>
              </Link>
              <button
                onClick={handleDownloadPDF}
                className="px-8 py-3.5 bg-white border border-gray-200 text-[#00261b] rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Price List
              </button>
            </div>
            <div className="space-y-5 pt-5 border-t border-gray-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Free Pickup & Delivery</p>
                <p className="text-sm font-medium text-[#00261b]/70">On all orders — no minimum required</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Express Service Available</p>
                <p className="text-sm font-medium text-[#00261b] flex items-center gap-2 flex-wrap">
                  Same-day delivery for orders placed before 10 AM
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
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/wash&fold.png"
                alt="Laundry Service"
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl max-w-[200px]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-[#00261b]">Quality Guaranteed</p>
                  <p className="text-xs text-gray-500">100% satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Menu Section with Category Tabs */}
      <section className="py-16 bg-[#edeeeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">A La Carte Pricing</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Complete Price List</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
              Transparent pricing for all our services. No hidden charges, just premium care.
            </motion.p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'men', label: 'Men\'s Clothing', icon: Shirt },
              { id: 'women', label: 'Women\'s Clothing', icon: Heart },
              { id: 'children', label: 'Children\'s Clothing', icon: Crown },
              { id: 'household', label: 'Household Items', icon: Home },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-[#00261b] text-white shadow-lg'
                  : 'bg-white text-[#00261b] hover:bg-[#bcedd7] border border-gray-200'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* Pricing Table - Single table per category */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 border-2 border-[#bcedd7] rounded-full"></div>
                <div className="absolute inset-0 border-2 border-t-[#00261b] rounded-full animate-spin"></div>
              </div>
              <p className="text-[#5c5f5e]">Loading price list...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-[#5c5f5e]">No items found for this category.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#00261b]">Item</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#00261b]">Service Type</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#00261b]">Unit</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-[#00261b]">Price (AED)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-[#00261b] font-medium">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.serviceName || 'Standard'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <span className="font-semibold text-emerald-700">AED {item.price}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Premium */}
      <section className="py-16 bg-[#f9faf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-[#bcedd7] text-[#214f3f] rounded-full text-sm mb-4">Our Advantages</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-[#00261b] mb-4">Why Choose Laundrica</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5c5f5e] max-w-2xl mx-auto">
              Experience the difference of premium fabric care
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Personalized Care", desc: "Every fabric type treated with precision and expertise", color: "bg-rose-50", iconColor: "text-rose-600" },
              { icon: Gem, title: "Flexible Pricing", desc: "Options designed to suit every budget and need", color: "bg-emerald-50", iconColor: "text-emerald-600" },
              { icon: Clock, title: "Effortless Convenience", desc: "Your laundry completed with a single request", color: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: Award, title: "Premium Products", desc: "Only the finest detergents and cleaning solutions", color: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Zap, title: "Express Service", desc: "Delivery in as little as eight hours", color: "bg-purple-50", iconColor: "text-purple-600" },
              { icon: ThumbsUp, title: "Real-Time Updates", desc: "Complete transparency throughout the process", color: "bg-cyan-50", iconColor: "text-cyan-600" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="font-bold text-xl text-[#00261b] mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}