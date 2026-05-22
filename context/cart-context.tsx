'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
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
    minQuantity?: number;  // ✅ ADD THIS
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

// Helper to get localStorage key for cart
const getLocalCartKey = (sessionId: string) => `laundrica_cart_${sessionId}`;

// Helper to load cart from localStorage
const loadFromLocalStorage = (sessionId: string): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const key = getLocalCartKey(sessionId);
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return [];
};

// Helper to save cart to localStorage
const saveToLocalStorage = (sessionId: string, items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    const key = getLocalCartKey(sessionId);
    localStorage.setItem(key, JSON.stringify(items));
    // Dispatch event for other tabs/windows
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items } }));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

// Helper to clear cart from localStorage
const clearLocalStorageCart = (sessionId: string) => {
  if (typeof window === 'undefined') return;
  try {
    const key = getLocalCartKey(sessionId);
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: [] } }));
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};

// Generate unique ID
const generateUniqueId = () => {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { sessionId } = useSession();

  // Load cart from localStorage first (instant), then sync with backend
  useEffect(() => {
    if (sessionId && !isInitialized) {
      // Immediately load from localStorage for instant UI
      const localItems = loadFromLocalStorage(sessionId);
      if (localItems.length > 0) {
        setCartItems(localItems);
      }

      // Then try to sync with backend in background
      syncWithBackend();
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [sessionId, isInitialized]);

  // Sync local cart with backend (background sync)
  const syncWithBackend = async () => {
    if (!sessionId) return;

    try {
      const response = await cartAPI.getCart(sessionId);
      if (response?.success && response?.cart?.items && response.cart.items.length > 0) {
        // Backend has items, use them
        const backendItems = response.cart.items.map((item: any) => ({
          ...item,
          id: item._id || item.id,
          cartItemId: item._id,
        }));
        setCartItems(backendItems);
        saveToLocalStorage(sessionId, backendItems);
      }
    } catch (error) {
      // Backend failed, keep using localStorage
      console.log('Background sync failed, using localStorage');
    }
  };

  const refreshCart = useCallback(async () => {
    if (!sessionId) return;

    // First show localStorage data
    const localItems = loadFromLocalStorage(sessionId);
    setCartItems(localItems);

    // Then try to refresh from backend
    try {
      const response = await cartAPI.getCart(sessionId);
      if (response?.success && response?.cart?.items) {
        const items = response.cart.items.map((item: any) => ({
          ...item,
          id: item._id || item.id,
          cartItemId: item._id,
        }));
        setCartItems(items);
        saveToLocalStorage(sessionId, items);
      }
    } catch (error) {
      console.log('Refresh from backend failed, using localStorage');
    }
  }, [sessionId]);

  // ✅ FIXED: Add to cart with minQuantity support
  const addToCart = async (item: Omit<CartItem, 'id'> & { id?: string; productId?: string }) => {
    if (!sessionId) {
      console.error('No session ID available');
      return;
    }

    // Generate IDs
    const newId = generateUniqueId();
    const productId = item.productId || item.metadata?.originalItemId || item.name;

    // ✅ Check for minQuantity
    const minQty = item.metadata?.minQuantity || 1;
    const quantityToAdd = item.quantity || 1;

    // ✅ IMMEDIATE UI UPDATE - No waiting, no blocking
    const currentItems = [...cartItems];
    const existingItemIndex = currentItems.findIndex(
      (i) => i.productId === productId || i.metadata?.originalItemId === item.metadata?.originalItemId
    );

    let optimisticItems: CartItem[];
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const currentQty = currentItems[existingItemIndex].quantity;
      let newQty = currentQty + quantityToAdd;

      // ✅ If it's first time adding and minQuantity > 1, ensure minimum
      if (currentQty === 0 && minQty > 1 && quantityToAdd === 1) {
        newQty = minQty;
      }

      optimisticItems = [...currentItems];
      optimisticItems[existingItemIndex] = {
        ...optimisticItems[existingItemIndex],
        quantity: newQty,
      };
    } else {
      // Add new item
      let finalQuantity = quantityToAdd;
      // ✅ If it's a new item and minQuantity > 1, use minQuantity
      if (minQty > 1 && quantityToAdd === 1) {
        finalQuantity = minQty;
      }

      const newItem: CartItem = {
        id: newId,
        ...item,
        productId: productId,
        quantity: finalQuantity,
      };
      optimisticItems = [...currentItems, newItem];
    }

    // ✅ Update UI and localStorage IMMEDIATELY
    setCartItems(optimisticItems);
    saveToLocalStorage(sessionId, optimisticItems);

    // ✅ Calculate final quantity for API
    let apiQuantity = item.quantity || 1;
    const existingItem = currentItems.find(
      (i) => i.productId === productId || i.metadata?.originalItemId === item.metadata?.originalItemId
    );

    if (!existingItem && minQty > 1 && apiQuantity === 1) {
      apiQuantity = minQty;
    }

    // ✅ Fire and forget - don't await, don't block
    cartAPI.addToCart(sessionId, {
      productId: productId,
      name: item.name,
      price: item.price,
      quantity: apiQuantity,
      category: item.category,
      description: item.description || '',
      image: item.image || '',
      serviceItems: item.serviceItems || [],
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
      designImage: item.designImage || null,
      metadata: {
        ...item.metadata,
        minQuantity: minQty,  // ✅ Store minQuantity in metadata
      },
    }).catch(error => {
      console.log('Backend sync failed, but cart is saved locally');
    });
  };

  // ✅ FIXED: Update quantity with minQuantity validation
  const updateQuantity = async (id: string, quantity: number) => {
    if (!sessionId) return;

    // Find the item to check minQuantity
    const item = cartItems.find(i => i.id === id || i.cartItemId === id);
    const minQty = item?.metadata?.minQuantity || 1;

    // ✅ Don't allow quantity below minQuantity for kg items
    let finalQuantity = quantity;
    if (minQty > 1 && quantity < minQty && quantity > 0) {
      finalQuantity = minQty;
      // Show toast notification
      if (typeof window !== 'undefined') {
        const { toast } = require('sonner');
        toast.info(`Minimum ${minQty} ${item?.metadata?.unit || 'kg'} required`);
      }
    }

    // If quantity is 0, remove the item
    if (finalQuantity === 0) {
      await removeFromCart(id);
      return;
    }

    // ✅ Update UI immediately
    const updatedItems = cartItems.map(item =>
      (item.id === id || item.cartItemId === id) ? { ...item, quantity: finalQuantity } : item
    );

    setCartItems(updatedItems);
    saveToLocalStorage(sessionId, updatedItems);

    // Fire and forget
    cartAPI.updateCartItem(sessionId, id, finalQuantity).catch(error => {
      console.log('Backend update failed, but UI already updated');
    });
  };

  // ✅ FIXED: Remove from cart - instant
  const removeFromCart = async (id: string) => {
    if (!sessionId) return;

    // ✅ Update UI immediately
    const updatedItems = cartItems.filter(item => item.id !== id && item.cartItemId !== id);

    setCartItems(updatedItems);
    saveToLocalStorage(sessionId, updatedItems);

    // Fire and forget
    cartAPI.removeFromCart(sessionId, id).catch(error => {
      console.log('Backend remove failed, but UI already updated');
    });
  };

  // ✅ FIXED: Clear cart - instant
  const clearCart = async () => {
    if (!sessionId) return;

    // ✅ Clear UI immediately
    setCartItems([]);
    clearLocalStorageCart(sessionId);

    // Fire and forget
    cartAPI.clearCart(sessionId).catch(error => {
      console.log('Backend clear failed, but UI already cleared');
    });
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