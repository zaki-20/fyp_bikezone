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

//get order details 
const getOrderDetails = async (id) => {
    const response = await axios.get(API_URL + `order/${id}`, { withCredentials: true })
    return response.data
}

//get all orders  --admin 
const getAllOrders = async () => {
    const response = await axios.get(API_URL + 'admin/orders', { withCredentials: true })
    return response.data
}

//delete order  --admin
const deleteOrder = async (id) => {
    const response = await axios.delete(API_URL + `admin/order/${id}`, { withCredentials: true })
    return response.data
}

//update order  --admin 
const updateOrder = async (data) => {
    const response = await axios.put(API_URL + `admin/order/${data.id}`, data, { withCredentials: true })
    return response.data
}


const orderService = {
    createOrder,
    myOrders,
    getOrderDetails,
    getAllOrders,
    deleteOrder,
    updateOrder
}
export default orderService