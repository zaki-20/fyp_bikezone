import React, { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import MetaData from '../components/MetaData'
import TopRatedProducts from '../components/sections/TopRatedProducts'
import ReviewedProducts from '../components/sections/ReviewedProducts'
import NewArrivalProducts from '../components/sections/NewArrivalProucts'
import FeatureSection from '../components/sections/FeatureSection'
import Lottie from 'lottie-react'
import bikeAnimation from '../assets/animated/bikerun.json'
import Services from '../components/sections/Services'

const HomePage = () => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600'>
      <MetaData title={"BIKEZONE"} />

      <HeroSection />

      <div className=" relative overflow-hidden h-36 w-full">
        <Lottie
          className="absolute h-36 w-full animate-move-right "
          animationData={bikeAnimation}
        />
      </div>
      <div className='bg-gray-700 h-1 mx-auto -mt-2 w-2/3 blur-lg animate-pulse roun'></div>


      <Services />

      <FeaturedProducts />
      <TopRatedProducts />
      <ReviewedProducts />
      <NewArrivalProducts />
      <FeatureSection />

    </div>
  )
}

export default HomePage