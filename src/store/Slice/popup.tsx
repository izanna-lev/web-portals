import { createSlice } from "@reduxjs/toolkit";

interface Popup {
    data: {
      message: string,
      type: string,
    }
}

const initialState: Popup = {
    data: {
      message: "",
      type: "",
    }
};

const popup = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, action) => {
        state.data = action.payload.data;
    },
  },
});

export const { setPopup } = popup.actions

export default popup.reducer

