
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  console.log("user", user);
  // eslint-disable-next-line no-unused-vars
  const [userProfile, setUserProfile] = useState({
    name: 'Alexander Mitchell',
    username: '@alexmitchell',
    bio: 'Senior Product Designer | Digital Innovation Enthusiast | Creating user-centered experiences that make a difference',
    location: 'San Francisco, CA',
    website: 'www.alexmitchell.design',
    joinDate: 'March 2020',
    stats: {
      posts: 482,
      followers: 12800,
      following: 891
    }
  });

  const posts = [
    {
      id: 1,
      likes: 324,
      comments: 42
    },
    {
      id: 2,
      likes: 256,
      comments: 28
    },
    {
      id: 3,
      likes: 198,
      comments: 35
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Design Pioneer',
      description: 'Created 100+ innovative designs',
      icon: 'fa-medal',
      date: 'Achieved Feb 2025'
    },
    {
      id: 2,
      title: 'Community Leader',
      description: '10k+ community impact',
      icon: 'fa-users',
      date: 'Achieved Jan 2025'
    },
    {
      id: 3,
      title: 'Trending Creator',
      description: 'Top 1% engagement rate',
      icon: 'fa-star',
      date: 'Achieved Mar 2025'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'post',
      content: 'Shared new design portfolio',
      timestamp: '2 hours ago',
      icon: 'fa-image'
    },
    {
      id: 2,
      type: 'achievement',
      content: 'Earned Design Pioneer badge',
      timestamp: '1 day ago',
      icon: 'fa-award'
    },
    {
      id: 3,
      type: 'engagement',
      content: 'Reached 12k followers milestone',
      timestamp: '3 days ago',
      icon: 'fa-users'
    }
  ];

  return (
    <div className="max-w-7xl">
      <div className="relative">
        <div className="h-72 w-full overflow-hidden rounded-t-xl bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
          Image
        </div>
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full border-4 border-white ring-4 ring-primary/20 bg-gray-200 flex items-center justify-center text-gray-400">
            Image
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-main">{user.name}</h1>
            <p className="text-main/60">{user.displayName}</p>
            <p className="mt-2 max-w-2xl text-main/80">{user.bio}</p>
            <div className="flex items-center space-x-4 mt-3 text-main/70">
              <span className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {userProfile.location}
              </span>
              <span className="flex items-center">
                <i className="fas fa-link mr-2"></i>
                {userProfile.website}
              </span>
              <span className="flex items-center">
                <i className="fas fa-calendar mr-2"></i>
                Joined {userProfile.joinDate}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="!rounded-button px-6 py-2 bg-gradient text-white hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex space-x-8 mb-8">
          <div className="text-center">
            <div className="text-xl font-bold text-main">{userProfile.stats.posts}</div>
            <div className="text-main/70">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-main">{userProfile.stats.followers}</div>
            <div className="text-main/70">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-main">{userProfile.stats.following}</div>
            <div className="text-main/70">Following</div>
          </div>
        </div>

        <div className="border-b border-main/10 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`!rounded-button pb-4 px-4 font-medium ${
                activeTab === 'posts'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-main/60'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`!rounded-button pb-4 px-4 font-medium ${
                activeTab === 'activity'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-main/60'
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`!rounded-button pb-4 px-4 font-medium ${
                activeTab === 'achievements'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-main/60'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {posts.map((post) => (
                <div key={post.id} className="relative group cursor-pointer">
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    Image
                  </div>
                  <div className="absolute inset-0 bg-gradient bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <div className="text-white flex space-x-6">
                      <span className="flex items-center">
                        <i className="fas fa-heart mr-2"></i>
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-comment mr-2"></i>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6 mb-8">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className={`fas ${activity.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-main">{activity.content}</p>
                    <p className="text-sm text-main/60">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-3 gap-6 mb-8">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                    <i className={`fas ${achievement.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-main mb-2">{achievement.title}</h3>
                  <p className="text-main/70 mb-4">{achievement.description}</p>
                  <p className="text-sm text-main/50">{achievement.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl mx-4">
            <div className="p-4 border-b border-main/10 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-main">Edit Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-main/50 hover:text-main/70">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-main/70 mb-1">Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  className="w-full px-3 py-2 border border-main/20 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-main/70 mb-1">Bio</label>
                <textarea
                  value={userProfile.bio}
                  rows={3}
                  className="w-full px-3 py-2 border border-main/20 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-main/70 mb-1">Location</label>
                <input
                  type="text"
                  value={userProfile.location}
                  className="w-full px-3 py-2 border border-main/20 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-main/70 mb-1">Website</label>
                <input
                  type="text"
                  value={userProfile.website}
                  className="w-full px-3 py-2 border border-main/20 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div className="p-4 border-t border-main/10 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="!rounded-button px-4 py-2 bg-background text-main/70 hover:bg-background/70"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="!rounded-button px-4 py-2 bg-gradient text-white hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement; 