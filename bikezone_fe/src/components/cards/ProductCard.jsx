import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom';



const ProductCard = ({ product }) => {
    const navigate = useNavigate()


    //for star rating
    const options = {
        edit: false,
        value: product.ratings,
        isHalf: true,
        filledIcon: <BsStarFill size={18} />,
        halfIcon: <BsStarHalf size={18} />,
        emptyIcon: <BsStar size={18} color='gold' />
    }//end rating

    const clicker =( )=> {
        
        navigate(`/product/${product._id}`)
    }

    return (

        <div className="w-[300px] bg-[#aaeeee] shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div onClick={clicker} >
                <img className="rounded-t-lg p-8 object-cover w-full h-52" src="helmet.jpg" alt="productImage" />
            </div>
            <div className="px-5 pb-5">
                <Link to="#">
                    <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white">{product.name}</h3>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">
                    <ReactStars  {...options} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                    <Link to="/cart" className="text-white bg-[#122222] hover:text-yellow-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        to cart</Link>
                </div>
            </div>
        </div>




    )
}

export default ProductCard