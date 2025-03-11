export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  CREATE: '/create',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
};

// You can add more route-related configurations here if needed
export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.MESSAGES,
  ROUTES.SETTINGS,
]; 