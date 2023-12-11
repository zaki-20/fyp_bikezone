import { createSlice } from "@reduxjs/toolkit";
import initialUsedBikeState from './usedbike.initialstate'
import { createUsedBike, deleteUsedBikeAd, getAllMyUsedBike, getAllUsedBikes, getUsedBikeDetails, updateUsedBike } from "./usedbike.thunk";

const usedBikeSlice = createSlice({
    name: "usedBike",
    initialState: initialUsedBikeState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.workshopCount = null
            state.usedBikes = []
            state.usedBike = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUsedBike.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(createUsedBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createUsedBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getAllUsedBikes.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllUsedBikes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.usedBikes = action.payload.payload.usedBikes
            })
            .addCase(getAllUsedBikes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.usedBikes = []
            })
            .addCase(getAllMyUsedBike.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllMyUsedBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.usedBikes = action.payload.payload.usedBikes
            })
            .addCase(getAllMyUsedBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.usedBikes = []
            })
            .addCase(getUsedBikeDetails.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getUsedBikeDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.usedBike = action.payload.payload.usedBike
            })
            .addCase(getUsedBikeDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.usedBike = null
            })
            .addCase(deleteUsedBikeAd.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteUsedBikeAd.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteUsedBikeAd.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(updateUsedBike.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(updateUsedBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateUsedBike.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })

    }
})
export const { reset } = usedBikeSlice.actions

export default usedBikeSlice.reducer