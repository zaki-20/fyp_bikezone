import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service";


//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {

        return await authService.register(user)

    } catch (error) {
        const message =
             error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
         
        return await authService.login(user)

    } catch (error) {
        const message = error.response.data 
        return thunkAPI.rejectWithValue(message)
    }
})
