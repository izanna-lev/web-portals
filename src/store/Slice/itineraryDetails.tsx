import { createSlice } from "@reduxjs/toolkit";

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

interface ItinerariesState {
  data: detailsObject;
}

const initialState: ItinerariesState = {
  data: {},
};

const itineraryDetails = createSlice({
  name: "itineraryDetails",
  initialState,
  reducers: {
    setItineraryDetails: (
      state: { data: detailsObject },
      action: { payload: detailsObject }
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setItineraryDetails } = itineraryDetails.actions;

export default itineraryDetails.reducer;
