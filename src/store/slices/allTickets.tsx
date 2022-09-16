import { createSlice } from "@reduxjs/toolkit";

interface Tickets {
  tickets: [{ name: string; image: string }];
  ticketComponents: [];
}

const initialState: Tickets = {
  tickets: [{ name: "", image: "" }],
  ticketComponents: [],
};

const tickets = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    updateTickets: (state, action) => {
      state.tickets = action.payload;
    },
    updateTicketComponents: (state, action) => {
      state.ticketComponents = action.payload;
    },
  },
});

export const { updateTickets, updateTicketComponents } = tickets.actions;

export default tickets.reducer;
