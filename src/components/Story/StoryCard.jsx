import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../../config/images';

const StoryCard = ({ story, isCreateCard, onClick }) => {
  if (isCreateCard) {
    return (
      <div 
        className="flex flex-col items-center space-y-1 cursor-pointer w-20"
        onClick={onClick}
      >
        <div className="w-16 h-16 rounded-full relative">
          <div className="absolute inset-0 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <i className="fas fa-plus text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-600 text-center">Create Story</span>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center space-y-1 cursor-pointer w-20"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full relative">
        {/* Gradient Border for unviewed stories */}
        {!story.viewed ? (
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 rounded-full p-[2px]">
            <div className="w-full h-full rounded-full p-[2px] bg-white">
              <img 
                src={story.userAvatar || DEFAULT_PROFILE_IMAGE} 
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-200 rounded-full p-[2px]">
            <div className="w-full h-full rounded-full p-[2px] bg-white">
              <img 
                src={story.userAvatar || DEFAULT_PROFILE_IMAGE} 
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-gray-600 text-center truncate w-full">
        {story.username}
      </span>
    </div>
  );
};

export default StoryCard; 