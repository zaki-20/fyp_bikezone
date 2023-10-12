import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//create order
const createOrder = async (order) => {

    const response = await axios.post(API_URL + 'order/new', order, { withCredentials: true })
    return response.data
}

//get myOrders 
const myOrders = async () => {
    const response = await axios.get(API_URL + 'orders/me', { withCredentials: true })
    return response.data
}

const orderService = {
    createOrder,
    myOrders
}
export default orderService