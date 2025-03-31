import { db } from "@/firebabaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp, 
  getDoc,
  updateDoc,
  doc,
  increment,
  setDoc
} from "firebase/firestore";


// const batch = writeBatch(db)
const convertTimestamp = (timestamp) => {
  if (!timestamp) return null;
  return timestamp.toMillis();
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

export const sendFriendRequest = async (senderId, receiverId) => {
  try {
  
    const requestsRef = collection(db, "friend_requests");
    const q = query(
      requestsRef,
      where("senderId", "==", senderId),
      where("receiverId", "==", receiverId),
      where("status", "==", "pending")
    );


    // console.log (q)

    const existingRequests = await getDocs(q);

    if (!existingRequests.empty) {
      throw new Error("Friend request already sent");
    }

    // Create new friend request
    const friendRequest = {
      senderId,
      receiverId,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    await addDoc(requestsRef, friendRequest);
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const getFriendRequests = async (userId) => {
  try {
    const requestsRef = collection(db, "friend_requests");
    const receivedQuery = query(
      requestsRef,
      where("receiverId", "==", userId),
      where("status", "==", "pending")
    );

    const sentQuery = query(
      requestsRef,
      where("senderId", "==", userId),
      where("status", "==", "pending")
    );

    const [receivedSnapshot, sentSnapshot] = await Promise.all([
      getDocs(receivedQuery),
      getDocs(sentQuery)
    ]);

    console.log(" received", receivedSnapshot)

    const received = receivedSnapshot.docs.map(doc => convertDoc(doc));
    const sent = sentSnapshot.docs.map(doc => convertDoc(doc));

    return { received, sent };
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return { received: [], sent: [] };
  }
};

export const acceptFriendRequest = async (requestId) => {
  try {
    const requestRef = doc(db, "friend_requests", requestId);
    const requestSnap = await getDoc(requestRef);

    if (!requestSnap.exists()) {
      throw new Error("Friend request not found");
    }

    const { senderId, receiverId, status } = requestSnap.data();
    
    // Ensure the request is pending before accepting
    if (status !== "pending") {
      throw new Error("Friend request is not pending");
    }

    // Step 1: Update request status (only the receiver can do this)
    await updateDoc(requestRef, { 
      status: "accepted",
      // updatedAt: serverTimestamp()
    });

    // Step 2: Add both friends (using setDoc to ensure atomic operations)
    const friendsCollectionName = "friends";
    await Promise.all([
      setDoc(doc(db, friendsCollectionName, `${senderId}_${receiverId}`), {
        userId: senderId,
        friendId: receiverId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }),
      setDoc(doc(db, friendsCollectionName, `${receiverId}_${senderId}`), {
        userId: receiverId,
        friendId: senderId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    ]);

    // Step 3: Update followers and following counts
    await Promise.all([
      updateDoc(doc(db, "users", senderId), { 
        following: increment(1), 
        followers: increment(1),
        updatedAt: serverTimestamp()
      }),
      updateDoc(doc(db, "users", receiverId), { 
        followers: increment(1), 
        following: increment(1),
        updatedAt: serverTimestamp()
      })
    ]);

    console.log("Friend request accepted successfully");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

export const declineFriendRequest = async (requestId) => {
  // Implement the logic to decline a friend request

};

export const getFollowers = async (userId) => {
  try {
    const friendsRef = collection(db, "friends");
    const q = query(friendsRef, where("friendId", "==", userId));
    const snapshot = await getDocs(q);
    
    const followerIds = snapshot.docs.map(doc => doc.data().userId);
    const followers = await Promise.all(
      followerIds.map(async (id) => {
        const userDoc = await getDoc(doc(db, "users", id));
        return { id, ...userDoc.data() };
      })
    );
    
    return followers;
  } catch (error) {
    console.error("Error getting followers:", error);
    return [];
  }
};

export const getFollowing = async (userId) => {
  try {
    const friendsRef = collection(db, "friends");
    const q = query(friendsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    const followingIds = snapshot.docs.map(doc => doc.data().friendId);
    const following = await Promise.all(
      followingIds.map(async (id) => {
        const userDoc = await getDoc(doc(db, "users", id));
        return { id, ...userDoc.data() };
      })
    );
    
    return following;
  } catch (error) {
    console.error("Error getting following:", error);
    return [];
  }
};

