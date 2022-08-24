import { createSlice } from "@reduxjs/toolkit";
interface LoaderState {
    value: boolean;
}

const initialState: LoaderState = {
    value: false
};

const loader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const { setLoader } = loader.actions

export default loader.reducer

