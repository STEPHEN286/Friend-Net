import React from 'react';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { PROFILE_IMAGES, POST_IMAGES } from '../config/images';
import Stories from '../components/Story/Stories';


const MainFeed = () => {


  return (
    console.log("Rendering MainFeed Component..."),
    <div className="max-w-2xl mx-auto px-4">
      <Stories />
      <CreatePost />
      <div className="space-y-4">
       
          <Post  />
        
      </div>
    </div>
  );
};

export default MainFeed; 