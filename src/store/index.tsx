import { configureStore } from "@reduxjs/toolkit";
import login from "./Slice/login";
import loader from "./Slice/loader";
import toastError from "./Slice/error";

export const store = configureStore({
  reducer: {
    login: login,
    loader: loader,
    toastError: toastError
  },
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>


