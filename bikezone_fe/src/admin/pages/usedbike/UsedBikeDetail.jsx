import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../pages/shared/Loader'
import SideBar from '../../components/SideBar'
import { getUsedBikeDetails } from '../../../features/usedbike/usedbike.thunk'


const UsedBikeDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUsedBikeDetails(id))
    }, [])

    const { usedBike, isLoading } = useSelector(state => state.usedBike)

    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber) {
            // Convert to string if not already a string
            const phoneNumberString = phoneNumber.toString();

            if (phoneNumberString.startsWith('92')) {
                return '0' + phoneNumberString.slice(2);
            } else if (phoneNumberString.startsWith('+92')) {
                return '0' + phoneNumberString.slice(3);
            }

            return phoneNumberString;
        }

        // If phoneNumber is undefined or null, return an empty string or handle it as needed
        return '';
    };

    return (
        <div className='flex bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>
            <SideBar />

            {
                isLoading ? (
                    <>
                        <div className='self-center w-full'>
                            <Loader className='' />
                        </div>
                    </>
                ) : (

                    <div className='w-full py-10'>
                        <div className=" sm:px-10 lg:px-16 md:flex flex-none justify-between gap-8 xl:px-20">
                            <div className="px-4 py-8 w-full ">
                                <h1 className="text-3xl text-center">Bike detail</h1>
                                <div className='border-b py-6 border-black '>
                                    <div className=' flex justify-between items-center'>
                                        <div>
                                            <p className="text-xl font-medium">Bike Owner Details</p>
                                            <p className="text-gray-700">Check Owner Details.</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center'>
                                            <img className="m-2 h-12 w-12 rounded-md border border-black object-cover object-center cursor-pointer hover:scale-110 duration-300 hover:shadow-md hover:shadow-yellow-400" src={usedBike?.seller?.imageURL} alt='true' />
                                            <span>Owner</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] hover:shadow-gray-400 duration-300 px-2 py-2 sm:px-6">
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Name:</span>
                                            <span className="text-gray-600">{`${usedBike?.seller?.firstname} ${usedBike?.seller?.lastname}`}</span>
                                        </div>

                                        <div className="flex justify-between mx-4 ">
                                            <span className="text-gray-700 text-sm font-bold">Personal Email:</span>
                                            <span className="text-gray-600">{usedBike?.seller?.email}</span>
                                        </div>


                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <div className=' flex justify-between items-center'>
                                        <p className="text-xl font-medium">Bike Details</p>
                                        <p className="text-gray-700">Check your Bike Details.</p>

                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] duration-300 hover:shadow-gray-400 px-2 py-2 sm:px-6">
                                        <div className="flex flex-col rounded-lg  sm:flex-row items-center ">
                                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={usedBike?.images[0]} alt='true' />

                                            <div className='w-full '>
                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Bike Name:</span>
                                                    <span className="text-gray-600">{usedBike?.title}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Owner Phone No:</span>
                                                    <span className="text-gray-600">{formatPhoneNumber(usedBike?.contact)}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Busniess Email:</span>
                                                    <span className="text-gray-600">{usedBike?.email}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">City:</span>
                                                    <span className="text-gray-600">{usedBike?.city}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Is Available:</span>
                                                    <span className="text-gray-600">
                                                        {usedBike?.isAvailable ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div >
                )
            }
        </div>
    )
}

export default UsedBikeDetail