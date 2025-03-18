import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../../../config/images';

const CommentsList = ({ comments = [] }) => {
  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {safeComments.map((comment, index) => (
        <div key={comment.id || index} className="flex space-x-3 mb-4">
          <img
            src={comment.userImage || DEFAULT_PROFILE_IMAGE}
            alt={comment.userName}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-medium text-sm">{comment.userName}</span>
              <span className="text-xs text-gray-500">
                {comment.timestamp ? new Date(comment.timestamp).toLocaleDateString() : ''}
              </span>
            </div>
            <p className="text-sm text-gray-700">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList; 