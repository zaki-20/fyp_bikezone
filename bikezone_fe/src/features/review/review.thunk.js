import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./review.service";

//createOrder 
export const createReview = createAsyncThunk('review/createReview', async (review, thunkAPI) => {
    try {
        return await reviewService.createOrder(review)
    } catch (error) {
        const message =
            error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

