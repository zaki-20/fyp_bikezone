import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { getAdminProducts } from "../../features/product/product.thunk";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/order/order.thunk";
import { getAllUsers } from "../../features/auth/auth.thunk";



const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order)
  const { users } = useSelector((state) => state.auth);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users]);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders())
  }, []);


  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#ff9900"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#e50000", "#03a700"],
        hoverBackgroundColor: ["#b30000", "#037b00"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="flex w-[100%]">
      <SideBar className="" />
      <div className="bg-gray-100 min-h-screen p-5 w-full">

        <div className="">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Dashboard</h1>
          <div>
            <div className='flex justify-center bg-black '>
              <p className='bg-slate-950 text-[15px] font-md  text-yellow-400 w-full m-3 p-6 text-lg text-center rounded-md'>
                Total Amount <br />
                {totalAmount} Rs
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-around w-full flex-wrap gap-20 px-20 py-16">

          <Link to={'/admin/products'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-full w-52 h-52 flex flex-col justify-center items-center hover:scale-105 duration-500">
              <span>Products</span>
              <span>{products && products.length}</span>
            </div>
          </Link>

          <Link to={'/admin/orders'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-full w-52 h-52 flex flex-col justify-center items-center hover:scale-105 duration-500">
              <span>Orders</span>
              <span>{orders && orders.length}</span>
            </div>
          </Link>

          <Link to={'/admin/users'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-full w-52 h-52 flex flex-col justify-center items-center hover:scale-105 duration-500">
              <span>Users</span>
              <span>{users && users.length}</span>
            </div>
          </Link>


          <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-full w-52 h-52 flex flex-col justify-center items-center hover:scale-105 duration-500">
            <span>Workshops</span>
            <span>10</span>
          </div>

        </div>

        <div className=" w-[80&] mx-auto">
          <Chart type='line' data={lineState} />
        </div>
        <div className=" w-[40%] mx-auto">
          <Chart type='doughnut' data={doughnutState} />
        </div>

      </div>
    </div >
  );
};

export default Dashboard;


