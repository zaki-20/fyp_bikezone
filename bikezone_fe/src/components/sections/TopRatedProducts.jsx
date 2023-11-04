import React, { useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import { Link } from 'react-router-dom'
import { getAllProducts, getRatedProducts } from '../../features/product/product.thunk'
import { useDispatch, useSelector } from 'react-redux'
import CardLoading from '../../pages/shared/CardLoading'
import Lottie from 'lottie-react'
import fiveStarAnimation from '../../assets/animated/fiveStar.json'


const TopRatedProducts = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRatedProducts())
    }, [])

    const { isError, isLoading, products, topRated } = useSelector((state) => state.product)

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
                <div>Error happend</div>
            </>
        )
    }


    return (

        <div className="flex flex-col ">
            <div className='flex justify-between items-center mx-5'>
                <div className='flex items-center gap-x-2 py-5 '>
                    <h1 className=" md:ml-10 font-bold text-4xl text-[#122222]">
                        Top Rated Products
                    </h1>
                    <Lottie
                        className=" "
                        animationData={fiveStarAnimation}
                    />
                </div>
                <Link to={"/products/top-rated"} className='underline hover:text-blue-600'>View All</Link>
            </div>
            <div className="flex overflow-x-scroll no-scrollbar pb-10 px-4">
                <div className="flex flex-nowrap  ml-10 gap-10">
                    {Array.isArray(topRated) && topRated.length > 0 ? (
                        topRated.map((product) => {
                            return <ProductCard key={product._id} product={product} />;
                        })
                    ) : (
                        <div>No products available.</div>
                    )}

                </div>
            </div>
        </div>



    )
}

export default TopRatedProducts