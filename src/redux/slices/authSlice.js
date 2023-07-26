import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logOutUser } from "../api-operations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { login: null, email: null },
    token: null,
    isLogged: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user.login = action.payload.login;
      state.user.email = action.payload.email;
      state.token = action.payload.tokenId;
      state.isLogged = true;
      state.isRefreshing = false;
    }),
      builder.addCase(registerUser.pending, (state) => {
        state.isRefreshing = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.token = action.payload.tokenId;
        state.isLogged = true;
        state.isRefreshing = false;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isRefreshing = true;
      }),
      builder.addCase(logOutUser.fulfilled, (state) => {
        state.isLogged = false;
      });
  },
});
