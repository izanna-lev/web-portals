import { socket } from "../components/Socket";

const Socket = {
  sendMessage(data: {
    channelRef?: string;
    message: string;
    id: string;
    messageType: number;
    type: number;
  }) {
    socket.emit("message", data);
  },

  subscribeChannel(data: { channelRef: string; id: string }) {
    socket.emit("subscribe_channel", data);
  },

  chatRead(data: { channelRef: string; id: string }) {
    socket.emit("click", data);
  },

  notificationRead(data: { notificationRef: string; id: string }) {
    socket.emit("read", data);
  },
};

export default Socket;
