import { useEffect, useMemo } from "react";
import io from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSocket } from "../../store/slices/socket";
import { SOCKET_URL } from "../../constants";
import { getChat } from "../../store/slices/chatList";
import { getNotifications } from "../../store/slices/myNotifications";

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

  useEffect(() => {
    socket.on("connect", () => console.log("connect", socket));

    return () => {
      socket.off("connect", () => console.log("disconnect", socket));
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket.connected) {
      socket.on("chatList", (data: any) => {
        dispatch(getChat(data));
      });
      socket.on("notificationList", (data: any) => {
        dispatch(getNotifications(data));
      });
    }
  }, [socket.connected]);

  useEffect(() => {
    if (socket.connected && profileData._id) {
      socket.emit("subscribe_user", { userRef: profileData._id });
    }
  }, [socket.connected, profileData._id]);

  return <></>;
};

export default Socket;
