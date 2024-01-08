import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../../components/SideBar";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/auth/auth.thunk";


const UserStats = () => {

    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!users.length) {
            dispatch(getAllUsers());
        }
    }, [dispatch, users]);

    // Extract user joining dates and count
    const userJoiningDates = users?.map((user) => user.createdAt.split("T")[0]);
    const userJoiningDateCount = userJoiningDates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const barState = {
        labels: Object.keys(userJoiningDateCount),
        datasets: [
            {
                label: "User Joining Dates",
                backgroundColor: "#ff9900",
                hoverBackgroundColor: "rgb(197, 72, 49)",
                data: Object.values(userJoiningDateCount),
            },
        ],
    };

 

    return (
        <div className="flex w-[100%]">
            <SideBar className="" />
            <div className="bg-gray-100 min-h-screen p-5 w-full">

                <div className="">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">User Stats</h1>
                    <div>
                        <div className='flex justify-center bg-black '>
                            <p className='bg-slate-950 text-[15px] font-md  text-yellow-400 w-full m-3 p-6 text-lg text-center rounded-md'>
                                Total Users <br />
                                {Object.keys(userJoiningDateCount).length}
                            </p>
                        </div>
                    </div>
                </div>


                <div className=" w-[80%] mx-auto py-10">
                    <Chart type="bar" data={barState} />
                </div>

            

            </div>
        </div >
    );
};

export default UserStats;


