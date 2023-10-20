import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';

const UserProfile = () => {

    const { user } = useSelector((state) => state.auth)

    return (

        <>
            <MetaData title={"profile"} />
            <div className="md:p-16 p-4 bg-[#d0d1d1]">
                <div className="p-8 bg-[#f3f3f396] shadow-md mt-2 md:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-x-8 flex justify-center md:flex-col md:order-1 order-2 md:items-center">
                            <Link to='/orders'>
                                <button className="text-white py-2 px-4 uppercase rounded bg-[#122222] hover:text-yellow-400 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    My Orders
                                </button>
                            </Link>
                        </div>

                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl inset-x-0 md:order-2 order-1 flex items-center justify-center text-indigo-500 mt-0  md:-mt-24">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="space-x-8 flex justify-center md:flex-col md:items-center md:order-3 order-2">
                            <Link to='/me/update'>
                                <button className="text-white py-2 px-4 uppercase rounded bg-[#122222] hover:text-yellow-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='flex justify-center items-center text-2xl font-semibold mt-4'>
                        <h1>{`${user?.firstname} ${user?.lastname}`}</h1>
                    </div>

                    <div className="mt-12 pb-12">
                        <table className="w-[60%] mx-auto border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b border-gray-300 hover:bg-gray-300">
                                    <td className="font-bold text-gray-600 py-3 px-4">Joined on</td>
                                    <td className="font-light text-gray-600 py-3 px-4 text-right">{String(user?.createdAt).substr(0, 10)}</td>
                                </tr>
                                <tr className='hover:bg-gray-300'>
                                    <td className="font-bold text-gray-600 py-3 px-4">Email</td>
                                    <td className="font-light text-gray-600 py-3 px-4 text-right">{user?.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <div className="flex justify-center">
                        <Link to='/update/password'>
                            <button className="text-white py-2 px-4 uppercase rounded bg-[#122222] hover:text-yellow-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Change password
                            </button>
                        </Link>

                    </div>
                </div>
            </div>


        </>
    )
}

export default UserProfile