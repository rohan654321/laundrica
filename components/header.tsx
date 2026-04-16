// components/header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Heart, Sparkles, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdminOrStaff = userRole === 'admin' || userRole === 'staff';
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getUserInitials = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Tagline */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex flex-col">
                <div className="relative w-28 h-12">
                  <Image
                    src="/images/laundrica png.png"
                    alt="Laundrica Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-[10px] text-primary font-medium tracking-wide">Luxury freshness within reach</span>
              </Link>
            </div>

            {/* Desktop Navigation - with zigzag hover */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-2 py-2 text-gray-700 hover:text-primary font-medium transition-colors duration-300"
                >
                  {link.label}
                  {/* Zigzag hover effect */}
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="zigzag"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        clipPath: 'polygon(0% 0%, 10% 100%, 20% 0%, 30% 100%, 40% 0%, 50% 100%, 60% 0%, 70% 100%, 80% 0%, 90% 100%, 100% 0%)'
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section - SQUARE BUTTONS */}
            <div className="flex items-center gap-3">
              {/* Cart Button - SQUARE */}
              {!isAdminOrStaff && (
                <Link href="/cart">
                  <button className="relative w-10 h-10 bg-white border-2 border-primary/30 hover:border-primary transition-all duration-300 group flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <ShoppingCart size={18} className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
              )}

              {/* Sign In Button - SQUARE */}
              {!isAuthenticated && (
                <Link href="/login">
                  <button className="hidden md:flex relative h-10 px-5 bg-white border-2 border-primary/30 hover:border-primary transition-all duration-300 group items-center justify-center gap-2">
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <User size={16} className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300 font-medium text-sm">Sign In</span>
                  </button>
                </Link>
              )}

              {/* Schedule Button - SQUARE */}
              {!isAdminOrStaff && (
                <Link href="/services">
                  <button className="hidden md:flex relative h-10 px-5 bg-primary border-2 border-primary hover:bg-primary/90 transition-all duration-300 group items-center justify-center gap-2">
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <Sparkles size={16} className="relative z-10 text-white group-hover:text-primary transition-colors duration-300" />
                    <span className="relative z-10 text-white group-hover:text-primary transition-colors duration-300 font-medium text-sm">Schedule</span>
                  </button>
                </Link>
              )}

              {/* User Avatar for logged in users */}
              {isAuthenticated && !isAdminOrStaff && (
                <div className="relative">
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="relative w-10 h-10 bg-white border-2 border-primary/30 hover:border-primary transition-all duration-300 group flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <Avatar className="w-8 h-8 relative z-10">
                      <AvatarFallback className="bg-transparent text-gray-700 group-hover:text-white transition-colors duration-300 text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button - SQUARE */}
              <button
                className="md:hidden relative w-10 h-10 bg-white border-2 border-primary/30 hover:border-primary transition-all duration-300 group flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {isMenuOpen ? (
                  <X size={18} className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                ) : (
                  <Menu size={18} className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {!isAuthenticated ? (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full h-10 bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary transition-all duration-300 font-medium">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full h-10 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium">
                        Schedule Pickup
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full h-10 bg-red-500 text-white border-2 border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-primary/30 max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-red-500 flex items-center justify-center">
                  <LogOut className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Logout?</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 h-10 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 h-10 bg-red-500 text-white border-2 border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}