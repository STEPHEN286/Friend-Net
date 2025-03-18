import React from 'react';

const NotificationSettings = ({ formData, handleNotificationChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
      <div className="space-y-4">
        {Object.entries(formData.notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleNotificationChange(key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;