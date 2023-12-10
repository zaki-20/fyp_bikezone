import { createSlice } from "@reduxjs/toolkit";
import initialUsedBikeState from './usedbike.initialstate'
import { createUsedBike } from "./usedbike.thunk";

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

    }
})
export const { reset } = usedBikeSlice.actions

export default usedBikeSlice.reducer