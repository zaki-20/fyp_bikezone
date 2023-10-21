import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const ProductSection = () => {
    return (
        <>
            <section className="p-4 lg:p-8 bg-[#d0d1d1]">
                <div className='pb-10 flex flex-col items-center'>
                    <h3 className="text-3xl font-bold ">Services</h3>
                    <div className='h-[1px] w-20 bg-black '></div>
                </div>

                <div className="container mx-auto space-y-12">
                    <div>
                        <h3 className="text-3xl font-bold text-center my-3">Motorbike Products</h3>
                        <div className="flex flex-col overflow-hidden group/edit rounded-md shadow-md lg:flex-row">
                            <img
                                src="https://engineeringlearn.com/wp-content/uploads/2022/08/Parts-of-Motorcycle.jpg"
                                alt="Motorbike Products"
                                className="h-80 dark:bg-gray-500 aspect-video scale-100 group-hover/edit:scale-105 ilter grayscale group-hover/edit:filter-none duration-500 "
                            />
                            <div className="flex flex-col justify-center bg-[#e0e0e0] flex-1 p-6 dark:bg-gray-900">
                                <span className="text-xs uppercase font-semibold my-1 text-[#122222] tracking-widest">Discover  High-Quality  Accessories</span>
                                <h3 className="text-3xl font-bold">Upgrade Your Ride with Premium Motorbike Products</h3>
                                <p className="my-6 dark:text-gray-400">At Motorbike Central, we offer a wide selection of top-notch motorbike products and accessories. From protective gear to performance-enhancing parts, we have everything you need to take your ride to the next level. Browse through our catalog and equip yourself for the ultimate motorcycling experience.</p>
                                <Link to={'/featuredproducts'}>
                                    <button className="relative lg:max-w-[300px] w-full">
                                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                        <span className=" relative flex items-center justify-center h-full w-full rounded border-2 border-black bg-[#d8d8d8] px-3 py-1 text-base font-bold text-black transition-transform duration-300 group hover:bg-yellow-400 hover:text-gray-900 hover:translate-x-2 dark:bg-transparent">
                                            Find Motor-Bike Products
                                            <span className="group-hover:translate-x-2 duration-150">
                                                <HiArrowNarrowRight className="text-black" size={24} />
                                            </span>
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-center my-3">Workshops Services</h3>
                        <div className="flex flex-col overflow-hidden rounded-md group/edit shadow-md lg:flex-row-reverse">
                            <img
                                src="https://moton.co.uk/wp-content/uploads/mot.jpg"
                                alt=""
                                className="h-80 dark:bg-gray-500 aspect-video scale-100  group-hover/edit:scale-105 ilter grayscale group-hover/edit:filter-none duration-500 "
                            />
                            <div className="flex flex-col justify-center bg-[#e9e9e9] flex-1 p-6 dark:bg-gray-900">
                                <span className="text-xs uppercase font-semibold my-1 text-[#122222] tracking-widest">Find Expert Motorbike Workshops</span>
                                <h3 className="text-3xl font-bold">Get the Best Services for Your Bike</h3>
                                <p className="my-6 dark:text-gray-400">
                                    Explore a network of professional motorbike workshops and skilled technicians.
                                    Whether it's regular maintenance, repairs, customizations, or upgrades,
                                    you'll find the right experts for your bike's needs. Our workshop owners are dedicated
                                    to providing top-quality services to keep your motorbike in perfect condition.</p>
                                <button className="relative lg:max-w-[300px] w-full">
                                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                    <span className=" relative flex items-center justify-center h-full w-full rounded border-2 border-black bg-[#d8d8d8] px-3 py-1 text-base font-bold text-black transition-transform duration-300 group hover:bg-yellow-400 hover:text-gray-900 hover:translate-x-2 dark:bg-transparent">
                                        Explore Workshop Services
                                        <span className="group-hover:translate-x-2 duration-150">
                                            <HiArrowNarrowRight className="text-black" size={24} />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-center my-3">Used-Bikes For Sale</h3>
                        <div className="flex flex-col overflow-hidden rounded-md group/edit shadow-md lg:flex-row">
                            <img
                                src="https://static.pakwheels.com/2016/08/Here-Are-5-New-Motorcycles-in-Pakistan-That-You-Can-Buy-in-Rs1-1.5-Lacs.jpg"
                                alt=""
                                className="h-80 dark:bg-gray-500 aspect-video scale-100  group-hover/edit:scale-105 filter grayscale group-hover/edit:filter-none duration-500 "
                            />
                            <div className="flex flex-col justify-center bg-[#e0e0e0] flex-1 p-6 dark:bg-gray-900">
                                <span className="text-xs uppercase dark:text-gray-400">Discover Quality Used Motorbikes</span>
                                <h3 className="text-3xl font-bold">Find Your Perfect Ride</h3>
                                <p className="my-6 dark:text-gray-400">
                                    Browse a wide selection of used motorbikes posted by bike owners just like you.
                                    Whether you're looking for a cruiser, sports bike, or a classic model, you'll
                                    find a variety of options. Contact the bike owners directly to negotiate the
                                    deal and find your perfect ride.</p>
                                <Link to={'/featuredproducts'}>
                                    <button className="relative lg:max-w-[300px] w-full">
                                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                        <span className=" relative flex items-center justify-center h-full w-full rounded border-2 border-black bg-[#d8d8d8] px-3 py-1 text-base font-bold text-black transition-transform duration-300 group hover:bg-yellow-400 hover:text-gray-900 hover:translate-x-2 dark:bg-transparent">
                                            Browse Used Bikes
                                            <span className="group-hover:translate-x-2 duration-150">
                                                <HiArrowNarrowRight className="text-black" size={24} />
                                            </span>
                                        </span>
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductSection