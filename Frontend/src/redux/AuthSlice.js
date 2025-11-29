import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUsers: [], // Ensure this is an array
        userProfile: null,
        selectedUser: null
    }, 
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;    
        },
        setSuggestedUser: (state, action) => {
            state.suggestedUsers = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const { setAuthUser, setSuggestedUser, setUserProfile, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;