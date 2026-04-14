'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CheckIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z" />
  </svg>
);

export function WhyChooseUs() {
  return (
    <section className="relative bg-white px-6 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
            <div className="relative aspect-square">
              <Image
                src="/images/dryCleaning.jpg"
                alt="Laundry Experience"
                fill
                className="object-cover rounded-sm"
              />
            </div>
          </div>
          <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 leading-tight">
              <span className="text-primary">Why Choose Laundrica </span>
              <span className="text-accent">for Laundry Service in Dubai</span>
            </h2>
            <p className="mb-5 sm:mb-8 leading-relaxed text-sm text-foreground/70 sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
              At Laundrica, laundry is more than a service - it is a craft. Our team is committed to your peace of mind and emboldened by years of stain removal expertise to ensure the promise is delivered promptly and without hassle. Every garment is treated with great care, following strict standards to protect your clothes, your skin, and our planet.
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-foreground/80 text-sm sm:text-base grid grid-cols-2">
              <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-primary font-medium">
                <CheckIcon />
                <span>100% Customer Satisfaction</span>
              </li>
              <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-primary font-medium">
                <CheckIcon />
                <span>Free Collection & Delivery</span>
              </li>
              <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-primary font-medium">
                <CheckIcon />
                <span>Transparent, Affordable Pricing</span>
              </li>
              <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-primary font-medium">
                <CheckIcon />
                <span>Best Quality</span>
              </li>
            </ul>
            <div className="w-full bg-primary/10 py-2.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center border border-primary rounded-lg">
              <div className="text-center flex flex-col md:flex-row items-center justify-center gap-2">
                <p className="text-foreground text-sm sm:text-base">Call for Quality Services</p>
                <p className="text-base sm:text-lg lg:text-3xl font-bold text-primary">
                  <Link href="tel:+971509259667" className="hover:text-primary/80 transition-colors">
                    +971 50 925 9667
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-28">
          <Link href="/services" className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-md border border-primary/20 hover:shadow-lg transition relative flex flex-col items-center justify-center group">
            <h3 className="font-semibold text-primary mb-4 mt-6 text-md sm:text-lg">Save Time & Money</h3>
            <p className="text-foreground/70 text-sm sm:text-base">Skip the traffic and waiting. We collect, clean, and return your clothes with no extra cost.</p>
            <div className="absolute -top-[25%] left-[50%] -translate-x-1/2 w-24 h-24 rounded-full border shadow-md border-primary/20 bg-white hidden sm:flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </Link>
          <Link href="/services" className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-md border border-primary/20 hover:shadow-lg transition relative flex flex-col items-center justify-center group">
            <h3 className="font-semibold text-primary mb-4 mt-6 text-md sm:text-lg">Transparent Pricing</h3>
            <p className="text-foreground/70 text-sm sm:text-base">Clear prices upfront, No hidden charges. On-time delivery you can count on, every time.</p>
            <div className="absolute -top-[25%] left-[50%] -translate-x-1/2 w-24 h-24 rounded-full border shadow-md border-primary/20 bg-white hidden sm:flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </Link>
          <Link href="/services" className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-md border border-primary/20 hover:shadow-lg transition relative flex flex-col items-center justify-center group">
            <h3 className="font-semibold text-primary mb-4 mt-6 text-md sm:text-lg">Eco-Friendly Care</h3>
            <p className="text-foreground/70 text-sm sm:text-base">We use gentle, non-toxic solutions that care for fabrics, skin, and the environment.</p>
            <div className="absolute -top-[25%] left-[50%] -translate-x-1/2 w-24 h-24 rounded-full border shadow-md border-primary/20 bg-white hidden sm:flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}