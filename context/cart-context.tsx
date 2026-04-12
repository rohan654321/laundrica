'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '@/lib/api';
import { useAuth } from './auth-context';

export interface CartItem {
  serviceItems: never[];
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load cart from backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCartFromBackend();
    } else {
      // Load from localStorage for guests
      loadCartFromLocalStorage();
    }
  }, [isAuthenticated]);

  const loadCartFromBackend = async () => {
    try {
      setIsLoading(true);
      const data = await cartAPI.getCart();
      if (data.success && data.items) {
        setCartItems(data.items);
        // Sync to localStorage as backup
        localStorage.setItem('cart', JSON.stringify(data.items));
      }
    } catch (error) {
      console.error('Error loading cart from backend:', error);
      // Fallback to localStorage
      loadCartFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  };

  const saveCartToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = async (item: CartItem) => {
    try {
      if (isAuthenticated) {
        // Add to backend cart
        const data = await cartAPI.addToCart({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
          image: item.image,
        });
        
        if (data.success) {
          // Refresh cart from backend
          await loadCartFromBackend();
        }
      } else {
        // Guest cart - store locally
        const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
        let updatedCart;
        
        if (existingItemIndex >= 0) {
          updatedCart = [...cartItems];
          updatedCart[existingItemIndex].quantity += item.quantity;
        } else {
          updatedCart = [...cartItems, item];
        }
        
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (isAuthenticated) {
        await cartAPI.updateCartItem(id, quantity);
        await loadCartFromBackend();
      } else {
        const updatedCart = cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      if (isAuthenticated) {
        await cartAPI.removeFromCart(id);
        await loadCartFromBackend();
      } else {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartAPI.clearCart();
        setCartItems([]);
      } else {
        setCartItems([]);
        saveCartToLocalStorage([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getTotalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}