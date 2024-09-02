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

//get all rental bikes 
export const getAllRentBikes = createAsyncThunk('rentBike/getAllRentBikes', async (_, thunkAPI) => {
    try {
        return await rentBikeService.getAllRentBikes()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get all rental bikes  --admin
export const getAllRentBikesAdmin = createAsyncThunk('rentBike/getAllRentBikesAdmin', async (_, thunkAPI) => {
    try {
        return await rentBikeService.getAllRentBikesAdmin()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get rental bike detail 
export const getDetailRentBike = createAsyncThunk('rentBike/getDetailRentBike', async (id, thunkAPI) => {
    try {
        return await rentBikeService.getDetailRentBike(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


//get my rental bikes 
export const getMyRentBikes = createAsyncThunk('rentBike/getMyRentBikes', async (_, thunkAPI) => {
    try {
        return await rentBikeService.getMyRentBikes()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//update my rent bike 
export const updateMyRentBike = createAsyncThunk('rentBike/updateMyRentBike', async ({ values, id }, thunkAPI) => {
    try {
        return await rentBikeService.updateMyRentBike(id, values)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get rental bike detail 
export const deleteRentBike = createAsyncThunk('rentBike/deleteRentBike', async (id, thunkAPI) => {
    try {
        return await rentBikeService.deleteRentBike(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})
