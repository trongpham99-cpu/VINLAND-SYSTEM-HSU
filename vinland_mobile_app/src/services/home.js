import axios from "axios";
import { AsyncStorage } from "react-native";
import config from "../configs/index";
const {
  api: { url },
} = config;

export const addHome = async (
  Title,
  Description,
  Price,
  Location,
  Thumbnail,
  Slug,
  Rating,
  Attachments,
  Note,
  Status,
  Owner,
  Comments
) => {
  try {
    const response = await axios.post(`${url}/home/`, {
      Title,
      Description,
      Price,
      Location,
      Thumbnail,
      Slug,
      Rating,
      Attachments,
      Note,
      Status,
      Owner,
      Comments,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllHome = async ({ type }) => {
  try {
    const response = await axios.get(`${url}/home/`, {
      params: {
        type,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailHome = async (id) => {
  try {
    const response = await axios.get(`${url}/home/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHome = async (id) => {
  try {
    const response = await axios.put(`${url}/home/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const approveHome = async (id) => {
  try {
    const response = await axios.put(`${url}/home/approve/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHome = async (id) => {
  try {
    const response = await axios.delete(`${url}/home/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  addHome,
  getAllHome,
  getDetailHome,
  updateHome,
  approveHome,
  deleteHome
};
