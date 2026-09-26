import axios from 'axios';

// Base URL points to the local backend server (or environment variable in production)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized, clear storage if on admin route
      if (window.location.pathname.startsWith('/panel')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('adminUser');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
