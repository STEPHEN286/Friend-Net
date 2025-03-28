import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";
  import { auth, db } from "../firebabaseConfig";
  import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
  
  export const signUp = async (email, password, username) => {
    try {
      if (!email || !password || !username) {
        throw new Error("Missing required fields. Please provide email, password, and username.");
      }
  
      if (typeof email !== "string" || typeof password !== "string" || typeof username !== "string") {
        throw new Error("Invalid input: Email, password, and username must be strings.");
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, { displayName: username });
  
      const userData = {
        uid: user.uid,
        email: user.email,
        username: username,
        profilePic: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid",
        createdAt: serverTimestamp(),
        followers: 0,
        following: 0,
        bio: "",
        isFirstTime: true,
        role: "user",
    };

      await setDoc(doc(db, "users", user.uid), userData);
  
      console.log("User saved to database:", user.uid);
      return userData;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };
  
  export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      return userDoc.data();
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };