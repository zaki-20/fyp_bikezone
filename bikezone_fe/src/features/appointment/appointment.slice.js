import { createSlice } from "@reduxjs/toolkit";
import { createAppointment } from "./appointment.thunk";
import initialAppointmentState from './appointment.initialstate'

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: initialAppointmentState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
        
    }
})
export const { reset } = appointmentSlice.actions

export default appointmentSlice.reducer