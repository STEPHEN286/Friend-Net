import React from 'react';
import Post from '../components/Post';
import { PROFILE_IMAGES, POST_IMAGES } from '../config/images';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    avatar: PROFILE_IMAGES.johnDoe,
    bio: 'Software Engineer | Tech Enthusiast | Coffee Lover',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinDate: 'Joined September 2021',
    stats: {
      posts: 450,
      followers: 2500,
      following: 1200
    }
  };

  // Sample posts data
  const posts = [
    {
      id: 1,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar
      },
      content: 'Excited to share that I\'ve just launched my new portfolio website! Check it out and let me know what you think. 🚀 #WebDev #Portfolio',
      image: POST_IMAGES.websiteDesign,
      timestamp: '1 day ago',
      likes: 1200,
      comments: 89
    },
    {
      id: 2,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar
      },
      content: 'Great day at the office! Working on some exciting new features for our users. #Coding #TechLife',
      timestamp: '3 days ago',
      likes: 850,
      comments: 42
    }
  ];

  return (
    <main className="w-1/2 ml-[20%]">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start space-x-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-32 w-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              <button className="px-6 py-2 bg-custom text-white !rounded-button hover:bg-custom/90">
                Edit Profile
              </button>
            </div>
            <p className="mb-3">{user.bio}</p>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <span><i className="fas fa-map-marker-alt mr-2"></i>{user.location}</span>
              <a href={user.website} className="hover:text-custom">
                <i className="fas fa-link mr-2"></i>{user.website}
              </a>
              <span><i className="fas fa-calendar mr-2"></i>{user.joinDate}</span>
            </div>
            <div className="flex space-x-6">
              <div>
                <span className="font-bold">{user.stats.posts}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold">{user.stats.followers}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold">{user.stats.following}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Profile; 