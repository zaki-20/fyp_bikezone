import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteMyWorkshop, getAllWorkshops } from '../../../features/workshop/workshop.thunk';

const WorkshopList = () => {
    const dispatch = useDispatch()

    const { isLoading, isError, message, workshops } = useSelector((state) => state.workshop)

    useEffect(() => {
        if (!workshops.length) {
            dispatch(getAllWorkshops());
        }
    }, [dispatch, workshops]);


    const deleteWorkshopHandler = async (id) => {
        await dispatch(deleteMyWorkshop(id))
        dispatch(getAllWorkshops())
    }

    const columns = [
        { field: "id", headerName: "Workshop ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 300, flex: 0.8 },

        {
            field: "owner_email",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Owner Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "owner_name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Owner Name",
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
                        <Link to={`/admin/workshops/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>
                        <button >
                            <MdDelete onClick={() => deleteWorkshopHandler(params.row.id)} className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];


    const rows = workshops?.map((workshop) => ({
        id: workshop._id,
        owner_email: workshop.email,
        owner_name: workshop.name,
        workshop_name: workshop.name,
        city: workshop.city,
        contact: workshop.contact

    })) || [];

    return (
        <div className='flex'>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 overflow-x-hidden">
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

export default WorkshopList