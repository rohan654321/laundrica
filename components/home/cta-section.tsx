'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export function CTASection() {
  const handleWhatsAppOrder = () => {
    const phoneNumber = "971501234567";
    const message = encodeURIComponent(
      "Hello! I'd like to place an order for laundry services. Please share the details and pricing."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{ y: [0, -100, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <p className="text-sm font-medium text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Limited Time Offer
            </p>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Ready to Experience Premium Laundry?
          </h2>

          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers. Get 30% off your first order with code LAUNDRICA30.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="gap-2 rounded-full px-8">
                Schedule Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 gap-2"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle className="w-4 h-4" />
              Order by WhatsApp
            </Button>
          </div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm text-foreground/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>✓ 100% Satisfaction Guarantee</div>
            <div>✓ Insured & Tracked</div>
            <div>✓ 24/7 Customer Support</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}