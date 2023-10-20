import { createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contact.service";

//create contact post 
export const createContact = createAsyncThunk('contact/createContact', async (contactData, thunkAPI) => {
    try {
        return await contactService.createContact(contactData)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})







