import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo, isLoading } = useSelector(state => state.product)


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )
    const shippingCharges = subtotal > 2000 ? 0 : 400;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + shippingCharges + tax;
    const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}`


    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/process/payment')
    }

    return (
        <div>
            <CheckoutSteps activeStep={1} />

            <div className=" sm:px-10 lg:px-20 md:flex flex-none justify-between gap-8 xl:px-32">
                <div className="px-4 py-8 md:w-2/3 w-full">
                    <div className=''>
                        <p className="text-xl font-medium">Shipping Detail</p>
                        <p className="text-gray-400">Check your Shipping Details. Avoid fake details.</p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {/* Name */}
                            <div className="flex justify-between mx-4">
                                <span className="text-gray-700 text-sm font-bold">Name:</span>
                                <span className="text-gray-600">{`${user?.firstname} ${user?.lastname}`}</span>
                            </div>

                                <div className="flex justify-between mx-4 ">
                                    <span className="text-gray-700 text-sm font-bold">Phone:</span>
                                    <span className="text-gray-600">{shippingInfo?.phoneNo}</span>
                                </div>

                                <div className="flex justify-between mx-4">
                                    <span className="text-gray-700 text-sm font-bold">Address:</span>
                                    <span className="text-gray-600">{address}</span>
                                </div>
                           

                        </div>
                    </div>

                    <div className='mt-10'>
                        <p className="text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400">Check your order summary.</p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {
                                cartItems.map((item, index) => (
                                    <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt='true' />
                                        <div className="flex w-full justify-between items-center px-4 py-4">
                                            <div>
                                                <div className="font-semibold">{item.name}</div>
                                                <div className="font-semibold">RS. {item.price} PKR</div>
                                                <div className=" text-gray-400">{item.quantity} items</div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold">Rs. {item.price * item.quantity} PKR</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

                <div className='h-[80%] px-4 md:w-1/3 w-full mt-2 py-8'>

                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400 mb-6">Complete your order by continue to payment.</p>

                    <div className=" bg-gray-50 border p-6 rounded">

                        <div >

                            {/* Total */}
                            <div className="border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Subtotal:</p>
                                    <p className="font-semibold text-gray-900">Rs. {subtotal} PKR</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Shipping:</p>
                                    <p className="font-semibold text-gray-900">Rs. {shippingCharges} PKR</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">GST:</p>
                                    <p className="font-semibold text-gray-900">Rs. {tax} PKR</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">Rs. {totalPrice} PKR</p>
                            </div>
                        </div>
                        <button onClick={proceedToPayment} className="mt-4  w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Proceed To payment</button>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default ConfirmOrder