// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API calls (with session ID header)
async function apiCall(endpoint: string, options: RequestInit = {}, sessionId?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // ✅ Add session ID to headers if provided
  if (sessionId) {
    headers['x-session-id'] = sessionId;
  }

  console.log(`Making ${options.method || 'GET'} request to: ${API_BASE_URL}${endpoint}`);
  if (sessionId) {
    console.log(`With session ID: ${sessionId}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    let data;
    const contentType = response.headers.get('content-type');

    if (response.status !== 204 && contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        data = null;
      }
    } else {
      data = null;
    }

    if (!response.ok) {
      console.error('API Error:', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        data
      });

      const errorMessage = data?.message || data?.error || `API request failed with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: any) {
    console.error('API Call Failed:', {
      endpoint,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

// Cart APIs - NOW with sessionId passed to headers
export const cartAPI = {
  getCart: (sessionId: string) => {
    if (!sessionId) {
      return Promise.reject(new Error('Session ID is required'));
    }
    // Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}`, { method: 'GET' }, sessionId);
  },

  addToCart: (sessionId: string, item: any) => {
    if (!sessionId) {
      return Promise.reject(new Error('Session ID is required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/add`, {
      method: 'POST',
      body: JSON.stringify(item),
    }, sessionId);
  },

  updateCartItem: (sessionId: string, itemId: string, quantity: number) => {
    if (!sessionId || !itemId) {
      return Promise.reject(new Error('Session ID and Item ID are required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }, sessionId);
  },

  removeFromCart: (sessionId: string, itemId: string) => {
    if (!sessionId || !itemId) {
      return Promise.reject(new Error('Session ID and Item ID are required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/item/${itemId}`, {
      method: 'DELETE',
    }, sessionId);
  },

  clearCart: (sessionId: string) => {
    if (!sessionId) {
      return Promise.reject(new Error('Session ID is required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/clear`, {
      method: 'DELETE',
    }, sessionId);
  },

  applyCoupon: (sessionId: string, code: string) => {
    if (!sessionId || !code) {
      return Promise.reject(new Error('Session ID and coupon code are required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/coupon`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    }, sessionId);
  },

  removeCoupon: (sessionId: string) => {
    if (!sessionId) {
      return Promise.reject(new Error('Session ID is required'));
    }
    // ✅ Pass sessionId to apiCall for headers
    return apiCall(`/cart/${sessionId}/coupon`, {
      method: 'DELETE',
    }, sessionId);
  },
};

// Order APIs - also need sessionId in headers
export const orderAPI = {
  createOrder: (orderData: any) => {
    if (!orderData) {
      return Promise.reject(new Error('Order data is required'));
    }
    // For order creation, the sessionId is inside orderData
    const sessionId = orderData.sessionId;
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }, sessionId);
  },

  trackOrder: (orderNumber: string) => {
    if (!orderNumber) {
      return Promise.reject(new Error('Order number is required'));
    }
    return apiCall(`/orders/track/${orderNumber}`);
  },

  getOrdersBySession: (sessionId: string) => {
    if (!sessionId) {
      return Promise.reject(new Error('Session ID is required'));
    }
    return apiCall(`/orders/session/${sessionId}`, { method: 'GET' }, sessionId);
  },
};

// Product APIs (public - no session needed)
export const productAPI = {
  getAllProducts: (params?: any) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/products${query ? `?${query}` : ''}`);
  },

  getProductById: (id: string) => {
    if (!id) {
      return Promise.reject(new Error('Product ID is required'));
    }
    return apiCall(`/products/${id}`);
  },

  getProductBySlug: (slug: string) => {
    if (!slug) {
      return Promise.reject(new Error('Product slug is required'));
    }
    return apiCall(`/products/slug/${slug}`);
  },

  getFeaturedProducts: () => apiCall('/products/featured'),

  getCategories: () => apiCall('/products/categories'),

  getServiceCategories: () => apiCall('/products/service-categories'),

  getServiceItemsForProduct: (productId: string) => {
    if (!productId) {
      return Promise.reject(new Error('Product ID is required'));
    }
    return apiCall(`/products/${productId}/items`);
  },
};

// Service APIs (public - no session needed)
export const serviceAPI = {
  getAllServices: () => apiCall('/services'),

  getServiceById: (id: string) => {
    if (!id) {
      return Promise.reject(new Error('Service ID is required'));
    }
    return apiCall(`/services/${id}`);
  },

  getServicesByCategory: (category: string) => {
    if (!category) {
      return Promise.reject(new Error('Category is required'));
    }
    return apiCall(`/services/category/${category}`);
  },

  getServiceItems: (serviceId: string) => {
    if (!serviceId) {
      return Promise.reject(new Error('Service ID is required'));
    }
    return apiCall(`/services/${serviceId}/items`);
  },
};