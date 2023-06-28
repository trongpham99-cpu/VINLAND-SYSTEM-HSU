import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../configs/index";
const {
  api: { url },
} = config;

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${url}/user/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.get(`${url}/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${url}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

