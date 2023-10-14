import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"
import authReducer from "../features/auth/auth.slice"
import orderReducer from "../features/order/order.slice"
import reviewReducer from "../features/review/review.slice"

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        order: orderReducer,
        review: reviewReducer
    },
});
export default store
