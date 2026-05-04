// context/cart-context.tsx (Fixed version)
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { cartAPI } from '@/lib/api';
import { useSession } from './session-context';

export interface CartItem {
  id: string;
  cartItemId?: string;
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
  productId?: string;
  metadata?: {
    originalItemId?: string;
    serviceName?: string;
    unit?: string;
    serviceId?: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'> & { id?: string; productId?: string }) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getCartCount: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { sessionId } = useSession();

  // Load cart from backend when session is ready - only once
  useEffect(() => {
    if (sessionId && !isInitialized) {
      loadCartFromBackend();
      setIsInitialized(true);
    }
  }, [sessionId, isInitialized]);

  const loadCartFromBackend = async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const data = await cartAPI.getCart(sessionId);

      if (data && data.success && data.cart?.items) {
        const items = data.cart.items.map((item: any) => ({
          ...item,
          id: item._id,
          cartItemId: item._id,
          productId: item.productId || item.id,
        }));
        setCartItems(items);
        localStorage.setItem('cart', JSON.stringify(items));
      } else if (data && data.cart && !data.cart.items) {
        // Cart exists but empty
        setCartItems([]);
        localStorage.setItem('cart', JSON.stringify([]));
      } else {
        // No cart or error - start fresh
        setCartItems([]);
        localStorage.removeItem('cart');
      }
    } catch (error: any) {
      console.error('Error loading cart from backend:', error?.message || error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveCartToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const refreshCart = useCallback(async () => {
    if (!sessionId) return;
    await loadCartFromBackend();
  }, [sessionId]);

  const addToCart = async (item: Omit<CartItem, 'id'> & { id?: string; productId?: string }) => {
    if (!sessionId) {
      console.error('No session ID available');
      throw new Error('Session not initialized');
    }

    try {
      const productId = item.productId || item.id || `product-${Date.now()}-${Math.random()}`;

      const response = await cartAPI.addToCart(sessionId, {
        productId: productId,
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
        metadata: item.metadata,
      });

      if (response && response.success) {
        await loadCartFromBackend();
      } else {
        // If backend fails, fallback to localStorage
        const existingItemIndex = cartItems.findIndex(
          (i) => i.productId === productId || i.metadata?.originalItemId === item.metadata?.originalItemId
        );

        let newCartItems;
        if (existingItemIndex >= 0) {
          newCartItems = [...cartItems];
          newCartItems[existingItemIndex] = {
            ...newCartItems[existingItemIndex],
            quantity: newCartItems[existingItemIndex].quantity + item.quantity,
          };
        } else {
          const newItem: CartItem = {
            id: `temp-${Date.now()}-${Math.random()}`,
            ...item,
            productId: productId,
          };
          newCartItems = [...cartItems, newItem];
        }

        setCartItems(newCartItems);
        saveCartToLocalStorage(newCartItems);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error?.message || error);

      // Fallback to localStorage on error
      const productId = item.productId || item.id || `product-${Date.now()}-${Math.random()}`;
      const existingItemIndex = cartItems.findIndex(
        (i) => i.productId === productId || i.metadata?.originalItemId === item.metadata?.originalItemId
      );

      let newCartItems;
      if (existingItemIndex >= 0) {
        newCartItems = [...cartItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + item.quantity,
        };
      } else {
        const newItem: CartItem = {
          id: `temp-${Date.now()}-${Math.random()}`,
          ...item,
          productId: productId,
        };
        newCartItems = [...cartItems, newItem];
      }

      setCartItems(newCartItems);
      saveCartToLocalStorage(newCartItems);
      throw error;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!sessionId) {
      throw new Error('Session not initialized');
    }

    try {
      await cartAPI.updateCartItem(sessionId, id, quantity);
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Fallback: update locally
      const updatedItems = cartItems.map(item =>
        item.id === id || item.cartItemId === id ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      throw error;
    }
  };

  const removeFromCart = async (id: string) => {
    if (!sessionId) {
      throw new Error('Session not initialized');
    }

    try {
      await cartAPI.removeFromCart(sessionId, id);
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Fallback: remove locally
      const updatedItems = cartItems.filter(item => item.id !== id && item.cartItemId !== id);
      setCartItems(updatedItems);
      saveCartToLocalStorage(updatedItems);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!sessionId) {
      throw new Error('Session not initialized');
    }

    try {
      await cartAPI.clearCart(sessionId);
      setCartItems([]);
      saveCartToLocalStorage([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Fallback: clear locally
      setCartItems([]);
      saveCartToLocalStorage([]);
      throw error;
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
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