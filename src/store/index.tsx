import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import * as reducers from "./Slice/AllReducers";

export const store = configureStore({
  reducer: {
    dashboard: reducers.dashboard,
    itineraries: reducers.itineraries,
    itineraryDetails: reducers.itineraryDetails,
    loader: reducers.loader,
    login: reducers.login,
    popup: reducers.popup,
    profile: reducers.profile,
    navigation: reducers.navigation,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware().concat([])
      : getDefaultMiddleware().concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
