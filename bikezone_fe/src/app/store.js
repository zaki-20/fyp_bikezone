import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"
import authReducer from "../features/auth/auth.slice"
import orderReducer from "../features/order/order.slice"

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        order: orderReducer
    },
});
export default store
