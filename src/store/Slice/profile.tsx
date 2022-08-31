import { createSlice } from "@reduxjs/toolkit";

interface Profile {
    data: {
      name: string,
      email: string,
      phoneNumber: string,
      picture: string,
      device: string,
      fcmToken: string,
      _id: string,
    }
}

const initialState: Profile = {
    data: {
        name: "",
        email: "",
        phoneNumber: "",
        picture: "",
        device: "",
        fcmToken: "",
        _id: "",
    }
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
        state.data = action.payload.data;
    },
  },
});

export const { setProfile } = profile.actions

export default profile.reducer

