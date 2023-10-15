import { createSlice } from "@reduxjs/toolkit";
import { createBlogPost, myBlogPosts } from "./blog.thunk";
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
           
    }
})
export const { reset } = blogSlice.actions

export default blogSlice.reducer