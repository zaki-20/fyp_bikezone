import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import MetaData from '../../components/MetaData';
import { toast } from 'react-toastify';
import { reset } from '../../features/order/order.slice';
import { myOrders } from '../../features/order/order.thunk';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import { MdLaunch } from 'react-icons/md'

  
const MyOrders = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message, orders } = useSelector((state) => state.order)


    const columns = [
        { field: "id", headerClassName: "bg-gray-900 text-yellow-400 text-lg", headerName: "Order ID", minWidth: 300, flex: 1 },

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
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
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
                    <Link to={`/order/${params.row.id}`}>
                        <MdLaunch size={20} />
                    </Link>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];
    
    const rows = []
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,

            });
        });


    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch(reset());
        }

        dispatch(myOrders());
    }, [dispatch, isError, user]);

    return (
        <div className='bg-[#d0d1d1] p-16'>

            {isLoading ? (<Loader />) : (
                <div className="myOrdersPage h-screen">
                    <MetaData title={`${user?.firstname + " " + user?.lastname} - Orders`} />
                    <DataGrid
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'blue',
                            },
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className=" bg-gray-200"
                        autoHeight
                    />

                    <span className='text-gray-900 font-semibold'>{user?.firstname + " " + user?.lastname}'s Orders</span>
                </div>
            )}
        </div>
    )
}

export default MyOrders