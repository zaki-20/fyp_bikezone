import { createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blog.service";

//createOrder 
export const createBlogPost = createAsyncThunk('blog/createBlogPost', async (blogData, thunkAPI) => {
    try {
        return await blogService.createBlogPost(blogData)
    } catch (error) {
        console.log("thunk error", error)
        const message =
            error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//createOrder 
export const myBlogPosts = createAsyncThunk('blog/myBlogPosts', async (_, thunkAPI) => {
    try {
        return await blogService.myBlogPosts()
    } catch (error) {
        console.log("thunk error", error)
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})



