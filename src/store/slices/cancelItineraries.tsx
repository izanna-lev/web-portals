import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  image: string;
  blocked: boolean;
  guests: number;
  assignedDate: string;
  channelRef: string;
}

interface CancelItineraryRequests {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: CancelItineraryRequests = {
  list: [],
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const cancelItineraryList = createSlice({
  name: "specialist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.ITINERARY_CANCEL_REQUESTS, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default cancelItineraryList.reducer;
