import React from 'react'

const FeatureSection = () => {
    return (
        <>
            <div className="z-30 relative  items-center justify-center w-full h-full overflow-auto">
                <div className="inset-0 h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp6689710.jpg")' }}>
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center h-screen w-full bg-gray-900 bg-opacity-75" />
                <div className="absolute inset-0  z-30  flex flex-col items-center justify-center">
                    <div className="shadow-2xl rounded-lg w-4/5 h-96 bg-cover bg-center" style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp6689710.jpg")' }}>
                        <div className="grid grid-cols-12 gap-1">
                            <div className="relative my-6 px-8 col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xxl:col-span-7">
                                <div className="border-l-4 border-gray-400 py-20 px-5 mx-2 absolute left-0">
                                    <p className="italic text-white text-xl md:text-4xl lg:text-6xl uppercase text-center animate-move-diagonal font-semibold ">
                                        BikeZone: Where Dreams Take the Road
                                    </p>
                                </div>
                                <div className="text-yellow-400 font-semibold text-xs  mb-4">join us</div>
                                <div className="absolute border-gray-400 border-t-4 bottom-0 py-1 px-4 w-4/5" />
                            </div>
                            <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xxl:col-span-5">
                                <div className="relative bg-pink-900 h-full md:h-96 w-full bg-opacity-50 rounded-tr-lg rounded-br-lg">
                                    <div className="p-8">
                                        <p className="text-yellow-300 text-xs md:text-sm  tracking-widest py-6 mb-4">
                                            "BikeZone, where the love for two wheels knows no bounds.

                                            Here, machines aren't just metal; they're masterpieces, and roads aren't just paths; they're adventures waiting to be had.

                                            Feel the wind, hear the engine, and let the open road be your guide. BikeZone is where your dreams take shape.

                                            We're more than a destination; we're the beginning of your story. Every machine is a dream, every road is a story, and every rider is part of an epic tale.

                                            Join us in this journey where the road never ends, and two wheels mean freedom."
                                        </p>
                                        <div className="bottom-0 absolute p-2 right-0">
                                            <button className="opacity-75 bg-gray-100 duration-200 hover:bg-pink-900 hover:text-white text-sm font-bold py-2 px-4 rounded inline-flex items-center">
                                                <span>Start Your Journey</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureSection