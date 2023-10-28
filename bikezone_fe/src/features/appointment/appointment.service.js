import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create appointment
const createAppoitment = async (appointmentData) => {
    console.log(appointmentData)
    const response = await axios.post(API_URL + 'workshops/appointment/new', appointmentData, { withCredentials: true })
    return response.data
}


const appointmentService = {
    createAppoitment,

}
export default appointmentService