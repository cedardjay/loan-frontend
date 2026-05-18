import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import SignupPage from './features/auth/SignupPage';
import LoginPage from './features/auth/LoginPage';
import VerifyPage from './features/auth/LoginPage';
import BorrowerView from './features/dashboard/BorrowerView';
import InvestorView from './features/dashboard/InvestorView';
import AdminDashboard from './features/dashboard/AdminDashboard';
import SuperAdminDashboard from './features/dashboard/SuperAdminDashboard';
import { ProtectedRoute, AdminRoute, SuperAdminRoute } from './service/guard';
import LoanApplication from './features/loans/LoanApplication';
import UserDashboard from './features/dashboard/UserDashboard';
import MyLoans from './features/loans/MyLoans';
import LoanListings from './features/investments/LoanListings';
import InvestPage from './features/investments/InvestPage';
import MyInvestments from './features/investments/MyInvestments';
import  LoansManagement  from './features/loans/LoansManagement';
import UsersManagement  from './features/users/UsersManagement';
import LoanDetails from './features/investments/LoanDetails';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes — no authentication needed */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<DashboardLayout />} />

        {/* Protected routes — must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Borrower */}
          <Route path="/borrower-view" element={<BorrowerView />} />
          <Route path="/my-loans" element={<MyLoans />} />
          <Route path="/loan-apply" element={<LoanApplication />} />

          {/* Investor */}
          <Route path="/investor-view" element={<InvestorView />} />
          <Route path="/loan-listings" element={<LoanListings />} />
          <Route path="/invest/:id" element={<InvestPage />} />
          <Route path="/my-investments" element={<MyInvestments />} />
          <Route path="/loan-details/:id" element={<LoanDetails />} />
        </Route>

        {/* Admin routes — must have ADMIN role */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/loans" element={<LoansManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
        </Route>

        {/* Super admin routes — must have SUPER_ADMIN role */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;