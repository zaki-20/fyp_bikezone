import React, { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import MetaData from '../components/MetaData'
import TopRatedProducts from '../components/sections/TopRatedProducts'
import ReviewedProducts from '../components/sections/ReviewedProducts'
import NewArrivalProducts from '../components/sections/NewArrivalProucts'

const HomePage = () => {
  return (
    <div>
      <MetaData title={"BIKEZONE"} />
      <HeroSection />
      <FeaturedProducts />
      <TopRatedProducts />
      <ReviewedProducts />
      <NewArrivalProducts />
    </div>
  )
}

export default HomePage