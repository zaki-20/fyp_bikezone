import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductDetail } from "./product.thunk";
import initialProductState from "./product.initialstate";

const productSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {
        // reset: (state) => initialProductState
        reset: (state) =>{
            state.message = '';
        }
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
                state.resultPerPage = action.payload.payload.products.resultPerPage
                state.message = action.payload.message
                console.log(action.payload.message)
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
            })
            .addCase(getProductDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // console.log("action.payload.products details:", action.payload)
                // console.log("slice deyail etails:", action.payload.payload)
                state.productDetails = action.payload.payload.product
                state.message = action.payload.message
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = productSlice.actions

export default productSlice.reducer