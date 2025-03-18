import { logout, signIn, signUp } from '@/services/authServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './userSlice';

// import { signUp, signIn, logout } from '../../services/authServices.jsx';

// Async thunk for sign-up
export const signUpUser = createAsyncThunk('auth/signUp', async ({ email, password, username }, { rejectWithValue }) => {
    try {
        const user = await signUp(email, password, username);
        localStorage.setItem('user', JSON.stringify(user));
    
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
        const user = await signIn(email, password);
    dispatch(setUser(user));
    // console.log('user info', user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue( 'Incorrect email or password');
    }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async (_,  { rejectWithValue }) => {
    try {
        await logout();
        localStorage.removeItem('user');
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isAuthenticated: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    // loading: false,
    status: 'idle'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle Sign Up
            .addCase(signUpUser.pending, (state) => {
                state.status = 'pending'
                state.error = null;
                
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
               state.status = 'succeeded'
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status= ' failed';
                state.error = action.payload;
            })

            // Handle Login
            .addCase(loginUser.pending, (state) => {
                 state.status = 'pending'
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
               state.status = 'succeeded'
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
               state.status = 'failed'
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
