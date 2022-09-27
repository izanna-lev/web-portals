import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";
import { RESERVATION_TYPE } from "../../constants";

const initialState: any = {
  accomodation: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  restaurant: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  activity: { list: [], page: 0, limit: 10, total: 0, size: 0 },
};

const transportation = createSlice({
  name: "transportation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.RESERVATION_LIST, (state, action: any) => {
      if (action.payload.reservationType === RESERVATION_TYPE.ACCOMMODATION)
        state.accomodation = action.payload;
      if (action.payload.reservationType === RESERVATION_TYPE.ACTIVITY)
        state.activity = action.payload;
      if (action.payload.reservationType === RESERVATION_TYPE.RESTAURANT)
        state.restaurant = action.payload;
    });
  },
});

export default transportation.reducer;
