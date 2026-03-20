// components/header.tsx (updated with login/logout)
'use client';

import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              F
            </span>
            Freshora
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hi, {user?.name || user?.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <User size={18} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Schedule Button */}
            <Link href="/schedule" className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Schedule Pickup
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary">
                Services
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary">
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-600 py-2">
                    Hi, {user?.name || user?.email?.split('@')[0]}
                  </div>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    <User size={18} className="mr-2" />
                    Login / Sign Up
                  </Button>
                </Link>
              )}
              
              <Link href="/schedule">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Schedule Pickup
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}