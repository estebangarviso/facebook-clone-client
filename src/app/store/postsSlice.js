import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, addPost } from '../../services/PostService';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    hasMore: true,
    pageNumber: 0,
    pageSize: 0,
    status: 'idle', // idle, loading, succeeded, failed
    data: [],
    error: null // null or error message
  },
  reducers: {
    postAdded: (state, action) => {
      state.data.unshift(action.payload);
    },
    postUpdated: (state, action) => {
      state.data = state.data.map((post) => (post._id === action.payload._id ? action.payload : post));
    },
    postDeleted: (state, action) => {
      state.data = state.data.filter((post) => post._id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // const loadedPosts = action.payload.map((post) => {
        //   post.createdAt = new Date(post.createdAt);
        //   return post;
        // });
        // state.data = state.data.concat(loadedPosts);
        // const loadedPosts = posts.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)); // sorted from backend
        state.data = [...state.data, ...action.payload.posts];
        state.hasMore = action.payload.hasMore;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('posts/add action.payload', action.payload);
        state.data.push(action.payload);
      });
  }
});

// Selectors
export const selectPosts = (state) => state.posts.data;
export const selectHasMore = (state) => state.posts.hasMore;
export const selectPageNumber = (state) => state.posts.pageNumber;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post._id === postId);

// Action creators are generated for each case reducer function
export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
