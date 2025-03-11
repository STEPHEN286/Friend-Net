import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, users, posts, hashtags

  // Sample data - replace with actual data from your state management
  const searchResults = {
    users: [
      {
        id: 1,
        name: 'Sarah Johnson',
        username: '@sarahj',
        image: DEFAULT_PROFILE_IMAGE,
        bio: 'Tech enthusiast | Developer | Coffee lover',
        followers: 1234,
      },
      // Add more users...
    ],
    posts: [
      {
        id: 1,
        author: {
          name: 'David Chen',
          username: '@davidchen',
          image: DEFAULT_PROFILE_IMAGE,
        },
        content: 'Just launched my new tech startup! 🚀 #TechInnovation',
        image: 'https://dummyimage.com/600x400/4a90e2/ffffff&text=Tech+Startup+Launch',
        likes: 89,
        comments: 12,
        timestamp: '2 hours ago',
      },
      // Add more posts...
    ],
    hashtags: [
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
      // Add more hashtags...
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search logic
    console.log('Searching for:', searchQuery);
  };

  const getFilteredResults = () => {
    if (activeTab === 'all') {
      return {
        users: searchResults.users.slice(0, 3),
        posts: searchResults.posts.slice(0, 3),
        hashtags: searchResults.hashtags.slice(0, 3),
      };
    }
    return {
      [activeTab]: searchResults[activeTab],
    };
  };

  const results = getFilteredResults();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for people, posts, or hashtags..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-4 top-4 text-gray-400"></i>
          </div>
        </form>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['all', 'users', 'posts', 'hashtags'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Users */}
        {results.users && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">People</h2>
              {activeTab === 'all' && results.users.length > 0 && (
                <Link
                  to="/search?tab=users"
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => setActiveTab('users')}
                >
                  View all
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.users.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/profile/${user.username}`}
                        className="text-lg font-medium text-gray-900 hover:underline"
                      >
                        {user.name}
                      </Link>
                      <p className="text-sm text-gray-500">{user.username}</p>
                      <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {user.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {results.posts && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
              {activeTab === 'all' && results.posts.length > 0 && (
                <Link
                  to="/search?tab=posts"
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => setActiveTab('posts')}
                >
                  View all
                </Link>
              )}
            </div>
            <div className="space-y-6">
              {results.posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/profile/${post.author.username}`}
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {post.author.name}
                        </Link>
                        <span className="text-gray-500">{post.author.username}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{post.timestamp}</span>
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hashtags */}
        {results.hashtags && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Hashtags</h2>
              {activeTab === 'all' && results.hashtags.length > 0 && (
                <Link
                  to="/search?tab=hashtags"
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => setActiveTab('hashtags')}
                >
                  View all
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.hashtags.map((hashtag) => (
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
          </div>
        )}

        {/* No Results */}
        {searchQuery && 
          Object.values(results).every(
            (result) => !result || result.length === 0
          ) && (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-400"></i>
              <p className="mt-4 text-lg text-gray-600">
                No results found for "{searchQuery}"
              </p>
              <p className="text-gray-500">
                Try searching for something else or check your spelling
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Search; 