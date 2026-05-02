const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API calls (no auth needed)
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  console.log(`Making ${options.method || 'GET'} request to: ${API_BASE_URL}${endpoint}`);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', {
        endpoint,
        status: response.status,
        data
      });
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error('API Call Failed:', error);
    throw error;
  }
}

// Cart APIs (using sessionId from header)
export const cartAPI = {
  getCart: (sessionId: string) => apiCall(`/cart/${sessionId}`),

  addToCart: (sessionId: string, item: any) => apiCall(`/cart/${sessionId}/add`, {
    method: 'POST',
    body: JSON.stringify(item),
  }),

  updateCartItem: (sessionId: string, itemId: string, quantity: number) =>
    apiCall(`/cart/${sessionId}/item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),

  removeFromCart: (sessionId: string, itemId: string) =>
    apiCall(`/cart/${sessionId}/item/${itemId}`, {
      method: 'DELETE',
    }),

  clearCart: (sessionId: string) => apiCall(`/cart/${sessionId}/clear`, {
    method: 'DELETE',
  }),

  applyCoupon: (sessionId: string, code: string) => apiCall(`/cart/${sessionId}/coupon`, {
    method: 'POST',
    body: JSON.stringify({ code }),
  }),

  removeCoupon: (sessionId: string) => apiCall(`/cart/${sessionId}/coupon`, {
    method: 'DELETE',
  }),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData: any) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  trackOrder: (orderNumber: string) => apiCall(`/orders/track/${orderNumber}`),

  getOrdersBySession: (sessionId: string) => apiCall(`/orders/session/${sessionId}`),
};

// Product APIs (public)
export const productAPI = {
  getAllProducts: (params?: any) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/products${query ? `?${query}` : ''}`);
  },

  getProductById: (id: string) => apiCall(`/products/${id}`),

  getProductBySlug: (slug: string) => apiCall(`/products/slug/${slug}`),

  getFeaturedProducts: () => apiCall('/products/featured'),

  getCategories: () => apiCall('/products/categories'),

  getServiceCategories: () => apiCall('/products/service-categories'),

  getServiceItemsForProduct: (productId: string) => apiCall(`/products/${productId}/items`),
};

// Service APIs (public)
export const serviceAPI = {
  getAllServices: () => apiCall('/services'),

  getServiceById: (id: string) => apiCall(`/services/${id}`),

  getServicesByCategory: (category: string) => apiCall(`/services/category/${category}`),

  getServiceItems: (serviceId: string) => apiCall(`/services/${serviceId}/items`),
};