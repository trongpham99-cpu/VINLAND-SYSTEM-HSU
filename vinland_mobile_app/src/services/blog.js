import axios from "axios";
import config from "../configs/index";
const {
    api: { url },
} = config;

export const fetchBlogs = async (rating) => {
    try {
        const response = await axios.get(`${url}/blog`,
            {
                params: {
                    rating: rating
                }
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const fetchBlogDetail = async (blogId) => {
    try {
        const response = await axios.get(`${url}/blog/${blogId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export default {
    fetchBlogs,
    fetchBlogDetail
};
