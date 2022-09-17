import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface Dashboard {
  overallExperience: number;
  pending: number;
  approved: number;
  completed: number;
}

const initialState: Dashboard = {
  overallExperience: 0,
  pending: 0,
  approved: 0,
  completed: 0,
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.DASHBOARD, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default dashboard.reducer;
