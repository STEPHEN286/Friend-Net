import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';
import { ROUTES } from '../routes';

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo */}
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="text-xl md:text-2xl font-bold text-blue-600">
              SocialHub
            </Link>
          </div>

          {/* Center section with search - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-600/20 text-gray-700 placeholder-gray-500" 
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile search toggle */}
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-search"></i>
            </button>

            {/* Messages - Always visible */}
            <Link 
              to={ROUTES.MESSAGES} 
              className="p-2 text-gray-600 hover:text-gray-900 relative"
            >
              <i className="fas fa-envelope"></i>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Notifications - Desktop only */}
            <Link 
              to={ROUTES.NOTIFICATIONS}
              className="p-2 text-gray-600 hover:text-gray-900 relative hidden md:block"
            >
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            
            {/* Create Post Button - Desktop only */}
            <button className="hidden md:flex items-center space-x-2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition-colors">
              <i className="fas fa-plus"></i>
              <span>Create</span>
            </button>
          </div>
        </div>

       
        {isSearchVisible && (
          <div className="md:hidden py-3 px-4 border-t border-gray-200">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-600/20 text-gray-700 placeholder-gray-500" 
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 