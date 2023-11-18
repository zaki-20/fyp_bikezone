import { createAsyncThunk } from "@reduxjs/toolkit"
import productService from "./product.service"


//create product --admin
export const createProduct = createAsyncThunk('products/createProduct', async (data, thunkAPI) => {
    try {
        return await productService.createProduct(data)
    } catch (error) {
        const message =
            error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// get all goals
export const getAllProducts = createAsyncThunk('products/getAllProducts', async ({ keyword = '', currentPage = 1, price = [0, 25000], category, ratings = 0 }, thunkAPI) => {
    try {
        return await productService.getAllProducts(keyword, currentPage, price, category, ratings)
    } catch (error) {
        const message =
            error.response || error.response.data || error.response.data.message || error.message || error.code
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// get all products
export const getProductDetail = createAsyncThunk('products/getProductDetail', async (id, thunkAPI) => {
    try {
        return await productService.getProductDetail(id)
    } catch (error) {
        const message =
            error.response || error.response.data || error.response.data.message || error.message || error.code
        return thunkAPI.rejectWithValue(message)
    }
})

// get all rated  products
export const getRatedProducts = createAsyncThunk('products/getRatedProducts', async (_, thunkAPI) => {
    try {
        return await productService.getRatedProducts()
    } catch (error) {
        const message =
            error.response || error.response.data || error.response.data.message || error.message || error.code
        return thunkAPI.rejectWithValue(message)
    }
})


// get all reviewed  products
export const getReviewedProducts = createAsyncThunk('products/getReviewedProducts', async (_, thunkAPI) => {
    try {
        return await productService.getReviewedProducts()
    } catch (error) {
        const message =
            error.response || error.response.data || error.response.data.message || error.message || error.code
        return thunkAPI.rejectWithValue(message)
    }
})
// get all new arrival products
export const getNewArrivalProducts = createAsyncThunk('products/getNewArrivalProducts', async (_, thunkAPI) => {
    try {
        return await productService.getNewArrivalProducts()
    } catch (error) {
        console.log(error)
        const message = error.response || error.response.data || error.response.data.message || error.message || error.code
        return thunkAPI.rejectWithValue(message)
    }
})

// get all products admin
export const getAdminProducts = createAsyncThunk('products/getAdminProducts', async (_, thunkAPI) => {
    try {
        return await productService.getAdminProducts()
    } catch (error) {
        const message =
            error.response || error.response.data || error.response.data.message || error.message || error.code
        return thunkAPI.rejectWithValue(message)
    }
})

//cart===================================
// add items in cart
export const addItemsToCart = createAsyncThunk('products/addItemsToCart', async ({ id, quantity }, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        localStorage.setItem("cartItems", JSON.stringify(state));

    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

