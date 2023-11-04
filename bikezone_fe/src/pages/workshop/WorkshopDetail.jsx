import React, { useEffect, useState } from 'react'
import { GrServices } from "react-icons/gr"
import { TbSettingsCog } from "react-icons/tb"
import { ImLocation2 } from "react-icons/im"
import { BsFillTelephoneFill } from "react-icons/bs"
import { MdEmail, MdAccessTimeFilled, MdPunchClock, MdOutlineChangeCircle } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../shared/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteMyWorkshop, getSingleWorkshop } from '../../features/workshop/workshop.thunk'
import { createAppointment } from '../../features/appointment/appointment.thunk'
import Lottie from 'lottie-react'
import redAlertAnimation from '../../assets/animated/redAlert.json'



const WorkshopDetail = () => {
    const { id } = useParams(); // Get the blogId from the URL
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);


    const handleOpen = () => setOpen(!open);
    const handleOpenDelete = () => {
        setOpenDelete(!openDelete)
    };

    const { isLoading, isError, message, workshop } = useSelector(
        (state) => state.workshop
    );
    const { user } = useSelector((state) => state.auth); // Get the logged-in user's information


    useEffect(() => {
        dispatch(getSingleWorkshop(id))
    }, [])



    const isSlotBooked = (slot) => {
        // Check if the slot is already booked in the backend
        return workshop?.appointments.some(appointment => appointment.slot === slot);
    };

    const isSlotAvailable = (slot) => {
        // Check if the slot is available in the workshop slots
        return !workshop?.slots.includes(slot);
    };

    const handleSlotSelection = (slot) => {
        // Check if the slot is available and not booked
        if (!isSlotBooked(slot) && !isSlotAvailable(slot)) {
            // Check if the slot is already booked by the user
            if (!workshop.appointments.some((appointment) => appointment.slot === slot)) {
                // Dispatch the appointment creation action
                dispatch(
                    createAppointment({
                        workshop: workshop._id,
                        slot,
                    })
                );
                setSelectedSlot(slot);
                dispatch(getSingleWorkshop(id));

                handleOpen(); // Close the dialog
            } else {
                // Slot is already booked by the user, you can show a message or handle it as needed
                alert('You have already booked this slot.');
            }
        }
    };


    const formatTime = (slot) => {
        const hours = slot % 12 || 12;
        const period = slot < 12 ? 'AM' : 'PM';
        return `${hours}${period}`;
    };

    const handleDeleteWorkshop = () => {
        // Check if the logged-in user's ID matches the owner's ID
        if (user && user._id === workshop.owner) {

            dispatch(deleteMyWorkshop(id));
            navigate('/workshops/me');
        } else {
            // Handle the case where the logged-in user is not the owner (show a message or take appropriate action)
            alert('You are not authorized to delete this workshop.');
        }
        setOpenDelete(!openDelete)

    };

    return (
        <div>
            {isLoading ? (<Loader />) : (
                <section className="py-10 font-poppins bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-0 overflow-hidden ">



                                    <div className="relative mb-6 lg:mb-10 lg:h-96">
                                        <img className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt />
                                    </div>

                                    {/* <div className="flex-wrap hidden -mx-2 md:flex">

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
                                    </div> */}
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
                                                                        {`${formatTime(workshop?.startTime)} - ${formatTime(workshop?.endTime)}`}
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
                                        <span className="text-lg font-bold text-gray-700 dark:text-gray-400">Description</span>
                                        <p className="mt-2 text-sm  dark:text-blue-200">
                                            {workshop?.description}
                                        </p>
                                    </div>
                                    <div className="mb-6 " />

                                    {user && user._id !== workshop?.owner && (

                                        <div className="flex gap-4 mb-6">
                                            <button onClick={handleOpen} className="w-full flex px-4 py-3 justify-center gap-x-2 items-center text-center font-bold text-yellow-400 bg-[#1b2e2e] border border-transparent dark:border-gray-700  hover:font-bold duration-300 hover:scale-105 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                                Book Your Appointment
                                                <MdPunchClock className='text-yellow-400' size={25} />
                                            </button>
                                        </div>
                                    )}

                                    {user && user._id === workshop?.owner && (
                                        <>
                                            <Link to={`/workshop/appointments`}>
                                                <div className="flex gap-4 mb-6">
                                                    <button className="w-full flex px-4 py-3 justify-center gap-x-2 items-center text-center font-bold text-yellow-400 bg-[#1b2e2e] border border-transparent dark:border-gray-700  hover:font-bold duration-300 hover:scale-105 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                                        All Appoitments
                                                        <MdPunchClock className='text-yellow-400' size={25} />
                                                    </button>
                                                </div>
                                            </Link>

                                            <Link to={`/workshop/update/${id}`}>
                                                <div className="flex gap-4 mb-6">
                                                    <button className="w-full flex px-4 py-3 justify-center gap-x-2 items-center text-center font-bold text-light-green-700 bg-[#1b2e2e] border border-transparent dark:border-gray-700  hover:font-bold duration-300 hover:scale-105 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                                        Update Workshop
                                                        <MdOutlineChangeCircle className='text-light-green-700' color='' size={25} />
                                                    </button>
                                                </div>
                                            </Link>

                                            <div className="flex gap-4 mb-6">
                                                <button onClick={handleOpenDelete} className="w-full px-4 flex py-3 text-center justify-center gap-x-2 items-center font-bold text-red-600 bg-[#1b2e2e] border border-transparent dark:border-gray-700  hover:font-bold  duration-300 hover:scale-105 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                                                    Delete Your Workshop
                                                    <AiFillDelete className='text-red-600' size={25} />

                                                </button>
                                            </div>
                                        </>
                                    )}

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

                                    <Dialog open={openDelete} handler={handleOpenDelete} className='bg-red-100'>
                                        <DialogHeader className='flex justify-start'>
                                            <Lottie
                                                className="w-28 h-28 "
                                                animationData={redAlertAnimation}
                                            />
                                            <span>Delete Your Workshop</span>
                                        </DialogHeader>
                                        <DialogBody className='flex flex-wrap justify-center animate-pulse font-bold tracking-wide text-red-600'>
                                            Are you sure to delete your wroskhop permanently?

                                        </DialogBody>
                                        <DialogFooter>
                                            <Button
                                                variant="text"
                                                color="black"
                                                onClick={handleOpenDelete}
                                                className="mr-1"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                            <Button variant="gradient" color="red" onClick={handleDeleteWorkshop}>
                                                <span>Delete</span>
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
