import { createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blog.service";

//create blog ost 
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

//my blog posts 
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

//all blog posts 
export const getAllBlogPosts = createAsyncThunk('blog/getAllBlogPosts', async (_, thunkAPI) => {
    try {
        return await blogService.getAllBlogPosts()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//all single blog post 
export const getSingleBlogPosts = createAsyncThunk('blog/getSingleBlogPosts', async (id, thunkAPI) => {
    try {
        return await blogService.getSingleBlogPosts(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


//like dislike blog posts 
export const likeDisLikeBlogPost = createAsyncThunk('blog/likeDisLikeBlogPost', async (id, thunkAPI) => {
    try {
        return await blogService.likeDisLikeBlogPost(id)
    } catch (error) {
        console.log(error)
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})
//like dislike blog posts 
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id, thunkAPI) => {
    try {
        return await blogService.deleteBlog(id)
    } catch (error) {
        console.log(error)
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})




