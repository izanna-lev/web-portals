import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  itineraryDetails: { _id: "" },
  travellerDetails: {},
};

const itineraryData = createSlice({
  name: "itineraryData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.ITINERARY_DETAILS, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default itineraryData.reducer;
