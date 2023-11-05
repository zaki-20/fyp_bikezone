import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import Input from 'react-phone-number-input/input'
import { useDispatch, useSelector } from 'react-redux';
import { createWorkshop } from '../../features/workshop/workshop.thunk';
import { reset } from '../../features/workshop/workshop.slice';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react'
import verticalBar from '../../assets/animated/verticalBar.json'



const schema = yup.object({
    name: yup.string().required('Workshop Name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Workshop Email is required'),
    brand: yup.string().required('Brand is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    service1: yup.string(),
    service2: yup.string(),
    service3: yup.string(),
    service4: yup.string(),
    contact: yup.string().required('contact number is required'),
    startTime: yup
        .number().min(1).max(24)
        .typeError('Start Time must be a number')
        .required('Start Time is required'),
    endTime: yup
        .number().min(1).max(24)
        .typeError('End Time must be a number')
        .required('End Time is required'),
    maxAppointments: yup
        .number()
        .typeError('Max Appointments must be a number')
        .required('Max Appointments is required'),
    description: yup.string().required('Description is required'),
});


const CreateWorkshop = () => {


    const dispatch = useDispatch()
    const initialValues = {
        name: '',
        email: '',
        brand: '',
        address: '',
        city: '',
        contact: '',
        startTime: '',
        endTime: '',
        maxAppointments: '',
        description: '',
        service1: '',
        service2: '',
        service3: '',
        service4: '',
    }

    const { isError, isSuccess, message, isLoading } = useSelector((state) => state.workshop)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        if (message === 'Workshop created successfully') {
            toast.success(message)
        }
        return () => {
            dispatch(reset())
        }

    }, [isSuccess, isError, message])

    const { values, handleBlur, handleChange, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                await dispatch(createWorkshop(values))
                console.log(values)
                action.resetForm();
            },
        });

    return (
        <>
            <section className="py-1 bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">

                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t text-yellow-400 bg-[#122222] mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className=" text-xl font-bold">
                                    Post Your Workshops Details
                                </h6>
                                <button className=" text-yellow-400 active:bg-yellow-400  border border-b-2 border-yellow-400 hover:border font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Settings
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 bg-[#e6e6e6] lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Workshop Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Workshop Name
                                            </label>
                                            <input
                                                id='name'
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                placeholder='enter your workshop name' className="border-0 border-b border-black px-3 py-3  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.name && touched.name ? (
                                                <p className="text-red-600 animate-pulse">{errors.name}</p>
                                            ) : null}
                                        </div>

                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                Workshop Email address
                                            </label>
                                            <input
                                                id='email'
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="email"
                                                placeholder='enter your email' className="border-0 px-3 py-3 border-b border-black  placeholder-blueGray-300 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.email && touched.email ? (
                                                <p className="text-red-600 animate-pulse">{errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Brand
                                            </label>
                                            <input
                                                id='brand'
                                                name='brand'
                                                value={values.brand}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text" placeholder='enter your brand name' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.brand && touched.brand ? (
                                                <p className="text-red-600 animate-pulse">{errors.brand}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2" htmlFor="grid-password">
                                                Upload photo
                                            </label>
                                            <input type="file" className="border-0 px-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Contact Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Address
                                            </label>
                                            <input
                                                id='address'
                                                name='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text" placeholder='enter your workshop address' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.address && touched.address ? (
                                                <p className="text-red-600 animate-pulse">{errors.address}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                City
                                            </label>
                                            <input
                                                id='city'
                                                name='city'
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur} type="text" placeholder='enter workshop city' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.city && touched.city ? (
                                                <p className="text-red-600 animate-pulse">{errors.city}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Phone #
                                            </label>
                                            <Input
                                                country="PK"
                                                international
                                                withCountryCallingCode
                                                id='contact'
                                                name='contact'
                                                value={values.contact}
                                                onChange={(value) => setFieldValue('contact', value)}
                                                onBlur={handleBlur}
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors.contact && touched.contact ? (
                                                <p className="text-red-600 animate-pulse">{errors.contact}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>

                                <div className='mt-3 mb-6 '>
                                    <span className="text-blueGray-400 text-sm font-bold uppercase">
                                        Workshop Services
                                    </span>
                                    <span className='mx-2 font-medium'>Optional *</span>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                Service 1
                                            </label>
                                            <input
                                                type="text"
                                                id='service1'
                                                name='service1'
                                                value={values.service1}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='enter your service'
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2" htmlFor="grid-password">
                                                Service 2
                                            </label>
                                            <input
                                                type="text"
                                                id='service2'
                                                name='service2'
                                                value={values.service2}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='enter your service'
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                Service 3
                                            </label>
                                            <input
                                                type="text"
                                                id='service3'
                                                name='service3'
                                                value={values.service3}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='enter your service'
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                Service 4
                                            </label>
                                            <input
                                                type="text"
                                                id='service4'
                                                name='service4'
                                                value={values.service4}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='enter your service'
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                {/* ====================== Slots =================== */}
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Working Hours
                                </h6>
                                <div className="flex flex-wrap">

                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Start Time <span className='mx-2'>(1-24) GMT</span>
                                            </label>
                                            <input
                                                id='startTime'
                                                name='startTime'
                                                value={values.startTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="number" placeholder='enter you start time e.g. 9' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.startTime && touched.startTime ? (
                                                <p className="text-red-600 animate-pulse">{errors.startTime}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                End Time  <span className='mx-2'>(1-24) GMT</span>
                                            </label>
                                            <input
                                                id='endTime'
                                                name='endTime'
                                                value={values.endTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="number" placeholder='enter you end time e.g. 20' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.endTime && touched.endTime ? (
                                                <p className="text-red-600 animate-pulse">{errors.endTime}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Max Appointments
                                            </label>
                                            <input
                                                id='maxAppointments'
                                                name='maxAppointments'
                                                value={values.maxAppointments}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="number" placeholder='max appointments per hour' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.maxAppointments && touched.maxAppointments ? (
                                                <p className="text-red-600 animate-pulse">{errors.maxAppointments}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                <h6 className=" text-sm mt-3 mb-6 font-bold uppercase">
                                    About Workshop
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2" htmlFor="grid-password">
                                                Description
                                            </label>
                                            <textarea
                                                id='description'
                                                name='description'
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur} placeholder='enter detailed description about workshop..' type="text" className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows={4} />
                                            {errors.description && touched.description ? (
                                                <p className="text-red-600 animate-pulse">{errors.description}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='flex justify-center w-full'>
                                        <button
                                            type="submit"
                                            className="flex justify-center bg-gray-400 uppercase tracking-wider hover:tracking-[6px] font-bold rounded-md px-4 py-2 border-2 border-b-4 border-black  transition-all  hover:bg-[#122222] w-1/3 hover:w-1/2 hover:text-yellow-400 duration-500"
                                        >
                                            {isLoading ? (
                                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                'SUBMIT'
                                            )}
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default CreateWorkshop