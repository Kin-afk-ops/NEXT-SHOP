import { createSlice } from "@reduxjs/toolkit";

const formLoginSlice = createSlice({
  name: "formLogin",
  initialState: {
    on: false,
  },

  reducers: {
    turnOn: (state) => {
      state.on = true;
    },
    turnOff: (state) => {
      state.on = false;
    },
  },
});

export const { turnOn, turnOff } = formLoginSlice.actions;

export default formLoginSlice.reducer;
