import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Import  image
import shadowBikeImage from '../../assets/shadow-bike.png';
import { login } from '../../features/auth/auth.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { reset } from '../../features/auth/auth.slice';
import Loader from '../shared/Loader';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";



const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();


const LoginForm = () => {

    const { user, isLoading, isError, isSuccess, message, logoutSuccess } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);


    // console.log(location)
    const redirect = location.search ? location.search.split('=')[0] : '/account'

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset())
        }
    }, [isError])

    useEffect(() => {
        if (isSuccess && user) {
            toast.success(message);
            navigate(redirect)
        }
    }, [isSuccess])

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
            onSubmit: (values, action) => {
                dispatch(login(values))
                action.resetForm();
            },
        });

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            {
                isLoading ? (<Loader />) : (
                    <div>
                        <div className="min-w-screen min-h-screen bg-[#def5f596] flex items-center justify-center px-5 py-5">
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
                                                    <label htmlFor="true" className="text-xs font-semibold px-1">Email</label>
                                                    <div className="flex">
                                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                            <MdEmail />
                                                        </div>
                                                        <input
                                                            name='email'
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="email"
                                                            id='email'
                                                            className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 outline-none focus:ring-yellow-500 focus:border-yellow-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'} `}
                                                            placeholder="johnsmith@example.com" />
                                                    </div>
                                                    {errors.email && touched.email ? (
                                                        <p className="text-red-600 animate-pulse">{errors.email}</p>
                                                    ) : null}
                                                </div>

                                            </div>

                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5 relative">
                                                    <label htmlFor="true" className="text-xs font-semibold px-1">
                                                        Password
                                                    </label>
                                                    <div className="flex items-center">
                                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                            <RiLockPasswordFill />
                                                        </div>
                                                        <input
                                                            name="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            id="password"
                                                            type={showPassword ? 'text' : 'password'} // Toggle visibility based on showPassword state
                                                            className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 outline-none focus:ring-yellow-500 focus:border-yellow-500 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-200'
                                                                }`}
                                                            placeholder="xxxxxxxxx"
                                                        />
                                                        <div
                                                            className="absolute right-5 cursor-pointer"
                                                            onClick={handleTogglePasswordVisibility}
                                                        >
                                                            {showPassword ? <FaEye className='hover:text-yellow-400 duration-300' /> : <FaEyeSlash className='hover:text-yellow-400 duration-300' />}
                                                        </div>
                                                    </div>
                                                    {errors.password && touched.password ? (
                                                        <p className="text-red-600 animate-pulse">{errors.password}</p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="flex -mx-3 mt-5">
                                                <div className="w-full px-3 mb-5">
                                                    <button type='submit' className="block w-full max-w-xs mx-auto bg-[#122222] hover:text-yellow-400 duration-200 text-white rounded-lg px-3 py-3 font-semibold">SIGN IN </button>
                                                </div>
                                            </div>
                                        </form>
                                        {/* Forgot Password link */}
                                        <div className="text-center mt-3">
                                            <p>
                                                <Link to="/forgot-password" className='text-[#122222] hover:text-blue-800 duration-200'>Forgot Password?</Link>
                                            </p>
                                        </div>
                                        {/* Already have an account? Sign in */}
                                        <div className="text-center mt-3">
                                            <p>
                                               <span className=''> Dont have an account?</span> <Link to="/register" className='text-[#122222] underline hover:text-blue-800 duration-200'>Sign up</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default LoginForm