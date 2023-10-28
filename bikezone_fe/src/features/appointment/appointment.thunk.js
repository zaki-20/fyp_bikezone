import { createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointment.service";

//createWorkshop 
export const createAppointment = createAsyncThunk('appointment/createAppointment', async (appointmentData, thunkAPI) => {
    try {
        console.log(appointmentData)
        return await appointmentService.createAppoitment(appointmentData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})




