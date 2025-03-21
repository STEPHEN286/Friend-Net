import { createSlice } from "@reduxjs/toolkit";
// const { create } = require("domain");



const initialState = {
    progress: 0,
    isModalOpen: false,
};

const userProgressSlice = createSlice({
    name: "userProgress",
    initialState,
    reducers: {
        setModalOpen: (state) => {
            state.isModalOpen = !state.isModalOpen;
        }
    },
});

// export const { setModalOpen } = userProgressSlice.actions;
export const userProgressSliceActions = userProgressSlice.actions;
export default userProgressSlice.reducer;