import axios from "axios";
import config from "../configs/index";
const {
    api: { url },
} = config;

export const uploadSingleImage = async (formData) => {
    try {
        const response = await axios({
            method: "post",
            url: `${url}/upload/single`,
            data: formData,
        });
        return response;
    } catch (err) {
        return err;
    }
}

export default {
    uploadSingleImage
};
