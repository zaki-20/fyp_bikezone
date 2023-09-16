import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import MetaData from '../components/MetaData'

const HomePage = () => {
  return (
    <div>
      <MetaData title={"BIKEZONE"}/>
      <HeroSection />
      <FeaturedProducts />
    
    </div>
  )
}

export default HomePage