import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductDetail } from "./product.thunk";
import initialProductState from "./product.initialstate";

const productSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {
        reset: (state) => {
            state.products = []
            state.productDetails = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.length = null
            state.productsCount = null
            state.resultPerPage = null
            state.filteredProductsCount = null
        },

        resetCart: (state) => {
            state.cartItems = []
        },

        addToCart: (state, action) => {
            const { product, quantity } = action.payload;

            const isItemExist = state.cartItems.find((item) => item._id === product._id);

            if (isItemExist) {
                // If the item already exists in the cart, update the quantity
                state.cartItems = state.cartItems.map((item) =>
                    item._id === isItemExist._id
                        ? {  ...item, quantity: item.quantity + quantity  }
                        : item
                );
            } else {
                // If the item is not in the cart, add it with the quantity
                state.cartItems.push({ ...product, quantity  });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i.product !== action.payload
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                // console.log("The action is:", { action })
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.payload.products.products
                state.length = action.payload.payload.products.length
                state.resultPerPage = action.payload.payload.products.resultPerPage
                state.message = action.payload.message
                state.productsCount = action.payload.payload.products.productsCount
                state.filteredProductsCount = action.payload.payload.products.filteredProductsCount
                // console.log(action.payload.message)
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                console.log(action.payload.error)

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

export const { reset, addToCart } = productSlice.actions

export default productSlice.reducer