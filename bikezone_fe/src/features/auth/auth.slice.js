import { createSlice } from "@reduxjs/toolkit";
import { register, login, loadUser, logout, updateProfile } from "./auth.thunk";
import initialAuthState from "./auth.initialstate";

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        reset: (state) => {
            state.user = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.logoutSuccess = false
            state.updateProfile = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.payload.user
                state.message = action.payload.message
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload.payload.user
                state.message = action.payload.message

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.message = action.payload.error

            })
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload.payload.user
                state.message = action.payload.message
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error //need checking
                state.user = null
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.updateProfile = false
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
                state.updateProfile = true
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.updateProfile = false
                console.log(action.payload.error)
            })
            .addCase(logout.fulfilled, (state, action) => {

                state.message = action.payload.message
                state.logoutSuccess = true
            })

    }
})
export const { reset } = authSlice.actions

export default authSlice.reducer