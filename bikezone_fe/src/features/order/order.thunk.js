import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./order.service";

//createOrder 
export const createOrder = createAsyncThunk('order/createOrder', async (order, thunkAPI) => {
    try {
        console.log(order.orderItems, "order id order service")
        return await orderService.createOrder(order)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//my orders 
export const myOrders = createAsyncThunk('order/myOrders', async (_, thunkAPI) => {
    try {
        return await orderService.myOrders()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get order detils 
export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (id, thunkAPI) => {
    try {
        return await orderService.getOrderDetails(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//get all orders   --admin
export const getAllOrders = createAsyncThunk('order/getAllOrders', async (_, thunkAPI) => {
    try {
        return await orderService.getAllOrders()
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//delete order  -admin 
export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id, thunkAPI) => {
    try {
        return await orderService.deleteOrder(id)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

//update order  -admin 
export const updateOrder = createAsyncThunk('order/updateOrder', async (data, thunkAPI) => {
    try {
        
        return await orderService.updateOrder(data)
    } catch (error) {
        const message =
            error.response.data.message || error.response.data || error.response
        return thunkAPI.rejectWithValue(message)
    }
})