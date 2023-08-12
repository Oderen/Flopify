import { createSlice } from "@reduxjs/toolkit";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const postIDSlice = createSlice({
  name: "postID",
  initialState: { postId: "", isIdReseted: "" },
  reducers: {
    addPostID: (state, { payload }) => {
      state.postId = payload;
    },
    resetPostId: (state) => {
      state.postId = "";
      state.isIdReseted = uuidv4();
    },
  },
  extraReducers: (builder) => {},
});

export const { addPostID, resetPostId } = postIDSlice.actions;
