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
export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
    try {

        return await authService.loadUser()
    } catch (error) {
        console.log(error)
        const message = error.response.data || error.response.data.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//updateProfile user
export const updateProfile = createAsyncThunk('auth/updateProfile', async (user, thunkAPI) => {
    try {
        return await authService.updateProfile(user)
    } catch (error) {
        const message =
            error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//update password user
export const updatePassword = createAsyncThunk('auth/updatePassword', async (passwords, thunkAPI) => {
    try {
        return await authService.updatePassword(passwords)
    } catch (error) {
        const message =
            error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, thunkAPI) => {
    try {
        return await authService.forgotPassword(email)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ newPassword, confirmPassword, token }, thunkAPI) => {
    try {
        // console.log(passwords, "passwords")
        return await authService.resetPassword(newPassword, confirmPassword, token)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})
