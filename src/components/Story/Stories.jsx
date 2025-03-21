import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import { DEFAULT_PROFILE_IMAGE } from '../../config/images';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const Stories = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [progress, setProgress] = useState(0);

  // Mock data - replace with actual API calls
  const stories = [
    {
      id: 1,
      username: 'johndoe',
      userAvatar: null,
      image: 'https://source.unsplash.com/random/1',
      viewed: false,
      duration: 5000, // Duration in milliseconds
    },
    {
      id: 2,
      username: 'janedoe',
      userAvatar: null,
      image: 'https://source.unsplash.com/random/2',
      viewed: true,
      duration: 5000,
    },
    {
      id: 3,
      username: 'mikesmith',
      userAvatar: null,
      image: 'https://source.unsplash.com/random/3',
      viewed: false,
      duration: 5000,
    },
    // Add more mock stories as needed
  ];

  const handleCreateStory = () => {
    setIsCreateOpen(true);
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setProgress(0);
  };

  // Handle story progress
  useEffect(() => {
    if (selectedStory) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, selectedStory.duration / 50);

      return () => clearInterval(interval);
    }
  }, [selectedStory]);

  // Auto-close story when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setSelectedStory(null);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  return (
    <>
      <div className="bg-white  px-4 py-4 mb-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Create Story Card */}
          <StoryCard isCreateCard onClick={handleCreateStory} />

          {/* Story Cards */}
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => handleViewStory(story)}
            />
          ))}
        </div>
      </div>

      {/* Create Story Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Create Story</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-image text-gray-400 text-xl"></i>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Upload a photo for your story</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Choose Photo
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Story Dialog */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="sm:max-w-2xl p-0">
            <div className="relative aspect-[9/16] bg-black">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600 z-10">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Story Content */}
              <img 
                src={selectedStory.image}
                alt={selectedStory.username}
                className="absolute inset-0 w-full h-full object-contain"
              />

              {/* Story Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                    <img 
                      src={selectedStory.userAvatar || DEFAULT_PROFILE_IMAGE}
                      alt={selectedStory.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{selectedStory.username}</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <button 
                className="absolute top-1/2 left-4 -translate-y-1/2 text-white opacity-75 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle previous story
                }}
              >
                <i className="fas fa-chevron-left text-2xl"></i>
              </button>
              <button 
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white opacity-75 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle next story
                }}
              >
                <i className="fas fa-chevron-right text-2xl"></i>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Stories; 