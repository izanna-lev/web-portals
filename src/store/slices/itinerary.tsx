import { createSlice } from "@reduxjs/toolkit";
import { API, RESERVATION_TYPE } from "../../constants";
import { TRANSPORTATION_TYPE } from "../../constants";

const initialState: any = {
  flight: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  train: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  ferry: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  car: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  accomodation: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  restaurant: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  activity: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  notes: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  trip: { list: [], page: 0, limit: 10, total: 0, size: 0 },
  days: { list: [] },
  itineraryDetails: { _id: "" },
  travellerDetails: {},
  details: false,
  _id: "",
};

const itinerary = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    EDIT_ACTIVITY: (state, action) => {
      state.activity.list = action.payload;
    },

    EDIT_NOTES: (state, action) => {
      state.notes.list = action.payload;
    },
    INITIAL_STATE: (state, action) => {
      Object.assign(state, { ...initialState });
    },
  },
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
    builder.addCase(API.RESERVATION_LIST, (state, action: any) => {
      if (action.payload.reservationType === RESERVATION_TYPE.ACCOMMODATION)
        state.accomodation = action.payload;
      if (action.payload.reservationType === RESERVATION_TYPE.ACTIVITY)
        state.activity = action.payload;
      if (action.payload.reservationType === RESERVATION_TYPE.RESTAURANT)
        state.restaurant = action.payload;
    });
    builder.addCase(API.NOTES_LIST, (state, action: any) => {
      state.notes = action.payload;
    });
    builder.addCase(API.TRIP_LIST, (state, action: any) => {
      state.trip = action.payload;
    });
    builder.addCase(API.DAYS_LIST, (state, action: any) => {
      state.days.list = action.payload;
    });
    builder.addCase(API.ITINERARY_DETAILS, (state, action: any) => {
      Object.assign(state, { ...action.payload });
    });
  },
});

export const { EDIT_ACTIVITY, EDIT_NOTES, INITIAL_STATE } = itinerary.actions;

export default itinerary.reducer;
