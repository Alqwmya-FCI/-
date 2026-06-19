import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AliCardPage from './pages/AliCardPage';
import HusseinCardPage from './pages/HusseinCardPage';
import ProductsCategoryPage from './pages/ProductsCategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { useSecurityShield } from './hooks/useSecurityShield';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './App.css';

function App() {
  useSecurityShield();
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/-" element={<Navigate to="/" replace />} />
        <Route path="/products/:categoryId" element={<ProductsCategoryPage />} />
        <Route path="/products/:categoryId/:productId" element={<ProductDetailPage />} />
        <Route path="/ali" element={<AliCardPage />} />
        <Route path="/eng-ali-abdelshafy" element={<AliCardPage />} />
        <Route path="/hussein" element={<HusseinCardPage />} />
        <Route path="/eng-hussein-abdelshafy" element={<HusseinCardPage />} />
        <Route path="/ali-local" element={<AliCardPage />} />
        <Route path="/hussein-local" element={<HusseinCardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CartDrawer />
    </CartProvider>
  );
}

export default App;