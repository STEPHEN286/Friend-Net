import React, { useState } from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../../config/images';
import { navigationItems } from './constants';

const DesktopSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: 'Current User',
    email: 'user@example.com',
    bio: 'Tech enthusiast | Developer | Coffee lover',
    profileImage: DEFAULT_PROFILE_IMAGE,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    privacySettings: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowMessages: 'everyone',
      showReadReceipts: true,
    },
    notificationSettings: {
      emailNotifications: true,
      pushNotifications: true,
      mentions: true,
      comments: true,
      likes: true,
      follows: true,
      messages: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setFormData(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [setting]: value,
      },
    }));
  };

  const handleNotificationChange = (setting, checked) => {
    setFormData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: checked,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating settings:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex space-x-8">
        {/* Navigation */}
        <nav className="w-64 bg-white rounded-lg shadow p-4 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <ul className="space-y-2">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className={`fas fa-${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <ProfileSettings formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <SecuritySettings formData={formData} handleChange={handleChange} />
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <PrivacySettings formData={formData} handlePrivacyChange={handlePrivacyChange} />
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <NotificationSettings formData={formData} handleNotificationChange={handleNotificationChange} />
            )}

            {/* Save Button */}
            {activeSection !== 'danger' && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesktopSettings; 