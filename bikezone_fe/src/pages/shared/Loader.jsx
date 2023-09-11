import React from 'react';
import { RxColorWheel } from 'react-icons/rx';

const Loader = () => {
    return (
        <div className=" p-4 h-[100vh] flex items-center justify-center flex-col">
            <RxColorWheel size={100} className='animate-spin' />
            <div className='bg-black h-1 w-[70px]  mt-2 blur-sm animate-pulse roun'></div>
            <p className='mt-10 text-lg'>Please wait...</p>
        </div>

    );
};

export default Loader;
