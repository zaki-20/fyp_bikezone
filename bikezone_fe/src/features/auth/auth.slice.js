import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./product.thunk";
import initialProductState from "./product.initialstate";

const authSlice = createSlice({
    name: "auth",
    initialState: initialProductState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("The action is:", { action })
                state.user = action.payload.payload.user
                state.isLoading = false
                state.message = action.payload.payload.message
                state.isSuccess = true
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