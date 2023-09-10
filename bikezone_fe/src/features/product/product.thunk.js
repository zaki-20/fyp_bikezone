import { createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./product.service"


// get all goals
export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
    try {
        return await productService.getAllProducts()
        
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})