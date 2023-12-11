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

//get all used bike 
export const getAllUsedBikes = createAsyncThunk('usedBike/getAllUsedBikes', async (_, thunkAPI) => {
    try {
        return await usedBikeService.getAllUsedBikes()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get all my used bike 
export const getAllMyUsedBike = createAsyncThunk('usedBike/getAllMyUsedBike', async (_, thunkAPI) => {
    try {
        return await usedBikeService.getAllMyUsedBike()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


//get used bike details 
export const getUsedBikeDetails = createAsyncThunk('usedBike/getUsedBikeDetails', async (id, thunkAPI) => {
    try {
        return await usedBikeService.getUsedBikeDetails(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//update used bike  
export const updateUsedBike = createAsyncThunk('usedBike/updateUsedBike', async ({ values, id }, thunkAPI) => {
    try {
        return await usedBikeService.updateUsedBike(id, values)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})



//delete used bike ad 
export const deleteUsedBikeAd = createAsyncThunk('usedBike/deleteUsedBikeAd', async (id, thunkAPI) => {
    try {
        return await usedBikeService.deleteUsedBikeAd(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})



