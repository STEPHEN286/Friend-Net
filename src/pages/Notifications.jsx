import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, mentions, likes, comments, follows

  // Sample data - replace with actual data from your state management
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
        username: '@sarahj',
      },
      content: 'liked your post',
      target: 'Just launched my new tech startup! 🚀',
      timestamp: '2 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'David Chen',
        image: DEFAULT_PROFILE_IMAGE,
        username: '@davidchen',
      },
      content: 'commented on your post',
      target: 'Great initiative! Would love to collaborate...',
      timestamp: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Tech Innovators',
        image: DEFAULT_PROFILE_IMAGE,
        username: '@techinnovators',
      },
      content: 'started following you',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Mike Wilson',
        image: DEFAULT_PROFILE_IMAGE,
        username: '@mikew',
      },
      content: 'mentioned you in a post',
      target: 'Hey @currentuser, check out this new feature!',
      timestamp: '3 hours ago',
      read: true,
    },
    // Add more notifications...
  ];

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(notification => notification.type === activeFilter);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <i className="fas fa-heart text-red-500"></i>;
      case 'comment':
        return <i className="fas fa-comment text-blue-500"></i>;
      case 'follow':
        return <i className="fas fa-user-plus text-green-500"></i>;
      case 'mention':
        return <i className="fas fa-at text-purple-500"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {['all', 'mentions', 'likes', 'comments', 'follows'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <Link to={`/profile/${notification.user.username}`}>
                  <img
                    src={notification.user.image}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/profile/${notification.user.username}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {notification.user.name}
                    </Link>
                    <span className="text-gray-500">{notification.content}</span>
                  </div>
                  {notification.target && (
                    <p className="mt-1 text-gray-600">{notification.target}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">{notification.timestamp}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getNotificationIcon(notification.type)}
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="p-8 text-center">
            <i className="far fa-bell text-6xl text-gray-400"></i>
            <p className="mt-4 text-lg text-gray-600">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 