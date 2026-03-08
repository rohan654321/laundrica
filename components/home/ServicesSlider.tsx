'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const services = [
  {
    name: 'Laundry',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=500&h=400&fit=crop',
    href: '/services/laundry',
  },
  {
    name: 'Dry Cleaning',
    image: 'https://images.unsplash.com/photo-1604335399105-b0fc5857d7a3?w=500&h=400&fit=crop',
    href: '/services/dry-cleaning',
  },
  {
    name: 'Express Laundry',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=400&fit=crop',
    href: '/services/express-laundry',
  },
  {
    name: 'Shoe Cleaning',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=400&fit=crop',
    href: '/services/shoe-cleaning',
  },
  {
    name: 'Luxury Shoe Cleaning',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&h=400&fit=crop',
    href: '/services/luxury-shoe-cleaning',
  },
  {
    name: 'Commercial Laundry',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=400&fit=crop',
    href: '/services/commercial-laundry',
  },
  {
    name: 'Carpet Cleaning',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=400&fit=crop',
    href: '/services/carpet-cleaning',
  },
  {
    name: 'Curtain Cleaning',
    image: 'https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?w=500&h=400&fit=crop',
    href: '/services/curtain-cleaning',
  },
  {
    name: 'Soft Toy Cleaning',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&h=400&fit=crop',
    href: '/services/soft-toy-cleaning',
  },
  {
    name: 'Steam Pressing',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&h=400&fit=crop',
    href: '/services/steam-pressing',
  },
];

export default function ServicesSlider() {
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
            {services.map((service, index) => (
              <SwiperSlide key={index} className="relative cursor-grab">
                <Link href={service.href}>
                  <div className="relative h-[400px] md:h-[450px]">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute z-50 w-full h-[25%] text-xl pt-2 font-medium bg-primary/70 text-primary-foreground bottom-0 text-center">
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