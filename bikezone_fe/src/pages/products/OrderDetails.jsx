import React from 'react';

const OrderDetails = () => {
    return (
        <div className="bg-gradient-to-b from-blue-200 to-blue-300 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold  mb-4 text-gray-900">Order Details</h1>

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Shipping Info:</h2>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Phone:</strong> 123-456-7890</p>
                <p><strong>Address:</strong> 123 Main St, City, Country</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Payment:</h2>
                <p><strong>Status:</strong>: Paid</p>
                <p><strong>Amount:</strong>: $150.00</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Order Status:</h2>
                <p><strong>Status:</strong>: Delivered</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">Order Items:</h2>
                <div className="mb-2">
                    <div className="flex items-center">
                        <img
                            src="item1.jpg"
                            alt="Product 1"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <p className="font-semibold">Product 1</p>
                            <p>Price: $50.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
