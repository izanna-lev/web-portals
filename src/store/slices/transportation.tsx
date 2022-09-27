import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";
import { TRANSPORTATION_TYPE } from "../../constants";

const initialState: any = {
  flight: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  train: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  ferry: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  car: { list: [], page: 0, limit: 10, total: 0, size: 0 },
};

const transportation = createSlice({
  name: "transportation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.TRANSPORTATION_DATA, (state, action: any) => {
      if (action.payload.transportationType === TRANSPORTATION_TYPE.FLIGHT)
        state.flight = action.payload;
      if (action.payload.transportationType === TRANSPORTATION_TYPE.FERRY)
        state.ferry = action.payload;
      if (action.payload.transportationType === TRANSPORTATION_TYPE.TRAIN)
        state.train = action.payload;
      if (action.payload.transportationType === TRANSPORTATION_TYPE.CAR)
        state.car = action.payload;
    });
  },
});

export default transportation.reducer;
