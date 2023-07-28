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
    // register
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
      builder.addCase(registerUser.rejected, (state) => {
        state.isRefreshing = false;
      }),
      // login
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user.login = action.payload.login;
        state.user.email = action.payload.email;
        state.token = action.payload.tokenId;
        state.isLogged = true;
        state.isRefreshing = false;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isRefreshing = true;
      }),
      builder.addCase(loginUser.rejected, (state) => {
        state.isRefreshing = false;
      }),
      //logOut
      builder.addCase(logOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLogged = false;
        state.isRefreshing = false;
      }),
      builder.addCase(logOutUser.pending, (state) => {
        state.isRefreshing = true;
      }),
      builder.addCase(logOutUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});
