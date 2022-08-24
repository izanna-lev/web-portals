import { createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    value: String;
}

const initialState: ErrorState = {
    value: ""
};

const toastError = createSlice({
  name: "toastError",
  initialState,
  reducers: {
    setError: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const { setError } = toastError.actions

export default toastError.reducer

