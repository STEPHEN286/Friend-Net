import React from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { PROFILE_IMAGES, POST_IMAGES } from '../config/images';

const Home = () => {
  // Sample posts data
  // const posts = [
  //   {
  //     id: 1,
  //     author: {
  //       name: 'Sarah Wilson',
  //       username: 'sarahwilson',
  //       avatar: PROFILE_IMAGES.sarahWilson
  //     },
  //     content: 'Just finished working on an exciting new project! Can\'t wait to share more details with everyone. Here\'s a sneak peek of what we\'ve been up to. 🚀 #Design #Innovation',
  //     image: POST_IMAGES.workspace,
  //     timestamp: '2 hours ago',
  //     likes: 2500,
  //     comments: 482
  //   },
  //   {
  //     id: 2,
  //     author: {
  //       name: 'Mike Johnson',
  //       username: 'mikejohnson',
  //       avatar: PROFILE_IMAGES.mikeJohnson
  //     },
  //     content: 'Had an amazing time at the tech conference today! Met so many inspiring people and learned about cutting-edge innovations. Looking forward to implementing some new ideas! 💡 #TechConference #Innovation',
  //     image: POST_IMAGES.techConference,
  //     timestamp: '5 hours ago',
  //     likes: 1800,
  //     comments: 324
  //   }
  // ];

  return (
    <main className="w-1/2 ml-[20%]">
      <PostForm />
      <div className="space-y-4">
      
          <Post/>
    
      </div>
    </main>
  );
};

export default Home; 