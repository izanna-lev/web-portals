import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface Socket {
  socket: any;
}

const initialState: Socket = {
    socket: "",
};

const socket = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
        console.log(state.socket, "--------", action.payload)
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socket.actions;

export default socket.reducer;
