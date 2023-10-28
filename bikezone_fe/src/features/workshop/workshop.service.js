import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create Workshop
const createWorkshop = async (workshopData) => {
    const response = await axios.post(API_URL + 'workshop/new', workshopData, { withCredentials: true })
    return response.data
}

//get all workshops
const getAllWorkshops = async () => {
    const response = await axios.get(API_URL + `workshops`, { withCredentials: true })
    return response.data
}

//get single workshops
const getSingleWorkshop = async (id) => {
    const response = await axios.get(API_URL + `workshop/${id}`, { withCredentials: true })
    return response.data
}

const workshopService = {
    createWorkshop,
    getAllWorkshops,
    getSingleWorkshop
}
export default workshopService