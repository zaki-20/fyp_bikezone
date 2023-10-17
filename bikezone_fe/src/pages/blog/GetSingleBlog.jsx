import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { reset } from '../../features/blog/blog.slice';
import { format } from "timeago.js";
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify';
import Loader from '../shared/Loader';
import { getSingleBlogPosts } from '../../features/blog/blog.thunk';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'


const GetSingleBlog = () => {
    const { id } = useParams(); // Get the blogId from the URL
    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, message, blogPost } = useSelector((state) => state.blog)



    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        dispatch(getSingleBlogPosts(id));

    }, [isError, dispatch])


    return (
        <>
            {
                isLoading ? (<Loader />) : (

                    <section className="bg-sky-100 dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto w-full lg:py-16 lg:px-6">
                            <div className="mx-auto  text-center lg:mb-8 mb-4">
                                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{`${blogPost?.user.firstname} ${blogPost?.user.lastname}'s Post`}</h2>
                                <p className="font-normal text-gray-500 sm:text-xl dark:text-gray-400">Detailed blog post</p>
                            </div>
                            <div >
                                <article article='true' className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex justify-between items-center mb-5 text-gray-500">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                            Article Published on {new Date(blogPost?.createdAt).toDateString()} - by {`${blogPost?.user.firstname} ${blogPost?.user.lastname}`}

                                        </span>
                                        <span className="text-sm">{format(blogPost?.createdAt)}</span>
                                    </div>

                                    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Title</a></h2>
                                    <h2 className="mb-2 mx-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white"><a href="#">{blogPost?.title}</a></h2>

                                    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Description</a></h2>
                                    <p className="mb-5 mx-2 font-light text-gray-500 dark:text-gray-400">
                                        {blogPost?.description}
                                    </p>
                                    <div className="">
                                        <div className='flex justify-between items-center'>
                                            <div className='flex'>

                                                {/* <AiFillHeart size={22}/> */}
                                                <AiOutlineHeart size={22} />
                                                <span className='mx-1'>{blogPost?.likes.length} likes</span>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <MdEmail />
                                                <p>{blogPost?.user.email}</p>
                                            </div>

                                        </div>

                                    </div>
                                </article>
                            </div>
                        </div>
                    </section >
                )
            }
        </>
    );
};

export default GetSingleBlog;



