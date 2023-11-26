import { createSlice } from "@reduxjs/toolkit";
import { createReview, deleteReview, getProductReviews } from "./review.thunk";
import initialReviewState from './review.initialstate'

const reviewSlice = createSlice({
    name: "review",
    initialState: initialReviewState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.reviews = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getProductReviews.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getProductReviews.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
                state.reviews = action.payload.payload.reviews
            })
            .addCase(getProductReviews.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error
                state.reviews = []
            })
            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true
                state.isDeleted = false

            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleted = true
                state.isError = false
                state.message = action.payload.message
                state.reviews = action.payload.payload.reviews
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isDeleted = false
                state.message = action.payload.error
                state.reviews = []
            })

    }
})
export const { reset } = reviewSlice.actions

export default reviewSlice.reducer