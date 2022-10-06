import React, { useEffect } from 'react'
import io  from 'socket.io-client'
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSocket } from "../../store/slices/socket";
import {API_URL} from "../../constants"

const Socket = () => {
    const dispatch = useAppDispatch();
    const profileData = useAppSelector((state) => state.profile);
    const socketData = useAppSelector((state) => state.socket);

    useEffect(() => {
        const socketIO = io(API_URL, {
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

        // socketIO.on('message', (data) => {

        //     console.log('aaya aaya sandesa aaya', data)
        // })

    }, [])

    useEffect(() => {
        if (socketData?.socket?.id && profileData._id) {
            socketData.socket.emit("subscribe_user", { userRef: profileData._id})
        }
    }, [socketData?.socket?.id])

    return null;
}
export default Socket;