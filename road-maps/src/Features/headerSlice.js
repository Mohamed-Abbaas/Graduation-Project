import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isClicked: false,
};
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsClicked(state) {
      state.isClicked = !state.isClicked;
    },
  },
});
