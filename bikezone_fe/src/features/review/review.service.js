import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create Review
const createReview = async (reviewData) => {
    const response = await axios.put(API_URL + 'review', reviewData, { withCredentials: true })
    return response.data
}

const reviewService = {
   createReview
}
export default reviewService