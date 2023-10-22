import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import shadowBikeImage from '../../assets/shadow-bike.png';

import { register } from '../../features/auth/auth.thunk';
import { reset } from '../../features/auth/auth.slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const schema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();


const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values) => {

                dispatch(register(values));

            },
        });


    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset())
        }
        if (isSuccess) {
            toast.success(message);
            navigate('/')
        }

    }, [isError, isSuccess])



    return (
        <div>
            <div className="min-w-screen min-h-screen bg-[#def5f596] flex items-center justify-center px-5 py-5 mb-4">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-200 py-10 px-10">
                            <img src={shadowBikeImage} alt="loginbike" className='w-full mx-4 mt-20 lg:mx-10' />
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                                <p>Enter your information to register</p>
                            </div>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">First name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input
                                                type="text"
                                                id='firstname'
                                                name='firstname'
                                                value={values.firstname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" />
                                        </div>
                                        {errors.firstname && touched.firstname ? (
                                            <p className="text-red-600 animate-pulse">{errors.firstname}</p>
                                        ) : null}
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Last name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input
                                                type="text"
                                                id='lastname'
                                                name='lastname'
                                                value={values.lastname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" />
                                        </div>
                                        {errors.lastname && touched.lastname ? (
                                            <p className="text-red-600 animate-pulse">{errors.lastname}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex -mx-3 ">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <input
                                                name='email'
                                                type="email"
                                                id='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                        </div>
                                        {errors.email && touched.email ? (
                                            <p className="text-red-600 animate-pulse">{errors.email}</p>
                                        ) : null}
                                    </div>

                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input
                                                id='password'
                                                type="password"
                                                name='password'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                        </div>
                                        {errors.password && touched.password ? (
                                            <p className="text-red-600 animate-pulse">{errors.password}</p>
                                        ) : null}
                                    </div>
                                </div>
                                {/* 
                                <div className="flex -mx-3 items-center">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">
                                            Profile Image
                                        </label>
                                        <input
                                            type="file"
                                            id="avatar"
                                            name="avatar"
                                            onChange={(e) => setFieldValue('avatar', e.currentTarget.files[0])}
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                        />
                                        {errors.avatar && touched.avatar ? (
                                            <p className="text-red-600 animate-pulse">{errors.avatar}</p>
                                        ) : null}
                                    </div>
                                    {values.avatar && (
                                        <img className="w-10 h-10 rounded-full" src="/helmet.jpg" alt="Rounded avatar" />
                                    )}
                                </div> */}

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Confirm Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input
                                                name='confirmPassword'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="password" id='confirmPassword' className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                        </div>
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <p className="text-red-600 animate-pulse">{errors.confirmPassword}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type='submit' className="block w-full max-w-xs mx-auto bg-[#122222]  text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                    </div>
                                </div>
                            </form>
                            {/* Already have an account? Sign in */}
                            <div className="text-center mt-3">
                                <p>
                                    Already have an account? <Link to="/login" className='text-[#122222] underline'>Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register