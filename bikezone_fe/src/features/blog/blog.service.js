import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create post
const createBlogPost = async (blogData) => {
    const response = await axios.post(API_URL + 'blog/new', blogData, { withCredentials: true })
    return response.data
}

//get user posts
const myBlogPosts = async () => {
    const response = await axios.get(API_URL + 'blog/me', { withCredentials: true })
    return response.data
}

//get single blog post
const getSingleBlogPosts = async (id) => {
    const response = await axios.get(API_URL + `blog/${id}`, { withCredentials: true })
    return response.data
}

//get all blog posts
const getAllBlogPosts = async () => {
    const response = await axios.get(API_URL + 'blogs', { withCredentials: true })
    return response.data
}

// like dislike post
const likeDisLikeBlogPost = async (id) => {

    // Get the token from the cookie
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token=')).split('=')[1];
    console.log('Token:', token);

    // Attach the token to the request headers
    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.put(API_URL + `blog/${id}/like`, null, { withCredentials: true, headers });
        return response.data;
    } catch (error) {
        // Handle errors
        console.error('Error in likeDisLikeBlogPost:', error);
        throw error;
    }
};

//get all blog posts
const deleteBlog = async (id) => {
    const response = await axios.delete(API_URL + `blog/${id}`, { withCredentials: true })
    return response.data
}

const blogService = {
    createBlogPost,
    myBlogPosts,
    likeDisLikeBlogPost,
    getAllBlogPosts,
    getSingleBlogPosts,
    deleteBlog
}
export default blogService