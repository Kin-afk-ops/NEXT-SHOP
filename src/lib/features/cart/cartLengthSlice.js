import { createSlice } from "@reduxjs/toolkit";

const cartLengthSlice = createSlice({
  name: "cartLength",
  initialState: {
    length: 0,
    isFetching: false,
    isError: false,
  },

  reducers: {
    getCartStart: (state) => {
      state.isFetching = true;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.length = action.payload;
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    increaseCart: (state) => {
      state.length++;
    },

    reduceCart: (state) => {
      state.length--;
    },

    logoutCart: (state) => {
      state.isFetching = false;
      state.length = 0;
    },
  },
});

export const {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  logoutCart,
  increaseCart,
  reduceCart,
} = cartLengthSlice.actions;

export default cartLengthSlice.reducer;
