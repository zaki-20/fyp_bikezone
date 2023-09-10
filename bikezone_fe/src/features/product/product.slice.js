import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./product.thunk";
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
                console.log("The action is:", { action })
                state.isLoading = false
                state.isSuccess = true
                // console.log("The action payload is: ", action.payload)
                // console.log("The action.payload.payload.products.products is: ", action.payload.payload.products.products)
                state.products = action.payload.payload.products.products
                state.length = action.payload.payload.products.length
                state.message = action.message
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export default productSlice.reducer