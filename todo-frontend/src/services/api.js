import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear auth data if we're not already on login/signup pages
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/users/', userData),
  login: (credentials) => api.post('/auth/token/login/', credentials),
  logout: () => api.post('/auth/token/logout/'),
  getCurrentUser: () => api.get('/auth/users/me/'),
};

// Todo API
export const todoAPI = {
  getTodos: () => api.get('/todos/'),
  createTodo: (todoData) => api.post('/todos/', todoData),
  updateTodo: (id, todoData) => api.put(`/todos/${id}/`, todoData),
  deleteTodo: (id) => api.delete(`/todos/${id}/`),
  toggleTodo: (id, completed) => api.patch(`/todos/${id}/`, { completed }),
};

export default api; 