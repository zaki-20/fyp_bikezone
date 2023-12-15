import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { Avatar } from '@mui/material';
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../features/review/review.thunk';
import { getProductDetail } from '../../features/product/product.thunk';

const ReviewCard = ({ review, product }) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { isError, message, isLoading, productDetails } = useSelector(state => state.product)


    //for star rating
    const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        filledIcon: <BsStarFill size={18} />,
        halfIcon: <BsStarHalf size={18} />,
        emptyIcon: <BsStar size={18} color='gold' />
    }//end rating

    const handleDeleteClick = async () => {
        try {
            await dispatch(deleteReview({ reviewId: review._id, productId: product?._id }));

            await dispatch(getProductDetail(product?._id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (

        <div className="px-5 py-4 bg-[#122222] dark:bg-gray-800 shadow rounded-lg w-[400px]">
            <div className="flex mb-4 border-b py-2 border-white">
                {review?.imageURL ? (
                    <img src={review.imageURL} alt="" className="w-12 h-12 rounded-full" />
                ) : (
                    <Avatar className="w-12 h-12 rounded-full"></Avatar>
                )}
                <div className="ml-2 mt-0.5 w-[70%]">
                    <span className="block font-medium text-base leading-snug text-white dark:text-gray-100">
                        {review?.firstname + ' ' + review?.lastname}
                    </span>
                    <ReactStars {...options} />

                </div>
                <div className='w-[30%] flex justify-end'>
                    {review?.user === user?._id && (
                        <MdDelete size={26} className='text-red-600 hover:text-red-700 duration-200 hover:scale-110 hover:cursor-pointer' onClick={handleDeleteClick} />
                    )}
                </div>
            </div>
            <div className="max-h-[200px]">
                <p className="text-white dark:text-gray-100 leading-snug md:leading-normal">{review.comment}</p>
            </div>
        </div>
    )
}

export default ReviewCard