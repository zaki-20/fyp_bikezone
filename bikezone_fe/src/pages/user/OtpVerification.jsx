import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../../components/MetaData";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../features/auth/auth.thunk";
import axios from "axios";
import { useEffect, useState } from "react";

const schema = yup.object({
    otp: yup.string().required('opt is required').matches(/^[0-9]{4}$/, 'OTP must be exactly 4 numeric digits'),
    email: yup.string().email('Invalid email').required('email is required'),
});


const OtpVerification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();


    const [countdown, setCountdown] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(false);

    const initialValues = {
        otp: '',
        email: '',
    };

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                await dispatch(verifyOtp(values))
                if (isSuccess && user) {
                    navigate('/account');
                }
                action.resetForm();
            },
        });

    const handleResendOTP = async () => {
        try {
            setResendDisabled(true); // Disable the button
            await axios.post('http://localhost:4000/api/v1/resend-otp', { email: values.email });
            // Show a success message or handle as needed
            console.log('OTP Resent successfully');
            startCountdown();
        } catch (error) {
            // Handle the error (e.g., show an error message)
            console.error('Error resending OTP:', error.message);
            setResendDisabled(false); // Re-enable the button in case of an error

        }
    };

    const startCountdown = () => {
        setCountdown(60);
        setResendDisabled(true); // Disable the button when countdown starts

        const interval = setInterval(() => {
            setCountdown((prevCount) => Math.max(0, prevCount - 1));
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setResendDisabled(false); // Re-enable the button after the countdown
        }, 60000);
    };

    useEffect(() => {
        // Check if the state or parameter is present from the registration page
        const fromRegister = location.state && location.state.fromRegister;

        if (fromRegister) {
            // Start the countdown if navigating from the registration page
            startCountdown();
        }
    }, [location]);

    return (
        <>
            <MetaData title={"OTP-VERIFICATION"} />

            <div className="min-h-screen bg-[#d0d1d1] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        OTP Verification
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-[#b6b6b6]  py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        name='email'
                                        type="email"
                                        id='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  rounded-md bg-gray-100"
                                    />
                                    {errors.email && touched.email ? (
                                        <p className="text-red-600 animate-pulse">{errors.email}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    OTP Verification
                                </label>
                                <div className="flex -mx-1 ">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="w-1/4 px-1">
                                            <input
                                                type="text"
                                                id={`otp-${index + 1}`}
                                                name={`otp-${index + 1}`}
                                                value={values.otp[index] || ''}
                                                onChange={(e) => {
                                                    const updatedOtp = [...values.otp];
                                                    updatedOtp[index] = e.target.value;
                                                    handleChange({
                                                        target: {
                                                            name: 'otp',
                                                            value: updatedOtp.join(''),
                                                        },
                                                    });
                                                }}
                                                maxLength={1}
                                                className="w-full text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm rounded-md bg-gray-100"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.otp && touched.otp ? (
                                    <p className="text-red-600 animate-pulse">{errors.otp}</p>
                                ) : null}

                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex hover:text-yellow-400 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#122222]"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={resendDisabled}
                                className={`group relative w-full flex hover:text-yellow-400 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#122222] ${resendDisabled ? 'cursor-not-allowed ' : ''}`}
                            >
                                {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default OtpVerification;
