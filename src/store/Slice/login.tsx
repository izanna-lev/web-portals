import { createSlice } from "@reduxjs/toolkit";

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
    getAccessToken: (state: { accessToken: string; }, action: { payload: { accessToken: string; }; }) => {
      console.log(action)
        state.accessToken = action.payload.accessToken;
    },
  },
});

export const { getAccessToken } = login.actions

export default login.reducer

