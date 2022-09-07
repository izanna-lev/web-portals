import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface detailsObject {
  name?: string;
  _id?: string;
  price?: number;
  description?: string;
  duration?: string;
  itineraryStatus?: number;
  travellerRef?: string;
  specialistRef?: string;
  fromDate?: string;
  toDate?: string;
  specificRestrictionsAndRegulations?: string;
  image?: string;
  isPassport?: boolean;
  updatedAt?: string;
  email?: string;
  deleted?: boolean;
  guests?: number;
}

const initialState: detailsObject = {};

const itineraryDetails = createSlice({
  name: "itineraryDetails",
  initialState,
  reducers: {
    setItineraryDetails: (
      state: detailsObject,
      action: { payload: detailsObject }
    ) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(API.ITINERARY_DETAILS, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export const { setItineraryDetails } = itineraryDetails.actions;

export default itineraryDetails.reducer;
