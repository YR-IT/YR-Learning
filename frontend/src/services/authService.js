import api from './api';

export const authService = {
  // Admin Login
  async adminLogin(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data;

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('role', 'admin');
      if (data.admin) {
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
      }
    }

    return data;
  },

  // Get Admin profile
  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch {
      return null;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  },

  // Check auth state
  isAuthenticated() {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    return !!token;
  },

  // Get stored admin user
  getStoredAdmin() {
    try {
      const stored = localStorage.getItem('adminUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
};

export default authService;
