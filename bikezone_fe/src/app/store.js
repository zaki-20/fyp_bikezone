import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"

 const store = configureStore({
    reducer: {
        product: productReducer
    },
});
export default store
