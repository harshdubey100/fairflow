// Mock API service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    // Mock login - in real app, this would call the backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          // Mock successful login
          resolve({
            token: 'mock-jwt-token',
            role: credentials.email.includes('admin') ? 'admin' : 'employee',
            user: { id: 1, name: 'John Doe', email: credentials.email }
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async register(userData) {
    // Mock register
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          resolve({
            token: 'mock-jwt-token',
            role: userData.role,
            user: { id: 1, name: userData.name, email: userData.email }
          });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  }

  // Tickets endpoints
  async getTickets() {
    return this.request('/tickets');
  }

  async createTicket(ticketData) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  }

  async getTicket(id) {
    return this.request(`/tickets/${id}`);
  }

  // Users endpoints (admin only)
  async getUsers() {
    return this.request('/users');
  }

  // Rewards endpoints
  async getRewards() {
    return this.request('/rewards');
  }

  async getUserRewards() {
    return this.request('/user/rewards');
  }
}

export default new ApiService();