import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { 
  mockRegister, 
  mockLogin, 
  mockLogout, 
  mockGetCurrentUser,
  getSession 
} from '../services/mockAuth';

const AuthContext = createContext(null);

// Check if we're using mock authentication mode
const isMockMode = import.meta.env.VITE_FRONTEND_AUTH_MODE === 'mock';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth based on mode
  const initAuth = useCallback(async () => {
    try {
      if (isMockMode) {
        // Mock mode: check session in mock storage
        const session = getSession();
        if (session) {
          setUser(session);
        }
      } else {
        // API mode: check token in localStorage
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (err) {
      console.error('Auth init error:', err);
      // Clear invalid auth data
      if (isMockMode) {
        localStorage.removeItem('fepms_mock_session');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (isMockMode) {
        // Mock authentication
        const result = await mockLogin(email, password);
        if (result.success) {
          setUser(result.user);
          return { success: true, user: result.user };
        } else {
          setError(result.error);
          return { success: false, error: result.error };
        }
      } else {
        // Real API authentication
        const response = await api.post('/auth/login', { email, password });
        const { token, user: userData } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const register = useCallback(async (name, email, password, confirmPassword, phone = '') => {
    setLoading(true);
    setError(null);
    try {
      // Validation
      if (!name || name.trim() === '') {
        setError('Name is required');
        return { success: false, error: 'Name is required' };
      }
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address');
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters');
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return { success: false, error: 'Passwords do not match' };
      }
      
      if (isMockMode) {
        // Mock registration
        const result = await mockRegister({ name, email, password, phone });
        if (result.success) {
          setUser(result.user);
          return { success: true, user: result.user };
        } else {
          setError(result.error);
          return { success: false, error: result.error };
        }
      } else {
        // Real API registration
        const response = await api.post('/auth/register', { name, email, password, phone });
        const { token, user: userData } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (isMockMode) {
        await mockLogout();
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout even if there's an error
      setUser(null);
      setError(null);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
