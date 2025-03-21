import { addComment, getComments } from "@/services/postServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (postId, { rejectWithValue }) => {
      try {
          const comments = await getComments(postId);
          return {postId, comments};
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const submitComment = createAsyncThunk(
    "comments/submitComment",
    async ({ postId, commentText, userId, username, audioURL }, { dispatch, rejectWithValue }) => {
      try {
       const comment = await addComment(postId, commentText, userId, username, audioURL);
        dispatch(fetchComments(postId)); 
        return{postId, comment}
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  const initialState = {
    commentsByPostId: {},
   status: "idle",
    error: null,
  };

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.comments = action.payload;
            const { postId, comments } = action.payload;
  state.commentsByPostId[postId] = comments;

        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        .addCase(submitComment.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(submitComment.fulfilled, (state, action) => {
            state.status = "succeeded"; 
            

            const { postId, comment } = action.payload;

  if (!state.commentsByPostId[postId]) {
    state.commentsByPostId[postId] = [];
  }

  // Add the new comment to the array
  state.commentsByPostId[postId].push(comment);
        })
        .addCase(submitComment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            

        })
    
  }
})
export default commentSlice.reducer;
