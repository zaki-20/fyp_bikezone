// Load cartItems from local storage
const storedCartItems = localStorage.getItem('cartItems');
const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

const storedShippingInfo = localStorage.getItem('shippiInfo');
const initialShippingInfo = storedShippingInfo ? JSON.parse(storedShippingInfo) : {};


const initialProductState = {
    cartItems: initialCartItems,
    shippingInfo: initialShippingInfo,
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