import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';
import { ROUTES } from '../routes';
import { useAppSelector } from '@/store/hooks';

const LeftSidebar = () => {
  const location = useLocation();
  const {user }= useAppSelector(state => state.auth);

  // console.log(" current user " ,currentUser);
  const navigationItems = [
    { path: ROUTES.HOME, icon: 'home', label: 'Home' },
    { path: ROUTES.EXPLORE, icon: 'compass', label: 'Explore' },
    { type: 'create', icon: 'plus', label: 'Create' },
    { path: ROUTES.FRIENDS, icon: 'users', label: 'Friends' },
    { path: ROUTES.NOTIFICATIONS, icon: 'bell', label: 'Notifications' },
    { path: ROUTES.PROFILE.ROOT, icon: 'user', label: 'Profile' },
  ];

  // Mobile bottom navigation - only show main nav items
  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navigationItems.map((item) => (
          item.type === 'create' ? (
            <button
              key="create"
              className="flex flex-col items-center justify-center -mt-6 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg"
            >
              <i className={`fas fa-${item.icon} text-xl`}></i>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <i className={`fas fa-${item.icon} text-lg mb-1`}></i>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );

  const sidebarItems = [
    ...navigationItems.filter(item => item.type !== 'create'),
    { path: ROUTES.MESSAGES, icon: 'envelope', label: 'Messages' },
    { path: ROUTES.SETTINGS, icon: 'cog', label: 'Settings' }
  ];

  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-20">
          <div className="bg-white rounded-lg shadow p-4">
            {/* User Profile Section */}
            <Link to={ROUTES.PROFILE.ROOT} className="flex items-center space-x-3 mb-6">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-sm text-gray-500">{user.handle}</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {sidebarItems.map(({ path, icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`fas fa-${icon} w-5`}></i>
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            {/* Create Post Button */}
            <button className="w-full mt-6 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
              <i className="fas fa-plus"></i>
              <span>Create Post</span>
            </button>

            {/* Trending Topics */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['Technology', 'Programming', 'Design', 'AI'].map((topic) => (
                  <Link
                    key={topic}
                    to={ROUTES.TOPIC.SPECIFIC(topic.toLowerCase())}
                    className="block text-sm text-gray-600 hover:text-blue-600"
                  >
                    #{topic}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </>
  );
};

export default LeftSidebar; 