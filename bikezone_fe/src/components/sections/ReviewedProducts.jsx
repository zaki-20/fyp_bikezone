import React, { useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import { Link } from 'react-router-dom'
import { getReviewedProducts } from '../../features/product/product.thunk'
import { useDispatch, useSelector } from 'react-redux'
import CardLoading from '../../pages/shared/CardLoading'
import Lottie from 'lottie-react'
import reviewedProductsAnimation from '../../assets/animated/reviewedProducts.json'


const ReviewedProducts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviewedProducts())
    }, [])

    const { isError, isLoading, reviewed } = useSelector((state) => state.product)

    if (isLoading) {
        return (
            <>
                <div className="flex flex-col">
                    <CardLoading />
                </div>
            </>
        )
    }

    if (isError) {
        return (
            <>
                <div>Something Went Wrong</div>
            </>
        )
    }


    return (

        <div className="flex flex-col ">
            <div className='flex justify-between items-center mx-5'>
                <div className='flex items-center py-5 '>
                    <h1 className=" md:ml-10 font-bold text-4xl text-[#122222]">
                        Reviewed Products
                    </h1>
                    {/* <Lottie
                        className="h-36"
                        animationData={reviewedProductsAnimation}
                    /> */}
                </div>
                <Link to={"/featuredproducts"} className='underline hover:text-blue-600'>View All</Link>
            </div>
            <div className="flex overflow-x-scroll no-scrollbar pb-10 px-4">
                <div className="flex flex-nowrap  ml-10 gap-10">
                    {Array.isArray(reviewed) && reviewed.length > 0 ? (
                        reviewed.map((product) => {
                            return <ProductCard key={product._id} product={product} />;
                        })
                    ) : (
                        <div className='w-screen'>
                            <h1 className='text-center text-2xl text-yellow-500 font-semibold'>
                                No products available.
                            </h1>
                        </div>
                    )}

                </div>
            </div>
        </div>


    )
}

export default ReviewedProducts