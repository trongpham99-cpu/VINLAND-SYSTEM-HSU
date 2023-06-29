import axios from "axios";
import { AsyncStorage } from "react-native";
import config from "../configs/index";
const {
  api: { url },
} = config;

export const pingServer = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (username, email, password) => {
  const response = await axios.post(`${url}/auth/register`, {
    username,
    email,
    password,
  });
  return response;
};

export default {
  pingServer,
  login,
  register,
};
