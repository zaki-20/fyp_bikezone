import { createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./product.service"


// get all goals
export const getAllProducts = createAsyncThunk('products/getAllProducts', async ({ keyword = '', currentPage = 1, price = [0, 25000], category, ratings = 0 }, thunkAPI) => {
    try {
        console.log(currentPage, "getAllProducts")
        return await productService.getAllProducts(keyword, currentPage, price, category, ratings)
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