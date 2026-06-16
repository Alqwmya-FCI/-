import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AliCardPage from './pages/AliCardPage';
import HusseinCardPage from './pages/HusseinCardPage';
import './App.css';

function RedirectExternal({ url }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return null;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ali" element={<RedirectExternal url="https://alqwmya.com/eng-ali-abdelshafy/" />} />
      <Route path="/eng-ali-abdelshafy" element={<RedirectExternal url="https://alqwmya.com/eng-ali-abdelshafy/" />} />
      <Route path="/hussein" element={<RedirectExternal url="https://alqwmya.com/eng-hussein-abdelshafy/" />} />
      <Route path="/eng-hussein-abdelshafy" element={<RedirectExternal url="https://alqwmya.com/eng-hussein-abdelshafy/" />} />
      {/* Fallback routes for components if needed */}
      <Route path="/ali-local" element={<AliCardPage />} />
      <Route path="/hussein-local" element={<HusseinCardPage />} />
    </Routes>
  );
}

export default App;