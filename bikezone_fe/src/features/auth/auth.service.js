import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//register user
const register = async (userData) => {

    console.log(" in service above", userData)
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(API_URL + 'register', userData, { withCredentials: true })

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }

    return response.data
}

//login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData, { withCredentials: true })

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    return response.data
}

//load user
const loadUser = async () => {
    const response = await axios.get(API_URL + 'me', { withCredentials: true })
    return response.data
}

// Logout user
const logout = async () => {
    const response = await axios.get(API_URL + 'logout', { withCredentials: true })
    console.log(response.data, "logout response data")
    return response.data
}

const authService = {
    register,
    login,
    loadUser,
    logout

}
export default authService