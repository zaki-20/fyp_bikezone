import React from 'react';
import { RxColorWheel } from 'react-icons/rx';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className=" p-4">
                <RxColorWheel size={100} className='animate-spin' />
                <div className='bg-black h-1 w-full mt-2 blur-sm animate-pulse roun'></div>
                <p className='mt-10 text-lg'>Please wait...</p>
            </div>
        </div>
    );
};

export default Loader;
