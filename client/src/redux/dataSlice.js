import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const mySlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
});

export const { setData } = mySlice.actions;
export default mySlice.reducer;
