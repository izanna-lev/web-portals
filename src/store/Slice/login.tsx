import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../index'
interface LoginState {
    accessToken: string;
}

const initialState: LoginState = {
    accessToken: ""
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    getAccessToken: (state, action) => {
      console.log(action)
        state.accessToken = action.payload.accessToken;
    },
  },
});

export const { getAccessToken } = login.actions

export default login.reducer

