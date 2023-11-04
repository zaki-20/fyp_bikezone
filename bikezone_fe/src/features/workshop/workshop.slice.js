import { createSlice } from "@reduxjs/toolkit";
import { createWorkshop, getAllWorkshops, getMyWorkshop, getSingleWorkshop } from "./workshop.thunk";
import initialWorkshopState from './workshop.initialstate'

const workshopSlice = createSlice({
    name: "workshop",
    initialState: initialWorkshopState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.workshopCount = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWorkshop.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createWorkshop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createWorkshop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getAllWorkshops.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(getAllWorkshops.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.workshops = action.payload.payload.workshops
                state.workshopCount = action.payload.payload.workshopCount

            })
            .addCase(getAllWorkshops.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.workshops = []
            })
            .addCase(getSingleWorkshop.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getSingleWorkshop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.workshop = action.payload.payload.workshop
            })
            .addCase(getSingleWorkshop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.message = null
            })

    }
})
export const { reset } = workshopSlice.actions

export default workshopSlice.reducer