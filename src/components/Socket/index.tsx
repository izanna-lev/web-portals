import { useEffect } from "react";
import io from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSocket } from "../../store/slices/socket";
import { SOCKET_URL } from "../../constants";

const Socket = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.profile);
  const socketData = useAppSelector((state) => state.socket.socket);

  useEffect(() => {
    const socketIO = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
      auth: {
        token: localStorage.getItem("accessToken"),
      },
    });

    socketIO.on("connect", () => {
      dispatch(setSocket(socketIO));

      console.log("server connected", socketIO.id);
    });

    // socketIO.on('message', (data) => {

    //     console.log('aaya aaya sandesa aaya', data)
    // })
  }, [dispatch]);

  useEffect(() => {
    if (socketData?.id && profileData._id) {
      socketData.emit("subscribe_user", { userRef: profileData._id });
    }
  }, [socketData, profileData._id]);

  return null;
};
export default Socket;
