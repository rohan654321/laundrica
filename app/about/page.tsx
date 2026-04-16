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

      {/* Hero Banner Section - Centered properly */}
      <section>
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-cover bg-center bg-fixed flex items-center justify-center" style={{backgroundImage: "url('/images/curtainCleaning.jpg')"}}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          
          {/* Centered Content */}
          <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              We are professionals in <span className="text-yellow-300">laundry & dry cleaning,</span>
            </h1>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
              Always staying up to date on the <span className="text-yellow-300">latest technologies & cleaning methods.</span>
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto py-12 px-6 bg-background">
          <div className="w-full mx-auto">
            {/* Hero Text and Image Row */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
              <div className="flex-1 w-full text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="text-primary">Laundrica </span>– Redefining the Art of Laundry
                </h1>
                <p className="mb-6 leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg">
                  At Laundrica, laundry is more than a necessity - it is a craft. With over two decades of expertise, we have perfected the balance of advanced technology and meticulous care. From delicate silks to everyday essentials, every garment is handled with precision and respect, making us the preferred choice for the Best Laundry Services in Dubai.
                </p>
                <p className="mb-6 leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg">
                  Our promise is simple: to deliver uncompromising quality, eco-conscious practices, and seamless convenience. With free collection and delivery, we ensure that laundry no longer disrupts your lifestyle - it enhances it.
                </p>
                
                {/* Partner Text - Added here as requested */}
                <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 rounded-r-lg">
                  <p className="text-sm sm:text-base text-foreground/80 italic">
                    "We partner with trusted laundry experts and handle everything from pickup to delivery, ensuring a seamless, high-quality experience for your clothes."
                  </p>
                </div>

                <ul className="space-y-3 mb-6 text-sm sm:text-base">
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span>100% Customer Satisfaction – Every item receives our highest attention to detail</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span>Free Collection and Delivery – Effortless convenience, directly to your door</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span>Affordable Luxury – Exceptional care without compromise</span>
                  </li>
                  <li className="flex items-center gap-2 justify-center lg:justify-start">
                    <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span>Unmatched Quality – Only premium products and processes for lasting results.</span>
                  </li>
                </ul>
                
                <div className="bg-secondary/30 py-3 px-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center border border-primary/20 rounded-lg">
                  <div className="text-center flex flex-col md:flex-row items-center justify-center gap-2">
                    <p className="text-foreground text-sm sm:text-base">Call for Quality Services</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-primary">
                      <a href="tel:+971509259667" className="hover:text-primary/80 transition-colors">+971 50 925 9667</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <Image src="/images/curtainCleaning.jpg" alt="Laundry Experience" width={500} height={600} className="object-cover w-full h-auto" priority />
                </div>
              </div>
            </div>

            {/* Effortless Care Section */}
            <div className="mt-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary font-medium mb-10 text-center">
                Effortless Care, <span className="text-foreground"> Elevated Service</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/contact" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Save Time and Money</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">No unnecessary trips; we come to you!</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/contact" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Pure Care for Every Fabric</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Professional, fabric-safe cleaning that protects colors, texture, and quality.</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="#" className="group bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block sm:col-span-2 lg:col-span-1 border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                      <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg sm:text-xl text-card-foreground mb-2">
                        <span className="group-hover:text-primary transition-colors">Eco-Responsible Cleaning</span>
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Perc-free solutions that respect your wardrobe and the planet.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Without Exception */}
      <section className="bg-background my-20">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary font-medium text-center">
            Excellence<span className="text-foreground"> Without Exception</span>
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-muted-foreground text-center mt-2">Our Guarantee</h3>
        </div>
        <div className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center bg-fixed flex items-center justify-center" style={{backgroundImage: "url('/images/curtainCleaning.jpg')"}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="text-white text-center max-w-4xl mx-auto px-6 z-30 relative">
            <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              Laundrica has been the trusted name in garment care. We are committed to returning every piece in immaculate condition. In the rare instance of loss or damage, we provide reimbursement up to the full value of the item, with a $1,000 maximum per order.
            </p>
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
      <section className="bg-background mb-20 px-4">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary font-medium text-center">
            Why<span className="text-foreground"> Choose Us</span>
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-muted-foreground text-center mt-2">Our Advantages</h3>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Personalized Care</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Every fabric type treated with precision.</p>
              </div>
            </div>
            
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Flexible Pricing</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Options designed to suit your needs.</p>
              </div>
            </div>
            
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Effortless Convenience</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Your laundry, completed with a single request.</p>
              </div>
            </div>
            
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Premium Products</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Only the finest detergents and cleaning solutions.</p>
              </div>
            </div>
            
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Express Service</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Delivery in as little as eight hours.</p>
              </div>
            </div>
            
            <div className="bg-card p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-4 border border-border hover:border-primary/30">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-primary text-base sm:text-lg">Real-Time Updates</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">Complete transparency throughout the process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Tradition of Care */}
      <section className="bg-background mb-20 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/curtainCleaning.jpg" alt="Laundry Tradition" width={500} height={500} className="object-cover w-full h-auto" />
            </div>
          </div>
          <div className="flex-1 w-full text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              <span className="text-primary">A Tradition</span> of Care
            </h2>
            <p className="mb-6 leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg">
              Laundrica was founded on a vision to redefine everyday laundry with exceptional service and craftsmanship. We recognized that modern lifestyles demand more than ordinary solutions. Our approach combines expertise with innovation, ensuring flawless results with every order.
            </p>
            <p className="leading-relaxed text-sm text-muted-foreground sm:text-base lg:text-lg">
              From laundry and dry cleaning to luxury shoe care, upholstery, and curtain cleaning, Laundrica has grown into a symbol of reliability and refinement. We reject compromise — no delays, no shortcuts, only consistent excellence.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}