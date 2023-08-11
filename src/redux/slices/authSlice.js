import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logOutUser,
  redirectingUser,
  addPhoto,
} from "../api-operations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { login: null, email: null, photo: null },
    token: null,
    isLogged: false,
    isRefreshing: false,
  },
  reducers: {
    resetPhoto: (state) => {
      state.user.photo = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user.login = action.payload.login;
      state.user.email = action.payload.email;
      state.user.photo = action.payload.image;
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
        state.user.photo = action.payload.image;
        state.token = action.payload.tokenId;
        state.isLogged = true;
        state.isRefreshing = false;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isRefreshing = true;
      }),
      builder.addCase(loginUser.rejected, (state) => {
        state.user.login = null;
        state.user.email = null;
        state.user.photo = null;
        state.token = null;
        state.isLogged = false;
        state.isRefreshing = false;
      }),
      //logOut
      builder.addCase(logOutUser.fulfilled, (state) => {
        state.user = { login: null, email: null, photo: null };
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
    // Redirecting User
    builder.addCase(redirectingUser.fulfilled, (state, action) => {
      state.user.login = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.photo = action.payload.image;
      state.token = action.payload.accessToken;
      state.isLogged = false;
      state.isRefreshing = false;
    });
    builder.addCase(redirectingUser.pending, (state) => {
      state.isRefreshing = true;
    });
    builder.addCase(redirectingUser.rejected, (state) => {
      state.user.login = null;
      state.user.email = null;
      state.token = null;
      state.isLogged = false;
      state.isRefreshing = false;
    });
    // addPhoto
    builder.addCase(addPhoto.fulfilled, (state, action) => {
      state.user.photo = action.payload;
      state.isRefreshing = false;
    });
    builder.addCase(addPhoto.rejected, (state) => {
      state.isRefreshing = false;
    });
    builder.addCase(addPhoto.pending, (state) => {
      state.isRefreshing = true;
    });
  },
});

export const { resetPhoto } = authSlice.actions;
