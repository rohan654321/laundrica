'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { serviceAPI } from '@/lib/api';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { 
  Star, ChevronRight, Clock, Shield, Truck, 
  Leaf, Award 
} from 'lucide-react';

interface Service {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  fullDescription: string;
  image: string;
  icon: string;
  rating: number;
  turnaround: string;
  category: string;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map service names to their respective images (same as slider)
  const getServiceImage = (serviceName: string): string => {
    const imageMap: { [key: string]: string } = {
      'Laundry Services (Wash & Press)': '/images/laundry.jpg',
      'Dry Cleaning Services': '/images/dryCleaning.jpg',
      'Steam Pressing Service': '/images/steamPressing.jpg',
      'Shoe Cleaning': '/images/shoeCleaning.jpg',
      'Carpet Cleaning': '/images/carpetCleaning.jpg',
      'Curtain Cleaning': '/images/curtainCleaning.jpg',
      'Commercial Laundry': '/images/CommercialLaundry.jpg',
      'Apparel Care': '/images/ApparelCare.jpg',
      'Uniform Services': '/images/Uniform.jpg',
      'Accessories Cleaning': '/images/AccessoriesCleaning.jpg'
    };
    
    return imageMap[serviceName] || '/images/services/placeholder.jpg';
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching services from API...');
      const data = await serviceAPI.getAllServices();
      console.log('API Response:', data);
      
      // Handle different response formats
      if (data && data.success && data.services) {
        setServices(data.services);
      } else if (data && data.data && Array.isArray(data.data)) {
        setServices(data.data);
      } else if (Array.isArray(data)) {
        setServices(data);
      } else {
        console.warn('Unexpected data format:', data);
        setServices([]);
        setError('Received unexpected data format from server');
      }
    } catch (err: any) {
      console.error('Error fetching services:', err);
      
      // User-friendly error messages
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('❌ Cannot connect to backend server. Please make sure the backend is running on port 5000');
      } else if (err.message?.includes('JSON')) {
        setError('❌ Server returned an error page. Please check if backend is running correctly');
      } else {
        setError(err.message || 'Failed to load services');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: <Truck className="w-6 h-6" />, title: "Free Pickup & Delivery", description: "We come to your doorstep" },
    { icon: <Leaf className="w-6 h-6" />, title: "Eco-Friendly", description: "100% biodegradable products" },
    { icon: <Clock className="w-6 h-6" />, title: "24-Hour Turnaround", description: "Quick & efficient service" },
    { icon: <Award className="w-6 h-6" />, title: "Stain Experts", description: "Professional treatment" }
  ];

  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '50K+', label: 'Items Cleaned' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Customer Support' },
  ];

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
            <p className="text-xs text-gray-400 mt-2">Make sure backend is running on port 5000</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => fetchServices()} className="bg-green-600 mr-2">
                Try Again
              </Button>
              <Button 
                onClick={() => window.open('http://localhost:5000/health', '_blank')} 
                variant="outline"
              >
                Test Backend Connection
              </Button>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left text-sm">
              <p className="font-semibold mb-2">Troubleshooting tips:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Make sure backend is running: <code className="bg-gray-200 px-1 rounded">node server.js</code></li>
                <li>Check if MongoDB is connected</li>
                <li>Verify backend is on port 5000</li>
                <li>Check console for more details</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Fixed collapse issue and reduced size */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600"
            alt="Laundry Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
        </div>

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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh, Clean Clothes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                Delivered to Your Door
              </span>
            </h1>
            
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Experience premium laundry care with free pickup and delivery. 
              Eco-friendly products, expert stain removal, and 24-hour turnaround.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#services">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-base px-6 py-5 rounded-xl shadow-lg">
                  Explore Services
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/schedule">
               <Button
  size="lg"
  variant="outline"
  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-green-700 text-base px-6 py-5 rounded-xl"
>
  Schedule Pickup
</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section - Removed top border gap */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-12 bg-white border-t border-gray-100">
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
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
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
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Professional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of premium laundry services tailored to your needs
            </p>
          </motion.div>

          {services.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-500">No services available at the moment.</p>
              <p className="text-xs text-gray-400 mt-2">Try adding some services to your database</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service._id || service.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={service.image || getServiceImage(service.name)}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-xs">{service.rating || 4.8}</span>
                          </div>
                          <div className="bg-green-600 text-white rounded-full px-3 py-1 text-xs font-medium">
                            {service.turnaround || '24 Hours'}
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                          <p className="text-white/90 text-xs line-clamp-2">{service.tagline || 'Professional laundry service'}</p>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {service.fullDescription || 'Professional laundry and dry cleaning services with free pickup and delivery.'}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Truck className="w-3 h-3" />
                            <span>Free pickup</span>
                          </div>
                          
                          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm px-4 py-2">
                            Learn More
                            <ChevronRight className="ml-1 w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}