import { createSlice } from "@reduxjs/toolkit";
import { register, login, loadUser, logout } from "./auth.thunk";
import initialAuthState from "./auth.initialstate";

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        // reset: (state) => initialProductState
        reset: (state) => initialAuthState
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
                state.user = action.payload.payload.user
                state.message = action.payload.message
                console.log(action.payload.message, "login")

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.isSuccess = false
                state.user = null
                // state.logoutSuccess = false
            })
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.payload.user
                state.message = action.payload.message
                console.log(action.payload, "loaduser fulfilled action.payload")
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error //need checking
                state.user = null
                console.log(action.payload, "loaduser reject")
            })
            .addCase(logout.fulfilled, (state, action) => {

                state.message = action.payload.message
                state.logoutSuccess = true

            })

    }
})
export const { reset } = authSlice.actions

export default authSlice.reducer