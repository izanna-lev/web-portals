import { createSlice } from "@reduxjs/toolkit";

interface Popup {
  message: string;
  type: string;
}

const initialState: Popup = {
  message: "",
  type: "",
};

const popup = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setApiMessage: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setApiMessage } = popup.actions;

export default popup.reducer;
