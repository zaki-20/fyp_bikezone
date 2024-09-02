import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create Review
const createReview = async (reviewData) => {
    const response = await axios.put(API_URL + 'review', reviewData, { withCredentials: true })
    return response.data
}

//get all Reviews  --admin
const getProductReviews = async (id) => {
    const response = await axios.get(API_URL + `reviews?id=${id}`, { withCredentials: true })
    return response.data
}

//delete  Reviews  --admin
const deleteReview = async (reviewId, productId) => {
    const response = await axios.delete(API_URL + `reviews?reviewId=${reviewId}&productId=${productId}`, { withCredentials: true })
    return response.data
}


const reviewService = {
   createReview,
   getProductReviews,
   deleteReview
}
export default reviewService