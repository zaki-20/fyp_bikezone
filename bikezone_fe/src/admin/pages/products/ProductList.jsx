import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAdminProducts } from '../../../features/product/product.thunk';

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const ProductList = () => {

    const dispatch = useDispatch()
    const [localProducts, setLocalProducts] = useState([]);


    const {isLoading, products } = useSelector((state) => state.product)


    const deleteProductHandler = async (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [])

    useEffect(() => {
        // Update local state when products change
        setLocalProducts(products || []);
    }, [products]);


    const columns = [
        { field: "id", headerName: "Product ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 250, flex: 0.6 },

        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Name",
            minWidth: 150,
            flex: 0.6,
        },
        {
            field: "stock",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Stock",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.stock <= 0
                    ? "text-red-600"
                    : "text-green-600";
            },
        },

        {
            field: "price",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Price",
            minWidth: 130,
            flex: 0.3,
        },

        {
            field: "date",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Created Date",
            minWidth: 120,
            flex: 0.3,
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
                        <Link to={`/admin/product/${params.row.id}`}>
                            <FaRegEdit size={20} />
                        </Link>
                        <button onClick={() => deleteProductHandler(params.row.id)}>
                            <MdDelete className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            const datePart = item.createdAt.split('T')[0]; // Extracts the date part

            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
                date: datePart
            });
        });

    return (
        <div className='flex '>
            <SideBar />
            {!isLoading &&
             <div className="bg-gray-100 w-full min-h-screen p-5 overflow-x-hidden">
                <h1 className='text-2xl py-3' >All Products</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="w-[100%]"
                    autoHeight
                />
            </div>
            }
        </div>
    )
}

export default ProductList