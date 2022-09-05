import { configureStore } from "@reduxjs/toolkit";
import login from "./Slice/login";
import loader from "./Slice/loader";
import popup from "./Slice/popup";
import profile from "./Slice/profile";
import dashboard from "./Slice/dashboard";
import itineraries from "./Slice/itineraries";
import itineraryDetails from "./Slice/itineraryDetails";
import { createLogger } from "redux-logger";

export const store = configureStore({
  reducer: {
    login: login,
    loader: loader,
    popup: popup,
    profile: profile,
    dashboard: dashboard,
    itineraries: itineraries,
    itineraryDetails: itineraryDetails,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware().concat([])
      : getDefaultMiddleware().concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
