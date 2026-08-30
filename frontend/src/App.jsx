import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import FarmerInput from './pages/FarmerInput';
import MarketDecision from './pages/MarketDecision';
import WhatIfSimulator from './pages/WhatIfSimulator';
import Transport from './pages/Transport';
import RatesAndWeather from './pages/RatesAndWeather';
import Schemes from './pages/Schemes';
import AiAssistant from './pages/AiAssistant';
import BuyerDashboard from './pages/BuyerDashboard';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <div class="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div class="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/input"
            element={
              <ProtectedRoute>
                <FarmerInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decision"
            element={
              <ProtectedRoute>
                <MarketDecision />
              </ProtectedRoute>
            }
          />
          <Route
            path="/what-if"
            element={
              <ProtectedRoute>
                <WhatIfSimulator />
              </ProtectedRoute>
            }
          />
          <Route path="/transport" element={<Transport />} />
          <Route path="/rates" element={<RatesAndWeather />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
