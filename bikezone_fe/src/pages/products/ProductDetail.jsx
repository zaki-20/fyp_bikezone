import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, getProductDetail } from '../../features/product/product.thunk';
import { useParams } from 'react-router-dom';
import Carousal from '../../components/Carousal';
import Loader from '../shared/Loader';
import ReviewCard from '../../components/cards/ReviewCard';
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../components/MetaData';
import { addToCart } from '../../features/product/product.slice';


const ProductDetail = () => {
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    const { isError, message, isLoading, productDetails } = useSelector(state => state.product)


    const increaseQuantity = () => {
        if (productDetails.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty)
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty)
    };


    const showErrorToast = () => {
        toast.error(message);
    };

    //for star rating
    const options = {
        edit: false,
        value: productDetails && productDetails.ratings,
        isHalf: true,
        filledIcon: <BsStarFill size={18} />,
        halfIcon: <BsStarHalf size={18} />,
        emptyIcon: <BsStar size={18} color='gold' />
    }//end rating


    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    }
    if (isError) {
        <>
            <span> {isError && showErrorToast()} </span>
        </>
    }

    const cartHandler = () => {
        const product = JSON.parse(localStorage.getItem('cartItems'))

        if (productDetails) {
            const item = {
                product: productDetails,
                quantity: quantity,
            };
            // console.log({ productDetailsId: productDetails._id, quantity });            
            // dispatch(addItemsToCart({ productDetailsId: productDetails._id, quantity }));
            dispatch(addToCart(item))
            toast.success("item added to the cart")
        } else {
            toast.error("not available in stock")
        }

    };


    return (
        <div>
            <MetaData title={`${productDetails?.name} -- BIKEZONE`} />
            {
                !isLoading && productDetails && (
                    <div className="overflow-hidden bg-[#def5f596] py-11 font-poppins dark:bg-gray-800">
                        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full px-4 md:w-1/2 ">
                                    <div className="sticky top-0 z-50 overflow-hidden ">
                                        <div className="z-50 mb-6 lg:mb-10 lg:h-2/4 ">
                                            <div className=" mb-6 lg:mb-10 ">

                                                <div className='h-[400px]'>
                                                    <Carousal />
                                                </div>

                                                {/* <Carousel>
                                                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className='z-50' alt="" />
                                                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="" />
                                                    <img src={shadowBikeImage} className='z-50' alt="" />
                                                </Carousel> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2 ">
                                    <div className="lg:pl-20">
                                        <div className="mb-5 ">
                                            <span className="text-lg font-medium text-rose-500 dark:text-rose-200">{`${productDetails.brand} - ${productDetails.category}`}</span>
                                            <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                                {productDetails.name}</h2>
                                            <div className="flex items-center mb-6 gap-4">

                                                <ReactStars  {...options} />

                                                <p className="text-xs dark:text-gray-400 ">({productDetails.numOfReviews} customer reviews)</p>
                                            </div>

                                            <p className="flex items-end gap-2 mb-5 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                                <span>{productDetails.price} </span>
                                                <span className='text-xl'>Rs/-</span>
                                            </p>
                                            <p className={productDetails.Stock < 0 ? `text-red-500 font-bold` : `font-bold text-green-600`}>{productDetails.Stock < 0 ? "Out Of Stock" : "In Stock"} </p>
                                        </div>


                                        <div className="w-32  mb-6 border-gray-500 border-2 rounded ">
                                            <label htmlFor="true" className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">{productDetails.quantity}</label>
                                            <div className="relative flex flex-row w-full h-10  bg-transparent rounded-lg">
                                                <button onClick={decreaseQuantity} className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                                    <span className="m-auto text-2xl font-thin">-</span>
                                                </button>
                                                <input type="number" readOnly className="flex cursor-not-allowed border-none items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 text-md " value={quantity} />
                                                <button onClick={increaseQuantity} className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                            {productDetails.description}
                                        </p>
                                        <div className="flex flex-wrap items-center -mx-4 ">
                                            <button onClick={cartHandler} className="flex items-center justify-center w-full p-4 text-[#122222] border border-[#122222] rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-[#122222] hover:border-[#122222] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                                Add to Cart
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div >
                            <div className='font-bold  flex bg-gray-50 justify-center py-6 '>
                                <div className='border-b-2 w-[15%] text-2xl py-2 text-center'>Reviews</div>
                            </div>
                            <div className="flex overflow-x-scroll bg-gray-50 no-scrollbar pb-10 px-4">
                                <div className="flex ml-10 gap-10 ">

                                    {
                                        productDetails.reviews && productDetails.reviews[0] ? (
                                            productDetails.reviews && productDetails.reviews.map((review) => {
                                                return (<>
                                                    <ReviewCard key={review._id} review={review} />
                                                </>
                                                )
                                            })
                                        ) : (
                                            <div className="flex items-center justify-center text-lg text-red-700 font-bold">
                                                No reviews yet
                                            </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetail