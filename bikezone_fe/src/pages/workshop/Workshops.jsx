import React, { useEffect } from 'react'
import WorkShopCards from '../../components/cards/WorkShopCards'
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops } from '../../features/workshop/workshop.thunk';
import Loader from '../shared/Loader';
import { reset } from '../../features/workshop/workshop.slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Workshops = () => {
    const dispatch = useDispatch()
    const { isLoading, isError, message, workshops } = useSelector((state) => state.workshop)

    useEffect(() => {
        dispatch(getAllWorkshops())
    }, [])

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
    }, [isError]);



    return (
        <div className='bg-[#d0d1d1]'>
            <div>
                <h1 className='text-4xl font-bold text-center pt-10'>Workshops</h1>
            </div>
          {  isLoading ? (<Loader />) : (
             <div className='grid lg:grid-cols-2 grid-col-1 gap-4  p-10'>
              {
                workshops.map((item)=>(
                    <WorkShopCards item={item}/>
                ))
              }

             </div>
          )}

           
        </div>

    )
}

export default Workshops