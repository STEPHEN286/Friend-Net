import React from 'react';
import { useSelector } from 'react-redux';

const FollowersFollowingModal = ({ isOpen, onClose, type, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4">
        <div className="p-4 border-b border-main/10 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-main">
            {type === 'followers' ? 'Followers' : 'Following'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-main/50 hover:text-main/70"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {users.length === 0 ? (
            <div className="p-4 text-center text-main/70">
              No {type} yet
            </div>
          ) : (
            users.map((user) => (
              <div 
                key={user.id} 
                className="p-4 flex items-center space-x-4 hover:bg-background/50 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={user.profilePic} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-main">{user.name}</h4>
                  <p className="text-sm text-main/60">@{user.username}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersFollowingModal; 