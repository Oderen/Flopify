import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSlice } from "./slices/authSlice";
import { postsSlice } from "./slices/postsSlice";
import { postIDSlice } from "./postReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistConfigTwo = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["postId"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
const persistedReducer = persistReducer(persistConfigTwo, postIDSlice.reducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    posts: postsSlice.reducer,
    postID: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
