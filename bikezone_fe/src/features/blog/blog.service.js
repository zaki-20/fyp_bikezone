import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create order
const createBlogPost = async (blogData) => {
    const response = await axios.post(API_URL + 'blog/new', blogData, { withCredentials: true })
    return response.data
}

//create order
const myBlogPosts = async () => {
    const response = await axios.get(API_URL + 'blog/me', { withCredentials: true })
    return response.data
}

const blogService = {
    createBlogPost,
    myBlogPosts
}
export default blogService