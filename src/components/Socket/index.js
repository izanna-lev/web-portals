import React, { useEffect } from 'react'
import io  from 'socket.io-client'
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSocket } from "../../store/slices/socket";

const Socket = () => {
    const dispatch = useAppDispatch();
    const profileData = useAppSelector((state) => state.profile);
    const socketData = useAppSelector((state) => state.socket);

    useEffect(() => {
        const socketIO = io("http://localhost:3001/", {
            transports: ["websocket"],
            reconnectionDelayMax: 10000,
            auth: {
                token: localStorage.getItem('accessToken')
            },
        });
        
        socketIO.on('connect', () => {
            dispatch(setSocket(socketIO));

            console.log('server connected', socketIO.id)
        })

    }, [])

    useEffect(() => {
        if (socketData?.socket?.id && profileData._id) {
            socketData.socket.emit("subscribe_user", { userRef: profileData._id})
        }

    }, [socketData?.socket?.id])

    return <></>;
}
export default Socket;