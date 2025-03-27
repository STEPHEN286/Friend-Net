import { db } from "@/firebabaseConfig";
import { doc, getDoc, collection, getDocs, query, } from "firebase/firestore";

// Helper function to convert Firestore timestamp
const convertTimestamp = (timestamp) => {
  if (!timestamp) return null;
  return timestamp.toMillis(); // Convert to milliseconds
};

// Helper to convert Firestore document
const convertDoc = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt)
  };
};

export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Updated getAllUsers function
export const getAllUsers = async (currentUserId) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUserId) {
        users.push(convertDoc(doc));
      }
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


