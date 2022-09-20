import io from 'socket.io-client'
import { useParams } from "react-router-dom";

export const socket = io("http://localhost:3001/", {
    transports: ["websocket"],
  reconnectionDelayMax: 10000,
  auth: {
    token: localStorage.getItem('accessToken')
  },
});

socket.on('connect', () => {
      console.log('server connected', socket.id)
})

socket.on('disconnect', () => console.log('server disconnected'))

//  socket.on('message', (data) => {
//     console.log("Message data----->", data)
//  })



export default class Socket {
    constructor() {
        console.log("constructor>>>>>>>")
    }

    static sendMessage(data) {
        socket.emit("message", data)
    }

    static subscribeChannel(data) {
        socket.emit("subscribe_channel", data)
    }

}

