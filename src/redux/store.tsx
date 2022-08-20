/**
 * The application store
 * @author Sahil Siddiqui
 * @since 1st January 2021
 */

import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from "redux-logger";
// import { routerReducer } from "react-router-redux";
import * as reducers from "./reducers";

console.log(">>>>>>reducers>>>", reducers)
export default function configureAppStore(initialState = {}) {
  const store = configureStore({
    reducer: {
      // apiMessage: reducers.apiMessage,
      // appDetails: reducers.appDetails,
      dashboard: reducers.dashboard,
      // error: reducers.error,
      // faqs: reducers.faqs,
      // faqAddState: reducers.faqAddState,
      fetching: reducers.fetch,
      // groups: reducers.groups,
      login: reducers.login,
      // navigation: reducers.navigation,
      // routing: routerReducer,
      // reportedUsers: reducers.reportedUsers,
      // settingsState: reducers.settingsState,
      // sidebar: reducers.sidebar,
      // switchNotificationsState: reducers.switchNotificationsState,
      // users: reducers.users,
      // placeId: reducers.placeId,
      // placeDetails: reducers.placeDetails,
      // googlePlace: reducers.googlePlace,
    },
    devTools: process.env.NODE_ENV !== "production",
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(
    //     process.env.NODE_ENV === "production" ? [] : createLogger()
    //   ),
    // initialState = [],
  });
  return store;
}
