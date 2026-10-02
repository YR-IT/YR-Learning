import axios from 'axios';

// Smart determination of API base URL:
// 1. User-defined VITE_API_URL
// 2. Production URL (https://yr-learning.onrender.com/api) when running on Vercel or any live domain
// 3. Fallback to localhost:5000/api for local development
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    }
  }
  return import.meta.env.VITE_API_URL || 'https://yr-learning.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Backend server root URL (without /api)
const BACKEND_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Set timeout to 60s to accommodate Render free-tier cold starts
  timeout: 60000,
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
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/panel')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
        localStorage.removeItem('adminUser');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Wake-up helper for Render backend.
 * Free Render instances spin down after inactivity.
 * Calling this on initial application load warms up the server immediately.
 */
let wakeUpPromise = null;
export const wakeUpRenderBackend = async () => {
  if (wakeUpPromise) return wakeUpPromise;

  wakeUpPromise = (async () => {
    try {
      console.log('🔄 Pinging Render backend to warm up:', `${API_BASE_URL}/health`);
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Render backend is active & healthy:', data);
        return { status: 'online', data };
      }
      return { status: 'waking', code: response.status };
    } catch (err) {
      console.warn('⚠️ Render backend is waking up (cold start)...', err.message);
      return { status: 'waking', error: err.message };
    }
  })();

  return wakeUpPromise;
};

export default api;
export { API_BASE_URL, BACKEND_ROOT_URL };
