'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { serviceAPI } from '@/lib/api';

// Define the Service type
interface Service {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
  category?: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export default function ServicesSlider() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Map service names to their respective images
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
      const response = await serviceAPI.getAllServices();
      if (response.success) {
        setServices(response.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get the URL for a service (prefer slug, fallback to ID)
  const getServiceUrl = (service: Service): string => {
    if (service.slug) {
      return `/services/${service.slug}`;
    }
    // Create a slug from name if no slug exists
    const slugFromName = service.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `/services/${slugFromName}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white relative">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-medium text-primary">
            Dry Cleaning & Laundry, <span className="text-accent">Free Delivery</span>
          </h2>
          <h2 className="text-xl font-medium text-foreground/70 text-center my-3">Our Services</h2>
        </div>
        
        {/* Services Slider */}
        <div className="relative overflow-hidden w-full">
          <div className="absolute top-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] -translate-x-[60px] z-10"></div>
          
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="overflow-hidden relative z-0 pb-16"
          >
            {services.map((service) => (
              <SwiperSlide key={service._id} className="relative cursor-grab">
                <Link href={getServiceUrl(service)} className="block relative h-[400px] md:h-[450px] group">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={service.image || getServiceImage(service.name)}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget;
                        target.src = '/images/services/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="absolute z-10 w-full h-[25%] text-xl pt-2 font-medium bg-primary/80 hover:bg-primary/90 transition-colors text-white bottom-0 text-center rounded-b-lg">
                    {service.name}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute bottom-[-70px] left-0 w-[calc(100vw+120px)] h-[120px] bg-white rounded-[45%] -translate-x-[60px] z-10"></div>
        </div>
      </div>
    </section>
  );
}