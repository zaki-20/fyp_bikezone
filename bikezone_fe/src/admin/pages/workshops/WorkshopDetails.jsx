import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkshop } from '../../../features/workshop/workshop.thunk'
import Loader from '../../../pages/shared/Loader'
import SideBar from '../../components/SideBar'


const WorkshopDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getSingleWorkshop(id))
    }, [])

    const { workshop, isLoading } = useSelector(state => state.workshop)



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
        <div className='flex bg-gray-100'>
            <SideBar />

            {
                isLoading ? (
                    <>
                        <div className='self-center w-full'>
                        <Loader className=''/>
                        </div>
                    </>
                ) : (

                    <div className='w-full py-10'>
                        <div className=" sm:px-10 lg:px-20 md:flex flex-none justify-between gap-8 xl:px-32">
                            <div className="px-4 py-8 w-full ">
                            <h1 className="text-3xl text-center">Workshop detail</h1>

                                <div className='border-b py-6 border-black '>
                                    <div className=' flex justify-between items-center'>
                                        <div>
                                            <p className="text-xl font-medium">Workshop Owner Details</p>
                                            <p className="text-gray-700">Check Appointment Details.</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center'>
                                            <img className="m-2 h-12 w-12 rounded-md border border-black object-cover object-center cursor-pointer hover:scale-110 duration-300 hover:shadow-md hover:shadow-yellow-400" src={workshop?.owner?.imageURL} alt='true' />
                                            <span>Owner</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#e9e7e7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] hover:shadow-gray-400 duration-300 px-2 py-2 sm:px-6">
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Name:</span>
                                            <span className="text-gray-600">{`${workshop?.owner?.firstname} ${workshop?.owner?.lastname}`}</span>
                                        </div>

                                        <div className="flex justify-between mx-4 ">
                                            <span className="text-gray-700 text-sm font-bold">Email:</span>
                                            <span className="text-gray-600">{workshop?.owner?.email}</span>
                                        </div>


                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <div className=' flex justify-between items-center'>
                                        <p className="text-xl font-medium">Workshop Details</p>
                                        <p className="text-gray-700">Check your Workshop Details.</p>

                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#e9e7e7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] duration-300 hover:shadow-gray-400 px-2 py-2 sm:px-6">
                                        <div className="flex flex-col rounded-lg  sm:flex-row items-center ">
                                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={workshop?.imageURL} alt='true' />

                                            <div className='w-full '>
                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Workshop Name:</span>
                                                    <span className="text-gray-600">{workshop?.name}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Owner Phone No:</span>
                                                    <span className="text-gray-600">{formatPhoneNumber(workshop?.contact)}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Workshop Email:</span>
                                                    <span className="text-gray-600">{workshop?.email}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">City:</span>
                                                    <span className="text-gray-600">{workshop?.city}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Workshop Address:</span>
                                                    <span className="text-gray-600">{workshop?.address}</span>
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

export default WorkshopDetails