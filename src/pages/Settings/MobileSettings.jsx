import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authServices';
import { navigationItems } from './constants';
import { DEFAULT_PROFILE_IMAGE } from '../../config/images';
import ProfileSettings from './Sections/Profile';
import SecuritySettings from './Sections/SecuritySetings';
import NotificationSettings from './Sections/NotificationSettings';
import DangerZone from './Sections/DangerZone';

const MobileSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If a section is active, show its content
  if (activeSection) {
    return (
      <div className="min-h-screen bg-white md:hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-4 h-14 flex items-center">
            <button 
              onClick={() => setActiveSection(null)}
              className="p-2 -ml-2 text-gray-600"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="ml-4 text-xl font-semibold">
              {navigationItems.find(item => item.id === activeSection)?.label}
            </h1>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-4">
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

            {/* Danger Zone */}
            {activeSection === 'danger' && (
                <DangerZone handleLogout={handleLogout} />
            )}

            {/* Save Button */}
            {activeSection !== 'danger' && (
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Main settings menu
  return (
    <div className="min-h-screen bg-white md:hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 h-14 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="pb-20">
        {/* Search Settings */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Settings Options */}
        <div className="py-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="w-full flex items-center px-6 py-3 text-gray-900 hover:bg-gray-50 border-b border-gray-100"
            >
              <i className={`fas fa-${item.icon} w-6 text-lg text-gray-600`}></i>
              <span className="ml-4 text-base">{item.label}</span>
              <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-4 py-6">
          <button
            onClick={handleLogout}
            className="w-full text-center text-red-600 text-base font-medium py-2 hover:text-red-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSettings; 