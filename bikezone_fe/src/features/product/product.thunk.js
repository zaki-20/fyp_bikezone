import { createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./product.service"


// get all goals
export const getAllProducts = createAsyncThunk('products/getAllProducts', async (keyword, thunkAPI) => {
    try {
        return await productService.getAllProducts(keyword)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all goals
export const getProductDetail = createAsyncThunk('products/getProductDetail', async (id, thunkAPI) => {
    try {
        return await productService.getProductDetail(id)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})