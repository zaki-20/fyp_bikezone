import { createAsyncThunk } from "@reduxjs/toolkit";
import rentBikeService from "./rentbike.service";


//createWorkshop 
export const createRentBike = createAsyncThunk('rentBike/createRentBike', async (rentBikeData, thunkAPI) => {
    try {
        return await rentBikeService.createRentBike(rentBikeData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})