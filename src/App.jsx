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
import LoanApplication from './pages/LoanApplication';
import HybridDashboard from './pages/HybridDashboard';
import UserLoans from './pages/UserLoans';
import LoanListings from './pages/LoanListings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />




        <Route path="/loan-Application" element={<LoanApplication />} />
        <Route path="/dashboard" element={<HybridDashboard />} />
        <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/myloans" element={<UserLoans />} />
        <Route path="/loan-listings" element={<LoanListings />} />





        {/*<Route path="/borrower-dashboard" element={<ProtectedRoute element={<BorrowerDashboard />} />} />*/}
        {/*<Route path="/investor-dashboard" element={<ProtectedRoute element={<InvestorDashboard />} />} />*/}


        <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />

        <Route path="/super-admin-dashboard" element={<SuperAdminRoute element={<SuperAdminDashboard />} />} />

        

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;