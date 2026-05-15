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
import UserLoans from './features/loans/UserLoans';
import LoanListings from './features/investments/LoanListings';
import InvestPage from './features/investments/InvestPage';
import Investments from './features/investments/MyInvestments';
import  LoansManagement  from './features/loans/LoansManagement';
import UsersManagement  from './features/users/UsersManagement';
import LoanDetails from './features/investments/LoanDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />

        <Route path="/borrower-view" element={<ProtectedRoute element={<BorrowerView />} />} />
        <Route path="/my-loans" element={<ProtectedRoute element={<UserLoans />} />} />
        <Route path="/loan-apply" element={<ProtectedRoute element={<LoanApplication />} />} />
        
        <Route path="/investor-View" element={<ProtectedRoute element={<InvestorView />} />} />
        <Route path="/loan-listings" element={<ProtectedRoute element={<LoanListings />} />} />
        <Route path="/invest/:id" element={<ProtectedRoute element={<InvestPage />} />} />
        <Route path="investments" element={<ProtectedRoute element={<Investments />} />} />
        <Route path="/loan-details/:id" element={<ProtectedRoute element={<LoanDetails />} />} />

        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />}/>
        <Route path="/admin/loans" element={<AdminRoute element={<LoansManagement />} />}/>
        <Route path="/admin/users" element={<AdminRoute element={<UsersManagement />} />}/>
          

        <Route path="/super-admin" element={<SuperAdminRoute element={<SuperAdminDashboard />} />} />

        {/* Fallback Route */}
       {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;