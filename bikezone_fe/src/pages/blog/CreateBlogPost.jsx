import React from 'react';
// Import  image
import addBlog from '../../assets/addblog.png';
import {BsArrowRight} from "react-icons/bs"

const CreateBlogPost = () => {
    return (
        <div className="py-20 dark:text-gray-50">
            <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-10 md:py-0 md:px-6 shadow-xl bg-gray-100 dark:bg-gray-800 rounded-md">
                    <h1 className="text-4xl font-bold text-yellow-400 my-4 text-robotic">
                        Contribute to the Bike Community
                    </h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Share your knowledge with fellow bike enthusiasts. Your insights on motorbikes, accessories, and parts can make a difference.
                    </p>
                    <ul className="list-inside pl-6 py-6 text-lg text-gray-700 space-y-4 list-none">
                        <li className="mb-4 flex items-center ">
                            <span className="mr-2">
                                <BsArrowRight />
                            </span>
                            Write insightful articles about the  motorbike models.
                        </li>
                        <li className="mb-4 flex items-center ">
                            <span className="mr-2">
                                <BsArrowRight />
                            </span>
                            Review and recommend top-notch bike accessories.
                        </li>
                        <li className="mb-4 flex items-center ">
                            <span className="mr-2">
                                <BsArrowRight />
                            </span>
                            Discuss maintenance tips and tricks for your fellow riders.
                        </li>
                        <li className="mb-4 flex items-center ">
                            <span className="mr-2">
                                <BsArrowRight />
                            </span>
                            Share your thoughts on the best aftermarket bike parts.
                        </li>
                    </ul>


                </div>

                <form noValidate="" className="flex flex-col py-6 shadow-xl justify-center rounded-md space-y-6 md:py-0 md:px-6">
                    <h1 className="text-3xl text-center font-bold text-yellow-400 mb-4 text-robotic">
                        Create Your Post
                    </h1>
                    <label className="block">
                        <span className="mb-1">Title</span>
                        <input
                            type="text"
                            placeholder="Enter your post title"
                            className="block w-full rounded-md focus:ring focus:border-transparent focus:ring-yellow-400 shadow-sm  dark:bg-gray-800"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-1">Description</span>
                        <textarea
                            rows="3"
                            placeholder="Enter your post description..."
                            className="block w-full rounded-md focus:ring focus:border-transparent focus:ring-yellow-400  dark:bg-gray-800"
                        ></textarea>
                    </label>
                    <button
                        type="button"
                        className="self-center  bg-gray-900 text-white hover:text-yellow-400 py-2 px-6 w-full my-2 text-lg rounded  dark:bg-violet-400 dark:text-gray-900 "
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPost;
