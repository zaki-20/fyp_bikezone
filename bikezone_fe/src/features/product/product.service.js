import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'




//getAllProducts
const getAllProducts = async (keyword, currentPage, price, category, ratings) => {
    const response =
        await axios.get(API_URL + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)

    if (category) {
        const response =
            await axios.get(API_URL + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)
        return response.data
    }
    return response.data
}

//getAllProducts
const getProductDetail = async (id) => {
    const response = await axios.get(API_URL + `product/${id}`)
    return response.data
}

//get top rated products
const getRatedProducts = async () => {
    const response = await axios.get(API_URL + `products/top-rated`)
    return response.data
}

//get top rated products
const getReviewedProducts = async () => {
    const response = await axios.get(API_URL + `products/reviewed`)
    return response.data
}

//get new arrival  products
const getNewArrivalProducts = async () => {
    const response = await axios.get(API_URL + `products/new-arrival`)
    return response.data
}

//create Product --admin
const createProduct = async (data) => {
    const response = await axios.post(API_URL + 'admin/product/new', data, { withCredentials: true })
    return response.data
}

//get all products --admin
const getAdminProducts = async (id) => {
    const response = await axios.get(API_URL + `admin/products`, { withCredentials: true })
    return response.data
}

//delete  product --admin
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + `admin/product/${id}`, { withCredentials: true })
    return response.data
}

//update product --admin
const updateProduct = async (values, id) => {
    const response = await axios.put(API_URL + `admin/product/${id}`, values, { withCredentials: true })
    return response.data
}


const productService = {
    getAllProducts,
    getProductDetail,
    getRatedProducts,
    getReviewedProducts,
    getNewArrivalProducts,
    getAdminProducts,
    createProduct,
    deleteProduct,
    updateProduct
}
export default productService