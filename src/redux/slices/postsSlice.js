import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../api-operations";
import { isLoaded } from "expo-font";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], isLoading: false },
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state, action) => {
      return {
        items: [...state.items, action.payload],
        isLoading: false,
      };
    }),
      builder.addCase(addPost.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(addPost.pending, (state) => {
        state.isLoading = true;
      });
  },
});
