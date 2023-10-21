import React from 'react';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex bg-[#d0d1d1] flex-col items-center justify-center h-screen">
      <MdRemoveShoppingCart className="text-5xl text-gray-500" />
      <h2 className="text-2xl mt-4">Your Cart is Empty</h2>
      <p className="text-gray-600 mt-2">Add some items to your cart before checking out.</p>
      <Link to={'/'}>
        <button className="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-4">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
