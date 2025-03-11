import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('trending'); // trending, people, hashtags

  // Sample data - replace with actual data from your state management
  const trendingPosts = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
        username: '@sarahj',
      },
      content: 'Just launched my new tech startup! 🚀 #TechInnovation',
      image: 'https://dummyimage.com/600x400/4a90e2/ffffff&text=Tech+Startup+Launch',
      likes: 1234,
      comments: 89,
      shares: 45,
    },
    // Add more trending posts...
  ];

  const trendingPeople = [
    {
      id: 1,
      name: 'David Chen',
      username: '@davidchen',
      image: DEFAULT_PROFILE_IMAGE,
      followers: 15000,
      bio: 'Tech enthusiast | Startup founder | Coffee lover',
    },
    // Add more trending people...
  ];

  const trendingHashtags = [
    {
      id: 1,
      tag: '#TechInnovation',
      posts: 12500,
      trending: '+25%',
    },
    {
      id: 2,
      tag: '#DigitalTransformation',
      posts: 8900,
      trending: '+15%',
    },
    // Add more trending hashtags...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute right-4 top-3 text-gray-400"></i>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'trending'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'people'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab('hashtags')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'hashtags'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Hashtags
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'trending' && (
            <>
              {trendingPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{post.author.name}</span>
                        <span className="text-gray-500">{post.author.username}</span>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="mt-3 rounded-lg w-full"
                        />
                      )}
                      <div className="mt-4 flex items-center space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1">
                          <i className="far fa-heart"></i>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <i className="far fa-comment"></i>
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <i className="far fa-share-square"></i>
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'people' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPeople.map(person => (
                <div key={person.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-gray-500">{person.username}</p>
                      <p className="text-sm text-gray-600 mt-1">{person.bio}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {person.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hashtags' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingHashtags.map(hashtag => (
                <Link
                  key={hashtag.id}
                  to={`/hashtag/${hashtag.tag.slice(1)}`}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-blue-600">{hashtag.tag}</h3>
                  <p className="text-gray-500 mt-1">
                    {hashtag.posts.toLocaleString()} posts
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    <i className="fas fa-arrow-up"></i> {hashtag.trending} this week
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore; 