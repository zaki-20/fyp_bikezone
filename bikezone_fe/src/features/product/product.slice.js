import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductDetail } from "./product.thunk";
import initialProductState from "./product.initialstate";

const productSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                // console.log("The action is:", { action })
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.payload.products.products
                state.length = action.payload.payload.products.length
                state.message = action.payload.message
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProductDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // console.log("action.payload.products details:", action.payload)
                //  console.log("slice deyail etails:", action.payload.payload)
                state.product = action.payload.payload.product
                state.message = action.payload.message
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export default productSlice.reducer