import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../index'
interface LoginState {
    value: boolean;
}

const initialState: LoginState = {
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

export const loaderView = (state: RootState) => state.loader.value

export default loader.reducer

