'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('laundrica-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: email === 'admin@laundrica.com' ? 'admin' : 'customer',
    };
    setUser(mockUser);
    localStorage.setItem('laundrica-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('laundrica-user');
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register - in real app, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'customer',
    };
    setUser(mockUser);
    localStorage.setItem('laundrica-user', JSON.stringify(mockUser));
  };

  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return a default context value instead of throwing to handle SSR/hydration
    return {
      user: null,
      isAuthenticated: false,
      login: async () => {},
      logout: () => {},
      register: async () => {},
    };
  }
  return context;
}
