import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'
import bikeAnimation from '../assets/animated/aboutus.json'
import { AboutUsAccordion } from './AboutUsAccordion';


const AboutUs = () => {

    return (
        <div className='p-4 bg-[#d0d1d1]'>

            <div className="flex items-center lg:h-screen font-poppins dark:bg-gray-800 ">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="px-4 mb-10 md:text-center md:mb-20">
                        <p className="my-5 text-lg font-semibold text-[#122222] dark:text-gray-400">
                            About Us
                        </p>
                        <h2 className="pb-2 text-2xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
                            Welcome to <span>BIKEZONE</span> – Your Ultimate Destination for Everything Motorcycle!

                        </h2>
                        <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
                            <div className="flex-1 h-2 bg-blue-200">
                            </div>
                            <div className="flex-1 h-2 bg-blue-400">
                            </div>
                            <div className="flex-1 h-2 bg-blue-300">
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center rounded-md shadow-[inset_3px_0px_41px_22px_#00000024] shadow-gray-400 p-4 bg-[#e4e4e4]">
                        <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                            <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
                                We are providing a better facility
                            </h2>
                            <p className="mb-4 text-base leading-7 text-gray-500 dark:text-gray-400">
                                We are dedicated to providing a superior facility for all your riding needs, setting a new standard in the world of motorcycles.
                            </p>
                            <ul className="mb-10">
                                <li className="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span className="mr-3 text-[#122222] dark:text-blue-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </span>
                                    Wide Product Selection
                                </li>
                                <li className="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span className="mr-3 text-[#122222] dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </span>
                                    User-Friendly Shopping
                                </li>
                                <li className="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span className="mr-3 text-[#122222] dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </span>
                                    Up-to-Date Content
                                </li>
                                <li className="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span className="mr-3 text-[#122222] dark:text-blue-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                        </svg>
                                    </span>
                                    Secure Shopping
                                </li>
                            </ul>

                        </div>
                        <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0">
                            <Lottie
                                className=" "
                                animationData={bikeAnimation}
                            />
                            <div className="absolute top-0 right-0 items-center justify-center hidden -mt-16 lg:inline-flex">

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className='px-[100px] py-10'>
                <AboutUsAccordion />
            </div>
        </div>
    )
}

export default AboutUs