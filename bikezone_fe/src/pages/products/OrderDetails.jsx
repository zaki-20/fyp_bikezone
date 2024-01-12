import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { reset } from '../../features/order/order.slice';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../features/order/order.thunk';
import Loader from '../shared/Loader';
import pro from '../../assets/reset.png'

const OrderDetails = () => {

    // const {  shippingInfo } = useSelector((state) => state.product)
    const { isLoading, isError, message, orderDetails } = useSelector((state) => state.order)

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        dispatch(getOrderDetails(id))
    }, [isError, id, message, dispatch])
    console.log("huhuhuffufuuuff", orderDetails)
    return (
        <>
            {
                isLoading ? (<Loader />) : (
                    <div className="bg-gradient-to-b from-blue-2+00 to-blue-300 p-8 rounded-lg shadow-lg">

                        <h1 className="text-3xl font-bold text-center  mb-4 text-gray-900">Order Details </h1>
                        <h1 className="text-2xl font-bold  mb-4 text-gray-900">Order #: {orderDetails && orderDetails._id} </h1>
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Shipping Info:</h2>
                            <p><strong>Name:</strong> {orderDetails?.user && orderDetails.user.firstname + " " + orderDetails.user.lastname}</p>
                            <p><strong>Phone:</strong> {orderDetails?.shippingInfo && orderDetails.shippingInfo.phoneNo}</p>

                            <p><strong>Address:</strong> {orderDetails?.shippingInfo &&
                                `${orderDetails.shippingInfo?.address}, ${orderDetails.shippingInfo?.city}, ${orderDetails.shippingInfo?.state}, ${orderDetails.shippingInfo?.pinCode}`}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Payment:</h2>
                            <p><strong>Status:</strong>
                                <span className={orderDetails?.paymentInfo &&
                                    orderDetails.paymentInfo.status === 'succeeded' ? "text-green-700 text-sm font-semibold" : "text-red-700 text-sm font-semibold"}>
                                    {orderDetails?.paymentInfo &&
                                        orderDetails.paymentInfo.status === 'succeeded' ? " PAID" : " NOT PAID"}
                                </span>
                            </p>
                            <p><strong>Amount:</strong> Rs. <strong>{orderDetails?.totalPrice && orderDetails.totalPrice}</strong> PKR</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Order Status:</h2>
                            <p className={orderDetails?.orderStatus && orderDetails.orderStatus === 'Delivered' ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}><strong className='text-black'>Status:</strong> {orderDetails?.orderStatus && orderDetails.orderStatus}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Order Items:</h2>
                            {orderDetails?.orderItems && orderDetails.orderItems.map((item => (
                                <div className="mb-2">
                                    <div className="flex items-center">
                                        <img
                                            src={item?.images[0]}
                                            alt="Product 1"
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <p><strong>Name: </strong>{item.name}</p>
                                            <p><strong>Price: </strong> Rs. {item.price} PKR</p>
                                            <p><strong>Quantity: </strong> Rs. {item.quantity} PKR</p>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default OrderDetails;
