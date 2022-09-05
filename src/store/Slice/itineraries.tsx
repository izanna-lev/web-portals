import { createSlice } from "@reduxjs/toolkit";

interface listObject {
  _id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  itineraryStatus: number;
  travellerRef: string;
  specialistRef: string;
  fromDate: string;
  toDate: string;
  specificRestrictionsAndRegulations: string;
  image: string;
  isPassport: boolean;
  updatedAt: string;
  email: string;
  deleted: boolean;
  guests: number;
}

interface ItinerariesState {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: ItinerariesState = {
  list: [],
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const itineraries = createSlice({
  name: "itineraries",
  initialState,
  reducers: {
    setItineraries: (
      state: { list: listObject[]; hasMore: boolean },
      action: { payload: { data: { list: listObject[]; hasMore: boolean } } }
    ) => {
      Object.assign(state, action.payload.data);
    },
  },
});

export const { setItineraries } = itineraries.actions;

export default itineraries.reducer;
