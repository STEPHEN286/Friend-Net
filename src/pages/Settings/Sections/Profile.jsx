import React from 'react';

const ProfileSettings = ({ formData, handleChange, handleImageUpload }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            <i className="fas fa-camera"></i>
          </label>
          <input
            id="profile-image"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;