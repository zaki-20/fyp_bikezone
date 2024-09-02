import React, { useEffect, useLayoutEffect, useState } from 'react'
import WorkShopCards from '../../components/cards/WorkShopCards'
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops } from '../../features/workshop/workshop.thunk';
import Loader from '../shared/Loader';
import { reset } from '../../features/workshop/workshop.slice';
import { toast } from 'react-toastify';
import { Select, Option } from "@material-tailwind/react";
import { MdReplayCircleFilled } from 'react-icons/md'
import Lottie from 'lottie-react'
import mechanicAnimation from '../../assets/animated/mechanic.json'
import maintainAnimation from '../../assets/animated/maintain.json'
import { Link } from 'react-router-dom';


const Workshops = () => {
    const dispatch = useDispatch()
    const { isLoading, isError, message, workshops } = useSelector((state) => state.workshop)
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        dispatch(getAllWorkshops())
    }, [])

    // useLayoutEffect(() => {
    //     if (isSuccess) {
    //         toast.success(message)
    //     }
    // }, [isSuccess])

    useLayoutEffect(() => {

        toast.success("All workshops data")

    }, [])

    useLayoutEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }

    }, [isError])



    // Filter workshops based on the selected brand
    const filteredWorkshops = selectedBrand === ''
        ? workshops // Show all workshops when "All Brands" is selected
        : workshops?.filter((workshop) => workshop?.brand === selectedBrand);


    return (
        <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>

            <Lottie
                className=" h-36 w-36 absolute "
                animationData={mechanicAnimation}
            />
            <Lottie
                className=" h-36 w-36 absolute right-0"
                animationData={maintainAnimation}
            />

            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center gap-x-2 pt-10'>
                    <h1 className='text-4xl font-bold text-center  '>Workshops</h1>
                    <span>({filteredWorkshops.length} results)</span>
                </div>
                <div className='flex gap-x-4 justify-center items-center mt-4'>
                    <div className='flex gap-x-2'>
                        <Select
                            className="rounded-md text-[#122222] outline-1 "
                            onChange={(e) => setSelectedBrand(e)}
                            label={'select Brand'}
                            color='black'
                        >

                            {Array.from(new Set(workshops.map((workshop) => workshop.brand))).map((brand, index) => (
                                <Option key={index} value={brand} className='hover:bg-secondary  hover:text-[#122222] '>
                                    {brand}
                                </Option>
                            ))}
                        </Select>

                        <button
                            className="rounded bg-red-500 text-white px-2 py-1 gap-x-1 flex justify-center items-center"
                            onClick={() => {
                                setSelectedBrand('');
                            }}
                        >
                            <MdReplayCircleFilled size={18} color='white' className='text-white ' />
                            <span>reset</span>
                        </button>


                    </div>

                </div>

                <Link to={`/workshops/me`} className='self-end'>
                    <button className="bg-[#122222]  mx-10 my-4 text-white hover:text-yellow-400 px-4 py-2 rounded-md mt-4">
                        Go to My Workshops
                    </button>
                </Link>

            </div>

            {isLoading ? (<Loader />) : (
                <div className='grid lg:grid-cols-2 grid-col-1 gap-4  p-10'>
                    {filteredWorkshops.map((item) => (
                        <WorkShopCards item={item} />
                    ))}

                </div>
            )}


        </div>

    )
}

export default Workshops