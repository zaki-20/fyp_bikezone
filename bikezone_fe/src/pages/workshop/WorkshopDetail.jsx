import React, { useEffect, useState } from 'react'
import { GrServices } from "react-icons/gr"
import { TbSettingsCog } from "react-icons/tb"
import { ImLocation2 } from "react-icons/im"
import { BsFillTelephoneFill } from "react-icons/bs"
import { MdEmail, MdAccessTimeFilled } from "react-icons/md"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../shared/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkshop } from '../../features/workshop/workshop.thunk'
import { createAppointment } from '../../features/appointment/appointment.thunk'

const WorkshopDetail = () => {
    const { id } = useParams(); // Get the blogId from the URL
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);


    const handleOpen = () => setOpen(!open);
    const { isLoading, isError, message, workshop } = useSelector(
        (state) => state.workshop
    );

    useEffect(() => {
        dispatch(getSingleWorkshop(id))
    }, [])


    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const isSlotBooked = (slot) => {
        // Check if the slot is already booked in the backend
        return workshop?.appointments.some(appointment => appointment.slot === slot);
    };

    const isSlotAvailable = (slot) => {
        // Check if the slot is available in the workshop slots
        return !workshop?.slots.includes(slot);
    };

    const handleCreateAppointment = () => {
        if (selectedSlot) {
            dispatch(createAppointment(workshop._id, selectedSlot));
            handleOpen(); // Close the dialog after appointment creation
        }
    };

    return (
        <div>
            {isLoading ? (<Loader />) : (
                <section className="py-10 font-poppins bg-[#e9e9e9]">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-0 overflow-hidden ">

                                    <div className="relative mb-6 lg:mb-10 lg:h-96">
                                        <img className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt />
                                    </div>

                                    <div className="flex-wrap hidden -mx-2 md:flex">

                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <div>hello</div>
                                                <div>hello</div>
                                                <div>hello</div>
                                                <div>hello</div>
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <div>hello</div>                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <div>hello</div>
                                                <div>hello</div>
                                                <div>hello</div>
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <div>hello</div>
                                            </a>
                                        </div>
                                    </div>
                                </div >
                            </div >
                            <div className="w-full px-4 md:w-1/2 border-l border-gray-500">
                                <div className="lg:pl-20">
                                    <div className="mb-3 ">
                                        <span className="px-2.5 py-1 text-xs text-yellow-400 bg-blue-gray-800 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            {workshop?.brand}
                                        </span>
                                        <h2 className="max-w-xl mt-3 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {workshop?.name}
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
                                                                        <ImLocation2 size={20} className='text-gray-500' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {`${workshop?.address}, ${workshop?.city}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <BsFillTelephoneFill size={20} className='text-gray-500' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {workshop?.contact}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <MdEmail size={20} className='text-gray-500' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        {workshop?.email}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 ">
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 ">
                                                                        <MdAccessTimeFilled size={20} className='text-gray-500' />
                                                                    </span>
                                                                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        9am - 6pm
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
                                        <div className="mb-6">
                                            <h2 className="mx-2 mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Specialization :</h2>
                                            <div className="bg-gray-300 dark:bg-gray-700 rounded-xl">
                                                <div className="p-3 lg:p-5 ">
                                                    <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-100">
                                                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                            <div className="w-full mb-4 md:w-2/5">
                                                                <div className="flex ">
                                                                    <span className="mr-3 ">
                                                                        <TbSettingsCog size={25} className='text-gray-500' />
                                                                    </span>
                                                                    <div>
                                                                        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                            Service                                                                     </p>
                                                                        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                            {workshop?.service1}                                                                   </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 md:w-2/5">
                                                                <div className="flex ">
                                                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                                        <TbSettingsCog size={25} className='text-gray-500' />
                                                                    </span>
                                                                    <div>
                                                                        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                            Service
                                                                        </p>
                                                                        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                            {workshop?.service2}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                                                <div className="flex ">
                                                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                                        <TbSettingsCog size={25} className='text-gray-500' />

                                                                    </span>
                                                                    <div>
                                                                        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                            Service
                                                                        </p>
                                                                        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                            {workshop?.service3}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                                                <div className="flex ">
                                                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                                        <TbSettingsCog size={25} className='text-gray-500' />

                                                                    </span>
                                                                    <div>
                                                                        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                            Service
                                                                        </p>
                                                                        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                            {workshop?.service4}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-base text-gray-600 dark:text-gray-400">Description</span>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-blue-200">
                                            {workshop?.description}
                                        </p>
                                    </div>
                                    <div className="mb-6 " />
                                    <div className="flex gap-4 mb-6">
                                        <button onClick={handleOpen} className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                            Book Your Appointment
                                        </button>
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                            Buy now
                                        </a>
                                    </div>
                                  
                                    <Dialog open={open} handler={handleOpen}>
                                        <DialogHeader>Select a Slot</DialogHeader>
                                        <DialogBody className='flex flex-wrap gap-3'>
                                            {workshop?.slots.map((slot, index) => (
                                                <button
                                                    key={index}
                                                    className={`px-4 py-3 text-center text-gray-100 ${selectedSlot === slot || isSlotBooked(slot) || isSlotAvailable(slot) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} border border-transparent dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-700 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl`}
                                                    onClick={() => handleSlotSelection(slot)}
                                                    disabled={selectedSlot === slot || isSlotBooked(slot) || isSlotAvailable(slot)}
                                                >
                                                    {slot}:00 - {slot + 1}:00
                                                </button>
                                            ))}
                                        </DialogBody>
                                        <DialogFooter>
                                            <Button
                                                variant="text"
                                                color="red"
                                                onClick={handleOpen}
                                                className="mr-1"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                            <Button variant="gradient" color="green" onClick={handleOpen}>
                                                <span>Confirm</span>
                                            </Button>
                                        </DialogFooter>
                                    </Dialog>

                                </div>
                            </div>
                        </div >
                    </div >
                </section >
            )

            }

        </div >
    )
}

export default WorkshopDetail
