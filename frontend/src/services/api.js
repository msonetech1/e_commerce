import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Products
export const getProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Orders
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrders = () => API.get('/orders');
export const getMyOrders = () => API.get('/orders/my-orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

// Users
export const getUsers = () => API.get('/users');
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Stats
export const getStats = () => API.get('/stats');

// Contact & Newsletter
export const sendMessage = (messageData) => API.post('/contact', messageData);

export default API;
