import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate()

  const continueShopHandler = () => {
    navigate('/orders')
  }
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl text-green-500">
          <FaCheckCircle />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful</h1>
        <p className="text-lg text-gray-600 mb-8">Thank you for your payment. Your order is confirmed.</p>
        <button onClick={continueShopHandler} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
