import { io } from "socket.io-client";
import config from "../configs/index";
const { api: { url } } = config;
const socket = io(url, { transports: ['websocket'] });

export const onListen = (event, callback) => {
    socket.on(event, callback);
}

export const onEmit = (event, data) => {
    socket.emit(event, data);
}

export const onOff = (event) => {
    socket.off(event);
}

export default {
    onListen,
    onEmit,
    onOff
}