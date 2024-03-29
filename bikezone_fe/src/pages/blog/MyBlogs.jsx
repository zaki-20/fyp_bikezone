import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../shared/Loader';
import { myBlogPosts, likeDisLikeBlogPost } from '../../features/blog/blog.thunk';
import { reset } from '../../features/blog/blog.slice';
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FcSearch } from 'react-icons/fc'



const BlogPage = () => {
    const motorbikeCategories = [
        "Motorbike Reviews", "Maintenance and Repairs", "Motorbike Accessories", "Customization and Modifications", "Motorbike Safety", "Travel and Adventure", "Upcoming Models", "Riding Tips and Techniques", "Motorbike Events and Shows", "Top 10 Lists", "Motorbike Gear Guides", "Motorbike Industry News", "Vintage and Classic Bikes", "Motorbike Racing", "Motorbike Technology", "Environmental Concerns"
    ];


    const [searchTerm, setSearchTerm] = useState(''); // For search input
    const [sortCriteria, setSortCriteria] = useState(''); // For sorting criteria
    const [categoryFilter, setCategoryFilter] = useState(''); // For filtering by category


    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, message, blogPosts } = useSelector((state) => state.blog)
    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        dispatch(myBlogPosts());
    }, [])

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isError])




    const filteredAndSortedBlogPosts = blogPosts
        .filter((post) => {
            // Filter by title and category
            const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = !categoryFilter || post.category === categoryFilter;
            return titleMatch && categoryMatch;
        })
        .sort((a, b) => {
            if (sortCriteria === 'title') {
                return a.title.localeCompare(b.title);
            } else {
                // Sort by date (newest first)
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });


    const handleLike = async (blogId) => {
        await dispatch(likeDisLikeBlogPost(blogId))
        dispatch(myBlogPosts());
    }

    return (
        <>
            {
                isLoading ? (<Loader />) : (
                    <section className="bg-sky-200 dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            <div className="mx-auto max-w-screen-sm text-center mb-4">
                                <h2 className="mb-4  lg:text-4xl text-2xl tracking-tight font-semibold text-gray-900 dark:text-white">
                                    {`${user?.firstname} ${user?.lastname} Blogs`}                                </h2>
                                <p className="font-normal text-gray-600 sm:text-xl dark:text-gray-400">
                                    Welcome to you Blog Page
                                </p>
                                <div className="flex items-center justify-center mt-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search by Title"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="py-2 px-4 rounded-lg  bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-primary-300"
                                        />
                                        <div className="absolute animate-pulse inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FcSearch />
                                        </div>
                                    </div>
                                    <select
                                        value={sortCriteria}
                                        onChange={(e) => setSortCriteria(e.target.value)}
                                        className="ml-4 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-primary-300"
                                    >
                                        <option value="">Sort by Date</option>
                                        <option value="title">Sort by Title</option>
                                    </select>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="md:ml-4 py-2 px-4 md:w-min w-full  rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-primary-400 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-primary-300"
                                    >
                                        <option value="">All Categories</option>

                                        {motorbikeCategories.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}

                                        {/* Add more category options here */}
                                    </select>
                                </div>
                            </div>
                            <div class="grid gap-8 lg:grid-cols-2">
                                {filteredAndSortedBlogPosts.map((item, index) => (
                                    <article article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-5 text-gray-500">
                                            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                                Article - {`${user?.firstname} ${user?.lastname}`}
                                            </span>
                                            <span className="text-sm">{format(item.createdAt)}</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-start">
                                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h1>
                                            <h1 className='mb-2 text-sm self-end text-gray-600 dark:text-white'>( {item.category} )</h1>
                                        </div>                                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                            {item.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className='flex'>
                                                {/* <AiFillHeart size={22}/> */}
                                                <AiOutlineHeart size={22} onClick={() => handleLike(item?._id)} />
                                                <span className='mx-1'>{item.likes.length} likes</span>

                                            </div>
                                            <Link to={`/blog/${item._id}`} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                Read more
                                                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                        </div>
                                    </article>

                                ))
                                }
                            </div>
                        </div>
                    </section >
                )
            }
        </>
    );
};

export default BlogPage;
