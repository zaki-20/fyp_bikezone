import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteUsedBikeAd, getAllUsedBikes } from '../../../features/usedbike/usedbike.thunk';

const UsedBikesList = () => {
    const dispatch = useDispatch()

    const { isLoading, isError, message, usedBikes } = useSelector((state) => state.usedBike)

    useEffect(() => {
        if (!usedBikes.length) {
            dispatch(getAllUsedBikes());
        }
    }, [dispatch, usedBikes]);


    const deleteRentBikeHandler = async (id) => {
        await dispatch(deleteUsedBikeAd(id))
        dispatch(getAllUsedBikes())
    }

    const columns = [
        { field: "id", headerName: "Bike ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 300, flex: 0.8 },

        {
            field: "owner_email",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Owner Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "bike_title",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Bike Name",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "city",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "City",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "contact",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Contact",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "available",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Available",
            minWidth: 200,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.available === "Available"
                    ? "text-green-600"
                    : "text-red-600";
            },
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
                        <Link to={`/admin/usedbikes/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>

                        <button >
                            <MdDelete onClick={() => deleteRentBikeHandler(params.row.id)} className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];


    const rows = usedBikes?.map((usedBike) => {

        return {
            id: usedBike._id,
            owner_email: usedBike.email,
            bike_title: usedBike.title,
            available: usedBike.isAvailable ? "Available" : "Unavailable",
            city: usedBike.city,
            contact: usedBike.contact,
        };
    }) || [];

    return (
        <div className='flex'>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 overflow-x-hidden">
            <h1 className='text-2xl font-medium  py-3' >All Used Bikes</h1>

                <DataGrid
                    className=" w-[100%]"
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>}
        </div>
    )
}

export default UsedBikesList