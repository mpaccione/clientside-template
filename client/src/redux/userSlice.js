import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    user: {
      username: null,
      email: null,
      password: null,
      userId: null,
      admin: null,
      id: null,
      createdAt: null,
      updatedAt: null,
    },
    token: null,
  },
};

const mySlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // Generic Errors for AJAX
    setUserData: (state, action) => {
      state.userData.user = action.payload.user;
      state.userData.token = action.payload.token;
      return state;
    },
  },
});

export const { setUserData } = mySlice.actions;
export default mySlice.reducer;
