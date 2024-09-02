import React from 'react'
import { GiCarWheel } from "react-icons/gi";
import { FaTools } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from 'react-router-dom';





const Services = () => {
    const navigate = useNavigate()


    const navigateToProductsPage = () => {
        navigate('/featuredproducts')
    }

    const navigateToCreateWorkshopPage = () => {
        navigate("/create-workshop")
    }

    const navigateToWorkshopPage = () => {
        navigate("/workshops")
    }

    const navigateToUsedBikePage = () => {
        navigate("/usedbikes")
    }

    const navigateToRentalBikePage = () => {
        navigate("/rental-bikes")
    }

    const navigateToBlogPage = () => {
        navigate("/blogs")
    }




    return (
        <div className='px-10'>
            <section className="pt-16 lg:pt-[80px] pb-12 lg:pb-[70px]">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">

                            <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
                                <span className="font-semibold text-lg text-primary mb-2 block">
                                    Our Services
                                </span>
                                <h2 className=" font-bold  text-3xl sm:text-4xl md:text-[40px] text-dark mb-4 ">
                                    What We Offer
                                </h2>
                                <p className="text-base text-body-color">
                                    Upgrade your ride with our carefully designed
                                    and customer-focused services.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">

                        <div className="w-full md:w-1/2 lg:w-1/3 px-4 ">
                            <div onClick={navigateToProductsPage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50 hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[60px] h-[60px] flex items-center justify-center bg-primary rounded-2xl mb-8 ">
                                    <GiCarWheel className='h-40 w-40 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Purchase Products Online
                                </h4>
                                <p className="text-body-color">
                                    Discover top-notch biking gear & accessories with our convenient
                                    online shopping experience.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div onClick={navigateToCreateWorkshopPage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50  hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[60px] h-[60px] flex items-center justify-center bg-primary rounded-2xl mb-8 ">
                                    <FaTools className='h-32 w-32 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Register Your Workshops
                                </h4>
                                <p className="text-body-color">
                                    Elevate your workshop's profile by registering with us &
                                    connecting with a broader biking community.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div onClick={navigateToWorkshopPage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50  hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[60px] h-[60px] flex items-center justify-center bg-primary rounded-2xl mb-8 ">
                                    <AiOutlineSchedule className='h-32 w-32 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Appointment Booking
                                </h4>
                                <p className="text-body-color">
                                    Simplify your schedule with our easy booking for personalized bike services,
                                    tailored to your convenience and specific needs
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div onClick={navigateToUsedBikePage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50  hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8">

                                    <PiMotorcycleFill className='h-40 w-40 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Sell & Buy Used Bikes
                                </h4>
                                <p className="text-body-color">
                                    Easily list or find detailed information on our platform, enabling
                                    straightforward communication for hassle-free offline deals
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div onClick={navigateToRentalBikePage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50  hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8">

                                    <PiMotorcycleFill className='h-40 w-40 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Rental Bikes
                                </h4>
                                <p className="text-body-color">
                                    We dejoy working with discerning clients, people for whom
                                    qualuty, service, integrity &amp; aesthetics.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div onClick={navigateToBlogPage} className="group cursor-pointer p-10 md:px-7 xl:px-10 rounded-[20px] bg-gray-200 hover:bg-yellow-50  hover:shadow-[0_10px_20px_rgba(236,_201,_75,_0.7)] duration-500 hover:scale-105 mb-8 ">
                                <div className=" w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8">

                                    <MdContentCopy className='h-40 w-40 group-hover:text-yellow-500 duration-500' />
                                </div>
                                <h4 className="font-semibold text-xl text-dark mb-3">
                                    Write Your Blog Post
                                </h4>
                                <p className="text-body-color">
                                    Fuel your passion for biking culture through engaging
                                    articles and insights in our blog section.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services