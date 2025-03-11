import React, { useState } from 'react';
import { DEFAULT_PROFILE_IMAGE, DEFAULT_POST_IMAGE } from '../config/images';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const maxLength = 500;

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    };
    input.click();
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded';
      errorDiv.textContent = 'Please enter some content before posting.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }
    setShowPreview(true);
  };

  const handlePublish = () => {
    // TODO: Implement post publishing logic
    console.log('Publishing post:', { content, image: selectedImage });
    setContent('');
    setSelectedImage(null);
    setShowPreview(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex space-x-3">
          <img
            src={DEFAULT_PROFILE_IMAGE}
            alt="Current user"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-gray-50 rounded-lg border-0 focus:ring-0 text-gray-700 placeholder-gray-500 resize-none"
              rows={3}
              maxLength={maxLength}
            />
            {selectedImage && (
              <div className="mt-2 relative">
                <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-gray-800/50 text-white rounded-full p-1 hover:bg-gray-800/75"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-600">
                <button onClick={handleImageClick} className="hover:text-gray-900">
                  <i className="fas fa-image"></i>
                </button>
                <button className="hover:text-gray-900">
                  <i className="fas fa-video"></i>
                </button>
                <button className="hover:text-gray-900">
                  <i className="fas fa-link"></i>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{content.length}/{maxLength} characters</span>
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!content.trim()}
                >
                  Post
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-map-marker-alt"></i>
                <span>Add location</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-hashtag"></i>
                <span>Add hashtag</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl mx-4">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Preview Post</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4">
              <div className="bg-white rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={DEFAULT_PROFILE_IMAGE}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Current User</h4>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>
                <p className="mb-4 whitespace-pre-wrap">
                  {content.split(' ').map((word, index) =>
                    word.startsWith('#') ? (
                      <span key={index} className="text-blue-600">
                        {word}{' '}
                      </span>
                    ) : (
                      word + ' '
                    )
                  )}
                </p>
                <div className="mb-4">
                  <img
                    src={selectedImage || DEFAULT_POST_IMAGE}
                    alt="Post preview"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Post Visibility</span>
                  <select className="bg-white border rounded-lg px-3 py-1 text-sm">
                    <option value="public">Public</option>
                    <option value="friends">Friends</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Content Warning</span>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm">Add warning</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Edit
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost; 