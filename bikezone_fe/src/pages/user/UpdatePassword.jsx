import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../features/auth/auth.thunk';
import { reset } from '../../features/auth/auth.slice';

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
            navigate('/profile')
        }

    }, [isError, isUpdate])


    return (
        <div className="min-h-screen bg-[#def5f596] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Password</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                                Old Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="oldPassword"
                                    id="oldPassword"
                                    value={values.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.oldPassword && touched.oldPassword ? (
                                    <p className="text-red-600 animate-pulse">{errors.oldPassword}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <p className="text-red-600 animate-pulse">{errors.newPassword}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className="text-red-600 animate-pulse">{errors.confirmPassword}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#122222]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
