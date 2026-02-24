'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { Mail, Phone, MapPin, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">My Profile</h1>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-foreground/70 capitalize">{user.role} Account</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>

            {/* Profile Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Mail className="text-primary" size={20} />
                <div>
                  <p className="text-sm text-foreground/70">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" size={20} />
                <div>
                  <p className="text-sm text-foreground/70">Phone Number</p>
                  <p className="font-medium">+1-555-0100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <MapPin className="text-primary" size={20} />
                <div>
                  <p className="text-sm text-foreground/70">Address</p>
                  <p className="font-medium">123 Main St, City, State 12345</p>
                </div>
              </div>
            </div>

            {/* Edit Profile */}
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link href="/orders">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">My Orders</h3>
                <p className="text-foreground/70">View your order history and status</p>
              </div>
            </Link>

            <Link href="/services">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">Browse Services</h3>
                <p className="text-foreground/70">Explore our laundry services</p>
              </div>
            </Link>
          </div>

          {/* Account Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Notification Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Payment Methods
              </Button>
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
