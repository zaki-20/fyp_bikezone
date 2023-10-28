import { createSlice } from "@reduxjs/toolkit";
import { createBlogPost, deleteBlog, getAllBlogPosts, getSingleBlogPosts, likeDisLikeBlogPost, myBlogPosts } from "./blog.thunk";
import initialBlogState from './blog.initialstate'

const blogSlice = createSlice({
    name: "blog",
    initialState: initialBlogState, 
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.blogPosts = []
            state.blogPost = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlogPost.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error
            })
            .addCase(myBlogPosts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(myBlogPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.blogPosts = action.payload.payload.userPosts
            })
            .addCase(myBlogPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.blogPosts = []
            })
            .addCase(getAllBlogPosts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllBlogPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.blogPosts = action.payload.payload.blogs
            })
            .addCase(getAllBlogPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.blogPosts = []
            })
            .addCase(getSingleBlogPosts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getSingleBlogPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
                state.blogPost = action.payload.payload.blog
            })
            .addCase(getSingleBlogPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.blogPost = null
            })
            .addCase(likeDisLikeBlogPost.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(likeDisLikeBlogPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(likeDisLikeBlogPost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })

    }
})
export const { reset } = blogSlice.actions

export default blogSlice.reducer