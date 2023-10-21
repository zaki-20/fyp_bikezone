import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./review.service";

//createOrder 
export const createReview = createAsyncThunk('review/createReview', async (reviewData, thunkAPI) => {
    try {
        console.log(reviewData)
        return await reviewService.createReview(reviewData)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

