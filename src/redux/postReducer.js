import { createSlice } from "@reduxjs/toolkit";

export const postIDSlice = createSlice({
  name: "postID",
  initialState: { postId: "" },
  reducers: {
    addPostID: (state, { payload }) => {
      state.postId = payload;
    },
    resetPostId: (state) => {
      state.postId = "";
    },
  },
});

export const { addPostID, resetPostId } = postIDSlice.actions;
