import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isError: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.currentUser = action.payload;
      window.localStorage.setItem("token", state.currentUser.accessToken);
      window.location.reload();
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    logout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      window.localStorage.removeItem("token");
    },
    resetState: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isError = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, resetState } =
  userSlice.actions;

export default userSlice.reducer;
