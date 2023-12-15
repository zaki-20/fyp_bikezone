import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../features/auth/auth.thunk';
import { reset } from '../../features/auth/auth.slice';
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const schema = yup.object({
    oldPassword: yup.string().min(6, 'Password must be at least 6 characters').required('old Password is required'),
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('enter your new password'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();


const UpdatePassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const { isLoading, isError, message, isUpdate } = useSelector((state) => state.auth)

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values) => {
                dispatch(updatePassword(values))
            },
        });

    console.log(isUpdate)


    useEffect(() => {
        if (isError) {
            toast.error(message);
            console.log(message)
            dispatch(reset())
        }
        if (isUpdate) {
            toast.success(message);
            dispatch(reset())
            navigate('/account')
        }

    }, [isError, isUpdate])


    const togglePasswordVisibility = (passwordType) => {
        switch (passwordType) {
            case 'oldPassword':
                setShowOldPassword(!showOldPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirmPassword':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-[#d0d1d1] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Password</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#b6b6b6] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">


                        <div className="relative">
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                                Old Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaKey />
                                </div>
                                <input
                                    type={showOldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    id="oldPassword"
                                    value={values.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`text-[#6e6e6e] caret-yellow-500 placeholder:text-gray-400 block w-full pl-10 sm:text-sm border-1 border-gray-200 outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md ${touched.oldPassword && errors.oldPassword ? 'border-red-500' : 'border-gray-200'} `} />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => togglePasswordVisibility('oldPassword')}
                                >
                                    {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            {errors.oldPassword && touched.oldPassword ? (
                                <p className="text-red-600 animate-pulse mt-2">{errors.oldPassword}</p>
                            ) : null}
                        </div>



                        <div className="relative">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <RiLockPasswordFill />
                                </div>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    id="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`text-[#6e6e6e] caret-yellow-500 placeholder:text-gray-400 block w-full pl-10 sm:text-sm border-1 border-gray-200 outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md ${touched.newPassword && errors.newPassword ? 'border-red-500' : 'border-gray-200'} `} />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => togglePasswordVisibility('newPassword')}
                                >
                                    {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            {errors.newPassword && touched.newPassword ? (
                                <p className="text-red-600 animate-pulse mt-2">{errors.newPassword}</p>
                            ) : null}
                        </div>



                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUnlock />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`text-[#6e6e6e] caret-yellow-500 placeholder:text-gray-400 block w-full pl-10 sm:text-sm border-1 border-gray-200 outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} `} />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                >
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <p className="text-red-600 animate-pulse mt-2">{errors.confirmPassword}</p>
                            ) : null}
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#122222] hover:text-yellow-400 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
