
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import ApiService from './ApiService';


export const ProtectedRoute = () => {
  const location = useLocation();

  return ApiService.isAuthenticated() ? (
   <Outlet/>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};


export const AdminRoute = () => {
  const location = useLocation();

  return ApiService.isAdmin() ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};


export const SuperAdminRoute = () => {
  const location = useLocation();

  return ApiService.isSuperAdmin() ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};