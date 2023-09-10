import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/products'

//getAllProducts
const getAllProducts = async () => {
    console.log("helo from service before axios")
    const response = await axios.get(API_URL)
    return response.data
}

const productService = {
    getAllProducts,
}
export default productService