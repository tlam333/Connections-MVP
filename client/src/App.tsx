import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatMatchPage from './app/chat-match/chatMatch';
import LandingPage from './app/home/landingPage';
import ProfilePage from './app/profile/profilePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatMatchPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        {/* Optionally add more routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
