import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface Profile {
  phoneCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  device: string;
  fcmToken: string;
  _id: string;
  access: {
    createItinerary: boolean;
    deleteItinerary: boolean;
    editItinerary: boolean;
    sendNotifications: boolean;
    cancelItinerary: boolean;
  };
}

const initialState: Profile = {
  phoneCode: "",
  name: "",
  email: "",
  phoneNumber: "",
  image: "",
  device: "",
  fcmToken: "",
  _id: "",
  access: {
    createItinerary: false,
    deleteItinerary: false,
    editItinerary: false,
    sendNotifications: false,
    cancelItinerary: false,
  },
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
