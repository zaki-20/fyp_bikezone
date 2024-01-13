
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify';
import MetaData from '../../components/MetaData';
import CheckoutSteps from '../../components/CheckoutSteps';

import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from 'axios';
import { reset } from '../../features/order/order.slice';
import { createOrder } from '../../features/order/order.thunk';
import Lottie from 'lottie-react'
import paymentCardAnimation from '../../assets/animated/payment.json'
import { resetCart } from '../../features/product/product.slice';


const Payment = () => {
    const payBtn = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const { user } = useSelector((state) => state.auth)
    const { cartItems, shippingInfo } = useSelector((state) => state.product)
    const { isLoading, isError, message } = useSelector((state) => state.order)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };


    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/payment/process",
                paymentData,
                { withCredentials: true }
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    dispatch(resetCart())
                    navigate('/success')
                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    useEffect(() => {
        if (isError) {
            // toast.error(message)
            dispatch(reset())
        }
    }, [isError])


    return (
        <>
            <MetaData title={"payment"} />
            <CheckoutSteps activeStep={2} color={"bg-[#d0d1d1]"} />

            <div className="min-w-screen bg-[#d0d1d1]  flex items-center justify-center px-5 py-12">
                <div className=" text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: 1000 }}>
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-200 px-6 py-10 ">
                            <Lottie
                                className=""
                                animationData={paymentCardAnimation}
                            />
                        </div>
                        <div className="w-full md:w-1/2 py-10 bg-[#e4e4e4]  px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">Payment Details</h1>
                                <p>Enter your card details for payment</p>
                            </div>
                            {/* ======================================================= */}
                            <form onSubmit={submitHandler}>

                                <div className="flex -mx-3 ">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Card Number</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <CardNumberElement className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none " />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3 ">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">Card Expiry</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <CardExpiryElement className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none " />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3 ">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="true" className="text-xs font-semibold px-1">CVC</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <CardCvcElement className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none " />
                                        </div>
                                    </div>
                                </div>


                                <div className="flex justify-center mt-2">
                                    <input
                                        ref={payBtn}
                                        type='submit'
                                        value={`PAY - Rs. ${orderInfo && orderInfo.totalPrice} PKR`}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-900 font-semibold text-white hover:text-yellow-400 border-2 border-black outline-none " />
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Payment