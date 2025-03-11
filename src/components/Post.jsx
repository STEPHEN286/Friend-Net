import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE, DEFAULT_COMMENT_IMAGE } from '../config/images';
import CommentSheet from './CommentSheet';

const Post = ({ post }) => {
  const handleComment = () => {
    console.log('Comment submitted');
  };

  return (
    <article className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img
              src={post.author.avatar || DEFAULT_PROFILE_IMAGE}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div>
            <Link to={`/profile/${post.author.username}`}>
              <h4 className="font-semibold">{post.author.name}</h4>
            </Link>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <p className="mb-4 whitespace-pre-wrap">
          {post.content.split(' ').map((word, index) =>
            word.startsWith('#') ? (
              <span key={index} className="text-blue-600">
                {word}{' '}
              </span>
            ) : (
              word + ' '
            )
          )}
        </p>
        {post.image && (
          <div className="mb-4">
            <img
              src={post.image}
              alt="Post content"
              className="w-full rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center space-x-4 text-gray-500">
          <button className={`flex items-center space-x-2 cursor-pointer ${post.isLiked ? 'text-blue-600' : ''}`}>
            <i className={`${post.isLiked ? 'fas' : 'far'} fa-heart`}></i>
            <span>{post.likes}</span>
          </button>
          <CommentSheet
            postImage={post.image}
            comments={post.comments}
            onComment={handleComment}
          />
          <button className="flex items-center space-x-2 cursor-pointer">
            <i className="far fa-share-square"></i>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Preview Section */}
      <div className="border-t p-4">
        {post.comments && post.comments.length > 0 && (
          <div className="mb-4">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex space-x-3 mb-3">
                <img
                  src={comment.user.avatar || DEFAULT_COMMENT_IMAGE}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <h5 className="font-semibold text-sm">{comment.user.name}</h5>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                </div>
              </div>
            ))}
            {post.comments.length > 2 && (
              <button className="text-sm text-gray-500 hover:text-gray-700">
                View all {post.comments.length} comments
              </button>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <img
            src={DEFAULT_COMMENT_IMAGE}
            alt="Current user"
            className="w-8 h-8 rounded-full"
          />
          <button
            onClick={() => document.querySelector('[data-sheet-trigger]')?.click()}
            className="flex-1 bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 text-left"
          >
            Write a comment...
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post; 