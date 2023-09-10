import React, { useEffect, useState } from 'react'
import ProductCard from '../components/cards/ProductCard'
import { motorbikeProducts } from '../Utils/productData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/product.thunk'


const FeaturedProductsPage = () => {

  const dispatch = useDispatch()

  const { products, length } = useSelector(state => state.products)
  console.log("products", products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <div className='bg-[#def5f596]'>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols3 xl:grid-cols-4 gap-5">

          {
            products?.products?.map((product, index) => {
              return (
                <ProductCard key={index} product={product} />
              )
            })
          }
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProductsPage