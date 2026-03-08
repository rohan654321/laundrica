'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 512 512">
    <path d="M496 203.3H312.36L256 32l-56.36 171.3H16l150.21 105.4-58.5 171.3L256 373.84 404.29 480l-58.61-171.3z" />
  </svg>
);

const HalfStarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 512 512">
    <path d="M480 207H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" />
  </svg>
);

const testimonials = [
  {
    name: 'Kevin K.',
    email: 'kevin@gmail.com',
    title: 'Professional, Reliable & Cost Effective',
    text: 'This was my first time coming to a Laundromat ever. I was greeted by a woman with a warm smile... She was so helpful and friendly.',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Alice Munguia',
    email: 'alice@gmail.com',
    title: 'Very Pleased. Will Definitely be Back.',
    text: 'the customer service is always great, and I\'ve never had a quality concern.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108777-466d3eb3b5fd?w=100&h=100&fit=crop',
  },
  {
    name: 'Lena Broughton',
    email: 'lena@gmail.com',
    title: 'Excellent and Superb Customer Service',
    text: 'The prices are pretty reasonable, and they have big washers so I can get a lot done at once.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Beverly Garmon',
    email: 'beverly@gmail.com',
    title: 'The Quality of Work Was Excellent!',
    text: 'I was skeptical about leaving my clothes... and let me tell you I was beyond amazed by the quality.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  },
];

export function Testimonials() {
  return (
    <section className="py-10 w-full">
      <div className="w-full flex justify-center bg-white py-5">
        <h2 className="text-primary text-3xl font-medium">Testimonials</h2>
      </div>
      <div 
        className="w-full bg-cover bg-center bg-fixed px-12 py-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1920&q=80')" }}
      >
        <div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="content-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="w-full relative space-y-2 h-auto max-w-[600px] rounded bg-white border-2 border-primary py-10 px-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex gap-2 justify-items">
                    <div className="relative w-14 h-14 rounded-full border overflow-hidden border-primary">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h2 className="text-base font-medium text-foreground">{testimonial.name}</h2>
                      <p className="text-foreground/70 text-sm font-normal">{testimonial.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-foreground/80 text-sm sm:text-xl font-medium">{testimonial.title}</h4>
                    <p className="text-foreground/70 text-xs sm:text-base font-normal line-clamp-2">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex gap-1 absolute top-5 right-5">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                    {testimonial.rating % 1 !== 0 && <HalfStarIcon />}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}