import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteOrder, getAllOrders } from '../../../features/order/order.thunk';
import { reset } from '../../../features/order/order.slice';

const OrderList = () => {

    const dispatch = useDispatch()

    const { isLoading, isError, message, orders } = useSelector((state) => state.order)


    const deleteOrderHandler = async (id) => {
        await dispatch(deleteOrder(id))
        dispatch(getAllOrders());
    }

    const columns = [
        { field: "id", headerClassName: "bg-gray-900 text-yellow-400 text-lg", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Items Name",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "status",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "text-green-600"
                    : "text-red-600";
            },
        },
        {
            field: "itemsQty",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Items Qty",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Amount",
            minWidth: 170,
            flex: 0.5,
        },
        {
            field: "date",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Created On",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "actions",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>
                        <button onClick={() => deleteOrderHandler(params.row.id)}>
                            <MdDelete className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            const datePart = item.createdAt.split('T')[0]; // Extracts the date part

            rows.push({
                itemsQty: item?.orderItems.length,
                id: item?._id,
                name: item?.orderItems.map((orderItem) => orderItem.name),
                status: item?.orderStatus,
                amount: item?.totalPrice,
                date: datePart

            });
        });

    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    useEffect(() => {
        if (isError) {
            // toast.error(isError);
            dispatch(reset());
        }

    }, [isError]);


    return (
        <div className='flex w-[100%] '>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 overflow-x-hidden">
                <h1 className='text-2xl py-3' >All Orders</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className=""
                    autoHeight
                />
            </div>
            }
        </div>
    )
}

export default OrderList