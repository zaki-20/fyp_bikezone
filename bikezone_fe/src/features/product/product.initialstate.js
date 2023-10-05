// Load cartItems from local storage
const storedCartItems = localStorage.getItem('cartItems');
const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];


const initialProductState = {
    cartItems: initialCartItems,
    products: [],
    productDetails: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    length: null,
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null

};

export default initialProductState;