import { createSlice } from "@reduxjs/toolkit";
import { reset } from "./api-operations";

import "react-native-get-random-values";

export const postIDSlice = createSlice({
  name: "postID",
  initialState: { postId: "", isIdReseted: "", isUpdating: false },
  reducers: {
    addPostID: (state, { payload }) => {
      state.postId = payload;
    },
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset.fulfilled, (state) => {
      state.postId = "";
      state.isUpdating = false;
    }),
      builder.addCase(reset.pending, (state) => {
        state.isUpdating = true;
      });
  },
});

export const { addPostID, resetPostId } = postIDSlice.actions;
