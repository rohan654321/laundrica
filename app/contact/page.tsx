'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Mail, Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Banner Section - Same as About Page */}
      <section>
        <div
          className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{ backgroundImage: "url('/images/curtainCleaning.jpg')" }}
        >
          {/* Gradient Overlay - Forest Green */}
          <div className="absolute inset-0 bg-gradient-to-r 
  from-[#0b3d2a]/85 
  via-[#0b3d2a]/55 
  to-transparent"
          />

          {/* BOTTOM SHADE */}
          <div className="absolute inset-0 bg-gradient-to-t 
  from-[#0b3d2a]/75 
  via-transparent 
  to-transparent"
          />

          {/* Centered Content */}
          <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              We'd love to <span className="text-yellow-300">hear from you</span>
            </h1>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
              Reach out anytime, and our team will get back to you within <span className="text-yellow-300">24 hours</span>
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  icon: <Phone size={28} />,
                  title: 'Phone',
                  details: ['+971 50 925 9667', '+971 4 123 4567'],
                  subtitle: 'Mon-Sun, 8AM - 10PM',
                },
                {
                  icon: <Mail size={28} />,
                  title: 'Email',
                  details: ['support@laundrica.com', 'care@laundrica.com'],
                  subtitle: '24/7 Support',
                },
                {
                  icon: <MapPin size={28} />,
                  title: 'Visit Us',
                  details: ['Azizi Riviera 42', 'Meydan, Dubai'],
                  subtitle: 'Get Directions ↓',
                },
                {
                  icon: <Clock size={28} />,
                  title: 'Business Hours',
                  details: ['Monday - Friday: 8AM - 10PM', 'Saturday - Sunday: 9AM - 8PM'],
                  subtitle: 'Open 7 Days a Week',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-[#1f4f2b] flex justify-center mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-foreground/70 text-sm mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-xs text-muted-foreground mt-3">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Map and Social Section */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#1f4f2b]">Find Us Here</h2>
                <p className="text-foreground/70 mb-4">
                  Visit our flagship location in Azizi Riviera, Meydan. Free pickup & delivery available across Dubai.
                </p>
                <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.123456789012!2d55.298765!3d25.198765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5e0c0c0c0c0c%3A0x0!2sAzizi%20Riviera%2042%2C%20Meydan%2C%20Dubai!5e0!3m2!1sen!2sae!4v1644262074056!5m2!1sen!2sae"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full"
                    title="Laundrica Location Map"
                  ></iframe>
                </div>
                <div className="mt-4 flex gap-3 justify-center md:justify-start">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1f4f2b] hover:underline font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Connect With Us */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#1f4f2b]">Connect With Us</h2>
                <p className="text-foreground/70 mb-6">
                  Follow us on social media for updates, promotions, and laundry tips. We'd love to connect with you!
                </p>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <Instagram size={24} />, name: 'Instagram', handle: '@laundrica', color: 'hover:text-pink-600' },
                    { icon: <Facebook size={24} />, name: 'Facebook', handle: '/laundrica', color: 'hover:text-blue-600' },
                    { icon: <Twitter size={24} />, name: 'Twitter', handle: '@laundrica', color: 'hover:text-sky-500' },
                    { icon: <Globe size={24} />, name: 'Website', handle: 'laundrica.com', color: 'hover:text-[#1f4f2b]' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-[#1f4f2b] hover:shadow-md transition-all group"
                    >
                      <div className={`text-muted-foreground group-hover:text-[#1f4f2b] transition-colors ${social.color}`}>
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-muted/30 rounded-xl p-6 border border-border">
                  <h3 className="font-semibold mb-2 text-[#1f4f2b]">Stay Updated</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    Subscribe to our newsletter for exclusive offers and laundry care tips.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#1f4f2b] text-sm"
                    />
                    <button className="px-4 py-2 bg-[#1f4f2b] text-white rounded-lg hover:bg-[#2a6e3a] transition-colors text-sm font-medium whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-center mb-8 text-[#1f4f2b]">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: 'How do I track my laundry order?',
                    a: 'You can track your order through our mobile app or website dashboard using your order ID.',
                  },
                  {
                    q: 'Do you offer same-day delivery?',
                    a: 'Yes, orders placed before 10 AM are eligible for same-day delivery within our service area.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.',
                  },
                  {
                    q: 'Is there a minimum order requirement?',
                    a: 'No minimum order required. Free pickup & delivery on all orders.',
                  },
                ].map((faq, index) => (
                  <div key={index} className="p-4 rounded-lg hover:bg-muted/30 transition-colors">
                    <h3 className="font-semibold mb-2 text-[#1f4f2b]">{faq.q}</h3>
                    <p className="text-sm text-foreground/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}