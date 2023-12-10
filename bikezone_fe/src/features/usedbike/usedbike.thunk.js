import { createAsyncThunk } from "@reduxjs/toolkit";
import usedBikeService from "./usedbike.service";


//create used bike 
export const createUsedBike = createAsyncThunk('usedBike/createUsedBike', async (usedBikeData, thunkAPI) => {
    try {
        return await usedBikeService.createUsedBike(usedBikeData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})



