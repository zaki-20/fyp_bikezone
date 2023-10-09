import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const ErrorPage = () => {

    return (
        <div>
            <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">

                <div className='relative '>
                    <h1 className="text-9xl font-extrabold  tracking-widest text-red-600 animate-pulse">404</h1>

                    <div className="bg-yellow-400 px-2 text-sm rounded rotate-12 absolute left-24 top-[88px]">
                        Page Not Found
                    </div>

                </div>

                <p className="text-3xl mt-8 font-semibold relative z-10 text-white">
                    <span className='text-red-600'>Oops!</span> It seems you've taken a wrong turn.
                </p>

                <p className="text-lg mt-3 relative z-10 text-white">
                    The page you are looking for may have been moved or does not exist.
                </p>

                <button className="mt-5">
                    <Link to={'/'}
                        className="relative inline-block text-sm font-medium text-yellow-400 group active:text-yellow-400 focus:outline-none"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yellow-400 group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            <Link to="/">Go Home</Link>
                        </span>
                    </Link>
                </button>
            </div>

        </div>
    )
}

export default ErrorPage