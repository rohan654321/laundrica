// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get token safely
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  console.log(`Making ${options.method || 'GET'} request to: ${API_BASE_URL}${endpoint}`);
  console.log('Token present:', !!token);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle 401 Unauthorized specifically
      if (response.status === 401) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        throw new Error('Your session has expired. Please log in again.');
      }
      
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

// Auth APIs
export const authAPI = {
  register: (userData: any) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (email: string, password: string) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  getMe: () => apiCall('/auth/me'),
  
  updateMe: (data: any) => apiCall('/auth/update-me', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  forgotPassword: (email: string) => apiCall('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  
  resetPassword: (token: string, password: string) => apiCall(`/auth/reset-password/${token}`, {
    method: 'PUT',
    body: JSON.stringify({ password }),
  }),
};

// Cart APIs
export const cartAPI = {
  getCart: () => apiCall('/cart'),
  
  getCartCount: () => apiCall('/cart/count'),
  
  addToCart: (item: any) => apiCall('/cart/add', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  
  updateCartItem: (itemId: string, quantity: number) => apiCall(`/cart/item/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  
  removeFromCart: (itemId: string) => apiCall(`/cart/item/${itemId}`, {
    method: 'DELETE',
  }),
  
  clearCart: () => apiCall('/cart/clear', {
    method: 'DELETE',
  }),
  
  applyCoupon: (code: string) => apiCall('/cart/coupon', {
    method: 'POST',
    body: JSON.stringify({ code }),
  }),
  
  removeCoupon: () => apiCall('/cart/coupon', {
    method: 'DELETE',
  }),
  
  mergeCart: (items: any[]) => apiCall('/cart/merge', {
    method: 'POST',
    body: JSON.stringify({ items }),
  }),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData: any) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getMyOrders: () => apiCall('/orders/my-orders'),
  
  getOrderById: (id: string) => apiCall(`/orders/${id}`),
  
  cancelOrder: (id: string) => apiCall(`/orders/${id}/cancel`, {
    method: 'PUT',
  }),
  
  trackOrder: (trackingNumber: string) => apiCall(`/orders/track/${trackingNumber}`),
};

// Product APIs
export const productAPI = {
  getAllProducts: (params?: any) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/products${query ? `?${query}` : ''}`);
  },
  
  getProductById: (id: string) => apiCall(`/products/${id}`),
  
  getProductBySlug: (slug: string) => apiCall(`/products/slug/${slug}`),
  
  getFeaturedProducts: () => apiCall('/products/featured'),
  
  getCategories: () => apiCall('/products/categories'),
};

// Service APIs
export const serviceAPI = {
  getAllServices: () => apiCall('/services'),
  
  getServiceById: (id: string) => apiCall(`/services/${id}`),
  
  getServicesByCategory: (category: string) => apiCall(`/services/category/${category}`),
  
  getServiceItems: (serviceId: string) => apiCall(`/services/${serviceId}/items`),
};

// User APIs
export const userAPI = {
  getProfile: () => apiCall('/users/profile'),
  
  updateProfile: (data: any) => apiCall('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  changePassword: (currentPassword: string, newPassword: string) => apiCall('/users/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  }),
  
  addAddress: (address: any) => apiCall('/users/address', {
    method: 'POST',
    body: JSON.stringify(address),
  }),
  
  updateAddress: (addressId: string, address: any) => apiCall(`/users/address/${addressId}`, {
    method: 'PUT',
    body: JSON.stringify(address),
  }),
  
  deleteAddress: (addressId: string) => apiCall(`/users/address/${addressId}`, {
    method: 'DELETE',
  }),
};