import { useEffect, useState } from "react";

import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "@/firebabaseConfig";
import { toggleLike } from "@/services/postServices";
// import { db, auth } from "@/firebaseConfig";


const LikeButton = ({ postId }) => {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setLikes(snapshot.data().likes || []);
        setHasLiked(snapshot.data().likes?.includes(userId));
      }
    });

    return () => unsubscribe();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) return alert("You must be logged in to like posts!");

    const newLikeStatus = await toggleLike(postId, userId);
    setHasLiked(newLikeStatus);
  };

  return (
    <div className="flex items-center space-x-2">
            <button onClick={handleLike} className={`flex items-center space-x-2 cursor-pointer ${hasLiked ? 'text-blue-600' : ''}`}>
              <i className={`${hasLiked ? 'fas' : 'far'} fa-heart`}></i>
              <span>{likes.length}</span>
            </button>
      {/* <span className="text-sm">{likes.length} Likes</span> */}
    </div>
  );
};

export default LikeButton;
