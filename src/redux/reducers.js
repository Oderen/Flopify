import { createSlice } from "@reduxjs/toolkit";

export const reducerSlice = createSlice({
  name: "reducer",
  initialState: [],
  reducers: {
    setReducer: (state, action) => {
      return action.payload;
    },
  },
});
