import { createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    data: {
      message: string,
      type: string,
    }
}

const initialState: ErrorState = {
    data: {
      message: "",
      type: "",
    }
};

const toastError = createSlice({
  name: "toastError",
  initialState,
  reducers: {
    setError: (state, action) => {
        state.data = action.payload.data;
    },
  },
});

export const { setError } = toastError.actions

export default toastError.reducer

