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
  writeBatch,
  increment
} from "firebase/firestore";


const batch = writeBatch(db)
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
  // Implement the logic to accept a friend request
  console.log(requestId)
    try {
      const requestRef = doc(db, "friend_requests", requestId);
      const requestSnap = await getDoc(requestRef)

    if (!requestSnap.exists()){
      throw new Error ("friend request not found ");
    }

    const {senderId, receiverId} = requestSnap.data();


    batch.update(requestRef, {status: "accepted"})

    const friendsCollectionName = "friends"
    const senderRef = doc(db, friendsCollectionName, `${senderId}_${receiverId}`);
    const receiverRef = doc(db, friendsCollectionName, `${receiverId}_${senderId}`);

    
    batch.set(senderRef, {
      userId: senderId,
      friendId: receiverId,
      createdAt: serverTimestamp(),
    });

    batch.set(receiverRef, {
      userId: receiverId,
      friendId: senderId,
      createdAt: serverTimestamp(),
    });
    const senderRefUser = doc(db, "users", senderId);
    const receiverRefUser = doc(db, "users", receiverId);

    batch.update(senderRefUser, { following: increment(1), followers: increment(1) }); 
    batch.update(receiverRefUser, { followers: increment(1), following: increment(1) })
    await batch.commit();
    console.log("Friend request accepted successfully");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
      
   

};





export const declineFriendRequest = async (requestId) => {
  // Implement the logic to decline a friend request

};

