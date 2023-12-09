import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteUser, getAllUsers } from '../../../features/auth/auth.thunk';

const UserList = () => {
    const dispatch = useDispatch()

    const { isLoading, users } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!users.length) {
            dispatch(getAllUsers());
        }
    }, [dispatch, users]);


    const deleteUserHandler = async (id) => {
        await dispatch(deleteUser(id))
        dispatch(getAllUsers())
    }

    const columns = [
        { field: "id", headerName: "User ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 300, flex: 0.8 },

        {
            field: "email",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Name",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "role",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === "admin"
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
                        <Link to={`/admin/user/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>
                        <button >
                            <MdDelete onClick={() => deleteUserHandler(params.row.id)} className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];


    const rows = users?.map((user) => ({
        id: user._id,
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        role: user.role,
    })) || [];

    return (
        <div className='flex w-[100%] '>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className=""
                    autoHeight
                />
            </div>}
        </div>
    )
}

export default UserList