import { createBrowserRouter, Navigate, useRouteError } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ProfileManagement from '@/pages/ProfileManagement';
import Explore from '../pages/Explore';
import Messages from '../pages/Messages';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';
import MainFeed from '../pages/MainFeed';
import Friends from '../pages/Friends';
import FriendsPage from '../pages/FriendsPage';

// Route paths object for consistent linking
export const ROUTES = {
  // Auth routes
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  // Main app routes
  HOME: '/',
  EXPLORE: '/explore',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  FRIENDS: '/friends',
  PROFILE: {
    ROOT: '/profile',
    USER: (username) => `/profile/${username}`,
  },
  TOPIC: {
    ROOT: '/topic',
    SPECIFIC: (topicId) => `/topic/${topicId}`,
  },
};

// Error Boundary Component
const ErrorBoundary = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {error.message || "An unexpected error occurred"}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Create and export the router configuration
const router = createBrowserRouter([
  // Auth routes are public
  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
      },
    ],
  },
  // All main app routes are protected
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainFeed />,
      },
      {
        path: ROUTES.EXPLORE,
        element: <Explore />,
      },
      {
        path: ROUTES.FRIENDS,
        element: <FriendsPage />,
      },
      {
        path: ROUTES.MESSAGES,
        element: <Messages />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTES.PROFILE.ROOT,
        element: <ProfileManagement />,
      },
      {
        path: `${ROUTES.PROFILE.ROOT}/:username`,
        element: <ProfileManagement />,
      },
      {
        path: `${ROUTES.TOPIC.ROOT}/:topicId`,
        element: <div>Topic Page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
  },
]);

export default router; 