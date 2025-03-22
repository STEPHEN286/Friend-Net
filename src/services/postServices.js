import { db } from "@/firebabaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDoc,
  orderBy,
  query,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from './uploadService';
import { DEFAULT_PROFILE_IMAGE } from "@/config/images";
import { getUserById } from "./userServices";

export const getAllPosts = async () => {
  const postsRef = collection(db, "posts");
  const postsQuery = query(postsRef, orderBy("timestamp", "desc")); // Order by timestamp

  const querySnapshot = await getDocs(postsQuery); // Fetch posts
  const posts = [];

  for (const docSnap of querySnapshot.docs) { // Iterate over each post
    const postData = docSnap.data();
    const userRef = doc(db, "users", postData.userId); // Reference to the user document
    const userSnap = await getDoc(userRef);   

    if (userSnap.exists()) { // If user exists
      postData.profilePic = userSnap.data().profilePic || ""; // Get profilePic
    }

    posts.push({ id: docSnap.id, ...postData }); // Add post to the list
  }

  console.log("Fetched posts:", posts);
  return posts;
};

export const createPost = async ({ content, mediaFile, userId, userName }) => {
  try {
    // Validate required fields
    if (!userId || !userName) {
      throw new Error("userId and userName are required");
    }

    let mediaUrl = null;
    let mediaType = null;

    // Handle media upload if present
    if (mediaFile) {
      mediaType = mediaFile.type.startsWith('image/') ? 'image' : 'video';
      const uploadResult = await uploadToCloudinary(mediaFile);
      mediaUrl = uploadResult.url;
    }

    const postRef = collection(db, "posts");
    const newPost = {
      content: content || "",
      userId,
      userName,
      mediaUrl,
      mediaType,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    };

    const docRef = await addDoc(postRef, newPost);
    return { 
      id: docRef.id, 
      ...newPost,
      timestamp: new Date() // Convert serverTimestamp for immediate use
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const toggleLike = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);

  try {
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error("Post not found.");
    }

    const postData = postSnap.data();
    const hasLiked = postData.likes?.includes(userId);

    await updateDoc(postRef, {
      likes: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
    });

    return !hasLiked; // Returns true if liked, false if unliked
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const addComment = async (postId, comment, userId, userName, audioURL = null) => {
  if (!postId || !userId || !userName) {
    throw new Error("Invalid input: postId, userId, and userName are required.");
  }

  if (!comment.trim() && !audioURL) {
    throw new Error("Invalid input: Either comment text or audioURL is required.");
  }

  try {
    // Fetch user details including profile picture
    const user = await getUserById(userId);
    const userProfilePic = user.profilePic || DEFAULT_PROFILE_IMAGE;

    // Reference to the comments subcollection inside the post document
    const commentRef = collection(db, "posts", postId, "comments");

    // Comment object
    const newComment = {
      text: comment.trim() || null, 
      audioURL: audioURL || null,
      userId,
      userName,
      userProfilePic,
      timestamp: serverTimestamp()
    };

    // Add comment to Firestore
    const commentDocRef = await addDoc(commentRef, newComment);

    // Increment the comment count in the post document
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });

    return { id: commentDocRef.id, ...newComment };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    await deleteDoc(commentRef);

    // 🔥 Decrement commentsCount
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      commentsCount: increment(-1),
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};


export const getComments = async (postId) => {
  try {
    const commentRef = collection(db, "posts", postId, "comments");
    const q = query(commentRef, orderBy("timestamp", "desc")); 
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
