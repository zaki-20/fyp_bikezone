import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"
import authReducer from "../features/auth/auth.slice"
import orderReducer from "../features/order/order.slice"
import reviewReducer from "../features/review/review.slice"
import blogReducer from "../features/blog/blog.slice"

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        order: orderReducer,
        review: reviewReducer,
        blog: blogReducer
    },
});
export default store
