import { io } from "socket.io-client";
import config from "../configs/index";
const { api: { url } } = config;
const socket = io.connect(url, { transports: ['websocket'] });

class Socket {
    initializeSocket() {
        try {

            this.socket = io(url, { transports: ['websocket'] })

            this.socket.on('connect', () => {
                // console.log('Socket connected')
            })
            this.socket.on('disconnect', () => {
                // console.log('Socket disconnected')
            })
            this.socket.on('connect_error', (error) => {
                // console.log('Socket error', error)
            })
                        
        } catch (error) {
            console.log(error)
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }

    on(event, callback) {
        this.socket.on(event, callback)
    }

    removeAllListeners(event) {
        this.socket.removeAllListeners(event)
    }

    removeListener(event, callback) {
        this.socket.removeListener(event, callback)
    }

}

const socketService = new Socket();
export default socketService;