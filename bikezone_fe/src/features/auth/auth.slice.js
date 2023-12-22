import { createSlice } from "@reduxjs/toolkit";
import { register, login, loadUser, logout, updateProfile, updatePassword, forgotPassword, resetPassword, getAllUsers, getUserDetail, deleteUser, verifyOtp, updateUserRole } from "./auth.thunk";
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
            state.isUpdate = false
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
                // state.user = action.payload.payload.user
                state.message = action.payload.message
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                // state.user = null
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
                // state.isError = true
                state.isSuccess = false
                // state.message = action.payload.error //need checking
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
                state.isUpdate = true
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.isUpdate = false
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isUpdate = false
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
                state.isUpdate = true
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.isUpdate = false
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = action.payload.message
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error

            })
            .addCase(logout.fulfilled, (state, action) => {

                state.message = action.payload.message
                state.logoutSuccess = true
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.users = action.payload.payload.users
                state.message = action.payload.message
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error //need checking
                state.users = []
            })
            .addCase(getUserDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload.payload.users
                state.message = action.payload.message
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error //need checking
                state.user = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(verifyOtp.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.user = action.payload.payload.user
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
                state.user = null
            })
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })

    }
})
export const { reset } = authSlice.actions

export default authSlice.reducer