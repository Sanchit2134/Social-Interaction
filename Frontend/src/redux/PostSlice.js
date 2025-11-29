import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],   
        selectedPost: null,
    },
    reducers: {
        setPost: (state, action) => {
            state.posts = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        }
    }
})

export const { setPost, setSelectedPost } = PostSlice.actions;
export default PostSlice.reducer;