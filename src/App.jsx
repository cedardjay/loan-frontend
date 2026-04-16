import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerifyPage from './pages/VerifyPage';
import BorrowerDashboard from './pages/BorrowerDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import { ProtectedRoute, AdminRoute, SuperAdminRoute } from './service/guard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/verify" element={<ProtectedRoute element={<VerifyPage />} />} />
        <Route path="/borrower-dashboard" element={<ProtectedRoute element={<BorrowerDashboard />} />} />
        <Route path="/investor-dashboard" element={<ProtectedRoute element={<InvestorDashboard />} />} />


        <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />

        <Route path="/super-admin-dashboard" element={<SuperAdminRoute element={<SuperAdminDashboard />} />} />

        

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;