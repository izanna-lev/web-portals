import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  groupsData: {
    list: [],
    page: 0,
    limit: 10,
  },
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.GROUP_LIST, (state, { data }) => {
    Object.assign(state, {
      groupsData: data,
    });
  });
});

export default reducer;
