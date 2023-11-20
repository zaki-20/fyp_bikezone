import { createSlice } from "@reduxjs/toolkit";
import { createOrder, deleteOrder, getAllOrders, getOrderDetails, myOrders, updateOrder } from "./order.thunk";
import initialOrderState from './order.initialstate'

const orderSlice = createSlice({
    name: "order",
    initialState: initialOrderState,
    reducers: {
        reset: (state) => {
            state.orders = []
            state.orderDetails = null
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
                // console.log(action.payload.payload.order)
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
                state.orders = null
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
                state.orderDetails = null
            })
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload.payload.orders
                state.message = action.payload.message
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.orders = null
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })

    }
})
export const { reset } = orderSlice.actions

export default orderSlice.reducer