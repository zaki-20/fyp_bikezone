import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProductCard = ({ product, newArrive }) => {
    const navigate = useNavigate()

    // const {  productDetails } = useSelector(state => state.product)

    //for star rating
    const options = {
        edit: false,
        value: product.ratings,
        isHalf: true,
        filledIcon: <BsStarFill size={18} />,
        halfIcon: <BsStarHalf size={18} />,
        emptyIcon: <BsStar size={18} color='gold' />
    }//end rating

    const clicker = () => {
        navigate(`/product/${product._id}`)
    }

    return (

        <div className="w-[250px] bg-[#aaeeee] shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/product/${product._id}`} >
                <div className='relative'>
                    <img className="  rounded-t-lg p-8 object-cover w-full h-52" src="helmet.jpg" alt="productImage" />
                    {newArrive && (<span class="absolute z-50 top-0 left-0 inline-flex mt-1 ml-1 px-2 py-1 rounded-lg bg-red-500 text-xs font-medium text-white select-none">
                        New Arrival
                    </span>)}
                </div>
            </Link>
            <div className="px-5 pb-5">
                <Link to="#">
                    <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white">{product.name}</h3>
                </Link>
                <div className="flex items-center mt-2.5 mb-3">
                    <ReactStars  {...options} />
                    <span className='ml-1'> ({product.numOfReviews} reviews)</span>

                </div>
                <div className="flex items-start gap-y-4 flex-col justify-between ">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">RS. {product.price} PKR</span>
                    <Link to={`/product/${product._id}`} className="text-white bg-[#122222] hover:text-yellow-300  w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View
                        Details
                    </Link>
                </div>
            </div>
        </div>




    )
}

export default ProductCard