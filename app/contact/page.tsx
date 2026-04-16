'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Mail, Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us anytime, and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Phone size={28} />,
                title: 'Phone',
                details: ['+1-800-LAUNDRICA', '+1-555-123-4567'],
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
                details: ['123 Main Street', 'New York, NY 10001'],
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
                <div className="text-primary flex justify-center mb-4">{item.icon}</div>
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
              <h2 className="text-2xl font-bold mb-4">Find Us Here</h2>
              <p className="text-foreground/70 mb-4">
                Visit our flagship location in the heart of downtown. Free parking available for all customers.
              </p>
              <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bbafcef%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1644262074056!5m2!1sen!2sus"
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
                  className="text-sm text-primary hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Connect With Us */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
              <p className="text-foreground/70 mb-6">
                Follow us on social media for updates, promotions, and laundry tips. We'd love to connect with you!
              </p>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Instagram size={24} />, name: 'Instagram', handle: '@laundrica', color: 'hover:text-pink-600' },
                  { icon: <Facebook size={24} />, name: 'Facebook', handle: '/laundrica', color: 'hover:text-blue-600' },
                  { icon: <Twitter size={24} />, name: 'Twitter', handle: '@laundrica', color: 'hover:text-sky-500' },
                  { icon: <Globe size={24} />, name: 'Website', handle: 'laundrica.com', color: 'hover:text-primary' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className={`text-muted-foreground group-hover:text-primary transition-colors ${social.color}`}>
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
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Subscribe to our newsletter for exclusive offers and laundry care tips.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap">
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
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
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
                  a: 'No minimum order required. However, orders over $30 get free delivery.',
                },
              ].map((faq, index) => (
                <div key={index} className="p-4 rounded-lg hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold mb-2 text-primary">{faq.q}</h3>
                  <p className="text-sm text-foreground/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}