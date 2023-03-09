import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface NotificationTemplateType {
  templates: string[];
}

const initialState: NotificationTemplateType = {
  templates: [],
};

const NotificationTemplates = createSlice({
  name: "NotificationTemplate",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.LIST_TEMPLATE, (state, action: any) => {
      return action.payload;
    });
  },
});

export default NotificationTemplates.reducer;
