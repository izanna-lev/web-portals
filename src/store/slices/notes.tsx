import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState: any = {
  list: [],
  page: 0,
  limit: 10,
  total: 0,
  size: 0,
};

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.NOTES_LIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default notes.reducer;
