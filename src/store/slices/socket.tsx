import { createSlice } from "@reduxjs/toolkit";

interface Socket {
  socket: any;
}

const initialState: Socket = {
  socket: {},
};

const socket = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socket.actions;

export default socket.reducer;
