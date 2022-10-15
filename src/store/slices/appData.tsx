import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travellerRef: "",
  formRef: "",
  sidebarSmall: window.innerWidth <= 1280 ? true : false,
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
    setSidebar: (state, action) => {
      state.sidebarSmall = action.payload;
    },
  },
});

export const { setTravellerRef, setFormRef, setSidebar } = appData.actions;

export default appData.reducer;
