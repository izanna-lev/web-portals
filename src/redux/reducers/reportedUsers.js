import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

// Reducer
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.REPORTED_USERS, (state, { data }) => {
    Object.assign(state, data);
  });
});

export default reducer;
