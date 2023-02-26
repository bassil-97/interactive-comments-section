import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    name: "Bassil Alqadi",
    userId: "63f8b133c568c8b6a37d98c3",
  },
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { logInOut } = authSlice.actions;

export default authSlice.reducer;
