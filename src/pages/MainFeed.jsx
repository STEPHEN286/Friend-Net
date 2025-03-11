import React from 'react';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { PROFILE_IMAGES, POST_IMAGES } from '../config/images';
import Stories from '../components/Story/Stories';

const MainFeed = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: "Emily Richardson",
        username: "@emilyrich",
        avatar: PROFILE_IMAGES.emilyBrown,
      },
      content: "Just finished an amazing project at work! The team really pulled together to create something special. #productivity #teamwork",
      image: POST_IMAGES.teamMeeting,
      likes: 234,
      comments: [
        {
          id: 1,
          user: {
            name: "Michael Anderson",
            avatar: PROFILE_IMAGES.mikeJohnson,
          },
          content: "Congratulations! The results look fantastic.",
          timestamp: "2 hours ago",
        },
      ],
      timestamp: "3 hours ago",
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: "David Lee",
        username: "@davidlee",
        avatar: PROFILE_IMAGES.davidLee,
      },
      content: "Excited to share my latest coding project! Built a real-time collaboration tool using React and WebSocket. Check it out! 🚀 #coding #webdev #innovation",
      image: POST_IMAGES.coding,
      likes: 156,
      comments: [
        {
          id: 1,
          user: {
            name: "Sarah Wilson",
            avatar: PROFILE_IMAGES.sarahWilson,
          },
          content: "This looks amazing! Would love to learn more about the tech stack.",
          timestamp: "1 hour ago",
        },
      ],
      timestamp: "4 hours ago",
      isLiked: true,
    },
    {
      id: 3,
      author: {
        name: "Alex Turner",
        username: "@alexturner",
        avatar: PROFILE_IMAGES.alexTurner,
      },
      content: "Great networking session at the tech conference today! Met so many inspiring people and learned about cutting-edge innovations. #networking #tech #future",
      image: POST_IMAGES.conference,
      likes: 189,
      comments: [],
      timestamp: "6 hours ago",
      isLiked: false,
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Stories />
      <CreatePost />
      <div className="space-y-4">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MainFeed; 