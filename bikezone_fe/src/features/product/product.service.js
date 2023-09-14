import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'

//getAllProducts
const getAllProducts = async (keyword , currentPage ) => {
    // console.log("helo from service before axios")
    const response = await axios.get(API_URL + `products?keyword=${keyword}&page=${currentPage}`)
    console.log(keyword, "&", currentPage)
    return response.data
}

//getAllProducts
const getProductDetail = async (id) => {
    // console.log("helo from service before axios")
    const response = await axios.get(API_URL + `product/${id}`)
    return response.data
}

const productService = {
    getAllProducts,
    getProductDetail
}
export default productService