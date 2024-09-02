import React from 'react';
import Lottie from 'lottie-react'
import searchAnimation from '../../assets/animated/search.json'
import { Link } from 'react-router-dom';


const NoBlogPost = () => {
    return (
        <div className="px-6 bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 min-h-screen sm:flex sm:items-center sm:justify-center">
            <Lottie
                className=""
                animationData={searchAnimation}
            />
            <div className='sm:flex sm:flex-col text-center'>
                <h1 className="text-3xl font-semibold text-gray-800">No Blog Post</h1>
                <p className="text-gray-600 mt-4">Sorry, there are currently no blog posts available.</p>
                <div className='flex gap-x-3 justify-center my-2'>
                    <Link to={'/blog/new'}>
                        <button className='px-3 py-1 rounded-md bg-gray-300'>Create Blog</button>
                    </Link>
                    <Link to={'/'}>
                        <button className='px-3 py-1 rounded-md bg-gray-300'>Go to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoBlogPost;
