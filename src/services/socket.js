import io from 'socket.io-client'

export const socket = io("http://localhost:3001/", {
    transports: ["websocket"],
    reconnectionDelayMax: 10000,
    auth: {
        token: localStorage.getItem('accessToken')
    },
});

socket.on('connect', () => {
    console.log('server connededededcted', socket.id)
})

socket.on('disconnect', () => console.log('server disconnected'))

export default class Socket {
    constructor() {
        console.log("constructor>>>>>>>")
    }

    static sendMessage(data) {
        socket.emit("message", data)
    }

    static subscribeChannel(data) {
        console.log("subscribe_channel>>>>>>>")

        socket.emit("subscribe_channel", data)
    }

}

