import { createSlice } from "@reduxjs/toolkit";
import { createReview} from "./review.thunk";
import initialReviewState from './review.initialstate'

const reviewSlice = createSlice({
    name: "review",
    initialState: initialReviewState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false

            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
         
    }
})
export const { reset } = reviewSlice.actions

export default reviewSlice.reducer