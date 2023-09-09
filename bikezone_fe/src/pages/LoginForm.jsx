import React from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link } from 'react-router-dom';
// Import  image
import shadowBikeImage from '../assets/shadow-bike.png';



const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();


const LoginForm = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: (values, action) => {
                console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
                //// to get rid of all the values after submitting the form
                action.resetForm();
            },
        });


    return (
        <div>
            <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-200 py-10 px-10 ">
                            <img src={shadowBikeImage} alt="loginbike" className='w-full mx-4 mt-20 lg:mx-10' />
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">SIGN IN</h1>
                                <p>Enter your information to Sign In</p>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <input
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="email" id='email' className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                        </div>
                                        {errors.email && touched.email ? (
                                            <p className="text-red-600 animate-pulse">{errors.email}</p>
                                        ) : null}
                                    </div>

                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input
                                                name='password'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id='password' type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none " placeholder="************" />
                                        </div>
                                        {errors.password && touched.password ? (
                                            <p className="text-red-600 animate-pulse">{errors.password}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex -mx-3 mt-5">
                                    <div className="w-full px-3 mb-5">
                                        <button type='submit' className="block w-full max-w-xs mx-auto bg-[#122222] hover:bg-indigo-700  text-white rounded-lg px-3 py-3 font-semibold">SIGN IN </button>
                                    </div>
                                </div>
                            </form>
                            {/* Forgot Password link */}
                            <div className="text-center mt-3">
                                <p>
                                    <Link to="/forgot-password" className='text-[#122222]'>Forgot Password?</Link>
                                </p>
                            </div>
                            {/* Already have an account? Sign in */}
                            <div className="text-center mt-3">
                                <p>
                                    Dont have an account? <Link href="/login" className='text-[#122222] underline'>Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginForm