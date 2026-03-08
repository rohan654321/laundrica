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
                src="data:image/jpeg;base64,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"
                alt="Laundry Experience"
                fill
                className="object-cover rounded-2xl"
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