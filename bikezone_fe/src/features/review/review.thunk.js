import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./review.service";

//createOrder 
export const createReview = createAsyncThunk('review/createReview', async (reviewData, thunkAPI) => {
    try {
        console.log(reviewData)
        return await reviewService.createReview(reviewData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get all reviews --admin 
export const getProductReviews = createAsyncThunk('review/getProductReviews', async (id, thunkAPI) => {
    try {
        return await reviewService.getProductReviews(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


//delete reviews 
export const deleteReview = createAsyncThunk('review/deleteReview', async ({ reviewId, productId }, thunkAPI) => {
    try {
        console.log(reviewId, productId)
        return await reviewService.deleteReview(reviewId, productId)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


