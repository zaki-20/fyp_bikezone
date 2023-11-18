import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getNewArrivalProducts, getProductDetail, getRatedProducts, getReviewedProducts, updateProduct } from "./product.thunk";
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
            state.topRated = []
            state.reviewed = []
            state.newArrival = []
        },

        resetCart: (state) => {
            state.cartItems = []
            localStorage.removeItem('cartItems');
        },

        addToCart: (state, action) => {
            let { product, quantity } = action.payload;
            // let { name, _id, price } = product
            // product = {
            //     name,
            //     product: _id,
            //     price
            // }

            const existingItem = state.cartItems.find((item) => item._id === product._id);

            if (existingItem) {
                // If the item already exists in the cart, update the quantity
                existingItem.quantity += quantity;
            } else {
                // If the item is not in the cart, add it with the quantity
                state.cartItems.push({ ...product, quantity });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        addToCartByQuantity: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === product._id);

            if (existingItem) {
                // If the item already exists in the cart, update the quantity
                existingItem.quantity = quantity;
                console.log(existingItem, "addddddddddd")
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCartByQuantity: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === product._id);

            if (existingItem) {
                // If the item already exists in the cart, update the quantity
                existingItem.quantity = quantity;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i._id !== action.payload
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },
        shippingInfo: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload.error
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.payload.products.products
                state.length = action.payload.payload.products.length
                state.resultPerPage = action.payload.payload.products.resultPerPage
                state.message = action.payload.message
                state.productsCount = action.payload.payload.products.productsCount
                state.filteredProductsCount = action.payload.payload.products.filteredProductsCount
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getProductDetail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.productDetails = action.payload.payload.product
                state.message = action.payload.message
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getRatedProducts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getRatedProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.topRated = action.payload.payload.products
                state.message = action.payload.message
            })
            .addCase(getRatedProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.topRated = null
            })
            .addCase(getReviewedProducts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getReviewedProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.reviewed = action.payload.payload.products
                state.message = action.payload.message
            })
            .addCase(getReviewedProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.reviewed = null
            })
            .addCase(getNewArrivalProducts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getNewArrivalProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.newArrival = action.payload.payload.products
                state.message = action.payload.message
            })
            .addCase(getNewArrivalProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
                state.newArrival = null
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(getAdminProducts.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.payload.products
                state.message = action.payload.message
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.error
            })

    }
})

export const { reset, addToCart, resetCart, addToCartByQuantity, removeFromCartByQuantity, removeFromCart, shippingInfo } = productSlice.actions

export default productSlice.reducer