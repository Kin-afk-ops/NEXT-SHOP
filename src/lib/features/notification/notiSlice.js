import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name: "noti",
  initialState: {
    notification: [],
    isFetching: false,
    isError: false,
  },

  reducers: {
    getNotiStart: (state) => {
      state.isFetching = true;
    },
    getNotiSuccess: (state, action) => {
      state.isFetching = false;
      state.notification = action.payload;
    },
    getNotiFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    logoutNoti: (state) => {
      state.isFetching = false;
      state.notification = [];
    },
  },
});

export const { getNotiStart, getNotiSuccess, getNotiFailure, logoutNoti } =
  notiSlice.actions;

export default notiSlice.reducer;
