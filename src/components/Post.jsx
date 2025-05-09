import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProgressSliceActions } from '@/store/slices/userProgressSlice';
import { getAllPosts } from '@/services/postServices';

import LikeButton from './post/LikeButton.jsx';

import CommentSheet from './post/comment/CommentSheet';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null); // Track the active post
  const dispatch = useDispatch();
  // const { } = useSelector((state) => state.comments);
  const { isModalOpen } = useSelector((state) => state.userProgress);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

 

  const handleOpen = (postId) => {
    setActivePostId(postId); 
    dispatch(userProgressSliceActions.setModalOpen());
  };

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => {
          // const comments = commentsByPostId[post.id] || [];
          // console.log(`Comments for post ${post.id}:`, comments);

          return (
            <article key={post.id} className="bg-white">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Link to={`/profile/${post.username}`}>
                    <img
                      src={post.profilePic}
                      alt={post.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  <div>
                    <Link to={`/profile/${post.userName}`}>
                      <h4 className="font-semibold">{post.userName}</h4>
                    </Link>
                    <p className="text-sm text-gray-500">
                      {post.timestamp ? new Date(post.timestamp.toDate()).toLocaleString() : "Loading..."}
                    </p>
                  </div>
                </div>

                <p className="mb-4 whitespace-pre-wrap">
                  {post.content.split(' ').map((word, index) =>
                    word.startsWith('#') ? (
                      <span key={index} className="text-blue-600">{word} </span>
                    ) : (
                      word + ' '
                    )
                  )}
                </p>

                {post.mediaUrl && (
                  <div className="mb-4">
                    <img src={post.mediaUrl} alt="Post content" className="w-full rounded-lg" />
                  </div>
                )}

                <div className="flex items-center space-x-4 text-gray-500">
                  <LikeButton postId={post.id} />
                  <button
                    className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => handleOpen(post.id)} // Pass post.id to handleOpen
                  >
                    <i className="far fa-comment"></i>
                    <span>{post.commentCount}</span>
                  </button>

                 
                  {isModalOpen && activePostId === post.id && (
                    <CommentSheet key={post.id} postImage={post.mediaUrl} postId={post.id} />
                  )}

                  <button className="flex items-center space-x-2 cursor-pointer">
                    <i className="far fa-share-square"></i>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })
      )}
    </>
  );
};

export default Post;