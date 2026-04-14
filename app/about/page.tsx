"use client"

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Zap, Award, Clock, Leaf, Check } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner Section */}
      <section>
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6" style={{backgroundImage: "url('/images/carpetCleaning.jpg')"}}>
          {/* Forest Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center flex flex-col justify-center items-center z-30 relative">
            <p>We are professionals in <span className="text-yellow-300">laundry &amp; dry cleaning,</span></p>
            <p>Always staying up to date on the <span className="text-yellow-300">latest technologies &amp; cleaning methods.</span></p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto py-4 px-6 bg-background">
          <div className="w-full mx-auto">
            {/* Hero Text and Image Row */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
              <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6 leading-tight">
                  <span className="text-primary">Laundrica </span>– Redefining the Art of Laundry
                </h1>
                <p className="mb-5 sm:mb-8 leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
                  At Laundrica, laundry is more than a necessity - it is a craft. With over two decades of expertise, we have perfected the balance of advanced technology and meticulous care. From delicate silks to everyday essentials, every garment is handled with precision and respect, making us the preferred choice for the Best Laundry Services in Dubai. <br/><br/>
                  Our promise is simple: to deliver uncompromising quality, eco-conscious practices, and seamless convenience. With free collection and delivery, we ensure that laundry no longer disrupts your lifestyle - it enhances it.
                </p>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base grid grid-cols-1">
                  <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl font-medium">
                    <Check className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
                    <span>100% Customer Satisfaction – Every item receives our highest attention to detail</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl font-medium">
                    <Check className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
                    <span>Free Collection and Delivery – Effortless convenience, directly to your door</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl font-medium">
                    <Check className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
                    <span>Affordable Luxury – Exceptional care without compromise</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl font-medium">
                    <Check className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
                    <span>Unmatched Quality – Only premium products and processes for lasting results.</span>
                  </li>
                </ul>
                <div className="w-full bg-secondary/30 py-2.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center border border-primary/20 rounded-lg">
                  <div className="text-center flex flex-col md:flex-row items-center justify-center gap-2">
                    <p className="text-foreground text-sm sm:text-base">Call for Quality Services</p>
                    <p className="text-base sm:text-lg lg:text-3xl font-bold text-primary">
                      <a href="tel:+971509259667" className="hover:text-primary/80 transition-colors">+971 50 925 9667</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
                <div className="relative rounded-sm overflow-hidden shadow-xl">
                  <Image src="/images/curtainCleaning.jpg" alt="Laundry Experience" width={500} height={800} className="object-cover" priority />
                </div>
              </div>
            </div>

            {/* Effortless Care Section */}
            <div className="mt-30">
              <h2 className="text-3xl md:text-4xl text-primary font-medium my-10 text-center">
                Effortless Care, <span className="text-foreground"> Elevated Service</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16">
                <Link href="/contact" className="group bg-card rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Save Time and Money</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">No unnecessary trips; <br /> we come to you!</p>
                    </div>
                  </div>
                </Link>
                <Link href="/contact" className="group bg-card rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Pure Care for Every Fabric</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Professional, fabric-safe cleaning that protects colors, texture, and quality.</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="group bg-card rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block sm:col-span-2 lg:col-span-1 border border-border">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Eco-Responsible Cleaning</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Perc-free solutions that respect your wardrobe and the planet.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Without Exception */}
      <section className="bg-background my-30">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary font-medium text-center">
            Excellence<span className="text-foreground"> Without Exception</span>
          </h2>
          <h3 className="text-xl font-medium text-muted-foreground text-center">Our Guarantee</h3>
        </div>
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center" style={{backgroundImage: "url('/images/curtainCleaning.jpg')"}}>
          {/* Forest Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="text-white text-sm sm:text-base md:text-xl flex flex-col max-w-5xl text-center space-y-5 justify-center items-center z-30 relative px-4">
            <p>Laundrica has been the trusted name in garment care. We are committed to returning every piece in immaculate condition. In the rare instance of loss or damage, we provide reimbursement up to the full value of the item, with a 1,000 maximum per order.</p>
            <Link href="/best-laundry-services-in-dubai">
              <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                Get Service Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background mt-30 mb-0 px-4">
        <div className="my-10">
          <h2 className="text-3xl md:text-4xl text-primary font-medium text-center">
            Why<span className="text-foreground"> Choose Us</span>
          </h2>
          <h3 className="text-xl font-medium text-muted-foreground text-center">Our Advantages</h3>
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden group-hover:bg-primary transition-colors">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Personalized Care</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Every fabric type treated with precision.</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Flexible Pricing</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Options designed to suit your needs.</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Effortless Convenience</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Your laundry, completed with a single request.</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Premium Products</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Only the finest detergents and cleaning solutions.</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Express Service</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Delivery in as little as eight hours.</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-border hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 p-3 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Real-Time Updates</h3>
                <p className="text-muted-foreground text-sm sm:text-base my-2">Complete transparency throughout the process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Tradition of Care */}
      <section className="bg-background my-20 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 px-6">
          <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/curtainCleaning.jpg" alt="Laundry Tradition" width={500} height={500} className="object-cover" />
            </div>
          </div>
          <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-6 leading-tight">
              <span className="text-primary">A Tradition</span> of Care
            </h2>
            <p className="mb-5 sm:mb-8 leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
              Laundrica was founded on a vision to redefine everyday laundry with exceptional service and craftsmanship. We recognized that modern lifestyles demand more than ordinary solutions. Our approach combines expertise with innovation, ensuring flawless results with every order. <br/><br/>
              From laundry and dry cleaning to luxury shoe care, upholstery, and curtain cleaning, Laundrica has grown into a symbol of reliability and refinement. We reject compromise no delays, no shortcuts, only consistent excellence
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}