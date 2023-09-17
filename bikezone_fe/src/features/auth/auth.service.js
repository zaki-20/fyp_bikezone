import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//register user
const register = async (userData) => {
    
    console.log(" in service above", userData)
    const response = await axios.post(API_URL + 'register', userData)

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    
    return response.data
}

//login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData)

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    return response.data
}

const authService = {
    register,
    login

}
export default authService