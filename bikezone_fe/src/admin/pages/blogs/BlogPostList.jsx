import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteMyWorkshop, getAllWorkshops } from '../../../features/workshop/workshop.thunk';
import { deleteBlog, getAllBlogPosts } from '../../../features/blog/blog.thunk';

const BlogPostList = () => {
    const dispatch = useDispatch()

    const { isLoading, isError, message, blogPosts } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        dispatch(getAllBlogPosts());

    }, []);


    const deleteBlogHandler = async (id) => {
        await dispatch(deleteBlog(id))
        dispatch(getAllBlogPosts())
    }

    const columns = [
        { field: "id", headerName: "Blog ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 300, flex: 0.8 },

        {
            field: "email",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Author Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Auther Name",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "title",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Post Title",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "category",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Category",
            minWidth: 200,
            flex: 0.7,
        },
        {
            field: "date",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Created On",
            minWidth: 130,
            flex: 0.4,
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
                        <Link to={`/admin/blogs/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>
                        <button >
                            <MdDelete onClick={() => deleteBlogHandler(params.row.id)} className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];


    const rows = [];

    blogPosts &&
        blogPosts.forEach((post) => {
            const datePart = post.createdAt.split('T')[0]; // Extracts the date part

            rows.push({
                id: post._id,
                email: post.user?.email,
                name: `${post.user?.firstname} ${post.user?.lastname}`,
                title: post.title,
                category: post.category,
                date: datePart

            });
        });

    return (
        <div className='flex'>
            <SideBar />
            {!isLoading && <div className="bg-gray-100 min-h-screen p-5 overflow-x-hidden">
                <h1 className='text-2xl font-medium  py-3' >All Blog Posts</h1>
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

export default BlogPostList