import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = { list: [], totalUnread: false };

const MyNotifications = createSlice({
  name: "MyNotifications",
  initialState,
  reducers: {
    getNotifications: (state, { payload }: { payload: any }) => {
      return payload.data;
    },
  },
  extraReducers(builder) {
    builder.addCase(API.NOTIFICATION_LIST, (state, action: any) => {
      return action.payload;
    });
  },
});

export const { getNotifications } = MyNotifications.actions;

export default MyNotifications.reducer;
