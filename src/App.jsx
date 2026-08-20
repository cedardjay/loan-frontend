import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import SignupPage from './features/auth/SignupPage';
import LoginPage from './features/auth/LoginPage';
import BorrowerView from './features/borrower/BorrowerView';
import InvestorView from './features/investor/InvestorView';
import SuperAdminDashboard from './features/admin/SuperAdminDashboard';
import { ProtectedRoute, AdminRoute, SuperAdminRoute } from './service/guard';
import LoanApplication from './features/borrower/LoanApplication';
import MyLoans from './features/borrower/MyLoans';
import LoanListings from './features/borrower/LoanListings';
import InvestPage from './features/investor/InvestPage';
import MyInvestments from './features/investor/MyInvestments';
import LoansManagement from './features/borrower/LoansManagement';
import UsersManagement from './features/admin/UsersManagement';
import LoanDetails from './features/borrower/LoanDetails';
import DashboardLayout from './layouts/DashboardLayout';
import InvestorLayout from './layouts/InvestorLayout';
import BorrowerLayout from './layouts/BorrowerLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminView from './features/admin/AdminView';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes — no authentication needed */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />





        {/* Protected routes — must be logged in */}
        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>



            <Route element={<UserLayout />} >
            </Route>



            {/* Investor */}
            <Route path="/investor" element={<InvestorLayout />}>
              <Route index element={<InvestorView />} />
              <Route path="view" index element={<InvestorView />} />
              <Route path="my-investments" element={<MyInvestments />} />
              <Route path="loan-listings" element={<LoanListings />} />
              <Route path="invest/:id" element={<InvestPage />} />
              <Route path="loan-details/:id" element={<LoanDetails />} />
            </Route>


            {/* Borrower */}
            <Route path="/borrower" element={<BorrowerLayout />}>
              <Route index element={<BorrowerView />} />
              <Route path="view" element={<BorrowerView />} />
              <Route path="my-loans" element={<MyLoans />} />
              <Route path="loan-apply" element={<LoanApplication />} />
            </Route>




          </Route>




        </Route>

        {/* Admin routes — must have ADMIN role */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<AdminView />} />
            <Route path="loans" element={<LoansManagement />} />
            <Route path="users" element={<UsersManagement />} />
          </Route>
        </Route>

        {/* Super admin routes — must have SUPER_ADMIN role */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
        </Route>

        {/* Fallback */}
        {/*<Route path="*" element={<Navigate to="/login" />} />*/}

      </Routes>
    </BrowserRouter>
  );
}

export default App;