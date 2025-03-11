import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-1/5 fixed left-[max(0px,calc((100%-1440px)/2))] top-20 bottom-0 p-4 overflow-y-auto bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-base">
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-gray-500">@johndoe</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-3">
          <div>
            <div className="font-semibold text-gray-700">2.5k</div>
            <div>Followers</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">1.2k</div>
            <div>Following</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">450</div>
            <div>Posts</div>
          </div>
        </div>
      </div>

      <nav className="space-y-2 mb-6">
        <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>
        <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group">
          <i className="fa-solid fa-user text-gray-500 group-hover:text-gray-700"></i>
          <span className="text-gray-700">Profile</span>
        </Link>
        <Link to="/bookmarks" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group">
          <i className="fa-solid fa-bookmark text-gray-500 group-hover:text-gray-700"></i>
          <span className="text-gray-700">Bookmarks</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group">
          <i className="fa-solid fa-gear text-gray-500 group-hover:text-gray-700"></i>
          <span className="text-gray-700">Settings</span>
        </Link>
      </nav>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Trending Topics</h3>
        <div className="space-y-3">
          <Link to="/topic/technology" className="block hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
            <div className="text-sm font-medium text-gray-900">#Technology</div>
            <div className="text-xs text-blue-600">25.4k posts</div>
          </Link>
          <Link to="/topic/design" className="block hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
            <div className="text-sm font-medium text-gray-900">#Design</div>
            <div className="text-xs text-blue-600">18.2k posts</div>
          </Link>
          <Link to="/topic/photography" className="block hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
            <div className="text-sm font-medium text-gray-900">#Photography</div>
            <div className="text-xs text-blue-600">12.8k posts</div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 