import React, { useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../features/product/product.thunk'
import { useDispatch, useSelector } from 'react-redux'
import CardLoading from '../../pages/shared/CardLoading'
import Lottie from 'lottie-react'
import storeOpenAnimation from '../../assets/animated/storeOpen.json'


const FeaturedProducts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts({}))
    }, [dispatch])

    const { isError, isLoading, products } = useSelector((state) => state.product)

    if (isLoading) {
        return (
            <>
                <div className="flex flex-col ">
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
                        All Products
                    </h1>
                    <Lottie
                        className="h-32"
                        animationData={storeOpenAnimation}
                    />
                </div>
                <Link to={"/featuredproducts"} className='underline hover:text-blue-600'>View All</Link>
            </div>
            <div className="flex overflow-x-scroll no-scrollbar py-8 px-4">
                <div className="flex flex-nowrap  ml-10 gap-10">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => {
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

export default FeaturedProducts