import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';

/**
 * Root Application Component
 * Sets up Global Auth Context and Declarative Client-side Routing.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Page 2: Dashboard / Products List */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<Navigate to="/" replace />} />

          {/* Page 1: Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Page 3: User Profile / Details */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
