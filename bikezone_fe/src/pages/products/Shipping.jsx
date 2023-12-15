import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { shippingInfo } from '../../features/product/product.slice';
import CheckoutSteps from '../../components/CheckoutSteps';
import MetaData from '../../components/MetaData';
import Lottie from 'lottie-react'
import shippingAnimation from '../../assets/animated/shippingDetails.json'
import { FaPhone } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbMapPinCode } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";



const schema = yup.object({
    phoneNo: yup
        .string()
        .matches(/^(03\d{9})$/, 'Phone number must start with "03" and be 11 digits')
        .required('Phone number is required')
        .typeError('Phone number must be a number'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pinCode: yup
        .string()
        .matches(/^\d{4}$/, 'Pincode must be 4 digits')
        .required('Pincode is required')
        .typeError('Pincode must be a number'),
}).required();


const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        phoneNo: '',
        address: '',
        city: '',
        pinCode: '',
    };

    const { values, handleBlur, handleChange, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values) => {
                await dispatch(shippingInfo(values))
                navigate('/order/confirm')
            },
        });

    return (
        <>
            <MetaData title="Shipping Details" />
            <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>
                <CheckoutSteps activeStep={0} />
                <div className="min-w-screen  min-h-screen flex items-center justify-center px-5 py-5">
                    <div className="bg-[#d0d1d1] text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                        <div className="md:flex w-full">
                            <div className="hidden md:block w-1/2 bg-[#e9e9e9] p-6 ">
                                <Lottie
                                    className="mt-24"
                                    animationData={shippingAnimation}
                                />
                            </div>

                            <div className="w-full bg-[#b6b6b6] md:w-1/2 py-10 px-5 md:px-10">
                                <div className="text-center mb-10">
                                    <h1 className="font-bold text-3xl text-gray-900">Shipping Details</h1>
                                    <p>Enter your shipping information for processing</p>
                                </div>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="flex -mx-3 ">
                                        <div className="w-full px-3 mb-5">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">Phone Number</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FaPhone />
                                                </div>
                                                <input
                                                    name='phoneNo'
                                                    type="text"
                                                    id='phoneNo'
                                                    value={values.phoneNo}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg bg-gray-100 outline-none focus:ring-yellow-500 focus:border-yellow-500  ${touched.phoneNo && errors.phoneNo ? 'border-red-500' : 'border-gray-200'} `}
                                                    placeholder="xxxx xxxxxxx"
                                                />
                                            </div>
                                            {errors.phoneNo && touched.phoneNo ? (
                                                <p className="text-red-600 animate-pulse">{errors.phoneNo}</p>
                                            ) : null}
                                        </div>

                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-5">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">City</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <MdLocationCity />
                                                </div>
                                                <input
                                                    type="text"
                                                    id='city'
                                                    name='city'
                                                    value={values.city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg bg-gray-100  outline-none focus:ring-yellow-500 focus:border-yellow-500  ${touched.city && errors.city ? 'border-red-500' : 'border-gray-200'} `}
                                                    placeholder="city name" />
                                            </div>
                                            {errors.city && touched.city ? (
                                                <p className="text-red-600 animate-pulse">{errors.city}</p>
                                            ) : null}
                                        </div>

                                        <div className="w-1/2 px-3 mb-5">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">State</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FaMapLocationDot />
                                                </div>
                                                <input
                                                    type="text"
                                                    id='state'
                                                    name='state'
                                                    value={values.state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg bg-gray-100  outline-none focus:ring-yellow-500 focus:border-yellow-500  ${touched.state && errors.state ? 'border-red-500' : 'border-gray-200'} `}
                                                    placeholder="state name" />
                                            </div>
                                            {errors.state && touched.state ? (
                                                <p className="text-red-600 animate-pulse">{errors.state}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">PIN Code</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <TbMapPinCode />
                                                </div>
                                                <input
                                                    id='pinCode'
                                                    type="text"
                                                    name='pinCode'
                                                    value={values.pinCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 bg-gray-100 rounded-lg  outline-none focus:ring-yellow-500 focus:border-yellow-500   ${touched.pinCode && errors.pinCode ? 'border-red-500' : 'border-gray-200'}`}
                                                    placeholder="- - - - -"
                                                />
                                            </div>
                                            {errors.pinCode && touched.pinCode ? (
                                                <p className="text-red-600 animate-pulse">{errors.pinCode}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">Address</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <IoLocation />
                                                </div>
                                                <input
                                                    type="text"
                                                    id='address'
                                                    name='address'
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 bg-gray-100 rounded-lg outline-none focus:ring-yellow-500 focus:border-yellow-500  ${touched.address && errors.address ? 'border-red-500' : 'border-gray-200'} `}
                                                    placeholder="************" />
                                            </div>
                                            {errors.address && touched.address ? (
                                                <p className="text-red-600 animate-pulse">{errors.address}</p>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <button type='submit' className="block w-full max-w-xs mx-auto bg-[#122222]  text-white rounded-lg px-3 py-3  hover:text-yellow-400 font-semibold">CONTINUE</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Shipping