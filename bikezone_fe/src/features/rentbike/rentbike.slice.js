import { createSlice } from "@reduxjs/toolkit";
import { createRentBike } from "./rentbike.thunk";
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
    }
})
export const { reset } = rentBikeSlice.actions

export default rentBikeSlice.reducer