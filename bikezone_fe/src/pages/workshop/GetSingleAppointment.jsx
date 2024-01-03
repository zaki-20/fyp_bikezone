import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleAppointment } from '../../features/appointment/appointment.thunk'
import Loader from '../shared/Loader'


const GetSingleAppointment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getSingleAppointment(id))
    }, [])

    const { appointment, isLoading } = useSelector(state => state.appointment)



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
        <>
            {
                isLoading ? (<Loader />) : (

                    <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>
                        <div className=" sm:px-10 lg:px-20 md:flex flex-none justify-between gap-8 xl:px-32">
                            <div className="px-4 py-8 md:w-2/3 w-full">
                                <div className='border-b py-6 border-black '>
                                    <div className=' flex justify-between items-center'>
                                        <div>
                                            <p className="text-xl font-medium">Appointment Details</p>
                                            <p className="text-gray-700">Check Appointment Details.</p>
                                        </div>
                                        <div>
                                            <img className="m-2 h-12 w-12 rounded-md border border-black object-cover object-center cursor-pointer hover:scale-110 duration-300 hover:shadow-md hover:shadow-yellow-400" src={appointment?.user?.imageURL} alt='true' />
                                            <span>Customer</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] hover:shadow-gray-400 duration-300 px-2 py-2 sm:px-6">
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Name:</span>
                                            <span className="text-gray-600">{`${appointment?.user?.firstname} ${appointment?.user?.lastname}`}</span>
                                        </div>

                                        <div className="flex justify-between mx-4 ">
                                            <span className="text-gray-700 text-sm font-bold">Email:</span>
                                            <span className="text-gray-600">{appointment?.user?.email}</span>
                                        </div>

                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Day:</span>
                                            <span className="text-gray-600">{appointment?.day}</span>
                                        </div>
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Slot #:</span>
                                            <span className="text-gray-600">{appointment?.slot}:00</span>
                                        </div>
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Discount:</span>
                                            <span className="text-gray-600">{appointment?.discountAmount > 0 ? `${appointment?.discountAmount}%` : "No Discount"}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <div className=' flex justify-between items-center'>
                                        <div>
                                            <p className="text-xl font-medium">Workshop Details</p>
                                            <p className="text-gray-700">Check your Workshop Details.</p>
                                        </div>
                                        <div className='flex flex-col justify-between items-center'>
                                            <img className="m-2 h-12 w-12 rounded-md border border-black object-cover object-center cursor-pointer hover:scale-110 duration-300 hover:shadow-md hover:shadow-yellow-400" src={appointment?.workshop?.owner?.imageURL} alt='true' />
                                            <span>Owner</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] duration-300 hover:shadow-gray-400 px-2 py-2 sm:px-6">
                                        <div className="flex flex-col rounded-lg  sm:flex-row items-center ">
                                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={appointment?.workshop?.imageURL} alt='true' />

                                            <div className='w-full '>
                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Workshop Name:</span>
                                                    <span className="text-gray-600">{appointment?.workshop?.name}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Owner Phone No:</span>
                                                    <span className="text-gray-600">{formatPhoneNumber(appointment?.workshop?.contact)}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Workshop Email:</span>
                                                    <span className="text-gray-600">{appointment?.workshop?.email}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className='h-[80%] px-4 md:w-1/3 w-full mt-2 py-8'>
                                <h1 className='text-2xl text-center font-semibold py-4 '>Available Slots</h1>
                                {appointment?.workshop?.weeklySlots.map(({ day, slots }) => (
                                    <div key={day} className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">{day}</h3>
                                        <div className="flex space-x-2">
                                            {slots.map(slot => (
                                                <button
                                                    key={slot}
                                                    className="px-4 py-2 bg-[#122222] text-white hover:text-yellow-400 duration-200 rounded"
                                                >
                                                    {slot}:00
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div >
                )
            }
        </>
    )
}

export default GetSingleAppointment