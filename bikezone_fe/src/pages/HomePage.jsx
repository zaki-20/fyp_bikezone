import React, { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import MetaData from '../components/MetaData'
import TopRatedProducts from '../components/sections/TopRatedProducts'
import ReviewedProducts from '../components/sections/ReviewedProducts'
import NewArrivalProducts from '../components/sections/NewArrivalProucts'
import ProductSection from '../components/sections/ProductSection'
import FeatureSection from '../components/sections/FeatureSection'
import {motion} from 'framer-motion'
const HomePage = () => {
  return (
    <div>
      <MetaData title={"BIKEZONE"} />
      <HeroSection />
      <ProductSection />
      <FeaturedProducts />
      <TopRatedProducts />
      <ReviewedProducts />
      <NewArrivalProducts />
      <FeatureSection />

    </div>
  )
}

export default HomePage