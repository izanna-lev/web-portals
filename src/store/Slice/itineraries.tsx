import { createSlice } from "@reduxjs/toolkit";

interface listObject {
  _id: string,
  name: string,
  price: number
  description: string,
  duration: string,
  itineraryStatus: number,
  travellerRef: string,
  specialistRef: string,
  fromDate: string,
  toDate: string,
  specificRestrictionsAndRegulations: string,
  image: string,
  isPassport: boolean,
  updatedAt: string,
  email: string,
  deleted: boolean
  guests:  number
}

interface ItinerariesState {
    list: listObject[],
      hasMore: boolean
};

const initialState: ItinerariesState = {
    list: [],
    hasMore: false
};

const itineraries = createSlice({
  name: "itineraries",
  initialState,
  reducers: {
    setItineraries: (state: { list: listObject[], hasMore: boolean } , action: { payload: { data: { list: listObject[], hasMore: boolean}} }) => {
      console.log(state)
         state.list = action.payload.data.list;
         state.hasMore = action.payload.data.hasMore;

    },
  },
});

export const { setItineraries } = itineraries.actions

export default itineraries.reducer

