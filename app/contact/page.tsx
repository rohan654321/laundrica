'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="opacity-90 mt-2">Get in touch with our team</p>
        </div>
      </section>

      <div className="flex-1 py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Your Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Your Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Phone size={24} />,
                    title: 'Phone',
                    content: '+1-800-LAUNDRICA',
                  },
                  {
                    icon: <Mail size={24} />,
                    title: 'Email',
                    content: 'support@laundrica.com',
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: 'Address',
                    content: '123 Main St, City, State 12345',
                  },
                  {
                    icon: <Clock size={24} />,
                    title: 'Hours',
                    content: 'Mon - Sun: 8:00 AM - 10:00 PM',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-foreground/70">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold mb-4">Need Help?</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-primary hover:underline">
                    FAQ
                  </a>
                  <a href="#" className="block text-primary hover:underline">
                    Shipping Information
                  </a>
                  <a href="#" className="block text-primary hover:underline">
                    Returns & Refunds
                  </a>
                  <a href="#" className="block text-primary hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
