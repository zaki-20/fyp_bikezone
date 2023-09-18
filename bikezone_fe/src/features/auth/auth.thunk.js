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
//loadUser user
export const loadUser = createAsyncThunk('auth/loadUser', async ( _,thunkAPI) => {
    try {    
        return await authService.loadUser()
    } catch (error) {
        const message = error.response.data 
        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const logout = createAsyncThunk('auth/logout', async (_,thunkAPI) => {
    try {    
        return await authService.logout()
    } catch (error) {
        const message = error.response.data 
        return thunkAPI.rejectWithValue(message)
    }
  })
