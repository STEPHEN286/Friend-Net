import React from 'react';

const PrivacySettings = ({ formData, handlePrivacyChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
          <select
            value={formData.privacySettings.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Show Online Status</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacySettings.showOnlineStatus}
              onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Who Can Message You</label>
          <select
            value={formData.privacySettings.allowMessages}
            onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;