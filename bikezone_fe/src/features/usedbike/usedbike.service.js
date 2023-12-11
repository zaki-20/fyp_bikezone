import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create used bike ad
const createUsedBike = async (usedBikeData) => {
    const response = await axios.post(API_URL + 'usedbike/new', usedBikeData, { withCredentials: true })
    return response.data
}

//get all used bike ad
const getAllUsedBikes = async () => {
    const response = await axios.get(API_URL + 'usedbikes', { withCredentials: true })
    return response.data
}

//get all my used bike ad
const getAllMyUsedBike = async () => {
    const response = await axios.get(API_URL + 'usedbikes/me', { withCredentials: true })
    return response.data
}

//get used Bike detail
const getUsedBikeDetails = async (id) => {
    const response = await axios.get(API_URL + `usedbike/${id}`, { withCredentials: true })
    return response.data
}

//update used Bike 
const updateUsedBike = async (id, values) => {
    const response = await axios.put(API_URL + `usedbike/${id}`,values , { withCredentials: true })
    return response.data
}

//delete used Bike ad
const deleteUsedBikeAd = async (id) => {
    const response = await axios.delete(API_URL + `usedbike/${id}`, { withCredentials: true })
    return response.data
}


const usedBikeService = {
    createUsedBike,
    getAllUsedBikes,
    getUsedBikeDetails,
    deleteUsedBikeAd,
    getAllMyUsedBike,
    updateUsedBike
}
export default usedBikeService