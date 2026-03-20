// context/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const userData = { id: '1', email, name: email.split('@')[0] };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phone: string) => {
    setIsLoading(true);
    try {
      // Simulate sending OTP
      console.log(`Sending OTP to ${phone}`);
      // In production, call your API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store phone temporarily for verification
      sessionStorage.setItem('pendingPhone', phone);
      
      // For demo purposes, show alert with OTP
      alert(`OTP sent to ${phone}. Demo OTP: 123456`);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }
      
      // Check if user exists, if not create new account
      const userData = { 
        id: Date.now().toString(), 
        phone,
        name: `User_${phone.slice(-4)}`
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.removeItem('pendingPhone');
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // Simulate registration
      const newUser = { id: Date.now().toString(), ...userData };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  const requireAuth = () => {
    if (!user) {
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithOTP,
        sendOTP,
        logout,
        register,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}