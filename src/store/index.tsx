import { configureStore } from "@reduxjs/toolkit";
import login from "./Slice/login";
import loader from "./Slice/loader";
import popup from "./Slice/popup";
import profile from "./Slice/profile";

export const store = configureStore({
  reducer: {
    login: login,
    loader: loader,
    popup: popup,
    profile: profile
  },
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>


