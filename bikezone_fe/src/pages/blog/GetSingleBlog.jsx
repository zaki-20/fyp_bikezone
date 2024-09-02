import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { reset } from '../../features/blog/blog.slice';
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify';
import Loader from '../shared/Loader';
import { deleteBlog, getSingleBlogPosts, likeDisLikeBlogPost } from '../../features/blog/blog.thunk';

import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import TimeAgo from 'timeago-react';


const GetSingleBlog = () => {
    const { id } = useParams(); // Get the blogId from the URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isError, isSuccess, message, blogPost } = useSelector((state) => state.blog)
    const loggedInUser = useSelector((state) => state.auth.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        dispatch(getSingleBlogPosts(id));

    }, [isError, dispatch])


    const handleLike = async (blogId) => {
        await dispatch(likeDisLikeBlogPost(blogId))
        dispatch(getSingleBlogPosts(id));
    }

    const handleDeletePost = async (id) => {
        await dispatch(deleteBlog(id))
        navigate('/blog/me')
    }


    return (
        <>
            {
                isLoading ? (<Loader />) : (

                    <section className=" bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 dark:bg-gray-900 ">
                        <div className="py-8 px-4 mx-auto w-full lg:py-16 lg:px-6">
                            <div className="mx-auto  text-center lg:mb-8 mb-4">
                                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{`${blogPost?.user?.firstname} ${blogPost?.user?.lastname}'s Post`}</h2>
                                <p className="font-normal text-gray-500 sm:text-xl dark:text-gray-400">Detailed blog post</p>
                            </div>

                            {
                                loggedInUser?._id === blogPost?.user?._id && (

                                    <div>
                                        <Button onClick={handleOpen} variant="gradient" className='flex items-center gap-x-1 mb-2 hover:text-yellow-400'>
                                            <span>Delete Post</span>
                                            <AiFillDelete className='text-red-700 group-hover:animate-pulse' size={20} />
                                        </Button>
                                        <Dialog
                                            open={open}
                                            handler={handleOpen}
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0.9, y: -100 },
                                            }}
                                        >
                                            <DialogHeader>Are you really want to delete your post permanantly?</DialogHeader>

                                            <DialogFooter>
                                                <Button
                                                    variant="text"
                                                    color="red"
                                                    onClick={handleOpen}
                                                    className="mr-1"
                                                >
                                                    <span>Cancel</span>
                                                </Button>
                                                <Button onClick={() => handleDeletePost(blogPost?._id)} variant="gradient" color="green" >
                                                    <span>Confirm</span>
                                                </Button>
                                            </DialogFooter>
                                        </Dialog>
                                    </div>
                                )
                            }

                            {
                                loggedInUser?._id === blogPost?.user?._id &&
                                (
                                    <>
                                        <Link to={`/blog/update/${id}`}>
                                            <button className='flex items-center px-2 rounded-lg float-right py-1 text-xs gap-x-1 text-white mb-2 hover:text-yellow-400 bg-[#122222]'>
                                                update
                                            </button>

                                        </Link>
                                    </>
                                )
                            }

                            <div >
                                <article article='true' className="p-6 bg-[#dddddd]  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex justify-between items-center border-b border-gray-500  mb-5 text-gray-500">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                            Article Published on {new Date(blogPost?.createdAt).toDateString()} - by {`${blogPost?.user?.firstname} ${blogPost?.user?.lastname}`}

                                        </span>
                                        <span className="text-sm">
                                            <TimeAgo
                                                datetime={blogPost?.createdAt}
                                            />
                                        </span>
                                    </div>

                                    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Title</a></h2>
                                    <div className="flex flex-col border-b border-gray-400 justify-center items-start">
                                        <h1 className="mb-2 ml-2 text-2xl  tracking-tight text-gray-900 dark:text-white">{blogPost?.title}</h1>
                                        <h1 className='mb-2 text-sm self-end text-gray-600 dark:text-white'>( {blogPost?.category} )</h1>
                                    </div>
                                    <h2 className="my-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Description</a></h2>
                                    <p
                                        className="mb-5 ml-2 font-light text-black dark:text-gray-400"
                                        dangerouslySetInnerHTML={{ __html: blogPost?.description }}
                                    ></p>
                                    <div className="">
                                        <div className='flex justify-between items-center'>
                                            <div className="flex">
                                                {blogPost?.likes.includes(loggedInUser?._id) ? (
                                                    <AiFillHeart className='cursor-pointer text-red-600 hover:scale-110 duration-150' size={22} onClick={() => handleLike(blogPost?._id)} />
                                                ) : (
                                                    <AiOutlineHeart className='cursor-pointer hover:scale-110 duration-150' size={22} onClick={() => handleLike(blogPost?._id)} />
                                                )}
                                                {
                                                    !isLoading && (
                                                        <span className="mx-1">{blogPost?.likes.length} likes</span>
                                                    )
                                                }
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <MdEmail />
                                                <p>{blogPost?.user?.email}</p>
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



