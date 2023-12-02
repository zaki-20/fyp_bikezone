import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create createRentBike
const createRentBike = async (rentBikeData) => {
    console.log(rentBikeData)
    const response = await axios.post(API_URL + 'rentbike/new', rentBikeData, { withCredentials: true })
    return response.data
}

const rentBikeService = {
    createRentBike,
}
export default rentBikeService