// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { Mail, Phone, MapPin, User, LogOut, Edit2, Save, X, ShoppingBag, Heart, Settings, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  joinDate: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [profileData, setProfileData] = useState<UserProfile>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  });

  // Load saved profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      setIsEditing(false);
      setIsSaving(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1000);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('orders');
    logout();
    router.push('/');
  };

  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Items Cleaned', value: '156', icon: Shield, color: 'bg-green-100 text-green-600' },
    { label: 'Loyalty Points', value: '850', icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: 'Member Since', value: profileData.joinDate, icon: User, color: 'bg-purple-100 text-purple-600' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: '2024-03-15', total: 'AED 125.00', status: 'Delivered', items: 5 },
    { id: 'ORD-002', date: '2024-03-10', total: 'AED 85.00', status: 'Processing', items: 3 },
    { id: 'ORD-003', date: '2024-03-05', total: 'AED 210.00', status: 'Delivered', items: 8 },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-white/90">Manage your account and preferences</p>
        </div>
      </section>

      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {(profileData.name[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name || user.name || 'User'}</h2>
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Member since {profileData.joinDate}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-300 text-gray-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isSaving ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.name || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 XX XXX XXXX"
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.address || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <Input
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.city || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area / State
                    </label>
                    {isEditing ? (
                      <Input
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        placeholder="State/Area"
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.state || 'Not set'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code
                    </label>
                    {isEditing ? (
                      <Input
                        name="zipCode"
                        value={profileData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Zip code"
                        className="rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.zipCode || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  Recent Orders
                </h3>
                
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                        <p className="text-xs text-gray-400 mt-1">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <Link href="/orders">
                    <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50">
                      View All Orders
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  Account Settings
                </h3>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Shield className="w-4 h-4 mr-3" />
                    Change Password
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Bell className="w-4 h-4 mr-3" />
                    Notification Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <CreditCard className="w-4 h-4 mr-3" />
                    Payment Methods
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Account
                  </Button>
                </div>
              </div>

              {/* Loyalty Program */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                <Heart className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">Loyalty Program</h3>
                <p className="text-white/90 text-sm mb-4">
                  Earn points with every order and redeem for free services!
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Points</span>
                    <span className="font-bold">850 points</span>
                  </div>
                  <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs mt-2 text-white/80">150 points to next reward</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowDeleteConfirm(false)}
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
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
                <p className="text-gray-600 mb-4">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
                <p className="text-sm text-red-600 mb-6">
                  Are you absolutely sure?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

