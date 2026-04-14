"use client"
import Image from "next/image";
import { Check } from "lucide-react";

export default function LaundryServiceSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT IMAGE */}
        <div className="w-full">
          <Image
            src="/images/laundry.jpg" // 👉 replace with your image
            alt="Laundry Service"
            width={600}
            height={500}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            <span className="text-green-600">Personal</span>{" "}
            <span className="text-[#0B3B2F]">Laundry Service</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg font-medium text-gray-700 mb-4">
            Laundry service for your business!
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">
            Your Everyday Laundry, Done Professionally Life in Dubai is busy,
            but laundry should not take away your time. Freshora provides expert
            care for daily clothing, formal wear, and delicate fabrics,
            ensuring they are always clean and ready to wear. Our eco-friendly
            detergents and professional laundry methods keep clothes fresher
            for longer. Families and professionals across the city trust us for
            reliability and quality.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
            
            {[
              "Everyday Laundry and Wash-Fold",
              "Ironing and Finishing",
              "Curtain and Carpet Cleaning",
              "Soft Toy Cleaning",
              "Dry Cleaning for Delicates",
              "Express Laundry Service",
              "Shoe Care",
              "Luxury Fabric Care",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="text-green-600 w-5 h-5" />
                <span className="text-[#0B3B2F] font-medium">{item}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}