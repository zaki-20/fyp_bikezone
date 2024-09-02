import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create appointment
const createAppoitment = async (appointmentData) => {
    const response = await axios.post(API_URL + 'workshops/appointment/new', appointmentData, { withCredentials: true })
    return response.data
}

//get single appointment
const getSingleAppointment = async (id) => {
    const response = await axios.get(API_URL + `workshops/appointment/${id}`, { withCredentials: true })
    return response.data
}


const appointmentService = {
    createAppoitment,
    getSingleAppointment
}
export default appointmentService