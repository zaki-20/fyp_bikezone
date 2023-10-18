import React, { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import MetaData from '../components/MetaData'
import TopRatedProducts from '../components/sections/TopRatedProducts'

const HomePage = () => {
  return (
    <div>
      <MetaData title={"BIKEZONE"} />
      <HeroSection />
      <FeaturedProducts />
      <TopRatedProducts />
    </div>
  )
}

export default HomePage