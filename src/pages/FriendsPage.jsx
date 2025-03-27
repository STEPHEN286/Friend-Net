import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchUsers, fetchFriendRequests } from '@/store/slices/userSlice';
import UserCard from '@/components/UserCard';

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.user);
  const { users, friendRequests, status, error } = useAppSelector(state => state.users);

  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }

    dispatch(fetchUsers(currentUser.uid));
    dispatch(fetchFriendRequests(currentUser.uid));
  }, [dispatch, currentUser?.uid]);

  // Filter out users who have pending requests
 
  const filteredSuggestions = users.filter(user => {
  
    const hasSentRequest = friendRequests.sent.some(
      request => request.receiverId === user.id
    );

 
    const hasReceivedRequest = friendRequests.received.some(
      request => request.senderId === user.id
    );

    return !hasSentRequest && !hasReceivedRequest;
  });

  // Filter users based on search query
  const filteredUsers = filteredSuggestions.filter(user => 
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || 'Failed to load users'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Connect with Friends</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'suggestions'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Suggestions ({filteredUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'requests'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Requests {friendRequests.received.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {friendRequests.received.length}
                </span>
              )}
            </button>
          </div>

          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeTab === 'suggestions' ? (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              user && <UserCard 
                key={user.id} 
                person={user}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              No suggestions available
            </div>
          )
        ) : (
          <>
            {friendRequests.received.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending friend requests
              </div>
            ) : (
              friendRequests.received.map((request) => {
                const sender = users.find(user => user.id === request.senderId);
                return sender && (
                  <UserCard 
                    key={request.id}
                    person={sender}
                    isPending={true}
                    requestId={request.id}
                  />
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage; 