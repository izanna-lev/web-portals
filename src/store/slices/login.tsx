import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  accessToken: string;
}

const initialState: LoginState = {
  accessToken: "",
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    getAccessToken: (state: LoginState, action: { payload: LoginState }) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { getAccessToken } = login.actions;

export default login.reducer;
