import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/common/HomePage';
import SignupPage from './pages/common/SignupPage';
import LoginPage from './pages/common/LoginPage';
import VerifyPage from './pages/VerifyPage';
import BorrowerDashboard from './pages/borrower/BorrowerDashboard';
import InvestorDashboard from './pages/investor/InvestorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import { ProtectedRoute, AdminRoute, SuperAdminRoute } from './service/guard';
import LoanApplication from './pages/borrower/LoanApplication';
import HybridDashboard from './pages/HybridDashboard';
import UserLoans from './pages/borrower/UserLoans';
import LoanListings from './pages/investor/LoanListings';
import InvestApplication from './pages/investor/InvestApplication';
import MyInvestments from './pages/investor/UserInvestments';
import { LoansManagement } from './pages/admin/LoansManagement';
import { UsersManagement } from './pages/admin/UsersManagement';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="dashboard" element={<ProtectedRoute element={<HybridDashboard />} />} />

        <Route path="/my-loans" element={<ProtectedRoute element={<UserLoans />} />} />
        <Route path="/borrower-portal" element={<ProtectedRoute element={<BorrowerDashboard />} />} />
        <Route path="/loan-apply" element={<ProtectedRoute element={<LoanApplication />} />} />
        <Route path="/investor-portal" element={<ProtectedRoute element={<InvestorDashboard />} />} />
        <Route path="/loan-market" element={<ProtectedRoute element={<LoanListings />} />} />
        <Route path="invest-apply" element={<ProtectedRoute element={<InvestApplication />} />} />
        <Route path="investments" element={<ProtectedRoute element={<MyInvestments />} />} />

        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />}/>
        <Route path="/admin/loans" element={<AdminRoute element={<LoansManagement />} />}/>
        <Route path="/admin/users" element={<AdminRoute element={<UsersManagement />} />}/>
          

        <Route path="/super-admin" element={<SuperAdminRoute element={<SuperAdminDashboard />} />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;