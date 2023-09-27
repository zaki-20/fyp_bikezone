import axios from "axios";

const API_URL = 'http://localhost:4000/api/v1/'
 
//getAllProducts
const getAllProducts = async (keyword, currentPage, price, category, ratings) => {
    // console.log("helo from service before axios")
    const response =
        await axios.get(API_URL + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)

        if(category){
            const response =
            await axios.get(API_URL + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)
            return response.data
        }
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