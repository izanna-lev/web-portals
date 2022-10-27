import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = { list: [] };

const MyNotifications = createSlice({
  name: "MyNotifications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.NOTIFICATION_LIST, (state, action: any) => {
      Object.assign(state, { list: [...action.payload] });
    });
  },
});

export default MyNotifications.reducer;
