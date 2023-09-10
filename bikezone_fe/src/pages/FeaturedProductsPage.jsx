import React from 'react'
import ProductCard from '../components/cards/ProductCard'
import { motorbikeProducts } from '../Utils/productData'




const FeaturedProductsPage = () => {
  return (
    <div className='bg-[#def5f596]'>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols3 xl:grid-cols-4 gap-5">

          {
            motorbikeProducts.map((product) => {
              return (
                <ProductCard product={product} />
              )
            })
          }
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
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