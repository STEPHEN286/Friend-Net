import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import FriendRequestButton from './FriendRequestButton';

const UserCard = ({ person, isPending, requestId }) => {
  // Early return if person is undefined
  if (!person) {
    return null;
  }

  // Format the timestamp from milliseconds
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-xl text-gray-500 font-semibold">
              {(person.username || 'U')?.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium text-gray-900">{person.username || 'Unknown User'}</h3>
            {isPending ? (
              <p className="text-sm text-gray-500">
                Requested {getTimeAgo(person.createdAt) || 'recently'}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Joined {getTimeAgo(person.createdAt) || 'recently'}
              </p>
            )}
          </div>
        </div>

        <FriendRequestButton 
          userId={person.id}
          requestId={requestId}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default UserCard; 