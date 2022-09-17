import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travellerRef: "",
  formRef: "",
};

const appData = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setTravellerRef: (state, action) => {
      state.travellerRef = action.payload;
    },
    setFormRef: (state, action) => {
      state.formRef = action.payload;
    },
  },
});

export const { setTravellerRef, setFormRef } = appData.actions;

export default appData.reducer;
