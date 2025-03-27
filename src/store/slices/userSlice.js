import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '@/services/userServices';
import { 
  getFriendRequests, 
  sendFriendRequest, 
  acceptFriendRequest, 
  declineFriendRequest 
} from '@/services/friendServices';

const initialState = {
  users: [],
  friendRequests: {
    received: [],
    sent: []
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (currentUserId) => {
    const users = await getAllUsers(currentUserId);
    return users;
  }
);

// Async thunk for fetching friend requests
export const fetchFriendRequests = createAsyncThunk(
  'users/fetchFriendRequests',
  async (userId) => {
    const requests = await getFriendRequests(userId);
    return requests;
  }
);

// New thunks for friend requests
export const sendRequest = createAsyncThunk(
  'users/sendRequest',
  async ({ currentUserId, friendId }, { dispatch }) => {
    await sendFriendRequest(currentUserId, friendId);
    // Refresh friend requests after sending
    dispatch(fetchFriendRequests(currentUserId));
  }
);

export const acceptRequest = createAsyncThunk(
  'users/acceptRequest',
  async ({ requestId, currentUserId }, { dispatch }) => {
    await acceptFriendRequest(requestId);
  
    dispatch(fetchFriendRequests(currentUserId));
  }
);

export const declineRequest = createAsyncThunk(
  'users/declineRequest',
  async ({ requestId, currentUserId }, { dispatch }) => {
    await declineFriendRequest(requestId);
    // Refresh friend requests after declining
    dispatch(fetchFriendRequests(currentUserId));
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchFriendRequests
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
      });
  }
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer; 