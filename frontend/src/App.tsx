import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.tsx';
import TopNavbar from './components/TopNavbar.tsx';
import HomePage from './pages/Homepage.tsx';
import MenuPage from './pages/MenuPage.tsx';
import ChatPage from './pages/ChatPage.tsx';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
          <TopNavbar />
          <div className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;