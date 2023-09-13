import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../features/product/product.thunk';
import { useNavigate, useParams } from 'react-router-dom';
import Carousal from '../components/Carousal';
import Loader from './shared/Loader';
import ReviewCard from '../components/ReviewCard';
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    const { isError, isSuccess, message, isLoading, productDetails } = useSelector(state => state.product)

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
    

    return (
        <div>

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

                                            <p className="inline-block mb-5 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                                <span>{productDetails.price}</span>
                                            </p>
                                            <p className={productDetails.Stock < 0 ? `text-red-500 font-bold` : `font-bold text-green-600`}>{productDetails.Stock < 0 ? "Out Of Stock" : "In Stock"} </p>
                                        </div>


                                        <div className="w-32 mb-6 ">
                                            <label htmlFor className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">{productDetails.quantity}</label>
                                            <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                                    <span className="m-auto text-2xl font-thin">-</span>
                                                </button>
                                                <input type="number" className="flex border-none items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder={1} />
                                                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                            {productDetails.description}
                                        </p>
                                        <div className="flex flex-wrap items-center -mx-4 ">
                                            <button  className="flex items-center justify-center w-full p-4 text-[#122222] border border-[#122222] rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-[#122222] hover:border-[#122222] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
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
                                                    <ReviewCard review={review} />
                                                    <ReviewCard review={review} />
                                                    <ReviewCard review={review} />
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
            <ToastContainer position='top-center' />
        </div>
    )
}

export default ProductDetail