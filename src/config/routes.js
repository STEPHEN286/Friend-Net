export const ROUTES = {
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  HOME: '/',
  EXPLORE: '/explore',
  CREATE: '/create',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
  FRIENDS: '/friends',
};

// You can add more route-related configurations here if needed
export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.MESSAGES,
  ROUTES.SETTINGS,
  ROUTES.FRIENDS,
  ROUTES.NOTIFICATIONS,
  ROUTES.EXPLORE
]; 