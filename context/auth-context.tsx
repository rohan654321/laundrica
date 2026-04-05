'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'staff';
  isActive: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  requireAuth: () => boolean;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin' | 'staff';
    isActive: boolean;
  };
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the user object has all required fields
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser as User);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data: LoginResponse = await response.json();
      if (data.success && data.user) {
        // Ensure the user object has all required fields
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          role: data.user.role,
          isActive: data.user.isActive,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data: LoginResponse = await response.json();
      if (data.success && data.user) {
        const userDataComplete: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          role: data.user.role,
          isActive: data.user.isActive,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userDataComplete));
        setUser(userDataComplete);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const sendOTP = async (phone: string) => {
    // Implement OTP sending
    console.log('Sending OTP to:', phone);
  };

  const loginWithOTP = async (phone: string, otp: string) => {
    // Implement OTP login
    console.log('Verifying OTP:', otp, 'for:', phone);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success && user) {
        const updatedUser: User = {
          ...user,
          ...data,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const requireAuth = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        sendOTP,
        loginWithOTP,
        updateProfile,
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