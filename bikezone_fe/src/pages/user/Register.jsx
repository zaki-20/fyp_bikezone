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
import axios from 'axios';


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

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const { values, handleBlur, handleChange, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values) => {
                try {
                    // Upload the image to Cloudinary
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('upload_preset', 'preset_images'); // Replace with your Cloudinary upload preset
                    const cloudinaryResponse = await axios.post(
                        'https://api.cloudinary.com/v1_1/dqe7trput/image/upload',
                        formData
                    );
                    const imageUrl = cloudinaryResponse.data.secure_url;
                    // Add the Cloudinary image URL to the form data
                    values.imageURL = imageUrl;
                    console.log(values)
                    // // Register the user with the updated form data
                    dispatch(register(values));
                } catch (error) {
                    toast.error('Image upload failed.');
                }
            },
        });

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset())
        }
        if (isSuccess && !isError) {
            toast.success(message);
            navigate('/otp-verification', { state: { fromRegister: true } });
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

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
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

                                <div className="flex -mx-3 items-center">
                                    <div className="w-full px-3 mb-12">
                                        <label htmlFor="avatar" className="text-xs font-semibold px-1">
                                            Profile Image
                                        </label>
                                        <input
                                            type='file'
                                            id='avatar'
                                            name='avatar'
                                            onChange={handleImageChange}
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus-border-indigo-500"
                                        />
                                    </div>
                                    {image && (
                                        <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(image)} alt="Rounded avatar" />
                                    )}
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button
                                            type="submit"
                                            className="flex relative items-center justify-center w-full  bg-[#122222] text-white rounded-lg h-12 font-semibold "
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div role="status" className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>REGISTER NOW</span>
                                                </>
                                            )
                                            }

                                        </button>
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