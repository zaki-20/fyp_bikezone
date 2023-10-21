import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { Link } from 'react-router-dom'


const WorkShopCards = () => {
    return (

        <div className="flex flex-col  justify-center ">
            <div className="relative bg-[#122222] flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white ">
                <div className="w-full md:w-1/3  grid place-items-center ">
                    <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl h-full" />
                </div>
                <div className="w-full md:w-2/3 bg-[#e6e4e49d] flex rounded-lg flex-col space-y-2 p-3">
                    <div className="flex justify-between items-center">
                        <div className='flex  gap-x-1'>
                            <ImLocation2 size={18} className=' text-gray-600 ' />
                            <p className="text-gray-600 self-end tracking-wider text-xs font-semibold  uppercase ">LAHORE</p>
                        </div>

                        <div className="bg-[#122222] px-3 py-1 rounded-full text-xs font-medium text-yellow-400 hidden md:block">
                            HONDA
                        </div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">AL Zakria Autos</h3>
                    <p className="md:text-lg text-[#122222] text-base">Our Worhsops provides best services across the pakistan, we have best tools and experts for dealing with your machines</p>
                    <div>
                        <button className="px-4 py-2 border-b-4 border border-[#122222] text-[#122222] hover:text-[#122222] hover:bg-yellow-400 transition-all duration-200 w-full">See Details</button>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default WorkShopCards

