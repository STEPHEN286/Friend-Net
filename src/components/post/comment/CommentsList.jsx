import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '@/store/slices/commentSlice';
import { DEFAULT_PROFILE_IMAGE } from '../../../config/images';

const CommentsList = ({ postId }) => {
  const dispatch = useDispatch();
  const { commentsByPostId, status, error } = useSelector((state) => state.comments); 


  const comments = commentsByPostId[postId] || [];
  console.log(`Comments for post ${postId}:`, comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {/* Show loading state */}
      {status === 'loading' && <p>Loading comments...</p>}

      {/* Show error message if fetching fails */}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

      {/* Show message if no comments are available */}
      {status === 'succeeded' && comments.length === 0 && <p>No comments yet.</p>}

      {/* Render comments */}
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3 mb-4">
            <img
              src={comment.userProfilePic }
              alt={comment.userName}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-medium text-sm">
                  {comment.userName}
                </span>
                <span className="text-xs text-gray-500">
                  { comment.timestamp
            ? new Date(comment.timestamp.seconds * 1000).toLocaleString() // Ensure conversion
            : "Just now"}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
              {comment.audioURL && <audio src={comment.audioURL} controls />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
