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
} from "firebase/firestore";

export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async ({ content, userId, userName }) => {
  try {
    const postRef = collection(db, "posts");

    const newPost = {
      content,
      userId,
      userName,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    };

    const docRef = await addDoc(postRef, newPost);
    return { id: docRef.id, ...newPost };
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

export const addComment = async (postId, comment, userId, userName) => {
  if (!postId || !comment.trim() || !userId || !userName) {
    throw new Error("Invalid input: postId, comment, userId, and userName are required.");
  }

  try {
    const postRef = doc(db, "posts", postId);
    const commentRef = collection(postRef, "comments");

    const newComment = {
      text: comment,
      timestamp: serverTimestamp(),
      userId,
      userName,
    };

    await addDoc(commentRef, newComment);
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const commentRef = collection(postRef, "comments");
    const querySnapshot = await getDocs(commentRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};