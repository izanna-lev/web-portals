import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import * as reducers from "./slices";

export const store = configureStore({
  reducer: {
    allTickets: reducers.allTickets,
    apiMessage: reducers.apiMessage,
    appData: reducers.appData,
    dashboard: reducers.dashboard,
    itineraries: reducers.itineraries,
    itinerary: reducers.itinerary,
    loader: reducers.loader,
    login: reducers.login,
    navigation: reducers.navigation,
    profile: reducers.profile,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware().concat([])
      : getDefaultMiddleware().concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
