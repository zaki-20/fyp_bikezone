import { createSlice } from "@reduxjs/toolkit";
import { createRentBike, getAllRentBikes, getAllRentBikesAdmin, getDetailRentBike, getMyRentBikes } from "./rentbike.thunk";
import initialRentBikeState from './rentbike.initialstate'

const rentBikeSlice = createSlice({
    name: "rentBike",
    initialState: initialRentBikeState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.workshopCount = null
            state.rentBikes = []
            state.rentBike = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRentBike.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(createRentBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createRentBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getAllRentBikes.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllRentBikes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rentBikes = action.payload.payload.rentBikes
            })
            .addCase(getAllRentBikes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.rentBikes = []
            })
            .addCase(getDetailRentBike.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getDetailRentBike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rentBike = action.payload.payload.rentBike
            })
            .addCase(getDetailRentBike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.rentBike = null
            })
            .addCase(getMyRentBikes.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getMyRentBikes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rentBikes = action.payload.payload.rentBikes
            })
            .addCase(getMyRentBikes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.rentBikes = []
            })
            .addCase(getAllRentBikesAdmin.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllRentBikesAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rentBikes = action.payload.payload.rentBikes
            })
            .addCase(getAllRentBikesAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.rentBikes = []
            })
    }
})
export const { reset } = rentBikeSlice.actions

export default rentBikeSlice.reducer