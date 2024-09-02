import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogPosts } from "../../../features/blog/blog.thunk";


const BlogStats = () => {

  const dispatch = useDispatch();

  const { blogPosts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogPosts())

  }, []);

  // Extract user joining dates and count
  const blogPostCreatedDate = blogPosts?.map((blogPost) => blogPost.createdAt.split("T")[0]);
  const blogPostsCreatedDateCount = blogPostCreatedDate.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const barState = {
    labels: Object.keys(blogPostsCreatedDateCount),
    datasets: [
      {
        label: "Blog Posts Created Dates",
        backgroundColor: "#ff9900",
        hoverBackgroundColor: "rgb(197, 72, 49)",
        data: Object.values(blogPostsCreatedDateCount),
      },
    ],
  };


  return (
    <div className="flex w-[100%]">
      <SideBar className="" />
      <div className="bg-gray-100 min-h-screen p-5 w-full">

        <div className="">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Blog Posts Stats</h1>
          <div>
            <div className='flex justify-center bg-black '>
              <p className='bg-slate-950 text-[15px] font-md  text-yellow-400 w-full m-3 p-6 text-lg text-center rounded-md'>
                Total Blog Posts <br />
                {blogPosts?.length}
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

export default BlogStats;


