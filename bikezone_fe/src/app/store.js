import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice"
import authReducer from "../features/auth/auth.slice"
import orderReducer from "../features/order/order.slice"
import reviewReducer from "../features/review/review.slice"
import blogReducer from "../features/blog/blog.slice"
import contactReducer from "../features/contact/contact.slice"
import workshopReducer from "../features/workshop/workshop.slice"
import appointmentReducer from "../features/appointment/appointment.slice"
import rentBikeReducer from "../features/rentbike/rentbike.slice"
import usedBikeReducer from "../features/usedbike/usedbike.slice"

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        order: orderReducer,
        review: reviewReducer,
        blog: blogReducer,
        contact: contactReducer,
        workshop: workshopReducer,
        appointment: appointmentReducer,
        rentBike: rentBikeReducer,
        usedBike: usedBikeReducer
    },
});
export default store
