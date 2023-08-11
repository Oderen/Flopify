import { createSlice } from "@reduxjs/toolkit";
import { publishPost, fetchPosts } from "../api-operations";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], isLoading: false },
  extraReducers: (builder) => {
    // FetchAll
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    }),
      builder.addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      });
    // AddPost
    builder.addCase(publishPost.fulfilled, (state) => {
      state.isLoading = false;
    }),
      builder.addCase(publishPost.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(publishPost.pending, (state) => {
        state.isLoading = true;
      });
  },
});
