import React from 'react'
import WorkShopCards from '../../components/cards/WorkShopCards'

const Workshops = () => {
    return (
        <div className='bg-[#d0d1d1]'>
            <div>
                <h1 className='text-4xl font-bold text-center pt-10'>Workshops</h1>
            </div>
            <div className='grid lg:grid-cols-2 grid-col-1 gap-4  p-10'>
                <WorkShopCards />
                <WorkShopCards />
                <WorkShopCards />
                <WorkShopCards />
                <WorkShopCards />
            </div>
        </div>

    )
}

export default Workshops