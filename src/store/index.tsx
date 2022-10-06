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
    chatList: reducers.chatList,
    messageList: reducers.messageList,
    socket: reducers.socket,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredPaths: ["socket.socket"],
          },
        }).concat([])
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredPaths: ["socket.socket"],
          },
        }).concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
