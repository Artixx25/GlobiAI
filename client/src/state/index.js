import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    likes: [],
  };
  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
        setUser: (state, action) => {
          state.user = action.payload.user;
        },
        setLogout: (state) => {
          state.user = null;
          state.token = null;
        },
        setPosts: (state, action) => {
          state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) return action.payload.post;
            return post;
          });
          state.posts = updatedPosts;
        },
      },
    });
    
    export const { setLogin, setLogout, setPosts, setPost, setUser } = authSlice.actions;
    export default authSlice.reducer;