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

//get my workshop 
export const getMyWorkshop = createAsyncThunk('workshop/getMyWorkshop', async (_, thunkAPI) => {
    try {
        return await workshopService.getMyWorkshop()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//delete my workshop 
export const deleteMyWorkshop = createAsyncThunk('workshop/deleteMyWorkshop', async (id, thunkAPI) => {
    try {
        return await workshopService.deleteMyWorkshop(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//update my workshop 
export const updateMyWorkshop = createAsyncThunk('workshop/updateMyWorkshop', async ({values, id}, thunkAPI) => {
    try {
        return await workshopService.updateMyWorkshop(id, values)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

