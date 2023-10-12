import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderDetails, myOrders } from "./order.thunk";
import initialOrderState from './order.initialstate'

const orderSlice = createSlice({
    name: "order",
    initialState: initialOrderState,
    reducers: {
        reset: (state) => {
            state.order = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.order = action.payload.payload.order
                state.message = action.payload.message
                console.log(action.payload.payload.order)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.order = null
            })
            .addCase(myOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload.payload.orders
                state.message = action.payload.message
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.order = null
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orderDetails = action.payload.payload.order
                state.message = action.payload.message
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.order = null
            })
              
    }
})
export const { reset } = orderSlice.actions

export default orderSlice.reducer