import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    profilePic: "",
    name: "",
    id: "",
  },
  reducers: {
    login(state, action) {
      state.logged = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    logout(state, action) {
      state.logged = false;
      state.id = "";
      (state.name = ""), (state.profilePic = "");
    },
    updateData(state, action) {
      state.name = action.payload.name;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

export const { login, logout, updateData } = authSlice.actions;
