import React, { useEffect, useLayoutEffect } from 'react'
import WorkShopCards from '../../components/cards/WorkShopCards'
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops } from '../../features/workshop/workshop.thunk';
import Loader from '../shared/Loader';
import { reset } from '../../features/workshop/workshop.slice';
import { toast } from 'react-toastify';

const MyWorkshops = () => {
    const dispatch = useDispatch()
    const { isLoading, isError, message, workshops } = useSelector((state) => state.workshop)
    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        dispatch(getAllWorkshops())
    }, [])

    // useLayoutEffect(() => {
    //     if(isSuccess){
    //         toast.success(message)
    //     }
    // }, [isSuccess])

    useLayoutEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
    }, [isError]);

    const filteredWorkshops = workshops?.filter(item => item?.owner === user?._id);

    return (
        <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>
            <div>
                <h1 className='text-4xl font-bold text-center pt-10'>MY Workshops</h1>
                <span></span>
            </div>
            {isLoading ? (<Loader />) : (
                <div className='grid lg:grid-cols-2 grid-col-1 gap-4  p-10'>
                    {
                        filteredWorkshops.map((item) => (
                            <WorkShopCards item={item} key={item._id} />
                        ))
                    }

                </div>
            )}

        </div>

    )
}

export default MyWorkshops