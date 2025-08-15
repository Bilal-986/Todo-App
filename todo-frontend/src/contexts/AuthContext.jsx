import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      setError(null);
      console.log('Attempting login with:', credentials.username);
      const response = await authAPI.login(credentials);
      console.log('Login response:', response.data);
      
      // Djoser returns auth_token in the response
      const { auth_token } = response.data;
      
      if (!auth_token) {
        throw new Error('No auth token received');
      }
      
      console.log('Auth token received, storing...');
      // Store the token
      localStorage.setItem('authToken', auth_token);
      
      // Get user info
      try {
        console.log('Fetching user data...');
        const userResponse = await authAPI.getCurrentUser();
        const userData = userResponse.data;
        console.log('User data received:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (userError) {
        console.error('Failed to get user data:', userError);
        // Still proceed with login if we have the token
        setUser({ username: credentials.username });
      }
      
      console.log('Login successful, user set:', !!user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.non_field_errors?.[0] || 
                          error.response?.data?.detail ||
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      await authAPI.signup(userData);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.username?.[0] || 
                          error.response?.data?.password?.[0] ||
                          error.response?.data?.detail ||
                          'Signup failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 