import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import resetImg from '../../assets/reset.png';
import { resetPassword } from '../../features/auth/auth.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { reset } from '../../features/auth/auth.slice';
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const schema = yup.object({
    newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();


const ResetPassword = () => {

    const navigate = useNavigate()
    const { token } = useParams();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, isError, message, isSuccess } = useSelector((state) => state.auth)

    const initialValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const { newPassword, confirmPassword } = values;
                dispatch(resetPassword({ newPassword, confirmPassword, token }))
                action.resetForm();
            },
        });

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset())
        }
        if (isSuccess) {
            toast.success(message);
            dispatch(reset())
            navigate("/login")
        }

    }, [isError, isSuccess])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <div>
                <div className="min-w-screen min-h-screen bg-[#d0d1d1] flex items-center justify-center px-5 py-5">
                    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                        <div className="md:flex items-center w-full">
                            <div className="hidden md:block w-1/2 bg-gray-200 p-20 ">
                                <img src={resetImg} alt="resetPass" className='w-full rounded-3xl' />
                            </div>
                            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                                <div className="text-center mb-10 ">
                                    <h1 className="font-bold text-3xl text-gray-900">Reset Password </h1>
                                    <p>please enter your new password</p>
                                </div>
                                <form onSubmit={handleSubmit}>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5 relative">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">
                                                New Password
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <RiLockPasswordFill />
                                                </div>
                                                <input
                                                    name="newPassword"
                                                    value={values.newPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    id="newPassword"
                                                    type={showPassword ? 'text' : 'password'} // Toggle visibility based on showPassword state
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 outline-none focus:ring-yellow-500 focus:border-yellow-500 ${touched.newPassword && errors.newPassword ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="xxxxxxxxx"
                                                />
                                                <div
                                                    className="absolute right-5 cursor-pointer"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FaEye className='hover:text-yellow-400 duration-300' /> : <FaEyeSlash className='hover:text-yellow-400 duration-300' />}
                                                </div>
                                            </div>
                                            {errors.newPassword && touched.newPassword ? (
                                                <p className="text-red-600 animate-pulse">{errors.newPassword}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5 relative">
                                            <label htmlFor="true" className="text-xs font-semibold px-1">
                                                Confirm Password
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <RiLockPasswordFill />
                                                </div>
                                                <input
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    id="confirmPassword"
                                                    type={showPassword ? 'text' : 'password'} // Toggle visibility based on showPassword state
                                                    className={`w-full caret-yellow-500 placeholder:text-gray-400  text-[#6e6e6e] -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 outline-none focus:ring-yellow-500 focus:border-yellow-500 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                                    placeholder="xxxxxxxxx"
                                                />
                                                <div
                                                    className="absolute right-5 cursor-pointer"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FaEye className='hover:text-yellow-400 duration-300' /> : <FaEyeSlash className='hover:text-yellow-400 duration-300' />}
                                                </div>
                                            </div>
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <p className="text-red-600 animate-pulse">{errors.confirmPassword}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex w-full mt-5">
                                        <div className="w-full  mb-5">
                                            <button type='submit' className="block w-full  mx-auto bg-[#122222] hover:bg-yellow-400  text-white rounded-lg px-3 py-3 font-semibold duration-200">SUBMIT </button>
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

export default ResetPassword