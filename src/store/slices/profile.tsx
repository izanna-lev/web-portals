import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface Profile {
  name: string;
  email: string;
  phoneNumber: string;
  picture: string;
  device: string;
  fcmToken: string;
  _id: string;
  access?: {
    createItinerary: boolean
    deleteItinerary: boolean
    editItinerary: boolean
    sendNotifications: boolean
  }
}

const initialState: Profile = {
  name: "",
  email: "",
  phoneNumber: "",
  picture: "",
  device: "",
  fcmToken: "",
  _id: "",
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(API.PROFILE, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
