import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../configs/index";
const {
    api: { url },
} = config;

export const createRoom = async (data) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${url}/room`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const fetchMyRoom = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${url}/room/my-rooms`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const fetchRoomDetail = async (roomId) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${url}/room/detail/${roomId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export default {
    fetchMyRoom,
    fetchRoomDetail,
    createRoom
};
