import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendRequest, acceptRequest, declineRequest } from '@/store/slices/userSlice';
import { toast } from 'sonner';

const FriendRequestButton = ({ userId, requestId, isPending }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.user);

  const handleConnect = async () => {
    try {
      await dispatch(sendRequest({ currentUserId: currentUser.uid, friendId: userId })).unwrap();
      toast.success('Friend request sent');
    } catch (err) {
      if (err.message === "Friend request already sent") {
        toast.error('Friend request already sent to this user');
      } else {
        toast.error('Failed to send friend request');
      }
    }
  };

  const handleAccept = async () => {
    try {
      await dispatch(acceptRequest({ requestId, currentUserId: currentUser.uid })).unwrap();
      toast.success('Friend request accepted');
    } catch (err) {
      toast.error('Failed to accept friend request');
    }
  };

  const handleDecline = async () => {
    try {
      await dispatch(declineRequest({ requestId, currentUserId: currentUser.uid })).unwrap();
      toast.success('Friend request declined');
    } catch (err) {
      toast.error('Failed to decline friend request');
    }
  };

  if (isPending) {
    return (
      <div className="flex gap-2">
        <button 
          onClick={handleAccept}
          className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm font-medium transition-colors"
        >
          Confirm
        </button>
        <button 
          onClick={handleDecline}
          className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleConnect}
      className="rounded-lg hover:bg-blue-50 text-blue-600 px-3 py-1.5 transition-colors"
    >
      <i className="fas fa-user-plus"></i>
    </button>
  );
};

export default FriendRequestButton; 