import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

const AuthLayout = () => {
  const location = useLocation();
  const isAuthenticated = false; // TODO: Replace with actual auth check

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Check if we're on an auth page
  const isAuthPage = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP].includes(location.pathname);
  
  // If not on auth page and not authenticated, redirect to login
  if (!isAuthPage && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Friend-Net</h1>
          <p className="text-gray-600 text-center mt-2">Connect with friends and the world around you.</p>
        </div>

       
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 