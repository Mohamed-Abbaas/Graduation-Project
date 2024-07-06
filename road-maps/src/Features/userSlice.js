import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageUrl: "",
  verifiedAsExpert: false,
  name: "",
  email: "",
  role: "",
  id: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: {
      prepare(name, image, email, role, verifiedAsExpert, id) {
        return {
          payload: { name, image, email, role, verifiedAsExpert, id },
        };
      },
      reducer(state, action) {
        state.imageUrl = action.payload.image;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.verifiedAsExpert = action.payload.verifiedAsExpert;
        state.id = action.payload.id;
      },
    },
    updateUser: {
      prepare(name, email) {
        return {
          payload: { name, email },
        };
      },
      reducer(state, action) {
        state.name = action.payload.name;
        state.email = action.payload.email;
      },
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { createUser, reset, updateUser } = userSlice.actions;
export default userSlice.reducer;
