import axios from "axios";
import { AsyncStorage } from "react-native";
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

export { getAllUser, deleteUser };
