import { useEffect } from "react";
import io from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSocket } from "../../store/slices/socket";
import { SOCKET_URL } from "../../constants";
import { getChat } from "../../store/slices/chatList";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnectionDelayMax: 10000,
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});

const Socket = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.profile);
  const socketData = useAppSelector((state) => state.socket.socket);

  useEffect(() => {
    socket.on("connect", () => dispatch(setSocket(socket)));
  }, [dispatch]);

  if (socketData)
    socketData.on("chatList", (data: any) => {
      dispatch(getChat(data));
    });

  useEffect(() => {
    if (socketData?.id && profileData._id) {
      socketData.emit("subscribe_user", { userRef: profileData._id });
    }
  }, [socketData, profileData._id]);

  return null;
};

export default Socket;
