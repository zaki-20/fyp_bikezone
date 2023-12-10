import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create used bike ad
const createUsedBike = async (usedBikeData) => {
    const response = await axios.post(API_URL + 'usedbike/new', usedBikeData, { withCredentials: true })
    return response.data
}


const usedBikeService = {
    createUsedBike,
}
export default usedBikeService