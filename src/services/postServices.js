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
} from "firebase/firestore";
import { uploadToCloudinary } from './uploadService';

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
    const postRef = doc(db, "posts", postId);
    const commentRef = collection(postRef, "comments");

    const newComment = {
      text: comment.trim() || null, // Store null if no text
      audioURL: audioURL || null,  // Store null if no audio
      // timestamp: serverTimestamp(),
      userId,
      userName,
    };

    await addDoc(commentRef, {...newComment, timestamp: serverTimestamp()});
    const commentDocRef = await addDoc(commentRef, newComment);
    await updateDoc(postRef, {
      comments: arrayUnion({ id: commentDocRef.id, ...newComment }),
    });
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