'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '@/lib/api';
import { useSession } from './session-context';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image?: string;
  serviceItems?: any[];
  selectedColor?: string;
  selectedSize?: string;
  designImage?: string;
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
  const { sessionId } = useSession();

  // Load cart from backend when session is ready
  useEffect(() => {
    if (sessionId) {
      loadCartFromBackend();
    }
  }, [sessionId]);

  const loadCartFromBackend = async () => {
    try {
      setIsLoading(true);
      const data = await cartAPI.getCart(sessionId);
      if (data.success && data.cart?.items) {
        setCartItems(data.cart.items);
        // Sync to localStorage as backup
        localStorage.setItem('cart', JSON.stringify(data.cart.items));
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
      const data = await cartAPI.addToCart(sessionId, {
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
        image: item.image,
        serviceItems: item.serviceItems,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        designImage: item.designImage,
      });

      if (data.success) {
        await loadCartFromBackend();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await cartAPI.updateCartItem(sessionId, id, quantity);
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await cartAPI.removeFromCart(sessionId, id);
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clearCart(sessionId);
      setCartItems([]);
      saveCartToLocalStorage([]);
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