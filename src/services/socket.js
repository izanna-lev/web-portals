import io from 'socket.io-client'

export const socket = io("http://localhost:3001/", {
    transports: ["websocket"],
  reconnectionDelayMax: 10000,
  auth: {
    token: localStorage.getItem('accessToken')
  },
});

socket.on('connect', () => console.log('server connected', socket.id))

socket.on('disconnect', () => console.log('server disconnected'))

socket.on('yo', () => console.log('server yo oy'))

export default class Socket {
    constructor() {
        console.log("constructor>>>>>>>")
    }

    static sendMessage(data) {
        console.log("subscribe_channel>>>>>>>")
        socket.emit("message", data)
    }

    static subscribeChannel(data) {
        console.log("subscribe channel")
        socket.emit("subscribe_channel", data)
    }

}

