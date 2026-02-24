'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Executive',
    content: 'Laundrica has been a lifesaver! I get my clothes back pristine and on time every week. Worth every penny.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    content: 'The express delivery is amazing. I love having more time instead of worrying about laundry. Highly recommended!',
    rating: 5,
    image: '👨‍💻',
  },
  {
    name: 'Priya Sharma',
    role: 'Busy Parent',
    content: 'As a mother of two, Laundrica is my secret weapon. The premium care is excellent for my kids\' clothes.',
    rating: 5,
    image: '👩‍🦰',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-accent/5 to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Laundrica with their wardrobe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="glassmorphism rounded-3xl p-8 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 mb-8 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
