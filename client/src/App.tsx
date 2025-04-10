import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatMatchPage from './chatMatch';
import LandingPage from './landingPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatMatchPage />} />
        {/* Optionally add more routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
