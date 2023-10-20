import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create post
const createContact = async (contactData) => {
    const response = await axios.post(API_URL + 'contactus/new', contactData, { withCredentials: true })
    return response.data
}


const contactService = {
    createContact
}
export default contactService