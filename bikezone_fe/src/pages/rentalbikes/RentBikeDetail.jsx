import React, { useEffect } from 'react'
import { TbSettingsCog } from "react-icons/tb"
import { ImLocation2 } from "react-icons/im"
import { BsFillTelephoneFill } from "react-icons/bs"
import { MdEmail, MdAccessTimeFilled } from "react-icons/md"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Carousal from '../../components/Carousal';
import { getDetailRentBike } from '../../features/rentbike/rentbike.thunk'
import { MdEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FcEngineering } from "react-icons/fc";


const RentBikeDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isError, message, isLoading, rentBike } = useSelector(state => state.rentBike)
    const { user } = useSelector((state) => state.auth)



    useEffect(() => {
        dispatch(getDetailRentBike(id))
    }, [dispatch, id]);

    const handleWhatsAppClick = () => {
        // Assuming rentBike.contact contains the owner's WhatsApp number
        const whatsappNumber = rentBike?.contact;

        if (whatsappNumber) {
            // Remove leading zero, if present
            const formattedNumber = whatsappNumber.replace(/^0/, '');

            // Check if the number already starts with +92
            const phoneNumber = formattedNumber.startsWith('+92') || formattedNumber.startsWith('92') ? formattedNumber : `+92${formattedNumber}`;

            // Message to pre-fill
            const message = `Hello, I'm interested in renting the ${rentBike?.title} (${rentBike?.model}). Can you provide more information? It is priced at PKR ${rentBike?.rent} per day.`;

            // URL encode the message
            const encodedMessage = encodeURIComponent(message);

            // Create a WhatsApp URL with the pre-filled message and open it in a new tab
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }
    };


    return (
        <div>
            <div>
                <section className="py-10 font-poppins bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            {
                                rentBike && <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                    <div className="sticky h-full overflow-y-scroll no-scrollbar">
                                        <Carousal images={rentBike?.images} />
                                        <div className="flex-wrap hidden -mx-2 md:flex">
                                            {rentBike?.images && rentBike?.images?.map((item) => (
                                                <div className="w-1/2 p-2 sm:w-1/4 h-28 mx-2">
                                                    <img className="object-cover w-full h-full" src={item} alt="" />
                                                </div>
                                            ))
                                            }

                                        </div>
                                    </div >
                                </div >}
                            <div className="w-full px-4 md:w-1/2 border-l border-gray-500">
                                <div className="lg:pl-20">
                                    <div className="mb-3 ">
                                        <span className="px-2.5 py-1 text-xs text-yellow-400 bg-blue-gray-800 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            {rentBike?.model}
                                        </span>
                                        <h2 className="max-w-xl mt-3 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {rentBike?.title}
                                        </h2>

                                    </div>
                                    <div className="flex-wrap hidden -mx-2 md:flex">
                                        <h2 className="mx-2 mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Contact details :</h2>

                                        <div className="mb-6 w-full ">
                                            <div className="bg-gray-300 dark:bg-gray-700 rounded-xl ">
                                                <div className="p-3 lg:p-5 ">
                                                    <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-100 ">
                                                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 ">
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <ImLocation2 size={20} className='text-red-600' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {`${rentBike?.address}, ${rentBike?.city}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <BsFillTelephoneFill size={20} className='text-light-green-700' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {rentBike?.contact}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <MdEmail size={20} className='text-yellow-300' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {rentBike?.email}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* // */}


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>



                                    <div className="flex-wrap hidden -mx-2 md:flex">
                                        <h2 className="mx-2 mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Bike Details :</h2>

                                        <div className="mb-6 w-full ">
                                            <div className="bg-gray-300 dark:bg-gray-700 rounded-xl ">
                                                <div className="p-3 lg:p-5 ">
                                                    <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-100 ">
                                                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 ">
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <FaMoneyBillWave size={20} className='text-light-green-700' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {`PKR ${rentBike?.rent} per-day`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <FcEngineering size={20} className='' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {`${rentBike?.condition} Condition`}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">

                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {
                                                                            rentBike?.isAvailable ? (
                                                                                <>
                                                                                    <div className='flex justify-between items-center w-full'>
                                                                                        <div className='flex items-center space-x-2'>
                                                                                            <span>
                                                                                                <MdEventAvailable size={23} className='text-light-green-800' />
                                                                                            </span>
                                                                                            <p className='font-bold text-light-green-800 text-lg'>Available</p>
                                                                                        </div>

                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div className='flex justify-between items-center'>
                                                                                        <div className='flex items-center space-x-2'>
                                                                                            <span>
                                                                                                <CgUnavailable size={23} className='text-red-600' />
                                                                                            </span>
                                                                                            <p className='font-bold text-red-600 text-lg'>Not Available</p>
                                                                                        </div>

                                                                                    </div>
                                                                                </>)
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {/* // */}


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-lg font-bold text-gray-700 dark:text-gray-400">Description</span>
                                        <p className="mt-2 text-sm  dark:text-blue-200">
                                            {rentBike?.description}
                                        </p>
                                    </div>
                                    <div className="mb-6 " />
                                    {
                                        user?._id === rentBike?.seller ? (
                                            <div className="w-full mb-4 md:w-1/2">
                                                <Link to={`/rental-bike/update/${rentBike?._id}`}>
                                                    <button
                                                        className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                                    >
                                                        Update Your Ad
                                                    </button>
                                                </Link>
                                            </div>

                                        ) : (
                                            <div className="w-full mb-4 md:w-1/2">
                                                <button
                                                    onClick={handleWhatsAppClick}
                                                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                                >
                                                    Contact on WhatsApp
                                                </button>
                                            </div>

                                        )
                                    }


                                </div>
                            </div>
                        </div >
                    </div >
                </section >

            </div >

        </div >
    )
}

export default RentBikeDetail