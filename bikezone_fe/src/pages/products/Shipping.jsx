import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import  image
import shippingPic from '../../assets/shipping.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { shippingInfo } from '../../features/product/product.slice';
import CheckoutSteps from '../../components/CheckoutSteps';


const schema = yup.object({
    phoneNo: yup
        .string()
        .matches(/^(03\d{9})$/, 'Phone number must start with "03" and be 11 digits')
        .required('Phone number is required')
        .typeError('Phone number must be a number'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
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
                dispatch(shippingInfo(values))
                navigate('/order/confirm')

            },
        });



    return (
        <>
            {/* <MetaData title="Shipping Details" /> */}
            <CheckoutSteps activeStep={0} />

            <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-200 p-6 ">
                            <img src={shippingPic} alt="loginbike" className='w-full mt-24 rounded-3xl ' />
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">Shipping Details</h1>
                                <p>Enter your shipping information for processing</p>
                            </div>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="flex -mx-3 ">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Phone Number</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <input
                                                name='phoneNo'
                                                type="text"
                                                id='phoneNo'
                                                value={values.phoneNo}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="xxxx xxxxxxx" />
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
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input
                                                type="text"
                                                id='city'
                                                name='city'
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="city name" />
                                        </div>
                                        {errors.city && touched.city ? (
                                            <p className="text-red-600 animate-pulse">{errors.city}</p>
                                        ) : null}
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">State</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input
                                                type="text"
                                                id='state'
                                                name='state'
                                                value={values.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="state name" />
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
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input
                                                id='pinCode'
                                                type="text"
                                                name='pinCode'
                                                value={values.pinCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="- - - -" />
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
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input
                                                id='address'
                                                type="text"
                                                name='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
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

        </>
    )
}

export default Shipping