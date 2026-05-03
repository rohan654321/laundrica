import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-32 h-12">
                <Image
                  src="/images/Loundrica.png"
                  alt="Laundrica Logo"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm opacity-90">
              Professional laundry services for your home and business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:opacity-80 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:opacity-80 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Express Wash</li>
              <li>Dry Cleaning</li>
              <li>Ironing Service</li>
              <li>Stain Removal</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +1-800-LAUNDRICA
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                support@laundrica.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                123 Main St, City, State
              </li>
            </ul>
          </div>
        </div>

        {/* Short Legal Line - Trusted laundry partners */}
        <div className="border-t border-primary-foreground/20 pt-6 mb-4">
          <p className="text-xs text-center opacity-80">
            Trusted laundry partners. Quality checked & delivered by Laundrica
          </p>
        </div>

        <div className="pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs opacity-70">
            <p>&copy; 2024 Laundrica. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:opacity-80 transition-opacity">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}