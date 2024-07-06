import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isShowed: false,
};
const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setIsShowed(state) {
      state.isShowed = !state.isShowed;
    },
  },
});
export const { setIsShowed } = stepsSlice.actions;
export default stepsSlice.reducer;
