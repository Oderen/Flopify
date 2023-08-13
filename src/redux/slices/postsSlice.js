import { createSlice } from "@reduxjs/toolkit";
import {
  publishPost,
  fetchPosts,
  getPostData,
  addComment,
} from "../api-operations";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    isLoading: false,
    isPostPublished: "",
    isCommentSent: "",
    locCoords: {},
  },
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
    // getPostData
    builder.addCase(getPostData.fulfilled, (state, action) => {
      state.locCoords = action.payload.locCoords;
      state.isLoading = false;
    }),
      builder.addCase(getPostData.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getPostData.pending, (state) => {
        state.isLoading = true;
      });
    // publishPost
    builder.addCase(publishPost.fulfilled, (state) => {
      state.isLoading = false;
      state.isPostPublished = uuidv4();
    }),
      builder.addCase(publishPost.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(publishPost.pending, (state) => {
        state.isLoading = true;
      }),
      // fdfs
      builder.addCase(addComment.fulfilled, (state) => {
        state.isCommentSent = uuidv4();
      });
  },
});
