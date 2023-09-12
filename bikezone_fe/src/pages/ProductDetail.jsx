import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../features/product/product.thunk';
import { useParams } from 'react-router-dom';
import shadowBikeImage from '../assets/shadow-bike.png';
import Carousel from "react-material-ui-carousel"
import Carousal from '../components/Carousal';
import Loader from './shared/Loader';


const ProductDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    const { isError, isSuccess, isLoading, product } = useSelector(state => state.product)

    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    }
    if(isError) {
        <>
        <span>Error occurs</span>
        </>
    }

    return (
        <div>

            {
                !isLoading && product && (
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
                                            <span className="text-lg font-medium text-rose-500 dark:text-rose-200">{`${product.brand} - ${product.category}`}</span>
                                            <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                                {product.name}</h2>
                                            <div className="flex items-center mb-6">
                                                <ul className="flex mr-2">
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <p className="text-xs dark:text-gray-400 ">({product.numOfReviews} customer reviews)</p>
                                            </div>

                                            <p className="inline-block mb-5 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                                <span>{product.price}</span>
                                            </p>
                                            <p className = {product.Stock < 0 ? `text-red-500 font-bold` : `font-bold text-green-600`}>{product.Stock} in stock</p>
                                        </div>


                                        <div className="w-32 mb-6 ">
                                            <label htmlFor className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">{product.quantity}</label>
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
                                            {product.description}
                                        </p>
                                        <div className="flex flex-wrap items-center -mx-4 ">
                                            <button className="flex items-center justify-center w-full p-4 text-[#122222] border border-[#122222] rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-[#122222] hover:border-[#122222] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                                Add to Cart
                                            </button>
                                        </div>
                                        <img src="helmet.jpg" alt="" />
                                    </div>
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