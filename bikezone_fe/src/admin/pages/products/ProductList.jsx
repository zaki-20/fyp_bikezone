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


    const { isLoading, isError, message, products } = useSelector((state) => state.product)


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
        { field: "id", headerName: "Product ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 300, flex: 1 },

        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Name",
            minWidth: 150,
            flex: 1,
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
            type: "number",
            minWidth: 270,
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
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <div className='flex w-[100%] '>
            <SideBar />
            <div className="bg-gray-100 min-h-screen p-5 w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className=""
                    autoHeight
                />
            </div>
        </div>
    )
}

export default ProductList