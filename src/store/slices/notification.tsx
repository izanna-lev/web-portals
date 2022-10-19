import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface NotificationUserList {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: NotificationUserList = {
  list: [],
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const NotificationUserList = createSlice({
  name: "NotificationUserList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.TRAVELLER_LIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default NotificationUserList.reducer;
