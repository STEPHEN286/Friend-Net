import React, { useState } from 'react';

const PostForm = () => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission
    console.log('Post submitted:', postContent);
    setPostContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
          Image
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea 
              className="w-full p-3 border-none bg-gray-50 !rounded-button resize-none" 
              rows="3" 
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 !rounded-button">
                  <i className="fas fa-image"></i>
                </button>
                <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 !rounded-button">
                  <i className="fas fa-video"></i>
                </button>
                <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 !rounded-button">
                  <i className="fas fa-map-marker-alt"></i>
                </button>
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-custom text-white !rounded-button hover:bg-custom/90"
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm; 