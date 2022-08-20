import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  usersData: undefined,
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.USERS, (state, { data }) => {
    Object.assign(state, {
      usersData: data,
    });
  });
});

export default reducer;
