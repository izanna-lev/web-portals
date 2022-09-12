import { createSlice } from "@reduxjs/toolkit";
interface LoaderState {
  active: boolean;
}

const initialState: LoaderState = {
  active: false,
};

const loader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state: { active: boolean }, action: { payload: boolean }) => {
      Object.assign(state, { active: action.payload });
    },
  },
});

export const { setLoader } = loader.actions;

export default loader.reducer;
