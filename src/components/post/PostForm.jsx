import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPostWithMedia } from '@/services/uploadService';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(state => state.user);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createPostWithMedia({
        content,
        mediaFile,
        userId: currentUser.id,
        userName: currentUser.userName
      });

      // Clear form
      setContent('');
      setMediaFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      />
      
      {preview && (
        <div className="relative">
          {mediaFile?.type.startsWith('image/') ? (
            <img src={preview} alt="Preview" className="max-h-60 rounded-lg" />
          ) : (
            <video src={preview} className="max-h-60 rounded-lg" controls />
          )}
          <button
            type="button"
            onClick={() => {
              setMediaFile(null);
              setPreview(null);
            }}
            className="absolute top-2 right-2 bg-gray-800/50 text-white p-1 rounded-full hover:bg-gray-800"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <label className="cursor-pointer text-blue-600 hover:text-blue-700">
          <i className="fas fa-image mr-2"></i>
          Add Photo/Video
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading || (!content.trim() && !mediaFile)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Posting...
            </>
          ) : (
            'Post'
          )}
        </button>
      </div>
    </form>
  );
};

export default PostForm; 