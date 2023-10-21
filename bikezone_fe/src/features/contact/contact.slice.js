import { createSlice } from "@reduxjs/toolkit";
import { createContact } from "./contact.thunk";
import initialContactState from './contact.initial'

const contactSlice = createSlice({
    name: "contact",
    initialState: initialContactState,
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
            .addCase(createContact.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createContact.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error
            })
               
          
    }
})
export const { reset } = contactSlice.actions

export default contactSlice.reducer