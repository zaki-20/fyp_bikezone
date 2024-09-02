import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Lottie from 'lottie-react'
import shippingOrderAnimation from '../../../assets/animated/orderShipping.json'
import { getOrderDetails, updateOrder } from '../../../features/order/order.thunk'
import SideBar from '../../components/SideBar'
import { reset } from '../../../features/order/order.slice'
import { MdVerified } from "react-icons/md";
import Select from 'react-select';



const ProcessOrder = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { orderDetails, isLoading, isError } = useSelector(state => state.order)


    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [])

    useEffect(() => {
        if (isError) {
            dispatch(reset())
        }

    }, [isError])

    const [status, setStatus] = useState()

    const updateOrderSubmitHandler = async (e) => {
        e.preventDefault()
        const orderUpdateData = {
            status: status.value,
            id
        };


        await dispatch(updateOrder(orderUpdateData))
        await dispatch(getOrderDetails(id))
    }

    // Generate options dynamically based on order status
    const getOptions = () => {
        if (orderDetails?.orderStatus === 'Processing') {
            return [
                { value: 'Shipped', label: 'Shipped' },
                // Add more options if needed
            ];
        } else if (orderDetails?.orderStatus === 'Shipped') {
            return [
                { value: 'Delivered', label: 'Delivered' },
                // Add more options if needed
            ];
        } else {
            return []; // No options for other statuses
        }
    };


    return (
        <div className='flex w-[100%] '>
            <SideBar />
            <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 w-full'>
                <div className=" sm:px-10 lg:px-20 md:flex flex-none justify-between gap-8 xl:px-32">
                    <div className="px-4 py-8 md:w-2/3 w-full">
                        <div className='border-b py-6 border-black '>
                            <p className="text-xl font-medium">Shipping Detail</p>
                            <p className="text-gray-700">Check your Shipping Details. Avoid fake details.</p>
                            <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] hover:shadow-gray-400 duration-300 px-2 py-2 sm:px-6">
                                <div className='rounded-lg shadow-md p-4 mb-4'>
                                    <h2 className="text-xl font-semibold mb-2">Shipping Info:</h2>
                                    <div className="flex justify-between mx-2">
                                        <span className="text-gray-700 text-sm font-bold ">Name:</span>
                                        <span className="text-gray-600">{orderDetails?.user && orderDetails.user.firstname + " " + orderDetails.user.lastname}</span>
                                    </div>


                                    <div className="flex justify-between mx-2 ">
                                        <span className="text-gray-700 text-sm font-bold ">Phone:</span>
                                        <span className="text-gray-600">{orderDetails?.shippingInfo && orderDetails.shippingInfo.phoneNo}</span>
                                    </div>

                                    <div className="flex justify-between mx-2">
                                        <span className="text-gray-700 text-sm font-bold ">Address:</span>
                                        <span className="text-gray-600">{orderDetails?.shippingInfo &&
                                            `${orderDetails.shippingInfo?.address}, ${orderDetails.shippingInfo?.city}, ${orderDetails.shippingInfo?.state}, ${orderDetails.shippingInfo?.pinCode}`}</span>
                                    </div>
                                </div>

                                <div className=" rounded-lg shadow-md p-4 mb-4">
                                    <h2 className="text-xl font-semibold mb-2">Payment:</h2>
                                    <p className='text-gray-700 text-sm font-bold mx-2'>
                                        <div className='flex  items-center'>Status:
                                            <span className={orderDetails?.paymentInfo &&
                                                orderDetails.paymentInfo.status === 'succeeded' ? "text-green-700 text-sm font-semibold mx-2" : "text-red-700 text-sm font-semibold mx-2"}>
                                                {orderDetails?.paymentInfo &&
                                                    orderDetails.paymentInfo.status === 'succeeded' ? " PAID" : " NOT PAID"}
                                            </span>
                                            <span>
                                                {
                                                    orderDetails?.paymentInfo &&
                                                        orderDetails.paymentInfo.status === 'succeeded' ? <MdVerified /> : ""
                                                }
                                            </span>
                                        </div>
                                    </p>
                                    <p className='text-gray-700 text-sm font-bold mx-2'>Amount: <span className='text-black mx-2'>Rs. {orderDetails?.totalPrice && orderDetails.totalPrice} PKR</span> </p>
                                </div>

                                <div className=" rounded-lg shadow-md p-4 mb-4">
                                    <h2 className="text-xl font-semibold mb-2">Order Status:</h2>
                                    <p className={orderDetails?.orderStatus && orderDetails.orderStatus === 'Delivered' ? 'text-green-700 font-semibold text-sm' : 'text-sm text-red-600 font-semibold '}><span className='text-gray-700 text-sm font-bold mx-2'>Status:</span> {orderDetails?.orderStatus && orderDetails.orderStatus}</p>
                                </div>


                            </div>
                        </div>

                        <div className='mt-6'>
                            <p className="text-xl font-medium">Order Summary</p>
                            <p className="text-gray-700">Check your order summary.</p>
                            <div className="mt-4 space-y-3 rounded-lg border border-gray-600 bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] duration-300 hover:shadow-gray-400 px-2 py-2 sm:px-6">
                                {
                                    orderDetails?.orderItems && orderDetails?.orderItems.map((item, index) => (
                                        <div key={index} className="flex flex-col rounded-lg  sm:flex-row">
                                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt='true' />
                                            <div className="flex w-full justify-between items-center px-4 py-4">
                                                <div>
                                                    <div className="font-semibold">{item?.name}</div>
                                                    <div className="font-semibold">{item?.price} PKR</div>
                                                    <div className=" text-gray-500">{item?.quantity} items</div>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">{item?.price * item?.quantity} PKR</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    {
                        orderDetails?.orderStatus === 'Delivered' ? ("") : (
                            <div className='h-[80%] px-4 md:w-1/3 w-full mt-2 py-8'>
                                <p className="text-xl font-medium">Payment Details</p>
                                <p className="text-gray-500 mb-6">Complete your order by continue to payment.</p>
                                <div className=" bg-[#d8d7d7ea] hover:shadow-[inset_3px_0px_41px_5px_#00000024] duration-300 hover:shadow-gray-400 border border-gray-600 px-2 py-4 rounded">
                                    <form onSubmit={updateOrderSubmitHandler}>
                                        <div className="w-full">

                                            <Select
                                                defaultValue={status}
                                                onChange={setStatus}
                                                options={getOptions()} // Render options based on order status
                                            />

                                        </div>
                                        <button type='submit' disabled={isLoading ? true : false || status === '' ? true : false} className="mt-4  w-full rounded-md bg-gray-900 px-6 py-[8px] text-sm text-white hover:text-yellow-400 duration-200">Process</button>
                                    </form>
                                </div>
                                <>
                                    <Lottie
                                        className="mt-5"
                                        animationData={shippingOrderAnimation}
                                    />
                                </>
                            </div>
                        )

                    }
                </div>
            </div >
        </div >
    )
}

export default ProcessOrder