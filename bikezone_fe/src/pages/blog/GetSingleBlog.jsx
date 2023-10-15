import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const GetSingleBlog = () => {
    const { id } = useParams(); // Get the blogId from the URL


    return (
        <div className="bg-white py-10 dark:bg-gray-900">
            <div className="max-w-screen-lg mx-auto p-4 sm:p-8 shadow-xl border">
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {"blog.title"}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Published on 12 dec, 2022
                        {/* {new Date(blog.createdAt).toDateString()} */}
                    </p>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 mx-2">
                    {"blog.description"}
                    lorem100
                </p>
                <div className="mt-8">
                    <Link to="/"  >
                        <button className="px-4 py-2 border hover:rounded-md  hover:bg-gray-900 hover:text-yellow-400 duration-300 " >
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GetSingleBlog;
