// components/header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check if user is admin or staff
  const isAdminOrStaff = userRole === 'admin' || userRole === 'staff';
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-28 h-16 sm:w-32 sm:h-18 md:w-40 md:h-20">
              <Image
                src="/images/laundrica png.png"
                alt="Freshora Care Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 ml-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Prices
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart - Only for regular users */}
            {!isAdminOrStaff && (
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative h-10 w-10">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu - Only for authenticated regular users */}
            {isAuthenticated && !isAdminOrStaff && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-105 transition-transform">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Login Button - For non-authenticated users */}
            {!isAuthenticated && (
              <Link href="/login" className="hidden md:block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <User size={18} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Schedule Button - Only for regular users */}
            {!isAdminOrStaff && (
              <Link href="/services" className="hidden md:block">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  Schedule Pickup
                </Button>
              </Link>
            )}

            {/* Admin/Staff Dashboard Link */}
            {isAdminOrStaff && (
              <Link href="/admin/dashboard" className="hidden md:block">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col gap-4 pt-4 pb-6">
                <Link href="/" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/services" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/pricing" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  Prices
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                
                {isAuthenticated && !isAdminOrStaff ? (
                  <>
                    <div className="flex items-center gap-3 py-2 border-t border-gray-100 pt-4">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{user?.name || 'User'}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User size={18} className="mr-2" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/orders" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <ShoppingCart size={18} className="mr-2" />
                        My Orders
                      </Button>
                    </Link>
                    <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <Settings size={18} className="mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </>
                ) : isAuthenticated && isAdminOrStaff ? (
                  <>
                    <div className="text-sm text-gray-600 py-2 border-t border-gray-100 pt-4">
                      Welcome, {user?.name || user?.email?.split('@')[0]}
                    </div>
                    <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                        <User size={18} className="mr-2" />
                        Login / Sign Up
                      </Button>
                    </Link>
                    <Link href="/schedule" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                        Schedule Pickup
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Modal */}
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
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Logout Confirmation</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout from your account?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}