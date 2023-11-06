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

//get single workshops
const getMyWorkshop = async () => {
    const response = await axios.get(API_URL + `workshops/me`, { withCredentials: true })
    return response.data
}

//delete my workshops
const deleteMyWorkshop = async (id) => {
    const response = await axios.delete(API_URL + `workshop/${id}`, { withCredentials: true })
    return response.data
}

//update my workshops
const updateMyWorkshop = async (id, values) => {
    const response = await axios.put(API_URL + `workshop/update/${id}`, values, { withCredentials: true })
    return response.data
}


const workshopService = {
    createWorkshop,
    getAllWorkshops,
    getSingleWorkshop,
    getMyWorkshop,
    deleteMyWorkshop,
    updateMyWorkshop
}
export default workshopService