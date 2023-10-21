import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"

const ReviewCard = ({ review }) => {


    //for star rating
    const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        filledIcon: <BsStarFill size={18} />,
        halfIcon: <BsStarHalf size={18} />,
        emptyIcon: <BsStar size={18} color='gold' />
    }//end rating

    return (


        <div className="px-5 py-4 bg-[#122222] dark:bg-gray-800 shadow rounded-lg w-[400px]">
            <div className="flex mb-4 border-b py-2 border-white">
                <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className="ml-2 mt-0.5">
                    <span className="block font-medium text-base leading-snug text-white dark:text-gray-100">{review.firstname + " " + review.lastname}</span>
                    <ReactStars  {...options} />
                    
                    {/* <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">16 December at 08:25</span> */}
                </div>
            </div>
            <div className='max-h-[200px]'>
                <p className="text-white dark:text-gray-100 leading-snug md:leading-normal">{review.comment}</p>

            </div>

        </div>




    )
}

export default ReviewCard