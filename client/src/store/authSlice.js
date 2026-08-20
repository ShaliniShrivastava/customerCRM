import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authLoading = false;
    },

    clearUser: (state) => {
      state.user = null;
      state.authLoading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
