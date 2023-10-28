import { createAsyncThunk } from "@reduxjs/toolkit";
import workshopService from "./workshop.service";

//createWorkshop 
export const createWorkshop = createAsyncThunk('workshop/createWorkshop', async (workshopData, thunkAPI) => {
    try {
        console.log(workshopData)
        return await workshopService.createWorkshop(workshopData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//getAllWorkshops 
export const getAllWorkshops = createAsyncThunk('workshop/getAllWorkshops', async (_, thunkAPI) => {
    try {
        return await workshopService.getAllWorkshops()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get single workshop 
export const getSingleWorkshop = createAsyncThunk('workshop/getSingleWorkshop', async (workshopId, thunkAPI) => {
    try {
        return await workshopService.getSingleWorkshop(workshopId)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

