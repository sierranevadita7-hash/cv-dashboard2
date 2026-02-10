import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardSlides from './pages/DashboardSlides';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<DashboardSlides />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
