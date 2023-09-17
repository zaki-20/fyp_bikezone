import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"
import authReducer from "../features/auth/auth.slice"

 const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
    },
});
export default store
