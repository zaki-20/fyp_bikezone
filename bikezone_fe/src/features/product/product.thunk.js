import { createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./product.service"


// get all goals
export const getAllProducts = createAsyncThunk('products/getAllProducts', async ({ keyword = '', currentPage = 1 }, thunkAPI) => {
    try {
        console.log(currentPage, "getAllProducts")
        return await productService.getAllProducts(keyword, currentPage)
    } catch (error) {
        const message = error.response.data
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