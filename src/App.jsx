import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AliCardPage from './pages/AliCardPage';
import HusseinCardPage from './pages/HusseinCardPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/-" element={<Navigate to="/" replace />} />
      
      {/* Route for Ali */}
      <Route path="/ali" element={<AliCardPage />} />
      <Route path="/eng-ali-abdelshafy" element={<AliCardPage />} />
      
      {/* Route for Hussein */}
      <Route path="/hussein" element={<HusseinCardPage />} />
      <Route path="/eng-hussein-abdelshafy" element={<HusseinCardPage />} />
      
      {/* Fallback routes for components if needed */}
      <Route path="/ali-local" element={<AliCardPage />} />
      <Route path="/hussein-local" element={<HusseinCardPage />} />
      
      {/* Catch-all to redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;