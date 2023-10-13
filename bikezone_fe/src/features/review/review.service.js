import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create Review
const createReview = async (review) => {
    const response = await axios.post(API_URL + 'review', review, { withCredentials: true })
    return response.data
}

const ReviewService = {
   createReview
}
export default ReviewService