import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AliCardPage from './pages/AliCardPage';
import HusseinCardPage from './pages/HusseinCardPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ali" element={<AliCardPage />} />
      <Route path="/hussein" element={<HusseinCardPage />} />
    </Routes>
  );
}

export default App;