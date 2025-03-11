import React, { useState } from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('suggestions');

  // Mock data - replace with actual API calls
  const friendSuggestions = [
    { id: 1, name: 'John Doe', username: 'johndoe', mutualFriends: 5 },
    { id: 2, name: 'Jane Smith', username: 'janesmith', mutualFriends: 3 },
    { id: 3, name: 'Mike Johnson', username: 'mikej', mutualFriends: 8 },
  ];

  const friendRequests = [
    { id: 1, name: 'Alice Brown', username: 'aliceb', sentAt: '2 days ago' },
    { id: 2, name: 'Bob Wilson', username: 'bobw', sentAt: '5 days ago' },
  ];

  const FriendCard = ({ name, username, mutualFriends, sentAt, isRequest }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={DEFAULT_PROFILE_IMAGE}
          alt={name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">@{username}</p>
          {mutualFriends && (
            <p className="text-xs text-gray-400">{mutualFriends} mutual friends</p>
          )}
          {sentAt && (
            <p className="text-xs text-gray-400">Sent {sentAt}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        {isRequest ? (
          <>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Accept
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Decline
            </button>
          </>
        ) : (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Friend
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'suggestions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'requests'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
            {friendRequests.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {friendRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for friends..."
            className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Friend Lists */}
      <div className="space-y-4">
        {activeTab === 'suggestions' ? (
          <>
            <h2 className="text-lg font-medium mb-4">People you might know</h2>
            {friendSuggestions.map((friend) => (
              <FriendCard
                key={friend.id}
                {...friend}
                isRequest={false}
              />
            ))}
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium mb-4">Friend Requests</h2>
            {friendRequests.map((request) => (
              <FriendCard
                key={request.id}
                {...request}
                isRequest={true}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Friends; 