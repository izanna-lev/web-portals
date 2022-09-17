import React, { useEffect } from 'react'
import io  from 'socket.io-client'

const Socket = () => {
    useEffect(() => {
        const socket = io('http://localhost:3001/',  { transports: ["websocket"] })
        socket.on('connect', () => console.log(socket.id))
        socket.emit("subscribe_channel")
        socket.on('disconnect', () => console.log('server disconnected'))

    }, [])
    return <></>;
}
export default Socket;