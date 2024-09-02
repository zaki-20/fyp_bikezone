import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteUser, getAllUsers, updateUserRole } from '../../../features/auth/auth.thunk';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import Select from 'react-select'


const UserList = () => {
    const dispatch = useDispatch()
    const [openUser, setOpenUser] = useState(false);

    const [selectedRole, setSelectedRole] = useState();
    const [selectedUserId, setSelectedUserId] = useState(null);


    const handleOpenUser = () => {
        setOpenUser(!openUser)
    };

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
                        <FaRegEdit
                            onClick={() => {
                                setSelectedUserId(params.row.id);
                                setSelectedRole(params.row.role);
                                handleOpenUser(); // Open the dialog
                            }}
                            size={20} />

                        <button >
                            <MdDelete onClick={() => deleteUserHandler(params.row.id)} className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];
    const rows = [];


    users &&
        users.forEach((user) => {
            const datePart = user.createdAt.split('T')[0]; // Extracts the date part
            rows.push({
                id: user._id,
                email: user.email,
                name: `${user.firstname} ${user.lastname}`,
                role: user.role,
                date: datePart
            });
        });


    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption.value);
    };

    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
    ]

    const handleUpdateUser = async (userId) => {
        await dispatch(updateUserRole({ selectedRole, userId }));
        await dispatch(getAllUsers())

        handleOpenUser();
    };


    return (
        <div className='flex  '>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 overflow-x-hidden">
                <h1 className='text-2xl py-3' >All Users</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className=""
                    autoHeight
                />
            </div>}

            <Dialog open={openUser} handler={handleOpenUser} className=''>
                <DialogHeader className='flex justify-start'>
                    {/* <Lottie
                        className="w-28 h-28 "
                        animationData={redAlertAnimation}
                    /> */}
                    <span>Update User Role</span>
                </DialogHeader>
                <DialogBody className=' animate-pulse font-bold tracking-wide '>
                    <div className="mb-4">
                        <label htmlFor="role" className="text-sm font-semibold text-gray-600">
                            Select Role:
                        </label>
                        <Select
                            className="border-0 w-full border-b border-black rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                            options={options}
                            onChange={handleRoleChange}
                            value={options.find(option => option.value === selectedRole)} // Set the selected value
                            name="role"
                        />

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        onClick={handleOpenUser}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={() => handleUpdateUser(selectedUserId)}>
                        <span>update</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </div>
    )
}

export default UserList