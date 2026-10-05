import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../api/dummyJson';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'dummyjson_user';
const STORAGE_KEY_TOKEN = 'dummyjson_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || null;
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync token & user to localStorage whenever they change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [user, token]);

  const login = async (username, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await loginUser({ username, password });
      const authToken = data.accessToken || data.token;
      setUser(data);
      setToken(authToken);
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthError(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    authError,
    setAuthError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
