import React from 'react';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { PROFILE_IMAGES, POST_IMAGES } from '../config/images';

const Home = () => {
 

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