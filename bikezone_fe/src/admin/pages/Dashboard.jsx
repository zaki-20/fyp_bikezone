import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { getAdminProducts } from "../../features/product/product.thunk";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/order/order.thunk";
import { getAllUsers } from "../../features/auth/auth.thunk";
import { getAllWorkshops } from "../../features/workshop/workshop.thunk";
import { getAllRentBikesAdmin } from "../../features/rentbike/rentbike.thunk";
import { getAllUsedBikes } from "../../features/usedbike/usedbike.thunk";
import { getAllBlogPosts } from "../../features/blog/blog.thunk";

import { IoHome } from "react-icons/io5";
import { MdDashboard, MdStorage, MdOutlineRateReview } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineStock } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { PiMotorcycleFill } from "react-icons/pi";
import { BsPostcardHeart } from "react-icons/bs";


const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order)
  const { users } = useSelector((state) => state.auth);
  const { workshops } = useSelector((state) => state.workshop);
  const { rentBikes } = useSelector((state) => state.rentBike);
  const { usedBikes } = useSelector((state) => state.usedBike);
  const { blogPosts } = useSelector((state) => state.blog);

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
    dispatch(getAllWorkshops())
    dispatch(getAllRentBikesAdmin())
    dispatch(getAllUsedBikes())
    dispatch(getAllBlogPosts())
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
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3 flex flex-col justify-center items-center hover:scale-105 duration-500">
              <MdStorage className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Products</span>
                <span>{products && products.length}</span>
              </div>
            </div>
          </Link>

          <Link to={'/admin/orders'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <HiOutlineClipboardDocumentList className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Orders</span>
                <span>{orders && orders.length}</span>
              </div>
            </div>
          </Link>

          <Link to={'/admin/users'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold  rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <FaUsers className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Users</span>
                <span>{users && users.length}</span>
              </div>
            </div>
          </Link>


          <Link to={'/admin/workshops'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <GiAutoRepair className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Workshops</span>
                <span>{workshops && workshops.length}</span>
              </div>
            </div>
          </Link>

          <Link to={'/admin/rental-bikes'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <PiMotorcycleFill className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Rental Bike</span>
                <span>{rentBikes && rentBikes.length}</span>
              </div>
            </div>
          </Link>

          <Link to={'/admin/usedbikes'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <PiMotorcycleFill className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Used Bike</span>
                <span>{usedBikes && usedBikes.length}</span>
              </div>
            </div>
          </Link>

          <Link to={'/admin/blogs'}>
            <div className="bg-gray-900 text-yellow-400 hover:text-[#02ed6c] hover:shadow-[0_10px_60px_rgba(2,237,_108,_0.7)] text-2xl font-semibold rounded-xl w-44 h-44 gap-y-3  flex flex-col justify-center items-center hover:scale-105 duration-500">
              <BsPostcardHeart className="h-8 w-8 " />
              <div className="flex flex-col justify-center items-center">
                <span>Blog Posts</span>
                <span>{blogPosts && blogPosts.length}</span>
              </div>
            </div>
          </Link>

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


