import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./order.service";

//createOrder 
export const createOrder = createAsyncThunk('order/createOrder', async (order, thunkAPI) => {
    try {
        console.log(order.orderItems, "order id order service")
        return await orderService.createOrder(order)
    } catch (error) {
        const message = 
            error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

//my orders 
export const myOrders = createAsyncThunk('order/myOrders', async (_, thunkAPI) => {
    try {
        return await orderService.myOrders()
    } catch (error) {
        const message =
            error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})