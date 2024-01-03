import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import { MdLaunch } from 'react-icons/md'
import { reset } from '../../features/workshop/workshop.slice';
import { getMyWorkshop } from '../../features/workshop/workshop.thunk';


const MyWorkshopAppointments = () => {
    const dispatch = useDispatch()

    const { isLoading, isError, message, workshop } = useSelector(
        (state) => state.workshop
    );
    const { user } = useSelector((state) => state.auth)


    const columns = [
        { field: "id", headerClassName: "bg-gray-900 text-yellow-400 text-lg", headerName: "Appointment ID", minWidth: 300, flex: 1 },

        {
            field: "username",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Username",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "email",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "User Email",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "slot",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Slot #",
            flex: 0.3,
            minWidth: 150
        },
        {
            field: "discount",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Discount",
            flex: 0.3,
            minWidth: 150,
            cellClassName: (params) => {
                const numericDiscount = parseFloat(params.row.discount);
                return numericDiscount > 0
                    ? "text-green-600"
                    : "text-red-600";
            },
        },

        {
            field: "date",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            flex: 0.3,
            headerName: "Timing",
            minWidth: 150,
            type: "appointnent Date",
            sortable: false,
            cellClassName: "text-blue-500"
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
                    <Link to={`/workshop/appointment/${params.row.id}`}>
                        <MdLaunch size={20} />
                    </Link>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];
    const rows = []
    workshop && workshop.appointments &&
        workshop.appointments.forEach((item, index) => {
            const discountValue = item.discountAmount > 0 ? `${item.discountAmount}%` : 'No Discount';

            rows.push({
                id: item._id,
                username: `${item.user.firstname} ${item.user.lastname}`,
                email: item.user.email,
                slot: item.slot,
                discount: discountValue,
                date: `${item.day} ${item.slot}:00 -${item.slot + 1}:00`,
            });
        });
    useEffect(() => {
        if (isError) {
            // toast.error(isError);
            dispatch(reset());
        }

        dispatch(getMyWorkshop());
    }, [dispatch, isError, user]);


    return (
        <div className='bg-[#d0d1d1] p-16 '>
            <h1 className='text-center text-3xl font-bold text-gray-900 my-4'>My Workshop Appointments</h1>

            {isLoading ? (<Loader />) : (
                <div className="">
                    <MetaData title={`${user?.firstname + " " + user?.lastname} - appointments`} />
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

                    <span className='text-gray-900 font-semibold'>{user?.firstname + " " + user?.lastname}'s Workshop appointments</span>
                </div>
            )}

        </div>
    )
}

export default MyWorkshopAppointments