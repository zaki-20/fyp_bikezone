import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartByQuantity, removeFromCart, removeFromCartByQuantity, resetCart } from '../../features/product/product.slice'
import { toast } from 'react-toastify'
import EmptyCart from '../../components/cards/EmptyCart'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.product)


    const increaseQuantity = (item) => {

        if (item.Stock <= item.quantity) {
            toast.error("not enough items")
        } else {
            const newQty = item.quantity + 1;
            const update = { ...item, quantity: newQty }
            const newItem = {
                product: update,
                quantity: newQty
            }
            dispatch(addToCartByQuantity(newItem));
        }
    };
    const decreaseQuantity = (item) => {

        if (item.quantity <= 1) {
            toast.error("cart must contain atleast one item!")
        } else {
            const newQty = item.quantity - 1;
            const update = { ...item, quantity: newQty }
            const newItem = {
                product: update,
                quantity: newQty
            }
            dispatch(removeFromCartByQuantity(newItem));
        }
    };

    const removeCartItem = (id) => {
        dispatch(removeFromCart(id))
        toast.success("Item removed from cart");
    }

    const clearCart = () => {
        dispatch(resetCart())
        toast.error("Your cart is empty")
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

    const calculateShipping = () => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        return subtotal > 5000 ? 0 : 499;
      };

    return (
        <div className='bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600'>
            {cartItems.length !== 0 ? (<div className=" pt-20">

                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center pb-5 px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3 overflow-y-scroll max-h-[600px]">

                        {cartItems.map((item) => (
                            <div key={item._id} className="justify-between mb-6 rounded-lg bg-[#e7e7e7ea] shadow-[inset_3px_0px_41px_22px_#00000024] shadow-gray-400  p-6 sm:flex sm:justify-start">
                                <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-pic" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">

                                        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                        <p className="mt-1 text-xs text-gray-700">{item.price} Rs/-</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span onClick={() => decreaseQuantity(item)} className="cursor-pointer rounded-l bg-gray-200 py-1 px-3.5 duration-100 hover:bg-[#122222] hover:text-yellow-400"> - </span>
                                            <input className="h-8 w-12 border bg-gray-100 text-center text-xs outline-none appearance-none" value={item.quantity} readOnly />
                                            <span onClick={() => increaseQuantity(item)} className="cursor-pointer rounded-r bg-gray-200 py-1 px-3 duration-100 hover:bg-[#122222] hover:text-yellow-400"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{item.price * item.quantity} Rs/-</p>
                                            <MdDelete onClick={() => removeCartItem(item._id)} size={30} className='text-red-600 hover:scale-110 duration-200' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                    {/* Subtotal */}
                    <div className="mt-6 h-full rounded-lg border bg-[#e7e7e7ea] hover:shadow-[inset_3px_0px_41px_22px_#00000024] shadow-gray-400 p-6  md:mt-0 md:w-1/3 duration-300">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">{cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price, 0
                            )} Rs/-</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">{calculateShipping()}  Rs/-</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Gross Total</p>
                            <div className>
                                <p className="mb-1 text-lg font-bold">{cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                ) + 499} Rs/-
                                </p>
                                {/* <p className="text-sm text-gray-700">including VAT</p> */}
                            </div>
                        </div>
                        <button onClick={checkoutHandler} className="mt-6 w-full hover:text-yellow-400 py-2 bg-gray-900 text-white rounded font-medium  ">Check out</button>
                    </div>
                </div>
                <button onClick={clearCart} className='px-4 hover:text-yellow-400 py-2 bg-gray-900 text-white text-sm rounded m-4'>
                    clear cart
                </button>
            </div>) : <EmptyCart />}


        </div>
    )
}

export default Cart