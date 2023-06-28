import axios from "axios";
import config from "../configs/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { api: { url } } = config;

export const sendMessage = async (data) => {
    const token = await AsyncStorage.getItem("token");
    try {
        const response = await axios.post(`${url}/message/create_message`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export default {
    sendMessage
};
