'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { ShoppingCart, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              L
            </span>
            Laundrica
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/print-store" className="text-foreground hover:text-primary transition-colors">
              Print Store
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <LayoutDashboard size={16} />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <span className="text-sm text-foreground">{user.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

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
              <Link href="/services" className="text-foreground hover:text-primary">
                Services
              </Link>
              <Link href="/print-store" className="text-foreground hover:text-primary">
                Print Store
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary">
                Pricing
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary">
                About
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-foreground hover:text-primary flex items-center gap-1">
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
