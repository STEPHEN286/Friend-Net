import React from 'react';
import { DEFAULT_PROFILE_IMAGE, DEFAULT_GROUP_IMAGE } from '../config/images';

const RightSidebar = () => {
  return (
    <div className="col-span-3 hidden lg:block">
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold mb-4">Active Contacts</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Contact"
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Sarah Johnson</h4>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Contact"
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">David Williams</h4>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Suggested Groups</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={DEFAULT_GROUP_IMAGE}
                alt="Group"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h4 className="text-sm font-semibold">Tech Innovators</h4>
                <p className="text-xs text-gray-500">15.2k members</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Join
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={DEFAULT_GROUP_IMAGE}
                alt="Group"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h4 className="text-sm font-semibold">Digital Marketing</h4>
                <p className="text-xs text-gray-500">12.8k members</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar; 