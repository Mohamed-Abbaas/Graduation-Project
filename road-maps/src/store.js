import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./components/Companies/Steps/stepsSlice";
import { useReducer } from "react";
import userSlice from "./Features/userSlice";
const store = configureStore({
  reducer: {
    steps: stepsReducer,
    user: userSlice,
  },
});
export default store;
