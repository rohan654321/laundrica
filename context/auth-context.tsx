// context/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  sendOTP: (phone: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate it
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Validate token with backend
        validateToken(token);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await authAPI.getMe();
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        // Token invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success && response.token && response.user) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.success && response.token && response.user) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const sendOTP = async (phone: string) => {
    try {
      const response = await authAPI.sendOTP(phone);
      if (!response.success) {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Send OTP error:', error);
      throw error;
    }
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    try {
      const response = await authAPI.loginWithOTP(phone, otp);
      
      if (response.success && response.token && response.user) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      } else {
        throw new Error(response.message || 'OTP verification failed');
      }
    } catch (error: any) {
      console.error('OTP login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    userRole: user?.role || null,
    login,
    register,
    sendOTP,
    loginWithOTP,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}