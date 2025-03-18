import { db } from "@/firebabaseConfig";
import { doc, getDoc } from "firebase/firestore";

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