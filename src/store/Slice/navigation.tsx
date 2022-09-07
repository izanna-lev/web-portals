import { createSlice } from "@reduxjs/toolkit";

interface Navigation {
  value: number;
}

const initialState: Navigation = {
  value: 1,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    SET_NAVIGATION: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { SET_NAVIGATION } = navigationSlice.actions;

export default navigationSlice.reducer;
