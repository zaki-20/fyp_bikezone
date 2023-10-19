import React, { useEffect } from 'react'
import ProductCard from '../cards/ProductCard'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../features/product/product.thunk'
import { useDispatch, useSelector } from 'react-redux'
import CardLoading from '../../pages/shared/CardLoading'


const FeaturedProducts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts({}))
    }, [dispatch])

    const { isError, isLoading, products } = useSelector((state) => state.product)

    if (isLoading) {
        return (
            <>
                <div className="flex flex-col bg-[#def5f596]">
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

        <div className="flex flex-col bg-[#d0d1d1]">
            <div className='flex justify-between items-center mx-5'>
                <h1 className="flex py-5 md:ml-10 md:mx-10  font-bold text-4xl text-[#122222]">
                    Featured Products
                </h1>
                <Link to={"/featuredproducts"} className='underline hover:text-blue-600'>View All</Link>
            </div>
            <div className="flex overflow-x-scroll no-scrollbar pb-10 px-4">
                <div className="flex flex-nowrap  ml-10 gap-10">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => {
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

export default FeaturedProducts