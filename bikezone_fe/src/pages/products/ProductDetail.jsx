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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Rating } from '@mui/material';
import { createReview } from '../../features/review/review.thunk';
import { reset } from '../../features/review/review.slice';
import Lottie from 'lottie-react'
import ratingAnimation from '../../assets/animated/ratingProduct.json'
import checkDetailsAnimation from '../../assets/animated/checkDetails.jsx.json'



const ProductDetail = () => {

    const { id } = useParams();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    //===================================================================
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reviewSubmitHandler = () => {


        const reviewData = {
            rating, comment, productId: id
        }
        // const myForm = new FormData();

        // myForm.set("rating", rating);
        // myForm.set("comment", comment);
        // myForm.set("productId", id);

        dispatch(createReview(reviewData))
        setOpen(false);
    };


    //=====================================================================

    const { isError, message, isLoading, productDetails } = useSelector(state => state.product)
    const { isError: reviewError, message: reviewMsg, isLoading: reviewLoad, isSuccess } = useSelector(state => state.review)

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id, isSuccess]);

    useEffect(() => {
        if (reviewError) {
            toast.error(reviewMsg)
            reset()
        }

    }, [reviewError])

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
        if (productDetails) {
            const item = {
                product: productDetails,
                quantity: quantity,
            };

            // Get cart items from local storage
            const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


            // Check if the product with the same ID already exists in the cart
            const existingItem = storedCartItems.find((cartItem) => cartItem._id === productDetails._id);


            if (productDetails.Stock > (existingItem ? (existingItem.quantity + quantity) : (quantity))) {

                dispatch(addToCart(item));
                toast.success("Item added to the cart");
            } else {
                toast.error("Not available in stock huhu");
            }
        } else {
            toast.error("not available in stock haha")
        }
    };



    return (
        <div>
            <MetaData title={`${productDetails?.name} -- BIKEZONE`} />

            {
                !isLoading && productDetails && (
                    <div className="overflow-hidden bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 py-11 font-poppins dark:bg-gray-800">
                        <h1 className='text-center text-2xl font-semibold'>Product Detail</h1>
                        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                            <Lottie
                                className="absolute top-10 left-48 h-56"
                                animationData={checkDetailsAnimation}
                            />
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full px-4 py-24 md:w-1/2 ">
                                    <div className="z-50 overflow-hidden ">
                                        <div className='z-50 h-[400px] '>
                                            <Carousal />
                                        </div>

                                        {/* <Carousel>
                                                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className='z-50' alt="" />
                                                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="" />
                                                    <img src={shadowBikeImage} className='z-50' alt="" />
                                                </Carousel> */}

                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2 rounded-md shadow-[inset_3px_0px_41px_22px_#00000024] shadow-gray-400 p-4 bg-[#e4e4e4]  ">
                                    <div className="p-2">
                                        <div className="mb-5 ">
                                            <p className='text-xs text-gray-700'>product #: {productDetails._id}</p>
                                            <span className="text-lg font-medium text-red-600 ">{`${productDetails.brand} - ${productDetails.category}`}</span>
                                            <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                                {productDetails.name}</h2>

                                            <div className="flex items-center mb-6 gap-4">

                                                <ReactStars  {...options} />

                                                <p className="text-xs dark:text-gray-400 ">({productDetails.numOfReviews} customer reviews)</p>
                                            </div>

                                            <p className="flex items-center gap-2 mb-5 text-3xl font-bold text-gray-700 dark:text-gray-400 ">
                                                <span className='text-xl'>RS.</span>
                                                <span> {productDetails.price} </span>
                                                <span className='text-xl'>PKR</span>
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
                                            <button onClick={cartHandler} className="flex items-center justify-center w-full p-4  border border-white rounded-md dark:text-gray-200 duration-200 dark:border-blue-600 bg-[#122222] hover:border-[#122222] hover:text-yellow-400 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                                Add to Cart
                                            </button>
                                            <button onClick={handleClickOpen} className="flex mt-2 items-center justify-center w-full p-4 text-[#122222] border border-[#122222] duration-200 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-[#122222] hover:border-[#122222] hover:text-yellow-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                                Submit Review
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">
                                    {"Submit your review here"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText className='flex flex-col items-start'>
                                        <Rating
                                            itemType='number'
                                            onChange={(e) => setRating(parseFloat(e.target.value))}
                                            value={rating}
                                            size="large"
                                            className="mb-4"
                                        />

                                        <textarea
                                            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                                            cols="30"
                                            rows="5"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Enter your comment..."

                                        ></textarea>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color='error' autoFocus onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button color='success' onClick={reviewSubmitHandler} autoFocus>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className='relative'>
                            <div className='font-bold  border-black border-t border-l border-r shadow-2xl  flex bg-[#b6b6b6] justify-center mx-6 py-6 '>
                                <div className='border-b-2 border-[#122222]  w-[15%] text-2xl py-2 text-center'>Reviews</div>
                                <Lottie
                                    className="absolute w-36 right-6 top-0"
                                    animationData={ratingAnimation}
                                />
                            </div>

                            <div className="flex overflow-x-scroll border-black border-b border-l border-r  shadow-xl bg-[#b6b6b6] no-scrollbar mx-6  pb-10 px-4">
                                <div className="flex ml-10 mt-4 gap-10 ">

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