import { logout, signIn, signUp } from '@/services/authServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for sign up
export const signUpUser = createAsyncThunk('auth/signUp', async ({ email, password, username }, { rejectWithValue }) => {
    try {
        const user = await signUp(email, password, username);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for login
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const user = await signIn(email, password);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue('Incorrect email or password');
    }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await logout();
        localStorage.removeItem('user');
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Initial state
const getUserFromStorage = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
};

const initialState = {
    isAuthenticated: !!localStorage.getItem('user'),
    user: getUserFromStorage(),
    error: null,
    status: 'idle'
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Sign Up
            .addCase(signUpUser.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle Login
            .addCase(loginUser.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
