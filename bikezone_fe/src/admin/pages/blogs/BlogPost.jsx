import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../pages/shared/Loader'
import SideBar from '../../components/SideBar'
import { getUsedBikeDetails } from '../../../features/usedbike/usedbike.thunk'
import { getSingleBlogPosts } from '../../../features/blog/blog.thunk'


const BlogPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getSingleBlogPosts(id))
    }, [])

    const { blogPost, isLoading } = useSelector(state => state.blog)

    return (
        <div className='flex bg-gray-100'>
            <SideBar />

            {
                isLoading ? (
                    <>
                        <div className='self-center w-full'>
                            <Loader className='' />
                        </div>
                    </>
                ) : (

                    <div className='w-full py-10'>
                        <div className=" sm:px-10 lg:px-16 md:flex flex-none justify-between gap-8 xl:px-20">
                            <div className="px-4 py-8 w-full ">
                                <h1 className="text-3xl text-center">Bike detail</h1>
                                <div className='border-b py-6 border-black '>
                                    <div className=' flex justify-between items-center'>
                                        <div>
                                            <p className="text-xl font-medium">Blog Auther Details</p>
                                            <p className="text-gray-700">Check Auther Details.</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center'>
                                            <img className="m-2 h-12 w-12 rounded-md border border-black object-cover object-center cursor-pointer hover:scale-110 duration-300 hover:shadow-md hover:shadow-yellow-400" src={usedBike?.user?.imageURL} alt='true' />
                                            <span>Auther</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#e9e7e7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] hover:shadow-gray-400 duration-300 px-2 py-2 sm:px-6">
                                        <div className="flex justify-between mx-4">
                                            <span className="text-gray-700 text-sm font-bold">Name:</span>
                                            <span className="text-gray-600">{`${blogPost?.user?.firstname} ${usedBike?.user?.lastname}`}</span>
                                        </div>

                                        <div className="flex justify-between mx-4 ">
                                            <span className="text-gray-700 text-sm font-bold">Personal Email:</span>
                                            <span className="text-gray-600">{blogPost?.user?.email}</span>
                                        </div>


                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <div className=' flex justify-between items-center'>
                                        <p className="text-xl font-medium">Post Details</p>
                                        <p className="text-gray-700">Check Blog Post Details.</p>

                                    </div>
                                    <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#e9e7e7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] duration-300 hover:shadow-gray-400 px-2 py-2 sm:px-6">
                                        <div className="flex flex-col rounded-lg  sm:flex-row items-center ">

                                            <div className='w-full '>
                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Bike Name:</span>
                                                    <span className="text-gray-600">{blogPost?.title}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">Busniess Email:</span>
                                                    <span className="text-gray-600">{blogPost?.description}</span>
                                                </div>

                                                <div className="flex justify-between mx-4 py-2">
                                                    <span className="text-gray-700 text-sm font-bold">City:</span>
                                                    <span className="text-gray-600">{blogPost?.CreatedAt}</span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div >
                )
            }
        </div>
    )
}

export default BlogPost