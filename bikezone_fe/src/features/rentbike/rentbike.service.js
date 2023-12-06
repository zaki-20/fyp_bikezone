import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create createRentBike
const createRentBike = async (rentBikeData) => {
    console.log(rentBikeData)
    const response = await axios.post(API_URL + 'rentbike/new', rentBikeData, { withCredentials: true })
    return response.data
}

//get all rental bikes
const getAllRentBikes = async () => {
    const response = await axios.get(API_URL + `rentbikes`, { withCredentials: true })
    return response.data
}

//get rent Bike detail
const getDetailRentBike = async (id) => {
    const response = await axios.get(API_URL + `rentbike/${id}`, { withCredentials: true })
    return response.data
}

//get my rental bikes ad detail
const getMyRentBikes = async () => {
    const response = await axios.get(API_URL + `rentbikes/me`, { withCredentials: true })
    return response.data
}

//update my rent bike ad
const updateMyRentBike = async (id, values) => {
    console.log(id, values)
    const response = await axios.put(API_URL + `rentbike/${id}`, values, { withCredentials: true })
    return response.data
}

const rentBikeService = {
    createRentBike,
    getAllRentBikes,
    getDetailRentBike,
    getMyRentBikes,
    updateMyRentBike
}
export default rentBikeService