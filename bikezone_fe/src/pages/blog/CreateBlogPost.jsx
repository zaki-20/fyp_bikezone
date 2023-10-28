import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { BsArrowRight } from "react-icons/bs"
import { createBlogPost } from '../../features/blog/blog.thunk';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { reset } from '../../features/blog/blog.slice';
import { Select, Option } from "@material-tailwind/react";


const schema = yup.object({
    title: yup
        .string()
        .required('name is required'),
    description: yup
        .string()
        .max(4000, 'character imit exceed')
        .required('descripton is required'),
    category: yup
        .string()
        .required('category is required'),
})

const CreateBlogPost = () => {
    const motorbikeCategories = [
        "Motorbike Reviews", "Maintenance and Repairs", "Motorbike Accessories", "Customization and Modifications", "Motorbike Safety", "Travel and Adventure", "Upcoming Models", "Riding Tips and Techniques", "Motorbike Events and Shows", "Top 10 Lists", "Motorbike Gear Guides", "Motorbike Industry News", "Vintage and Classic Bikes", "Motorbike Racing", "Motorbike Technology", "Environmental Concerns"
    ];


    const dispatch = useDispatch()

    const { isError, isSuccess, message } = useSelector((state) => state.blog)
    const initialValues = {
        title: "",
        description: "",
        category: ""
    };


    useEffect(() => {
        if (isError) {
            // toast.error(message)
            dispatch(reset())
        }
    }, [isError])

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: (values, action) => {
                const trimmedValues = {
                    title: values.title.trim(),
                    category: values.category,
                    description: values.description.trim(),
                };
                dispatch(createBlogPost(trimmedValues))
                toast.success("post created")
                action.resetForm();
            },
        });

    return (
        <div className="py-20  bg-[#b6b6b6] dark:text-gray-50">
            <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-10 md:py-0 px-6  shadow-xl bg-[#f0efef] dark:bg-gray-800 rounded-md">
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

                <form onSubmit={handleSubmit} noValidate="" className="flex bg-[#d0d1d1] flex-col py-6 shadow-xl justify-center rounded-md space-y-6 px-6">
                    <h1 className="text-3xl text-center font-bold text-yellow-400 mb-4 text-robotic">
                        Create Your Post
                    </h1>
                    <label className="block ">
                        <div class="relative h-10 w-72 min-w-[200px] mb-5">
                            <span className="mb-1">Category</span>
                            <select
                                name="category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                                className="peer h-full w-full rounded-[7px]  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  transition-all "
                            >
                                <option value="" disabled>Select a Category</option>
                                {motorbikeCategories.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>

                        </div>

                        {errors.category && touched.category ? (
                            <p className="text-red-600 animate-pulse">{errors.category}</p>
                        ) : null}
                    </label>

                    <label className="block">
                        <span className="mb-1">Title</span>
                        <input
                            name='title'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            type="text"
                            placeholder="Enter your post title"
                            className="block w-full rounded-md focus:ring focus:border-transparent focus:ring-yellow-400 shadow-sm  dark:bg-gray-800"
                        />
                        {errors.title && touched.title ? (
                            <p className="text-red-600 animate-pulse">{errors.title}</p>
                        ) : null}
                    </label>



                    <label className="block">
                        <span className="mb-1">Description</span>
                        <textarea
                            name='description'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            rows="3"
                            placeholder="Enter your post description..."
                            className="block w-full rounded-md focus:ring focus:border-transparent focus:ring-yellow-400  dark:bg-gray-800"
                        ></textarea>
                        {errors.description && touched.description ? (
                            <p className="text-red-600 animate-pulse">{errors.description}</p>
                        ) : null}
                    </label>

                    <button
                        type="submit"
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
