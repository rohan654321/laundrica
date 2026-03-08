'use client';

import { useState, useRef, use } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Check, Clock, AlertCircle } from 'lucide-react';
import { services, getServiceById } from '@/lib/services-data';
import { useCart } from '@/context/cart-context';

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // const { id } = use(params);
  // const service = getServiceById(id);
  // const { addToCart } = useCart();
  // const [quantity, setQuantity] = useState(1);
  // const containerRef = useRef(null);
  // const { scrollY } = useScroll();

  // if (!service) {
  //   return (
  //     <main className="flex flex-col min-h-screen">
  //       <Header />
  //       <div className="flex-1 flex items-center justify-center">
  //         <div className="text-center">
  //           <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
  //           <Link href="/services">
  //             <Button>Back to Services</Button>
  //           </Link>
  //         </div>
  //       </div>
  //       <Footer />
  //     </main>
  //   );
  // }

  // const handleAddToCart = () => {
  //   addToCart({
  //       id: service.id,
  //       name: service.name,
  //       price: service.price,
  //       quantity,
  //       image: service.image,
  //       category: 'service'
  //   });
  // };

  // // Parallax effect for background image
  // const y = useTransform(scrollY, [0, 500], [0, 150]);

  // return (
  //   <main className="flex flex-col min-h-screen">
  //     <Header />

  //     {/* Hero Section with Parallax Background */}
  //     <motion.section
  //       ref={containerRef}
  //       className="relative min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 overflow-hidden flex items-center justify-center"
  //     >
  //       {/* Parallax animated blobs */}
  //       <motion.div
  //         className="absolute top-20 -left-40 w-96 h-96 bg-emerald-600/50 rounded-full blur-3xl"
  //         style={{ y: useTransform(scrollY, [0, 800], [0, 200]) }}
  //       />
  //       <motion.div
  //         className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
  //         style={{ y: useTransform(scrollY, [0, 800], [0, -200]) }}
  //       />

  //       <div className="relative z-10 container mx-auto px-4">
  //         <motion.div
  //           initial={{ opacity: 0, y: -30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="max-w-5xl mx-auto"
  //         >
  //           {/* Back button */}
  //           <Link href="/services">
  //             <motion.button
  //               className="flex items-center gap-2 text-white hover:text-emerald-300 transition-colors mb-8"
  //               whileHover={{ x: -5 }}
  //             >
  //               <ChevronLeft className="w-5 h-5" />
  //               Back to Services
  //             </motion.button>
  //           </Link>

  //           <div className="grid md:grid-cols-2 gap-12 items-center">
  //             {/* Service Image */}
  //             <motion.div
  //               className="relative rounded-2xl overflow-hidden shadow-2xl"
  //               initial={{ opacity: 0, x: -40 }}
  //               animate={{ opacity: 1, x: 0 }}
  //               transition={{ duration: 0.8 }}
  //             >
  //               <motion.img
  //                 src={service.image}
  //                 alt={service.name}
  //                 className="w-full h-96 object-cover"
  //                 style={{ y }}
  //               />
  //               <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
  //             </motion.div>

  //             {/* Service Details */}
  //             <motion.div
  //               className="text-white"
  //               initial={{ opacity: 0, x: 40 }}
  //               animate={{ opacity: 1, x: 0 }}
  //               transition={{ duration: 0.8, delay: 0.2 }}
  //             >
  //               {/* Badge */}
  //               <motion.div
  //                 className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4"
  //                 whileHover={{ scale: 1.05 }}
  //               >
  //                 <span className="text-sm font-medium">{service.category} Service</span>
  //               </motion.div>

  //               {/* Title */}
  //               <h1 className="text-5xl md:text-6xl font-bold mb-6">{service.name}</h1>

  //               {/* Full Description */}
  //               <p className="text-lg text-white/80 mb-8 leading-relaxed">
  //                 {service.fullDescription}
  //               </p>

  //               {/* Key Info */}
  //               <div className="grid grid-cols-2 gap-4 mb-8">
  //                 <motion.div
  //                   className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
  //                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
  //                 >
  //                   <Clock className="w-5 h-5 mb-2 text-emerald-300" />
  //                   <p className="text-xs text-white/70 mb-1">Turnaround Time</p>
  //                   <p className="font-semibold">{service.turnaround}</p>
  //                 </motion.div>
  //                 <motion.div
  //                   className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
  //                   whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
  //                 >
  //                   <AlertCircle className="w-5 h-5 mb-2 text-emerald-300" />
  //                   <p className="text-xs text-white/70 mb-1">Starting Price</p>
  //                   <p className="font-semibold">${service.price}</p>
  //                 </motion.div>
  //               </div>

  //               {/* CTA Buttons */}
  //               <div className="flex flex-col sm:flex-row gap-4">
  //                 <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  //                   <Button
  //                     onClick={handleAddToCart}
  //                     className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold py-6 rounded-full text-base"
  //                   >
  //                     Schedule Now
  //                   </Button>
  //                 </motion.div>
  //                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  //                   <Button
  //                     variant="outline"
  //                     className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-full text-base"
  //                   >
  //                     Get Quote
  //                   </Button>
  //                 </motion.div>
  //               </div>
  //             </motion.div>
  //           </div>
  //         </motion.div>
  //       </div>
  //     </motion.section>

  //     {/* Features Section */}
  //     <section className="py-20 px-4 bg-white">
  //       <div className="max-w-6xl mx-auto">
  //         <motion.div
  //           initial={{ opacity: 0, y: 30 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.6 }}
  //           className="mb-16"
  //         >
  //           <h2 className="text-4xl font-bold text-foreground mb-12">What's Included</h2>
  //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {service.features.map((feature, index) => (
  //               <motion.div
  //                 key={index}
  //                 className="flex items-start gap-4 p-6 bg-emerald-50 rounded-lg border border-emerald-200 hover:border-emerald-400 transition-all"
  //                 initial={{ opacity: 0, y: 20 }}
  //                 whileInView={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: index * 0.1, duration: 0.5 }}
  //               >
  //                 <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
  //                 <span className="text-foreground text-base">{feature}</span>
  //               </motion.div>
  //             ))}
  //           </div>
  //         </motion.div>

  //         {/* Price Calculator */}
  //         <motion.div
  //           initial={{ opacity: 0, y: 30 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.6, delay: 0.2 }}
  //           className="mt-20 p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200"
  //         >
  //           <h3 className="text-2xl font-bold text-foreground mb-6">Quick Order</h3>
  //           <div className="grid md:grid-cols-3 gap-6 items-end">
  //             <div>
  //               <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
  //               <div className="flex items-center gap-4 bg-white rounded-lg p-2">
  //                 <button
  //                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
  //                   className="px-3 py-1 text-lg hover:bg-emerald-100 rounded transition-colors"
  //                 >
  //                   −
  //                 </button>
  //                 <span className="text-xl font-semibold flex-1 text-center">{quantity}</span>
  //                 <button
  //                   onClick={() => setQuantity(quantity + 1)}
  //                   className="px-3 py-1 text-lg hover:bg-emerald-100 rounded transition-colors"
  //                 >
  //                   +
  //                 </button>
  //               </div>
  //             </div>
  //             <div>
  //               <p className="text-sm text-foreground/70 mb-2">Total Price</p>
  //               <p className="text-3xl font-bold text-emerald-600">${(service.price * quantity).toFixed(2)}</p>
  //             </div>
  //             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  //               <Button
  //                 onClick={handleAddToCart}
  //                 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-full"
  //               >
  //                 Add to Cart
  //               </Button>
  //             </motion.div>
  //           </div>
  //         </motion.div>
  //       </div>
  //     </section>

  //     {/* Similar Services */}
  //     <section className="py-20 px-4 bg-emerald-50">
  //       <div className="max-w-6xl mx-auto">
  //         <h2 className="text-4xl font-bold text-foreground mb-12">Other Services</h2>
  //         <div className="grid md:grid-cols-3 gap-8">
  //           {services
  //             .filter((s) => s.id !== service.id)
  //             .slice(0, 3)
  //             .map((relatedService, index) => (
  //               <motion.div
  //                 key={relatedService.id}
  //                 initial={{ opacity: 0, y: 20 }}
  //                 whileInView={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: index * 0.1, duration: 0.5 }}
  //                 className="group"
  //               >
  //                 <Link href={`/services/${relatedService.id}`}>
  //                   <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
  //                     <img
  //                       src={relatedService.image}
  //                       alt={relatedService.name}
  //                       className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
  //                     />
  //                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
  //                       <div>
  //                         <h3 className="text-xl font-bold text-white mb-2">{relatedService.name}</h3>
  //                         <p className="text-white/80 text-sm">${relatedService.price}</p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </Link>
  //               </motion.div>
  //             ))}
  //         </div>
  //       </div>
  //     </section>

  //     <Footer />
  //   </main>
  // );
}
