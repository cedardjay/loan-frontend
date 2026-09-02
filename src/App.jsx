import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import SignupPage from './features/auth/SignupPage';
import LoginPage from './features/auth/LoginPage';
import BorrowerView from './features/borrower/BorrowerView';
import InvestorView from './features/investor/InvestorView';
import { ProtectedRoute, AdminRoute, SuperAdminRoute } from './service/guard';
import LoanApplication from './features/borrower/LoanApplication';
import MyLoans from './features/borrower/MyLoans';
import LoanListings from './features/investor/LoanListings';
import InvestPage from './features/investor/InvestPage';
import MyInvestments from './features/investor/MyInvestments';
import LoanDetails from './features/borrower/LoanDetails';
import DashboardLayout from './layouts/DashboardLayout';
import InvestorLayout from './layouts/InvestorLayout';
import BorrowerLayout from './layouts/BorrowerLayout';
import UsersPage from './features/admin/UsersPage';
import LoanRequestsPage from './features/admin/LoanRequestsPage';
import Payments from './features/borrower/Payments';
import DisbursalDetails from './features/borrower/DisbursalDetails';
import RepaymentSchedule from './features/borrower/RepaymentShedule';
import MakePayment from './features/borrower/MakePayment';
import TransactionsPage from './features/admin/TransactionsPage';

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
              <Route path="payments" element={<Payments />} />
              <Route path="disbursal-details" element={<DisbursalDetails />} />
              <Route path="/borrower/repayment-schedule/:loanId" element={<RepaymentSchedule />} />
              <Route path="/borrower/make-payment/:loanId" element={<MakePayment />} />
            </Route>




          </Route>




        </Route>

        {/* Admin routes — must have ADMIN role */}
        <Route element={<AdminRoute />}>

        </Route>

        {/* Super admin routes — must have SUPER_ADMIN role */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/super-admin" element={<UsersPage />} />
          <Route path="/super-admin/users" element={<UsersPage />} />
          <Route path="/super-admin/loans" element={<LoanRequestsPage />} />
          <Route path="/super-admin/transactions" element={<TransactionsPage />} />
        </Route>

        {/* Fallback */}
        {/*<Route path="*" element={<Navigate to="/login" />} />*/}

      </Routes>
    </BrowserRouter>
  );
}

export default App;